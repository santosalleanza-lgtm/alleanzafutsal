import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/LegalPage";
import { getSettings } from "@/lib/data";

export const metadata: Metadata = { title: "Política de privacidade", alternates: { canonical: "/privacidade" } };

export default async function PrivacyPage() {
  const s = await getSettings();
  const contact = s.contactEmail ? <a href={`mailto:${s.contactEmail}`} className="text-gold">{s.contactEmail}</a> : <Link href="/contato" className="text-gold">página de contato</Link>;
  return (
    <LegalPage title="Política de privacidade" updated="19/10/2026">
      <p>Esta política explica como o site Aimoré Personal trata dados pessoais, em conformidade com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018, LGPD).</p>
      <h2>1. Quem é o controlador</h2>
      <p>O controlador dos dados é {s.fullName}, profissional de Educação Física responsável pela marca Aimoré Personal. Contato para assuntos de privacidade: {contact}.</p>
      <h2>2. Quais dados coletamos e por quê</h2>
      <ul>
        <li><strong>Conta do aluno:</strong> nome, e-mail e telefone (opcional), para autenticação e acesso aos conteúdos adquiridos. Base legal: execução de contrato.</li>
        <li><strong>Compras na loja:</strong> nome, e-mail, telefone e endereço de entrega, para processar e entregar o pedido. Dados de cartão são tratados exclusivamente pelo Mercado Pago. Base legal: execução de contrato e cumprimento de obrigação legal.</li>
        <li><strong>Compras de programas:</strong> recebemos da Hotmart o e-mail do comprador, o produto e o status da compra, para liberar o acesso na área do aluno. Base legal: execução de contrato.</li>
        <li><strong>Autoavaliação e evolução:</strong> idade, altura, peso, medidas corporais e, se você optar, situações de saúde. Esses são dados pessoais sensíveis. Eles são processados no seu navegador e só são gravados se você escolher salvar na sua conta. Base legal: consentimento específico, que pode ser revogado a qualquer momento.</li>
        <li><strong>Formulário de contato:</strong> nome, e-mail e mensagem, para responder ao seu contato. Base legal: consentimento.</li>
        <li><strong>Análise de uso (opcional):</strong> somente se você aceitar os cookies de análise. Nenhum dado de saúde é enviado a ferramentas de análise ou publicidade.</li>
      </ul>
      <h2>3. Coleta mínima e finalidade</h2>
      <p>Coletamos apenas o necessário para cada finalidade. Dados de saúde não são usados para publicidade, não são vendidos e não são compartilhados com terceiros para fins comerciais. Nem mesmo o administrador do site visualiza as avaliações e medidas dos alunos pelo painel.</p>
      <h2>4. Com quem compartilhamos</h2>
      <ul>
        <li>Supabase (hospedagem do banco de dados e autenticação);</li>
        <li>Mercado Pago (processamento de pagamentos da loja);</li>
        <li>Hotmart (venda e entrega dos programas digitais);</li>
        <li>Provedor de hospedagem do site;</li>
        <li>Transportadoras ou Correios, apenas com os dados necessários à entrega.</li>
      </ul>
      <p>Alguns desses fornecedores podem armazenar dados fora do Brasil, com as salvaguardas previstas na LGPD.</p>
      <h2>5. Segurança</h2>
      <p>Usamos conexão criptografada (HTTPS), senhas armazenadas de forma irreversível (hash) pelo provedor de autenticação, controle de acesso por função, regras de segurança no banco de dados que impedem um aluno de ver dados de outro e registro de eventos de segurança.</p>
      <h2>6. Por quanto tempo guardamos</h2>
      <p>Dados da conta e da evolução ficam guardados enquanto a conta existir. Dados de pedidos são mantidos pelo prazo exigido pela legislação fiscal e de defesa do consumidor. Mensagens de contato são apagadas quando deixam de ser necessárias.</p>
      <h2>7. Seus direitos</h2>
      <p>Você pode confirmar a existência de tratamento, acessar, corrigir, exportar e excluir seus dados, além de revogar consentimentos. Na área do aluno, em <Link href="/aluno/perfil" className="text-gold">Meus dados</Link>, há opções para corrigir, baixar e excluir a sua conta e os dados associados. Para outras solicitações, use o contato acima.</p>
      <h2>8. Crianças e adolescentes</h2>
      <p>Contas devem ser criadas por maiores de 18 anos. Informações sobre menores de idade, como na autoavaliação, devem ser registradas por pais ou responsáveis, no melhor interesse da criança ou do adolescente.</p>
      <h2>9. Alterações</h2>
      <p>Esta política pode ser atualizada. A data da última versão aparece no topo da página.</p>
    </LegalPage>
  );
}
