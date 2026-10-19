import Link from "next/link";
import { buttonClass } from "@/components/ui/Button";
import { requireAdmin } from "@/lib/student";
import { deleteRow } from "../actions";

export default async function AdminArticles() {
  const user = await requireAdmin();
  const { data } = await user.supabase.from("articles").select("id, title, category, kind, published").order("created_at", { ascending: false });
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between"><h1 className="text-5xl">Artigos</h1><Link href="/admin/artigos/novo" className={buttonClass()}>Novo conteúdo</Link></div>
      <ul className="card divide-y divide-white/10">
        {data?.map((a) => (
          <li key={a.id} className="flex flex-wrap items-center gap-3 p-4">
            <Link href={`/admin/artigos/${a.id}`} className="flex-1 font-semibold hover:text-gold">{a.title}</Link>
            <span className="text-xs text-chalk-muted">{a.kind} · {a.category}</span>
            <span className={`text-xs ${a.published ? "text-gold" : "text-chalk-dim"}`}>{a.published ? "Publicado" : "Rascunho"}</span>
            <form action={deleteRow}><input type="hidden" name="table" value="articles" /><input type="hidden" name="id" value={a.id} /><button className="text-xs text-chalk-dim hover:text-danger">Excluir</button></form>
          </li>
        ))}
        {!data?.length && <li className="p-4 text-sm text-chalk-muted">Nenhum conteúdo cadastrado.</li>}
      </ul>
    </div>
  );
}
