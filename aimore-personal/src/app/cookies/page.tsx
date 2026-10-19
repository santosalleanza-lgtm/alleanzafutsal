import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = { title: "Política de cookies", alternates: { canonical: "/cookies" } };

export default function CookiesPage() {
  return (
    <LegalPage title="Política de cookies" updated="19/10/2026">
      <p>Cookies e tecnologias semelhantes são pequenos arquivos guardados no seu navegador.</p>
      <h2>Necessários</h2>
      <ul>
        <li><strong>Sessão de login:</strong> mantém você conectado à área do aluno com segurança.</li>
        <li><strong>Carrinho:</strong> guardado no armazenamento local do navegador para não perder os itens escolhidos.</li>
        <li><strong>Preferência de cookies:</strong> lembra se você aceitou ou recusou os cookies de análise.</li>
      </ul>
      <p>Esses itens são essenciais ao funcionamento e não dependem de consentimento.</p>
      <h2>Análise (opcionais)</h2>
      <p>Quando ativada, a ferramenta de análise ajuda a entender quais páginas são mais visitadas. Ela só é carregada depois do seu aceite, com anonimização de IP, e nunca recebe dados de saúde. Você pode mudar a escolha limpando os dados do site no seu navegador.</p>
      <h2>Publicidade</h2>
      <p>Este site não usa cookies de publicidade.</p>
    </LegalPage>
  );
}
