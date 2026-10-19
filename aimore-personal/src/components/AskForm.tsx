"use client";
import { useState, type FormEvent } from "react";
import { blogCategories } from "@/data/blog";
import { Button } from "./ui/Button";
import { Notice } from "./ui/Notice";

export function AskForm() {
  const [state, setState] = useState<"idle" | "sending" | "sent">("idle");
  const [error, setError] = useState<{ message: string; whatsapp?: string | null } | null>(null);

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setState("sending");
    const res = await fetch("/api/perguntas", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(Object.fromEntries(new FormData(e.currentTarget).entries())) }).catch(() => null);
    const d = res ? await res.json().catch(() => ({})) : {};
    if (res?.ok) return setState("sent");
    setError({ message: d.error ?? "Não foi possível enviar agora.", whatsapp: d.whatsapp });
    setState("idle");
  };

  if (state === "sent") return <Notice tone="success" title="Pergunta enviada!">As melhores perguntas viram resposta aqui no blog e nos conteúdos do Instagram.</Notice>;

  return (
    <form onSubmit={submit} className="space-y-4">
      <div>
        <label htmlFor="question" className="label">Sua pergunta</label>
        <textarea id="question" name="question" required minLength={10} maxLength={600} rows={4} className="field" placeholder="Ex.: Quantas séries devo fazer para ganhar massa?" />
        <p className="hint">Não inclua dados de saúde pessoais. Perguntas podem ser publicadas sem o seu nome.</p>
      </div>
      <div className="grid gap-4">
        <div>
          <label htmlFor="topic" className="label">Tema</label>
          <select id="topic" name="topic" className="field" defaultValue="musculacao">
            {Object.entries(blogCategories).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="email" className="label">E-mail (para avisar quando responder)</label>
          <input id="email" name="email" type="email" required maxLength={160} autoComplete="email" className="field" />
        </div>
      </div>
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
      <label className="flex gap-3 text-xs text-chalk-muted">
        <input type="checkbox" name="consent" value="sim" required className="mt-0.5 accent-[#D4AF61]" />
        Autorizo publicar a pergunta (sem meu nome ou e-mail) e usar meu e-mail só para avisar sobre a resposta.
      </label>
      {error && (
        <Notice tone="danger">
          {error.message}
          {error.whatsapp && <a href={error.whatsapp} target="_blank" rel="noopener noreferrer" className="mt-2 block font-semibold text-gold underline">Mandar pelo WhatsApp</a>}
        </Notice>
      )}
      <Button type="submit" disabled={state === "sending"}>{state === "sending" ? "Enviando…" : "Enviar pergunta"}</Button>
    </form>
  );
}
