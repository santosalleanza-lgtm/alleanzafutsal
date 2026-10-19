"use client";
import { useMemo, useState } from "react";
import type { Product } from "@/lib/types";
import { ProductCard } from "./ProductCard";

export function StoreCatalog({ products, categories }: { products: Product[]; categories: { slug: string; label: string }[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("todas");

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter(
      (p) => (category === "todas" || p.category === category) && (!q || `${p.name} ${p.shortDescription}`.toLowerCase().includes(q)),
    );
  }, [products, query, category]);

  const used = categories.filter((c) => products.some((p) => p.category === c.slug));

  return (
    <div>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div role="group" aria-label="Filtrar por categoria" className="flex flex-wrap gap-2">
          {[{ slug: "todas", label: "Todos" }, ...used].map((c) => (
            <button
              key={c.slug}
              onClick={() => setCategory(c.slug)}
              aria-pressed={category === c.slug}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${category === c.slug ? "bg-gold text-ink" : "border border-gold/20 text-chalk-muted hover:text-chalk"}`}
            >
              {c.label}
            </button>
          ))}
        </div>
        <label className="relative sm:w-72">
          <span className="sr-only">Buscar produtos</span>
          <input type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Buscar produtos" className="field !rounded-full" />
        </label>
      </div>
      {visible.length ? (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      ) : (
        <p className="card p-8 text-center text-chalk-muted">Nenhum produto encontrado. Tente outro termo ou categoria.</p>
      )}
    </div>
  );
}
