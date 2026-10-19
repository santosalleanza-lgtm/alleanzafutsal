"use client";
import Link from "next/link";
import { useState, type FormEvent } from "react";
import { formatBRL } from "@/lib/format";
import { useCart } from "./CartProvider";
import { Button, ButtonLink } from "./ui/Button";
import { Notice } from "./ui/Notice";

type Field = { name: string; label: string; autoComplete?: string; type?: string; inputMode?: "numeric" | "tel" | "email"; className?: string; required?: boolean; maxLength?: number };

const customerFields: Field[] = [
  { name: "name", label: "Nome completo", autoComplete: "name", className: "sm:col-span-2" },
  { name: "email", label: "E-mail", type: "email", autoComplete: "email", inputMode: "email" },
  { name: "phone", label: "Telefone / WhatsApp", type: "tel", autoComplete: "tel", inputMode: "tel" },
];

const addressFields: Field[] = [
  { name: "street", label: "Rua", autoComplete: "address-line1", className: "sm:col-span-2" },
  { name: "number", label: "Número" },
  { name: "complement", label: "Complemento (opcional)", autoComplete: "address-line2", required: false },
  { name: "district", label: "Bairro" },
  { name: "city", label: "Cidade", autoComplete: "address-level2" },
  { name: "state", label: "Estado (UF)", autoComplete: "address-level1", maxLength: 2 },
];

