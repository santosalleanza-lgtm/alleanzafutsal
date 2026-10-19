import type { MetadataRoute } from "next";
import { siteUrl } from "@/config/site";
import { trainingCategories } from "@/data/training";
import { getArticles, getPrograms, getProducts } from "@/lib/data";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [products, programs, articles] = await Promise.all([getProducts(), getPrograms(), getArticles("alimentacao")]);
  const staticPaths = ["", "/sobre", "/programas", "/treinos", "/avaliacao", "/gerador-de-treino", "/alimentacao", "/loja", "/contato", "/comece", "/privacidade", "/termos", "/cookies"];
  return [
    ...staticPaths.map((p) => ({ url: `${siteUrl}${p}`, changeFrequency: "weekly" as const, priority: p === "" ? 1 : 0.7 })),
    ...products.map((p) => ({ url: `${siteUrl}/loja/${p.slug}`, priority: 0.8 })),
    ...programs.map((p) => ({ url: `${siteUrl}/programas/${p.slug}`, priority: 0.8 })),
    ...trainingCategories.map((c) => ({ url: `${siteUrl}/treinos/${c.slug}`, priority: 0.6 })),
    ...articles.map((a) => ({ url: `${siteUrl}/alimentacao/${a.slug}`, priority: 0.5 })),
  ];
}
