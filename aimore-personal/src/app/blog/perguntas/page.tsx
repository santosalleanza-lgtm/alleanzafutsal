import type { Metadata } from "next";
import { AskForm } from "@/components/AskForm";
import { Avatar } from "@/components/Avatar";
import { Notice } from "@/components/ui/Notice";
import { blogCategories, type BlogCategory } from "@/data/blog";
import { getQuestions } from "@/lib/data";

export const revalidate = 60;
export const metadata: Metadata = {
  title: "Pergunte ao Aimoré",
  description: "Dúvidas sobre treino, hidratação, musculação, futsal, TAF e emagrecimento respondidas pelo personal Aimoré Weren.",
  alternates: { canonical: "/blog/perguntas" },
};

export default async function QuestionsPage() {
  const questions = await getQuestions();
  const groups = (Object.keys(blogCategories) as BlogCategory[]).map((c) => ({ c, items: questions.filter((q) => q.category === c) })).filter((g) => g.items.length);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: questions.map((q) => ({ "@type": "Question", name: q.question, acceptedAnswer: { "@type": "Answer", text: q.answer } })),
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="noise relative overflow-hidden border-b border-gold/15">
        <div className="wrap relative grid items-center gap-10 py-14 lg:grid-cols-[auto_1fr]">
          <Avatar size={176} className="mx-auto glow-gold" />
          <div>
            <p className="eyebrow mb-3">Blog do Aimoré</p>
            <h1 className="font-display text-6xl font-black leading-[0.86] sm:text-7xl">Pergunte ao <span className="text-gold-metal">Aimoré</span></h1>
            <p className="mt-5 max-w-2xl text-lg text-chalk-muted">As dúvidas que mais recebo no Instagram e no WhatsApp, respondidas para todo mundo. Não achou a sua? Mande abaixo.</p>
          </div>
        </div>
      </section>
      <div className="wrap grid gap-12 py-12 lg:grid-cols-[1fr_24rem]">
        <div className="space-y-10">
          {groups.map((g) => (
            <section key={g.c} aria-labelledby={`q-${g.c}`}>
              <h2 id={`q-${g.c}`} className="mb-4 text-3xl">{blogCategories[g.c]}</h2>
              <div className="space-y-3">
                {g.items.map((q) => (
                  <details key={q.slug} className="group rounded-2xl border border-gold/15 bg-ink-800 p-5 open:border-gold/40">
                    <summary className="flex cursor-pointer list-none items-start justify-between gap-4 font-semibold">
                      <span><span className="mr-2 font-display text-gold">P.</span>{q.question}</span>
                      <span className="text-gold transition group-open:rotate-45">+</span>
                    </summary>
                    <div className="mt-4 flex gap-3 border-t border-gold/10 pt-4">
                      <Avatar size={36} />
                      <p className="text-sm leading-relaxed text-chalk-muted">{q.answer}</p>
                    </div>
                  </details>
                ))}
              </div>
            </section>
          ))}
          <Notice>Respostas educativas e gerais. Para o seu caso específico, o ideal é uma avaliação individual.</Notice>
        </div>
        <aside className="lg:sticky lg:top-24 lg:h-fit">
          <div className="frame-gold rounded-2xl border border-gold/30 bg-ink-800 p-6">
            <p className="font-display text-3xl font-black uppercase leading-none">Mande sua <span className="text-gold-metal">pergunta</span></p>
            <div className="mt-5"><AskForm /></div>
          </div>
        </aside>
      </div>
    </>
  );
}
