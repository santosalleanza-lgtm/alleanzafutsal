/** Política de frete configurável por variável de ambiente. Nada de frete grátis inventado. */
export function shippingPolicy(): { mode: "combinar" } | { mode: "fixo"; cents: number } {
  const fixed = Number(process.env.STORE_SHIPPING_FIXED_CENTS);
  if (process.env.STORE_SHIPPING_MODE === "fixo" && Number.isInteger(fixed) && fixed >= 0) return { mode: "fixo", cents: fixed };
  return { mode: "combinar" };
}

export const SHIPPING_NOTICE =
  "O frete é calculado conforme o endereço e informado antes do envio. O pagamento aqui cobre os produtos; o valor do frete é combinado com você pelo e-mail ou WhatsApp informado.";
