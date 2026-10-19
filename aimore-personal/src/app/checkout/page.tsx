import type { Metadata } from "next";
import { CheckoutForm } from "@/components/CheckoutForm";
import { PageHeader } from "@/components/ui/Section";
import { shippingPolicy, SHIPPING_NOTICE } from "@/lib/shipping";

export const metadata: Metadata = { title: "Finalizar compra", robots: { index: false } };

export default function CheckoutPage() {
  const shipping = shippingPolicy();
  return (
    <>
      <PageHeader title="Finalizar compra" intro="Confira o pedido, informe os dados de entrega e conclua o pagamento em ambiente seguro do Mercado Pago." />
      <div className="wrap py-10">
        <CheckoutForm shippingCents={shipping.mode === "fixo" ? shipping.cents : null} shippingNotice={shipping.mode === "combinar" ? SHIPPING_NOTICE : null} />
      </div>
    </>
  );
}
