import { createHmac } from "node:crypto";
import { describe, expect, it } from "vitest";
import { parseHotmartEvent, verifyHottok } from "@/lib/hotmart";
import { orderStatusFromPayment, verifyMercadoPagoSignature } from "@/lib/mercadopago";
import { whatsappLink } from "@/lib/whatsapp";

describe("Hotmart", () => {
  const payload = (event: string) => ({ event, data: { buyer: { email: " Aluno@Email.com " }, product: { id: 123 }, purchase: { transaction: "HP123" } } });
  it("valida o hottok", () => {
    expect(verifyHottok("abc", "abc")).toBe(true);
    expect(verifyHottok("abd", "abc")).toBe(false);
    expect(verifyHottok(null, "abc")).toBe(false);
    expect(verifyHottok("abc", undefined)).toBe(false);
  });
  it("mapeia eventos de compra e revogação", () => {
    expect(parseHotmartEvent(payload("PURCHASE_APPROVED"))).toEqual({ event: "PURCHASE_APPROVED", status: "ativa", buyerEmail: "aluno@email.com", productId: "123", transaction: "HP123" });
    expect(parseHotmartEvent(payload("PURCHASE_REFUNDED"))?.status).toBe("reembolsada");
    expect(parseHotmartEvent(payload("PURCHASE_CHARGEBACK"))?.status).toBe("chargeback");
    expect(parseHotmartEvent(payload("PURCHASE_BILLET_PRINTED"))).toBeNull();
    expect(parseHotmartEvent({ event: "PURCHASE_APPROVED" })).toBeNull();
  });
});

describe("Mercado Pago", () => {
  it("valida a assinatura x-signature", () => {
    const secret = "segredo";
    const ts = "1700000000";
    const v1 = createHmac("sha256", secret).update(`id:123;request-id:req-1;ts:${ts};`).digest("hex");
    expect(verifyMercadoPagoSignature({ signature: `ts=${ts},v1=${v1}`, requestId: "req-1", dataId: "123", secret })).toBe(true);
    expect(verifyMercadoPagoSignature({ signature: `ts=${ts},v1=${v1}`, requestId: "req-2", dataId: "123", secret })).toBe(false);
    expect(verifyMercadoPagoSignature({ signature: null, requestId: "req-1", dataId: "123", secret })).toBe(false);
  });
  it("só aprova pedido com pagamento aprovado", () => {
    expect(orderStatusFromPayment("approved")).toBe("pago");
    expect(orderStatusFromPayment("pending")).toBeNull();
    expect(orderStatusFromPayment("in_process")).toBeNull();
    expect(orderStatusFromPayment("refunded")).toBe("reembolsado");
  });
});

describe("WhatsApp", () => {
  it("gera link apenas com número válido", () => {
    expect(whatsappLink("55 51 99999-0000", "Olá")).toBe("https://wa.me/5551999990000?text=Ol%C3%A1");
    expect(whatsappLink("", "Olá")).toBeNull();
    expect(whatsappLink(null, "Olá")).toBeNull();
  });
});
