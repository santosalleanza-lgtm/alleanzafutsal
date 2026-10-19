"use client";
import { useActionState, useEffect, useRef } from "react";
import { addMeasurement, type FormState } from "@/app/aluno/(painel)/actions";
import { Button } from "./ui/Button";

const fields = [
  { name: "weightKg", label: "Peso (kg)" },
  { name: "waistCm", label: "Cintura (cm)" },
  { name: "abdomenCm", label: "Abdominal (cm)" },
  { name: "hipCm", label: "Quadril (cm)" },
];

export function MeasurementForm() {
  const [state, action, pending] = useActionState<FormState, FormData>(addMeasurement, {});
  const ref = useRef<HTMLFormElement>(null);
  useEffect(() => {
    if (state.ok) ref.current?.reset();
  }, [state]);
  const today = new Date().toISOString().slice(0, 10);
  return (
    <form ref={ref} action={action} className="card grid gap-4 p-5 sm:grid-cols-3 lg:grid-cols-6 lg:items-end">
      <div>
        <label htmlFor="measuredOn" className="label">Data</label>
        <input id="measuredOn" name="measuredOn" type="date" defaultValue={today} max={today} required className="field" />
      </div>
      {fields.map((f) => (
        <div key={f.name}>
          <label htmlFor={f.name} className="label">{f.label}</label>
          <input id={f.name} name={f.name} inputMode="decimal" className="field" />
        </div>
      ))}
      <Button type="submit" disabled={pending}>{pending ? "Salvando…" : "Registrar"}</Button>
      {state.error && <p role="alert" className="text-sm text-danger sm:col-span-3 lg:col-span-6">{state.error}</p>}
      {state.ok && <p role="status" className="text-sm text-gold sm:col-span-3 lg:col-span-6">Medida registrada.</p>}
    </form>
  );
}
