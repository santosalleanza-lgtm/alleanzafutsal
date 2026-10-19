import Link from "next/link";
import { StatusBadge } from "@/components/ui/Badge";
import { buttonClass } from "@/components/ui/Button";
import type { ProgramStatus } from "@/lib/types";
import { requireAdmin } from "@/lib/student";
import { deleteRow } from "../actions";

export default async function AdminPrograms() {
  const user = await requireAdmin();
  const { data } = await user.supabase.from("programs").select("id, name, status, hotmart_url, active").order("sort_order");
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between"><h1 className="text-5xl">Programas</h1><Link href="/admin/programas/novo" className={buttonClass()}>Novo programa</Link></div>
      <ul className="card divide-y divide-white/10">
        {data?.map((p) => (
          <li key={p.id} className="flex flex-wrap items-center gap-3 p-4">
            <Link href={`/admin/programas/${p.id}`} className="flex-1 font-semibold hover:text-lime">{p.name}</Link>
            <StatusBadge status={p.status as ProgramStatus} />
            <span className="text-xs text-chalk-dim">{p.hotmart_url ? "Link Hotmart ✓" : "Sem link Hotmart"}</span>
            <form action={deleteRow}><input type="hidden" name="table" value="programs" /><input type="hidden" name="id" value={p.id} /><button className="text-xs text-chalk-dim hover:text-danger">Excluir</button></form>
          </li>
        ))}
        {!data?.length && <li className="p-4 text-sm text-chalk-muted">Nenhum programa cadastrado.</li>}
      </ul>
    </div>
  );
}
