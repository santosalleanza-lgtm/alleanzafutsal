import { describe, expect, it } from "vitest";
import { buildSummary, calcBmi, interpretBmi, type AssessmentInput } from "@/lib/assessment";

const base: AssessmentInput = { age: 35, heightCm: 175, weightKg: 80, goal: "saude", frequency: "nenhuma", time: "30", experience: "nunca", equipment: [], flags: [] };

describe("IMC", () => {
  it("calcula peso / altura² com uma casa decimal", () => {
    expect(calcBmi(80, 175)).toBe(26.1);
    expect(calcBmi(0, 175)).toBeNull();
  });
  it("usa faixas adultas só a partir de 20 anos", () => {
    expect(interpretBmi(35, 70, 175)).toMatchObject({ kind: "adult", label: "Dentro da faixa de referência" });
    expect(interpretBmi(35, 95, 175)).toMatchObject({ kind: "adult", label: "Bem acima da faixa de referência (obesidade)" });
    expect(interpretBmi(19, 50, 160)).toMatchObject({ kind: "youth" });
    expect(interpretBmi(10, 35, 140).kind).toBe("youth");
  });
  it("limites das faixas da OMS", () => {
    expect(interpretBmi(30, 18.4 * 4, 200)).toMatchObject({ label: "Abaixo da faixa de referência" });
    expect(interpretBmi(30, 25 * 4, 200)).toMatchObject({ label: "Acima da faixa de referência (sobrepeso)" });
    expect(interpretBmi(30, 30 * 4, 200)).toMatchObject({ label: "Bem acima da faixa de referência (obesidade)" });
  });
});

describe("resumo da autoavaliação", () => {
  it("sedentário iniciante recebe sessões curtas e progressão", () => {
    const s = buildSummary(base);
    expect(s.caution).toBe("ok");
    expect(s.suggestions.join(" ")).toContain("sessões curtas");
    expect(s.frequency).toContain("2 a 3 sessões");
    expect(s.relatedSituations).toContain("vou-comecar");
  });
  it("sinais de alerta pedem avaliação médica antes de começar", () => {
    const s = buildSummary({ ...base, flags: ["dor-peito"] });
    expect(s.caution).toBe("stop");
    expect(s.alerts[0]).toContain("avaliação médica");
    expect(s.nextStep).toContain("avaliação médica");
  });
  it("bariátrica e medicamento exigem liberação e indicam programas específicos", () => {
    const s = buildSummary({ ...base, flags: ["bariatrica", "medicamento-peso"] });
    expect(s.caution).toBe("clearance");
    expect(s.relatedSituations[0]).toBe("tratamento-controle-de-peso");
    expect(s.alerts.join(" ")).toContain("não envolvem medicamentos");
  });
  it("crianças recebem brincadeiras, sem faixas adultas nem dieta", () => {
    const s = buildSummary({ ...base, age: 9, heightCm: 135, weightKg: 32 });
    expect(s.suggestions[0]).toContain("brincadeiras");
    expect(s.suggestions.join(" ")).toContain("sem dietas restritivas");
    expect(s.frequency).toContain("60 minutos por dia");
    expect(s.alerts.join(" ")).toContain("supervisão de um adulto");
  });
  it("pessoas com mais idade recebem equilíbrio", () => {
    const s = buildSummary({ ...base, age: 68 });
    expect(s.suggestions.join(" ")).toContain("equilíbrio");
    expect(s.frequency).toContain("equilíbrio e força em 3 dias");
  });
  it("objetivo indica a situação correspondente", () => {
    expect(buildSummary({ ...base, goal: "taf" }).relatedSituations[0]).toBe("vou-fazer-taf");
    expect(buildSummary({ ...base, age: 10, heightCm: 140, weightKg: 35 }).relatedSituations[0]).toBe("meu-filho-treina");
    expect(buildSummary({ ...base, goal: "forca", frequency: "3-4", experience: "avancado" }).relatedSituations).toEqual(["quero-ganhar-massa"]);
  });
});
