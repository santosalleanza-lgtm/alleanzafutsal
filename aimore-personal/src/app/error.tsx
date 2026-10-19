"use client";
import { Button } from "@/components/ui/Button";

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="wrap grid min-h-[60vh] place-items-center py-20 text-center">
      <div>
        <h1 className="text-4xl">Algo saiu do previsto</h1>
        <p className="mt-3 text-chalk-muted">Não foi possível carregar esta página agora. Tente novamente em instantes.</p>
        <Button onClick={reset} className="mt-8">Tentar novamente</Button>
      </div>
    </div>
  );
}
