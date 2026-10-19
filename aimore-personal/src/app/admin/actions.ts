"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { defaultSettings } from "@/config/site";
import { seedArticles } from "@/data/articles";
import { seedPrograms } from "@/data/programs";
import { seedProducts } from "@/data/products";
import { logSecurityEvent } from "@/lib/audit";
import { slugify } from "@/lib/format";
import { requireAdmin } from "@/lib/student";
import type { SiteSettings } from "@/lib/types";

// Toda escrita usa a sessão do administrador: a política RLS (is_admin) valida no banco.

const lines = (v: FormDataEntryValue | null) => String(v ?? "").split("\n").map((s) => s.trim()).filter(Boolean);
const csv = (v: FormDataEntryValue | null) => String(v ?? "").split(",").map((s) => s.trim()).filter(Boolean);
const text = (v: FormDataEntryValue | null) => String(v ?? "").trim();
const nullable = (v: FormDataEntryValue | null) => text(v) || null;
const httpsOrNull = (v: FormDataEntryValue | null) => {
  const s = text(v);
  if (!s) return null;
  if (!/^https:\/\/[^\s]+$/.test(s)) throw new Error("Use um link completo começando com https://");
  return s;
};
/** "89,90" -> 8990 centavos. */
const cents = (v: FormDataEntryValue | null) => {
  const s = text(v).replace(/\./g, "").replace(",", ".");
  if (!s) return null;
  const n = Math.round(Number(s) * 100);
  if (!Number.isFinite(n) || n < 0) throw new Error("Preço inválido.");
  return n;
};

async function uploadImages(form: FormData, folder: string) {
  const user = await requireAdmin();
  const urls: string[] = [];
  for (const file of form.getAll("upload")) {
    if (!(file instanceof File) || file.size === 0) continue;
    if (!/^image\/(png|jpe?g|webp|avif)$/.test(file.type)) throw new Error("Envie imagens PNG, JPG, WEBP ou AVIF.");
    if (file.size > 5 * 1024 * 1024) throw new Error("Cada imagem deve ter até 5 MB.");
    const path = `${folder}/${Date.now()}-${slugify(file.name.replace(/\.[^.]+$/, ""))}.${file.type.split("/")[1].replace("jpeg", "jpg")}`;
    const { error } = await user.supabase.storage.from("media").upload(path, file, { contentType: file.type, upsert: false });
    if (error) throw new Error("Falha no envio da imagem.");
    urls.push(user.supabase.storage.from("media").getPublicUrl(path).data.publicUrl);
  }
  return urls;
}

export type AdminState = { error?: string; ok?: string };

function done(path: string, msg = "Salvo."): AdminState {
  revalidatePath(path);
  revalidatePath("/", "layout");
  return { ok: msg };
}

export async function saveProduct(_: AdminState, form: FormData): Promise<AdminState> {
  try {
    const user = await requireAdmin();
    const id = text(form.get("id"));
    const name = text(form.get("name"));
    if (!name) return { error: "Informe o nome." };
    const uploaded = await uploadImages(form, "produtos");
    const row = {
      name,
      slug: slugify(text(form.get("slug")) || name),
      category: slugify(text(form.get("category")) || "outros"),
      price: cents(form.get("price")) ?? 0,
      short_description: text(form.get("short_description")),
      description: text(form.get("description")),
      details: lines(form.get("details")),
      images: [...lines(form.get("images")), ...uploaded],
      options: {
        sizes: csv(form.get("sizes")),
        colors: csv(form.get("colors")),
        models: csv(form.get("models")),
        allowsCustomText: form.get("allowsCustomText") === "on",
      },
      size_guide: parseSizeGuide(text(form.get("size_guide"))),
      active: form.get("active") === "on",
      featured: form.get("featured") === "on",
      sort_order: Number(text(form.get("sort_order")) || 0),
      updated_at: new Date().toISOString(),
    };
    const q = id ? user.supabase.from("products").update(row).eq("id", id) : user.supabase.from("products").insert(row);
    const { error } = await q;
    if (error) return { error: error.message.includes("duplicate") ? "Já existe um produto com este endereço (slug)." : "Não foi possível salvar." };
  } catch (e) {
    return { error: (e as Error).message };
  }
  return done("/admin/produtos");
}

/** Guia de tamanhos em texto: primeira linha = cabeçalho; colunas separadas por ";". */
function parseSizeGuide(s: string) {
  const rows = s.split("\n").map((l) => l.split(";").map((c) => c.trim())).filter((r) => r.some(Boolean));
  if (rows.length < 2) return null;
  return { headers: rows[0], rows: rows.slice(1) };
}

