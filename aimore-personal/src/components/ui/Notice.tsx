import type { ReactNode } from "react";

const tones = {
  info: "border-gold/20 bg-ink-700 text-chalk-muted",
  warn: "border-warn/40 bg-warn/10 text-chalk",
  danger: "border-danger/50 bg-danger/10 text-chalk",
  success: "border-gold/40 bg-gold/10 text-chalk",
};

export function Notice({ tone = "info", title, children, className = "" }: { tone?: keyof typeof tones; title?: string; children: ReactNode; className?: string }) {
  return (
    <div role={tone === "danger" ? "alert" : "note"} className={`rounded-2xl border p-4 text-sm leading-relaxed ${tones[tone]} ${className}`}>
      {title && <p className="mb-1 font-semibold text-chalk">{title}</p>}
      {children}
    </div>
  );
}

export function Disclaimer({ className = "" }: { className?: string }) {
  return (
    <Notice tone="info" className={className}>
      Conteúdo educativo. As ferramentas e materiais deste site não substituem consulta médica, acompanhamento nutricional ou
      avaliação física individual.
    </Notice>
  );
}
