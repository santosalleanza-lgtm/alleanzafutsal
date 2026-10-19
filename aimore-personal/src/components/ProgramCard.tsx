import Image from "next/image";
import Link from "next/link";
import { formatBRL } from "@/lib/format";
import type { Program } from "@/lib/types";
import { StatusBadge } from "./ui/Badge";

export function ProgramCard({ program }: { program: Program }) {
  return (
    <article className="card group relative flex flex-col overflow-hidden transition hover:border-lime/50">
      <div className="relative aspect-[16/9] overflow-hidden bg-ink-700">
        {program.cover ? (
          <Image src={program.cover} alt="" fill sizes="(min-width: 768px) 30vw, 90vw" className="object-cover" />
        ) : (
          <div className="grid-lines absolute inset-0 flex items-end p-5" aria-hidden>
            <span className="font-display text-5xl uppercase leading-none text-white/10">{program.name.split(" ").slice(0, 2).join(" ")}</span>
          </div>
        )}
        <div className="absolute left-4 top-4"><StatusBadge status={program.status} /></div>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-2xl leading-tight">{program.name}</h3>
        <p className="mt-2 text-sm text-chalk-muted">{program.tagline}</p>
        <p className="mt-3 text-xs text-chalk-dim"><span className="font-semibold text-chalk">Para quem:</span> {program.audience}</p>
        <div className="mt-auto flex items-center justify-between pt-5">
          <span className="text-sm font-semibold text-chalk">{program.price !== null ? formatBRL(program.price) : program.status === "disponivel" ? "" : "Preço em breve"}</span>
          <Link href={`/programas/${program.slug}`} className="text-sm font-semibold uppercase tracking-wide text-lime after:absolute after:inset-0">
            Conheça o programa →
          </Link>
        </div>
      </div>
    </article>
  );
}
