import { createAdminClient } from "@/lib/supabase/server";

/** Registra eventos relevantes de segurança. Nunca inclua dados de saúde ou senhas em `detail`. */
export async function logSecurityEvent(event: string, detail: Record<string, unknown> = {}, userId: string | null = null) {
  const db = createAdminClient();
  if (!db) {
    console.info(`[seguranca] ${event}`, detail);
    return;
  }
  await db.from("security_events").insert({ event, detail, user_id: userId });
}
