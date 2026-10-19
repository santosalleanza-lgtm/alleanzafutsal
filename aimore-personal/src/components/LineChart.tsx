"use client";
import { useId, useState } from "react";

export type Point = { date: string; value: number };

const W = 640;
const H = 220;
const PAD = { top: 16, right: 16, bottom: 28, left: 44 };

const fmtDate = (iso: string) => new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "2-digit", timeZone: "UTC" }).format(new Date(iso));
const fmtVal = (v: number) => v.toLocaleString("pt-BR", { maximumFractionDigits: 1 });

/**
 * Linha de uma série só (um gráfico por medida, sem eixo duplo).
 * Crosshair com leitura por ponteiro e teclado; a tabela de histórico serve de visão em texto.
 */
export function LineChart({ title, unit, points }: { title: string; unit: string; points: Point[] }) {
  const [active, setActive] = useState<number | null>(null);
  const titleId = useId();
  if (points.length === 0) return null;

  const xs = points.map((p) => new Date(p.date).getTime());
  const vs = points.map((p) => p.value);
  const minX = Math.min(...xs), maxX = Math.max(...xs);
  const rawMin = Math.min(...vs), rawMax = Math.max(...vs);
  const span = Math.max(rawMax - rawMin, 1);
  const minV = rawMin - span * 0.2, maxV = rawMax + span * 0.2;
  const x = (t: number) => PAD.left + (maxX === minX ? (W - PAD.left - PAD.right) / 2 : ((t - minX) / (maxX - minX)) * (W - PAD.left - PAD.right));
  const y = (v: number) => PAD.top + (1 - (v - minV) / (maxV - minV)) * (H - PAD.top - PAD.bottom);
  const path = points.map((p, i) => `${i ? "L" : "M"}${x(xs[i]).toFixed(1)},${y(p.value).toFixed(1)}`).join(" ");
  const ticks = [minV + (maxV - minV) * 0.15, (minV + maxV) / 2, maxV - (maxV - minV) * 0.15];
  const last = points.length - 1;

  const nearest = (clientX: number, rect: DOMRect) => {
    const px = ((clientX - rect.left) / rect.width) * W;
    let best = 0;
    xs.forEach((t, i) => {
      if (Math.abs(x(t) - px) < Math.abs(x(xs[best]) - px)) best = i;
    });
    return best;
  };

  const a = active ?? null;

  return (
    <figure className="card p-5">
      <figcaption id={titleId} className="mb-3 flex items-baseline justify-between gap-3">
        <span className="font-semibold">{title}</span>
        <span className="text-sm text-chalk-muted">Última: <strong className="text-chalk">{fmtVal(vs[last])} {unit}</strong></span>
      </figcaption>
      <div className="relative">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="h-auto w-full touch-none outline-none"
          role="img"
          aria-labelledby={titleId}
          tabIndex={0}
          onPointerMove={(e) => setActive(nearest(e.clientX, e.currentTarget.getBoundingClientRect()))}
          onPointerLeave={() => setActive(null)}
          onKeyDown={(e) => {
            if (e.key === "ArrowRight") setActive((i) => Math.min(last, (i ?? -1) + 1));
            if (e.key === "ArrowLeft") setActive((i) => Math.max(0, (i ?? last + 1) - 1));
          }}
          onBlur={() => setActive(null)}
        >
          {ticks.map((t) => (
            <g key={t}>
              <line x1={PAD.left} x2={W - PAD.right} y1={y(t)} y2={y(t)} stroke="rgba(255,255,255,.07)" />
              <text x={PAD.left - 8} y={y(t) + 4} textAnchor="end" fontSize="11" fill="#8A8E95">{fmtVal(t)}</text>
            </g>
          ))}
          <text x={x(xs[0])} y={H - 8} fontSize="11" fill="#8A8E95" textAnchor="start">{fmtDate(points[0].date)}</text>
          {last > 0 && <text x={x(xs[last])} y={H - 8} fontSize="11" fill="#8A8E95" textAnchor="end">{fmtDate(points[last].date)}</text>}
          <path d={path} fill="none" stroke="#C6F432" strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" />
          {points.map((p, i) => (
            <circle key={p.date + i} cx={x(xs[i])} cy={y(p.value)} r={i === a || i === last ? 5 : 3.5} fill="#C6F432" stroke="#141517" strokeWidth={2} />
          ))}
          {a !== null && <line x1={x(xs[a])} x2={x(xs[a])} y1={PAD.top} y2={H - PAD.bottom} stroke="rgba(255,255,255,.35)" strokeWidth={1} />}
        </svg>
        {a !== null && (
          <div
            className="pointer-events-none absolute top-0 -translate-x-1/2 rounded-lg border border-white/15 bg-ink-700 px-3 py-2 text-xs shadow-xl"
            style={{ left: `${(x(xs[a]) / W) * 100}%` }}
          >
            <strong className="block text-sm text-chalk">{fmtVal(points[a].value)} {unit}</strong>
            <span className="text-chalk-muted">{fmtDate(points[a].date)}</span>
          </div>
        )}
      </div>
    </figure>
  );
}
