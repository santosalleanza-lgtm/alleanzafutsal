import { notFound } from "next/navigation";
import { AdminForm } from "@/components/admin/AdminForm";
import { Area, Check, Select, Text } from "@/components/admin/Fields";
import { nutritionCategories } from "@/data/articles";
import { blogCategories } from "@/data/blog";
import { mapArticle } from "@/lib/data";
import { requireAdmin } from "@/lib/student";
import { saveArticle } from "../../actions";

export default async function EditArticle({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const user = await requireAdmin();
  let a = null;
  if (id !== "novo") {
    const { data } = await user.supabase.from("articles").select("*").eq("id", id).maybeSingle();
    if (!data) notFound();
    a = mapArticle(data);
  }
  return (
    <div className="max-w-3xl">
      <h1 className="mb-6 text-5xl">{a ? "Editar conteúdo" : "Novo conteúdo"}</h1>
      <AdminForm action={saveArticle}>
        {a && <input type="hidden" name="id" value={a.id} />}
        <Text name="title" label="Título (ou a pergunta, no tipo Pergunta respondida)" defaultValue={a?.title} required />
        <div className="grid gap-4 sm:grid-cols-2">
          <Select name="section" label="Onde publicar" defaultValue={a?.section ?? "blog"} options={[{ value: "blog", label: "Blog do Aimoré" }, { value: "alimentacao", label: "Alimentação" }]} />
          <Select name="kind" label="Tipo" defaultValue={a?.kind} options={[{ value: "artigo", label: "Artigo" }, { value: "pergunta", label: "Pergunta respondida (blog)" }, { value: "receita", label: "Receita geral" }, { value: "material", label: "Material educativo" }]} />
          <Select
            name="category"
            label="Categoria"
            defaultValue={a?.category}
            options={[
              ...Object.entries(blogCategories).map(([value, label]) => ({ value, label: `Blog · ${label}` })),
              ...nutritionCategories.map((c) => ({ value: c.slug, label: `Alimentação · ${c.label}` })),
            ]}
          />
          <Text name="slug" label="Endereço (slug)" defaultValue={a?.slug} />
        </div>
        <Area name="excerpt" label="Resumo" defaultValue={a?.excerpt} rows={2} />
        <Area name="body" label="Texto (ou a resposta)" defaultValue={a?.body} rows={14} hint='Separe parágrafos com uma linha em branco. "- " vira lista, "## " vira subtítulo e "> " vira destaque.' />
        <Check name="published" label="Publicado" defaultChecked={a?.published} />
      </AdminForm>
    </div>
  );
}
