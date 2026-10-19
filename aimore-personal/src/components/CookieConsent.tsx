"use client";
import Link from "next/link";
import Script from "next/script";
import { useEffect, useState } from "react";

const KEY = "aimore-consent-v1";

/**
 * Só aparece se houver ferramenta de análise configurada (NEXT_PUBLIC_GA_ID).
 * O script de análise carrega apenas depois do aceite.
 */
export function CookieConsent({ gaId }: { gaId?: string }) {
  const [choice, setChoice] = useState<"accepted" | "rejected" | null | "loading">("loading");

  useEffect(() => {
    try {
      setChoice((localStorage.getItem(KEY) as "accepted" | "rejected" | null) ?? null);
    } catch {
      setChoice(null);
    }
  }, []);

  if (!gaId) return null;

  const decide = (c: "accepted" | "rejected") => {
    try {
      localStorage.setItem(KEY, c);
    } catch {
      /* ignora */
    }
    setChoice(c);
  };

  return (
    <>
      {choice === "accepted" && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
          <Script id="ga" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${gaId}',{anonymize_ip:true});`}
          </Script>
        </>
      )}
      {choice === null && (
        <div role="region" aria-label="Preferências de cookies" className="fixed inset-x-3 bottom-3 z-50 mx-auto max-w-xl rounded-2xl border border-white/15 bg-ink-700 p-4 text-sm shadow-2xl sm:inset-x-auto sm:left-4">
          <p className="text-chalk-muted">
            Usamos cookies de análise para entender como o site é usado e melhorá-lo. Nenhum dado de saúde é enviado para essas ferramentas.{" "}
            <Link href="/cookies" className="text-lime underline">Saiba mais</Link>.
          </p>
          <div className="mt-3 flex gap-2">
            <button onClick={() => decide("accepted")} className="rounded-full bg-lime px-4 py-2 font-semibold text-ink">Aceitar</button>
            <button onClick={() => decide("rejected")} className="rounded-full border border-white/20 px-4 py-2 font-semibold">Recusar</button>
          </div>
        </div>
      )}
    </>
  );
}
