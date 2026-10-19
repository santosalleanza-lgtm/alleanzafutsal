import type { DigitalProduct } from "@/data/digital";
import { BrandMark } from "./BrandMark";
import { ButtonLink } from "./ui/Button";
import { Icon } from "./ui/Icon";

/** Capa no padrão das artes: dourado metálico, título condensado e selo. */
export function ProductCover({ product, className = "" }: { product: DigitalProduct; className?: string }) {
  return (
    <div className={`frame-gold glow-gold relative flex aspect-[3/4] flex-col overflow-hidden rounded-2xl bg-gold-metal p-6 text-ink ${className}`}>
      <div className="pointer-events-none absolute inset-0 bg-gold-sheen" aria-hidden />
      <div className="relative flex items-center justify-between">
        <span className="border-b border-ink/40 pb-1 font-display text-sm font-extrabold uppercase">{product.kicker}</span>
        <BrandMark className="h-7 w-8 [&_path]:fill-ink" />
      </div>
      <p className="relative mt-auto font-display text-5xl font-black uppercase leading-[0.86]">
        {product.cover[0]}
        <span className="block text-ink/70">{product.cover[1]}</span>
      </p>
      <span className="relative mt-4 block h-0.5 w-14 bg-ink/60" />
      <p className="relative mt-4 text-[10px] font-semibold uppercase tracking-luxe">Aimoré Performance</p>
    </div>
  );
}

export function DigitalProductBand({ product }: { product: DigitalProduct }) {
  return (
    <div className="frame-gold relative grid items-center gap-10 overflow-hidden rounded-[2rem] border border-gold/40 bg-ink p-8 sm:p-12 lg:grid-cols-[1fr_auto]">
      <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-gold/15 blur-3xl" aria-hidden />
      <div className="relative">
        <p className="eyebrow mb-3">{product.kicker}</p>
        <h2 className="font-display text-5xl font-black leading-[0.88] sm:text-6xl">
          {product.cover[0]} <span className="text-gold-metal">{product.cover[1]}</span>
        </h2>
        <p className="mt-4 max-w-xl text-lg text-chalk-muted">{product.description}</p>
        <ul className="mt-5 grid gap-2 text-sm sm:grid-cols-3">
          {product.points.map((p) => <li key={p} className="flex gap-2"><Icon name="check" className="h-4 w-4 shrink-0 text-gold" />{p}</li>)}
        </ul>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
          <ButtonLink href={product.checkoutUrl} external>Comprar na Hotmart{product.price ? ` · ${product.price}` : ""}</ButtonLink>
          <span className="text-xs text-chalk-dim">Pagamento processado pela Hotmart.</span>
        </div>
        <p className="mt-4 max-w-xl text-xs text-chalk-dim">{product.note}</p>
      </div>
      <ProductCover product={product} className="relative mx-auto w-56 rotate-[-3deg] sm:w-64" />
    </div>
  );
}

export function DigitalProductAside({ product }: { product: DigitalProduct }) {
  return (
    <div className="frame-gold rounded-2xl border border-gold/30 bg-ink-800 p-6">
      <ProductCover product={product} className="mx-auto w-40" />
      <p className="mt-5 font-display text-2xl font-black uppercase leading-none">{product.name}</p>
      <p className="mt-2 text-sm text-chalk-muted">{product.description}</p>
      <ButtonLink href={product.checkoutUrl} external className="mt-5 w-full">Comprar na Hotmart</ButtonLink>
      <p className="mt-3 text-[11px] text-chalk-dim">{product.note}</p>
    </div>
  );
}
