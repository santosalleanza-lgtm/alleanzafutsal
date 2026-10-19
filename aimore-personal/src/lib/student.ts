import { redirect } from "next/navigation";
import { getSessionUser } from "@/lib/supabase/server";

/** Exige usuário logado (a checagem também acontece no middleware). */
export async function requireUser(next = "/aluno") {
  const user = await getSessionUser();
  if (!user) redirect(`/aluno/entrar?next=${encodeURIComponent(next)}`);
  return user;
}

/** Exige papel de administrador; alunos são redirecionados. */
export async function requireAdmin() {
  const user = await requireUser("/admin");
  if (user.role !== "admin") redirect("/aluno");
  return user;
}
