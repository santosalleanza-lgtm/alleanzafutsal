export const whatsappTopics = {
  geral: "Olá, Aimoré! Vim pelo site e gostaria de mais informações.",
  programas: "Olá, Aimoré! Vim pelo site e tenho uma dúvida sobre os programas de treinamento.",
  loja: "Olá, Aimoré! Vim pelo site e tenho uma dúvida sobre os produtos da loja.",
  avaliacao: "Olá, Aimoré! Fiz a autoavaliação no site e gostaria de tirar uma dúvida.",
  acompanhamento: "Olá, Aimoré! Gostaria de conhecer o acompanhamento online.",
  taf: "TAF",
} as const;

export type WhatsappTopic = keyof typeof whatsappTopics;

/** Retorna null quando não há número configurado: o botão não deve aparecer. */
export function whatsappLink(number: string | null | undefined, message: string): string | null {
  const digits = (number ?? "").replace(/\D/g, "");
  if (digits.length < 10) return null;
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}
