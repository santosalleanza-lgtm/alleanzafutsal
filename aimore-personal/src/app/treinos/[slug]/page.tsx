import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProgramCard } from "@/components/ProgramCard";
import { ButtonLink } from "@/components/ui/Button";
import { Disclaimer, Notice } from "@/components/ui/Notice";
import { PageHeader } from "@/components/ui/Section";
import { getTrainingCategory, trainingCategories } from "@/data/training";
import { getPrograms } from "@/lib/data";

export const revalidate = 60;
export const generateStaticParams = () => trainingCategories.map((c) => ({ slug: c.slug }));

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const c = getTrainingCategory((await params).slug);
  return c ? { title: `Treinamento: ${c.title}`, description: c.short, alternates: { canonical: `/treinos/${c.slug}` } } : {};
}

export default async function TrainingCategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const c = getTrainingCategory((await params).slug);
  if (!c) notFound();
  const programs = (await getPrograms()).filter((p) => p.categorySlug === c.slug);

  return (
    <>
      <PageHeader eyebrow={`Perfil ${c.letter}`} title={c.title} intro={c.intro} />
      <div className="wrap py-12">
        <nav aria-label="Trilha" className="mb-8 text-sm text-chalk-dim"><Link href="/treinos" className="hover:text-lime">← Todos os perfis</Link></nav>
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
            {c.care.map((x) => <li key={x} className="flex gap-3 rounded-xl border border-white/10 p-4 text-sm"><span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-warn" />{x}</li>)}
          </ul>
        </section>

        {programs.length > 0 && (
          <section aria-labelledby="programas" className="mt-14">
            <h2 id="programas" className="mb-6 text-4xl">Programas relacionados</h2>
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">{programs.map((p) => <ProgramCard key={p.id} program={p} />)}</div>
          </section>
        )}

        <div className="mt-14 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/gerador-de-treino">Montar sugestão de treino</ButtonLink>
          <ButtonLink href="/avaliacao" variant="secondary">Fazer autoavaliação</ButtonLink>
        </div>
        <Disclaimer className="mt-12" />
      </div>
    </>
  );
}
