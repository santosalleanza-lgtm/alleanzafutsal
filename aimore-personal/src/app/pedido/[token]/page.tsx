import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ButtonLink } from "@/components/ui/Button";
import { Notice } from "@/components/ui/Notice";
import { PageHeader } from "@/components/ui/Section";
import { formatBRL, formatDate } from "@/lib/format";
import { createAdminClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Acompanhar pedido", robots: { index: false, follow: false } };

const steps = [
  { key: "aguardando_pagamento", label: "Aguardando pagamento" },
  { key: "pago", label: "Pagamento confirmado" },
  { key: "em_producao", label: "Em produção" },
  { key: "enviado", label: "Enviado" },
  { key: "entregue", label: "Entregue" },
];

export default async function OrderPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  if (!/^[0-9a-f-]{36}$/i.test(token)) notFound();
  const db = createAdminClient();
  if (!db) notFound();

  // Exibe apenas o status e itens; nenhum dado pessoal aparece nesta página.
  const { data: order } = await db
    .from("orders")
    .select("status, total, shipping, created_at, tracking_code, order_items(name, quantity, unit_price, options)")
    .eq("public_token", token)
    .maybeSingle();
  if (!order) notFound();

  const current = steps.findIndex((s) => s.key === order.status);
  const closed = order.status === "cancelado" || order.status === "reembolsado";

  return (
    <>
      <PageHeader eyebrow={`Pedido de ${formatDate(order.created_at)}`} title="Acompanhe seu pedido" />
      <div className="wrap max-w-3xl py-10">
        {closed ? (
          <Notice tone="warn" title={order.status === "cancelado" ? "Pedido cancelado ou pagamento não concluído" : "Pedido reembolsado"}>
            Se você acredita que houve um engano, fale conosco pela página de contato.
          </Notice>
        ) : (
          <ol className="grid gap-3 sm:grid-cols-5">
            {steps.map((s, i) => (
              <li key={s.key} className={`card p-4 text-sm ${i <= current ? "border-gold/50 text-chalk" : "text-chalk-dim"}`}>
                <span className={`mb-2 block h-1.5 rounded-full ${i <= current ? "bg-gold" : "bg-white/10"}`} />
                {s.label}
              </li>
            ))}
          </ol>
        )}
        {order.status === "aguardando_pagamento" && (
          <p className="mt-4 text-sm text-chalk-muted">A confirmação do Mercado Pago pode levar alguns minutos (Pix e cartão) ou até 3 dias úteis (boleto). Esta página atualiza ao recarregar.</p>
        )}
        {order.tracking_code && <p className="mt-6">Código de rastreio: <strong>{order.tracking_code}</strong></p>}
        <ul className="card mt-8 divide-y divide-white/10">
          {(order.order_items as { name: string; quantity: number; unit_price: number; options: Record<string, string> }[]).map((it, i) => (
            <li key={i} className="flex justify-between gap-4 p-4 text-sm">
              <span>{it.quantity}x {it.name}<span className="block text-xs text-chalk-dim">{Object.values(it.options ?? {}).join(" · ")}</span></span>
              <span>{formatBRL(it.unit_price * it.quantity)}</span>
            </li>
          ))}
          <li className="flex justify-between p-4 font-semibold"><span>Total pago no site</span><span>{formatBRL(order.total)}</span></li>
        </ul>
        {order.shipping === null && <p className="mt-3 text-xs text-chalk-dim">Frete combinado à parte.</p>}
        <ButtonLink href="/loja" variant="secondary" className="mt-8">Voltar à loja</ButtonLink>
      </div>
    </>
  );
}
