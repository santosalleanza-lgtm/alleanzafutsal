import Image from "next/image";

/**
 * Espaço da foto do profissional. Sem foto cadastrada, mostra uma composição gráfica
 * da marca em vez de uma imagem genérica de banco.
 */
export function Portrait({ src, name, className = "" }: { src: string | null; name: string; className?: string }) {
  return (
    <div className={`relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-white/10 bg-ink-700 ${className}`}>
      {src ? (
        <Image src={src} alt={`Foto de ${name}`} fill sizes="(min-width: 1024px) 40vw, 90vw" className="object-cover" priority />
      ) : (
        <div className="absolute inset-0" aria-hidden>
          <div className="grid-lines absolute inset-0" />
          <div className="absolute -right-16 -top-16 h-72 w-72 rounded-full bg-lime/20 blur-3xl" />
          <svg viewBox="0 0 400 500" className="absolute inset-0 h-full w-full">
            <path d="M40 420 L160 300 L230 360 L360 190" stroke="#C6F432" strokeWidth="10" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="360" cy="190" r="16" fill="#C6F432" />
            <text x="20" y="480" fill="#F5F5F2" fontFamily="var(--font-display)" fontWeight="800" fontSize="120" opacity=".08">AIMORÉ</text>
          </svg>
          <p className="absolute left-6 right-6 top-6 font-display text-3xl uppercase leading-none text-chalk">
            Técnica.<br />Rotina.<br /><span className="text-lime">Evolução.</span>
          </p>
        </div>
      )}
    </div>
  );
}
