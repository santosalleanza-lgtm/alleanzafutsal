import Image from "next/image";
import { BrandMark } from "./BrandMark";

/** Retrato do profissional com o tratamento dourado das artes. */
export function Portrait({ src, name, className = "", priority = true }: { src: string | null; name: string; className?: string; priority?: boolean }) {
  return (
    <div className={`frame-gold glow-gold relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-gold/30 bg-ink-700 ${className}`}>
      {src ? (
        <>
          <Image src={src} alt={`${name}, profissional de Educação Física`} fill sizes="(min-width: 1024px) 40vw, 90vw" className="object-cover" priority={priority} />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/10 to-transparent" aria-hidden />
          <div className="absolute inset-0 bg-gradient-to-l from-ink/50 via-transparent to-transparent" aria-hidden />
          <svg className="pointer-events-none absolute inset-0 h-full w-full mix-blend-screen" viewBox="0 0 400 500" preserveAspectRatio="none" aria-hidden>
            <defs>
              <linearGradient id="streak" x1="0" x2="1">
                <stop offset="0" stopColor="#F2DDA6" stopOpacity="0" />
                <stop offset=".5" stopColor="#F2DDA6" stopOpacity=".55" />
                <stop offset="1" stopColor="#F2DDA6" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d="M-20 120 L420 20" stroke="url(#streak)" strokeWidth="1.2" />
            <path d="M260 520 L420 300" stroke="url(#streak)" strokeWidth="1" />
          </svg>
        </>
      ) : (
        <div className="grid-lines absolute inset-0 grid place-items-center" aria-hidden><BrandMark className="h-32 w-36 opacity-60" /></div>
      )}
      <div className="absolute inset-x-6 bottom-6 flex items-end justify-between">
        <div>
          <p className="font-display text-3xl font-black uppercase leading-none text-chalk">{name}</p>
          <p className="mt-1 text-[10px] font-medium uppercase tracking-luxe text-gold">Aimoré Performance</p>
        </div>
        <BrandMark className="h-10 w-11" />
      </div>
    </div>
  );
}
