import { notFound } from "next/navigation";
import { AdminForm } from "@/components/admin/AdminForm";
import { Area, Check, centsToInput, Select, Text, Upload } from "@/components/admin/Fields";
import { trainingCategories } from "@/data/training";
import { mapProgram } from "@/lib/data";
import { requireAdmin } from "@/lib/student";
import { saveProgram } from "../../actions";

export default async function EditProgram({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const user = await requireAdmin();
  let p = null;
  let contentUrl = "";
  if (id !== "novo") {
    const [{ data }, { data: content }] = await Promise.all([
      user.supabase.from("programs").select("*").eq("id", id).maybeSingle(),
      user.supabase.from("program_content").select("content_url").eq("program_id", id).maybeSingle(),
    ]);
    if (!data) notFound();
    p = { ...mapProgram(data), active: Boolean(data.active) };
    contentUrl = content?.content_url ?? "";
  }
  return (
    <div className="max-w-3xl">
      <h1 className="mb-6 text-5xl">{p ? "Editar programa" : "Novo programa"}</h1>
      <AdminForm action={saveProgram}>
        {p && <input type="hidden" name="id" value={p.id} />}
        <div className="grid gap-4 sm:grid-cols-2">
          <Text name="name" label="Nome comercial" defaultValue={p?.name} required />
          <Select name="status" label="Situação" defaultValue={p?.status ?? "em-desenvolvimento"} options={[{ value: "disponivel", label: "Disponível" }, { value: "em-breve", label: "Em breve" }, { value: "em-desenvolvimento", label: "Em desenvolvimento" }]} />
          <Text name="price" label="Preço (R$, opcional)" defaultValue={centsToInput(p?.price)} />
          <Text name="duration" label="Duração (opcional)" defaultValue={p?.duration} placeholder="8 semanas" />
        </div>
        <fieldset className="card space-y-4 p-5">
          <legend className="px-1 font-semibold">Hotmart</legend>
          <Text name="hotmart_url" label="Link de compra (checkout ou página do produto)" defaultValue={p?.hotmartUrl} placeholder="https://pay.hotmart.com/..." hint="Obrigatório para marcar como Disponível." />
          <Text name="hotmart_product_id" label="ID do produto na Hotmart" defaultValue={p?.hotmartProductId} hint="Usado pelo webhook para liberar o acesso na área do aluno." />
          <Text name="content_url" label="Link do conteúdo para quem comprou (opcional)" defaultValue={contentUrl} hint="Ex.: área de membros. Visível somente para alunos com acesso liberado." />
        </fieldset>
        <Text name="tagline" label="Chamada curta" defaultValue={p?.tagline} />
        <Area name="description" label="Descrição" defaultValue={p?.description} />
        <Area name="audience" label="Público indicado" defaultValue={p?.audience} rows={2} />
        <Area name="goals" label="Objetivos gerais (um por linha)" defaultValue={p?.goals.join("\n")} />
        <Area name="includes" label="Conteúdo incluído (um por linha)" defaultValue={p?.includes.join("\n")} />
        <Area name="safety" label="Orientações de segurança" defaultValue={p?.safety} />
        <div className="grid gap-4 sm:grid-cols-2">
          <Select name="category_slug" label="Categoria de treinamento" defaultValue={p?.categorySlug ?? ""} options={[{ value: "", label: "Nenhuma" }, ...trainingCategories.map((c) => ({ value: c.slug, label: c.title }))]} />
          <Text name="sort_order" label="Ordem" type="number" defaultValue={p?.sortOrder ?? 0} />
          <Text name="slug" label="Endereço (slug)" defaultValue={p?.slug} />
          <Text name="cover" label="Imagem de capa (URL)" defaultValue={p?.cover} />
        </div>
        <Upload label="Enviar nova capa" />
        <div className="flex flex-wrap gap-6">
          <Check name="active" label="Visível no site" defaultChecked={p?.active ?? true} />
          <Check name="featured" label="Destaque na página inicial" defaultChecked={p?.featured} />
          <Check name="clinical" label="Público com necessidades clínicas (exige liberação profissional)" defaultChecked={p?.clinical} />
        </div>
      </AdminForm>
    </div>
  );
}
