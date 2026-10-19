import { createClient as createJsClient } from "@supabase/supabase-js";
import { cache } from "react";
import { defaultSettings } from "@/config/site";
import { seedArticles } from "@/data/articles";
import { seedPosts, seedQuestions, type BlogCategory, type BlogPost, type Question } from "@/data/blog";
import { seedPrograms } from "@/data/programs";
import { seedProducts } from "@/data/products";
import { isSupabaseConfigured, supabaseAnonKey, supabaseUrl } from "@/lib/env";
import type { Article, Product, Program, SiteSettings } from "@/lib/types";

/**
 * Camada de leitura do conteúdo público.
 * Com Supabase configurado, lê o banco (o que o painel edita). Sem ele, usa os dados iniciais
 * do repositório, para o site funcionar desde o primeiro deploy.
 */

const publicClient = () =>
  isSupabaseConfigured ? createJsClient(supabaseUrl, supabaseAnonKey, { auth: { persistSession: false } }) : null;

type Row = Record<string, unknown>;
const arr = (v: unknown) => (Array.isArray(v) ? (v as string[]) : []);

export const mapProduct = (r: Row): Product => ({
  id: String(r.id),
  slug: String(r.slug),
  name: String(r.name),
  category: String(r.category),
  price: Number(r.price),
  shortDescription: String(r.short_description ?? ""),
  description: String(r.description ?? ""),
  details: arr(r.details),
  images: arr(r.images),
  options: (r.options as Product["options"]) ?? {},
  sizeGuide: (r.size_guide as Product["sizeGuide"]) ?? null,
  active: Boolean(r.active),
  featured: Boolean(r.featured),
});

export const mapProgram = (r: Row): Program => ({
  id: String(r.id),
  slug: String(r.slug),
  name: String(r.name),
  status: r.status as Program["status"],
  tagline: String(r.tagline ?? ""),
  description: String(r.description ?? ""),
  audience: String(r.audience ?? ""),
  goals: arr(r.goals),
  includes: arr(r.includes),
  duration: (r.duration as string | null) ?? null,
  safety: String(r.safety ?? ""),
  price: r.price === null || r.price === undefined ? null : Number(r.price),
  hotmartUrl: (r.hotmart_url as string | null) ?? null,
  hotmartProductId: (r.hotmart_product_id as string | null) ?? null,
  cover: (r.cover as string | null) ?? null,
  clinical: Boolean(r.clinical),
  featured: Boolean(r.featured),
  categorySlug: (r.category_slug as string | null) ?? null,
  sortOrder: Number(r.sort_order ?? 0),
});

export const mapArticle = (r: Row): Article => ({
  id: String(r.id),
  slug: String(r.slug),
  title: String(r.title),
  section: r.section as Article["section"],
  category: String(r.category),
  kind: r.kind as Article["kind"],
  excerpt: String(r.excerpt ?? ""),
  body: String(r.body ?? ""),
  published: Boolean(r.published),
});

export const getSettings = cache(async (): Promise<SiteSettings> => {
  const db = publicClient();
  if (!db) return defaultSettings;
  const { data } = await db.from("site_settings").select("data").eq("id", 1).maybeSingle();
  const saved = (data?.data ?? {}) as Partial<SiteSettings>;
  return { ...defaultSettings, ...saved, socials: { ...defaultSettings.socials, ...(saved.socials ?? {}) } };
});

export const getProducts = cache(async (): Promise<Product[]> => {
  const db = publicClient();
  if (!db) return seedProducts.filter((p) => p.active);
  const { data, error } = await db.from("products").select("*").eq("active", true).order("sort_order").order("name");
  if (error) throw new Error(`Falha ao carregar produtos: ${error.message}`);
  return (data ?? []).map(mapProduct);
});

export const getProduct = async (slug: string) => (await getProducts()).find((p) => p.slug === slug) ?? null;

export const getPrograms = cache(async (): Promise<Program[]> => {
  const db = publicClient();
  if (!db) return [...seedPrograms].sort((a, b) => a.sortOrder - b.sortOrder);
  const { data, error } = await db.from("programs").select("*").eq("active", true).order("sort_order");
  if (error) throw new Error(`Falha ao carregar programas: ${error.message}`);
  return (data ?? []).map(mapProgram);
});

export const getProgram = async (slug: string) => (await getPrograms()).find((p) => p.slug === slug) ?? null;

export const getArticles = cache(async (section: Article["section"]): Promise<Article[]> => {
  const db = publicClient();
  if (!db) return seedArticles.filter((a) => a.section === section && a.published);
  const { data, error } = await db.from("articles").select("*").eq("section", section).eq("published", true).order("created_at");
  if (error) throw new Error(`Falha ao carregar artigos: ${error.message}`);
  return (data ?? []).map(mapArticle);
});

export const getArticle = async (section: Article["section"], slug: string) =>
  (await getArticles(section)).find((a) => a.slug === slug) ?? null;


const asCategory = (c: string): BlogCategory =>
  (["hidratacao", "musculacao", "futsal-base", "taf", "emagrecimento", "futebol"] as const).includes(c as BlogCategory) ? (c as BlogCategory) : "musculacao";

/** Artigos do blog: os do banco (publicados pelo painel) seguidos dos iniciais do repositório. */
export const getBlogPosts = cache(async (): Promise<BlogPost[]> => {
  const db = publicClient();
  let fromDb: BlogPost[] = [];
  if (db) {
    const { data } = await db.from("articles").select("*").eq("section", "blog").eq("kind", "artigo").eq("published", true).order("created_at", { ascending: false });
    fromDb = (data ?? []).map((r) => ({
      slug: String(r.slug),
      title: String(r.title),
      category: asCategory(String(r.category)),
      excerpt: String(r.excerpt ?? ""),
      quick: String(r.excerpt ?? ""),
      date: String(r.created_at).slice(0, 10),
      cover: { kicker: String(r.category), lines: [String(r.title).split(" ").slice(0, 2).join(" "), String(r.title).split(" ").slice(2, 4).join(" ")], variant: "dark" },
      body: String(r.body ?? ""),
    }));
  }
  const slugs = new Set(fromDb.map((p) => p.slug));
  return [...fromDb, ...seedPosts.filter((p) => !slugs.has(p.slug))].sort((a, b) => b.date.localeCompare(a.date));
});

export const getBlogPost = async (slug: string) => (await getBlogPosts()).find((p) => p.slug === slug) ?? null;

export const getQuestions = cache(async (): Promise<Question[]> => {
  const db = publicClient();
  let fromDb: Question[] = [];
  if (db) {
    const { data } = await db.from("articles").select("*").eq("section", "blog").eq("kind", "pergunta").eq("published", true).order("created_at", { ascending: false });
    fromDb = (data ?? []).map((r) => ({ slug: String(r.slug), question: String(r.title), category: asCategory(String(r.category)), answer: String(r.body ?? "") }));
  }
  const slugs = new Set(fromDb.map((q) => q.slug));
  return [...fromDb, ...seedQuestions.filter((q) => !slugs.has(q.slug))];
});
