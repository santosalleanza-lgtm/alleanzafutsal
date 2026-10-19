import { NextResponse } from "next/server";
import { siteUrl } from "@/config/site";
import { applyCoupon, subtotal as sumLines } from "@/lib/cart";
import { checkoutSchema, describeLine, priceItems } from "@/lib/checkout";
import { findCoupon } from "@/lib/coupons";
import { getProducts, getSettings } from "@/lib/data";
import { isMercadoPagoConfigured } from "@/lib/env";
import { formatBRL } from "@/lib/format";
import { createPreference } from "@/lib/mercadopago";
import { clientIp, rateLimit } from "@/lib/rate-limit";
import { shippingPolicy } from "@/lib/shipping";
import { createAdminClient, getSessionUser } from "@/lib/supabase/server";
import { whatsappLink } from "@/lib/whatsapp";

export async function POST(req: Request) {
  if (!rateLimit(`checkout:${clientIp(req)}`, 8)) {
    return NextResponse.json({ error: "Muitas tentativas. Aguarde um minuto e tente novamente." }, { status: 429 });
  }

  const parsed = checkoutSchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Dados inválidos.", fields: parsed.error.flatten().fieldErrors }, { status: 400 });
  }
  const input = parsed.data;

  const priced = priceItems(input.items, await getProducts());
  if (!priced.ok) return NextResponse.json({ error: priced.error }, { status: 400 });

  const sub = sumLines(priced.lines.map((l) => ({ unitPrice: l.product.price, quantity: l.quantity })));
  let discount = 0;
  let couponCode: string | null = null;
  if (input.coupon) {
    const coupon = await findCoupon(input.coupon);
    const check = applyCoupon(sub, coupon);
    if (!check.ok) return NextResponse.json({ error: check.reason }, { status: 400 });
    discount = check.discount;
    couponCode = coupon!.code;
  }
  const shipping = shippingPolicy();
  const shippingCents = shipping.mode === "fixo" ? shipping.cents : null;
  const total = sub - discount + (shippingCents ?? 0);

  const db = createAdminClient();
  if (!db || !isMercadoPagoConfigured()) {
    // Sem pagamento configurado: nada é cobrado nem marcado como pago. Oferece o pedido pelo WhatsApp.
    const settings = await getSettings();
    const summary = [
      "Olá! Quero fazer este pedido pelo site:",
      ...priced.lines.map(describeLine),
      `Subtotal: ${formatBRL(sub)}${discount ? ` | Desconto: ${formatBRL(discount)}` : ""}`,
      `Nome: ${input.customer.name}`,
      `Cidade: ${input.address.city}/${input.address.state.toUpperCase()}`,
    ].join("\n");
    return NextResponse.json(
      {
        error: "O pagamento on-line ainda não está ativo. Você pode enviar o pedido pelo WhatsApp e combinar o pagamento diretamente.",
        whatsapp: whatsappLink(settings.whatsapp, summary),
      },
      { status: 503 },
    );
  }

  const user = await getSessionUser();
  const { data: order, error } = await db
    .from("orders")
    .insert({
      user_id: user?.id ?? null,
      email: input.customer.email.toLowerCase(),
      customer: input.customer,
      shipping_address: { ...input.address, state: input.address.state.toUpperCase() },
      subtotal: sub,
      discount,
      shipping: shippingCents,
      total,
      coupon_code: couponCode,
      payment_provider: "mercadopago",
    })
    .select("id, public_token")
    .single();
  if (error || !order) {
    console.error("Falha ao criar pedido", error?.message);
    return NextResponse.json({ error: "Não foi possível registrar o pedido. Tente novamente em instantes." }, { status: 500 });
  }

  const { error: itemsError } = await db.from("order_items").insert(
    priced.lines.map((l) => ({
      order_id: order.id,
      product_id: /^[0-9a-f-]{36}$/.test(l.product.id) ? l.product.id : null,
      name: l.product.name,
      unit_price: l.product.price,
      quantity: l.quantity,
      options: l.options,
    })),
  );
  if (itemsError) {
    await db.from("orders").delete().eq("id", order.id);
    return NextResponse.json({ error: "Não foi possível registrar o pedido. Tente novamente em instantes." }, { status: 500 });
  }

  try {
    // O Mercado Pago não aceita item com valor negativo (desconto); por isso o pedido
    // vai como um único item com o total já calculado no servidor.
    const pref = await createPreference({
      orderId: order.id,
      token: order.public_token,
      payerEmail: input.customer.email,
      siteUrl,
      items: [
        {
          id: order.id,
          title: `Pedido Aimoré Personal (${priced.lines.reduce((s, l) => s + l.quantity, 0)} itens)`,
          quantity: 1,
          unit_price: total / 100,
          currency_id: "BRL",
        },
      ],
    });
    await db.from("orders").update({ preference_id: pref.id }).eq("id", order.id);
    return NextResponse.json({ redirect: pref.initPoint, token: order.public_token });
  } catch (e) {
    console.error("Falha no Mercado Pago", e);
    await db.from("orders").update({ status: "cancelado" }).eq("id", order.id);
    return NextResponse.json({ error: "O serviço de pagamento não respondeu. Nenhuma cobrança foi feita; tente novamente." }, { status: 502 });
  }
}
