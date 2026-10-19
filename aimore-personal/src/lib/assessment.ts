/**
 * Regras da autoavaliação educativa. Funções puras, testadas em tests/assessment.test.ts.
 * Nada aqui é diagnóstico: o resultado é sempre apresentado como orientação geral.
 */

export const goals = {
  saude: "Saúde e disposição",
  emagrecimento: "Emagrecimento com saúde",
  forca: "Ganho de força e massa muscular",
  condicionamento: "Condicionamento físico",
  esporte: "Desempenho no esporte",
  mobilidade: "Mobilidade e autonomia",
  taf: "Teste físico de concurso (TAF)",
} as const;
export type Goal = keyof typeof goals;

export const frequencies = {
  nenhuma: "Não pratico atualmente",
  "1-2": "1 a 2 vezes por semana",
  "3-4": "3 a 4 vezes por semana",
  "5+": "5 ou mais vezes por semana",
} as const;
export type Frequency = keyof typeof frequencies;

export const timeOptions = {
  "15-20": "15 a 20 minutos",
  "30": "Cerca de 30 minutos",
  "45": "Cerca de 45 minutos",
  "60+": "60 minutos ou mais",
} as const;
export type TimeAvailable = keyof typeof timeOptions;

export const experienceLevels = {
  nunca: "Nunca treinei",
  iniciante: "Iniciante (menos de 6 meses)",
  intermediario: "Intermediário (6 meses a 2 anos)",
  avancado: "Experiente (mais de 2 anos)",
} as const;
export type Experience = keyof typeof experienceLevels;

export const equipmentOptions = {
  nenhum: "Nenhum (peso do corpo)",
  elasticos: "Elásticos",
  halteres: "Halteres ou kettlebell",
  academia: "Academia completa",
} as const;
export type Equipment = keyof typeof equipmentOptions;

/** Situações que exigem liberação ou acompanhamento profissional. Todas opcionais. */
export const healthFlags = {
  "dor-peito": "Dor no peito durante esforço ou em repouso",
  tontura: "Tonturas, desmaios ou perda de equilíbrio frequentes",
  cardiaco: "Doença cardíaca ou pressão alta diagnosticada",
  "dor-articular": "Dor articular ou lesão atual",
  "pos-cirurgia": "Cirurgia recente (últimos 6 meses)",
  bariatrica: "Cirurgia bariátrica",
  "medicamento-peso": "Uso de medicamento injetável para controle de peso",
  gestante: "Gestação ou pós-parto recente",
  diabetes: "Diabetes",
} as const;
export type HealthFlag = keyof typeof healthFlags;

/** Sinais que pedem avaliação médica antes de qualquer exercício novo. */
const STOP_FLAGS: HealthFlag[] = ["dor-peito", "tontura", "cardiaco"];
/** Situações que pedem liberação/acompanhamento da equipe que já trata a pessoa. */
const CLEARANCE_FLAGS: HealthFlag[] = ["pos-cirurgia", "bariatrica", "medicamento-peso", "gestante", "diabetes", "dor-articular"];

export type AssessmentInput = {
  age: number;
  heightCm: number;
  weightKg: number;
  goal: Goal;
  frequency: Frequency;
  activityType?: string;
  time: TimeAvailable;
  experience: Experience;
  equipment: Equipment[];
  flags: HealthFlag[];
  waistCm?: number | null;
  hipCm?: number | null;
  abdomenCm?: number | null;
};

export type BmiResult =
  | { kind: "adult"; value: number; label: string; note: string }
  | { kind: "youth"; value: number; note: string }
  | { kind: "none"; note: string };

export function calcBmi(weightKg: number, heightCm: number): number | null {
  if (!(weightKg > 0) || !(heightCm > 0)) return null;
  const m = heightCm / 100;
  return Math.round((weightKg / (m * m)) * 10) / 10;
}

const BMI_NOTE =
  "O IMC relaciona peso e altura. Ele não diferencia músculo de gordura, não mostra onde a gordura está e não avalia, sozinho, a sua saúde. Use-o como um dado entre vários.";

/** Classificação adulta (OMS) só a partir de 20 anos; abaixo disso a leitura depende de curvas de crescimento. */
export function interpretBmi(age: number, weightKg: number, heightCm: number): BmiResult {
  const value = calcBmi(weightKg, heightCm);
  if (value === null || !(age > 0)) return { kind: "none", note: "Informe idade, peso e altura para calcular o IMC." };
  if (age < 2) return { kind: "none", note: "Para bebês, o acompanhamento de crescimento é feito pelo pediatra." };
  if (age < 20) {
    return {
      kind: "youth",
      value,
      note: "Para crianças e adolescentes, o IMC é interpretado por curvas de crescimento que consideram idade e sexo. As faixas de adultos não se aplicam. Leve esse valor ao pediatra, que faz a leitura correta.",
    };
  }
  let label: string;
  if (value < 18.5) label = "Abaixo da faixa de referência";
  else if (value < 25) label = "Dentro da faixa de referência";
  else if (value < 30) label = "Acima da faixa de referência (sobrepeso)";
  else label = "Bem acima da faixa de referência (obesidade)";
  return { kind: "adult", value, label, note: BMI_NOTE };
}

