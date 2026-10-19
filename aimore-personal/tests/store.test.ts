import { describe, expect, it } from "vitest";
import { seedProducts } from "@/data/products";
import { addItem, applyCoupon, lineKey, setQuantity, subtotal } from "@/lib/cart";
import { priceItems } from "@/lib/checkout";
import type { CartItem, Coupon } from "@/lib/types";

const item = (o: Partial<CartItem> = {}): Omit<CartItem, "key"> => ({ productId: "p1", slug: "x", name: "Camiseta", unitPrice: 8990, quantity: 1, image: null, size: "M", ...o });

describe("carrinho", () => {
  it("preços iniciais informados", () => {
    const price = Object.fromEntries(seedProducts.map((p) => [p.category, p.price]));
    expect(price).toEqual({ camisetas: 8990, regatas: 6990, canecas: 5990 });
  });
  it("agrupa itens iguais e separa variações diferentes", () => {
    let c = addItem([], item());
    c = addItem(c, item({ quantity: 2 }));
    c = addItem(c, item({ size: "G" }));
    expect(c).toHaveLength(2);
    expect(c[0].quantity).toBe(3);
    expect(subtotal(c)).toBe(8990 * 4);
  });
  it("limita quantidade e remove com zero", () => {
    let c = addItem([], item({ quantity: 50 }));
    expect(c[0].quantity).toBe(20);
    c = setQuantity(c, lineKey(item()), 0);
    expect(c).toHaveLength(0);
  });
});

describe("cupons", () => {
  const coupon = (o: Partial<Coupon> = {}): Coupon => ({ code: "X", kind: "percent", value: 10, minSubtotal: 0, active: true, expiresAt: null, ...o });
  it("percentual e fixo", () => {
    expect(applyCoupon(10000, coupon())).toEqual({ ok: true, discount: 1000 });
    expect(applyCoupon(10000, coupon({ kind: "fixed", value: 1500 }))).toEqual({ ok: true, discount: 1500 });
  });
  it("nunca deixa total negativo", () => {
    expect(applyCoupon(1000, coupon({ kind: "fixed", value: 5000 }))).toEqual({ ok: true, discount: 1000 });
  });
  it("rejeita inativo, expirado e abaixo do mínimo", () => {
    expect(applyCoupon(10000, coupon({ active: false })).ok).toBe(false);
    expect(applyCoupon(10000, coupon({ expiresAt: "2020-01-01" })).ok).toBe(false);
    expect(applyCoupon(5000, coupon({ minSubtotal: 6000 })).ok).toBe(false);
    expect(applyCoupon(5000, null).ok).toBe(false);
  });
});

describe("reprecificação no servidor", () => {
  const camiseta = seedProducts[0];
  it("usa o preço do catálogo e valida opções", () => {
    const r = priceItems([{ productId: camiseta.id, quantity: 2, size: "M", color: "Preto" }], seedProducts);
    expect(r.ok && r.lines[0].product.price).toBe(8990);
  });
  it("rejeita tamanho inexistente, ausente ou produto desconhecido", () => {
    expect(priceItems([{ productId: camiseta.id, quantity: 1, size: "XXG" }], seedProducts).ok).toBe(false);
    expect(priceItems([{ productId: camiseta.id, quantity: 1 }], seedProducts).ok).toBe(false);
    expect(priceItems([{ productId: "nao-existe", quantity: 1 }], seedProducts).ok).toBe(false);
  });
});
