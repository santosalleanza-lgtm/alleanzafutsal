"use client";
import { useState } from "react";
import { programStatusLabel } from "@/data/programs";
import type { Program, ProgramStatus } from "@/lib/types";
import { ProgramCard } from "./ProgramCard";

export function ProgramList({ programs }: { programs: Program[] }) {
  const [filter, setFilter] = useState<ProgramStatus | "todos">("todos");
  const statuses = (Object.keys(programStatusLabel) as ProgramStatus[]).filter((s) => programs.some((p) => p.status === s));
  const visible = filter === "todos" ? programs : programs.filter((p) => p.status === filter);
  return (
    <>
      <div role="group" aria-label="Filtrar por situação" className="mb-8 flex flex-wrap gap-2">
        {(["todos", ...statuses] as const).map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            aria-pressed={filter === s}
            className={`rounded-full px-4 py-2 text-sm font-semibold ${filter === s ? "bg-gold text-ink" : "border border-gold/20 text-chalk-muted hover:text-chalk"}`}
          >
            {s === "todos" ? "Todos" : programStatusLabel[s]}
          </button>
        ))}
      </div>
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {visible.map((p) => <ProgramCard key={p.id} program={p} />)}
      </div>
    </>
  );
}
