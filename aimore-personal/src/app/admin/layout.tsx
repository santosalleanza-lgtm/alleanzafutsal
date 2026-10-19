import Link from "next/link";
import { SetupNotice } from "@/components/SetupNotice";
import { isSupabaseConfigured } from "@/lib/env";
import { requireAdmin } from "@/lib/student";

export const metadata = { title: "Painel administrativo", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

const links = [
  { href: "/admin", label: "Visão geral" },
  { href: "/admin/produtos", label: "Produtos" },
  { href: "/admin/programas", label: "Programas" },
  { href: "/admin/artigos", label: "Artigos" },
  { href: "/admin/pedidos", label: "Pedidos" },
  { href: "/admin/alunos", label: "Alunos e acessos" },
  { href: "/admin/cupons", label: "Cupons" },
  { href: "/admin/mensagens", label: "Mensagens" },
  { href: "/admin/configuracoes", label: "Dados do site" },
  { href: "/admin/seguranca", label: "Segurança" },
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  if (!isSupabaseConfigured) return <div className="wrap py-16"><SetupNotice feature="Painel administrativo" /></div>;
  await requireAdmin();
  return (
    <div className="wrap grid gap-8 py-10 lg:grid-cols-[14rem_1fr]">
      <aside>
        <p className="eyebrow mb-4">Administração</p>
        <nav aria-label="Administração">
          <ul className="flex gap-1 overflow-x-auto lg:flex-col">
            {links.map((l) => <li key={l.href}><Link href={l.href} className="block shrink-0 rounded-lg px-3 py-2 text-sm text-chalk-muted hover:bg-ink-700 hover:text-chalk">{l.label}</Link></li>)}
          </ul>
        </nav>
      </aside>
      <div className="min-w-0">{children}</div>
    </div>
  );
}