export function CheckoutForm({ shippingCents, shippingNotice }: { shippingCents: number | null; shippingNotice: string | null }) {
  const { items, subtotal, clear, ready } = useCart();
  const [values, setValues] = useState<Record<string, string>>({});
  const [coupon, setCoupon] = useState("");
  const [applied, setApplied] = useState<{ code: string; discount: number } | null>(null);
  const [couponMsg, setCouponMsg] = useState("");
  const [accept, setAccept] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending">("idle");
  const [error, setError] = useState<{ message: string; whatsapp?: string | null } | null>(null);

  const set = (k: string, v: string) => setValues((s) => ({ ...s, [k]: v }));

  const lookupCep = async (cep: string) => {
    const digits = cep.replace(/\D/g, "");
    if (digits.length !== 8) return;
    try {
      const res = await fetch(`https://viacep.com.br/ws/${digits}/json/`);
      const d = (await res.json()) as { erro?: boolean; logradouro?: string; bairro?: string; localidade?: string; uf?: string };
      if (d.erro) return;
      setValues((s) => ({ ...s, street: s.street || d.logradouro || "", district: s.district || d.bairro || "", city: d.localidade || s.city || "", state: d.uf || s.state || "" }));
    } catch {
      // Sem preenchimento automático: o cliente digita o endereço.
    }
  };

  const applyCoupon = async () => {
    setCouponMsg("");
    const res = await fetch("/api/cupom", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ code: coupon, subtotal }) });
    const d = await res.json();
    if (d.ok) {
      setApplied({ code: d.code, discount: d.discount });
      setCouponMsg(`Cupom ${d.code} aplicado.`);
    } else {
      setApplied(null);
      setCouponMsg(d.reason ?? "Cupom inválido.");
    }
  };

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setStatus("sending");
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map(({ productId, quantity, size, color, model, customText }) => ({ productId, quantity, size, color, model, customText })),
          customer: { name: values.name ?? "", email: values.email ?? "", phone: values.phone ?? "" },
          address: { cep: values.cep ?? "", street: values.street ?? "", number: values.number ?? "", complement: values.complement ?? "", district: values.district ?? "", city: values.city ?? "", state: values.state ?? "" },
          coupon: applied?.code,
          acceptTerms: accept,
        }),
      });
      const d = await res.json();
      if (res.ok && d.redirect) {
        clear();
        window.location.href = d.redirect;
        return;
      }
      setError({ message: d.error ?? "Não foi possível concluir. Tente novamente.", whatsapp: d.whatsapp });
    } catch {
      setError({ message: "Falha de conexão. Verifique sua internet e tente novamente." });
    }
    setStatus("idle");
  };

  if (!ready) return <p className="text-chalk-muted">Carregando…</p>;
  if (!items.length) {
    return (
      <div className="card p-10 text-center">
        <p>Seu carrinho está vazio.</p>
        <ButtonLink href="/loja" className="mt-6">Ir para a loja</ButtonLink>
      </div>
    );
  }

  const discount = applied?.discount ?? 0;
  const total = subtotal - discount + (shippingCents ?? 0);

  const input = (f: Field) => (
    <div key={f.name} className={f.className}>
      <label htmlFor={f.name} className="label">{f.label}</label>
      <input
        id={f.name}
        name={f.name}
        type={f.type ?? "text"}
        inputMode={f.inputMode}
        autoComplete={f.autoComplete}
        required={f.required !== false}
        maxLength={f.maxLength}
        value={values[f.name] ?? ""}
        onChange={(e) => set(f.name, e.target.value)}
        className="field"
      />
    </div>
  );

  return (
    <form onSubmit={submit} className="grid gap-8 lg:grid-cols-[1fr_24rem]" noValidate={false}>
      <div className="space-y-8">
        <fieldset className="card p-6">
          <legend className="px-1 font-display text-2xl uppercase">Seus dados</legend>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">{customerFields.map(input)}</div>
        </fieldset>
        <fieldset className="card p-6">
          <legend className="px-1 font-display text-2xl uppercase">Entrega</legend>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="cep" className="label">CEP</label>
              <input id="cep" name="cep" inputMode="numeric" autoComplete="postal-code" required value={values.cep ?? ""} onChange={(e) => set("cep", e.target.value)} onBlur={(e) => lookupCep(e.target.value)} className="field" placeholder="00000-000" />
            </div>
            <div className="hidden sm:block" />
            {addressFields.map(input)}
          </div>
        </fieldset>
      </div>

      <aside className="card h-fit space-y-4 p-6">
        <p className="font-display text-2xl uppercase">Resumo</p>
        <ul className="space-y-2 text-sm">
          {items.map((i) => (
            <li key={i.key} className="flex justify-between gap-3">
              <span className="text-chalk-muted">{i.quantity}x {i.name}{i.size ? ` (${i.size})` : ""}</span>
              <span>{formatBRL(i.unitPrice * i.quantity)}</span>
            </li>
          ))}
        </ul>
        <div className="flex gap-2">
          <label htmlFor="coupon" className="sr-only">Cupom de desconto</label>
          <input id="coupon" value={coupon} onChange={(e) => setCoupon(e.target.value.toUpperCase())} placeholder="Cupom de desconto" className="field !py-2.5" />
          <button type="button" onClick={applyCoupon} disabled={!coupon} className="rounded-xl border border-gold/25 px-4 text-sm font-semibold disabled:opacity-40">Aplicar</button>
        </div>
        {couponMsg && <p role="status" className={`text-xs ${applied ? "text-gold" : "text-danger"}`}>{couponMsg}</p>}
        <dl className="space-y-1 border-t border-gold/15 pt-4 text-sm">
          <div className="flex justify-between"><dt>Subtotal</dt><dd>{formatBRL(subtotal)}</dd></div>
          {discount > 0 && <div className="flex justify-between text-gold"><dt>Desconto</dt><dd>− {formatBRL(discount)}</dd></div>}
          <div className="flex justify-between"><dt>Frete</dt><dd>{shippingCents !== null ? formatBRL(shippingCents) : "A combinar"}</dd></div>
          <div className="flex justify-between pt-2 text-lg font-bold"><dt>Total</dt><dd>{formatBRL(total)}</dd></div>
        </dl>
        {shippingNotice && <p className="text-xs text-chalk-dim">{shippingNotice}</p>}
        <label className="flex gap-3 text-xs text-chalk-muted">
          <input type="checkbox" checked={accept} onChange={(e) => setAccept(e.target.checked)} required className="mt-0.5 h-4 w-4 accent-[#D4AF61]" />
          <span>Li e aceito os <Link href="/termos" className="text-gold underline">termos de uso</Link> e a <Link href="/privacidade" className="text-gold underline">política de privacidade</Link>.</span>
        </label>
        {error && (
          <Notice tone="danger">
            {error.message}
            {error.whatsapp && <a href={error.whatsapp} target="_blank" rel="noopener noreferrer" className="mt-3 block font-semibold text-gold underline">Enviar pedido pelo WhatsApp</a>}
          </Notice>
        )}
        <Button type="submit" disabled={status === "sending"} className="w-full">{status === "sending" ? "Processando…" : "Ir para o pagamento"}</Button>
        <p className="text-center text-[11px] text-chalk-dim">Pagamento processado pelo Mercado Pago. Seus dados de cartão não passam por este site.</p>
      </aside>
    </form>
  );
}
