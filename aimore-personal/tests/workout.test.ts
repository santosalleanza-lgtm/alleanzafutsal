import { describe, expect, it } from "vitest";
import { eligibleExercises, generatePlan, type WorkoutInput } from "@/lib/workout";

const base: WorkoutInput = { ageGroup: "adulto", goal: "saude", level: "iniciante", days: 3, minutes: 30, place: "casa", gear: [], sport: "", limitation: "nenhuma" };

describe("gerador de treino", () => {
  it("gera uma sessão por dia com exercícios sem equipamento para quem não tem", () => {
    const plan = generatePlan(base);
    expect(plan.kind).toBe("plan");
    if (plan.kind !== "plan") return;
    expect(plan.sessions).toHaveLength(3);
    for (const s of plan.sessions) {
      expect(s.exercises.length).toBeGreaterThanOrEqual(3);
      expect(s.exercises.every((e) => e.gear === "nenhum")).toBe(true);
    }
  });
  it("iniciantes nunca recebem potência, agilidade avançada ou impacto de nível superior", () => {
    const pool = eligibleExercises({ ...base, goal: "esporte" });
    expect(pool.some((e) => e.minLevel !== "iniciante")).toBe(false);
  });
  it("iniciantes são limitados a 4 sessões estruturadas", () => {
    const plan = generatePlan({ ...base, days: 6 });
    if (plan.kind !== "plan") throw new Error("esperava plano");
    expect(plan.sessions).toHaveLength(4);
  });
  it("pós-operatório, condição clínica e gestação bloqueiam a sugestão automática", () => {
    for (const limitation of ["pos-operatorio", "clinica", "gestante"] as const) {
      const plan = generatePlan({ ...base, limitation });
      expect(plan.kind).toBe("blocked");
    }
  });
  it("crianças recebem somente atividades lúdicas", () => {
    const plan = generatePlan({ ...base, ageGroup: "crianca" });
    if (plan.kind !== "plan") throw new Error("esperava plano");
    expect(plan.sessions.flatMap((s) => s.exercises).every((e) => e.pattern === "ludico")).toBe(true);
  });
  it("pessoas com mais idade ou com dor leve não recebem exercícios de impacto", () => {
    expect(eligibleExercises({ ...base, ageGroup: "idoso", level: "avancado" }).some((e) => e.impact)).toBe(false);
    expect(eligibleExercises({ ...base, level: "avancado", limitation: "dor-leve" }).some((e) => e.impact)).toBe(false);
  });
  it("prescrição não usa cargas máximas", () => {
    const plan = generatePlan({ ...base, level: "avancado", goal: "forca", place: "academia" });
    if (plan.kind !== "plan") throw new Error("esperava plano");
    const text = plan.sessions.flatMap((s) => s.exercises.map((e) => e.prescription)).join(" ");
    expect(text).not.toMatch(/1RM|máxim/i);
  });
});
