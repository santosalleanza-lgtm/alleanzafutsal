import { timingSafeEqual } from "node:crypto";

/** Status de acesso resultante de cada evento do webhook da Hotmart (versão 2.0). */
const EVENT_STATUS: Record<string, "ativa" | "cancelada" | "reembolsada" | "chargeback"> = {
  PURCHASE_APPROVED: "ativa",
  PURCHASE_COMPLETE: "ativa",
  PURCHASE_CANCELED: "cancelada",
  PURCHASE_PROTEST: "cancelada",
  PURCHASE_REFUNDED: "reembolsada",
  PURCHASE_CHARGEBACK: "chargeback",
};

export type HotmartAccessEvent = {
  event: string;
  status: "ativa" | "cancelada" | "reembolsada" | "chargeback";
  buyerEmail: string;
  productId: string;
  transaction: string;
};

export function verifyHottok(received: string | null, expected: string | undefined): boolean {
  if (!received || !expected) return false;
  const a = Buffer.from(received);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

/** Extrai só o necessário do payload; eventos irrelevantes retornam null. */
export function parseHotmartEvent(body: unknown): HotmartAccessEvent | null {
  if (!body || typeof body !== "object") return null;
  const b = body as { event?: unknown; data?: { buyer?: { email?: unknown }; product?: { id?: unknown }; purchase?: { transaction?: unknown } } };
  const event = typeof b.event === "string" ? b.event : "";
  const status = EVENT_STATUS[event];
  if (!status) return null;
  const email = b.data?.buyer?.email;
  const productId = b.data?.product?.id;
  const transaction = b.data?.purchase?.transaction;
  if (typeof email !== "string" || !email.includes("@")) return null;
  if (productId === undefined || productId === null) return null;
  if (typeof transaction !== "string" || !transaction) return null;
  return { event, status, buyerEmail: email.trim().toLowerCase(), productId: String(productId), transaction };
}
