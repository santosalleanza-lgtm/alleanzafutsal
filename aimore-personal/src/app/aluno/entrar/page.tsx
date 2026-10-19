import type { Metadata } from "next";
import { signIn } from "@/app/auth/actions";
import { AuthForm } from "@/components/AuthForm";
import { AuthLink, AuthShell } from "@/components/AuthShell";
import { SetupNotice } from "@/components/SetupNotice";
import { isSupabaseConfigured } from "@/lib/env";

export const metadata: Metadata = { title: "Entrar", robots: { index: false } };

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ next?: string; erro?: string }> }) {
  const { next, erro } = await searchParams;
  return (
    <AuthShell
      title="Entrar"
      intro="Acesse seus programas, avaliações e sua evolução."
      footer={<><p>Ainda não tem conta? <AuthLink href="/aluno/cadastro">Criar conta</AuthLink></p><p><AuthLink href="/aluno/recuperar">Esqueci minha senha</AuthLink></p></>}
    >
      {isSupabaseConfigured ? <AuthForm action={signIn} mode="entrar" next={next} initialError={erro === "link" ? "O link expirou ou é inválido. Solicite um novo." : undefined} /> : <SetupNotice feature="Login" />}
    </AuthShell>
  );
}
