import Link from "next/link";
import type { ReactNode } from "react";

export function AuthShell({ title, intro, children, footer }: { title: string; intro?: string; children: ReactNode; footer?: ReactNode }) {
  return (
    <div className="relative">
      <div className="grid-lines absolute inset-0" aria-hidden />
      <div className="wrap relative grid min-h-[70vh] place-items-center py-16">
        <div className="card w-full max-w-md p-8">
          <p className="eyebrow mb-2">Área do aluno</p>
          <h1 className="text-4xl">{title}</h1>
          {intro && <p className="mt-2 text-sm text-chalk-muted">{intro}</p>}
          <div className="mt-6">{children}</div>
          {footer && <div className="mt-6 space-y-2 border-t border-white/10 pt-5 text-sm text-chalk-muted">{footer}</div>}
        </div>
      </div>
    </div>
  );
}

export const AuthLink = ({ href, children }: { href: string; children: ReactNode }) => (
  <Link href={href} className="text-lime hover:underline">{children}</Link>
);
