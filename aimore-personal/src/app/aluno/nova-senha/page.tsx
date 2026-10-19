import type { Metadata } from "next";
import { updatePassword } from "@/app/auth/actions";
import { AuthForm } from "@/components/AuthForm";
import { AuthShell } from "@/components/AuthShell";

export const metadata: Metadata = { title: "Nova senha", robots: { index: false } };

export default function NewPasswordPage() {
  return (
    <AuthShell title="Nova senha" intro="Escolha uma nova senha para a sua conta.">
      <AuthForm action={updatePassword} mode="nova-senha" />
    </AuthShell>
  );
}
