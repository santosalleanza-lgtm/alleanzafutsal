import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/Button";
import type { Summary } from "@/lib/assessment";
import { formatDate } from "@/lib/format";
import { requireUser } from "@/lib/student";
import { deleteAssessment } from "../actions";

export const metadata: Metadata = { title: "Minhas avaliações" };

export default async function MyAssessments() {
  const user = await requireUser("/aluno/avaliacoes");
  const { data } = await user.supabase.from("assessments").select("id, created_at, bmi, summary").order("created_at", { ascending: false });
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-5xl">Avaliações</h1>
        <ButtonLink href="/avaliacao">Nova avaliação</ButtonLink>
      </div>
      {!data?.length && <p className="text-chalk-muted">Você ainda não salvou nenhuma avaliação.</p>}
      <ul className="space-y-4">
        {data?.map((a) => {
          const s = a.summary as Summary;
          return (
            <li key={a.id} className="card p-6">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h2 className="text-2xl">{formatDate(a.created_at)}</h2>
                <span className="text-sm text-chalk-muted">{s.goal}{a.bmi ? ` · IMC ${String(a.bmi).replace(".", ",")}` : ""}</span>
              </div>
              <details className="mt-3">
                <summary className="cursor-pointer text-sm text-gold">Ver resumo</summary>
                <div className="mt-3 space-y-3 text-sm text-chalk-muted">
                  <p>{s.profile}</p>
                  <ul className="list-disc pl-5">{s.situation.map((x) => <li key={x}>{x}</li>)}</ul>
                  <p><strong className="text-chalk">Frequência:</strong> {s.frequency}</p>
                  <p><strong className="text-chalk">Próximo passo:</strong> {s.nextStep}</p>
                </div>
              </details>
              <form action={deleteAssessment} className="mt-4">
                <input type="hidden" name="id" value={a.id} />
                <button className="text-xs text-chalk-dim hover:text-danger">Excluir esta avaliação</button>
              </form>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
