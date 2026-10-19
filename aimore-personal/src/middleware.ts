import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

const PUBLIC_STUDENT_PATHS = ["/aluno/entrar", "/aluno/cadastro", "/aluno/recuperar", "/aluno/nova-senha"];

export async function middleware(request: NextRequest) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const { pathname } = request.nextUrl;
  const isProtected =
    (pathname.startsWith("/aluno") && !PUBLIC_STUDENT_PATHS.some((p) => pathname.startsWith(p))) || pathname.startsWith("/admin");

  // Sem Supabase configurado, as páginas privadas mostram instruções de configuração.
  if (!url || !key) return NextResponse.next();

  let response = NextResponse.next({ request });
  const supabase = createServerClient(url, key, {
    cookies: {
      getAll: () => request.cookies.getAll(),
      setAll: (list) => {
        list.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({ request });
        list.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
      },
    },
  });

  const { data } = await supabase.auth.getUser();
  if (isProtected && !data.user) {
    const login = request.nextUrl.clone();
    login.pathname = "/aluno/entrar";
    login.search = `?next=${encodeURIComponent(pathname)}`;
    return NextResponse.redirect(login);
  }
  return response;
}

export const config = {
  matcher: ["/aluno/:path*", "/admin/:path*", "/api/conta/:path*"],
};
