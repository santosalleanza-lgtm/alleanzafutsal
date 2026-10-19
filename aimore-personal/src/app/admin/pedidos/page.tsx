import { centsToInput } from "@/components/admin/Fields";
import { formatBRL, formatDate } from "@/lib/format";
import { requireAdmin } from "@/lib/student";
import { updateOrder } from "../actions";

const statuses = ["aguardando_pagamento", "pago", "em_producao", "enviado", "entregue", "cancelado", "reembolsado"];

type Order = {
  id: string; created_at: string; status: string; total: number; shipping: number | null; tracking_code: string | null; email: string; coupon_code: string | null;
  customer: { name: string; phone: string }; shipping_address: Record<string, string>;
  order_items: { name: string; quantity: number; options: Record<string, string> }[];
};

export default async function AdminOrders() {
  const user = await requireAdmin();
  const { data } = await user.supabase.from("orders").select("*, order_items(name, quantity, options)").order("created_at", { ascending: false }).limit(100);
  const orders = (data ?? []) as Order[];
  return (
    <div className="space-y-6">
      <h1 className="text-5xl">Pedidos</h1>
      <p className="text-sm text-chalk-muted">O status muda para “pago” automaticamente quando o Mercado Pago confirma. Atualize produção, envio e frete aqui.</p>
      {!orders.length && <p className="text-chalk-muted">Nenhum pedido ainda.</p>}
      {orders.map((o) => (
        <details key={o.id} className="card p-5">
          <summary className="flex cursor-pointer flex-wrap justify-between gap-2">
            <span className="font-semibold">{formatDate(o.created_at)} · {o.customer?.name}</span>
            <span className="text-sm text-chalk-muted">{o.status.replace(/_/g, " ")} · {formatBRL(o.total)}</span>
          </summary>
          <div className="mt-4 grid gap-4 text-sm md:grid-cols-2">
            <div className="space-y-1 text-chalk-muted">
              <p>{o.email} · {o.customer?.phone}</p>
              <p>{o.shipping_address.street}, {o.shipping_address.number} {o.shipping_address.complement} – {o.shipping_address.district}, {o.shipping_address.city}/{o.shipping_address.state} – CEP {o.shipping_address.cep}</p>
              {o.coupon_code && <p>Cupom: {o.coupon_code}</p>}
              <ul className="mt-2 list-disc pl-5">{o.order_items.map((i, k) => <li key={k}>{i.quantity}x {i.name} {Object.values(i.options ?? {}).join(" · ")}</li>)}</ul>
            </div>
            <form action={updateOrder} className="space-y-3">
              <input type="hidden" name="id" value={o.id} />
              <select name="status" defaultValue={o.status} className="field" aria-label="Status do pedido">{statuses.map((s) => <option key={s} value={s}>{s.replace(/_/g, " ")}</option>)}</select>
              <input name="tracking_code" defaultValue={o.tracking_code ?? ""} placeholder="Código de rastreio" className="field" aria-label="Código de rastreio" />
              <input name="shipping" defaultValue={centsToInput(o.shipping)} placeholder="Frete cobrado (R$)" className="field" aria-label="Frete" />
              <button className="rounded-full bg-gold px-5 py-2 text-sm font-semibold text-ink">Atualizar</button>
            </form>
          </div>
        </details>
      ))}
    </div>
  );
}
