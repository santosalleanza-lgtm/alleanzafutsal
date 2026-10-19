import Link from "next/link";
import { Portrait } from "@/components/Portrait";
import { ProductCard } from "@/components/ProductCard";
import { ProgramCard } from "@/components/ProgramCard";
import { SocialLinks } from "@/components/SocialLinks";
import { ButtonLink } from "@/components/ui/Button";
import { Icon, type IconName } from "@/components/ui/Icon";
import { Section } from "@/components/ui/Section";
import { instagramHandle } from "@/config/site";
import { getProducts, getPrograms, getSettings } from "@/lib/data";

export const revalidate = 60;

const solutions: { icon: IconName; title: string; text: string; href: string; cta: string }[] = [
  { icon: "dumbbell", title: "Programas de treinamento", text: "Planos digitais organizados por objetivo, do primeiro treino à preparação para o esporte.", href: "/programas", cta: "Ver programas" },
  { icon: "pulse", title: "Avaliação física online", text: "Uma ferramenta educativa para registrar suas informações e acompanhar a evolução ao longo do tempo.", href: "/avaliacao", cta: "Fazer autoavaliação" },
  { icon: "shirt", title: "Loja personalizada", text: "Camisetas, regatas e canecas com a identidade de quem leva o treino a sério.", href: "/loja", cta: "Personalize seu estilo" },
  { icon: "leaf", title: "Saúde e desempenho", text: "Orientações gerais sobre exercício, hábitos e alimentação, com linguagem simples e responsável.", href: "/treinos", cta: "Encontre seu treino" },
];

