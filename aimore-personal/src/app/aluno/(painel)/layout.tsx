import Link from "next/link";
import { signOut } from "@/app/auth/actions";
import { SetupNotice } from "@/components/SetupNotice";
import { isSupabaseConfigured } from "@/lib/env";
import { requireUser } from "@/lib/student";

const links = [
  { href: "/aluno", label: "Painel" },
  { href: "/aluno/programas", label: "Meus programas" },
  { href: "/aluno/avaliacoes", label: "Avaliações" },
  { href: "/aluno/evolucao", label: "Evolução" },
  { href: "/aluno/atividades", label: "Atividades e notas" },
  { href: "/aluno/perfil", label: "Meus dados" },
];

export const metadata = { robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function StudentLayout({ children }: { children: React.ReactNode }) {
  if (!isSupabaseConfigured) {
    return <div className="wrap py-16"><SetupNotice feature="Área do aluno" /></div>;
  }
  const user = await requireUser();
  return (
    <div className="wrap grid gap-8 py-10 lg:grid-cols-[15rem_1fr]">
      <aside>
        <p className="text-sm text-chalk-dim">Olá,</p>
        <p className="mb-6 truncate font-display text-2xl uppercase">{user.fullName || user.email}</p>
        <nav aria-label="Área do aluno">
          <ul className="flex gap-2 overflow-x-auto lg:flex-col">
            {links.map((l) => (
              <li key={l.href}><Link href={l.href} className="block shrink-0 rounded-xl px-4 py-2.5 text-sm text-chalk-muted hover:bg-ink-700 hover:text-chalk">{l.label}</Link></li>
            ))}
            {user.role === "admin" && <li><Link href="/admin" className="block shrink-0 rounded-xl px-4 py-2.5 text-sm text-gold hover:bg-ink-700">Painel administrativo</Link></li>}
          </ul>
        </nav>
        <form action={signOut} className="mt-6"><button className="text-sm text-chalk-dim hover:text-danger">Sair</button></form>
      </aside>
      <div className="min-w-0">{children}</div>
    </div>
  );
}
