import type { Metadata } from "next";
import Link from "next/link";
import { AuthorBox } from "@/components/AuthorBox";
import { BlogList } from "@/components/BlogList";
import { PageHeader } from "@/components/ui/Section";
import { getBlogPosts, getSettings } from "@/lib/data";
import { readingMinutes } from "@/lib/reading";

export const revalidate = 60;
export const metadata: Metadata = {
  title: "Blog do Aimoré",
  description: "Artigos sobre hidratação, musculação, desenvolvimento no futsal de base, TAF e emagrecimento, escritos pelo personal Aimoré Weren.",
  alternates: { canonical: "/blog" },
};

export default async function BlogPage() {
  const [posts, settings] = await Promise.all([getBlogPosts(), getSettings()]);
  return (
    <>
      <PageHeader eyebrow="Blog do Aimoré" title={<>Treino explicado <span className="text-gold-metal">sem complicação</span></>} intro="Artigos para você entender o porquê de cada escolha no treino, na hidratação e no esporte dos seus filhos.">
        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <AuthorBox settings={settings} compact />
          <Link href="/blog/perguntas" className="rounded-full border border-gold/40 px-5 py-3 text-sm font-semibold hover:border-gold hover:text-gold">Pergunte ao Aimoré →</Link>
        </div>
      </PageHeader>
      <div className="wrap py-12">
        <BlogList posts={posts.map((p) => ({ ...p, minutes: readingMinutes(p.body) }))} />
      </div>
    </>
  );
}
