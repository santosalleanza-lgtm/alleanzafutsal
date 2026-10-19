import type { NavItem } from "@/config/site";
import { activeBundles, digitalProducts } from "@/data/digital";
import { situations } from "@/data/situations";
import { trainingCategories } from "@/data/training";

/** Menu principal montado a partir dos dados (usado no servidor e enviado ao cabeçalho). */
export function buildMenu(): NavItem[] {
  return [
    {
      label: "Sua situação",
      href: "/situacao",
      children: [{ title: "Qual é o seu momento?", links: situations.map((s) => ({ href: `/situacao/${s.slug}`, label: s.label, hint: s.kicker })) }],
    },
    {
      label: "Treinos",
      href: "/treinos",
      children: [
        { title: "Encontre seu treinamento", links: trainingCategories.map((c) => ({ href: `/treinos/${c.slug}`, label: c.title })) },
        {
          title: "Ferramentas",
          links: [
            { href: "/avaliacao", label: "Minha Avaliação Física", hint: "IMC e plano de ação em 3 minutos" },
            { href: "/gerador-de-treino", label: "Gerador de treino", hint: "Sugestão semanal para o seu perfil" },
          ],
        },
      ],
    },
    {
      label: "Blog",
      href: "/blog",
      children: [
        {
          title: "Blog do Aimoré",
          links: [
            { href: "/blog", label: "Artigos", hint: "Hidratação, musculação, futsal e mais" },
            { href: "/blog/perguntas", label: "Pergunte ao Aimoré", hint: "Suas dúvidas respondidas" },
            { href: "/alimentacao", label: "Alimentação", hint: "Educação alimentar para quem treina" },
          ],
        },
      ],
    },
    {
      label: "Programas",
      href: "/programas-digitais",
      children: [
        {
          title: "Programas digitais",
          links: [
            ...digitalProducts.map((d) => ({ href: `/programas-digitais#${d.slug}`, label: d.name, hint: d.kicker })),
            ...activeBundles().map((b) => ({ href: `/programas-digitais#${b.slug}`, label: b.name, hint: "Combo · caneta + verão" })),
            { href: "/programas-digitais", label: "Ver todos os programas", hint: "Compra segura pela Hotmart" },
          ],
        },
      ],
    },
    { label: "Loja", href: "/loja" },
    { label: "Sobre", href: "/sobre" },
    { label: "Contato", href: "/contato" },
  ];
}
