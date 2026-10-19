import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { formatDate } from "@/lib/format";
import { requireUser } from "@/lib/student";
import { addActivity, addNote, deleteActivity, deleteNote, toggleActivity } from "../actions";

export const metadata: Metadata = { title: "Atividades e notas" };

export default async function ActivitiesPage() {
  const user = await requireUser("/aluno/atividades");
  const [{ data: activities }, { data: notes }] = await Promise.all([
    user.supabase.from("activities").select("*").order("done").order("created_at", { ascending: false }),
    user.supabase.from("notes").select("*").order("created_at", { ascending: false }).limit(50),
  ]);

  return (
    <div className="grid gap-10 xl:grid-cols-2">
      <section>
        <h1 className="mb-6 text-5xl">Atividades</h1>
        <form action={addActivity} className="mb-5 flex gap-2">
          <label htmlFor="title" className="sr-only">Nova atividade</label>
          <input id="title" name="title" required maxLength={140} placeholder="Ex.: Caminhada de 30 minutos" className="field" />
          <Button type="submit" className="shrink-0 !px-5">Adicionar</Button>
        </form>
        <ul className="space-y-2">
          {activities?.map((a) => (
            <li key={a.id} className="card flex items-center gap-3 p-3">
              <form action={toggleActivity}>
                <input type="hidden" name="id" value={a.id} />
                <input type="hidden" name="done" value={String(a.done)} />
                <button aria-label={a.done ? `Desmarcar ${a.title}` : `Concluir ${a.title}`} className={`grid h-7 w-7 place-items-center rounded-lg border ${a.done ? "border-gold bg-gold text-ink" : "border-gold/30"}`}>{a.done ? "✓" : ""}</button>
              </form>
              <span className={`flex-1 text-sm ${a.done ? "text-chalk-dim line-through" : ""}`}>{a.title}</span>
              <form action={deleteActivity}><input type="hidden" name="id" value={a.id} /><button className="text-xs text-chalk-dim hover:text-danger" aria-label={`Excluir ${a.title}`}>Excluir</button></form>
            </li>
          ))}
          {!activities?.length && <li className="text-sm text-chalk-muted">Nenhuma atividade ainda. Adicione os treinos da semana e marque ao concluir.</li>}
        </ul>
      </section>
      <section>
        <h2 className="mb-6 text-5xl">Observações</h2>
        <form action={addNote} className="mb-5 space-y-2">
          <label htmlFor="body" className="sr-only">Nova observação</label>
          <textarea id="body" name="body" required maxLength={2000} rows={3} placeholder="Como foi o treino? Como você se sentiu?" className="field" />
          <Button type="submit" variant="secondary">Salvar observação</Button>
        </form>
        <ul className="space-y-3">
          {notes?.map((n) => (
            <li key={n.id} className="card p-4">
              <p className="whitespace-pre-line text-sm">{n.body}</p>
              <div className="mt-2 flex justify-between text-xs text-chalk-dim">
                <span>{formatDate(n.created_at)}</span>
                <form action={deleteNote}><input type="hidden" name="id" value={n.id} /><button className="hover:text-danger">Excluir</button></form>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
