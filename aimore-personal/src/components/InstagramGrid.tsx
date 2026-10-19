import Image from "next/image";
import { Icon } from "./ui/Icon";

const posts = [
  { src: "/img/instagram/post-1.webp", alt: "Arte do Instagram: Saúde não é só estética" },
  { src: "/img/instagram/post-2.webp", alt: "Arte do Instagram: Impulsão é técnica" },
  { src: "/img/instagram/post-3.webp", alt: "Arte do Instagram: Aqueça antes do teste" },
  { src: "/img/instagram/post-6.webp", alt: "Arte do Instagram: Descanso entre séries" },
  { src: "/img/instagram/post-4.webp", alt: "Arte do Instagram: Constância" },
  { src: "/img/instagram/post-5.webp", alt: "Arte do Instagram: Treino de força é um aliado" },
];

export function InstagramGrid({ href }: { href: string }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
      {posts.map((p) => (
        <a key={p.src} href={href} target="_blank" rel="noopener noreferrer" className="group relative aspect-[4/5] overflow-hidden rounded-xl border border-gold/15">
          <Image src={p.src} alt={p.alt} fill sizes="(min-width: 1024px) 16vw, 45vw" className="object-cover transition duration-700 group-hover:scale-105" />
          <span className="absolute inset-0 grid place-items-center bg-ink/60 opacity-0 transition group-hover:opacity-100"><Icon name="instagram" className="h-8 w-8 text-gold" /></span>
        </a>
      ))}
    </div>
  );
}
