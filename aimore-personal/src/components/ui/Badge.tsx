import type { ProgramStatus } from "@/lib/types";
import { programStatusLabel } from "@/data/programs";

const tone: Record<ProgramStatus, string> = {
  disponivel: "bg-gold text-gold-ink",
  "em-breve": "bg-white text-ink",
  "em-desenvolvimento": "border border-gold/30 text-chalk-muted",
};

export function StatusBadge({ status }: { status: ProgramStatus }) {
  return <span className={`inline-flex rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider ${tone[status]}`}>{programStatusLabel[status]}</span>;
}
