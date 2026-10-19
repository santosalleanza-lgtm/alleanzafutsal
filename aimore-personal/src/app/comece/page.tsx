import type { Metadata } from "next";
import Link from "next/link";
import { Icon, type IconName } from "@/components/ui/Icon";
import { PageHeader } from "@/components/ui/Section";

export const metadata: Metadata = { title: "Comece agora", description: "Escolha por onde começar: autoavaliação, sugestão de treino, programas ou conteúdos.", alternates: { canonical: "/comece" } };

const paths: { icon: IconName; title: string; text: string; href: string }[] = [
  { icon: "pulse", title: "Quero entender meu ponto de partida", text: "Faça a autoavaliação física e saia com um plano de ação.", href: "/avaliacao" },
  { icon: "dumbbell", title: "Quero um treino para hoje", text: "Monte uma sugestão de rotina semanal em menos de 1 minuto.", href: "/gerador-de-treino" },
  { icon: "target", title: "Quero um programa completo", text: "Veja os programas por objetivo e público.", href: "/programas" },
  { icon: "ball", title: "Jogo futebol ou sou goleiro", text: "Orientações de preparação física para o futebol.", href: "/treinos/futebol-fim-de-semana" },
  { icon: "user", title: "Busco orientação para um perfil específico", text: "Crianças, pessoas mais velhas, pós-bariátrica e mais.", href: "/treinos" },
  { icon: "shirt", title: "Quero vestir a marca", text: "Camisetas, regatas e canecas personalizadas.", href: "/loja" },
];

export default function StartPage() {
  return (
    <>
      <PageHeader eyebrow="Comece agora" title="Qual é o seu próximo passo?" intro="Escolha a opção que mais combina com o seu momento." />
      <div className="wrap grid gap-4 py-12 sm:grid-cols-2 lg:grid-cols-3">
        {paths.map((p) => (
          <Link key={p.href} href={p.href} className="card group flex gap-4 p-6 transition hover:-translate-y-1 hover:border-lime/50">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-lime/10 text-lime"><Icon name={p.icon} className="h-6 w-6" /></span>
            <span>
              <span className="block font-semibold group-hover:text-lime">{p.title}</span>
              <span className="mt-1 block text-sm text-chalk-muted">{p.text}</span>
            </span>
          </Link>
        ))}
      </div>
    </>
  );
}
