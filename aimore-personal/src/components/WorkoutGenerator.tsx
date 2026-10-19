"use client";
import { useState } from "react";
import type { Gear, Level } from "@/data/exercises";
import { ageGroups, generatePlan, limitations, places, workoutGoals, type WorkoutInput, type WorkoutPlan } from "@/lib/workout";
import { Button, ButtonLink } from "./ui/Button";
import { Notice } from "./ui/Notice";

const levels: Record<Level, string> = { iniciante: "Iniciante", intermediario: "Intermediário", avancado: "Experiente" };
const gears: Record<Exclude<Gear, "nenhum" | "academia">, string> = { elastico: "Elásticos", halteres: "Halteres ou kettlebell" };
const minuteOptions = [15, 20, 30, 45, 60] as const;

function Select<T extends string>({ id, label, options, value, onChange }: { id: string; label: string; options: Record<T, string>; value: T; onChange: (v: T) => void }) {
  return (
    <div>
      <label htmlFor={id} className="label">{label}</label>
      <select id={id} value={value} onChange={(e) => onChange(e.target.value as T)} className="field">
        {(Object.entries(options) as [T, string][]).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
      </select>
    </div>
  );
}

export function WorkoutGenerator() {
  const [input, setInput] = useState<WorkoutInput>({ ageGroup: "adulto", goal: "saude", level: "iniciante", days: 3, minutes: 30, place: "casa", gear: [], sport: "", limitation: "nenhuma" });
  const [plan, setPlan] = useState<WorkoutPlan | null>(null);
  const set = <K extends keyof WorkoutInput>(k: K, v: WorkoutInput[K]) => setInput((s) => ({ ...s, [k]: v }));

  return (
    <div className="grid gap-8 lg:grid-cols-[22rem_1fr]">
      <form
        className="card h-fit space-y-5 p-6"
        onSubmit={(e) => {
          e.preventDefault();
          setPlan(generatePlan(input));
          requestAnimationFrame(() => document.getElementById("resultado")?.scrollIntoView({ behavior: "smooth" }));
        }}
      >
        <Select id="age" label="Qual é sua faixa etária?" options={ageGroups} value={input.ageGroup} onChange={(v) => set("ageGroup", v)} />
        <Select id="goal" label="Qual é seu objetivo?" options={workoutGoals} value={input.goal} onChange={(v) => set("goal", v)} />
        <Select id="level" label="Qual é sua experiência?" options={levels} value={input.level} onChange={(v) => set("level", v)} />
        <div>
          <label htmlFor="days" className="label">Quantos dias por semana? <strong className="text-gold">{input.days}</strong></label>
          <input id="days" type="range" min={1} max={6} value={input.days} onChange={(e) => set("days", Number(e.target.value))} className="w-full accent-[#D4AF61]" />
        </div>
        <fieldset>
          <legend className="label">Quanto tempo por sessão?</legend>
          <div className="flex flex-wrap gap-2">
            {minuteOptions.map((m) => (
              <button type="button" key={m} onClick={() => set("minutes", m)} aria-pressed={input.minutes === m} className={`rounded-lg border px-3 py-2 text-sm ${input.minutes === m ? "border-gold bg-gold text-ink" : "border-gold/20"}`}>{m} min</button>
            ))}
          </div>
        </fieldset>
        <Select id="place" label="Onde prefere treinar?" options={places} value={input.place} onChange={(v) => set("place", v)} />
        {input.place !== "academia" && (
          <fieldset>
            <legend className="label">Possui equipamentos?</legend>
            {(Object.entries(gears) as [Gear, string][]).map(([k, v]) => (
              <label key={k} className="mr-4 inline-flex items-center gap-2 text-sm">
                <input type="checkbox" checked={input.gear.includes(k)} onChange={() => set("gear", input.gear.includes(k) ? input.gear.filter((g) => g !== k) : [...input.gear, k])} className="accent-[#D4AF61]" />
                {v}
              </label>
            ))}
          </fieldset>
        )}
        <div>
          <label htmlFor="sport" className="label">Pratica algum esporte? <span className="font-normal text-chalk-dim">(opcional)</span></label>
          <input id="sport" maxLength={40} value={input.sport} onChange={(e) => set("sport", e.target.value)} className="field" placeholder="Ex.: futebol, corrida" />
        </div>
        <Select id="limitation" label="Existe alguma limitação que exija adaptação?" options={limitations} value={input.limitation} onChange={(v) => set("limitation", v)} />
        <Button type="submit" className="w-full">Gerar sugestão</Button>
      </form>

      <div id="resultado" aria-live="polite">
        {!plan && (
          <div className="card grid min-h-80 place-items-center p-10 text-center text-chalk-muted">
            <p>Responda as perguntas ao lado para receber uma sugestão de organização semanal com exemplos de exercícios.</p>
          </div>
        )}
        {plan?.kind === "blocked" && (
          <div className="space-y-4">
            <Notice tone="warn" title={plan.title}>{plan.message}</Notice>
            <ul className="card space-y-2 p-6 text-sm">{plan.allowed.map((a) => <li key={a}>• {a}</li>)}</ul>
          </div>
        )}
        {plan?.kind === "plan" && (
          <div className="space-y-6">
            <Notice tone="info" title="Sugestão educativa">
              <ul className="list-disc space-y-1 pl-5">{plan.notes.map((n) => <li key={n}>{n}</li>)}</ul>
            </Notice>
            {plan.sessions.map((s) => (
              <section key={s.day} className="card overflow-hidden">
                <header className="flex items-baseline justify-between gap-4 border-b border-gold/15 bg-ink-700 px-6 py-4">
                  <h3 className="text-2xl">Dia {s.day} · {s.title}</h3>
                  <span className="text-xs uppercase tracking-wider text-chalk-dim">{s.focus}</span>
                </header>
                <div className="space-y-4 p-6">
                  <p className="text-sm text-chalk-muted"><strong className="text-chalk">Aquecimento:</strong> {s.warmup}</p>
                  <ol className="space-y-3">
                    {s.exercises.map((e, i) => (
                      <li key={e.id} className="rounded-xl border border-gold/15 p-4">
                        <details>
                          <summary className="flex cursor-pointer list-none items-start justify-between gap-3">
                            <span>
                              <span className="mr-2 font-display text-xl text-gold">{i + 1}</span>
                              <span className="font-semibold">{e.name}</span>
                              <span className="mt-1 block text-xs text-chalk-muted">{e.prescription}</span>
                            </span>
                            <span className="shrink-0 text-xs text-chalk-dim">detalhes ▾</span>
                          </summary>
                          <dl className="mt-3 grid gap-2 text-sm text-chalk-muted sm:grid-cols-2">
                            <div><dt className="font-semibold text-chalk">Execução</dt><dd>{e.how}</dd></div>
                            <div><dt className="font-semibold text-chalk">Objetivo</dt><dd>{e.goal}</dd></div>
                            <div><dt className="font-semibold text-chalk">Equipamento</dt><dd>{e.gear === "nenhum" ? "Nenhum" : e.gear === "elastico" ? "Elástico" : e.gear === "halteres" ? "Halteres" : "Academia"}</dd></div>
                            <div><dt className="font-semibold text-chalk">Adaptações</dt><dd>{e.adaptations}</dd></div>
                            <div className="sm:col-span-2"><dt className="font-semibold text-warn">Cuidados</dt><dd>{e.safety}</dd></div>
                          </dl>
                        </details>
                      </li>
                    ))}
                  </ol>
                  <p className="text-sm text-chalk-muted"><strong className="text-chalk">Volta à calma:</strong> {s.cooldown}</p>
                </div>
              </section>
            ))}
            <p className="text-sm text-chalk-muted">{plan.restDays}</p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/seja-aluno">Quero um treino individualizado</ButtonLink>
              <Button variant="secondary" onClick={() => window.print()}>Imprimir</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
