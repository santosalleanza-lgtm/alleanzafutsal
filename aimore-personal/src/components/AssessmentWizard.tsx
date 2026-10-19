"use client";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  buildSummary,
  equipmentOptions,
  experienceLevels,
  frequencies,
  goals,
  healthFlags,
  interpretBmi,
  timeOptions,
  type AssessmentInput,
  type Equipment,
  type HealthFlag,
} from "@/lib/assessment";
import type { Situation } from "@/data/situations";
import { Button, ButtonLink } from "./ui/Button";
import { Notice } from "./ui/Notice";

const PENDING_KEY = "aimore-pending-assessment";
const steps = ["Informações básicas", "Medidas corporais", "Cálculos", "Recomendações", "Plano de ação"];

type Draft = {
  age: string;
  heightCm: string;
  weightKg: string;
  goal: AssessmentInput["goal"] | "";
  frequency: AssessmentInput["frequency"] | "";
  activityType: string;
  time: AssessmentInput["time"] | "";
  experience: AssessmentInput["experience"] | "";
  equipment: Equipment[];
  flags: HealthFlag[];
  shareHealth: boolean;
  waistCm: string;
  hipCm: string;
  abdomenCm: string;
};

const empty: Draft = { age: "", heightCm: "", weightKg: "", goal: "", frequency: "", activityType: "", time: "", experience: "", equipment: [], flags: [], shareHealth: false, waistCm: "", hipCm: "", abdomenCm: "" };

const num = (s: string) => Number(s.replace(",", "."));
const optNum = (s: string) => (s.trim() ? num(s) : null);

function Choice<T extends string>({ name, label, options, value, onChange }: { name: string; label: string; options: Record<T, string>; value: T | ""; onChange: (v: T) => void }) {
  return (
    <fieldset>
      <legend className="label">{label}</legend>
      <div className="grid gap-2 sm:grid-cols-2">
        {(Object.entries(options) as [T, string][]).map(([k, v]) => (
          <label key={k} className={`flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 text-sm transition ${value === k ? "border-gold bg-gold/10" : "border-gold/20 hover:border-white/30"}`}>
            <input type="radio" name={name} value={k} checked={value === k} onChange={() => onChange(k)} className="accent-[#D4AF61]" />
            {v}
          </label>
        ))}
      </div>
    </fieldset>
  );
}

function NumberField({ id, label, unit, value, onChange, hint, required }: { id: string; label: string; unit: string; value: string; onChange: (v: string) => void; hint?: string; required?: boolean }) {
  return (
    <div>
      <label htmlFor={id} className="label">{label}{!required && <span className="font-normal text-chalk-dim"> (opcional)</span>}</label>
      <div className="relative">
        <input id={id} inputMode="decimal" value={value} onChange={(e) => onChange(e.target.value.replace(/[^\d.,]/g, ""))} className="field pr-14" required={required} />
        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-chalk-dim">{unit}</span>
      </div>
      {hint && <p className="hint">{hint}</p>}
    </div>
  );
}

