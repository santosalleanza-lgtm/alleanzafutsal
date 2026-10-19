import type { CartItem, Coupon } from "@/lib/types";

export const MAX_QTY = 20;

export function lineKey(i: Pick<CartItem, "productId" | "size" | "color" | "model" | "customText">) {
  return [i.productId, i.size ?? "", i.color ?? "", i.model ?? "", (i.customText ?? "").trim().toLowerCase()].join("|");
}

export function addItem(cart: CartItem[], item: Omit<CartItem, "key">): CartItem[] {
  const key = lineKey(item);
  const existing = cart.find((c) => c.key === key);
  if (existing) {
    return cart.map((c) => (c.key === key ? { ...c, quantity: Math.min(MAX_QTY, c.quantity + item.quantity) } : c));
  }
  return [...cart, { ...item, key, quantity: Math.min(MAX_QTY, Math.max(1, item.quantity)) }];
}

export function setQuantity(cart: CartItem[], key: string, quantity: number): CartItem[] {
  if (quantity <= 0) return cart.filter((c) => c.key !== key);
  return cart.map((c) => (c.key === key ? { ...c, quantity: Math.min(MAX_QTY, Math.floor(quantity)) } : c));
}

export const subtotal = (cart: Pick<CartItem, "unitPrice" | "quantity">[]) => cart.reduce((s, c) => s + c.unitPrice * c.quantity, 0);

export type CouponCheck = { ok: true; discount: number } | { ok: false; reason: string };

/** Calcula o desconto em centavos. Nunca deixa o total negativo. */
export function applyCoupon(sub: number, coupon: Coupon | null, now = new Date()): CouponCheck {
  if (!coupon || !coupon.active) return { ok: false, reason: "Cupom inválido." };
  if (coupon.expiresAt && new Date(coupon.expiresAt) < now) return { ok: false, reason: "Este cupom expirou." };
  if (sub < coupon.minSubtotal) return { ok: false, reason: "O pedido não atinge o valor mínimo deste cupom." };
  const raw = coupon.kind === "percent" ? Math.round((sub * Math.min(coupon.value, 100)) / 100) : coupon.value;
  return { ok: true, discount: Math.min(raw, sub) };
}
