# Simulados HCPA 2026: versão isca com liberação por e-mail

Os simulados 1 a 3 ficam abertos. Os outros 23 ficam bloqueados: o aluno pede a liberação num
formulário, você recebe o pedido por e-mail, gera um código em `/admin.html` e envia ao aluno.

As questões bloqueadas ficam em `netlify/functions/lib/bloqueados.mjs`, cifradas com AES-256-GCM.
Sem a `DADOS_CHAVE` (que só existe no Netlify), o repositório público não expõe o gabarito.

## Publicar no Netlify (uma vez)

1. **Add new site → Import from Git →** `santosalleanza-lgtm/alleanzafutsal`.
2. **Base directory:** `simulados` · **Publish directory:** `simulados` · Build command: vazio.
3. **Site configuration → Environment variables:** crie `DADOS_CHAVE`, `CODIGO_SEGREDO` e `ADMIN_SENHA`.
4. **Forms → Enable form detection** e faça um novo deploy.
5. **Forms → Form notifications → Add notification → Email notification**, formulário `liberacao`,
   com o seu e-mail.

## Rotina de liberação

1. Chega o e-mail "New form submission" com nome, e-mail e WhatsApp do aluno, e em geral
   também uma mensagem no seu WhatsApp (5551991925356) avisando da compra.
2. Abra `https://<seu-site>.netlify.app/admin.html`, cole o e-mail, digite a `ADMIN_SENHA` e gere o código.
3. Toque em **Enviar por e-mail** ou **Enviar por WhatsApp**: a mensagem já sai pronta.

O código vale só para aquele e-mail e não expira.

## Trocar as questões

Com o HTML completo fora do repositório:

    DADOS_CHAVE=... node scripts/cifrar-simulados.mjs caminho/completo.html 3

O último argumento é quantos simulados ficam grátis. Se mudar esse número, os simulados abertos
também precisam ser atualizados no `<script id="data">` do `index.html`.
