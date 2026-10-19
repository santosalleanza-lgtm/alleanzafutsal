import { BrandMark } from "./BrandMark";

/** Selo da marca usado no lugar da foto do profissional (até haver uma foto profissional). */
export function Avatar({ size = 48, className = "" }: { size?: number; className?: string }) {
  return (
    <span
      className={`inline-grid shrink-0 place-items-center rounded-full border border-gold/40 bg-ink-800 ${className}`}
      style={{ width: size, height: size }}
      aria-hidden
    >
      <BrandMark className="h-[52%] w-[58%]" />
    </span>
  );
}
