import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AddToCart } from "@/components/AddToCart";
import { formatBRL } from "@/lib/format";
import { getProduct, getProducts } from "@/lib/data";

export const revalidate = 60;

export async function generateStaticParams() {
  return (await getProducts()).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const product = await getProduct((await params).slug);
  if (!product) return {};
  return { title: product.name, description: product.shortDescription, alternates: { canonical: `/loja/${product.slug}` }, openGraph: { images: product.images.slice(0, 1) } };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const product = await getProduct((await params).slug);
  if (!product) notFound();

  return (
    <div className="wrap py-10 sm:py-14">
      <nav aria-label="Trilha" className="mb-6 text-sm text-chalk-dim">
        <Link href="/loja" className="hover:text-lime">Loja</Link> <span aria-hidden>/</span> <span className="text-chalk">{product.name}</span>
      </nav>
      <div className="grid gap-10 lg:grid-cols-2">
        <div className="space-y-3">
          {product.images.map((src, i) => (
            <div key={src} className="card relative aspect-square overflow-hidden bg-gradient-to-br from-ink-600 to-ink-800">
              <Image src={src} alt={`${product.name}, imagem ${i + 1}`} fill sizes="(min-width: 1024px) 45vw, 90vw" unoptimized={src.endsWith(".svg")} className="object-contain p-10" priority={i === 0} />
            </div>
          ))}
        </div>
        <div>
          <h1 className="text-5xl leading-none sm:text-6xl">{product.name}</h1>
          <p className="mt-4 font-display text-4xl text-lime">{formatBRL(product.price)}</p>
          <p className="mt-5 leading-relaxed text-chalk-muted">{product.description}</p>
          {product.details.length > 0 && (
            <ul className="mt-5 space-y-2 text-sm text-chalk-muted">
              {product.details.map((d) => <li key={d} className="flex gap-2"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-lime" />{d}</li>)}
            </ul>
          )}
          <div className="card mt-8 p-6"><AddToCart product={product} /></div>
          {product.options.sizes?.length ? (
            <details className="card mt-4 p-5">
              <summary className="cursor-pointer font-semibold">Guia de tamanhos</summary>
              {product.sizeGuide ? (
                <div className="mt-4 overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead><tr>{product.sizeGuide.headers.map((h) => <th key={h} className="border-b border-white/10 py-2 pr-4">{h}</th>)}</tr></thead>
                    <tbody>{product.sizeGuide.rows.map((r, i) => <tr key={i}>{r.map((c, j) => <td key={j} className="border-b border-white/5 py-2 pr-4 text-chalk-muted">{c}</td>)}</tr>)}</tbody>
                  </table>
                </div>
              ) : (
                <div className="mt-3 space-y-2 text-sm text-chalk-muted">
                  <p>Para escolher o tamanho, compare com uma peça que você já usa e veste bem:</p>
                  <ul className="list-disc pl-5">
                    <li>Largura: meça a peça esticada de uma axila à outra.</li>
                    <li>Comprimento: meça do ponto mais alto do ombro até a barra.</li>
                  </ul>
                  <p>As medidas de cada tamanho são enviadas na confirmação do pedido. Em caso de dúvida, fale conosco antes de comprar.</p>
                </div>
              )}
            </details>
          ) : null}
          <p className="mt-6 text-xs text-chalk-dim">Frete e prazo de produção informados na confirmação do pedido. Imagens ilustrativas.</p>
        </div>
      </div>
    </div>
  );
}
