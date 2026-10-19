import { AdminForm } from "@/components/admin/AdminForm";
import { Check, Select, Text } from "@/components/admin/Fields";
import { formatBRL, formatDate } from "@/lib/format";
import { requireAdmin } from "@/lib/student";
import { deleteRow, saveCoupon } from "../actions";

export default async function AdminCoupons() {
  const user = await requireAdmin();
  const { data } = await user.supabase.from("coupons").select("*").order("created_at", { ascending: false });
  return (
    <div className="space-y-8">
      <h1 className="text-5xl">Cupons</h1>
      <section className="card p-6">
        <AdminForm action={saveCoupon} submitLabel="Salvar cupom">
          <div className="grid gap-4 sm:grid-cols-2">
            <Text name="code" label="Código" required placeholder="LANCAMENTO10" />
            <Select name="kind" label="Tipo" options={[{ value: "percent", label: "Percentual (%)" }, { value: "fixed", label: "Valor fixo (R$)" }]} />
            <Text name="value" label="Desconto" required placeholder="10 (ou 15,00)" />
            <Text name="min_subtotal" label="Pedido mínimo (R$, opcional)" />
            <Text name="expires_at" label="Validade (opcional)" type="date" />
          </div>
          <Check name="active" label="Ativo" defaultChecked />
        </AdminForm>
      </section>
      <ul className="card divide-y divide-white/10">
        {data?.map((c) => (
          <li key={c.code} className="flex flex-wrap items-center gap-3 p-4 text-sm">
            <strong className="flex-1">{c.code}</strong>
            <span>{c.kind === "percent" ? `${c.value}%` : formatBRL(c.value)}</span>
            <span className="text-chalk-dim">{c.expires_at ? `até ${formatDate(c.expires_at)}` : "sem validade"}</span>
            <span className={c.active ? "text-lime" : "text-chalk-dim"}>{c.active ? "ativo" : "inativo"}</span>
            <form action={deleteRow}><input type="hidden" name="table" value="coupons" /><input type="hidden" name="id" value={c.code} /><button className="text-xs text-chalk-dim hover:text-danger">Excluir</button></form>
          </li>
        ))}
        {!data?.length && <li className="p-4 text-sm text-chalk-muted">Nenhum cupom.</li>}
      </ul>
    </div>
  );
}
