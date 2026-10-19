import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { StatusBadge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Notice } from "@/components/ui/Notice";
import { getProgram, getPrograms, getSettings } from "@/lib/data";
import { formatBRL } from "@/lib/format";
import { whatsappLink, whatsappTopics } from "@/lib/whatsapp";

export const revalidate = 60;

export async function generateStaticParams() {
  return (await getPrograms()).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const p = await getProgram((await params).slug);
  if (!p) return {};
  return { title: p.name, description: p.tagline, alternates: { canonical: `/programas/${p.slug}` } };
}

export default async function ProgramPage({ params }: { params: Promise<{ slug: string }> }) {
  const [program, settings] = await Promise.all([getProgram((await params).slug), getSettings()]);
  if (!program) notFound();

  const canBuy = program.status === "disponivel" && program.hotmartUrl;
  const isTaf = program.slug === "metodo-taf-8-semanas";
  const waMessage = isTaf ? whatsappTopics.taf : `Olá, Aimoré! Quero ser avisado quando o programa "${program.name}" estiver disponível.`;
  const wa = whatsappLink(settings.whatsapp, waMessage);

  return (
    <article>
      <header className="relative overflow-hidden border-b border-gold/15 bg-ink-800">
        <div className="grid-lines absolute inset-0" aria-hidden />
        <div className="wrap relative py-14 sm:py-20">
          <nav aria-label="Trilha" className="mb-6 text-sm text-chalk-dim"><Link href="/programas" className="hover:text-gold">Programas</Link></nav>
          <StatusBadge status={program.status} />
          <h1 className="mt-4 max-w-4xl text-5xl leading-[0.9] sm:text-6xl">{program.name}</h1>
          <p className="mt-5 max-w-2xl text-lg text-chalk-muted">{program.tagline}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            {canBuy ? (
              <ButtonLink href={program.hotmartUrl!} external>Comprar{program.price !== null ? ` por ${formatBRL(program.price)}` : ""}</ButtonLink>
            ) : (
              wa && <ButtonLink href={wa} external>{isTaf ? "Entrar na lista de espera" : "Quero ser avisado"}</ButtonLink>
            )}
            {program.duration && <span className="flex items-center gap-2 text-sm text-chalk-muted"><Icon name="clock" className="h-4 w-4 text-gold" />{program.duration}</span>}
          </div>
          {!canBuy && <p className="mt-3 text-xs text-chalk-dim">{isTaf ? "Ao enviar TAF pelo WhatsApp, você entra na lista de espera e é avisado na abertura das vendas." : "Este programa ainda não está à venda."}</p>}
          {settings.memberAreaUrl && (
            <p className="mt-4 text-sm text-chalk-muted">
              Já comprou?{" "}
              <a href={settings.memberAreaUrl} target="_blank" rel="noopener noreferrer" className="font-semibold text-gold underline">
                Acesse seus conteúdos na área de membros da Hotmart
              </a>
            </p>
          )}
        </div>
      </header>

      <div className="wrap grid gap-10 py-12 lg:grid-cols-[1fr_22rem]">
        <div className="space-y-10">
          {program.clinical && (
            <Notice tone="warn" title="Exige orientação profissional">
              Este programa não é tratamento médico. Só deve ser iniciado com liberação da equipe de saúde que acompanha você.
            </Notice>
          )}
          <section>
            <h2 className="mb-3 text-3xl">Sobre o programa</h2>
            <p className="leading-relaxed text-chalk-muted">{program.description}</p>
          </section>
          <section>
            <h2 className="mb-3 text-3xl">Para quem é</h2>
            <p className="leading-relaxed text-chalk-muted">{program.audience}</p>
          </section>
          {program.goals.length > 0 && (
            <section>
              <h2 className="mb-4 text-3xl">Objetivos gerais</h2>
              <ul className="grid gap-3 sm:grid-cols-2">
                {program.goals.map((g) => <li key={g} className="card flex gap-3 p-4 text-sm"><Icon name="target" className="h-5 w-5 shrink-0 text-gold" />{g}</li>)}
              </ul>
            </section>
          )}
          <section>
            <h2 className="mb-3 text-3xl">Orientações de segurança</h2>
            <p className="leading-relaxed text-chalk-muted">{program.safety}</p>
          </section>
        </div>
        <aside className="card h-fit p-6">
          <p className="eyebrow mb-4">O que está incluído</p>
          <ul className="space-y-3 text-sm">
            {program.includes.map((i) => <li key={i} className="flex gap-2"><Icon name="check" className="h-4 w-4 shrink-0 text-gold" />{i}</li>)}
          </ul>
          {program.status !== "disponivel" && <p className="mt-5 text-xs text-chalk-dim">O conteúdo final pode ser ajustado até o lançamento.</p>}
          <div className="mt-6 border-t border-gold/15 pt-6">
            <ButtonLink href="/avaliacao" variant="secondary" className="w-full">Fazer autoavaliação</ButtonLink>
          </div>
        </aside>
      </div>
    </article>
  );
}
