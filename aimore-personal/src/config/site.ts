import type { SiteSettings } from "@/lib/types";

export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, "");

export type NavLink = { href: string; label: string; hint?: string };
export type NavItem = { label: string; href: string; children?: { title: string; links: NavLink[] }[] };

/** Menu principal. Os grupos "Sua situação" e "Treinos" são preenchidos a partir dos dados. */
export const instagramUrl = "https://www.instagram.com/aimorepersonal/";

/**
 * Dados padrão exibidos enquanto o painel (Supabase) não estiver configurado.
 * Só contém informações confirmadas pelo profissional. Campos vazios ficam ocultos no site.
 */
export const defaultSettings: SiteSettings = {
  displayName: "Aimoré Performance",
  fullName: "Aimoré Weren",
  registry: "041955",
  // Sem foto até o profissional enviar uma foto profissional; o site usa o selo da marca.
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
    "Preparação física",
    "Funcional adultos e kids",
    "Musculação",
    "Preparação para TAF",
    "Condicionamento e emagrecimento",
    "Futebol, futsal e goleiros",
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
  // Links do linktr.ee/aimorepersonal
  signupUrl: "https://www.mfitpersonal.com.br/index?share=MTcxMDUxLzAvOS8w",
  storeUrl: "https://mycollection.shop/personalaimore",
  playlistUrl: "https://open.spotify.com/playlist/7aHNMCX2aUF8na6ttEM8Uk",
  tagline: "Alta performance e qualidade de vida",
  motto: "Disciplina • Evolução • Resultado",
  announcement: null,
  banner: null,
};

export const instagramHandle = "@aimorepersonal";
