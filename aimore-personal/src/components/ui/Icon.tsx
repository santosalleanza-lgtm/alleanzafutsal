const paths = {
  arrow: "M5 12h14M13 6l6 6-6 6",
  dumbbell: "M6 7v10M18 7v10M3 9v6M21 9v6M6 12h12",
  pulse: "M3 12h4l3-8 4 16 3-8h4",
  shirt: "M8 3l-5 3 2 5 3-1v11h8V10l3 1 2-5-5-3a4 4 0 01-8 0z",
  leaf: "M5 19C5 10 11 4 20 4c0 9-6 15-15 15zm0 0l7-7",
  cart: "M3 4h2l2.4 11.2a2 2 0 002 1.6h7.7a2 2 0 002-1.5L21 8H6M10 21a1 1 0 100-2 1 1 0 000 2zm8 0a1 1 0 100-2 1 1 0 000 2z",
  menu: "M4 7h16M4 12h16M4 17h16",
  close: "M6 6l12 12M18 6L6 18",
  check: "M5 12l5 5L20 7",
  user: "M12 12a4 4 0 100-8 4 4 0 000 8zm-7 9a7 7 0 0114 0",
  whatsapp: "M20 11.5A8.5 8.5 0 017.4 19L3 20l1.1-4.2A8.5 8.5 0 1120 11.5z M9 8.5c0 3.5 3 6.5 6.5 6.5l1-1.6-2-1-1 1a4 4 0 01-2.4-2.4l1-1-1-2L9.6 8z",
  instagram: "M7 3h10a4 4 0 014 4v10a4 4 0 01-4 4H7a4 4 0 01-4-4V7a4 4 0 014-4zm5 5a4 4 0 100 8 4 4 0 000-8zm5.5-1.5h.01",
  shield: "M12 3l8 3v6c0 4.5-3.4 8.3-8 9-4.6-.7-8-4.5-8-9V6l8-3z",
  target: "M12 21a9 9 0 100-18 9 9 0 000 18zm0-4a5 5 0 100-10 5 5 0 000 10zm0-4a1 1 0 100-2 1 1 0 000 2z",
  ball: "M12 21a9 9 0 100-18 9 9 0 000 18zm0-13l3.5 2.5-1.3 4h-4.4l-1.3-4L12 8z",
  clock: "M12 21a9 9 0 100-18 9 9 0 000 18zm0-13v4l3 2",
} as const;

export type IconName = keyof typeof paths;

export function Icon({ name, className = "h-5 w-5" }: { name: IconName; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <path d={paths[name]} />
    </svg>
  );
}
