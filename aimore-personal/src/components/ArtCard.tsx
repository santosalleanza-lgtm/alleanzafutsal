import Link from "next/link";
import type { ReactNode } from "react";
import { BrandMark } from "./BrandMark";

type Props = {
  kicker: string;
  lines: [string, string];
  text?: string;
  index?: string;
  variant?: "dark" | "gold";
  href?: string;
  footer?: ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg";
};

/** Arte no padrão dos carrosséis do Instagram: moldura fina, selo, título branco + dourado. */
export function ArtCard({ kicker, lines, text, index, variant = "dark", href, footer, className = "", size = "md" }: Props) {
  const gold = variant === "gold";
  const titleSize = size === "lg" ? "text-5xl sm:text-6xl" : size === "sm" ? "text-3xl" : "text-4xl";
  const body = (
    <div
      className={`frame-gold group relative flex h-full flex-col overflow-hidden rounded-2xl p-6 transition duration-500 ${
        gold ? "bg-gold-metal text-ink" : "border border-gold/20 bg-ink-800 hover:border-gold/50"
      } ${href ? "hover:-translate-y-1" : ""} ${className}`}
    >
      {!gold && <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-gold/15 blur-3xl transition duration-700 group-hover:bg-gold/25" aria-hidden />}
      <div className="pointer-events-none absolute inset-0 bg-gold-sheen opacity-0 transition duration-700 group-hover:opacity-100" aria-hidden />
      <div className="relative flex items-center justify-between">
        <span className={`border-b pb-1 font-display text-sm font-extrabold uppercase tracking-wide ${gold ? "border-ink/40 text-ink" : "border-gold/50 text-gold"}`}>{kicker}</span>
        {gold ? <span className="font-display text-sm font-bold text-ink/60">{index}</span> : <BrandMark className="h-6 w-7 opacity-80" />}
      </div>
      <h3 className={`relative mt-auto pt-10 font-display font-black uppercase leading-[0.88] ${titleSize}`}>
        <span className={`block ${gold ? "text-ink" : "text-chalk"}`}>{lines[0]}</span>
        <span className={`block ${gold ? "text-ink/70" : "text-gold-metal"}`}>{lines[1]}</span>
      </h3>
      <span className={`relative mt-4 block h-0.5 w-14 ${gold ? "bg-ink/60" : "bg-gold"}`} />
      {text && <p className={`relative mt-4 text-sm leading-relaxed ${gold ? "text-ink/80" : "text-chalk-muted"}`}>{text}</p>}
      <div className={`relative mt-5 flex items-center justify-between text-xs font-display font-bold uppercase tracking-wider ${gold ? "text-ink/70" : "text-chalk-dim"}`}>
        {footer ?? (
          <>
            <span>{!gold && index}</span>
            {href && <span className={gold ? "text-ink" : "text-gold"}>Ver mais →</span>}
          </>
        )}
      </div>
    </div>
  );
  return href ? <Link href={href} className="block h-full">{body}</Link> : body;
}
