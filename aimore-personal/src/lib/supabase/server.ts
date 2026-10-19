import { createServerClient } from "@supabase/ssr";
import { createClient as createJsClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import { isSupabaseConfigured, supabaseAnonKey, supabaseUrl } from "@/lib/env";

/** Cliente com a sessão do visitante (respeita as políticas RLS). */
export async function createClient() {
  if (!isSupabaseConfigured) return null;
  const cookieStore = await cookies();
  return createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll: () => cookieStore.getAll(),
      setAll: (list) => {
        try {
          list.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
        } catch {
          // Chamado em Server Component: o middleware renova a sessão.
        }
      },
    },
  });
}

/**
 * Cliente com a chave service role. Ignora RLS: use apenas em rotas de servidor
 * (webhooks, checkout) e nunca exponha o resultado sem filtrar.
 */
export function createAdminClient() {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!isSupabaseConfigured || !key) return null;
  return createJsClient(supabaseUrl, key, { auth: { persistSession: false, autoRefreshToken: false } });
}

export type Role = "admin" | "student";

/** Usuário logado e seu papel, ou null. */
export async function getSessionUser() {
  const supabase = await createClient();
  if (!supabase) return null;
  const { data } = await supabase.auth.getUser();
  if (!data.user) return null;
  const { data: profile } = await supabase.from("profiles").select("full_name, role").eq("id", data.user.id).maybeSingle();
  return {
    id: data.user.id,
    email: data.user.email ?? "",
    fullName: (profile?.full_name as string | null) ?? null,
    role: ((profile?.role as Role | undefined) ?? "student") as Role,
    supabase,
  };
}
