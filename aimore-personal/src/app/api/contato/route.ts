import { NextResponse } from "next/server";
import { z } from "zod";
import { getSettings } from "@/lib/data";
import { clientIp, rateLimit } from "@/lib/rate-limit";
import { createAdminClient } from "@/lib/supabase/server";
import { whatsappLink, whatsappTopics } from "@/lib/whatsapp";

const schema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(160),
  subject: z.string().trim().min(2).max(80),
  message: z.string().trim().min(10).max(2000),
  consent: z.literal("sim"),
  website: z.string().max(0).optional(),
});

export async function POST(req: Request) {
  if (!rateLimit(`contato:${clientIp(req)}`, 5, 10 * 60_000)) {
    return NextResponse.json({ error: "Muitas mensagens em pouco tempo. Tente mais tarde." }, { status: 429 });
  }
  const parsed = schema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Confira os campos do formulário." }, { status: 400 });

  const db = createAdminClient();
  if (!db) {
    const s = await getSettings();
    return NextResponse.json(
      { error: "O formulário ainda não está conectado. Fale diretamente pelo WhatsApp.", whatsapp: whatsappLink(s.whatsapp, whatsappTopics.geral) },
      { status: 503 },
    );
  }
  const { website: _honeypot, consent: _consent, ...msg } = parsed.data;
  void _honeypot;
  void _consent;
  const { error } = await db.from("contact_messages").insert(msg);
  if (error) return NextResponse.json({ error: "Não foi possível enviar agora." }, { status: 500 });
  return NextResponse.json({ ok: true });
}
