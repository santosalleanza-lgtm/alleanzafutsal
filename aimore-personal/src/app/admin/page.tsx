import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Notice } from "@/components/ui/Notice";
import { formatBRL, formatDate } from "@/lib/format";
import { requireAdmin } from "@/lib/student";
import { importSeed } from "./actions";

export default async function AdminHome({ searchParams }: { searchParams: Promise<{ importado?: string }> }) {
  const user = await requireAdmin();
  const db = user.supabase;
  const { importado } = await searchParams;
  const [products, programs, students, msgs, orders] = await Promise.all([
    db.from("products").select("id", { count: "exact", head: true }),
    db.from("programs").select("id", { count: "exact", head: true }),
    db.from("profiles").select("id", { count: "exact", head: true }).eq("role", "student"),
    db.from("contact_messages").select("id", { count: "exact", head: true }),
    db.from("orders").select("id, created_at, status, total").order("created_at", { ascending: false }).limit(5),
  ]);
  const empty = !products.count && !programs.count;
  const stats = [
    { label: "Produtos", value: products.count ?? 0, href: "/admin/produtos" },
    { label: "Programas", value: programs.count ?? 0, href: "/admin/programas" },
    { label: "Alunos", value: students.count ?? 0, href: "/admin/alunos" },
    { label: "Mensagens", value: msgs.count ?? 0, href: "/admin/mensagens" },
  ];
  return (
    <div className="space-y-8">
      <h1 className="text-5xl">Visão geral</h1>
      {importado && <Notice tone="success">Conteúdo inicial importado. Revise produtos, programas e dados do site.</Notice>}
      {empty && (
        <Notice tone="warn" title="Banco vazio">
          O site está exibindo o conteúdo inicial do repositório. Importe-o para o banco para poder editar pelo painel.
          <form action={importSeed} className="mt-3"><Button type="submit">Importar conteúdo inicial</Button></form>
        </Notice>
      )}
      <div className="grid gap-4 sm:grid-cols-4">
        {stats.map((s) => <Link key={s.label} href={s.href} className="card p-5 hover:border-lime/50"><p className="eyebrow">{s.label}</p><p className="mt-2 font-display text-5xl">{s.value}</p></Link>)}
      </div>
      <section>
        <h2 className="mb-3 text-3xl">Últimos pedidos</h2>
        {orders.data?.length ? (
          <ul className="card divide-y divide-white/10">
            {orders.data.map((o) => <li key={o.id} className="flex justify-between p-4 text-sm"><span>{formatDate(o.created_at)} · {o.status.replace(/_/g, " ")}</span><span>{formatBRL(o.total)}</span></li>)}
          </ul>
        ) : <p className="text-sm text-chalk-muted">Nenhum pedido ainda.</p>}
      </section>
    </div>
  );
}
