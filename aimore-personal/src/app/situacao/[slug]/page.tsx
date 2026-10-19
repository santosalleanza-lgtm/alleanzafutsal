import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArtCard } from "@/components/ArtCard";
import { DigitalProductBand } from "@/components/DigitalProductCard";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Disclaimer, Notice } from "@/components/ui/Notice";
import { blogCategories } from "@/data/blog";
import { tafProduct } from "@/data/digital";
import { services } from "@/data/services";
import { getSituation, situations } from "@/data/situations";
import { getTrainingCategory } from "@/data/training";
import { getBlogPosts, getSettings } from "@/lib/data";
import { whatsappLink } from "@/lib/whatsapp";

export const revalidate = 60;
export const generateStaticParams = () => situations.map((s) => ({ slug: s.slug }));

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const s = getSituation((await params).slug);
  return s ? { title: `${s.label}: por onde começar`, description: s.intro, alternates: { canonical: `/situacao/${s.slug}` } } : {};
}

export default async function SituationPage({ params }: { params: Promise<{ slug: string }> }) {
  const s = getSituation((await params).slug);
  if (!s) notFound();
  const [posts, settings] = await Promise.all([getBlogPosts(), getSettings()]);
  const articles = s.articles.map((slug) => posts.find((p) => p.slug === slug)).filter((p) => p !== undefined);
  const service = services.find((x) => x.slug === s.service);
  const training = s.training ? getTrainingCategory(s.training) : null;
  const wa = whatsappLink(settings.whatsapp, `Olá, Aimoré! Vim pelo site, na página "${s.label}", e quero saber como funciona o acompanhamento.`);
  const others = situations.filter((x) => x.slug !== s.slug).slice(0, 4);

  return (
    <article>
      <header className="noise relative overflow-hidden border-b border-gold/15">
        <div className="grid-lines pointer-events-none absolute inset-0 opacity-60" aria-hidden />
        <div className="wrap relative grid gap-10 py-14 lg:grid-cols-[1.3fr_.7fr] lg:items-center">
          <div>
            <nav aria-label="Trilha" className="mb-6 text-sm text-chalk-dim"><Link href="/situacao" className="hover:text-gold">Sua situação</Link> / {s.label}</nav>
            <p className="eyebrow mb-3">{s.kicker}</p>
            <h1 className="font-display text-6xl font-black leading-[0.86] sm:text-7xl">{s.title[0]} <span className="block text-gold-metal">{s.title[1]}</span></h1>
            <p className="mt-6 max-w-2xl text-lg text-chalk-muted">{s.intro}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/seja-aluno">{s.cta}</ButtonLink>
              {wa && <ButtonLink href={wa} external variant="secondary"><Icon name="whatsapp" className="h-4 w-4" /> Conversar no WhatsApp</ButtonLink>}
            </div>
          </div>
          <div className="frame-gold rounded-2xl border border-gold/25 bg-ink-800/80 p-6 backdrop-blur">
            <p className="eyebrow mb-4">Você se identifica?</p>
            <ul className="space-y-3">
              {s.signs.map((x) => <li key={x} className="flex gap-3 text-sm"><Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-gold" />{x}</li>)}
            </ul>
          </div>
        </div>
      </header>

      <div className="wrap py-14">
        {s.alert && <Notice tone="warn" title="Atenção" className="mb-12">{s.alert}</Notice>}
        {s.slug === "vou-fazer-taf" && (
          <div id="produto" className="mb-16 scroll-mt-24">
            <DigitalProductBand product={tafProduct} />
          </div>
        )}

        <section aria-labelledby="como">
          <p className="eyebrow mb-3">Como eu organizo o treino</p>
          <h2 id="como" className="mb-8 text-5xl">O <span className="text-gold-metal">método</span></h2>
          <ol className="grid gap-4 md:grid-cols-3">
            {s.approach.map((a, i) => (
              <li key={a.title} className="frame-gold rounded-2xl border border-gold/20 bg-ink-800 p-6">
                <span className="font-display text-5xl font-black text-gold-metal">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-3 text-2xl">{a.title}</h3>
                <p className="mt-2 text-sm text-chalk-muted">{a.text}</p>
              </li>
            ))}
          </ol>
        </section>

        <section aria-labelledby="passos" className="mt-16 grid gap-8 lg:grid-cols-[1fr_1fr]">
          <div>
            <p className="eyebrow mb-3">Comece hoje</p>
            <h2 id="passos" className="mb-6 text-5xl">Primeiros <span className="text-gold-metal">passos</span></h2>
            <ul className="space-y-3">
              {s.firstSteps.map((x, i) => (
                <li key={x} className="flex items-start gap-4 rounded-xl border border-gold/15 bg-ink-800 p-4">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-gold-metal font-display text-sm font-black text-ink">{i + 1}</span>
                  <span className="pt-1 text-sm">{x}</span>
                </li>
              ))}
            </ul>
          </div>
          {service && (
            <div className="frame-gold relative overflow-hidden rounded-2xl border border-gold/40 bg-ink p-8">
              <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-gold/20 blur-3xl" aria-hidden />
              <div className="relative flex items-center gap-4">
                <Image src="/img/aimore/aimore-avatar.webp" alt={settings.fullName} width={64} height={64} className="h-16 w-16 rounded-full border border-gold/40 object-cover" />
                <div>
                  <p className="font-semibold">{settings.fullName}</p>
                  <p className="text-xs text-chalk-dim">{settings.registry ? `CREF ${settings.registry}` : "Profissional de Educação Física"}</p>
                </div>
              </div>
              <p className="relative mt-6 text-[11px] uppercase tracking-[0.24em] text-gold">{service.kicker}</p>
              <h3 className="relative mt-1 text-4xl">{service.title[0]} <span className="text-gold-metal">{service.title[1]}</span></h3>
              <p className="relative mt-3 text-sm text-chalk-muted">{service.text}</p>
              <div className="relative mt-6 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href="/seja-aluno">{s.cta}</ButtonLink>
                {training && <ButtonLink href={`/treinos/${training.slug}`} variant="ghost">Orientações: {training.title}</ButtonLink>}
              </div>
            </div>
          )}
        </section>

        {articles.length > 0 && (
          <section aria-labelledby="ler" className="mt-16">
            <p className="eyebrow mb-3">Do blog</p>
            <h2 id="ler" className="mb-8 text-5xl">Para <span className="text-gold-metal">ler agora</span></h2>
            <div className="grid gap-4 md:grid-cols-3">
              {articles.map((p) => (
                <Link key={p.slug} href={`/blog/${p.slug}`} className="group block">
                  <ArtCard kicker={blogCategories[p.category]} lines={p.cover.lines} variant={p.cover.variant} size="sm" footer={<span>Ler artigo →</span>} />
                  <h3 className="mt-3 font-sans text-base font-semibold normal-case tracking-normal group-hover:text-gold">{p.title}</h3>
                </Link>
              ))}
            </div>
          </section>
        )}

        <section aria-labelledby="outras" className="mt-16">
          <h2 id="outras" className="mb-6 text-3xl">Outras situações</h2>
          <ul className="flex flex-wrap gap-2">
            {others.map((o) => <li key={o.slug}><Link href={`/situacao/${o.slug}`} className="inline-block rounded-full border border-gold/25 px-4 py-2 text-sm hover:border-gold hover:text-gold">{o.label}</Link></li>)}
          </ul>
        </section>
        <Disclaimer className="mt-12" />
      </div>
    </article>
  );
}
