import type { ReactNode } from "react";

export function Section({ id, eyebrow, title, intro, children, className = "" }: { id?: string; eyebrow?: string; title?: ReactNode; intro?: ReactNode; children?: ReactNode; className?: string }) {
  return (
    <section id={id} className={`py-16 sm:py-24 ${className}`}>
      <div className="wrap">
        {(eyebrow || title || intro) && (
          <header className="mb-10 max-w-2xl">
            {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
            {title && <h2 className="text-4xl leading-[0.95] sm:text-5xl">{title}</h2>}
            {intro && <p className="mt-4 text-lg text-chalk-muted">{intro}</p>}
          </header>
        )}
        {children}
      </div>
    </section>
  );
}

export function PageHeader({ eyebrow, title, intro, children }: { eyebrow?: string; title: ReactNode; intro?: ReactNode; children?: ReactNode }) {
  return (
    <div className="relative overflow-hidden border-b border-white/10 bg-ink-800">
      <div className="grid-lines pointer-events-none absolute inset-0" aria-hidden />
      <div className="wrap relative py-14 sm:py-20">
        {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
        <h1 className="max-w-3xl text-5xl leading-[0.9] sm:text-6xl">{title}</h1>
        {intro && <p className="mt-5 max-w-2xl text-lg text-chalk-muted">{intro}</p>}
        {children}
      </div>
    </div>
  );
}
