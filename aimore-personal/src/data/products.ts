import type { Product } from "@/lib/types";

/** Catálogo inicial. Preços fixos informados pelo profissional; demais dados editáveis no painel. */
export const seedProducts: Product[] = [
  {
    id: "seed-camiseta",
    slug: "camiseta-personalizada",
    name: "Camiseta personalizada",
    category: "camisetas",
    price: 8990,
    shortDescription: "Para treinar, jogar ou usar no dia a dia, com a estampa que representa a sua rotina.",
    description:
      "A camiseta Aimoré Performance foi pensada para acompanhar quem leva o treino a sério, dentro e fora da academia. Escolha o tamanho, a cor e a estampa, e acrescente um nome ou uma frase curta se quiser deixar a peça com a sua cara.",
    details: [
      "Personalização: estampa da marca, nome ou frase curta (até 30 caracteres).",
      "Tecido e composição: informados na confirmação do pedido.",
      "Confira o guia de tamanhos antes de finalizar.",
    ],
    images: ["/img/produtos/camiseta.svg"],
    options: { sizes: ["P", "M", "G", "GG"], colors: ["Preto", "Branco"], models: ["Símbolo dourado", "Treino é rotina", "Futebol"], allowsCustomText: true },
    sizeGuide: null,
    active: true,
    featured: true,
  },
  {
    id: "seed-regata",
    slug: "regata-personalizada",
    name: "Regata personalizada",
    category: "regatas",
    price: 6990,
    shortDescription: "Liberdade de movimento para os dias de calor e de treino pesado.",
    description:
      "A regata Aimoré Performance deixa os ombros livres para os treinos de força, corrida e funcional. Escolha tamanho, cor e estampa conforme a disponibilidade informada no pedido.",
    details: [
      "Personalização: estampa da marca, nome ou frase curta (até 30 caracteres).",
      "Cores, tamanhos e estampas conforme disponibilidade.",
      "Tecido e composição: informados na confirmação do pedido.",
    ],
    images: ["/img/produtos/regata.svg"],
    options: { sizes: ["P", "M", "G", "GG"], colors: ["Preto", "Branco", "Grafite"], models: ["Símbolo dourado", "Treino é rotina"], allowsCustomText: true },
    sizeGuide: null,
    active: true,
    featured: true,
  },
  {
    id: "seed-caneca",
    slug: "caneca-personalizada",
    name: "Caneca personalizada",
    category: "canecas",
    price: 5990,
    shortDescription: "O café antes do treino merece uma caneca à altura.",
    description:
      "Caneca com estampas temáticas de treino e futebol, ou personalizada com o seu nome. Um presente certeiro para quem vive a rotina de treino ou para o atleta da família.",
    details: [
      "Estampas: temas de treino, futebol e goleiro, ou nome personalizado.",
      "Envie o nome ou a frase no campo de personalização.",
      "Modelos disponíveis confirmados no pedido.",
    ],
    images: ["/img/produtos/caneca.svg"],
    options: { models: ["Tema Treino", "Tema Futebol", "Tema Goleiro", "Somente nome"], allowsCustomText: true },
    sizeGuide: null,
    active: true,
    featured: true,
  },
];

export const productCategories = [
  { slug: "camisetas", label: "Camisetas" },
  { slug: "regatas", label: "Regatas" },
  { slug: "canecas", label: "Canecas" },
];
