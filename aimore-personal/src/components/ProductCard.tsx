import Image from "next/image";
import Link from "next/link";
import { formatBRL } from "@/lib/format";
import type { Product } from "@/lib/types";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/loja/${product.slug}`} className="card group flex flex-col overflow-hidden transition hover:-translate-y-1 hover:border-gold/50">
      <div className="relative aspect-square bg-gradient-to-br from-ink-600 to-ink-800">
        {product.images[0] && (
          <Image src={product.images[0]} alt={product.name} fill sizes="(min-width: 768px) 30vw, 90vw" unoptimized={product.images[0].endsWith(".svg")} className="object-contain p-8 transition duration-500 group-hover:scale-105" />
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-2xl">{product.name}</h3>
        <p className="mt-1 flex-1 text-sm text-chalk-muted">{product.shortDescription}</p>
        <div className="mt-4 flex items-center justify-between">
          <span className="font-display text-3xl text-gold">{formatBRL(product.price)}</span>
          <span className="rounded-full bg-gold-metal px-4 py-2 text-xs font-bold uppercase text-ink transition group-hover:brightness-110">Comprar</span>
        </div>
      </div>
    </Link>
  );
}
