import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="wrap grid min-h-[60vh] place-items-center py-20 text-center">
      <div>
        <p className="font-display text-[8rem] leading-none text-gold">404</p>
        <h1 className="text-4xl">Página não encontrada</h1>
        <p className="mt-3 text-chalk-muted">O endereço pode ter mudado. Que tal recomeçar pelo início?</p>
        <div className="mt-8 flex justify-center gap-3"><ButtonLink href="/">Página inicial</ButtonLink><ButtonLink href="/programas" variant="secondary">Programas</ButtonLink></div>
      </div>
    </div>
  );
}
