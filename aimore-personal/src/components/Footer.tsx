import Link from "next/link";
import { situations } from "@/data/situations";
import type { SiteSettings } from "@/lib/types";
import { whatsappLink, whatsappTopics } from "@/lib/whatsapp";
import { BrandMark } from "./BrandMark";
import { Logo } from "./Logo";
import { SocialLinks } from "./SocialLinks";

export function Footer({ settings }: { settings: SiteSettings }) {
  const wa = whatsappLink(settings.whatsapp, whatsappTopics.geral);
  const col = "space-y-2 text-sm text-chalk-muted";
  return (
    <footer className="relative overflow-hidden border-t border-gold/20 bg-ink-800">
      <BrandMark className="pointer-events-none absolute -bottom-24 -right-16 h-96 w-[26rem] opacity-[0.05]" />
      <div className="wrap relative grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <Logo />
          <p className="mt-5 max-w-sm text-sm text-chalk-muted">{settings.tagline}. Preparação física, funcional adultos e kids, musculação, TAF, condicionamento e emagrecimento.</p>
          <p className="mt-3 text-[11px] uppercase tracking-luxe text-gold">{settings.motto}</p>
          {settings.registry && <p className="mt-3 text-xs text-chalk-dim">{settings.fullName} · CREF {settings.registry}</p>}
          <SocialLinks socials={settings.socials} className="mt-5" />
        </div>
        <div>
          <p className="eyebrow mb-4">Sua situação</p>
          <ul className={col}>
            {situations.slice(0, 6).map((s) => <li key={s.slug}><Link className="hover:text-gold" href={`/situacao/${s.slug}`}>{s.label}</Link></li>)}
          </ul>
        </div>
        <div>
          <p className="eyebrow mb-4">Conteúdo</p>
          <ul className={col}>
            <li><Link className="hover:text-gold" href="/blog">Blog do Aimoré</Link></li>
            <li><Link className="hover:text-gold" href="/blog/perguntas">Pergunte ao Aimoré</Link></li>
            <li><Link className="hover:text-gold" href="/treinos">Encontre seu treinamento</Link></li>
            <li><Link className="hover:text-gold" href="/avaliacao">Minha Avaliação Física</Link></li>
            <li><Link className="hover:text-gold" href="/gerador-de-treino">Gerador de treino</Link></li>
            <li><Link className="hover:text-gold" href="/alimentacao">Alimentação</Link></li>
          </ul>
        </div>
        <div>
          <p className="eyebrow mb-4">Atendimento</p>
          <ul className={col}>
            <li><Link className="font-semibold text-gold hover:underline" href="/seja-aluno">Quero ser aluno</Link></li>
            {wa && <li><a className="hover:text-gold" href={wa} target="_blank" rel="noopener noreferrer">WhatsApp</a></li>}
            <li><Link className="hover:text-gold" href="/loja">Loja</Link></li>
            {settings.storeUrl && <li><a className="hover:text-gold" href={settings.storeUrl} target="_blank" rel="noopener noreferrer">Coleção completa</a></li>}
            {settings.playlistUrl && <li><a className="hover:text-gold" href={settings.playlistUrl} target="_blank" rel="noopener noreferrer">Playlist de treino</a></li>}
            <li><Link className="hover:text-gold" href="/contato">Contato</Link></li>
            <li><Link className="hover:text-gold" href="/aluno">Área do aluno</Link></li>
            {settings.memberAreaUrl && <li><a className="hover:text-gold" href={settings.memberAreaUrl} target="_blank" rel="noopener noreferrer">Área de membros (Hotmart)</a></li>}
          </ul>
        </div>
      </div>
      <div className="relative border-t border-gold/15">
        <div className="wrap flex flex-col gap-3 py-5 text-xs text-chalk-dim md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Aimoré Performance · @aimorepersonal. Conteúdo educativo: não substitui consulta médica, nutricional ou avaliação individual.</p>
          <p className="flex gap-4">
            <Link className="hover:text-gold" href="/privacidade">Privacidade</Link>
            <Link className="hover:text-gold" href="/termos">Termos</Link>
            <Link className="hover:text-gold" href="/cookies">Cookies</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
