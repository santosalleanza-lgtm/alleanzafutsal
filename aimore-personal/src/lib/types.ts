export type ProductOptions = {
  sizes?: string[];
  colors?: string[];
  models?: string[];
  /** Permite ao cliente enviar nome/frase para a personalização. */
  allowsCustomText?: boolean;
};

export type SizeGuide = { headers: string[]; rows: string[][] };

export type Product = {
  id: string;
  slug: string;
  name: string;
  category: string;
  /** Preço em centavos (BRL). */
  price: number;
  shortDescription: string;
  description: string;
  details: string[];
  images: string[];
  options: ProductOptions;
  sizeGuide: SizeGuide | null;
  active: boolean;
  featured: boolean;
};

export type ProgramStatus = "disponivel" | "em-breve" | "em-desenvolvimento";

export type Program = {
  id: string;
  slug: string;
  name: string;
  status: ProgramStatus;
  tagline: string;
  description: string;
  audience: string;
  goals: string[];
  includes: string[];
  duration: string | null;
  safety: string;
  /** Preço em centavos; null quando ainda não definido. */
  price: number | null;
  hotmartUrl: string | null;
  /** Código do produto na Hotmart, usado para liberar acesso via webhook. */
  hotmartProductId: string | null;
  cover: string | null;
  /** Programas para públicos com necessidades clínicas exigem liberação profissional. */
  clinical: boolean;
  featured: boolean;
  categorySlug: string | null;
  sortOrder: number;
};

export type ArticleKind = "artigo" | "receita" | "material";

export type Article = {
  id: string;
  slug: string;
  title: string;
  section: "alimentacao" | "treinamento";
  category: string;
  kind: ArticleKind;
  excerpt: string;
  /** Parágrafos separados por linha em branco; linhas iniciadas por "- " viram lista. */
  body: string;
  published: boolean;
};

export type SocialLinks = {
  instagram: string | null;
  facebook: string | null;
  tiktok: string | null;
  youtube: string | null;
  linkedin: string | null;
};

export type Banner = { title: string; text: string; ctaLabel: string; ctaHref: string } | null;

export type SiteSettings = {
  displayName: string;
  fullName: string;
  registry: string | null;
  photoUrl: string | null;
  bio: string;
  philosophy: string;
  education: string[];
  postgrads: string[];
  specializations: string[];
  experience: string[];
  areas: string[];
  socials: SocialLinks;
  /** Somente dígitos com DDI, ex.: 5551999999999. */
  whatsapp: string | null;
  contactEmail: string | null;
  announcement: string | null;
  banner: Banner;
};

export type CartItem = {
  /** Identificador da linha (produto + variações + texto). */
  key: string;
  productId: string;
  slug: string;
  name: string;
  unitPrice: number;
  quantity: number;
  image: string | null;
  size?: string;
  color?: string;
  model?: string;
  customText?: string;
};

export type Coupon = {
  code: string;
  kind: "percent" | "fixed";
  /** Percentual (1–100) ou valor fixo em centavos. */
  value: number;
  minSubtotal: number;
  active: boolean;
  expiresAt: string | null;
};
