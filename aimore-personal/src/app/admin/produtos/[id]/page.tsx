import { notFound } from "next/navigation";
import { AdminForm } from "@/components/admin/AdminForm";
import { Area, Check, centsToInput, Text, Upload } from "@/components/admin/Fields";
import { mapProduct } from "@/lib/data";
import { requireAdmin } from "@/lib/student";
import { saveProduct } from "../../actions";

export default async function EditProduct({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const user = await requireAdmin();
  let p = null;
  let sortOrder = 0;
  if (id !== "novo") {
    const { data } = await user.supabase.from("products").select("*").eq("id", id).maybeSingle();
    if (!data) notFound();
    p = mapProduct(data);
    sortOrder = Number(data.sort_order ?? 0);
  }
  const guide = p?.sizeGuide ? [p.sizeGuide.headers, ...p.sizeGuide.rows].map((r) => r.join("; ")).join("\n") : "";
  return (
    <div className="max-w-3xl">
      <h1 className="mb-6 text-5xl">{p ? "Editar produto" : "Novo produto"}</h1>
      <AdminForm action={saveProduct}>
        {p && <input type="hidden" name="id" value={p.id} />}
        <div className="grid gap-4 sm:grid-cols-2">
          <Text name="name" label="Nome" defaultValue={p?.name} required />
          <Text name="price" label="Preço (R$)" defaultValue={centsToInput(p?.price)} required placeholder="89,90" />
          <Text name="category" label="Categoria" defaultValue={p?.category} hint="camisetas, regatas, canecas ou nova categoria" />
          <Text name="slug" label="Endereço (slug)" defaultValue={p?.slug} hint="Gerado do nome se vazio." />
        </div>
        <Text name="short_description" label="Resumo (aparece no card)" defaultValue={p?.shortDescription} />
        <Area name="description" label="Descrição" defaultValue={p?.description} />
        <Area name="details" label="Detalhes (um por linha)" defaultValue={p?.details.join("\n")} hint="Tecido, composição, cuidados, personalização." />
        <div className="grid gap-4 sm:grid-cols-3">
          <Text name="sizes" label="Tamanhos" defaultValue={p?.options.sizes?.join(", ")} hint="Separados por vírgula" />
          <Text name="colors" label="Cores" defaultValue={p?.options.colors?.join(", ")} />
          <Text name="models" label="Modelos / estampas" defaultValue={p?.options.models?.join(", ")} />
        </div>
        <Area name="size_guide" label="Guia de tamanhos (opcional)" defaultValue={guide} rows={5} hint="Primeira linha é o cabeçalho; colunas separadas por ponto e vírgula. Ex.: Tamanho; Largura (cm); Comprimento (cm)" />
        <Area name="images" label="Imagens atuais (uma URL por linha)" defaultValue={p?.images.join("\n")} rows={3} hint="Apague uma linha para remover a imagem." />
        <Upload label="Enviar novas imagens" multiple hint="PNG, JPG, WEBP ou AVIF até 5 MB cada." />
        <div className="grid gap-4 sm:grid-cols-2">
          <Text name="sort_order" label="Ordem de exibição" type="number" defaultValue={sortOrder} />
        </div>
        <div className="flex flex-wrap gap-6">
          <Check name="active" label="Ativo na loja" defaultChecked={p?.active ?? true} />
          <Check name="featured" label="Destaque na página inicial" defaultChecked={p?.featured} />
          <Check name="allowsCustomText" label="Aceita nome/frase personalizada" defaultChecked={p?.options.allowsCustomText} />
        </div>
      </AdminForm>
    </div>
  );
}
