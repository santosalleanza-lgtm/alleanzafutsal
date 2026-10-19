import type { Metadata } from "next";
import { signUp } from "@/app/auth/actions";
import { AuthForm } from "@/components/AuthForm";
import { AuthLink, AuthShell } from "@/components/AuthShell";
import { SetupNotice } from "@/components/SetupNotice";
import { isSupabaseConfigured } from "@/lib/env";

export const metadata: Metadata = { title: "Criar conta", robots: { index: false } };

export default function SignUpPage() {
  return (
    <AuthShell title="Criar conta" intro="Gratuito. Salve suas avaliações e acompanhe sua evolução." footer={<p>Já tem conta? <AuthLink href="/aluno/entrar">Entrar</AuthLink></p>}>
      {isSupabaseConfigured ? <AuthForm action={signUp} mode="cadastro" /> : <SetupNotice feature="Cadastro" />}
    </AuthShell>
  );
}
