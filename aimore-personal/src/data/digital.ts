export type DigitalProduct = {
  slug: string;
  name: string;
  kicker: string;
  cover: [string, string];
  description: string;
  points: string[];
  /** Link de compra da Hotmart (sem parâmetros de rastreamento pessoais). */
  checkoutUrl: string;
  /** Preço em reais, quando confirmado. */
  price: string | null;
  note: string;
};

/** Produtos digitais vendidos na Hotmart. */
export const digitalProducts: DigitalProduct[] = [
  {
    slug: "como-ser-aprovado-no-taf",
    name: "Como ser aprovado no TAF",
    kicker: "Produto digital · TAF",
    cover: ["Como ser", "aprovado no TAF"],
    description: "O material de preparação física do Aimoré Weren para quem vai encarar o teste de aptidão física de concursos.",
    points: ["Preparação física para o TAF", "Compra segura pela Hotmart", "Acesso imediato pela área de membros"],
    checkoutUrl: "https://pay.hotmart.com/B104624799S?off=bm7e1tls&sck=site",
    price: null,
    note: "Nenhum material garante aprovação: o resultado depende da sua preparação e das regras do seu edital.",
  },
];

export const tafProduct = digitalProducts[0];
