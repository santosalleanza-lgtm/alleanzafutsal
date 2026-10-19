import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

/** Recebe o link de confirmação/recuperação enviado por e-mail e cria a sessão. */
export async function GET(req: Request) {
  const url = new URL(req.url);
  const code = url.searchParams.get("code");
  const nextParam = url.searchParams.get("next") ?? "/aluno";
  const next = nextParam.startsWith("/") && !nextParam.startsWith("//") ? nextParam : "/aluno";
  const supabase = await createClient();
  if (code && supabase) {
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) return NextResponse.redirect(new URL(next, url.origin));
  }
  return NextResponse.redirect(new URL("/aluno/entrar?erro=link", url.origin));
}
