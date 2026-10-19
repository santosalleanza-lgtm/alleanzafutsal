import { whatsappLink, whatsappTopics } from "@/lib/whatsapp";
import { Icon } from "./ui/Icon";

export function WhatsAppFab({ number }: { number: string | null }) {
  const href = whatsappLink(number, whatsappTopics.geral);
  if (!href) return null;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-4 right-4 z-30 grid h-14 w-14 place-items-center rounded-full bg-lime text-ink shadow-lg transition hover:scale-105"
      aria-label="Conversar no WhatsApp"
    >
      <Icon name="whatsapp" className="h-7 w-7" />
    </a>
  );
}
