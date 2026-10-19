"use client";
import { useActionState, type ReactNode } from "react";
import type { AdminState } from "@/app/admin/actions";
import { Button } from "../ui/Button";
import { Notice } from "../ui/Notice";

export function AdminForm({ action, children, submitLabel = "Salvar" }: { action: (s: AdminState, f: FormData) => Promise<AdminState>; children: ReactNode; submitLabel?: string }) {
  const [state, formAction, pending] = useActionState(action, {});
  return (
    <form action={formAction} className="space-y-5">
      {children}
      {state.error && <Notice tone="danger">{state.error}</Notice>}
      {state.ok && <Notice tone="success">{state.ok}</Notice>}
      <Button type="submit" disabled={pending}>{pending ? "Salvando…" : submitLabel}</Button>
    </form>
  );
}
