import Link from "next/link";
import { BrandMark } from "./BrandMark";

/**
 * Assinatura "Aimoré Performance", a mesma das artes do Instagram.
 * Para usar a logo em arquivo, defina NEXT_PUBLIC_LOGO_URL (ex.: /img/logo.svg).
 */
export function Logo({ className = "" }: { className?: string }) {
  const logoUrl = process.env.NEXT_PUBLIC_LOGO_URL;
  return (
    <Link href="/" className={`group inline-flex items-center gap-3 ${className}`} aria-label="Aimoré Performance, página inicial">
      {logoUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={logoUrl} alt="Aimoré Performance" className="h-10 w-auto" />
      ) : (
        <>
          <BrandMark className="h-9 w-10 transition duration-500 group-hover:scale-105" />
          <span className="leading-none">
            <span className="block font-display text-[1.35rem] font-extrabold uppercase tracking-wide">Aimoré</span>
            <span className="block text-[9px] font-medium uppercase tracking-luxe text-gold">Performance</span>
          </span>
        </>
      )}
    </Link>
  );
}
