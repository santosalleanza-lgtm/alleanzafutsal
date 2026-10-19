import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/Button";
import { getSettings } from "@/lib/data";
import { Notice } from "@/components/ui/Notice";
import { formatDate } from "@/lib/format";
import { requireUser } from "@/lib/student";

export const metadata: Metadata = { title: "Meus programas" };

type Row = { id: string; slug: string; name: string; content_url: string | null; granted_at: string };

export default async function MyPrograms() {
  const user = await requireUser("/aluno/programas");
  const [{ data, error }, settings] = await Promise.all([user.supabase.rpc("my_programs"), getSettings()]);
  const rows = (data ?? []) as Row[];
  return (
    <div className="space-y-6">
      <h1 className="text-5xl">Meus programas</h1>
      {error && <Notice tone="danger">Não foi possível carregar seus programas agora.</Notice>}
      {rows.length ? (
        <ul className="grid gap-4 md:grid-cols-2">
          {rows.map((p) => (
            <li key={p.id} className="card flex flex-col p-6">
              <h2 className="text-2xl">{p.name}</h2>
              <p className="mt-1 text-xs text-chalk-dim">Liberado em {formatDate(p.granted_at)}</p>
              {p.content_url ? (
                <ButtonLink href={p.content_url} external className="mt-5">Acessar conteúdo</ButtonLink>
              ) : settings.memberAreaUrl ? (
                <ButtonLink href={settings.memberAreaUrl} external className="mt-5">Acessar na área de membros</ButtonLink>
              ) : (
                <p className="mt-5 text-sm text-chalk-muted">O acesso ao conteúdo é enviado pela Hotmart para o seu e-mail.</p>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <Notice title="Nenhum programa liberado ainda">
          Os programas comprados na Hotmart aparecem aqui automaticamente quando a compra é confirmada e o e-mail da compra é o mesmo desta conta ({user.email}).
          Se você comprou com outro e-mail, fale conosco pela página de contato.
        </Notice>
      )}
      <ButtonLink href="/programas" variant="secondary">Ver todos os programas</ButtonLink>
    </div>
  );
}
