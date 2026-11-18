# Painel de Gestão — Alleanza Escola de Futsal

Site só de administração (separado do site institucional).

| Arquivo | Para quê |
|---|---|
| `index.html` | Painel (login → gestão) |
| `inscricao.html` | Ficha que os pais preenchem (link enviado pelo WhatsApp) |
| `firestore.rules` | Regras de segurança do banco (colar no Firebase) |
| `logo.jpg`, `manifest.webmanifest`, `netlify.toml` | Ícone, "instalar no celular" e configurações do Netlify |

## 1. Firebase (uma vez só) — console.firebase.google.com → projeto alleanza-c6a68
1. **Authentication → Sign-in method**: ative **E-mail/senha** e desative **Anônimo**.
2. **Authentication → Users → Adicionar usuário**: crie o login do administrador.
3. Abra `firestore.rules`, troque `SEU-EMAIL-ADMIN@exemplo.com` pelo e-mail do passo 2
   e cole tudo em **Firestore Database → Regras → Publicar**.

## 2. Netlify
Em app.netlify.com → **Add new site → Deploy manually**, arraste o arquivo `gestao-alleanza.zip`
(ele já vem sem o `firestore.rules`, que não deve ficar público). Para atualizar depois: **Deploys → arraste de novo**.

- Painel: `https://SEU-SITE.netlify.app/`
- Link para os pais: `https://SEU-SITE.netlify.app/inscricao.html`
  (aparece pronto, com botão de WhatsApp, no menu **Inscrições**)

> **Atualizou o painel?** Sempre que o `firestore.rules` mudar, cole a versão nova em
> **Firestore Database → Regras → Publicar** (com o seu e-mail de admin). A versão atual aceita os
> campos da inscrição *"inscrever e pagar"* e da *reserva de uniforme*; sem republicar, a ficha nova é recusada.

## Como funcionam as inscrições
1. O responsável preenche `inscricao.html` → a ficha vai para o Firebase.
2. Com o painel aberto, ela entra em **Inscrições** como **Nova**, com contador vermelho no menu.
3. **Revisar** → confere os dados, escolhe categoria e **mês em que começa a pagar** → **Aprovar**.
   Os meses anteriores ficam como "não se aplica" e não contam como inadimplência.

## Inscrição: pagamento e reserva de uniforme
- O responsável só consegue enviar a ficha marcando **"Quero inscrever e pagar a inscrição"**.
  O formulário **não mostra valor**: a Alleanza informa o valor atual pelo WhatsApp. A chave Pix
  aparece para facilitar (constante `PIX_CHAVE` no `inscricao.html`).
- Marcando **"Quero reservar o uniforme"**, ele escolhe camisa e calção. A reserva chega em
  **Pedidos** como pedido a pagar, com a observação "Reserva feita na ficha de inscrição".
- Ao concluir, aparece a mensagem de inscrição concluída e, em 10 segundos, a página abre o site do
  clube (`SITE_CLUBE`, hoje https://alleanzafutsalpro2.netlify.app/). Tocar em "Inscrever outro
  filho(a)" ou no WhatsApp cancela o redirecionamento.

## Vestiário
Menu **Vestiário**: estoque de uniformes por **tipo e tamanho** (camiseta de jogo, treino, manga curta,
goleiro, calção, meias, agasalho...) e de **materiais esportivos** (bolas, coletes, cones...).
- **Entrada / saída** registra o movimento por tamanho (não deixa sair mais do que existe).
- **Avisar quando ficar abaixo de** marca o item em vermelho quando o estoque baixar.
- **Copiar inventário** gera um resumo pronto para colar no WhatsApp.
- Tudo fica no mesmo banco do painel e aparece no **Histórico** (área "Vestiário").
