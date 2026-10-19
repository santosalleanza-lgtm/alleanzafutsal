import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArtCard } from "@/components/ArtCard";
import { ButtonLink } from "@/components/ui/Button";
import { Disclaimer, Notice } from "@/components/ui/Notice";
import { PageHeader } from "@/components/ui/Section";
import { getTrainingCategory, trainingCategories } from "@/data/training";
import { situations } from "@/data/situations";

export const generateStaticParams = () => trainingCategories.map((c) => ({ slug: c.slug }));

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const c = getTrainingCategory((await params).slug);
  return c ? { title: `Treinamento: ${c.title}`, description: c.short, alternates: { canonical: `/treinos/${c.slug}` } } : {};
}

export default async function TrainingCategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const c = getTrainingCategory((await params).slug);
  if (!c) notFound();
  const related = situations.filter((x) => x.training === c.slug);

  return (
    <>
      <PageHeader eyebrow={`Perfil ${c.letter}`} title={c.title} intro={c.intro} />
      <div className="wrap py-12">
        <nav aria-label="Trilha" className="mb-8 text-sm text-chalk-dim"><Link href="/treinos" className="hover:text-gold">← Todos os perfis</Link></nav>
        {c.alert && <Notice tone="warn" title="Atenção" className="mb-10">{c.alert}</Notice>}

        <section aria-labelledby="orientacoes">
          <h2 id="orientacoes" className="mb-6 text-4xl">Orientações</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {c.topics.map((t) => (
              <div key={t.title} className="card p-6">
                <h3 className="font-sans text-lg font-semibold normal-case tracking-normal">{t.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-chalk-muted">{t.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section aria-labelledby="exemplos" className="mt-14">
          <h2 id="exemplos" className="mb-6 text-4xl">Exemplos de exercícios</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {c.exercises.map((e) => (
              <div key={e.name} className="card p-6">
                <p className="eyebrow mb-2">{e.goal}</p>
                <h3 className="text-2xl">{e.name}</h3>
                <p className="mt-2 text-sm text-chalk-muted">{e.how}</p>
              </div>
            ))}
          </div>
        </section>

        <section aria-labelledby="cuidados" className="mt-14">
          <h2 id="cuidados" className="mb-6 text-4xl">Cuidados</h2>
          <ul className="grid gap-3 md:grid-cols-2">
            {c.care.map((x) => <li key={x} className="flex gap-3 rounded-xl border border-gold/15 p-4 text-sm"><span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-warn" />{x}</li>)}
          </ul>
        </section>

        {related.length > 0 && (
          <section aria-labelledby="situacoes" className="mt-14">
            <h2 id="situacoes" className="mb-6 text-4xl">Para a sua situação</h2>
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {related.map((x) => <ArtCard key={x.slug} href={`/situacao/${x.slug}`} kicker={x.kicker} lines={x.title} text={x.label} size="sm" />)}
            </div>
          </section>
        )}

        <div className="mt-14 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/seja-aluno">Quero ser aluno</ButtonLink>
          <ButtonLink href="/gerador-de-treino" variant="secondary">Montar sugestão de treino</ButtonLink>
        </div>
        <Disclaimer className="mt-12" />
      </div>
    </>
  );
}
