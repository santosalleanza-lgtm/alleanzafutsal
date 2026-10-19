import type { Metadata } from "next";
import { requestReset } from "@/app/auth/actions";
import { AuthForm } from "@/components/AuthForm";
import { AuthLink, AuthShell } from "@/components/AuthShell";
import { SetupNotice } from "@/components/SetupNotice";
import { isSupabaseConfigured } from "@/lib/env";

export const metadata: Metadata = { title: "Recuperar senha", robots: { index: false } };

export default function ResetPage() {
  return (
    <AuthShell title="Recuperar senha" intro="Informe seu e-mail para receber um link de redefinição." footer={<p><AuthLink href="/aluno/entrar">Voltar para o login</AuthLink></p>}>
      {isSupabaseConfigured ? <AuthForm action={requestReset} mode="recuperar" /> : <SetupNotice feature="Recuperação de senha" />}
    </AuthShell>
  );
}
