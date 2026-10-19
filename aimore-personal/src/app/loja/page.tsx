import type { Metadata } from "next";
import { DigitalProductCard } from "@/components/DigitalProductCard";
import { StoreCatalog } from "@/components/StoreCatalog";
import { PageHeader } from "@/components/ui/Section";
import { digitalProducts } from "@/data/digital";
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
      <section id="programas-digitais" className="wrap scroll-mt-24 pt-12">
        <p className="eyebrow mb-3">Programas digitais</p>
        <h2 className="mb-8 text-4xl sm:text-5xl">E-books de <span className="text-gold-metal">treino</span></h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {digitalProducts.map((d) => <DigitalProductCard key={d.slug} product={d} />)}
        </div>
      </section>
      <div className="wrap py-12">
        <StoreCatalog products={products} categories={productCategories} />
        <p className="mt-10 text-sm text-chalk-dim">
          Frete e prazo de produção são informados na confirmação do pedido, de acordo com o endereço de entrega e a personalização escolhida.
        </p>
      </div>
    </>
  );
}
