"use client";
import Link from "next/link";
import { useActionState } from "react";
import type { AuthState } from "@/app/auth/actions";
import { Button } from "./ui/Button";
import { Notice } from "./ui/Notice";

type Props = {
  action: (s: AuthState, f: FormData) => Promise<AuthState>;
  mode: "entrar" | "cadastro" | "recuperar" | "nova-senha";
  next?: string;
  initialError?: string;
};

export function AuthForm({ action, mode, next, initialError }: Props) {
  const [state, formAction, pending] = useActionState(action, initialError ? { error: initialError } : {});
  const label = { entrar: "Entrar", cadastro: "Criar conta", recuperar: "Enviar link", "nova-senha": "Salvar nova senha" }[mode];

  if (state.message) return <Notice tone="success">{state.message}</Notice>;

  return (
    <form action={formAction} className="space-y-4">
      {next && <input type="hidden" name="next" value={next} />}
      {mode === "cadastro" && (
        <div>
          <label htmlFor="fullName" className="label">Nome</label>
          <input id="fullName" name="fullName" required autoComplete="name" className="field" />
        </div>
      )}
      {mode !== "nova-senha" && (
        <div>
          <label htmlFor="email" className="label">E-mail</label>
          <input id="email" name="email" type="email" required autoComplete="email" className="field" />
          {mode === "cadastro" && <p className="hint">Use o mesmo e-mail das suas compras na Hotmart para ver seus programas.</p>}
        </div>
      )}
      {mode !== "recuperar" && (
        <div>
          <label htmlFor="password" className="label">{mode === "nova-senha" ? "Nova senha" : "Senha"}</label>
          <input id="password" name="password" type="password" required minLength={mode === "entrar" ? 1 : 8} autoComplete={mode === "entrar" ? "current-password" : "new-password"} className="field" />
          {mode !== "entrar" && <p className="hint">Mínimo de 8 caracteres.</p>}
        </div>
      )}
      {mode === "nova-senha" && (
        <div>
          <label htmlFor="confirm" className="label">Confirme a nova senha</label>
          <input id="confirm" name="confirm" type="password" required minLength={8} autoComplete="new-password" className="field" />
        </div>
      )}
      {mode === "cadastro" && (
        <div className="space-y-2 text-xs text-chalk-muted">
          <label className="flex gap-3"><input type="checkbox" name="adult" value="sim" required className="mt-0.5 accent-[#C6F432]" />Tenho 18 anos ou mais.</label>
          <label className="flex gap-3"><input type="checkbox" name="terms" value="sim" required className="mt-0.5 accent-[#C6F432]" /><span>Li e aceito os <Link href="/termos" className="text-lime underline">termos de uso</Link> e a <Link href="/privacidade" className="text-lime underline">política de privacidade</Link>.</span></label>
        </div>
      )}
      {state.error && <Notice tone="danger">{state.error}</Notice>}
      <Button type="submit" disabled={pending} className="w-full">{pending ? "Aguarde…" : label}</Button>
    </form>
  );
}
