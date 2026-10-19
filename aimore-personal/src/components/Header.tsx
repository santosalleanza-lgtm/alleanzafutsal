"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav } from "@/config/site";
import { useCart } from "./CartProvider";
import { Logo } from "./Logo";
import { Icon } from "./ui/Icon";
import { buttonClass } from "./ui/Button";

export function Header({ announcement }: { announcement: string | null }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { count } = useCart();

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-white/10 bg-ink/85 backdrop-blur-md">
        {announcement && <p className="bg-lime px-4 py-2 text-center text-xs font-semibold text-ink">{announcement}</p>}
        <div className="wrap flex h-16 items-center justify-between gap-4">
          <Logo />
          <nav aria-label="Principal" className="hidden xl:block">
            <ul className="flex items-center gap-1">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={`rounded-full px-3 py-2 text-sm font-medium transition ${isActive(item.href) ? "text-lime" : "text-chalk-muted hover:text-chalk"}`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex items-center gap-2">
            <Link href="/carrinho" className="relative rounded-full p-2.5 text-chalk hover:text-lime" aria-label={`Carrinho, ${count} ${count === 1 ? "item" : "itens"}`}>
              <Icon name="cart" />
              {count > 0 && <span className="absolute -right-0.5 -top-0.5 grid h-5 min-w-5 place-items-center rounded-full bg-lime px-1 text-[11px] font-bold text-ink">{count}</span>}
            </Link>
            <Link href="/comece" className={buttonClass("primary", "hidden !px-5 !py-2.5 sm:inline-flex")}>
              Comece agora
            </Link>
            <button className="rounded-full p-2.5 xl:hidden" onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-controls="menu-mobile" aria-label={open ? "Fechar menu" : "Abrir menu"}>
              <Icon name={open ? "close" : "menu"} className="h-6 w-6" />
            </button>
          </div>
        </div>
      </header>
      {/* Fora do <header>: o backdrop-blur dele limitaria o position: fixed ao tamanho do cabeçalho. */}
      {open && (
        <nav id="menu-mobile" aria-label="Menu" className="fixed inset-x-0 bottom-0 top-16 z-30 overflow-y-auto bg-ink xl:hidden">
          <ul className={`wrap flex flex-col py-6 ${announcement ? "pt-14" : ""}`}>
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={`block border-b border-white/10 py-4 font-display text-3xl uppercase ${isActive(item.href) ? "text-lime" : "text-chalk"}`}>
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="pt-6">
              <Link href="/comece" className={buttonClass("primary", "w-full")}>
                Comece agora
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </>
  );
}
