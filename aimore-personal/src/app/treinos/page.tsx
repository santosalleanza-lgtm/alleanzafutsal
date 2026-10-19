import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";
import { Disclaimer } from "@/components/ui/Notice";
import { PageHeader } from "@/components/ui/Section";
import { trainingCategories } from "@/data/training";

export const metadata: Metadata = {
  title: "Encontre seu treinamento",
  description: "Orientações, exemplos de exercícios e cuidados para crianças, iniciantes, pessoas mais velhas, pós-bariátrica, quem usa medicamentos para controle de peso e jogadores de futebol.",
  alternates: { canonical: "/treinos" },
};

export default function TrainingHub() {
  return (
    <>
      <PageHeader eyebrow="Central de treinamento" title="Encontre seu treinamento" intro="Escolha o perfil que mais combina com você e veja orientações, exemplos de exercícios, cuidados e os programas relacionados.">
        <div className="mt-8"><ButtonLink href="/gerador-de-treino">Montar sugestão de treino</ButtonLink></div>
      </PageHeader>
      <div className="wrap py-12">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {trainingCategories.map((c) => (
            <Link key={c.slug} href={`/treinos/${c.slug}`} className="card group relative overflow-hidden p-6 transition hover:-translate-y-1 hover:border-gold/50">
              <span className="absolute -right-2 -top-6 font-display text-[8rem] leading-none text-white/[0.04]" aria-hidden>{c.letter}</span>
              <span className="eyebrow">Perfil {c.letter}</span>
              <h2 className="mt-3 text-3xl leading-none">{c.title}</h2>
              <p className="mt-3 text-sm text-chalk-muted">{c.short}</p>
              <span className="mt-6 inline-block text-sm font-semibold uppercase tracking-wide text-gold">Ver orientações →</span>
            </Link>
          ))}
        </div>
        <Disclaimer className="mt-12" />
      </div>
    </>
  );
}