export async function saveProgram(_: AdminState, form: FormData): Promise<AdminState> {
  try {
    const user = await requireAdmin();
    const id = text(form.get("id"));
    const name = text(form.get("name"));
    if (!name) return { error: "Informe o nome." };
    const status = z.enum(["disponivel", "em-breve", "em-desenvolvimento"]).parse(form.get("status"));
    const hotmartUrl = httpsOrNull(form.get("hotmart_url"));
    if (status === "disponivel" && !hotmartUrl) return { error: "Para marcar como disponível, informe o link de compra da Hotmart." };
    const [cover] = await uploadImages(form, "programas");
    const row = {
      name,
      slug: slugify(text(form.get("slug")) || name),
      status,
      tagline: text(form.get("tagline")),
      description: text(form.get("description")),
      audience: text(form.get("audience")),
      goals: lines(form.get("goals")),
      includes: lines(form.get("includes")),
      duration: nullable(form.get("duration")),
      safety: text(form.get("safety")),
      price: cents(form.get("price")),
      hotmart_url: hotmartUrl,
      hotmart_product_id: nullable(form.get("hotmart_product_id")),
      cover: cover ?? nullable(form.get("cover")),
      clinical: form.get("clinical") === "on",
      featured: form.get("featured") === "on",
      active: form.get("active") === "on",
      category_slug: nullable(form.get("category_slug")),
      sort_order: Number(text(form.get("sort_order")) || 0),
      updated_at: new Date().toISOString(),
    };
    const { data, error } = id
      ? await user.supabase.from("programs").update(row).eq("id", id).select("id").single()
      : await user.supabase.from("programs").insert(row).select("id").single();
    if (error || !data) return { error: error?.message.includes("duplicate") ? "Já existe um programa com este endereço (slug)." : "Não foi possível salvar." };
    const contentUrl = httpsOrNull(form.get("content_url"));
    if (contentUrl) await user.supabase.from("program_content").upsert({ program_id: data.id, content_url: contentUrl, updated_at: new Date().toISOString() });
    else await user.supabase.from("program_content").delete().eq("program_id", data.id);
  } catch (e) {
    return { error: (e as Error).message };
  }
  return done("/admin/programas");
}

export async function saveArticle(_: AdminState, form: FormData): Promise<AdminState> {
  const user = await requireAdmin();
  const id = text(form.get("id"));
  const title = text(form.get("title"));
  if (!title) return { error: "Informe o título." };
  const row = {
    title,
    slug: slugify(text(form.get("slug")) || title),
    section: z.enum(["alimentacao", "treinamento"]).catch("alimentacao").parse(form.get("section")),
    category: text(form.get("category")) || "rotina-ativa",
    kind: z.enum(["artigo", "receita", "material"]).catch("artigo").parse(form.get("kind")),
    excerpt: text(form.get("excerpt")),
    body: String(form.get("body") ?? ""),
    published: form.get("published") === "on",
    updated_at: new Date().toISOString(),
  };
  const { error } = id ? await user.supabase.from("articles").update(row).eq("id", id) : await user.supabase.from("articles").insert(row);
  if (error) return { error: "Não foi possível salvar." };
  return done("/admin/artigos");
}

export async function deleteRow(form: FormData) {
  const user = await requireAdmin();
  const table = z.enum(["products", "programs", "articles", "coupons", "contact_messages"]).parse(form.get("table"));
  const key = table === "coupons" ? "code" : "id";
  await user.supabase.from(table).delete().eq(key, text(form.get("id")));
  await logSecurityEvent("admin_exclusao", { table, id: text(form.get("id")) }, user.id);
  revalidatePath("/admin", "layout");
  revalidatePath("/", "layout");
}

export async function saveSettings(_: AdminState, form: FormData): Promise<AdminState> {
  try {
    const user = await requireAdmin();
    const [photo] = await uploadImages(form, "perfil");
    const banner = text(form.get("banner_title"))
      ? { title: text(form.get("banner_title")), text: text(form.get("banner_text")), ctaLabel: text(form.get("banner_cta")) || "Saiba mais", ctaHref: text(form.get("banner_href")) || "/programas" }
      : null;
    const data: Partial<SiteSettings> = {
      fullName: text(form.get("fullName")) || defaultSettings.fullName,
      registry: nullable(form.get("registry")),
      photoUrl: photo ?? nullable(form.get("photoUrl")),
      bio: text(form.get("bio")) || defaultSettings.bio,
      philosophy: text(form.get("philosophy")),
      education: lines(form.get("education")),
      postgrads: lines(form.get("postgrads")),
      specializations: lines(form.get("specializations")),
      experience: lines(form.get("experience")),
      areas: lines(form.get("areas")),
      socials: {
        instagram: httpsOrNull(form.get("instagram")),
        facebook: httpsOrNull(form.get("facebook")),
        tiktok: httpsOrNull(form.get("tiktok")),
        youtube: httpsOrNull(form.get("youtube")),
        linkedin: httpsOrNull(form.get("linkedin")),
      },
      whatsapp: text(form.get("whatsapp")).replace(/\D/g, "") || null,
      contactEmail: nullable(form.get("contactEmail")),
      memberAreaUrl: httpsOrNull(form.get("memberAreaUrl")),
      announcement: nullable(form.get("announcement")),
      banner,
    };
    const { error } = await user.supabase.from("site_settings").upsert({ id: 1, data, updated_at: new Date().toISOString() });
    if (error) return { error: "Não foi possível salvar." };
  } catch (e) {
    return { error: (e as Error).message };
  }
  return done("/admin/configuracoes");
}

