"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import type { NavItem } from "@/config/site";
import { useCart } from "./CartProvider";
import { Logo } from "./Logo";
import { buttonClass } from "./ui/Button";
import { Icon } from "./ui/Icon";

export function Header({ announcement, menu }: { announcement: string | null; menu: NavItem[] }) {
  const [open, setOpen] = useState(false);
  const [drop, setDrop] = useState<number | null>(null);
  const [section, setSection] = useState<number | null>(null);
  const pathname = usePathname();
  const { count } = useCart();
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setOpen(false);
    setDrop(null);
  }, [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setDrop(null);
    const onClick = (e: MouseEvent) => navRef.current && !navRef.current.contains(e.target as Node) && setDrop(null);
    document.addEventListener("keydown", onKey);
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onClick);
    };
  }, []);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-gold/15 bg-ink/90 backdrop-blur-md">
        {announcement && <p className="bg-gold-metal px-4 py-2 text-center text-xs font-semibold text-ink">{announcement}</p>}
        <div className="wrap flex h-[4.25rem] items-center justify-between gap-4">
          <Logo />
          <nav ref={navRef} aria-label="Principal" className="hidden xl:block">
            <ul className="flex items-center gap-0.5">
              {menu.map((item, i) => (
                <li key={item.label} className="relative" onMouseEnter={() => item.children && setDrop(i)} onMouseLeave={() => setDrop(null)}>
                  {item.children ? (
                    <button
                      type="button"
                      aria-expanded={drop === i}
                      aria-controls={`menu-${i}`}
                      onClick={() => setDrop(drop === i ? null : i)}
                      className={`flex items-center gap-1 rounded-full px-3 py-2 text-[13px] font-medium transition ${isActive(item.href) ? "text-gold" : "text-chalk-muted hover:text-chalk"}`}
                    >
                      {item.label}
                      <svg viewBox="0 0 12 12" className={`h-3 w-3 transition ${drop === i ? "rotate-180" : ""}`} aria-hidden><path d="M2 4l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.5" /></svg>
                    </button>
                  ) : (
                    <Link href={item.href} aria-current={isActive(item.href) ? "page" : undefined} className={`block rounded-full px-3 py-2 text-[13px] font-medium transition ${isActive(item.href) ? "text-gold" : "text-chalk-muted hover:text-chalk"}`}>
                      {item.label}
                    </Link>
                  )}
                  {item.children && drop === i && (
                    <div id={`menu-${i}`} className="absolute left-1/2 top-full -translate-x-1/2 pt-3">
                      <div className={`frame-gold glow-gold grid gap-6 rounded-2xl border border-gold/20 bg-ink-800/95 p-6 backdrop-blur-xl ${item.children.length > 1 ? "w-[40rem] grid-cols-2" : item.children[0].links.length > 4 ? "w-[34rem] grid-cols-1" : "w-[22rem]"}`}>
                        {item.children.map((group) => (
                          <div key={group.title}>
                            <p className="eyebrow mb-3">{group.title}</p>
                            <ul className={group.links.length > 4 && item.children!.length === 1 ? "grid grid-cols-2 gap-x-4" : ""}>
                              {group.links.map((l) => (
                                <li key={l.href}>
                                  <Link href={l.href} className="group/link block rounded-lg px-3 py-2 hover:bg-gold/10">
                                    <span className="block text-sm font-medium text-chalk group-hover/link:text-gold">{l.label}</span>
                                    {l.hint && <span className="block text-xs text-chalk-dim">{l.hint}</span>}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex items-center gap-1.5">
            <Link href="/aluno" className="hidden rounded-full p-2.5 text-chalk hover:text-gold sm:block" aria-label="Área do aluno"><Icon name="user" /></Link>
            <Link href="/carrinho" className="relative rounded-full p-2.5 text-chalk hover:text-gold" aria-label={`Carrinho, ${count} ${count === 1 ? "item" : "itens"}`}>
              <Icon name="cart" />
              {count > 0 && <span className="absolute -right-0.5 -top-0.5 grid h-5 min-w-5 place-items-center rounded-full bg-gold px-1 text-[11px] font-bold text-ink">{count}</span>}
            </Link>
            <Link href="/seja-aluno" className={buttonClass("primary", "hidden !px-5 !py-2.5 sm:inline-flex")}>Quero ser aluno</Link>
            <button className="rounded-full p-2.5 xl:hidden" onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-controls="menu-mobile" aria-label={open ? "Fechar menu" : "Abrir menu"}>
              <Icon name={open ? "close" : "menu"} className="h-6 w-6" />
            </button>
          </div>
        </div>
      </header>
      {/* Fora do <header>: o backdrop-blur dele limitaria o position: fixed ao tamanho do cabeçalho. */}
      {open && (
        <nav id="menu-mobile" aria-label="Menu" className="noise fixed inset-x-0 bottom-0 top-[4.25rem] z-30 overflow-y-auto bg-ink xl:hidden">
          <ul className={`wrap flex flex-col py-4 ${announcement ? "pt-14" : ""}`}>
            {menu.map((item, i) => (
              <li key={item.label} className="border-b border-gold/10">
                {item.children ? (
                  <>
                    <button onClick={() => setSection(section === i ? null : i)} aria-expanded={section === i} className="flex w-full items-center justify-between py-4 font-display text-3xl font-bold uppercase">
                      {item.label}
                      <span className={`text-gold transition ${section === i ? "rotate-45" : ""}`}>+</span>
                    </button>
                    {section === i && (
                      <div className="space-y-4 pb-5">
                        {item.children.map((g) => (
                          <div key={g.title}>
                            <p className="eyebrow mb-2">{g.title}</p>
                            <ul className="grid gap-1">
                              {g.links.map((l) => <li key={l.href}><Link href={l.href} className="block rounded-lg py-2 text-chalk-muted hover:text-gold">{l.label}</Link></li>)}
                            </ul>
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link href={item.href} className={`block py-4 font-display text-3xl font-bold uppercase ${isActive(item.href) ? "text-gold" : ""}`}>{item.label}</Link>
                )}
              </li>
            ))}
            <li className="border-b border-gold/10"><Link href="/aluno" className="block py-4 font-display text-3xl font-bold uppercase">Área do aluno</Link></li>
            <li className="pt-6"><Link href="/seja-aluno" className={buttonClass("primary", "w-full")}>Quero ser aluno</Link></li>
          </ul>
        </nav>
      )}
    </>
  );
}
