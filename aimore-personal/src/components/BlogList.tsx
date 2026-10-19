"use client";
import Link from "next/link";
import { useState } from "react";
import { blogCategories, type BlogCategory, type BlogPost } from "@/data/blog";
import { ArtCard } from "./ArtCard";

export function BlogList({ posts }: { posts: (BlogPost & { minutes: number })[] }) {
  const [cat, setCat] = useState<BlogCategory | "todos">("todos");
  const used = (Object.keys(blogCategories) as BlogCategory[]).filter((c) => posts.some((p) => p.category === c));
  const visible = cat === "todos" ? posts : posts.filter((p) => p.category === cat);
  return (
    <>
      <div role="group" aria-label="Filtrar por tema" className="mb-10 flex flex-wrap gap-2">
        {(["todos", ...used] as const).map((c) => (
          <button key={c} onClick={() => setCat(c)} aria-pressed={cat === c} className={`rounded-full px-4 py-2 text-sm font-semibold transition ${cat === c ? "bg-gold-metal text-ink" : "border border-gold/25 text-chalk-muted hover:text-chalk"}`}>
            {c === "todos" ? "Todos" : blogCategories[c]}
          </button>
        ))}
      </div>
      <div className="grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((p) => (
          <Link key={p.slug} href={`/blog/${p.slug}`} className="group block">
            <ArtCard kicker={blogCategories[p.category]} lines={p.cover.lines} variant={p.cover.variant} size="sm" className="aspect-[4/5]" footer={<><span>{p.minutes} min de leitura</span><span className={p.cover.variant === "gold" ? "text-ink" : "text-gold"}>Ler →</span></>} />
            <h2 className="mt-4 font-sans text-lg font-semibold normal-case leading-snug tracking-normal group-hover:text-gold">{p.title}</h2>
            <p className="mt-1 text-sm text-chalk-muted">{p.excerpt}</p>
          </Link>
        ))}
      </div>
    </>
  );
}
