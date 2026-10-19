import type { IconName } from "@/components/ui/Icon";

export type Service = {
  slug: string;
  icon: IconName;
  kicker: string;
  /** Título em duas linhas, como nas artes: primeira em branco, segunda em dourado. */
  title: [string, string];
  text: string;
  bullets: string[];
  /** Preço confirmado; só aparece quando informado. */
  price?: string;
  featured?: boolean;
};

/** Serviços da bio do Instagram (@aimorepersonal). */
export const services: Service[] = [
  {
    slug: "consultoria-online",
    icon: "target",
    kicker: "Time Aimoré · App MFIT",
    title: ["Consultoria", "online"],
    text: "Seu treino montado para o seu objetivo, sua rotina e o seu local de treino, direto no aplicativo. Você treina onde estiver e eu acompanho a sua evolução.",
    bullets: ["Treino individualizado no app MFIT", "Ajustes conforme a sua evolução", "Vídeos de execução dos exercícios", "Contato direto para dúvidas"],
    price: "R$ 110/mês",
    featured: true,
  },
  {
    slug: "funcional-adultos",
    icon: "pulse",
    kicker: "Funcional · Adultos",
    title: ["Treino", "funcional"],
    text: "Força, mobilidade e condicionamento em movimentos que você usa no dia a dia. Treino dinâmico, com progressão e técnica.",
    bullets: ["Força e mobilidade", "Condicionamento", "Adaptado ao seu nível"],
  },
  {
    slug: "funcional-kids",
    icon: "ball",
    kicker: "Funcional · Kids",
    title: ["Funcional", "kids"],
    text: "Coordenação, equilíbrio e agilidade com atividades lúdicas, respeitando a idade de cada criança. Movimento que vira hábito.",
    bullets: ["Desenvolvimento motor", "Atividades lúdicas", "Segurança em primeiro lugar"],
  },
  {
    slug: "musculacao",
    icon: "dumbbell",
    kicker: "Musculação",
    title: ["Força e", "hipertrofia"],
    text: "Planejamento de séries, cargas e descanso com técnica antes de peso. Para quem quer ganhar força, massa muscular ou sair da estagnação.",
    bullets: ["Progressão planejada", "Técnica e segurança", "Do iniciante ao avançado"],
  },
  {
    slug: "preparacao-taf",
    icon: "shield",
    kicker: "Concursos",
    title: ["Preparação", "para TAF"],
    text: "Preparação física organizada para as provas do teste de aptidão física: barra, flexão, abdominal, corrida e impulsão.",
    bullets: ["Técnica de cada prova", "Progressão até o dia do teste", "Estratégia de aquecimento"],
  },
  {
    slug: "condicionamento-emagrecimento",
    icon: "leaf",
    kicker: "Condicionamento",
    title: ["Emagrecimento", "com saúde"],
    text: "Treino de força, condicionamento e hábitos que cabem na vida real. Processo, não pressa: sem promessas milagrosas.",
    bullets: ["Força para preservar músculo", "Condicionamento progressivo", "Constância acima de intensidade"],
  },
];
