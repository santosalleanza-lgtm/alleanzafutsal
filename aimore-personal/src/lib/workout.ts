import { exercises, type Exercise, type Gear, type Level, type Pattern } from "@/data/exercises";

export const ageGroups = {
  crianca: "Criança (6 a 12 anos)",
  adolescente: "Adolescente (13 a 17 anos)",
  adulto: "Adulto (18 a 59 anos)",
  idoso: "60 anos ou mais",
} as const;
export type AgeGroup = keyof typeof ageGroups;

export const workoutGoals = {
  saude: "Saúde e disposição",
  emagrecimento: "Emagrecimento com saúde",
  forca: "Força e massa muscular",
  condicionamento: "Condicionamento",
  esporte: "Desempenho no esporte",
  mobilidade: "Mobilidade e equilíbrio",
} as const;
export type WorkoutGoal = keyof typeof workoutGoals;

export const places = { casa: "Em casa", "ar-livre": "Ao ar livre", academia: "Na academia" } as const;
export type Place = keyof typeof places;

export const limitations = {
  nenhuma: "Nenhuma",
  "dor-leve": "Desconforto ou dor leve em articulações",
  "pos-operatorio": "Recuperação de cirurgia",
  clinica: "Condição clínica em acompanhamento (cardíaca, metabólica, outra)",
  gestante: "Gestação ou pós-parto",
} as const;
export type Limitation = keyof typeof limitations;

export type WorkoutInput = {
  ageGroup: AgeGroup;
  goal: WorkoutGoal;
  level: Level;
  days: number;
  minutes: 15 | 20 | 30 | 45 | 60;
  place: Place;
  gear: Gear[];
  sport: string;
  limitation: Limitation;
};

export type PlannedExercise = Exercise & { prescription: string };
export type Session = { day: number; title: string; focus: string; warmup: string; exercises: PlannedExercise[]; cooldown: string };

export type WorkoutPlan =
  | { kind: "blocked"; title: string; message: string; allowed: string[] }
  | { kind: "plan"; notes: string[]; sessions: Session[]; restDays: string };

const LEVEL_RANK: Record<Level, number> = { iniciante: 0, intermediario: 1, avancado: 2 };

const WARMUP = "5 minutos: caminhada ou polichinelo sem salto, círculos de ombros e quadril e 1 série leve do primeiro exercício.";
const COOLDOWN = "3 a 5 minutos: respiração tranquila e mobilidade leve das regiões trabalhadas.";

function exerciseCount(minutes: WorkoutInput["minutes"]) {
  return { 15: 3, 20: 4, 30: 5, 45: 6, 60: 7 }[minutes];
}

function prescription(ex: Exercise, input: WorkoutInput): string {
  const beginner = input.level === "iniciante";
  if (ex.pattern === "cardio") return beginner ? "10 a 15 minutos em ritmo confortável" : "15 a 20 minutos, ritmo moderado";
  if (ex.pattern === "mobilidade") return "1 a 2 séries de 30 a 45 segundos";
  if (ex.pattern === "equilibrio") return "2 séries de 20 a 30 segundos por lado";
  if (ex.pattern === "ludico") return "3 a 5 minutos, com pausas para água";
  if (ex.pattern === "core") return beginner ? "2 séries de 15 a 20 segundos (ou 6 a 8 repetições lentas)" : "3 séries de 20 a 40 segundos";
  if (ex.pattern === "agilidade" || ex.pattern === "potencia") return "3 a 4 séries de 4 a 6 repetições, com descanso completo";
  const reps = input.goal === "forca" && !beginner ? "6 a 10" : "8 a 12";
  const sets = beginner ? "2" : "3";
  return `${sets} séries de ${reps} repetições, terminando cada série com 2 ou 3 repetições "na reserva"`;
}

/** Seleciona exercícios compatíveis com o perfil, sem carga máxima nem exercícios de risco para iniciantes. */
export function eligibleExercises(input: WorkoutInput): Exercise[] {
  const gearAvailable = new Set<Gear>(["nenhum", ...input.gear]);
  if (input.place === "academia") gearAvailable.add("academia");
  const avoidImpact = input.limitation === "dor-leve" || input.ageGroup === "idoso";
  return exercises.filter((ex) => {
    if (!gearAvailable.has(ex.gear)) return false;
    if (LEVEL_RANK[ex.minLevel] > LEVEL_RANK[input.level]) return false;
    if (avoidImpact && ex.impact) return false;
    if (ex.pattern === "ludico") return false;
    if (input.ageGroup === "idoso" && !ex.senior) return false;
    // Adolescentes: força com peso do corpo, elásticos e cargas leves; nada de potência avançada.
    if (input.ageGroup === "adolescente" && ex.pattern === "potencia") return false;
    return true;
  });
}

type Template = { title: string; focus: string; patterns: Pattern[] };

function templates(input: WorkoutInput): Template[] {
  const athletic = input.goal === "esporte" && input.level !== "iniciante" && input.ageGroup !== "idoso";
  const forcaA: Template = { title: "Força A", focus: "Corpo inteiro", patterns: ["agachar", "empurrar", "puxar", "core", "dobrar-quadril", "mobilidade", "equilibrio"] };
  const forcaB: Template = { title: "Força B", focus: "Corpo inteiro (variações)", patterns: ["dobrar-quadril", "puxar", "empurrar", "agachar", "core", "equilibrio", "mobilidade"] };
  const cond: Template = athletic
    ? { title: "Agilidade e condicionamento", focus: "Específico para o esporte", patterns: ["agilidade", "potencia", "cardio", "core", "agilidade", "mobilidade", "equilibrio"] }
    : { title: "Condicionamento", focus: "Fôlego e mobilidade", patterns: ["cardio", "core", "mobilidade", "equilibrio", "agachar", "puxar", "cardio"] };
  const mob: Template = { title: "Mobilidade e equilíbrio", focus: "Movimento e controle", patterns: ["mobilidade", "equilibrio", "core", "mobilidade", "equilibrio", "cardio", "agachar"] };

  if (input.goal === "mobilidade" || input.ageGroup === "idoso") {
    return [forcaA, mob, forcaB, mob, cond, forcaA];
  }
  if (input.goal === "condicionamento" || input.goal === "emagrecimento" || input.goal === "esporte") {
    return [forcaA, cond, forcaB, cond, forcaA, mob];
  }
  return [forcaA, forcaB, cond, forcaA, forcaB, mob];
}

