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

## Como funcionam as inscrições
1. O responsável preenche `inscricao.html` → a ficha vai para o Firebase.
2. Com o painel aberto, ela entra em **Inscrições** como **Nova**, com contador vermelho no menu.
3. **Revisar** → confere os dados, escolhe categoria e **mês em que começa a pagar** → **Aprovar**.
   Os meses anteriores ficam como "não se aplica" e não contam como inadimplência.
