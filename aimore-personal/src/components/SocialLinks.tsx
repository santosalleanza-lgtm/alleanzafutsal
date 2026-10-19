import type { SocialLinks as Socials } from "@/lib/types";
import { Icon } from "./ui/Icon";

const labels: Record<keyof Socials, string> = { instagram: "Instagram", facebook: "Facebook", tiktok: "TikTok", youtube: "YouTube", linkedin: "LinkedIn" };

/** Mostra apenas as redes com link cadastrado. */
export function SocialLinks({ socials, className = "", variant = "icons" }: { socials: Socials; className?: string; variant?: "icons" | "buttons" }) {
  const entries = (Object.keys(labels) as (keyof Socials)[]).filter((k) => socials[k]);
  if (!entries.length) return null;
  return (
    <ul className={`flex flex-wrap gap-2 ${className}`}>
      {entries.map((k) => (
        <li key={k}>
          <a
            href={socials[k]!}
            target="_blank"
            rel="noopener noreferrer"
            className={
              variant === "buttons"
                ? "inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-3 text-sm font-semibold hover:border-lime hover:text-lime"
                : "inline-flex h-10 items-center gap-2 rounded-full border border-white/15 px-4 text-xs font-semibold uppercase tracking-wide text-chalk-muted hover:border-lime hover:text-lime"
            }
          >
            {k === "instagram" && <Icon name="instagram" className="h-4 w-4" />}
            {labels[k]}
          </a>
        </li>
      ))}
    </ul>
  );
}
