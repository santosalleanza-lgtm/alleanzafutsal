import { requireAdmin } from "@/lib/student";

export default async function AdminSecurity() {
  const user = await requireAdmin();
  const { data } = await user.supabase.from("security_events").select("*").order("created_at", { ascending: false }).limit(200);
  return (
    <div className="space-y-6">
      <h1 className="text-5xl">Eventos de segurança</h1>
      <p className="text-sm text-chalk-muted">Tentativas de login com falha, webhooks inválidos, alterações administrativas e exclusões de conta.</p>
      <div className="card overflow-x-auto">
        <table className="w-full min-w-[36rem] text-left text-sm">
          <thead className="text-xs uppercase text-chalk-dim"><tr><th className="p-3">Quando</th><th className="p-3">Evento</th><th className="p-3">Detalhe</th></tr></thead>
          <tbody>
            {data?.map((e) => (
              <tr key={e.id} className="border-t border-white/5">
                <td className="whitespace-nowrap p-3">{new Date(e.created_at).toLocaleString("pt-BR")}</td>
                <td className="p-3">{e.event.replace(/_/g, " ")}</td>
                <td className="p-3 font-mono text-xs text-chalk-muted">{JSON.stringify(e.detail)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
