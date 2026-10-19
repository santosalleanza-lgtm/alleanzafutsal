import Image from "next/image";
import Link from "next/link";
import { ArtCard } from "@/components/ArtCard";
import { BrandMark } from "@/components/BrandMark";
import { InstagramGrid } from "@/components/InstagramGrid";
import { Portrait } from "@/components/Portrait";
import { ProductCard } from "@/components/ProductCard";
import { DigitalProductBand } from "@/components/DigitalProductCard";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Section } from "@/components/ui/Section";
import { instagramHandle, instagramUrl } from "@/config/site";
import { blogCategories } from "@/data/blog";
import { tafProduct } from "@/data/digital";
import { services } from "@/data/services";
import { situations } from "@/data/situations";
import { getBlogPosts, getProducts, getQuestions, getSettings } from "@/lib/data";

export const revalidate = 60;

export default async function Home() {
  const [settings, products, posts, questions] = await Promise.all([getSettings(), getProducts(), getBlogPosts(), getQuestions()]);
  const featuredProducts = products.filter((p) => p.featured).slice(0, 3);
  const [lead, ...rest] = posts;
  const mottoWords = settings.motto.split("•").map((w) => w.trim()).filter(Boolean);

  return (
    <>
      {/* ABERTURA */}
      <section className="noise relative overflow-hidden">
        <div className="grid-lines pointer-events-none absolute inset-0 opacity-60" aria-hidden />
        <div className="wrap relative grid items-center gap-12 py-12 sm:py-16 lg:grid-cols-[1.1fr_.9fr] lg:py-20">
          <div className="animate-rise">
            <div className="mb-6 flex items-center gap-3">
              <span className="h-px w-10 bg-gold" />
              <p className="text-[11px] font-medium uppercase tracking-luxe text-gold">{settings.registry ? `CREF ${settings.registry} · ` : ""}Preparação física</p>
            </div>
            <h1 className="font-display text-[3.6rem] font-black leading-[0.86] sm:text-[5.2rem] lg:text-[6.2rem]">
              {mottoWords.map((w, i) => (
                <span key={w} className={`block ${i === mottoWords.length - 1 ? "text-gold-metal" : ""}`}>{w}.</span>
              ))}
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-chalk-muted">
              <strong className="font-semibold text-chalk">{settings.tagline}.</strong> Sou {settings.fullName.split(" ")[0]}, profissional de Educação Física. Monto o seu treino para o seu objetivo e para a sua rotina, e acompanho cada etapa da sua evolução.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/seja-aluno">Quero ser aluno</ButtonLink>
              <ButtonLink href="#situacao" variant="secondary">Qual é a sua situação?</ButtonLink>
            </div>
            <ul className="mt-10 flex flex-wrap gap-2">
              {settings.areas.slice(0, 5).map((a) => (
                <li key={a} className="rounded-full border border-gold/25 bg-ink-800/60 px-3.5 py-1.5 text-xs text-chalk-muted">{a}</li>
              ))}
            </ul>
          </div>
          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            <Portrait src={settings.photoUrl} name={settings.fullName} />
            <div className="frame-gold absolute -left-4 top-10 hidden rounded-2xl border border-gold/30 bg-ink-800/90 p-4 backdrop-blur sm:block lg:-left-10">
              <p className="text-[10px] uppercase tracking-luxe text-gold">Treino no app</p>
              <p className="mt-1 font-display text-2xl font-black uppercase leading-none">Onde você<br />estiver</p>
            </div>
            {settings.postgrads.length > 0 && (
              <div className="frame-gold absolute -bottom-6 -right-2 max-w-[15rem] rounded-2xl border border-gold/30 bg-ink-800/95 p-4 backdrop-blur sm:-right-6">
                <p className="text-[10px] uppercase tracking-luxe text-gold">Formação</p>
                <p className="mt-1 text-sm font-semibold">{settings.postgrads.length} pós-graduações</p>
                <p className="mt-0.5 text-xs text-chalk-dim">Treinamento Desportivo · Fisiologia do Exercício · Musculação</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* SITUAÇÕES */}
      <Section id="situacao" eyebrow="Sua situação" title={<>Qual é o <span className="text-gold-metal">seu momento?</span></>} intro="Escolha a situação que mais parece com a sua. Em cada uma, você encontra o que fazer primeiro, os cuidados e como eu organizaria o seu treino." className="scroll-mt-20">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {situations.map((s, i) => (
            <ArtCard key={s.slug} href={`/situacao/${s.slug}`} kicker={s.kicker} lines={s.title} index={`${String(i + 1).padStart(2, "0")}/${String(situations.length).padStart(2, "0")}`} variant={i === 0 ? "gold" : "dark"} size="sm" />
          ))}
        </div>
      </Section>

      {/* PRODUTO DIGITAL */}
      <section className="wrap pb-16 sm:pb-24">
        <DigitalProductBand product={tafProduct} />
      </section>

      {/* SERVIÇOS */}
      <section className="relative border-y border-gold/15 bg-ink-800 py-16 sm:py-24">
        <div className="noise pointer-events-none absolute inset-0" aria-hidden />
        <div className="wrap relative">
          <header className="mb-12 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div className="max-w-2xl">
              <p className="eyebrow mb-3">Como eu posso te ajudar</p>
              <h2 className="text-4xl leading-[0.95] sm:text-6xl">Treino com <span className="text-gold-metal">método</span></h2>
            </div>
            <ButtonLink href="/seja-aluno" variant="secondary">Ver como funciona</ButtonLink>
          </header>
          <div className="grid gap-5 lg:grid-cols-3">
            {services.map((s, i) => (
              <Link key={s.slug} href={`/seja-aluno#${s.slug}`} className={`frame-gold group relative flex flex-col overflow-hidden rounded-2xl border p-7 transition duration-500 hover:-translate-y-1 ${s.featured ? "border-gold/50 bg-ink lg:row-span-3" : "border-gold/15 bg-ink/60 hover:border-gold/40"}`}>
                {s.featured && (
                  <>
                    <Image src="/img/aimore/aimore-retrato-estilo-sm.webp" alt="" fill sizes="(min-width: 1024px) 33vw, 90vw" className="object-cover object-top opacity-30" />
                    <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/70 to-ink" aria-hidden />
                    <div className="pointer-events-none absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-gold/20 blur-3xl" aria-hidden />
                  </>
                )}
                <div className="relative flex items-center justify-between">
                  <span className="grid h-12 w-12 place-items-center rounded-xl border border-gold/30 text-gold"><Icon name={s.icon} className="h-6 w-6" /></span>
                  <span className="font-display text-5xl font-black text-gold/15">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <p className="relative mt-6 text-[11px] uppercase tracking-[0.24em] text-gold">{s.kicker}</p>
                <h3 className={`relative mt-2 font-display font-black uppercase leading-[0.9] ${s.featured ? "text-6xl" : "text-4xl"}`}>
                  {s.title[0]} <span className="text-gold-metal">{s.title[1]}</span>
                </h3>
                <p className="relative mt-4 text-sm leading-relaxed text-chalk-muted">{s.text}</p>
                {s.featured && (
                  <ul className="relative mt-6 space-y-2.5 text-sm">
                    {s.bullets.map((b) => <li key={b} className="flex gap-3"><Icon name="check" className="h-4 w-4 shrink-0 text-gold" />{b}</li>)}
                  </ul>
                )}
                <div className="relative mt-auto flex items-end justify-between pt-8">
                  {s.price ? <p className="font-display text-4xl font-black text-gold-metal">{s.price}</p> : <span />}
                  <span className="text-xs font-semibold uppercase tracking-wider text-gold">Saiba mais →</span>
                </div>
              </Link>
            ))}
            <Link href="/avaliacao" className="frame-gold group relative flex flex-col justify-between overflow-hidden rounded-2xl bg-gold-metal p-7 text-ink transition duration-500 hover:-translate-y-1">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em]">Não sabe por onde começar?</p>
              <p className="mt-6 font-display text-4xl font-black uppercase leading-[0.9]">Faça a autoavaliação</p>
              <p className="mt-3 text-sm text-ink/80">Em 3 minutos você descobre seu ponto de partida e qual caminho combina com você.</p>
              <span className="mt-6 text-xs font-bold uppercase tracking-wider">Começar →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* FAIXA: ATLETA CORRENDO (imagem ilustrativa) */}
      <section className="noise relative overflow-hidden border-b border-gold/15">
        <div className="wrap grid items-center gap-12 py-16 sm:py-24 lg:grid-cols-[1fr_.8fr]">
          <div>
            <p className="eyebrow mb-4">Treino é rotina</p>
            <h2 className="font-display text-6xl font-black leading-[0.86] sm:text-8xl">
              Cada passo <span className="block text-gold-metal">conta.</span>
            </h2>
            <p className="mt-6 max-w-md text-lg text-chalk-muted">Disciplina não é treinar perfeito. É aparecer de novo amanhã, com um plano que faz sentido para você.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/seja-aluno">Quero ser aluno</ButtonLink>
              <ButtonLink href="/situacao/vou-comecar" variant="secondary">Estou começando agora</ButtonLink>
            </div>
          </div>
          <div className="frame-gold glow-gold relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-[2rem] border border-gold/30">
            <Image src="/img/aimore/corredor-paisagem.webp" alt="Corredor em uma trilha de montanha ao pôr do sol (imagem ilustrativa)" fill sizes="(min-width: 1024px) 34vw, 90vw" className="object-cover" />
            <span className="absolute right-4 top-4 rounded-full bg-ink/70 px-3 py-1 text-[10px] uppercase tracking-wider text-chalk-dim backdrop-blur">Imagem ilustrativa</span>
            <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" aria-hidden />
            <p className="absolute inset-x-6 bottom-6 font-display text-3xl font-black uppercase leading-none">Um passo <span className="text-gold-metal">por dia.</span></p>
          </div>
        </div>
      </section>

      {/* BLOG */}
      {lead && (
        <Section eyebrow="Blog do Aimoré" title={<>Conteúdo que <span className="text-gold-metal">ensina</span></>} intro="Artigos sobre hidratação, musculação, futsal, TAF e emagrecimento, escritos para você entender o porquê de cada escolha.">
          <div className="grid gap-5 lg:grid-cols-[1.2fr_1fr]">
            <Link href={`/blog/${lead.slug}`} className="group flex flex-col">
              <div className="min-h-[22rem] flex-1">
                <ArtCard kicker={lead.cover.kicker} lines={lead.cover.lines} variant={lead.cover.variant} size="lg" footer={<span>{blogCategories[lead.category]}</span>} />
              </div>
              <h3 className="mt-4 font-sans text-xl font-semibold normal-case tracking-normal group-hover:text-gold">{lead.title}</h3>
              <p className="mt-1 text-sm text-chalk-muted">{lead.excerpt}</p>
            </Link>
            <div className="grid gap-4">
              {rest.slice(0, 3).map((p) => (
                <Link key={p.slug} href={`/blog/${p.slug}`} className="group flex gap-4 rounded-2xl border border-gold/15 bg-ink-800 p-4 transition hover:border-gold/40">
                  <div className={`grid w-24 shrink-0 place-items-center rounded-xl p-2 text-center font-display text-lg font-black uppercase leading-none ${p.cover.variant === "gold" ? "bg-gold-metal text-ink" : "border border-gold/25 text-gold"}`}>{p.cover.lines[0]}</div>
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.2em] text-gold">{blogCategories[p.category]}</p>
                    <h3 className="mt-1 font-sans text-base font-semibold normal-case leading-snug tracking-normal group-hover:text-gold">{p.title}</h3>
                  </div>
                </Link>
              ))}
              <Link href="/blog/perguntas" className="frame-gold group relative flex items-center gap-4 overflow-hidden rounded-2xl bg-gold-metal p-5 text-ink">
                <Image src="/img/aimore/aimore-avatar.webp" alt="" width={64} height={64} className="h-16 w-16 rounded-full border-2 border-ink/30 object-cover" />
                <div>
                  <p className="font-display text-2xl font-black uppercase leading-none">Pergunte ao Aimoré</p>
                  <p className="mt-1 text-sm text-ink/80">{questions.length} dúvidas respondidas. Mande a sua.</p>
                </div>
              </Link>
            </div>
          </div>
          <div className="mt-10"><ButtonLink href="/blog" variant="secondary">Ver todos os artigos</ButtonLink></div>
        </Section>
      )}

      {/* FERRAMENTAS */}
      <section className="border-y border-gold/15 bg-ink-800 py-16">
        <div className="wrap grid gap-5 md:grid-cols-2">
          <Link href="/avaliacao" className="frame-gold group relative overflow-hidden rounded-2xl border border-gold/20 bg-ink p-8 hover:border-gold/50">
            <Icon name="pulse" className="h-8 w-8 text-gold" />
            <h3 className="mt-6 text-4xl">Minha <span className="text-gold-metal">Avaliação Física</span></h3>
            <p className="mt-2 text-sm text-chalk-muted">IMC, situação atual e um plano de ação em cerca de 3 minutos.</p>
            <span className="mt-6 inline-block text-xs font-semibold uppercase tracking-wider text-gold">Fazer agora →</span>
          </Link>
          <Link href="/gerador-de-treino" className="frame-gold group relative overflow-hidden rounded-2xl border border-gold/20 bg-ink p-8 hover:border-gold/50">
            <Icon name="dumbbell" className="h-8 w-8 text-gold" />
            <h3 className="mt-6 text-4xl">Gerador de <span className="text-gold-metal">treino</span></h3>
            <p className="mt-2 text-sm text-chalk-muted">Uma sugestão semanal com exemplos de exercícios para o seu perfil.</p>
            <span className="mt-6 inline-block text-xs font-semibold uppercase tracking-wider text-gold">Montar sugestão →</span>
          </Link>
        </div>
      </section>

      {/* INSTAGRAM */}
      <Section eyebrow="No Instagram" title={<>Acompanhe a <span className="text-gold-metal">evolução</span> diária</>} intro={<>Conteúdo novo toda semana em <strong className="text-chalk">{instagramHandle}</strong>.</>}>
        <InstagramGrid href={settings.socials.instagram ?? instagramUrl} />
        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink href={settings.socials.instagram ?? instagramUrl} external variant="secondary"><Icon name="instagram" className="h-4 w-4" /> Seguir {instagramHandle}</ButtonLink>
          {settings.playlistUrl && <ButtonLink href={settings.playlistUrl} external variant="ghost">Playlist de treino (rock)</ButtonLink>}
        </div>
      </Section>

      {/* LOJA */}
      {featuredProducts.length > 0 && (
        <Section eyebrow="Loja" title={<>Vista a <span className="text-gold-metal">disciplina</span></>} intro="Peças e canecas com a identidade Aimoré Performance." className="border-t border-gold/15 bg-ink-800">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featuredProducts.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
          <div className="mt-10 flex flex-wrap gap-3">
            <ButtonLink href="/loja" variant="secondary">Ver a loja</ButtonLink>
            {settings.storeUrl && <ButtonLink href={settings.storeUrl} external variant="ghost">Coleção completa →</ButtonLink>}
          </div>
        </Section>
      )}

      {/* CHAMADA FINAL */}
      <section className="noise relative overflow-hidden py-20 sm:py-28">
        <div className="wrap relative grid items-center gap-10 lg:grid-cols-[auto_1fr]">
          <div className="relative mx-auto h-44 w-44 overflow-hidden rounded-full border border-gold/40 glow-gold sm:h-56 sm:w-56">
            <Image src="/img/aimore/aimore-avatar.webp" alt={settings.fullName} fill sizes="224px" className="object-cover" />
          </div>
          <div className="text-center lg:text-left">
            <BrandMark className="mx-auto mb-4 h-10 w-11 lg:mx-0" />
            <h2 className="text-5xl leading-[0.9] sm:text-7xl">Seu objetivo merece <span className="text-gold-metal">um plano.</span></h2>
            <p className="mt-4 max-w-xl text-lg text-chalk-muted lg:mx-0">O cadastro leva poucos minutos. Depois, eu analiso suas respostas e monto o seu treino no app.</p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
              <ButtonLink href="/seja-aluno">Quero ser aluno</ButtonLink>
              <ButtonLink href="/avaliacao" variant="secondary">Fazer autoavaliação</ButtonLink>
            </div>
            {settings.memberAreaUrl && (
              <p className="mt-5 text-sm text-chalk-muted">
                Já comprou um conteúdo?{" "}
                <a href={settings.memberAreaUrl} target="_blank" rel="noopener noreferrer" className="font-semibold text-gold underline">Acesse a área de membros na Hotmart</a>
              </p>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