export function AssessmentWizard({ situations, loggedIn }: { situations: Pick<Situation, "slug" | "label">[]; loggedIn: boolean }) {
  const [step, setStep] = useState(0);
  const [d, setD] = useState<Draft>(empty);
  const [error, setError] = useState("");
  const [save, setSave] = useState<"idle" | "saving" | "saved" | "error">("idle");

  const set = <K extends keyof Draft>(k: K, v: Draft[K]) => setD((s) => ({ ...s, [k]: v }));
  const toggle = <T extends string>(list: T[], v: T) => (list.includes(v) ? list.filter((x) => x !== v) : [...list, v]);

  useEffect(() => {
    // Retoma a avaliação feita antes do login para salvar na conta.
    try {
      const raw = sessionStorage.getItem(PENDING_KEY);
      if (raw && new URLSearchParams(window.location.search).get("salvar") === "1") {
        setD(JSON.parse(raw) as Draft);
        setStep(4);
      }
    } catch {
      /* ignora */
    }
  }, []);

  const input: AssessmentInput | null = useMemo(() => {
    if (!d.goal || !d.frequency || !d.time || !d.experience) return null;
    return {
      age: num(d.age),
      heightCm: num(d.heightCm),
      weightKg: num(d.weightKg),
      goal: d.goal,
      frequency: d.frequency,
      activityType: d.activityType.trim() || undefined,
      time: d.time,
      experience: d.experience,
      equipment: d.equipment,
      flags: d.shareHealth ? d.flags : [],
      waistCm: optNum(d.waistCm),
      hipCm: optNum(d.hipCm),
      abdomenCm: optNum(d.abdomenCm),
    };
  }, [d]);

  const summary = useMemo(() => (input ? buildSummary(input) : null), [input]);
  const bmi = input ? interpretBmi(input.age, input.weightKg, input.heightCm) : null;
  const related = summary ? summary.relatedSituations.map((slug) => situations.find((x) => x.slug === slug)).filter((x) => x !== undefined) : [];

  const validateStep = () => {
    if (step === 0) {
      const age = num(d.age), h = num(d.heightCm), w = num(d.weightKg);
      if (!(age >= 5 && age <= 100)) return "Informe uma idade entre 5 e 100 anos.";
      if (!(h >= 90 && h <= 230)) return "Informe a altura em centímetros (ex.: 172).";
      if (!(w >= 15 && w <= 300)) return "Informe o peso em quilogramas (ex.: 78,5).";
      if (!d.goal || !d.frequency || !d.time || !d.experience) return "Responda objetivo, frequência, tempo disponível e experiência.";
    }
    if (step === 1) {
      for (const [label, v] of [["cintura", d.waistCm], ["quadril", d.hipCm], ["abdominal", d.abdomenCm]] as const) {
        const n = optNum(v);
        if (n !== null && !(n >= 30 && n <= 250)) return `Confira a medida de ${label} (em centímetros).`;
      }
    }
    return "";
  };

  const next = () => {
    const e = validateStep();
    setError(e);
    if (!e) {
      setStep((s) => Math.min(s + 1, steps.length - 1));
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const saveToAccount = async () => {
    if (!input || !summary) return;
    if (!loggedIn) {
      try {
        sessionStorage.setItem(PENDING_KEY, JSON.stringify(d));
      } catch {
        /* ignora */
      }
      window.location.href = `/aluno/entrar?next=${encodeURIComponent("/avaliacao?salvar=1")}`;
      return;
    }
    setSave("saving");
    const res = await fetch("/api/conta/avaliacoes", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(input) });
    if (res.ok) {
      setSave("saved");
      try {
        sessionStorage.removeItem(PENDING_KEY);
      } catch {
        /* ignora */
      }
    } else setSave("error");
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[16rem_1fr]">
      <ol className="flex gap-2 overflow-x-auto lg:flex-col" aria-label="Etapas">
        {steps.map((s, i) => (
          <li key={s} aria-current={i === step ? "step" : undefined} className={`flex shrink-0 items-center gap-3 rounded-xl px-4 py-3 text-sm ${i === step ? "bg-gold text-ink font-semibold" : i < step ? "text-chalk" : "text-chalk-dim"}`}>
            <span className={`grid h-7 w-7 place-items-center rounded-full text-xs font-bold ${i === step ? "bg-ink text-gold" : "border border-current"}`}>{i + 1}</span>
            {s}
          </li>
        ))}
      </ol>

      <div className="card p-6 sm:p-8">
        <h2 className="mb-6 text-3xl">{steps[step]}</h2>

        {step === 0 && (
          <div className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-3">
              <NumberField id="age" label="Idade" unit="anos" value={d.age} onChange={(v) => set("age", v)} required />
              <NumberField id="height" label="Altura" unit="cm" value={d.heightCm} onChange={(v) => set("heightCm", v)} required />
              <NumberField id="weight" label="Peso atual" unit="kg" value={d.weightKg} onChange={(v) => set("weightKg", v)} required />
            </div>
            <Choice name="goal" label="Objetivo principal" options={goals} value={d.goal} onChange={(v) => set("goal", v)} />
            <Choice name="frequency" label="Frequência atual de atividade física" options={frequencies} value={d.frequency} onChange={(v) => set("frequency", v)} />
            <div>
              <label htmlFor="activity" className="label">Tipo de atividade praticada <span className="font-normal text-chalk-dim">(opcional)</span></label>
              <input id="activity" maxLength={80} value={d.activityType} onChange={(e) => set("activityType", e.target.value)} className="field" placeholder="Ex.: caminhada, futebol, musculação" />
            </div>
            <Choice name="time" label="Tempo disponível por sessão" options={timeOptions} value={d.time} onChange={(v) => set("time", v)} />
            <Choice name="experience" label="Experiência com treinamento" options={experienceLevels} value={d.experience} onChange={(v) => set("experience", v)} />
            <fieldset>
              <legend className="label">Equipamentos disponíveis</legend>
              <div className="grid gap-2 sm:grid-cols-2">
                {(Object.entries(equipmentOptions) as [Equipment, string][]).map(([k, v]) => (
                  <label key={k} className={`flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 text-sm ${d.equipment.includes(k) ? "border-gold bg-gold/10" : "border-gold/20"}`}>
                    <input type="checkbox" checked={d.equipment.includes(k)} onChange={() => set("equipment", toggle(d.equipment, k))} className="accent-[#D4AF61]" />
                    {v}
                  </label>
                ))}
              </div>
            </fieldset>
            <fieldset className="rounded-2xl border border-gold/15 p-5">
              <legend className="px-1 text-sm font-semibold">Restrições e recomendações profissionais (opcional)</legend>
              <p className="text-sm text-chalk-muted">
                Essas informações servem só para ajustar as orientações de segurança deste resultado. Elas ficam no seu navegador e só são gravadas se você
                escolher salvar a avaliação na sua conta, onde apenas você tem acesso. Veja a <Link href="/privacidade" className="text-gold underline">política de privacidade</Link>.
              </p>
              <label className="mt-4 flex items-center gap-3 text-sm">
                <input type="checkbox" checked={d.shareHealth} onChange={(e) => set("shareHealth", e.target.checked)} className="h-4 w-4 accent-[#D4AF61]" />
                Quero informar situações de saúde relevantes
              </label>
              {d.shareHealth && (
                <div className="mt-4 grid gap-2 sm:grid-cols-2">
                  {(Object.entries(healthFlags) as [HealthFlag, string][]).map(([k, v]) => (
                    <label key={k} className={`flex cursor-pointer items-start gap-3 rounded-xl border px-4 py-3 text-sm ${d.flags.includes(k) ? "border-warn bg-warn/10" : "border-gold/20"}`}>
                      <input type="checkbox" checked={d.flags.includes(k)} onChange={() => set("flags", toggle(d.flags, k))} className="mt-0.5 accent-[#F5B841]" />
                      {v}
                    </label>
                  ))}
                </div>
              )}
            </fieldset>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-6">
            <Notice>Meça sempre no mesmo horário (de preferência pela manhã), com a mesma fita métrica, sem apertar a pele e com o corpo relaxado. A consistência é o que permite comparar ao longo do tempo.</Notice>
            <div className="grid gap-4 sm:grid-cols-3">
              <NumberField id="waist" label="Cintura" unit="cm" value={d.waistCm} onChange={(v) => set("waistCm", v)} hint="Na parte mais estreita do tronco." />
              <NumberField id="abdomen" label="Abdominal" unit="cm" value={d.abdomenCm} onChange={(v) => set("abdomenCm", v)} hint="Na altura do umbigo." />
              <NumberField id="hip" label="Quadril" unit="cm" value={d.hipCm} onChange={(v) => set("hipCm", v)} hint="Na parte mais larga dos glúteos." />
            </div>
          </div>
        )}

        {step === 2 && bmi && (
          <div className="space-y-6">
            {bmi.kind !== "none" ? (
              <div className="rounded-2xl border border-gold/15 bg-ink-700 p-6">
                <p className="text-sm text-chalk-muted">Índice de Massa Corporal (IMC)</p>
                <p className="mt-1 font-display text-6xl text-gold">{bmi.value.toFixed(1).replace(".", ",")}</p>
                {bmi.kind === "adult" && <p className="mt-1 font-semibold">{bmi.label}</p>}
                <p className="mt-2 text-xs text-chalk-dim">IMC = peso (kg) ÷ altura (m)². Faixas de referência da OMS para adultos: abaixo de 18,5 · 18,5 a 24,9 · 25 a 29,9 · 30 ou mais.</p>
              </div>
            ) : null}
            <Notice tone={bmi.kind === "youth" ? "warn" : "info"}>{bmi.note}</Notice>
            <p className="text-sm text-chalk-muted">
              Não estimamos percentual de gordura nem definimos metas de peso: isso exige métodos e avaliação adequados. Para acompanhar a evolução, registre peso e medidas
              periodicamente na sua área do aluno.
            </p>
          </div>
        )}

        {step === 3 && summary && (
          <div className="space-y-5">
            {summary.alerts.map((a) => <Notice key={a} tone={summary.caution === "stop" ? "danger" : "warn"}>{a}</Notice>)}
            <ul className="space-y-3">
              {summary.suggestions.map((s) => (
                <li key={s} className="flex gap-3 rounded-xl border border-gold/15 p-4 text-sm"><span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-gold" />{s}</li>
              ))}
            </ul>
          </div>
        )}

        {step === 4 && summary && (
          <div className="space-y-6">
            {summary.caution !== "ok" && <Notice tone={summary.caution === "stop" ? "danger" : "warn"} title="Antes de começar">{summary.alerts[0]}</Notice>}
            <dl className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-gold/15 p-4"><dt className="eyebrow mb-1">Perfil informado</dt><dd className="text-sm">{summary.profile}</dd></div>
              <div className="rounded-xl border border-gold/15 p-4"><dt className="eyebrow mb-1">Objetivo</dt><dd className="text-sm">{summary.goal}</dd></div>
              <div className="rounded-xl border border-gold/15 p-4 sm:col-span-2"><dt className="eyebrow mb-1">Situação atual</dt><dd><ul className="space-y-1 text-sm">{summary.situation.map((s) => <li key={s}>{s}</li>)}</ul></dd></div>
              <div className="rounded-xl border border-gold/15 p-4 sm:col-span-2"><dt className="eyebrow mb-1">Sugestões iniciais</dt><dd><ul className="list-disc space-y-1 pl-5 text-sm">{summary.suggestions.slice(0, 4).map((s) => <li key={s}>{s}</li>)}</ul></dd></div>
              <div className="rounded-xl border border-gold/15 p-4 sm:col-span-2"><dt className="eyebrow mb-1">Frequência sugerida</dt><dd className="text-sm">{summary.frequency}</dd></div>
              <div className="rounded-xl border border-gold/40 bg-gold/5 p-4 sm:col-span-2"><dt className="eyebrow mb-1">Próximo passo</dt><dd className="text-sm">{summary.nextStep}</dd></div>
            </dl>
            {related.length > 0 && (
              <div>
                <p className="label">Orientações para o seu momento</p>
                <ul className="flex flex-wrap gap-2">
                  {related.map((p) => <li key={p.slug}><Link href={`/situacao/${p.slug}`} className="inline-block rounded-full border border-gold/25 px-4 py-2 text-sm hover:border-gold hover:text-gold">{p.label}</Link></li>)}
                </ul>
              </div>
            )}
            <div className="flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/seja-aluno">Quero ser aluno</ButtonLink>
              <Button variant="secondary" onClick={saveToAccount} disabled={save === "saving" || save === "saved"}>
                {save === "saved" ? "Avaliação salva" : save === "saving" ? "Salvando…" : loggedIn ? "Salvar na minha conta" : "Entrar para salvar"}
              </Button>
            </div>
            {save === "saved" && <p role="status" className="text-sm text-gold">Salva! Veja o histórico na <Link href="/aluno/avaliacoes" className="underline">área do aluno</Link>.</p>}
            {save === "error" && <p role="alert" className="text-sm text-danger">Não foi possível salvar agora. Tente novamente.</p>}
            <p className="text-xs text-chalk-dim">Esta autoavaliação é educativa e não substitui avaliação física presencial, consulta médica ou acompanhamento individualizado.</p>
          </div>
        )}

        {error && <p role="alert" className="mt-6 text-sm font-medium text-danger">{error}</p>}

        <div className="mt-8 flex justify-between gap-3 border-t border-gold/15 pt-6">
          <Button variant="ghost" onClick={() => { setError(""); setStep((s) => Math.max(0, s - 1)); }} disabled={step === 0}>Voltar</Button>
          {step < steps.length - 1 && <Button onClick={next}>Continuar</Button>}
          {step === steps.length - 1 && <Button variant="ghost" onClick={() => { setD(empty); setStep(0); setSave("idle"); }}>Refazer</Button>}
        </div>
      </div>
    </div>
  );
}
