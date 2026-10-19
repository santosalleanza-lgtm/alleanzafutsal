"use client";
import Image from "next/image";
import Link from "next/link";
import { formatBRL } from "@/lib/format";
import { useCart } from "./CartProvider";
import { ButtonLink } from "./ui/Button";

export function CartView() {
  const { items, subtotal, update, ready } = useCart();
  if (!ready) return <p className="text-chalk-muted" aria-busy>Carregando carrinho…</p>;
  if (!items.length) {
    return (
      <div className="card p-10 text-center">
        <p className="text-lg">Seu carrinho está vazio.</p>
        <ButtonLink href="/loja" className="mt-6">Ir para a loja</ButtonLink>
      </div>
    );
  }
  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_22rem]">
      <ul className="space-y-3">
        {items.map((i) => (
          <li key={i.key} className="card flex gap-4 p-4">
            <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-ink-700">
              {i.image && <Image src={i.image} alt="" fill sizes="96px" unoptimized={i.image.endsWith(".svg")} className="object-contain p-2" />}
            </div>
            <div className="flex flex-1 flex-col">
              <Link href={`/loja/${i.slug}`} className="font-semibold hover:text-gold">{i.name}</Link>
              <p className="text-xs text-chalk-dim">{[i.size && `Tamanho ${i.size}`, i.color, i.model, i.customText && `“${i.customText}”`].filter(Boolean).join(" · ")}</p>
              <div className="mt-auto flex items-center justify-between pt-3">
                <div className="flex items-center rounded-lg border border-gold/20 text-sm">
                  <button className="px-3 py-1.5" onClick={() => update(i.key, i.quantity - 1)} aria-label={`Diminuir quantidade de ${i.name}`}>−</button>
                  <span className="w-8 text-center" aria-live="polite">{i.quantity}</span>
                  <button className="px-3 py-1.5" onClick={() => update(i.key, i.quantity + 1)} aria-label={`Aumentar quantidade de ${i.name}`}>+</button>
                </div>
                <span className="font-semibold">{formatBRL(i.unitPrice * i.quantity)}</span>
              </div>
            </div>
            <button onClick={() => update(i.key, 0)} className="self-start text-xs text-chalk-dim hover:text-danger" aria-label={`Remover ${i.name}`}>Remover</button>
          </li>
        ))}
      </ul>
      <aside className="card h-fit p-6">
        <div className="flex justify-between text-lg"><span>Subtotal</span><strong>{formatBRL(subtotal)}</strong></div>
        <p className="mt-2 text-xs text-chalk-dim">Cupom de desconto e dados de entrega na próxima etapa. Frete informado conforme o endereço.</p>
        <ButtonLink href="/checkout" className="mt-6 w-full">Finalizar compra</ButtonLink>
        <Link href="/loja" className="mt-4 block text-center text-sm text-chalk-muted hover:text-gold">Continuar comprando</Link>
      </aside>
    </div>
  );
}
