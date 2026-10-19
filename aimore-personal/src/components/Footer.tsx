import Link from "next/link";
import type { SiteSettings } from "@/lib/types";
import { whatsappLink, whatsappTopics } from "@/lib/whatsapp";
import { Logo } from "./Logo";
import { SocialLinks } from "./SocialLinks";

export function Footer({ settings }: { settings: SiteSettings }) {
  const wa = whatsappLink(settings.whatsapp, whatsappTopics.geral);
  return (
    <footer className="border-t border-white/10 bg-ink-800">
      <div className="wrap grid gap-10 py-14 md:grid-cols-4">
        <div className="md:col-span-2">
          <Logo />
          <p className="mt-4 max-w-sm text-sm text-chalk-muted">
            Treinamento físico, condicionamento, saúde e desempenho esportivo. Programas digitais, ferramentas educativas e produtos personalizados.
          </p>
          {settings.registry && <p className="mt-3 text-xs text-chalk-dim">{settings.fullName} · Registro profissional {settings.registry}</p>}
          <SocialLinks socials={settings.socials} className="mt-5" />
        </div>
        <div>
          <p className="eyebrow mb-4">Navegue</p>
          <ul className="space-y-2 text-sm text-chalk-muted">
            <li><Link className="hover:text-lime" href="/programas">Programas</Link></li>
            <li><Link className="hover:text-lime" href="/treinos">Encontre seu treinamento</Link></li>
            <li><Link className="hover:text-lime" href="/gerador-de-treino">Gerador de treino</Link></li>
            <li><Link className="hover:text-lime" href="/avaliacao">Minha Avaliação Física</Link></li>
            <li><Link className="hover:text-lime" href="/loja">Loja</Link></li>
          </ul>
        </div>
        <div>
          <p className="eyebrow mb-4">Atendimento</p>
          <ul className="space-y-2 text-sm text-chalk-muted">
            {wa && <li><a className="hover:text-lime" href={wa} target="_blank" rel="noopener noreferrer">WhatsApp</a></li>}
            <li><Link className="hover:text-lime" href="/contato">Contato e dúvidas</Link></li>
            <li><Link className="hover:text-lime" href="/privacidade">Política de privacidade</Link></li>
            <li><Link className="hover:text-lime" href="/termos">Termos de uso</Link></li>
            <li><Link className="hover:text-lime" href="/cookies">Política de cookies</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <p className="wrap py-5 text-xs text-chalk-dim">
          © {new Date().getFullYear()} Aimoré Personal. Conteúdo educativo: não substitui consulta médica, acompanhamento nutricional ou avaliação física individual.
        </p>
      </div>
    </footer>
  );
}
