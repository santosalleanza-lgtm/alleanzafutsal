import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleBody } from "@/components/ArticleBody";
import { ArtCard } from "@/components/ArtCard";
import { AuthorBox } from "@/components/AuthorBox";
import { DigitalProductAside } from "@/components/DigitalProductCard";
import { ButtonLink } from "@/components/ui/Button";
import { Notice } from "@/components/ui/Notice";
import { siteUrl } from "@/config/site";
import { blogCategories } from "@/data/blog";
import { productForBlogCategory } from "@/data/digital";
import { getBlogPost, getBlogPosts, getSettings } from "@/lib/data";
import { formatDate } from "@/lib/format";
import { readingMinutes } from "@/lib/reading";

export const revalidate = 60;

export async function generateStaticParams() {
  return (await getBlogPosts()).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const p = await getBlogPost((await params).slug);
  return p ? { title: p.title, description: p.excerpt, alternates: { canonical: `/blog/${p.slug}` }, openGraph: { type: "article", publishedTime: p.date } } : {};
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const [post, settings, all] = await Promise.all([getBlogPost((await params).slug), getSettings(), getBlogPosts()]);
  if (!post) notFound();
  const product = productForBlogCategory(post.category);
  const related = all.filter((p) => p.slug !== post.slug && p.category === post.category).concat(all.filter((p) => p.slug !== post.slug && p.category !== post.category)).slice(0, 3);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    datePublished: post.date,
    author: { "@type": "Person", name: settings.fullName },
    mainEntityOfPage: `${siteUrl}/blog/${post.slug}`,
  };

  return (
    <article>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <header className="noise relative overflow-hidden border-b border-gold/15">
        <div className="wrap relative grid gap-10 py-12 lg:grid-cols-[1.3fr_.7fr] lg:items-center">
          <div>
            <nav aria-label="Trilha" className="mb-6 text-sm text-chalk-dim"><Link href="/blog" className="hover:text-gold">Blog</Link> / {blogCategories[post.category]}</nav>
            <h1 className="font-sans text-4xl font-bold normal-case leading-tight tracking-tight sm:text-5xl">{post.title}</h1>
            <p className="mt-4 text-lg text-chalk-muted">{post.excerpt}</p>
            <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-chalk-dim">
              <AuthorBox settings={settings} compact />
              <span>·</span>
              <time dateTime={post.date}>{formatDate(post.date)}</time>
              <span>·</span>
              <span>{readingMinutes(post.body)} min de leitura</span>
            </div>
          </div>
          <ArtCard kicker={post.cover.kicker} lines={post.cover.lines} variant={post.cover.variant} size="lg" className="aspect-[4/5]" footer={<span>@aimorepersonal</span>} />
        </div>
      </header>

      <div className="wrap grid gap-12 py-12 lg:grid-cols-[1fr_20rem]">
        <div className="max-w-2xl">
          <div className="frame-gold mb-10 rounded-2xl bg-gold-metal p-6 text-ink">
            <p className="text-xs font-bold uppercase tracking-[0.24em]">Resposta curta</p>
            <p className="mt-2 font-medium leading-relaxed">{post.quick}</p>
          </div>
          <ArticleBody body={post.body} />
          <Notice className="mt-10">Conteúdo educativo. Não substitui avaliação médica, nutricional ou acompanhamento individual.</Notice>
          <div className="mt-10"><AuthorBox settings={settings} /></div>
        </div>
        <aside className="space-y-5 lg:sticky lg:top-24 lg:h-fit">
          {product && <DigitalProductAside product={product} />}
          <div className="frame-gold rounded-2xl border border-gold/30 bg-ink-800 p-6">
            <p className="font-display text-3xl font-black uppercase leading-none">Quer um treino <span className="text-gold-metal">para você?</span></p>
            <p className="mt-3 text-sm text-chalk-muted">Treino individualizado no app, com acompanhamento.</p>
            <ButtonLink href="/seja-aluno" className="mt-5 w-full">Quero ser aluno</ButtonLink>
          </div>
          <Link href="/blog/perguntas" className="block rounded-2xl border border-gold/20 bg-ink-800 p-6 hover:border-gold/50">
            <p className="eyebrow mb-2">Ficou com dúvida?</p>
            <p className="font-semibold">Mande sua pergunta para o Pergunte ao Aimoré →</p>
          </Link>
        </aside>
      </div>

      {related.length > 0 && (
        <section className="border-t border-gold/15 bg-ink-800 py-14">
          <div className="wrap">
            <h2 className="mb-8 text-4xl">Continue <span className="text-gold-metal">lendo</span></h2>
            <div className="grid gap-5 md:grid-cols-3">
              {related.map((p) => (
                <Link key={p.slug} href={`/blog/${p.slug}`} className="group block">
                  <ArtCard kicker={blogCategories[p.category]} lines={p.cover.lines} variant={p.cover.variant} size="sm" footer={<span>Ler →</span>} />
                  <h3 className="mt-3 font-sans text-base font-semibold normal-case tracking-normal group-hover:text-gold">{p.title}</h3>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </article>
  );
}
