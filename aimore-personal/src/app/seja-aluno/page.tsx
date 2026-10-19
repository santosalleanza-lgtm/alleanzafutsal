import type { Metadata } from "next";
import { Portrait } from "@/components/Portrait";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Notice } from "@/components/ui/Notice";
import { services } from "@/data/services";
import { getSettings } from "@/lib/data";
import { whatsappLink, whatsappTopics } from "@/lib/whatsapp";

export const revalidate = 60;
export const metadata: Metadata = {
  title: "Quero ser aluno",
  description: "Faça seu cadastro no Time Aimoré: treino individualizado no app MFIT, acompanhamento e ajustes conforme a sua evolução.",
  alternates: { canonical: "/seja-aluno" },
};

const steps = [
  { title: "Cadastro", text: "Preencha o cadastro do Time Aimoré no app MFIT, com seus objetivos, rotina e histórico." },
  { title: "Alinhamento", text: "Conversamos para entender o seu momento, o local de treino e os equipamentos disponíveis." },
  { title: "Treino no app", text: "Seu treino chega no MFIT, com os exercícios, séries e vídeos de execução." },
  { title: "Evolução", text: "Acompanho o seu progresso e ajusto o treino conforme você evolui." },
];

const faq = [
  { q: "Preciso treinar em academia?", a: "Não. O treino é montado para o local onde você vai treinar: academia, casa, condomínio ou ao ar livre, com os equipamentos que você tiver." },
  { q: "Serve para iniciantes?", a: "Sim. O treino respeita o seu nível atual e evolui aos poucos. Quem está começando aprende os movimentos antes de aumentar a intensidade." },
  { q: "Como funciona o app MFIT?", a: "É o aplicativo onde você recebe o treino, vê os vídeos dos exercícios e registra o que fez. Ele funciona no celular." },
  { q: "Tenho uma condição de saúde. Posso começar?", a: "Em casos como doenças cardíacas, cirurgias recentes, gestação ou uso de medicamentos, é preciso liberação médica antes. Me conte no cadastro para o treino ser adaptado." },
];

export default async function JoinPage() {
  const s = await getSettings();
  const wa = whatsappLink(s.whatsapp, whatsappTopics.acompanhamento);
  const signup = s.signupUrl;
  return (
    <>
      <section className="noise relative overflow-hidden border-b border-gold/15">
        <div className="grid-lines pointer-events-none absolute inset-0 opacity-60" aria-hidden />
        <div className="wrap relative grid items-center gap-12 py-14 lg:grid-cols-[1.1fr_.9fr]">
          <div>
            <p className="eyebrow mb-4">Time Aimoré</p>
            <h1 className="font-display text-6xl font-black leading-[0.86] sm:text-7xl">Faça parte <span className="block text-gold-metal">do time.</span></h1>
            <p className="mt-6 max-w-xl text-lg text-chalk-muted">
              Você não precisa morar perto de mim para treinar comigo. Treino individualizado no aplicativo, com acompanhamento e ajustes conforme a sua evolução.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              {signup && <ButtonLink href={signup} external>Fazer meu cadastro</ButtonLink>}
              {wa && <ButtonLink href={wa} external variant="secondary"><Icon name="whatsapp" className="h-4 w-4" /> Tirar dúvidas no WhatsApp</ButtonLink>}
            </div>
            <p className="mt-3 text-xs text-chalk-dim">O cadastro é feito na plataforma MFIT, em ambiente próprio do aplicativo.</p>
          </div>
          <Portrait src="/img/aimore/corredor-espelho.webp" name={s.fullName} illustrative caption={["Faça parte", "do time"]} className="mx-auto w-full max-w-sm" />
        </div>
      </section>

      <section className="wrap py-16 sm:py-24">
        <p className="eyebrow mb-3">Como funciona</p>
        <h2 className="mb-10 text-5xl leading-[0.95]">Do cadastro à <span className="text-gold-metal">evolução</span></h2>
        <ol className="grid gap-4 md:grid-cols-4">
          {steps.map((st, i) => (
            <li key={st.title} className="frame-gold relative rounded-2xl border border-gold/20 bg-ink-800 p-6">
              <span className="font-display text-6xl font-black text-gold-metal">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-3 text-2xl">{st.title}</h3>
              <p className="mt-2 text-sm text-chalk-muted">{st.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="border-y border-gold/15 bg-ink-800 py-16 sm:py-24">
        <div className="wrap">
          <p className="eyebrow mb-3">Áreas de atuação</p>
          <h2 className="mb-10 text-5xl leading-[0.95]">Para cada objetivo, <span className="text-gold-metal">um método</span></h2>
          <div className="grid gap-5 md:grid-cols-2">
            {services.map((sv) => (
              <article key={sv.slug} id={sv.slug} className={`frame-gold scroll-mt-24 rounded-2xl border p-7 ${sv.featured ? "border-gold/50 bg-ink md:col-span-2 md:grid md:grid-cols-[1fr_auto] md:items-center md:gap-10" : "border-gold/15 bg-ink/60"}`}>
                <div>
                  <div className="flex items-center gap-3">
                    <span className="grid h-11 w-11 place-items-center rounded-xl border border-gold/30 text-gold"><Icon name={sv.icon} className="h-5 w-5" /></span>
                    <p className="text-[11px] uppercase tracking-[0.24em] text-gold">{sv.kicker}</p>
                  </div>
                  <h3 className="mt-4 text-4xl">{sv.title[0]} <span className="text-gold-metal">{sv.title[1]}</span></h3>
                  <p className="mt-3 text-sm leading-relaxed text-chalk-muted">{sv.text}</p>
                  <ul className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
                    {sv.bullets.map((b) => <li key={b} className="flex gap-2"><Icon name="check" className="h-4 w-4 shrink-0 text-gold" />{b}</li>)}
                  </ul>
                </div>
                {sv.featured && (
                  <div className="mt-8 rounded-2xl bg-gold-metal p-6 text-center text-ink md:mt-0 md:min-w-64">
                    <p className="text-xs font-semibold uppercase tracking-[0.24em]">Consultoria online</p>
                    <p className="mt-2 font-display text-5xl font-black">{sv.price}</p>
                    {signup && <a href={signup} target="_blank" rel="noopener noreferrer" className="mt-4 inline-block w-full rounded-full bg-ink px-5 py-3 text-sm font-semibold uppercase text-chalk">Quero ser aluno</a>}
                  </div>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="wrap max-w-3xl py-16 sm:py-24">
        <h2 className="mb-6 text-5xl">Dúvidas <span className="text-gold-metal">frequentes</span></h2>
        <div className="space-y-3">
          {faq.map((f) => (
            <details key={f.q} className="group rounded-2xl border border-gold/15 bg-ink-800 p-5">
              <summary className="cursor-pointer list-none font-semibold">{f.q}<span className="float-right text-gold group-open:rotate-45">+</span></summary>
              <p className="mt-3 text-sm leading-relaxed text-chalk-muted">{f.a}</p>
            </details>
          ))}
        </div>
        <Notice className="mt-8">Treino orientado não substitui avaliação médica. Resultados dependem de regularidade, sono, alimentação e condições individuais.</Notice>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          {signup && <ButtonLink href={signup} external>Fazer meu cadastro</ButtonLink>}
          {wa && <ButtonLink href={wa} external variant="secondary">Falar no WhatsApp</ButtonLink>}
        </div>
      </section>
    </>
  );
}
