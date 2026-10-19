import type { MetadataRoute } from "next";
import { siteUrl } from "@/config/site";
import { situations } from "@/data/situations";
import { trainingCategories } from "@/data/training";
import { getArticles, getBlogPosts, getProducts } from "@/lib/data";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [products, posts, articles] = await Promise.all([getProducts(), getBlogPosts(), getArticles("alimentacao")]);
  const staticPaths = ["", "/sobre", "/seja-aluno", "/situacao", "/blog", "/blog/perguntas", "/treinos", "/avaliacao", "/gerador-de-treino", "/alimentacao", "/loja", "/programas-digitais", "/contato", "/comece", "/privacidade", "/termos", "/cookies"];
  return [
    ...staticPaths.map((p) => ({ url: `${siteUrl}${p}`, changeFrequency: "weekly" as const, priority: p === "" ? 1 : 0.7 })),
    ...products.map((p) => ({ url: `${siteUrl}/loja/${p.slug}`, priority: 0.8 })),
    ...situations.map((s) => ({ url: `${siteUrl}/situacao/${s.slug}`, priority: 0.8 })),
    ...posts.map((p) => ({ url: `${siteUrl}/blog/${p.slug}`, lastModified: p.date, priority: 0.7 })),
    ...trainingCategories.map((c) => ({ url: `${siteUrl}/treinos/${c.slug}`, priority: 0.6 })),
    ...articles.map((a) => ({ url: `${siteUrl}/alimentacao/${a.slug}`, priority: 0.5 })),
  ];
}
