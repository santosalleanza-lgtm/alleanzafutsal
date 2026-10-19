import { AdminForm } from "@/components/admin/AdminForm";
import { Select, Text } from "@/components/admin/Fields";
import { formatDate } from "@/lib/format";
import { requireAdmin } from "@/lib/student";
import { grantAccess, setAccessStatus } from "../actions";

export default async function AdminStudents({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const user = await requireAdmin();
  const { q = "" } = await searchParams;
  const term = q.trim().toLowerCase().slice(0, 80);
  let accessQuery = user.supabase.from("program_access").select("id, buyer_email, status, source, created_at, programs(name)").order("created_at", { ascending: false }).limit(100);
  if (term) accessQuery = accessQuery.ilike("buyer_email", `%${term}%`);
  const [{ data: access }, { data: programs }, { data: profiles }] = await Promise.all([
    accessQuery,
    user.supabase.from("programs").select("id, name").order("sort_order"),
    user.supabase.from("profiles").select("id, full_name, role, created_at").order("created_at", { ascending: false }).limit(50),
  ]);
  return (
    <div className="space-y-10">
      <h1 className="text-5xl">Alunos e acessos</h1>
      <p className="text-sm text-chalk-muted">Por privacidade, avaliações e medidas dos alunos não aparecem no painel: só o próprio aluno acessa esses dados.</p>

      <section className="card p-6">
        <h2 className="mb-4 text-2xl">Liberar acesso manualmente</h2>
        <AdminForm action={grantAccess} submitLabel="Liberar acesso">
          <div className="grid gap-4 sm:grid-cols-2">
            <Text name="email" label="E-mail do aluno" type="email" required />
            <Select name="program_id" label="Programa" options={(programs ?? []).map((p) => ({ value: p.id, label: p.name }))} />
          </div>
          <Text name="note" label="Observação (opcional)" placeholder="Ex.: compra confirmada por Pix" />
        </AdminForm>
      </section>

      <section>
        <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
          <h2 className="text-3xl">Acessos a programas</h2>
          <form className="flex gap-2"><input name="q" defaultValue={q} placeholder="Buscar por e-mail" className="field !py-2" aria-label="Buscar por e-mail" /><button className="rounded-xl border border-white/20 px-4 text-sm">Buscar</button></form>
        </div>
        <ul className="card divide-y divide-white/10">
          {access?.map((a) => (
            <li key={a.id} className="flex flex-wrap items-center gap-3 p-4 text-sm">
              <span className="flex-1">{a.buyer_email}</span>
              <span className="text-chalk-muted">{(a.programs as unknown as { name: string } | null)?.name ?? "Produto Hotmart sem programa vinculado"}</span>
              <span className="text-xs text-chalk-dim">{a.source} · {formatDate(a.created_at)}</span>
              <span className={a.status === "ativa" ? "text-lime" : "text-danger"}>{a.status}</span>
              <form action={setAccessStatus}>
                <input type="hidden" name="id" value={a.id} />
                <input type="hidden" name="status" value={a.status === "ativa" ? "cancelada" : "ativa"} />
                <button className="text-xs text-chalk-dim hover:text-lime">{a.status === "ativa" ? "Revogar" : "Reativar"}</button>
              </form>
            </li>
          ))}
          {!access?.length && <li className="p-4 text-sm text-chalk-muted">Nenhum acesso encontrado.</li>}
        </ul>
      </section>

      <section>
        <h2 className="mb-4 text-3xl">Contas recentes</h2>
        <ul className="card divide-y divide-white/10">
          {profiles?.map((p) => <li key={p.id} className="flex justify-between p-4 text-sm"><span>{p.full_name || "(sem nome)"}</span><span className="text-chalk-dim">{p.role} · {formatDate(p.created_at)}</span></li>)}
        </ul>
      </section>
    </div>
  );
}
