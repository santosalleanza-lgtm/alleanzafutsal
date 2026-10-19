import type { Metadata } from "next";
import { ProgramList } from "@/components/ProgramList";
import { Disclaimer } from "@/components/ui/Notice";
import { PageHeader } from "@/components/ui/Section";
import { getPrograms } from "@/lib/data";

export const revalidate = 60;
export const metadata: Metadata = {
  title: "Programas de treinamento",
  description: "Programas digitais de treinamento por objetivo: iniciantes, condicionamento, TAF, futebol, goleiros, pessoas mais velhas e mais.",
  alternates: { canonical: "/programas" },
};

export default async function ProgramsPage() {
  const programs = await getPrograms();
  return (
    <>
      <PageHeader eyebrow="Programas digitais" title="Encontre seu próximo treino" intro="Programas organizados por objetivo e público. Os disponíveis são comprados com segurança pela Hotmart; os demais estão em preparação." />
      <div className="wrap py-12">
        <ProgramList programs={programs} />
        <Disclaimer className="mt-12" />
      </div>
    </>
  );
}
