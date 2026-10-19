import type { Metadata } from "next";
import { ProfileForm } from "@/components/ProfileForm";
import { Notice } from "@/components/ui/Notice";
import { requireUser } from "@/lib/student";
import { deleteAccount } from "../actions";

export const metadata: Metadata = { title: "Meus dados" };

const errors: Record<string, string> = {
  confirmacao: "Digite EXCLUIR para confirmar a exclusão.",
  indisponivel: "A exclusão automática ainda não está configurada. Solicite pela página de contato.",
  falha: "Não foi possível excluir agora. Tente novamente ou fale conosco.",
};

export default async function ProfilePage({ searchParams }: { searchParams: Promise<{ erro?: string }> }) {
  const user = await requireUser("/aluno/perfil");
  const { erro } = await searchParams;
  const { data: profile } = await user.supabase.from("profiles").select("full_name, phone").eq("id", user.id).maybeSingle();
  return (
    <div className="max-w-2xl space-y-10">
      <section>
        <h1 className="mb-6 text-5xl">Meus dados</h1>
        <ProfileForm fullName={profile?.full_name ?? ""} phone={profile?.phone ?? ""} email={user.email} />
      </section>
      <section className="card p-6">
        <h2 className="text-2xl">Baixar meus dados</h2>
        <p className="mt-2 text-sm text-chalk-muted">Arquivo com seu perfil, avaliações, medidas, atividades, notas, pedidos e acessos a programas.</p>
        <a href="/api/conta/exportar" className="mt-4 inline-block text-sm font-semibold text-lime underline">Baixar arquivo (JSON)</a>
      </section>
      <section className="card border-danger/40 p-6">
        <h2 className="text-2xl">Excluir minha conta</h2>
        <p className="mt-2 text-sm text-chalk-muted">Apaga sua conta e todos os dados de avaliação, evolução, atividades e notas. Registros de pedidos são mantidos pelo prazo legal, sem vínculo com a conta. Esta ação não pode ser desfeita.</p>
        {erro && errors[erro] && <Notice tone="danger" className="mt-4">{errors[erro]}</Notice>}
        <form action={deleteAccount} className="mt-4 flex flex-col gap-2 sm:flex-row">
          <label htmlFor="confirm" className="sr-only">Digite EXCLUIR para confirmar</label>
          <input id="confirm" name="confirm" placeholder="Digite EXCLUIR" className="field" autoComplete="off" />
          <button className="shrink-0 rounded-full border border-danger px-5 py-3 text-sm font-semibold text-danger hover:bg-danger hover:text-ink">Excluir conta</button>
        </form>
      </section>
    </div>
  );
}
