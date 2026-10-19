import type { Metadata } from "next";
import { WorkoutGenerator } from "@/components/WorkoutGenerator";
import { Disclaimer } from "@/components/ui/Notice";
import { PageHeader } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "Gerador de sugestões de treino",
  description: "Monte uma sugestão educativa de rotina semanal de exercícios de acordo com sua idade, objetivo, experiência e tempo disponível.",
  alternates: { canonical: "/gerador-de-treino" },
};

export default function GeneratorPage() {
  return (
    <>
      <PageHeader eyebrow="Ferramenta educativa" title="Comece com o que você tem" intro="Responda 9 perguntas e receba uma sugestão de organização semanal com exemplos de exercícios, adaptações e cuidados de segurança." />
      <div className="wrap py-12">
        <Disclaimer className="mb-8" />
        <WorkoutGenerator />
      </div>
    </>
  );
}
