import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/supabase/server";

/** Portabilidade (LGPD art. 18): exporta os dados do próprio aluno. */
export async function GET() {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "não autenticado" }, { status: 401 });
  const db = user.supabase;
  const [profile, assessments, measurements, activities, notes, orders, access] = await Promise.all([
    db.from("profiles").select("full_name, phone, created_at").eq("id", user.id).maybeSingle(),
    db.from("assessments").select("created_at, inputs, bmi, summary"),
    db.from("measurements").select("measured_on, weight_kg, waist_cm, hip_cm, abdomen_cm"),
    db.from("activities").select("title, done, done_at, created_at"),
    db.from("notes").select("body, created_at"),
    db.from("orders").select("created_at, status, total, order_items(name, quantity, unit_price, options)"),
    db.from("program_access").select("hotmart_product_id, status, created_at"),
  ]);
  const body = {
    exportado_em: new Date().toISOString(),
    email: user.email,
    perfil: profile.data,
    avaliacoes: assessments.data,
    medidas: measurements.data,
    atividades: activities.data,
    observacoes: notes.data,
    pedidos: orders.data,
    acessos_programas: access.data,
  };
  return new NextResponse(JSON.stringify(body, null, 2), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Content-Disposition": 'attachment; filename="meus-dados-aimore-personal.json"',
      "Cache-Control": "no-store",
    },
  });
}
