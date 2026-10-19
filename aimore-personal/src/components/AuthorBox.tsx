import Link from "next/link";
import type { SiteSettings } from "@/lib/types";
import { Avatar } from "./Avatar";

export function AuthorBox({ settings, compact = false }: { settings: SiteSettings; compact?: boolean }) {
  return (
    <div className={`flex items-center gap-4 ${compact ? "" : "frame-gold rounded-2xl border border-gold/20 bg-ink-800 p-6"}`}>
      <Avatar size={compact ? 48 : 72} />
      <div>
        <p className="font-semibold">{settings.fullName}</p>
        <p className="text-xs text-chalk-dim">{settings.registry ? `CREF ${settings.registry} · ` : ""}Profissional de Educação Física</p>
        {!compact && (
          <p className="mt-2 text-sm text-chalk-muted">
            Preparação física, musculação, funcional adultos e kids, TAF e futsal. <Link href="/sobre" className="text-gold underline">Conheça minha trajetória</Link>.
          </p>
        )}
      </div>
    </div>
  );
}
