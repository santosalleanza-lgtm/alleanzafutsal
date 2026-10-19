import type { Metadata } from "next";
import { AssessmentWizard } from "@/components/AssessmentWizard";
import { Disclaimer } from "@/components/ui/Notice";
import { PageHeader } from "@/components/ui/Section";
import { getPrograms } from "@/lib/data";
import { getSessionUser } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Minha Avaliação Física",
  description: "Autoavaliação física educativa: registre suas informações, calcule o IMC e receba sugestões gerais para organizar sua rotina.",
  alternates: { canonical: "/avaliacao" },
};

export default async function AssessmentPage() {
  const [programs, user] = await Promise.all([getPrograms(), getSessionUser()]);
  return (
    <>
      <PageHeader eyebrow="Ferramenta educativa" title="Minha Avaliação Física" intro="Registre suas informações básicas, entenda seus números e saia com um plano de ação para a sua rotina. Leva cerca de 3 minutos." />
      <div className="wrap py-12">
        <Disclaimer className="mb-8" />
        <AssessmentWizard programs={programs} loggedIn={Boolean(user)} />
      </div>
    </>
  );
}
