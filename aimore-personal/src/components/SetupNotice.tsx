import { Notice } from "./ui/Notice";

export function SetupNotice({ feature }: { feature: string }) {
  return (
    <Notice tone="warn" title={`${feature} aguardando configuração`}>
      Esta área usa autenticação e banco de dados do Supabase. Defina as variáveis <code>NEXT_PUBLIC_SUPABASE_URL</code> e{" "}
      <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code> e execute o SQL de <code>supabase/migrations</code>, conforme o README.
    </Notice>
  );
}