export default async function Home() {
  const [settings, products, programs] = await Promise.all([getSettings(), getProducts(), getPrograms()]);
  const featuredPrograms = programs.filter((p) => p.featured).slice(0, 3);
  const featuredProducts = products.filter((p) => p.featured).slice(0, 3);
  const credentials = [...settings.education.map((e) => `Graduação em ${e}`), ...settings.postgrads, ...settings.specializations];

  return (
    <>
      {/* Apresentação */}
      <section className="relative overflow-hidden">
        <div className="grid-lines pointer-events-none absolute inset-0" aria-hidden />
        <div className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-lime/10 blur-3xl" aria-hidden />
        <div className="wrap relative grid items-center gap-12 py-14 sm:py-20 lg:grid-cols-[1.15fr_.85fr]">
          <div className="animate-rise">
            <p className="eyebrow mb-5">{settings.fullName} · Profissional de Educação Física</p>
            <h1 className="text-[3.4rem] leading-[0.88] sm:text-7xl lg:text-[5.5rem]">
              A sua evolução começa com o <span className="text-lime">próximo passo.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-chalk-muted">{settings.bio}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <ButtonLink href="/programas">Conheça meus programas</ButtonLink>
              <ButtonLink href="/avaliacao" variant="secondary">Faça sua autoavaliação</ButtonLink>
              {settings.socials.instagram && (
                <ButtonLink href={settings.socials.instagram} external variant="ghost">
                  <Icon name="instagram" className="h-4 w-4" /> Acesse meu Instagram
                </ButtonLink>
              )}
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-sm lg:max-w-none">
            <Portrait src={settings.photoUrl} name={settings.fullName} />
            {credentials.length > 0 && (
              <div className="card relative -mt-16 ml-6 mr-[-0.5rem] p-5 shadow-2xl sm:ml-10">
                <p className="eyebrow mb-3">Formação</p>
                <ul className="space-y-1.5 text-sm">
                  {credentials.slice(0, 4).map((c) => (
                    <li key={c} className="flex gap-2"><Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-lime" />{c}</li>
                  ))}
                </ul>
                {settings.registry && <p className="mt-3 text-xs text-chalk-dim">Registro profissional {settings.registry}</p>}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Banner configurável no painel (campanhas, lançamentos) */}
      {settings.banner && (
        <div className="wrap pb-10">
          <div className="flex flex-col gap-4 rounded-3xl bg-lime p-6 text-ink sm:flex-row sm:items-center sm:justify-between sm:p-8">
            <div>
              <p className="font-display text-3xl uppercase leading-none">{settings.banner.title}</p>
              {settings.banner.text && <p className="mt-2 text-sm font-medium">{settings.banner.text}</p>}
            </div>
            <Link href={settings.banner.ctaHref} className="shrink-0 rounded-full bg-ink px-6 py-3 text-center text-sm font-semibold uppercase text-chalk">
              {settings.banner.ctaLabel}
            </Link>
          </div>
        </div>
      )}

      {/* Áreas de atuação */}
      {settings.areas.length > 0 && (
        <div className="border-y border-white/10 bg-ink-800">
          <ul className="wrap flex gap-8 overflow-x-auto py-5 text-sm font-semibold uppercase tracking-wider text-chalk-muted [scrollbar-width:none]">
            {settings.areas.map((a) => (
              <li key={a} className="flex shrink-0 items-center gap-3"><span className="h-1.5 w-1.5 rounded-full bg-lime" />{a}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Soluções */}
      <Section eyebrow="O que você encontra aqui" title={<>Treinamento pensado <br className="hidden sm:block" />para sua rotina</>}>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {solutions.map((s, i) => (
            <Link key={s.title} href={s.href} className="card group flex flex-col p-6 transition hover:-translate-y-1 hover:border-lime/50">
              <span className="mb-6 flex items-center justify-between">
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-lime/10 text-lime"><Icon name={s.icon} className="h-6 w-6" /></span>
                <span className="font-display text-4xl text-white/10">0{i + 1}</span>
              </span>
              <h3 className="text-2xl">{s.title}</h3>
              <p className="mt-2 flex-1 text-sm text-chalk-muted">{s.text}</p>
              <span className="mt-5 text-sm font-semibold uppercase tracking-wide text-lime">{s.cta} →</span>
            </Link>
          ))}
        </div>
      </Section>

      {/* Programas */}
      {featuredPrograms.length > 0 && (
        <Section eyebrow="Programas digitais" title="Conheça os programas" intro="Cada programa tem público, objetivos e orientações de segurança bem definidos. A compra é feita com segurança pela Hotmart." className="bg-ink-800">
          <div className="grid gap-5 md:grid-cols-3">
            {featuredPrograms.map((p) => <ProgramCard key={p.id} program={p} />)}
          </div>
          <div className="mt-10"><ButtonLink href="/programas" variant="secondary">Ver todos os programas</ButtonLink></div>
        </Section>
      )}

      {/* Produtos */}
      {featuredProducts.length > 0 && (
        <Section eyebrow="Loja" title="Personalize seu estilo" intro="Peças e canecas com a identidade da marca, para treinar, jogar ou presentear.">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featuredProducts.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </Section>
      )}

      {/* Redes sociais */}
      <Section className="bg-ink-800">
        <div className="card relative overflow-hidden p-8 sm:p-12">
          <div className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-lime/15 blur-3xl" aria-hidden />
          <p className="eyebrow mb-3">Redes sociais</p>
          <h2 className="max-w-2xl text-4xl leading-[0.95] sm:text-5xl">Acompanhe minha evolução também nas redes</h2>
          <p className="mt-4 max-w-xl text-chalk-muted">
            Dicas de treino, conteúdos sobre futebol, condicionamento e a rotina de quem treina de verdade. No Instagram, me encontre como{" "}
            <strong className="text-chalk">{instagramHandle}</strong>.
          </p>
          <SocialLinks socials={settings.socials} variant="buttons" className="mt-8" />
        </div>
      </Section>

      {/* Chamada final */}
      <section className="py-20 sm:py-28">
        <div className="wrap text-center">
          <h2 className="mx-auto max-w-3xl text-5xl leading-[0.9] sm:text-7xl">Seu objetivo merece <span className="text-lime">um plano.</span></h2>
          <p className="mx-auto mt-5 max-w-xl text-lg text-chalk-muted">Explore os programas, conheça as ferramentas disponíveis e encontre o próximo passo para sua rotina.</p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <ButtonLink href="/programas">Ver programas</ButtonLink>
            <ButtonLink href="/avaliacao" variant="secondary">Fazer autoavaliação</ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
