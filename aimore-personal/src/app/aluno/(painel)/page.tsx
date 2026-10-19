import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";
import type { Summary } from "@/lib/assessment";
import { formatDate } from "@/lib/format";
import { requireUser } from "@/lib/student";

export const metadata: Metadata = { title: "Área do aluno" };

export default async function StudentHome() {
  const user = await requireUser();
  const [{ data: programs }, { data: last }, { count: pending }] = await Promise.all([
    user.supabase.rpc("my_programs"),
    user.supabase.from("assessments").select("created_at, summary").order("created_at", { ascending: false }).limit(1).maybeSingle(),
    user.supabase.from("activities").select("id", { count: "exact", head: true }).eq("done", false),
  ]);
  const summary = last?.summary as Summary | undefined;

  return (
    <div className="space-y-8">
      <h1 className="text-5xl">Seu painel</h1>
      <div className="grid gap-4 sm:grid-cols-3">
        <Link href="/aluno/programas" className="card p-5 hover:border-gold/50"><p className="eyebrow">Programas</p><p className="mt-2 font-display text-5xl">{programs?.length ?? 0}</p></Link>
        <Link href="/aluno/avaliacoes" className="card p-5 hover:border-gold/50"><p className="eyebrow">Última avaliação</p><p className="mt-2 text-lg font-semibold">{last ? formatDate(last.created_at) : "Nenhuma ainda"}</p></Link>
        <Link href="/aluno/atividades" className="card p-5 hover:border-gold/50"><p className="eyebrow">Atividades pendentes</p><p className="mt-2 font-display text-5xl">{pending ?? 0}</p></Link>
      </div>
      {summary ? (
        <section className="card p-6">
          <h2 className="mb-4 text-3xl">Recomendações educativas</h2>
          <ul className="space-y-2 text-sm text-chalk-muted">{summary.suggestions.map((s) => <li key={s}>• {s}</li>)}</ul>
          <p className="mt-4 rounded-xl border border-gold/30 bg-gold/5 p-4 text-sm"><strong>Próximo passo:</strong> {summary.nextStep}</p>
        </section>
      ) : (
        <section className="card p-6">
          <h2 className="text-3xl">Comece pela autoavaliação</h2>
          <p className="mt-2 text-sm text-chalk-muted">Em 3 minutos você registra seu ponto de partida e recebe sugestões para a sua rotina.</p>
          <ButtonLink href="/avaliacao" className="mt-5">Fazer autoavaliação</ButtonLink>
        </section>
      )}
    </div>
  );
}
