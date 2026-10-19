import Image from "next/image";
import { digitalProducts, type DigitalBundle, type DigitalProduct } from "@/data/digital";
import { ButtonLink } from "./ui/Button";
import { Icon } from "./ui/Icon";

/** Capa oficial do e-book com moldura dourada. */
export function ProductCover({ product, className = "", sizes = "300px" }: { product: DigitalProduct; className?: string; sizes?: string }) {
  return (
    <div className={`glow-gold relative aspect-[2/3] overflow-hidden rounded-2xl border border-gold/40 ${className}`}>
      <Image src={product.image} alt={`Capa do e-book ${product.name}`} fill sizes={sizes} className="object-cover" />
    </div>
  );
}

function BuyButtons({ product, full = false }: { product: DigitalProduct; full?: boolean }) {
  return (
    <div className={`flex flex-col gap-3 ${full ? "" : "sm:flex-row sm:items-center"}`}>
      <ButtonLink href={product.checkoutUrl} external className={full ? "w-full" : ""}>
        Comprar na Hotmart{product.price ? ` · ${product.price}` : ""}
      </ButtonLink>
      <a href={product.detailsUrl} target="_blank" rel="noopener noreferrer" className={`text-sm font-semibold text-gold hover:underline ${full ? "text-center" : ""}`}>
        Ver detalhes do produto →
      </a>
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
        <ul className="mt-5 space-y-2 text-sm">
          {product.points.map((p) => <li key={p} className="flex gap-2"><Icon name="check" className="h-4 w-4 shrink-0 text-gold" />{p}</li>)}
        </ul>
        {product.clinical && <p className="mt-5 rounded-xl border border-warn/40 bg-warn/10 p-3 text-xs text-chalk">Exige acompanhamento médico durante o tratamento.</p>}
        <div className="mt-8"><BuyButtons product={product} /></div>
        <p className="mt-4 max-w-xl text-xs text-chalk-dim">{product.note}</p>
      </div>
      <ProductCover product={product} className="relative mx-auto w-56 rotate-[-2deg] sm:w-64" sizes="256px" />
    </div>
  );
}

export function DigitalProductCard({ product }: { product: DigitalProduct }) {
  return (
    <article id={product.slug} className="frame-gold group flex scroll-mt-24 flex-col overflow-hidden rounded-2xl border border-gold/20 bg-ink-800 transition duration-500 hover:-translate-y-1 hover:border-gold/50">
      <div className="relative aspect-[2/3] overflow-hidden">
        <Image src={product.image} alt={`Capa do e-book ${product.name}`} fill sizes="(min-width: 1024px) 30vw, 90vw" className="object-cover transition duration-700 group-hover:scale-105" />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="text-[11px] uppercase tracking-[0.22em] text-gold">{product.kicker}</p>
        <h3 className="mt-2 font-display text-3xl font-black uppercase leading-[0.92]">{product.name}</h3>
        <p className="mt-3 flex-1 text-sm text-chalk-muted">{product.description}</p>
        {product.clinical && <p className="mt-4 text-xs text-warn">Exige acompanhamento médico.</p>}
        <div className="mt-6"><BuyButtons product={product} full /></div>
      </div>
    </article>
  );
}

export function DigitalProductAside({ product }: { product: DigitalProduct }) {
  return (
    <div className="frame-gold rounded-2xl border border-gold/30 bg-ink-800 p-6">
      <ProductCover product={product} className="mx-auto w-40" sizes="160px" />
      <p className="mt-5 font-display text-2xl font-black uppercase leading-none">{product.name}</p>
      <p className="mt-2 text-sm text-chalk-muted">{product.description}</p>
      <div className="mt-5"><BuyButtons product={product} full /></div>
      <p className="mt-3 text-[11px] text-chalk-dim">{product.note}</p>
    </div>
  );
}

export function DigitalBundleBand({ bundle }: { bundle: DigitalBundle }) {
  if (!bundle.checkoutUrl) return null;
  const items = bundle.includes.map((slug) => digitalProducts.find((p) => p.slug === slug)).filter((p) => p !== undefined);
  return (
    <div id={bundle.slug} className="frame-gold relative grid scroll-mt-24 items-center gap-10 overflow-hidden rounded-[2rem] border border-gold/50 bg-ink-800 p-8 sm:p-12 lg:grid-cols-[1fr_420px]">
      <div className="relative">
        <p className="mb-4 inline-block rounded-full bg-gold-metal px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.22em] text-ink">Destaque · Combo com {items.length} programas</p>
        <h2 className="font-display text-5xl font-black uppercase leading-[0.88] sm:text-6xl">{bundle.name}</h2>
        <p className="mt-4 max-w-xl text-lg text-chalk-muted">{bundle.description}</p>
        <ul className="mt-5 space-y-2 text-sm">
          {items.map((p) => <li key={p.slug} className="flex gap-2"><Icon name="check" className="h-4 w-4 shrink-0 text-gold" />{p.name}</li>)}
        </ul>
        <ButtonLink href={bundle.checkoutUrl} external className="mt-8">
          Comprar o combo{bundle.price ? ` · ${bundle.price}` : ""}
        </ButtonLink>
        <p className="mt-4 max-w-xl text-xs text-chalk-dim">{bundle.note}</p>
      </div>
      <div className="glow-gold relative aspect-square overflow-hidden rounded-2xl border border-gold/40">
        <Image src={bundle.image} alt={`Capa do ${bundle.name}`} fill sizes="420px" className="object-cover" />
      </div>
    </div>
  );
}
