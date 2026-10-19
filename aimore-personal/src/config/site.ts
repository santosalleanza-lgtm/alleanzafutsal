import type { SiteSettings } from "@/lib/types";

export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, "");

export const nav = [
  { href: "/", label: "Início" },
  { href: "/sobre", label: "Sobre mim" },
  { href: "/treinos", label: "Treinos" },
  { href: "/avaliacao", label: "Avaliação física" },
  { href: "/alimentacao", label: "Alimentação" },
  { href: "/loja", label: "Loja" },
  { href: "/aluno", label: "Área do aluno" },
  { href: "/contato", label: "Contato" },
] as const;

/**
 * Dados padrão exibidos enquanto o painel (Supabase) não estiver configurado.
 * Só contém informações confirmadas pelo profissional. Campos vazios ficam ocultos no site.
 */
export const defaultSettings: SiteSettings = {
  displayName: "Aimoré Personal",
  fullName: "Aimoré Weren",
  registry: "041955",
  photoUrl: null,
  bio: "Sou Aimoré, profissional de Educação Física, e acredito que o treinamento precisa respeitar a individualidade, os objetivos e a realidade de cada pessoa. Meu propósito é tornar o exercício físico mais acessível, ajudando você a desenvolver hábitos consistentes, melhorar seu condicionamento e buscar uma vida mais ativa.",
  philosophy:
    "Treino bom é o que cabe na sua vida e continua sendo feito daqui a seis meses. Primeiro a técnica e a regularidade, depois a intensidade. Cada etapa tem um porquê, e você entende o que está fazendo.",
  education: ["Educação Física"],
  postgrads: [
    "Pós-graduação em Treinamento Desportivo",
    "Pós-graduação em Fisiologia do Exercício",
    "Pós-graduação em Musculação e Condicionamento Físico",
  ],
  specializations: [],
  experience: [],
  areas: [
    "Treinamento funcional para adultos e crianças",
    "Musculação e condicionamento físico",
    "Preparação física para TAF e concursos",
    "Preparação física para futebol e goleiros",
    "Emagrecimento com foco em hábitos e força",
  ],
  socials: {
    instagram: "https://www.instagram.com/aimorepersonal/",
    facebook: null,
    tiktok: null,
    youtube: null,
    linkedin: "https://www.linkedin.com/in/aimor%C3%A9-weren-3273b9260/",
  },
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "5551991925356",
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL || null,
  memberAreaUrl: "https://hotmart.com/pt-br/club/prof-aimore",
  announcement: null,
  banner: null,
};

export const instagramHandle = "@aimorepersonal";