export type Summary = {
  profile: string;
  goal: string;
  situation: string[];
  suggestions: string[];
  frequency: string;
  nextStep: string;
  alerts: string[];
  /** Nível de cautela: "stop" = procurar avaliação antes de começar. */
  caution: "ok" | "clearance" | "stop";
  relatedPrograms: string[];
};

export function lifeStage(age: number): "crianca" | "adolescente" | "adulto" | "idoso" {
  if (age < 13) return "crianca";
  if (age < 18) return "adolescente";
  if (age < 60) return "adulto";
  return "idoso";
}

const br = (n: number) => n.toLocaleString("pt-BR", { maximumFractionDigits: 1 });

const isBeginner = (x: Experience) => x === "nunca" || x === "iniciante";

export function buildSummary(input: AssessmentInput): Summary {
  const stage = lifeStage(input.age);
  const bmi = interpretBmi(input.age, input.weightKg, input.heightCm);
  const beginner = isBeginner(input.experience);
  const inactive = input.frequency === "nenhuma";

  const stop = input.flags.some((f) => STOP_FLAGS.includes(f));
  const clearance = input.flags.some((f) => CLEARANCE_FLAGS.includes(f));
  const caution: Summary["caution"] = stop ? "stop" : clearance ? "clearance" : "ok";

  const alerts: string[] = [];
  if (stop) {
    alerts.push(
      "Você marcou sinais que pedem avaliação médica antes de iniciar ou intensificar exercícios. Procure um médico e, com a liberação, retome este plano.",
    );
  }
  if (input.flags.includes("pos-cirurgia") || input.flags.includes("bariatrica")) {
    alerts.push("Depois de cirurgias, o momento e a intensidade do exercício dependem da liberação da equipe que acompanha você.");
  }
  if (input.flags.includes("medicamento-peso")) {
    alerts.push("Mantenha o acompanhamento médico do tratamento. As sugestões abaixo não envolvem medicamentos, doses ou ajustes.");
  }
  if (input.flags.includes("gestante")) {
    alerts.push("Na gestação e no pós-parto, o exercício deve ser orientado em conjunto com o obstetra.");
  }
  if (input.flags.includes("diabetes")) {
    alerts.push("Com diabetes, combine com sua equipe de saúde como ajustar alimentação e monitoramento nos dias de treino.");
  }
  if (input.flags.includes("dor-articular")) {
    alerts.push("Com dor articular ou lesão, prefira exercícios sem impacto e procure avaliação de médico ou fisioterapeuta se a dor persistir.");
  }
  if (stage === "crianca" || stage === "adolescente") {
    alerts.push("Para menores de idade, as atividades devem ter supervisão de um adulto responsável.");
  }

  const situation: string[] = [];
  situation.push(`Atividade física atual: ${frequencies[input.frequency].toLowerCase()}${input.activityType ? ` (${input.activityType})` : ""}.`);
  situation.push(`Experiência com treinamento: ${experienceLevels[input.experience].toLowerCase()}.`);
  situation.push(`Tempo disponível por sessão: ${timeOptions[input.time].toLowerCase()}.`);
  if (bmi.kind === "adult") situation.push(`IMC ${bmi.value.toFixed(1).replace(".", ",")}: ${bmi.label.toLowerCase()}.`);
  if (bmi.kind === "youth") situation.push(`IMC ${bmi.value.toFixed(1).replace(".", ",")}: interpretação depende das curvas de crescimento.`);
  if (input.waistCm) situation.push(`Circunferência da cintura registrada: ${br(input.waistCm)} cm. Compare com as próximas medições.`);

  const suggestions: string[] = [];
  if (stage === "crianca") {
    suggestions.push(
      "Priorize brincadeiras e jogos que envolvam correr, saltar, equilibrar e arremessar.",
      "Varie as atividades ao longo da semana em vez de repetir sempre o mesmo gesto.",
      "Garanta sono adequado, hidratação e refeições regulares, sem dietas restritivas.",
    );
  } else {
    if (inactive || beginner) {
      suggestions.push("Comece com sessões curtas, de 20 a 30 minutos, e aumente aos poucos.");
      suggestions.push("Nas primeiras semanas, foque em aprender os movimentos com boa técnica.");
    } else {
      suggestions.push("Aumente a exigência de forma gradual: um pouco mais de repetições, carga ou tempo a cada semana.");
    }
    if (stage !== "adolescente" || !beginner) {
      suggestions.push("Inclua exercícios de força pelo menos duas vezes por semana, trabalhando os principais grupos musculares.");
    } else {
      suggestions.push("Exercícios de força com o peso do corpo e supervisão são uma boa base nessa idade.");
    }
    if (stage === "idoso" || input.goal === "mobilidade") {
      suggestions.push("Inclua exercícios de equilíbrio e mobilidade em pelo menos três dias da semana.");
    } else {
      suggestions.push("Reserve alguns minutos de mobilidade no aquecimento ou ao fim do treino.");
    }
    if (input.goal === "emagrecimento") {
      suggestions.push("Combine treino de força, caminhadas ou outras atividades aeróbicas e uma alimentação organizada. Processo, não pressa.");
    }
    if (input.goal === "esporte" || input.goal === "taf") {
      suggestions.push("Organize a semana com dias de força, dias de condicionamento específico e recuperação planejada.");
    }
    if (input.goal === "condicionamento" || input.goal === "saude") {
      suggestions.push("Atividades aeróbicas em ritmo que permita conversar desenvolvem o fôlego com segurança.");
    }
    suggestions.push("Organize uma rotina semanal com dias e horários definidos.");
    suggestions.push("Cuide da regularidade do sono e dos hábitos: eles fazem parte do treino.");
  }
  if (caution !== "ok") suggestions.push("Procure avaliação profissional antes de iniciar ou modificar o treinamento.");

  let frequency: string;
  if (stage === "crianca" || stage === "adolescente") {
    frequency =
      "A referência da Organização Mundial da Saúde para crianças e adolescentes é de, em média, 60 minutos por dia de atividade física, com predominância de brincadeiras e esportes.";
  } else if (inactive) {
    frequency =
      "Comece com 2 a 3 sessões por semana e caminhadas leves nos outros dias. A referência da OMS para adultos é de 150 a 300 minutos semanais de atividade moderada, com força em 2 dias ou mais: é um destino, não o ponto de partida.";
  } else if (input.frequency === "1-2") {
    frequency = "Evolua para 3 sessões por semana, mantendo pelo menos 2 dias com exercícios de força.";
  } else {
    frequency = "Mantenha de 3 a 5 sessões por semana, alternando estímulos e garantindo pelo menos 1 a 2 dias de recuperação.";
  }
  if (stage === "idoso") frequency += " Para pessoas com mais idade, a OMS recomenda incluir equilíbrio e força em 3 dias ou mais por semana.";

  const relatedPrograms = relatedProgramSlugs(input, stage);

  const nextStep =
    caution === "stop"
      ? "Agende uma avaliação médica. Com a liberação, use este resumo como ponto de partida."
      : caution === "clearance"
        ? "Mostre este resumo à equipe de saúde que acompanha você e confirme o que está liberado."
        : "Salve esta avaliação, registre suas medidas a cada 4 semanas e conheça os programas indicados para o seu objetivo.";

  return {
    profile: `${input.age} anos, ${br(input.heightCm)} cm, ${br(input.weightKg)} kg${input.equipment.length ? `, equipamentos: ${input.equipment.map((e) => equipmentOptions[e].toLowerCase()).join(", ")}` : ""}.`,
    goal: goals[input.goal],
    situation,
    suggestions,
    frequency,
    nextStep,
    alerts,
    caution,
    relatedPrograms,
  };
}

