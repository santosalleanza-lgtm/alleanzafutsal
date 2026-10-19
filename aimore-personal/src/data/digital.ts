export type DigitalProduct = {
  slug: string;
  name: string;
  kicker: string;
  cover: [string, string];
  /** Capa oficial do produto na Hotmart. */
  image: string;
  description: string;
  points: string[];
  audience: string;
  /** Checkout direto da Hotmart (sck=site identifica as vendas vindas do site). */
  checkoutUrl: string;
  /** Página do produto na Hotmart. */
  detailsUrl: string;
  /** Preço em reais, quando confirmado. */
  price: string | null;
  note: string;
  /** Situação do site em que o produto é destacado. */
  situation: string;
  /** Categorias do blog em que o produto aparece na lateral dos artigos. */
  blogCategories: string[];
  clinical?: boolean;
};

/** E-books do Prof. Aimoré vendidos na Hotmart. Textos baseados nas páginas oficiais dos produtos. */
export const digitalProducts: DigitalProduct[] = [
  {
    slug: "taf-aprovado-rs",
    name: "Como ser aprovado no TAF",
    kicker: "E-book · TAF Aprovado RS",
    cover: ["TAF", "Aprovado RS"],
    image: "/img/produtos-digitais/taf.webp",
    description:
      "Guia prático de preparação para o teste físico dos concursos do Rio Grande do Sul, com planejamento de 12 semanas baseado em editais reais de 2024 a 2026.",
    points: ["Brigada Militar, Polícia Penal (SUSEPE), Bombeiros, Polícia Civil e Guardas Municipais", "Preparação organizada em 12 semanas", "Baseado em editais reais (2024–2026)"],
    audience: "Concurseiros gaúchos que vão encarar o TAF, inclusive quem está começando.",
    checkoutUrl: "https://pay.hotmart.com/B104624799S?off=bm7e1tls&sck=site",
    detailsUrl: "https://go.hotmart.com/B104624799S",
    price: null,
    note: "Nenhum material garante aprovação: o resultado depende da sua preparação e das regras do seu edital.",
    situation: "vou-fazer-taf",
    blogCategories: ["taf"],
  },
  {
    slug: "treino-caneta-emagrecedora",
    name: "Programa de treinamento para quem usa caneta emagrecedora",
    kicker: "E-book · Caneta emagrecedora",
    cover: ["Treino para quem", "usa caneta"],
    image: "/img/produtos-digitais/caneta.webp",
    description:
      "Para quem usa (ou vai usar) uma caneta emagrecedora prescrita pelo médico. O objetivo não é só mudar o número da balança: é preservar músculo, força e disposição durante o processo.",
    points: ["Treino de força para preservar massa magra", "Feito para quem usa caneta prescrita pelo médico", "Complementa o acompanhamento da sua equipe de saúde"],
    audience: "Pessoas em tratamento com caneta emagrecedora prescrita, com acompanhamento médico.",
    checkoutUrl: "https://pay.hotmart.com/H108059978D?sck=site",
    detailsUrl: "https://go.hotmart.com/H108059978D",
    price: null,
    note: "Conteúdo de exercício físico. Não substitui o acompanhamento médico e não orienta sobre medicamentos, doses ou ajustes de tratamento.",
    situation: "tratamento-controle-de-peso",
    blogCategories: ["emagrecimento"],
    clinical: true,
  },
  {
    slug: "treino-verao-ainda-da-tempo",
    name: "Programa de treinamento para o verão: ainda dá tempo",
    kicker: "E-book · 8 semanas",
    cover: ["Verão:", "ainda dá tempo"],
    image: "/img/produtos-digitais/verao.webp",
    description:
      "Verão não se constrói em um mês de sofrimento. São 8 semanas de treino bem feito e uma alimentação que você consegue manter, sem proibir nenhum alimento: um plano claro, progressivo e executável.",
    points: ["Programa de 8 semanas", "Treino e alimentação sem proibições", "Plano claro e progressivo"],
    audience: "Quem quer chegar ao verão mais forte e com mais disposição, sem dieta radical.",
    checkoutUrl: "https://pay.hotmart.com/B108060593G?sck=site",
    detailsUrl: "https://go.hotmart.com/B108060593G",
    price: null,
    note: "Não existe garantia de resultado igual para todas as pessoas: ele depende da sua regularidade e do seu ponto de partida.",
    situation: "quero-emagrecer",
    blogCategories: ["emagrecimento", "musculacao"],
  },
];

export const tafProduct = digitalProducts[0];
export const productForSituation = (slug: string) => digitalProducts.find((p) => p.situation === slug) ?? null;
export const productForBlogCategory = (category: string) => digitalProducts.find((p) => p.blogCategories.includes(category)) ?? null;

export type DigitalBundle = {
  slug: string;
  name: string;
  image: string;
  description: string;
  /** Produtos incluídos (slugs de digitalProducts). */
  includes: string[];
  /** Checkout do combo na Hotmart. Enquanto for null, o combo não aparece no site. */
  checkoutUrl: string | null;
  price: string | null;
  note: string;
};

export const digitalBundles: DigitalBundle[] = [
  {
    slug: "combo-emagrecimento",
    name: "Combo Emagrecer com método",
    image: "/img/produtos-digitais/combo-emagrecimento.webp",
    description:
      "Os dois programas de emagrecimento juntos: o treino para quem usa caneta emagrecedora e o programa de 8 semanas para o verão. Força, massa magra e constância no mesmo plano.",
    includes: ["treino-caneta-emagrecedora", "treino-verao-ainda-da-tempo"],
    checkoutUrl: "https://pay.hotmart.com/F108094516O?sck=site",
    price: null,
    note: "Conteúdo de exercício físico. Quem usa caneta emagrecedora deve manter o acompanhamento médico.",
  },
];

export const activeBundles = () => digitalBundles.filter((b) => b.checkoutUrl);
