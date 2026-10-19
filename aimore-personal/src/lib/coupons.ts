import { createAdminClient } from "@/lib/supabase/server";
import type { Coupon } from "@/lib/types";

export async function findCoupon(code: string): Promise<Coupon | null> {
  const db = createAdminClient();
  const normalized = code.trim().toUpperCase();
  if (!db || !normalized || normalized.length > 40) return null;
  const { data } = await db.from("coupons").select("*").eq("code", normalized).maybeSingle();
  if (!data) return null;
  return { code: data.code, kind: data.kind, value: data.value, minSubtotal: data.min_subtotal, active: data.active, expiresAt: data.expires_at };
}
