"use server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";
import { siteUrl } from "@/config/site";
import { logSecurityEvent } from "@/lib/audit";
import { rateLimit } from "@/lib/rate-limit";
import { createClient } from "@/lib/supabase/server";

export type AuthState = { error?: string; message?: string };

const safeNext = (n: FormDataEntryValue | null) => {
  const s = typeof n === "string" ? n : "";
  return s.startsWith("/") && !s.startsWith("//") ? s : "/aluno";
};

async function ipKey(prefix: string) {
  const h = await headers();
  return `${prefix}:${h.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "local"}`;
}

const password = z.string().min(8, "A senha precisa ter pelo menos 8 caracteres.").max(72);

export async function signIn(_: AuthState, form: FormData): Promise<AuthState> {
  const supabase = await createClient();
  if (!supabase) return { error: "Login indisponível: o banco de dados ainda não foi configurado." };
  if (!rateLimit(await ipKey("login"), 8)) return { error: "Muitas tentativas. Aguarde um minuto." };
  const email = String(form.get("email") ?? "").trim().toLowerCase();
  const { error } = await supabase.auth.signInWithPassword({ email, password: String(form.get("password") ?? "") });
  if (error) {
    await logSecurityEvent("login_falhou", { email });
    return { error: error.message.includes("Email not confirmed") ? "Confirme seu e-mail pelo link enviado antes de entrar." : "E-mail ou senha incorretos." };
  }
  redirect(safeNext(form.get("next")));
}

export async function signUp(_: AuthState, form: FormData): Promise<AuthState> {
  const supabase = await createClient();
  if (!supabase) return { error: "Cadastro indisponível: o banco de dados ainda não foi configurado." };
  if (!rateLimit(await ipKey("signup"), 5)) return { error: "Muitas tentativas. Aguarde um minuto." };
  const parsed = z
    .object({
      fullName: z.string().trim().min(2, "Informe seu nome.").max(120),
      email: z.string().trim().email("E-mail inválido."),
      password,
      adult: z.literal("sim", { errorMap: () => ({ message: "O cadastro é para maiores de 18 anos." }) }),
      terms: z.literal("sim", { errorMap: () => ({ message: "Aceite os termos e a política de privacidade." }) }),
    })
    .safeParse(Object.fromEntries(form.entries()));
  if (!parsed.success) return { error: parsed.error.issues[0].message };
  const { error } = await supabase.auth.signUp({
    email: parsed.data.email.toLowerCase(),
    password: parsed.data.password,
    options: { data: { full_name: parsed.data.fullName }, emailRedirectTo: `${siteUrl}/auth/callback?next=/aluno` },
  });
  if (error) return { error: "Não foi possível criar a conta. Verifique os dados ou tente outro e-mail." };
  return { message: "Conta criada! Enviamos um link de confirmação para o seu e-mail. Depois de confirmar, é só entrar." };
}

export async function requestReset(_: AuthState, form: FormData): Promise<AuthState> {
  const supabase = await createClient();
  if (!supabase) return { error: "Recuperação indisponível: o banco de dados ainda não foi configurado." };
  if (!rateLimit(await ipKey("reset"), 3)) return { error: "Muitas tentativas. Aguarde um minuto." };
  const email = String(form.get("email") ?? "").trim().toLowerCase();
  await supabase.auth.resetPasswordForEmail(email, { redirectTo: `${siteUrl}/auth/callback?next=/aluno/nova-senha` });
  await logSecurityEvent("recuperacao_senha_solicitada", { email });
  // Mesma resposta para e-mails cadastrados ou não, para não revelar quem tem conta.
  return { message: "Se houver uma conta com este e-mail, você receberá um link para criar uma nova senha." };
}

export async function updatePassword(_: AuthState, form: FormData): Promise<AuthState> {
  const supabase = await createClient();
  if (!supabase) return { error: "Indisponível." };
  const parsed = password.safeParse(form.get("password"));
  if (!parsed.success) return { error: parsed.error.issues[0].message };
  if (form.get("password") !== form.get("confirm")) return { error: "As senhas não conferem." };
  const { data, error } = await supabase.auth.updateUser({ password: parsed.data });
  if (error) return { error: "Não foi possível atualizar a senha. Solicite um novo link." };
  await logSecurityEvent("senha_alterada", {}, data.user?.id ?? null);
  redirect("/aluno");
}

export async function signOut() {
  const supabase = await createClient();
  await supabase?.auth.signOut();
  redirect("/");
}
