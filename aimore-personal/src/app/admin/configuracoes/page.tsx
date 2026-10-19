import { AdminForm } from "@/components/admin/AdminForm";
import { Area, Text, Upload } from "@/components/admin/Fields";
import { getSettings } from "@/lib/data";
import { requireAdmin } from "@/lib/student";
import { saveSettings } from "../actions";

export default async function AdminSettings() {
  await requireAdmin();
  const s = await getSettings();
  return (
    <div className="max-w-3xl">
      <h1 className="mb-2 text-5xl">Dados do site</h1>
      <p className="mb-6 text-sm text-chalk-muted">Exiba apenas informações confirmadas. Campos vazios ficam ocultos no site.</p>
      <AdminForm action={saveSettings}>
        <fieldset className="card space-y-4 p-5">
          <legend className="px-1 font-semibold">Profissional</legend>
          <div className="grid gap-4 sm:grid-cols-2">
            <Text name="fullName" label="Nome" defaultValue={s.fullName} />
            <Text name="registry" label="Registro profissional" defaultValue={s.registry} />
          </div>
          <Text name="photoUrl" label="Foto (URL)" defaultValue={s.photoUrl} />
          <Upload label="Enviar foto profissional" hint="Recomendado: retrato vertical, 1200×1500 px." />
          <Area name="bio" label="Biografia" defaultValue={s.bio} />
          <Area name="philosophy" label="Filosofia de trabalho" defaultValue={s.philosophy} rows={3} />
          <Area name="education" label="Graduação (uma por linha)" defaultValue={s.education.join("\n")} rows={2} hint='Exibido como "Graduação em ..."' />
          <Area name="postgrads" label="Pós-graduações (uma por linha)" defaultValue={s.postgrads.join("\n")} />
          <Area name="specializations" label="Especializações e cursos (um por linha)" defaultValue={s.specializations.join("\n")} />
          <Area name="experience" label="Experiência profissional (uma por linha)" defaultValue={s.experience.join("\n")} />
          <Area name="areas" label="Áreas de atuação (uma por linha)" defaultValue={s.areas.join("\n")} />
        </fieldset>
        <fieldset className="card space-y-4 p-5">
          <legend className="px-1 font-semibold">Contato e redes</legend>
          <div className="grid gap-4 sm:grid-cols-2">
            <Text name="whatsapp" label="WhatsApp (com DDI e DDD)" defaultValue={s.whatsapp} placeholder="5551999999999" />
            <Text name="contactEmail" label="E-mail de contato" type="email" defaultValue={s.contactEmail} />
            <Text name="memberAreaUrl" label="Área de membros Hotmart (Club)" defaultValue={s.memberAreaUrl} hint="Onde quem comprou acessa os conteúdos." />
            <Text name="signupUrl" label="Link de cadastro de aluno (MFIT)" defaultValue={s.signupUrl} hint='Usado em todos os botões "Quero ser aluno".' />
            <Text name="storeUrl" label="Loja externa (coleção completa)" defaultValue={s.storeUrl} />
            <Text name="playlistUrl" label="Playlist" defaultValue={s.playlistUrl} />
            <Text name="tagline" label="Frase de posicionamento" defaultValue={s.tagline} />
            <Text name="motto" label="Lema" defaultValue={s.motto} />
            <Text name="instagram" label="Instagram" defaultValue={s.socials.instagram} />
            <Text name="facebook" label="Facebook" defaultValue={s.socials.facebook} />
            <Text name="tiktok" label="TikTok" defaultValue={s.socials.tiktok} />
            <Text name="youtube" label="YouTube" defaultValue={s.socials.youtube} />
            <Text name="linkedin" label="LinkedIn" defaultValue={s.socials.linkedin} />
          </div>
        </fieldset>
        <fieldset className="card space-y-4 p-5">
          <legend className="px-1 font-semibold">Avisos e destaques</legend>
          <Text name="announcement" label="Aviso no topo do site (opcional)" defaultValue={s.announcement} placeholder="Ex.: Vendas do Método TAF abertas!" />
          <div className="grid gap-4 sm:grid-cols-2">
            <Text name="banner_title" label="Banner da página inicial: título" defaultValue={s.banner?.title} />
            <Text name="banner_text" label="Banner: texto" defaultValue={s.banner?.text} />
            <Text name="banner_cta" label="Banner: texto do botão" defaultValue={s.banner?.ctaLabel} />
            <Text name="banner_href" label="Banner: link do botão" defaultValue={s.banner?.ctaHref} placeholder="/programas/metodo-taf-8-semanas" />
          </div>
        </fieldset>
      </AdminForm>
    </div>
  );
}
