import type { Metadata } from "next";
import { StoreCatalog } from "@/components/StoreCatalog";
import { PageHeader } from "@/components/ui/Section";
import { productCategories } from "@/data/products";
import { getProducts } from "@/lib/data";

export const revalidate = 60;
export const metadata: Metadata = {
  title: "Loja",
  description: "Camisetas, regatas e canecas personalizadas Aimoré Personal.",
  alternates: { canonical: "/loja" },
};

export default async function StorePage() {
  const products = await getProducts();
  return (
    <>
      <PageHeader eyebrow="Loja Aimoré Personal" title="Personalize seu estilo" intro="Camisetas, regatas e canecas para treinar, jogar ou presentear. Escolha o modelo, a cor e acrescente o seu nome." />
      <div className="wrap py-12">
        <StoreCatalog products={products} categories={productCategories} />
        <p className="mt-10 text-sm text-chalk-dim">
          Frete e prazo de produção são informados na confirmação do pedido, de acordo com o endereço de entrega e a personalização escolhida.
        </p>
      </div>
    </>
  );
}
