import { NextResponse } from "next/server";
import { buildSummary, calcBmi } from "@/lib/assessment";
import { assessmentSchema } from "@/lib/schemas";
import { getSessionUser } from "@/lib/supabase/server";

export async function POST(req: Request) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Faça login para salvar." }, { status: 401 });
  const parsed = assessmentSchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Dados inválidos." }, { status: 400 });

  const input = parsed.data;
  const summary = buildSummary(input);
  // Grava com a sessão do aluno: a política RLS garante que ele só escreve nos próprios dados.
  const { error } = await user.supabase.from("assessments").insert({
    user_id: user.id,
    inputs: input,
    bmi: input.age >= 20 ? calcBmi(input.weightKg, input.heightCm) : null,
    summary,
  });
  if (error) return NextResponse.json({ error: "Não foi possível salvar." }, { status: 500 });

  // Registra também peso e medidas no histórico de evolução.
  await user.supabase.from("measurements").insert({
    user_id: user.id,
    weight_kg: input.weightKg,
    waist_cm: input.waistCm ?? null,
    hip_cm: input.hipCm ?? null,
    abdomen_cm: input.abdomenCm ?? null,
  });
  return NextResponse.json({ ok: true });
}
