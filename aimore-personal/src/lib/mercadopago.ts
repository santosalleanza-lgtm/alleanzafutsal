import { createHmac, timingSafeEqual } from "node:crypto";

const API = "https://api.mercadopago.com";

export type PreferenceItem = { id: string; title: string; quantity: number; unit_price: number; currency_id: "BRL" };

export async function createPreference(params: {
  orderId: string;
  items: PreferenceItem[];
  payerEmail: string;
  siteUrl: string;
  token: string;
}): Promise<{ id: string; initPoint: string }> {
  const accessToken = process.env.MERCADOPAGO_ACCESS_TOKEN;
  if (!accessToken) throw new Error("MERCADOPAGO_ACCESS_TOKEN ausente");
  const res = await fetch(`${API}/checkout/preferences`, {
    method: "POST",
    headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json", "X-Idempotency-Key": params.orderId },
    body: JSON.stringify({
      items: params.items,
      payer: { email: params.payerEmail },
      external_reference: params.orderId,
      back_urls: {
        success: `${params.siteUrl}/pedido/${params.token}`,
        pending: `${params.siteUrl}/pedido/${params.token}`,
        failure: `${params.siteUrl}/pedido/${params.token}`,
      },
      auto_return: "approved",
      notification_url: `${params.siteUrl}/api/webhooks/mercadopago`,
      statement_descriptor: "AIMORE PERSONAL",
    }),
  });
  if (!res.ok) throw new Error(`Mercado Pago respondeu ${res.status}`);
  const data = (await res.json()) as { id: string; init_point: string };
  return { id: data.id, initPoint: data.init_point };
}

export async function fetchPayment(id: string): Promise<{ status: string; externalReference: string | null; id: string }> {
  const accessToken = process.env.MERCADOPAGO_ACCESS_TOKEN;
  if (!accessToken) throw new Error("MERCADOPAGO_ACCESS_TOKEN ausente");
  const res = await fetch(`${API}/v1/payments/${encodeURIComponent(id)}`, { headers: { Authorization: `Bearer ${accessToken}` } });
  if (!res.ok) throw new Error(`Mercado Pago respondeu ${res.status}`);
  const p = (await res.json()) as { id: number; status: string; external_reference?: string | null };
  return { id: String(p.id), status: p.status, externalReference: p.external_reference ?? null };
}

/** Converte o status do pagamento no status do pedido. null = não altera. */
export function orderStatusFromPayment(status: string): "pago" | "cancelado" | "reembolsado" | null {
  if (status === "approved") return "pago";
  if (status === "cancelled" || status === "rejected") return "cancelado";
  if (status === "refunded" || status === "charged_back") return "reembolsado";
  return null;
}

/**
 * Valida o cabeçalho x-signature enviado pelo Mercado Pago.
 * Manifesto: id:{data.id};request-id:{x-request-id};ts:{ts};
 */
export function verifyMercadoPagoSignature(opts: { signature: string | null; requestId: string | null; dataId: string; secret: string | undefined }) {
  if (!opts.signature || !opts.secret) return false;
  const parts = Object.fromEntries(
    opts.signature.split(",").map((p) => {
      const [k, ...v] = p.trim().split("=");
      return [k, v.join("=")];
    }),
  );
  if (!parts.ts || !parts.v1) return false;
  let manifest = `id:${opts.dataId.toLowerCase()};`;
  if (opts.requestId) manifest += `request-id:${opts.requestId};`;
  manifest += `ts:${parts.ts};`;
  const expected = createHmac("sha256", opts.secret).update(manifest).digest("hex");
  const a = Buffer.from(expected);
  const b = Buffer.from(parts.v1);
  return a.length === b.length && timingSafeEqual(a, b);
}
