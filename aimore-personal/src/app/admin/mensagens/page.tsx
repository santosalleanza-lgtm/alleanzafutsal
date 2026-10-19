import { formatDate } from "@/lib/format";
import { requireAdmin } from "@/lib/student";
import { deleteRow } from "../actions";

export default async function AdminMessages() {
  const user = await requireAdmin();
  const { data } = await user.supabase.from("contact_messages").select("*").order("created_at", { ascending: false }).limit(100);
  return (
    <div className="space-y-6">
      <h1 className="text-5xl">Mensagens</h1>
      {!data?.length && <p className="text-chalk-muted">Nenhuma mensagem.</p>}
      {data?.map((m) => (
        <article key={m.id} className="card p-5">
          <header className="flex flex-wrap justify-between gap-2 text-sm">
            <strong>{m.subject}</strong>
            <span className="text-chalk-dim">{formatDate(m.created_at)}</span>
          </header>
          <p className="mt-1 text-sm text-chalk-muted">{m.name} · <a href={`mailto:${m.email}`} className="text-lime">{m.email}</a></p>
          <p className="mt-3 whitespace-pre-line text-sm">{m.message}</p>
          <form action={deleteRow} className="mt-3"><input type="hidden" name="table" value="contact_messages" /><input type="hidden" name="id" value={m.id} /><button className="text-xs text-chalk-dim hover:text-danger">Apagar (após responder)</button></form>
        </article>
      ))}
    </div>
  );
}
