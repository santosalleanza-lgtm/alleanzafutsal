import type { Metadata } from "next";
import { Portrait } from "@/components/Portrait";
import { SocialLinks } from "@/components/SocialLinks";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { getSettings } from "@/lib/data";
import { whatsappLink, whatsappTopics } from "@/lib/whatsapp";

export const revalidate = 60;
export const metadata: Metadata = {
  title: "Sobre mim",
  description: "Conheça Aimoré Weren, profissional de Educação Física com pós-graduações em Treinamento Desportivo, Fisiologia do Exercício e Musculação e Condicionamento Físico.",
  alternates: { canonical: "/sobre" },
};

function List({ title, items }: { title: string; items: string[] }) {
  if (!items.length) return null;
  return (
    <section>
      <h2 className="mb-4 text-3xl">{title}</h2>
      <ul className="space-y-2">
        {items.map((i) => <li key={i} className="flex gap-3 text-chalk-muted"><Icon name="check" className="mt-0.5 h-5 w-5 shrink-0 text-lime" />{i}</li>)}
      </ul>
    </section>
  );
}

export default async function AboutPage() {
  const s = await getSettings();
  const wa = whatsappLink(s.whatsapp, whatsappTopics.acompanhamento);
  return (
    <div className="wrap grid gap-12 py-14 lg:grid-cols-[.8fr_1.2fr]">
      <div className="lg:sticky lg:top-24 lg:h-fit">
        <Portrait src={s.photoUrl} name={s.fullName} />
        <SocialLinks socials={s.socials} className="mt-6" />
      </div>
      <div className="space-y-12">
        <header>
          <p className="eyebrow mb-3">Sobre mim</p>
          <h1 className="text-6xl leading-[0.9]">{s.fullName}</h1>
          <p className="mt-2 text-chalk-muted">Profissional de Educação Física{s.registry ? ` · Registro profissional ${s.registry}` : ""}</p>
          <p className="mt-6 text-lg leading-relaxed text-chalk-muted">{s.bio}</p>
        </header>
        {s.philosophy && (
          <section className="card border-lime/30 p-6">
            <p className="eyebrow mb-2">Filosofia de trabalho</p>
            <p className="font-display text-3xl uppercase leading-tight">{s.philosophy}</p>
          </section>
        )}
        <List title="Formação" items={s.education.map((e) => `Graduação em ${e}`)} />
        <List title="Pós-graduações" items={s.postgrads} />
        <List title="Especializações" items={s.specializations} />
        <List title="Experiência" items={s.experience} />
        <List title="Áreas de atuação" items={s.areas} />
        <div className="flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/programas">Conheça os programas</ButtonLink>
          {wa && <ButtonLink href={wa} external variant="secondary">Conhecer o acompanhamento online</ButtonLink>}
        </div>
      </div>
    </div>
  );
}
