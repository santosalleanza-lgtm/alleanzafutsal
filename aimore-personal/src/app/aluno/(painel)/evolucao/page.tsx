import type { Metadata } from "next";
import { LineChart, type Point } from "@/components/LineChart";
import { MeasurementForm } from "@/components/MeasurementForm";
import { formatDate } from "@/lib/format";
import { requireUser } from "@/lib/student";
import { deleteMeasurement } from "../actions";

export const metadata: Metadata = { title: "Minha evolução" };

type Row = { id: string; measured_on: string; weight_kg: number | null; waist_cm: number | null; hip_cm: number | null; abdomen_cm: number | null };

const series = (rows: Row[], key: keyof Row): Point[] =>
  rows.filter((r) => r[key] !== null).map((r) => ({ date: r.measured_on, value: Number(r[key]) }));

export default async function EvolutionPage() {
  const user = await requireUser("/aluno/evolucao");
  const { data } = await user.supabase.from("measurements").select("*").order("measured_on").order("created_at");
  const rows = (data ?? []) as Row[];
  const charts = [
    { title: "Peso", unit: "kg", points: series(rows, "weight_kg") },
    { title: "Cintura", unit: "cm", points: series(rows, "waist_cm") },
    { title: "Abdominal", unit: "cm", points: series(rows, "abdomen_cm") },
    { title: "Quadril", unit: "cm", points: series(rows, "hip_cm") },
  ].filter((c) => c.points.length > 0);

  return (
    <div className="space-y-8">
      <h1 className="text-5xl">Evolução</h1>
      <MeasurementForm />
      <p className="text-sm text-chalk-muted">Dica: registre a cada 2 a 4 semanas, no mesmo horário e com a mesma fita. Variações de um dia para o outro são normais.</p>
      {charts.length > 0 ? (
        <div className="grid gap-4 xl:grid-cols-2">{charts.map((c) => <LineChart key={c.title} {...c} />)}</div>
      ) : (
        <p className="text-chalk-muted">Registre sua primeira medida para ver os gráficos.</p>
      )}
      {rows.length > 0 && (
        <section>
          <h2 className="mb-3 text-3xl">Histórico</h2>
          <div className="card overflow-x-auto">
            <table className="w-full min-w-[32rem] text-left text-sm">
              <thead className="text-xs uppercase text-chalk-dim">
                <tr><th className="p-3">Data</th><th className="p-3">Peso (kg)</th><th className="p-3">Cintura</th><th className="p-3">Abdominal</th><th className="p-3">Quadril</th><th className="p-3"><span className="sr-only">Ações</span></th></tr>
              </thead>
              <tbody>
                {[...rows].reverse().map((r) => (
                  <tr key={r.id} className="border-t border-white/5">
                    <td className="p-3">{formatDate(r.measured_on)}</td>
                    <td className="p-3">{r.weight_kg ?? "–"}</td>
                    <td className="p-3">{r.waist_cm ?? "–"}</td>
                    <td className="p-3">{r.abdomen_cm ?? "–"}</td>
                    <td className="p-3">{r.hip_cm ?? "–"}</td>
                    <td className="p-3 text-right">
                      <form action={deleteMeasurement}><input type="hidden" name="id" value={r.id} /><button className="text-xs text-chalk-dim hover:text-danger">Excluir</button></form>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </div>
  );
}
