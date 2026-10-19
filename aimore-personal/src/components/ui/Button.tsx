import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";
const styles: Record<Variant, string> = {
  primary: "bg-lime text-lime-ink hover:bg-lime-400 shadow-[0_8px_30px_-12px_rgba(198,244,50,.6)]",
  secondary: "border border-white/20 text-chalk hover:border-lime hover:text-lime",
  ghost: "text-chalk-muted hover:text-lime",
};
const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold uppercase tracking-wide transition duration-200 disabled:cursor-not-allowed disabled:opacity-50";

export function buttonClass(variant: Variant = "primary", extra = "") {
  return `${base} ${styles[variant]} ${extra}`;
}

export function ButtonLink({
  href,
  variant = "primary",
  className = "",
  external,
  children,
}: { href: string; variant?: Variant; className?: string; external?: boolean; children: ReactNode }) {
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={buttonClass(variant, className)}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={buttonClass(variant, className)}>
      {children}
    </Link>
  );
}

export function Button({ variant = "primary", className = "", ...props }: ComponentProps<"button"> & { variant?: Variant }) {
  return <button className={buttonClass(variant, className)} {...props} />;
}
