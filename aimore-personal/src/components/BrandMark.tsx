import { useId } from "react";

/** Símbolo triangular "A" da Aimoré Performance, em dourado metálico. */
export function BrandMark({ className = "h-9 w-9" }: { className?: string }) {
  const id = useId().replace(/:/g, "");
  return (
    <svg viewBox="0 0 100 92" className={className} aria-hidden>
      <defs>
        <linearGradient id={`g${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#F2DDA6" />
          <stop offset=".45" stopColor="#D4AF61" />
          <stop offset=".75" stopColor="#8F6A2C" />
          <stop offset="1" stopColor="#E8CB8C" />
        </linearGradient>
      </defs>
      <path fillRule="evenodd" fill={`url(#g${id})`} d="M50 2 98 90H2L50 2Zm0 22L19 80h62L50 24Z" />
      <path fill={`url(#g${id})`} d="M50 42 64 68H36L50 42Z" />
      <path fill={`url(#g${id})`} d="M24 80 33 70h38l-4 10H24Z" opacity=".9" />
    </svg>
  );
}
