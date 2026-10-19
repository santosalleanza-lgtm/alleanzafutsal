import { NextResponse } from "next/server";
import { logSecurityEvent } from "@/lib/audit";
import { fetchPayment, orderStatusFromPayment, verifyMercadoPagoSignature } from "@/lib/mercadopago";
import { createAdminClient } from "@/lib/supabase/server";

/**
 * Notificações de pagamento do Mercado Pago.
 * O status nunca é lido do corpo da notificação: o pagamento é consultado na API oficial.
 */
export async function POST(req: Request) {
  const url = new URL(req.url);
  const body = (await req.json().catch(() => ({}))) as { type?: string; data?: { id?: string | number } };
  const type = body.type ?? url.searchParams.get("type");
  const dataId = String(body.data?.id ?? url.searchParams.get("data.id") ?? "");
  if (type !== "payment" || !dataId) return NextResponse.json({ ignored: true });

  const valid = verifyMercadoPagoSignature({
    signature: req.headers.get("x-signature"),
    requestId: req.headers.get("x-request-id"),
    dataId,
    secret: process.env.MERCADOPAGO_WEBHOOK_SECRET,
  });
  if (!valid) {
    await logSecurityEvent("webhook_mercadopago_assinatura_invalida", { dataId });
    return NextResponse.json({ error: "assinatura inválida" }, { status: 401 });
  }

  const db = createAdminClient();
  if (!db) return NextResponse.json({ error: "banco não configurado" }, { status: 503 });

  try {
    const payment = await fetchPayment(dataId);
    const next = orderStatusFromPayment(payment.status);
    if (payment.externalReference && next) {
      // Não rebaixa pedidos que já avançaram (em produção, enviado, entregue).
      const allowedFrom = next === "pago" ? ["aguardando_pagamento", "cancelado"] : ["aguardando_pagamento", "pago"];
      await db
        .from("orders")
        .update({ status: next, payment_id: payment.id, updated_at: new Date().toISOString() })
        .eq("id", payment.externalReference)
        .in("status", allowedFrom);
    }
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("Webhook Mercado Pago", e);
    return NextResponse.json({ error: "falha temporária" }, { status: 500 });
  }
}
