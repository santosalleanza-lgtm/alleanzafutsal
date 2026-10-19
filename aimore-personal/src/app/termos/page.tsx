import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = { title: "Termos de uso", alternates: { canonical: "/termos" } };

export default function TermsPage() {
  return (
    <LegalPage title="Termos de uso" updated="19/10/2026">
      <p>Ao usar o site Aimoré Personal, você concorda com estes termos.</p>
      <h2>1. Natureza do conteúdo</h2>
      <p>Os conteúdos, a autoavaliação física e o gerador de sugestões de treino têm caráter educativo. Eles não constituem diagnóstico, prescrição médica, plano alimentar individual nem substituem avaliação física presencial, consulta médica ou acompanhamento nutricional.</p>
      <h2>2. Responsabilidade na prática de exercícios</h2>
      <p>Antes de iniciar ou modificar uma rotina de exercícios, especialmente em caso de doenças, cirurgias, gestação, uso de medicamentos ou sintomas como dor no peito, tontura e falta de ar, procure avaliação de profissional de saúde. Interrompa qualquer exercício diante de sintomas incomuns.</p>
      <h2>3. Resultados</h2>
      <p>Não há promessa ou garantia de resultados. A evolução depende de fatores individuais, como regularidade, sono, alimentação, histórico e condições de saúde.</p>
      <h2>4. Conta do aluno</h2>
      <p>Você é responsável por manter sua senha em sigilo e pelas informações cadastradas. A conta é pessoal e intransferível.</p>
      <h2>5. Programas digitais</h2>
      <p>Os programas são vendidos e entregues pela Hotmart, conforme os termos da plataforma, incluindo as regras de garantia e reembolso exibidas no checkout. O acesso na área do aluno é liberado para o e-mail usado na compra.</p>
      <h2>6. Loja</h2>
      <p>Os preços estão em reais. O pagamento é processado pelo Mercado Pago. Frete e prazo de produção são informados conforme o endereço e a personalização. Produtos personalizados são produzidos sob demanda; seus direitos de consumidor são garantidos pelo Código de Defesa do Consumidor.</p>
      <h2>7. Propriedade intelectual</h2>
      <p>Textos, marcas, imagens e materiais deste site e dos programas pertencem a Aimoré Personal e não podem ser reproduzidos ou distribuídos sem autorização.</p>
      <h2>8. Contato</h2>
      <p>Dúvidas sobre estes termos podem ser enviadas pela página de contato.</p>
    </LegalPage>
  );
}
