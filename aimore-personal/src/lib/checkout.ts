import { z } from "zod";
import type { Product } from "@/lib/types";

export const checkoutItemSchema = z.object({
  productId: z.string().min(1).max(64),
  quantity: z.number().int().min(1).max(20),
  size: z.string().max(20).optional(),
  color: z.string().max(40).optional(),
  model: z.string().max(60).optional(),
  customText: z.string().max(30).optional(),
});

export const checkoutSchema = z.object({
  items: z.array(checkoutItemSchema).min(1).max(30),
  customer: z.object({
    name: z.string().trim().min(3, "Informe seu nome completo.").max(120),
    email: z.string().trim().email("E-mail inválido.").max(160),
    phone: z.string().trim().regex(/^[\d\s()+-]{10,20}$/, "Telefone inválido."),
  }),
  address: z.object({
    cep: z.string().trim().regex(/^\d{5}-?\d{3}$/, "CEP inválido."),
    street: z.string().trim().min(2).max(160),
    number: z.string().trim().min(1).max(20),
    complement: z.string().trim().max(80).optional().default(""),
    district: z.string().trim().min(2).max(80),
    city: z.string().trim().min(2).max(80),
    state: z.string().trim().length(2, "Use a sigla do estado (ex.: RS)."),
  }),
  coupon: z.string().trim().max(40).optional(),
  acceptTerms: z.literal(true, { errorMap: () => ({ message: "É preciso aceitar os termos e a política de privacidade." }) }),
});

export type CheckoutInput = z.infer<typeof checkoutSchema>;

export type PricedLine = { product: Product; quantity: number; options: Record<string, string> };

/**
 * Reprecifica o carrinho com os dados do servidor: o preço enviado pelo navegador é ignorado
 * e opções que não existem no produto são rejeitadas.
 */
export function priceItems(items: CheckoutInput["items"], catalog: Product[]): { ok: true; lines: PricedLine[] } | { ok: false; error: string } {
  const lines: PricedLine[] = [];
  for (const item of items) {
    const product = catalog.find((p) => p.id === item.productId && p.active);
    if (!product) return { ok: false, error: "Um dos produtos do carrinho não está mais disponível." };
    const o = product.options;
    if (o.sizes?.length && (!item.size || !o.sizes.includes(item.size))) return { ok: false, error: `Escolha um tamanho válido para ${product.name}.` };
    if (item.color && !o.colors?.includes(item.color)) return { ok: false, error: `Cor inválida para ${product.name}.` };
    if (item.model && !o.models?.includes(item.model)) return { ok: false, error: `Modelo inválido para ${product.name}.` };
    if (item.customText && !o.allowsCustomText) return { ok: false, error: `${product.name} não aceita personalização de texto.` };
    const options: Record<string, string> = {};
    if (item.size) options.tamanho = item.size;
    if (item.color) options.cor = item.color;
    if (item.model) options.modelo = item.model;
    if (item.customText) options.personalizacao = item.customText;
    lines.push({ product, quantity: item.quantity, options });
  }
  return { ok: true, lines };
}

export function describeLine(l: PricedLine) {
  const opts = Object.entries(l.options).map(([k, v]) => `${k}: ${v}`).join(", ");
  return `${l.quantity}x ${l.product.name}${opts ? ` (${opts})` : ""}`;
}
