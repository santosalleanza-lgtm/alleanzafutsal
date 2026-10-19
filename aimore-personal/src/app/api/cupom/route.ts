import { NextResponse } from "next/server";
import { z } from "zod";
import { applyCoupon } from "@/lib/cart";
import { findCoupon } from "@/lib/coupons";
import { clientIp, rateLimit } from "@/lib/rate-limit";

const schema = z.object({ code: z.string().trim().min(1).max(40), subtotal: z.number().int().min(0).max(10_000_000) });

export async function POST(req: Request) {
  if (!rateLimit(`cupom:${clientIp(req)}`, 15)) return NextResponse.json({ ok: false, reason: "Muitas tentativas. Aguarde um minuto." }, { status: 429 });
  const parsed = schema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ ok: false, reason: "Cupom inválido." }, { status: 400 });
  const coupon = await findCoupon(parsed.data.code);
  const result = applyCoupon(parsed.data.subtotal, coupon);
  return NextResponse.json(result.ok ? { ok: true, code: coupon!.code, discount: result.discount } : result);
}
