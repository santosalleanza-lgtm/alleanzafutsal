import type { Metadata } from "next";
import { ArtCard } from "@/components/ArtCard";
import { PageHeader } from "@/components/ui/Section";
import { situations } from "@/data/situations";

export const metadata: Metadata = {
  title: "Qual é a sua situação?",
  description: "Emagrecer, ganhar massa, TAF, futebol, filhos no esporte, mais de 60, recomeçar: encontre orientações para o seu momento.",
  alternates: { canonical: "/situacao" },
};

export default function SituationsPage() {
  return (
    <>
      <PageHeader eyebrow="Sua situação" title={<>Qual é o <span className="text-gold-metal">seu momento?</span></>} intro="Cada situação tem prioridades diferentes. Escolha a sua e veja por onde começar." />
      <div className="wrap grid gap-4 py-12 sm:grid-cols-2 lg:grid-cols-4">
        {situations.map((s, i) => (
          <ArtCard key={s.slug} href={`/situacao/${s.slug}`} kicker={s.kicker} lines={s.title} text={s.label} index={`${String(i + 1).padStart(2, "0")}/${String(situations.length).padStart(2, "0")}`} variant={i % 3 === 0 ? "gold" : "dark"} size="sm" />
        ))}
      </div>
    </>
  );
}
