import Link from "next/link";
import { buttonClass } from "@/components/ui/Button";
import { formatBRL } from "@/lib/format";
import { requireAdmin } from "@/lib/student";
import { deleteRow } from "../actions";

export default async function AdminProducts() {
  const user = await requireAdmin();
  const { data } = await user.supabase.from("products").select("id, name, price, active, featured, category").order("sort_order").order("name");
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between"><h1 className="text-5xl">Produtos</h1><Link href="/admin/produtos/novo" className={buttonClass()}>Novo produto</Link></div>
      <ul className="card divide-y divide-white/10">
        {data?.map((p) => (
          <li key={p.id} className="flex flex-wrap items-center gap-3 p-4">
            <Link href={`/admin/produtos/${p.id}`} className="flex-1 font-semibold hover:text-gold">{p.name}</Link>
            <span className="text-sm text-chalk-muted">{p.category} · {formatBRL(p.price)}</span>
            <span className={`text-xs ${p.active ? "text-gold" : "text-chalk-dim"}`}>{p.active ? "Ativo" : "Inativo"}</span>
            <form action={deleteRow}><input type="hidden" name="table" value="products" /><input type="hidden" name="id" value={p.id} /><button className="text-xs text-chalk-dim hover:text-danger">Excluir</button></form>
          </li>
        ))}
        {!data?.length && <li className="p-4 text-sm text-chalk-muted">Nenhum produto cadastrado.</li>}
      </ul>
      <p className="text-xs text-chalk-dim">Para tirar um produto da loja sem perder o histórico, edite e desmarque “Ativo”.</p>
    </div>
  );
}
