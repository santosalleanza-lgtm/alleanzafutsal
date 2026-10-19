import type { Metadata } from "next";
import Link from "next/link";
import { Notice } from "@/components/ui/Notice";
import { PageHeader } from "@/components/ui/Section";
import { nutritionCategories } from "@/data/articles";
import { getArticles } from "@/lib/data";

export const revalidate = 60;
export const metadata: Metadata = {
  title: "Alimentação e hábitos saudáveis",
  description: "Conteúdo educativo sobre alimentação para uma rotina ativa, hidratação, organização das refeições e alimentação no esporte.",
  alternates: { canonical: "/alimentacao" },
};

const kindLabel = { artigo: "Artigo", receita: "Receita", material: "Material", pergunta: "Pergunta" } as const;

export default async function NutritionPage() {
  const articles = await getArticles("alimentacao");
  return (
    <>
      <PageHeader eyebrow="Educação alimentar" title="Alimentação e hábitos saudáveis" intro="Informação simples e responsável para comer bem numa rotina ativa." />
      <div className="wrap py-12">
        <div className="grid gap-4 md:grid-cols-3">
          <div className="card p-5"><p className="eyebrow mb-2">1. Sugestões gerais</p><p className="text-sm text-chalk-muted">Ideias de refeições e combinações de alimentos para inspirar o dia a dia. Não são dietas.</p></div>
          <div className="card p-5"><p className="eyebrow mb-2">2. Conteúdo educativo</p><p className="text-sm text-chalk-muted">Explicações sobre hidratação, organização e alimentação no esporte para você entender o porquê.</p></div>
          <div className="card border-warn/40 p-5"><p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-warn">3. Orientação individual</p><p className="text-sm text-chalk-muted">Planos alimentares, calorias, macronutrientes e suplementação exigem nutricionista. A plataforma não oferece isso automaticamente.</p></div>
        </div>

        <Notice tone="warn" className="mt-6">
          Pessoas após cirurgia bariátrica ou em tratamento com medicamentos para controle de peso devem seguir as orientações do nutricionista e da equipe médica.
        </Notice>

        {nutritionCategories.map((cat) => {
          const list = articles.filter((a) => a.category === cat.slug);
          if (!list.length) return null;
          return (
            <section key={cat.slug} className="mt-12" aria-labelledby={`cat-${cat.slug}`}>
              <h2 id={`cat-${cat.slug}`} className="mb-4 text-3xl">{cat.label}</h2>
              <div className="grid gap-4 md:grid-cols-2">
                {list.map((a) => (
                  <Link key={a.id} href={`/alimentacao/${a.slug}`} className="card group p-6 transition hover:border-gold/50">
                    <span className="text-xs font-semibold uppercase tracking-wider text-chalk-dim">{kindLabel[a.kind]}</span>
                    <h3 className="mt-2 font-sans text-xl font-semibold normal-case tracking-normal group-hover:text-gold">{a.title}</h3>
                    <p className="mt-2 text-sm text-chalk-muted">{a.excerpt}</p>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </>
  );
}
