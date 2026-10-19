import type { ReactNode } from "react";
import { Notice } from "./ui/Notice";
import { PageHeader } from "./ui/Section";

export function LegalPage({ title, updated, children }: { title: string; updated: string; children: ReactNode }) {
  return (
    <>
      <PageHeader eyebrow="Documentos" title={title} intro={`Última atualização: ${updated}`} />
      <div className="wrap max-w-3xl py-12">
        <Notice tone="warn" className="mb-8">Texto inicial preparado para revisão. Recomenda-se a validação por profissional da área jurídica antes da publicação definitiva.</Notice>
        <div className="prose-site">{children}</div>
      </div>
    </>
  );
}