function pickForTemplate(template: Template, pool: Exercise[], count: number, rotation: number): PlannedExercise[] {
  const chosen: Exercise[] = [];
  for (const pattern of template.patterns) {
    if (chosen.length >= count) break;
    const options = pool.filter((e) => e.pattern === pattern && !chosen.includes(e));
    if (!options.length) continue;
    // Prefere exercícios com equipamento quando disponíveis, alternando entre sessões.
    options.sort((a, b) => Number(b.gear !== "nenhum") - Number(a.gear !== "nenhum"));
    chosen.push(options[rotation % options.length]);
  }
  return chosen as PlannedExercise[];
}

function childPlan(input: WorkoutInput): WorkoutPlan {
  const games = exercises.filter((e) => e.pattern === "ludico");
  const days = Math.min(Math.max(input.days, 1), 5);
  const sessions: Session[] = Array.from({ length: days }, (_, i) => ({
    day: i + 1,
    title: `Brincadeira ativa ${i + 1}`,
    focus: "Coordenação, equilíbrio e agilidade através do jogo",
    warmup: "Brincadeira leve de pega-pega ou estátua por 3 minutos.",
    exercises: [games[i % games.length], games[(i + 1) % games.length], games[(i + 2) % games.length]].map((e) => ({
      ...e,
      prescription: "3 a 5 minutos, com pausas para água",
    })),
    cooldown: "Conversa sobre o que foi mais divertido, água e alongamentos leves em forma de brincadeira.",
  }));
  return {
    kind: "plan",
    notes: [
      "Para crianças, o treino é brincadeira: sem cargas, sem testes físicos e sem metas de emagrecimento.",
      "Todas as atividades devem ter supervisão de um adulto.",
      "Varie as brincadeiras e respeite o cansaço e a vontade da criança.",
    ],
    sessions,
    restDays: "Nos outros dias, brincadeiras livres e outros esportes também contam.",
  };
}

export function generatePlan(input: WorkoutInput): WorkoutPlan {
  if (input.limitation === "pos-operatorio" || input.limitation === "clinica" || input.limitation === "gestante") {
    const who =
      input.limitation === "pos-operatorio"
        ? "a equipe que realizou ou acompanha sua cirurgia"
        : input.limitation === "gestante"
          ? "seu obstetra"
          : "o médico que acompanha sua condição";
    return {
      kind: "blocked",
      title: "Antes do treino, a liberação",
      message: `Pela situação que você informou, uma sugestão automática não é segura. Converse com ${who} sobre o que está liberado e procure um profissional de Educação Física para uma orientação individual.`,
      allowed: [
        "Mantenha-se ativo dentro do que já foi liberado (por exemplo, caminhadas leves, se autorizadas).",
        "Anote suas dúvidas sobre exercício para levar à próxima consulta.",
        "Com a liberação em mãos, volte aqui ou conheça os programas com orientação de segurança.",
      ],
    };
  }

  if (input.ageGroup === "crianca") return childPlan(input);

  const days = Math.min(Math.max(Math.round(input.days), 1), 6);
  const pool = eligibleExercises(input);
  const count = exerciseCount(input.minutes);
  const tpl = templates(input);
  const effectiveDays = input.level === "iniciante" ? Math.min(days, 4) : days;

  const sessions: Session[] = Array.from({ length: effectiveDays }, (_, i) => {
    const t = tpl[i % tpl.length];
    const picked = pickForTemplate(t, pool, count, Math.floor(i / 2)).map((e) => ({ ...e, prescription: prescription(e, input) }));
    return { day: i + 1, title: t.title, focus: t.focus, warmup: WARMUP, exercises: picked, cooldown: COOLDOWN };
  });

  const notes: string[] = [
    "Sugestão educativa, não é uma prescrição individual definitiva.",
    "Não há cargas máximas: escolha pesos que permitam manter a técnica e terminar cada série com 2 ou 3 repetições sobrando.",
    "Aumente a exigência aos poucos, de semana em semana.",
  ];
  if (input.level === "iniciante" && days > 4) notes.push("Para iniciantes, limitamos a 4 sessões estruturadas; nos outros dias, prefira caminhadas leves.");
  if (input.limitation === "dor-leve") notes.push("Removemos exercícios de impacto. Se a dor persistir ou piorar, procure avaliação de médico ou fisioterapeuta.");
  if (input.ageGroup === "adolescente") notes.push("Adolescentes: aprenda a técnica com supervisão antes de usar cargas. Treinos com autorização dos responsáveis.");
  if (input.ageGroup === "idoso") notes.push("Faça os exercícios de equilíbrio perto de um apoio firme.");
  if (input.sport.trim()) notes.push(`Ajuste o volume dos treinos à carga de jogos e treinos de ${input.sport.trim()} na semana.`);

  return {
    kind: "plan",
    notes,
    sessions,
    restDays: "Deixe pelo menos um dia de descanso ou atividade leve entre sessões de força do mesmo tipo.",
  };
}
