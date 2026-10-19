import { NextResponse } from "next/server";
import { z } from "zod";
import { blogCategories } from "@/data/blog";
import { getSettings } from "@/lib/data";
import { clientIp, rateLimit } from "@/lib/rate-limit";
import { createAdminClient } from "@/lib/supabase/server";
import { whatsappLink } from "@/lib/whatsapp";

const schema = z.object({
  question: z.string().trim().min(10).max(600),
  topic: z.string().refine((t) => t in blogCategories),
  email: z.string().trim().email().max(160),
  consent: z.literal("sim"),
  website: z.string().max(0).optional(),
});

/** Recebe perguntas do "Pergunte ao Aimoré" e guarda junto das mensagens de contato. */
export async function POST(req: Request) {
  if (!rateLimit(`perguntas:${clientIp(req)}`, 5, 10 * 60_000)) return NextResponse.json({ error: "Muitas perguntas em pouco tempo. Tente mais tarde." }, { status: 429 });
  const parsed = schema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Confira a pergunta e o e-mail." }, { status: 400 });
  const { question, topic, email } = parsed.data;
  const db = createAdminClient();
  if (!db) {
    const s = await getSettings();
    return NextResponse.json({ error: "O envio pelo site ainda não está ativo. Mande sua pergunta pelo WhatsApp.", whatsapp: whatsappLink(s.whatsapp, `Pergunta para o blog: ${question}`) }, { status: 503 });
  }
  const { error } = await db.from("contact_messages").insert({ name: "Pergunte ao Aimoré", email, subject: `Pergunta para o blog · ${blogCategories[topic as keyof typeof blogCategories]}`, message: question });
  if (error) return NextResponse.json({ error: "Não foi possível enviar agora." }, { status: 500 });
  return NextResponse.json({ ok: true });
}