export async function updateOrder(form: FormData) {
  const user = await requireAdmin();
  const status = z.enum(["aguardando_pagamento", "pago", "em_producao", "enviado", "entregue", "cancelado", "reembolsado"]).parse(form.get("status"));
  await user.supabase
    .from("orders")
    .update({ status, tracking_code: nullable(form.get("tracking_code")), shipping: cents(form.get("shipping")), updated_at: new Date().toISOString() })
    .eq("id", text(form.get("id")));
  await logSecurityEvent("admin_pedido_atualizado", { id: text(form.get("id")), status }, user.id);
  revalidatePath("/admin/pedidos");
}

export async function grantAccess(_: AdminState, form: FormData): Promise<AdminState> {
  const user = await requireAdmin();
  const email = z.string().trim().email().safeParse(form.get("email"));
  const programId = z.string().uuid().safeParse(form.get("program_id"));
  if (!email.success || !programId.success) return { error: "Informe e-mail e programa válidos." };
  const { error } = await user.supabase.from("program_access").insert({
    buyer_email: email.data.toLowerCase(),
    program_id: programId.data,
    source: "manual",
    note: nullable(form.get("note")),
  });
  if (error) return { error: "Não foi possível liberar." };
  await logSecurityEvent("admin_acesso_liberado", { email: email.data, programId: programId.data }, user.id);
  return done("/admin/alunos", "Acesso liberado.");
}

export async function setAccessStatus(form: FormData) {
  const user = await requireAdmin();
  const status = z.enum(["ativa", "cancelada"]).parse(form.get("status"));
  await user.supabase.from("program_access").update({ status, updated_at: new Date().toISOString() }).eq("id", text(form.get("id")));
  await logSecurityEvent("admin_acesso_alterado", { id: text(form.get("id")), status }, user.id);
  revalidatePath("/admin/alunos");
}

export async function saveCoupon(_: AdminState, form: FormData): Promise<AdminState> {
  try {
    const user = await requireAdmin();
    const kind = z.enum(["percent", "fixed"]).parse(form.get("kind"));
    const raw = text(form.get("value"));
    const value = kind === "percent" ? Math.round(Number(raw)) : cents(raw);
    if (!value || value <= 0 || (kind === "percent" && value > 100)) return { error: "Valor de desconto inválido." };
    const code = text(form.get("code")).toUpperCase().replace(/[^A-Z0-9_-]/g, "");
    if (!code) return { error: "Informe o código." };
    const { error } = await user.supabase.from("coupons").upsert({
      code,
      kind,
      value,
      min_subtotal: cents(form.get("min_subtotal")) ?? 0,
      active: form.get("active") === "on",
      expires_at: nullable(form.get("expires_at")),
    });
    if (error) return { error: "Não foi possível salvar." };
  } catch (e) {
    return { error: (e as Error).message };
  }
  return done("/admin/cupons");
}

/** Importa o catálogo inicial do repositório para o banco (somente se as tabelas estiverem vazias). */
export async function importSeed() {
  const user = await requireAdmin();
  const db = user.supabase;
  const [{ count: pc }, { count: gc }, { count: ac }] = await Promise.all([
    db.from("products").select("id", { count: "exact", head: true }),
    db.from("programs").select("id", { count: "exact", head: true }),
    db.from("articles").select("id", { count: "exact", head: true }),
  ]);
  if (!pc) {
    await db.from("products").insert(
      seedProducts.map((p, i) => ({ slug: p.slug, name: p.name, category: p.category, price: p.price, short_description: p.shortDescription, description: p.description, details: p.details, images: p.images, options: p.options, size_guide: p.sizeGuide, active: p.active, featured: p.featured, sort_order: i })),
    );
  }
  if (!gc) {
    await db.from("programs").insert(
      seedPrograms.map((p) => ({ slug: p.slug, name: p.name, status: p.status, tagline: p.tagline, description: p.description, audience: p.audience, goals: p.goals, includes: p.includes, duration: p.duration, safety: p.safety, price: p.price, hotmart_url: p.hotmartUrl, hotmart_product_id: p.hotmartProductId, cover: p.cover, clinical: p.clinical, featured: p.featured, category_slug: p.categorySlug, sort_order: p.sortOrder })),
    );
  }
  if (!ac) {
    await db.from("articles").insert(seedArticles.map((a) => ({ slug: a.slug, title: a.title, section: a.section, category: a.category, kind: a.kind, excerpt: a.excerpt, body: a.body, published: a.published })));
  }
  await db.from("site_settings").upsert({ id: 1, data: defaultSettings }, { onConflict: "id", ignoreDuplicates: true });
  revalidatePath("/", "layout");
  redirect("/admin?importado=1");
}
