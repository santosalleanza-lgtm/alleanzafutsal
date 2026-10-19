"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { logSecurityEvent } from "@/lib/audit";
import { measurementSchema, profileSchema } from "@/lib/schemas";
import { requireUser } from "@/lib/student";
import { createAdminClient } from "@/lib/supabase/server";

// Todas as ações usam o cliente com a sessão do aluno: as políticas RLS
// impedem leitura ou escrita em dados de outra pessoa.

const id = z.string().uuid();
const optNum = (v: FormDataEntryValue | null) => {
  const s = String(v ?? "").replace(",", ".").trim();
  return s ? Number(s) : null;
};

export async function deleteAssessment(form: FormData) {
  const user = await requireUser();
  const parsed = id.safeParse(form.get("id"));
  if (parsed.success) await user.supabase.from("assessments").delete().eq("id", parsed.data);
  revalidatePath("/aluno/avaliacoes");
}

export type FormState = { error?: string; ok?: boolean };

export async function addMeasurement(_: FormState, form: FormData): Promise<FormState> {
  const user = await requireUser();
  const parsed = measurementSchema.safeParse({
    measuredOn: String(form.get("measuredOn") ?? ""),
    weightKg: optNum(form.get("weightKg")),
    waistCm: optNum(form.get("waistCm")),
    hipCm: optNum(form.get("hipCm")),
    abdomenCm: optNum(form.get("abdomenCm")),
  });
  if (!parsed.success) return { error: parsed.error.issues[0]?.message === "Informe ao menos uma medida." ? "Informe ao menos uma medida." : "Confira os valores informados." };
  const m = parsed.data;
  const { error } = await user.supabase.from("measurements").insert({
    user_id: user.id,
    measured_on: m.measuredOn,
    weight_kg: m.weightKg,
    waist_cm: m.waistCm,
    hip_cm: m.hipCm,
    abdomen_cm: m.abdomenCm,
  });
  if (error) return { error: "Não foi possível salvar." };
  revalidatePath("/aluno/evolucao");
  return { ok: true };
}

export async function deleteMeasurement(form: FormData) {
  const user = await requireUser();
  const parsed = id.safeParse(form.get("id"));
  if (parsed.success) await user.supabase.from("measurements").delete().eq("id", parsed.data);
  revalidatePath("/aluno/evolucao");
}

export async function addActivity(form: FormData) {
  const user = await requireUser();
  const title = z.string().trim().min(1).max(140).safeParse(form.get("title"));
  if (title.success) await user.supabase.from("activities").insert({ user_id: user.id, title: title.data });
  revalidatePath("/aluno/atividades");
}

export async function toggleActivity(form: FormData) {
  const user = await requireUser();
  const parsed = id.safeParse(form.get("id"));
  if (!parsed.success) return;
  const done = form.get("done") === "true";
  await user.supabase.from("activities").update({ done: !done, done_at: done ? null : new Date().toISOString() }).eq("id", parsed.data);
  revalidatePath("/aluno/atividades");
}

export async function deleteActivity(form: FormData) {
  const user = await requireUser();
  const parsed = id.safeParse(form.get("id"));
  if (parsed.success) await user.supabase.from("activities").delete().eq("id", parsed.data);
  revalidatePath("/aluno/atividades");
}

export async function addNote(form: FormData) {
  const user = await requireUser();
  const body = z.string().trim().min(1).max(2000).safeParse(form.get("body"));
  if (body.success) await user.supabase.from("notes").insert({ user_id: user.id, body: body.data });
  revalidatePath("/aluno/atividades");
}

export async function deleteNote(form: FormData) {
  const user = await requireUser();
  const parsed = id.safeParse(form.get("id"));
  if (parsed.success) await user.supabase.from("notes").delete().eq("id", parsed.data);
  revalidatePath("/aluno/atividades");
}

export async function updateProfile(_: FormState, form: FormData): Promise<FormState> {
  const user = await requireUser();
  const parsed = profileSchema.safeParse({ fullName: form.get("fullName"), phone: form.get("phone") ?? "" });
  if (!parsed.success) return { error: parsed.error.issues[0].message };
  const { error } = await user.supabase.from("profiles").update({ full_name: parsed.data.fullName, phone: parsed.data.phone || null }).eq("id", user.id);
  if (error) return { error: "Não foi possível salvar." };
  revalidatePath("/aluno", "layout");
  return { ok: true };
}

/** Exclui a conta e, em cascata, avaliações, medidas, atividades e notas. */
export async function deleteAccount(form: FormData) {
  const user = await requireUser();
  if (form.get("confirm") !== "EXCLUIR") redirect("/aluno/perfil?erro=confirmacao");
  const admin = createAdminClient();
  if (!admin) redirect("/aluno/perfil?erro=indisponivel");
  await logSecurityEvent("conta_excluida", {}, user.id);
  const { error } = await admin.auth.admin.deleteUser(user.id);
  if (error) redirect("/aluno/perfil?erro=falha");
  await user.supabase.auth.signOut();
  redirect("/?conta=excluida");
}
