import type { Metadata } from "next";
import { CartView } from "@/components/CartView";
import { PageHeader } from "@/components/ui/Section";

export const metadata: Metadata = { title: "Carrinho", robots: { index: false } };

export default function CartPage() {
  return (
    <>
      <PageHeader title="Seu carrinho" />
      <div className="wrap py-10"><CartView /></div>
    </>
  );
}
