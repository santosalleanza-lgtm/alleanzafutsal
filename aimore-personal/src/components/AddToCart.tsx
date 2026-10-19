"use client";
import Link from "next/link";
import { useState } from "react";
import { formatBRL } from "@/lib/format";
import type { Product } from "@/lib/types";
import { useCart } from "./CartProvider";
import { Button, buttonClass } from "./ui/Button";

function OptionGroup({ label, values, value, onChange }: { label: string; values: string[]; value: string; onChange: (v: string) => void }) {
  return (
    <fieldset>
      <legend className="label">{label}</legend>
      <div className="flex flex-wrap gap-2">
        {values.map((v) => (
          <button
            type="button"
            key={v}
            onClick={() => onChange(v)}
            aria-pressed={value === v}
            className={`min-w-12 rounded-xl border px-4 py-2.5 text-sm font-semibold transition ${value === v ? "border-gold bg-gold text-ink" : "border-gold/20 hover:border-white/40"}`}
          >
            {v}
          </button>
        ))}
      </div>
    </fieldset>
  );
}

export function AddToCart({ product }: { product: Product }) {
  const { add } = useCart();
  const o = product.options;
  const [size, setSize] = useState("");
  const [color, setColor] = useState(o.colors?.[0] ?? "");
  const [model, setModel] = useState(o.models?.[0] ?? "");
  const [customText, setCustomText] = useState("");
  const [qty, setQty] = useState(1);
  const [error, setError] = useState("");
  const [added, setAdded] = useState(false);

  const submit = () => {
    if (o.sizes?.length && !size) {
      setError("Escolha um tamanho.");
      return;
    }
    setError("");
    add({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      unitPrice: product.price,
      quantity: qty,
      image: product.images[0] ?? null,
      size: size || undefined,
      color: color || undefined,
      model: model || undefined,
      customText: customText.trim() || undefined,
    });
    setAdded(true);
  };

  return (
    <div className="space-y-6">
      {o.sizes?.length ? <OptionGroup label="Tamanho" values={o.sizes} value={size} onChange={(v) => { setSize(v); setError(""); }} /> : null}
      {o.colors?.length ? <OptionGroup label="Cor" values={o.colors} value={color} onChange={setColor} /> : null}
      {o.models?.length ? <OptionGroup label="Estampa / modelo" values={o.models} value={model} onChange={setModel} /> : null}
      {o.allowsCustomText && (
        <div>
          <label htmlFor="custom" className="label">Personalização (opcional)</label>
          <input id="custom" maxLength={30} value={customText} onChange={(e) => setCustomText(e.target.value)} className="field" placeholder="Nome ou frase curta" />
          <p className="hint">{30 - customText.length} caracteres restantes.</p>
        </div>
      )}
      <div className="flex items-end gap-4">
        <div>
          <label htmlFor="qty" className="label">Quantidade</label>
          <div className="flex items-center rounded-xl border border-gold/20">
            <button type="button" className="px-4 py-3 text-lg" onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Diminuir quantidade">−</button>
            <input id="qty" inputMode="numeric" value={qty} onChange={(e) => setQty(Math.min(20, Math.max(1, Number(e.target.value.replace(/\D/g, "")) || 1)))} className="w-12 bg-transparent text-center font-semibold" />
            <button type="button" className="px-4 py-3 text-lg" onClick={() => setQty((q) => Math.min(20, q + 1))} aria-label="Aumentar quantidade">+</button>
          </div>
        </div>
        <p className="pb-3 text-sm text-chalk-muted">Subtotal: <strong className="text-chalk">{formatBRL(product.price * qty)}</strong></p>
      </div>
      {error && <p role="alert" className="text-sm font-medium text-danger">{error}</p>}
      <div className="flex flex-col gap-3 sm:flex-row">
        <Button onClick={submit} className="flex-1">Adicionar ao carrinho</Button>
        {added && <Link href="/carrinho" className={buttonClass("secondary", "flex-1")}>Ver carrinho</Link>}
      </div>
      {added && <p role="status" className="text-sm text-gold">Produto adicionado ao carrinho.</p>}
    </div>
  );
}
