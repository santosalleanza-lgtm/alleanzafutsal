import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";
const styles: Record<Variant, string> = {
  primary: "bg-gold-metal text-gold-ink hover:brightness-110 shadow-[0_10px_34px_-12px_rgba(212,175,97,.7)]",
  secondary: "border border-gold/40 text-chalk hover:border-gold hover:text-gold",
  ghost: "text-chalk-muted hover:text-gold",
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
