import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleBody } from "@/components/ArticleBody";
import { Notice } from "@/components/ui/Notice";
import { nutritionCategories } from "@/data/articles";
import { getArticle, getArticles } from "@/lib/data";

export const revalidate = 60;

export async function generateStaticParams() {
  return (await getArticles("alimentacao")).map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const a = await getArticle("alimentacao", (await params).slug);
  return a ? { title: a.title, description: a.excerpt, alternates: { canonical: `/alimentacao/${a.slug}` } } : {};
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const a = await getArticle("alimentacao", (await params).slug);
  if (!a) notFound();
  const cat = nutritionCategories.find((c) => c.slug === a.category);
  return (
    <article className="wrap max-w-3xl py-12">
      <nav aria-label="Trilha" className="mb-6 text-sm text-chalk-dim"><Link href="/alimentacao" className="hover:text-gold">Alimentação</Link>{cat && <> / {cat.label}</>}</nav>
      <h1 className="text-5xl leading-[0.95]">{a.title}</h1>
      <p className="mt-4 text-lg text-chalk-muted">{a.excerpt}</p>
      <div className="mt-8"><ArticleBody body={a.body} /></div>
      <Notice className="mt-10">Conteúdo educativo geral. Não é plano alimentar individual. Para orientações personalizadas, procure um nutricionista.</Notice>
    </article>
  );
}