function relatedProgramSlugs(input: AssessmentInput, stage: ReturnType<typeof lifeStage>): string[] {
  const out: string[] = [];
  if (stage === "crianca") out.push("desenvolvimento-motor-criancas-futebol");
  if (input.flags.includes("bariatrica")) out.push("condicionamento-pos-bariatrica");
  if (input.flags.includes("medicamento-peso")) out.push("treino-para-quem-usa-medicamentos-injetaveis");
  if (stage === "idoso" || input.goal === "mobilidade") out.push("mobilidade-e-condicionamento-mais-velhos");
  if (input.goal === "taf") out.push("metodo-taf-8-semanas");
  if (input.goal === "esporte") out.push("preparacao-fisica-futebol-fim-de-semana", "preparacao-fisica-goleiros-e-jogadores");
  if (stage === "adulto" || stage === "idoso") {
    if (input.frequency === "nenhuma" || isBeginner(input.experience)) out.push("treinamento-para-iniciantes", "retorno-gradual-atividade-fisica");
    if (input.time === "15-20" || input.time === "30") out.push("treino-para-rotina-corrida");
    if (input.goal === "condicionamento" || input.goal === "emagrecimento" || input.goal === "saude" || input.goal === "forca") {
      out.push("condicionamento-fisico-adultos");
    }
  }
  return Array.from(new Set(out)).slice(0, 3);
}
