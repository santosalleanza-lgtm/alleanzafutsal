import { NextResponse } from "next/server";
import { logSecurityEvent } from "@/lib/audit";
import { parseHotmartEvent, verifyHottok } from "@/lib/hotmart";
import { createAdminClient } from "@/lib/supabase/server";

/**
 * Webhook da Hotmart (versão 2.0). Configure em Hotmart > Ferramentas > Webhook
 * apontando para https://SEU-DOMINIO/api/webhooks/hotmart.
 * Libera ou revoga o acesso ao programa pelo e-mail do comprador.
 */
export async function POST(req: Request) {
  if (!verifyHottok(req.headers.get("x-hotmart-hottok"), process.env.HOTMART_HOTTOK)) {
    await logSecurityEvent("webhook_hotmart_token_invalido");
    return NextResponse.json({ error: "não autorizado" }, { status: 401 });
  }

  const event = parseHotmartEvent(await req.json().catch(() => null));
  if (!event) return NextResponse.json({ ignored: true });

  const db = createAdminClient();
  if (!db) return NextResponse.json({ error: "banco não configurado" }, { status: 503 });

  const { data: program } = await db.from("programs").select("id").eq("hotmart_product_id", event.productId).maybeSingle();

  const { error } = await db.from("program_access").upsert(
    {
      buyer_email: event.buyerEmail,
      hotmart_product_id: event.productId,
      program_id: program?.id ?? null,
      source: "hotmart",
      transaction: event.transaction,
      status: event.status,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "transaction" },
  );
  if (error) {
    console.error("Webhook Hotmart", error.message);
    return NextResponse.json({ error: "falha ao registrar" }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
