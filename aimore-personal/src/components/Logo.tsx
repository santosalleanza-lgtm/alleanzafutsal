import Link from "next/link";

/**
 * Marca provisória em texto. Para usar a logo oficial, defina NEXT_PUBLIC_LOGO_URL
 * (ex.: /img/logo.svg dentro de public/) e ela substitui o texto automaticamente.
 */
export function Logo({ className = "" }: { className?: string }) {
  const logoUrl = process.env.NEXT_PUBLIC_LOGO_URL;
  return (
    <Link href="/" className={`group inline-flex items-center gap-2.5 ${className}`} aria-label="Aimoré Personal, página inicial">
      {logoUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={logoUrl} alt="Aimoré Personal" className="h-9 w-auto" />
      ) : (
        <>
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-lime font-display text-xl font-bold text-ink transition group-hover:rotate-[-6deg]">A</span>
          <span className="leading-none">
            <span className="block font-display text-xl font-bold uppercase tracking-wide">Aimoré</span>
            <span className="block text-[10px] font-semibold uppercase tracking-[0.35em] text-lime">Personal</span>
          </span>
        </>
      )}
    </Link>
  );
}
