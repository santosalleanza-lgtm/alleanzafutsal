"use client";
import { useActionState } from "react";
import { updateProfile, type FormState } from "@/app/aluno/(painel)/actions";
import { Button } from "./ui/Button";

export function ProfileForm({ fullName, phone, email }: { fullName: string; phone: string; email: string }) {
  const [state, action, pending] = useActionState<FormState, FormData>(updateProfile, {});
  return (
    <form action={action} className="card space-y-4 p-6">
      <div>
        <label htmlFor="fullName" className="label">Nome</label>
        <input id="fullName" name="fullName" defaultValue={fullName} required maxLength={120} className="field" />
      </div>
      <div>
        <label htmlFor="phone" className="label">Telefone (opcional)</label>
        <input id="phone" name="phone" defaultValue={phone} maxLength={30} inputMode="tel" className="field" />
      </div>
      <div>
        <p className="label">E-mail</p>
        <p className="text-sm text-chalk-muted">{email}</p>
      </div>
      {state.error && <p role="alert" className="text-sm text-danger">{state.error}</p>}
      {state.ok && <p role="status" className="text-sm text-lime">Dados atualizados.</p>}
      <Button type="submit" disabled={pending}>{pending ? "Salvando…" : "Salvar"}</Button>
    </form>
  );
}
