import type { Metadata } from "next";
import { DigitalBundleBand, DigitalProductBand } from "@/components/DigitalProductCard";
import { ButtonLink } from "@/components/ui/Button";
import { Notice } from "@/components/ui/Notice";
import { PageHeader } from "@/components/ui/Section";
import { activeBundles, digitalProducts } from "@/data/digital";

export const metadata: Metadata = {
  title: "Programas digitais",
  description: "E-books de treino do Prof. Aimoré: preparação para o TAF, treino para quem usa caneta emagrecedora e programa de 8 semanas para o verão.",
  alternates: { canonical: "/programas-digitais" },
};

export default function DigitalProgramsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Programas digitais"
        title={<>Treine comigo <span className="text-gold-metal">de onde estiver</span></>}
        intro="Programas de treino em e-book para seguir no seu ritmo. A compra é feita pela Hotmart, com pagamento seguro e acesso imediato."
      />
      <div className="wrap space-y-10 py-14">
        {activeBundles().map((b) => <DigitalBundleBand key={b.slug} bundle={b} />)}
        {digitalProducts.map((d) => (
          <div key={d.slug} id={d.slug} className="scroll-mt-24">
            <DigitalProductBand product={d} />
          </div>
        ))}
        <Notice>Os programas são conteúdo educativo de exercício físico. Se você tem alguma condição de saúde, converse com seu médico antes de começar.</Notice>
        <div className="frame-gold flex flex-col items-start justify-between gap-6 rounded-2xl border border-gold/30 bg-ink-800 p-8 sm:flex-row sm:items-center">
          <div>
            <p className="font-display text-3xl font-black uppercase leading-none">Prefere um treino <span className="text-gold-metal">feito para você?</span></p>
            <p className="mt-2 text-sm text-chalk-muted">Na consultoria online, o treino é individualizado e acompanhado no app.</p>
          </div>
          <ButtonLink href="/seja-aluno">Quero ser aluno</ButtonLink>
        </div>
      </div>
    </>
  );
}
