"use client";
import { useState, type FormEvent } from "react";
import { Button } from "./ui/Button";
import { Notice } from "./ui/Notice";

const subjects = ["Programas de treinamento", "Loja e pedidos", "Avaliação física", "Acompanhamento online", "Parcerias", "Outro assunto"];

export function ContactForm() {
  const [state, setState] = useState<"idle" | "sending" | "sent">("idle");
  const [error, setError] = useState<{ message: string; fallback?: string | null } | null>(null);

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setState("sending");
    const form = new FormData(e.currentTarget);
    const res = await fetch("/api/contato", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(Object.fromEntries(form.entries())),
    }).catch(() => null);
    const d = res ? await res.json().catch(() => ({})) : {};
    if (res?.ok) {
      setState("sent");
      return;
    }
    setError({ message: d.error ?? "Não foi possível enviar. Tente novamente.", fallback: d.whatsapp });
    setState("idle");
  };

  if (state === "sent") return <Notice tone="success" title="Mensagem enviada">Obrigado pelo contato! A resposta chega no e-mail informado.</Notice>;

  return (
    <form onSubmit={submit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="label">Nome</label>
          <input id="name" name="name" required minLength={2} maxLength={120} autoComplete="name" className="field" />
        </div>
        <div>
          <label htmlFor="email" className="label">E-mail</label>
          <input id="email" name="email" type="email" required maxLength={160} autoComplete="email" className="field" />
        </div>
      </div>
      <div>
        <label htmlFor="subject" className="label">Assunto</label>
        <select id="subject" name="subject" required className="field" defaultValue="">
          <option value="" disabled>Selecione</option>
          {subjects.map((s) => <option key={s}>{s}</option>)}
        </select>
      </div>
      <div>
        <label htmlFor="message" className="label">Mensagem</label>
        <textarea id="message" name="message" required minLength={10} maxLength={2000} rows={5} className="field" />
        <p className="hint">Não envie informações de saúde por aqui.</p>
      </div>
      {/* Campo armadilha para robôs: pessoas não veem nem preenchem. */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
      <label className="flex gap-3 text-xs text-chalk-muted">
        <input type="checkbox" name="consent" value="sim" required className="mt-0.5 accent-[#D4AF61]" />
        Concordo com o uso destes dados apenas para responder ao meu contato, conforme a política de privacidade.
      </label>
      {error && (
        <Notice tone="danger">
          {error.message}
          {error.fallback && <a href={error.fallback} target="_blank" rel="noopener noreferrer" className="mt-2 block font-semibold text-gold underline">Falar pelo WhatsApp</a>}
        </Notice>
      )}
      <Button type="submit" disabled={state === "sending"}>{state === "sending" ? "Enviando…" : "Enviar mensagem"}</Button>
    </form>
  );
}
