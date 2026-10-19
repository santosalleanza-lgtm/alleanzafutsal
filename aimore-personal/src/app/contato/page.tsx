import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { SocialLinks } from "@/components/SocialLinks";
import { Icon } from "@/components/ui/Icon";
import { PageHeader } from "@/components/ui/Section";
import { getSettings } from "@/lib/data";
import { whatsappLink, whatsappTopics, type WhatsappTopic } from "@/lib/whatsapp";

export const revalidate = 60;
export const metadata: Metadata = { title: "Contato", description: "Fale com Aimoré Personal pelo formulário ou WhatsApp.", alternates: { canonical: "/contato" } };

const quick: { topic: WhatsappTopic; label: string }[] = [
  { topic: "programas", label: "Dúvidas sobre programas" },
  { topic: "loja", label: "Dúvidas sobre a loja" },
  { topic: "avaliacao", label: "Dúvidas sobre a avaliação física" },
  { topic: "acompanhamento", label: "Conhecer o acompanhamento online" },
];

const faq = [
  { q: "Como compro um programa?", a: "Na página do programa, o botão de compra leva ao checkout oficial da Hotmart. Depois da compra, o acesso chega no e-mail usado no pagamento e aparece na sua área do aluno quando você entra com o mesmo e-mail." },
  { q: "Os programas substituem acompanhamento médico?", a: "Não. Os programas são conteúdos de treinamento. Para condições de saúde, cirurgias ou uso de medicamentos, siga sempre a orientação da sua equipe de saúde." },
  { q: "Como funciona o frete da loja?", a: "O frete é calculado de acordo com o endereço de entrega e informado antes do envio. Prazos de produção variam conforme a personalização." },
  { q: "Meus dados da autoavaliação ficam públicos?", a: "Não. A autoavaliação roda no seu navegador e só é gravada se você escolher salvar na sua conta. Somente você acessa esses dados e pode excluí-los quando quiser." },
  { q: "Posso trocar um produto personalizado?", a: "Produtos com personalização são feitos sob demanda. Em caso de defeito, entre em contato para resolvermos. Seus direitos como consumidor são garantidos pelo Código de Defesa do Consumidor." },
];

export default async function ContactPage() {
  const s = await getSettings();
  return (
    <>
      <PageHeader eyebrow="Contato" title="Vamos conversar" intro="Escolha o canal que preferir. Pelo WhatsApp, as mensagens abaixo já vão prontas." />
      <div className="wrap grid gap-10 py-12 lg:grid-cols-[1fr_.9fr]">
        <div className="card p-6 sm:p-8"><ContactForm /></div>
        <div className="space-y-8">
          {s.whatsapp && (
            <section>
              <h2 className="mb-4 text-3xl">WhatsApp</h2>
              <ul className="grid gap-2">
                {quick.map((q) => {
                  const href = whatsappLink(s.whatsapp, whatsappTopics[q.topic]);
                  return href ? (
                    <li key={q.topic}>
                      <a href={href} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between rounded-xl border border-white/15 px-5 py-4 text-sm font-semibold hover:border-lime hover:text-lime">
                        <span className="flex items-center gap-3"><Icon name="whatsapp" className="h-5 w-5 text-lime" />{q.label}</span>→
                      </a>
                    </li>
                  ) : null;
                })}
              </ul>
            </section>
          )}
          {s.contactEmail && <p className="text-sm text-chalk-muted">E-mail: <a href={`mailto:${s.contactEmail}`} className="text-lime">{s.contactEmail}</a></p>}
          <SocialLinks socials={s.socials} />
        </div>
      </div>
      <section className="wrap pb-16" aria-labelledby="faq">
        <h2 id="faq" className="mb-6 text-4xl">Perguntas frequentes</h2>
        <div className="space-y-3">
          {faq.map((f) => (
            <details key={f.q} className="card group p-5">
              <summary className="cursor-pointer list-none font-semibold">{f.q}<span className="float-right text-lime group-open:rotate-45">+</span></summary>
              <p className="mt-3 text-sm leading-relaxed text-chalk-muted">{f.a}</p>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}
