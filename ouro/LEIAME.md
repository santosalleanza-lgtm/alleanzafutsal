# Ouro Concursos: catálogo + simulados HCPA

Um só site para a marca:

| Endereço | O que é |
|---|---|
| `/` | Catálogo: chamada para o simulado grátis, 8 materiais por cargo (sem promoção), "Quem faz o material" |
| `/simulados/` | Página de escolha: HCPA, Higienização e Vigia, com quantos são grátis e o progresso salvo no aparelho |
| `/simulados/hcpa/` | Simulados HCPA: 1 a 3 grátis; 4 a 26 liberados por código para quem comprou a apostila |
| `/simulados/higienizacao/`, `/simulados/vigia/` | Simulados GHC: 1 grátis; 2 liberados por código (`/api/liberar-ghc`) |
| `/simulados/admin.html` | Sua página para gerar o código de liberação de um aluno |
| `/api/liberar`, `/api/codigo` | Funções do Netlify que conferem o código e entregam os simulados bloqueados |

As questões dos simulados 4 a 26 ficam em `netlify/functions/lib/bloqueados.mjs`, **cifradas** (AES-256-GCM).
Sem a `DADOS_CHAVE`, que fica só nas variáveis do Netlify, o repositório público não expõe o gabarito.

## Publicar no Netlify (conta nova)
1. **Add new site → Import from Git →** `santosalleanza-lgtm/alleanzafutsal`, branch `claude/happy-carson-1ixafs`.
2. **Base directory:** `ouro` · Publish directory: `ouro` · Build command: vazio.
   (Deploy manual arrastando a pasta **não** publica as funções: use o GitHub ou `./scripts/deploy-ouro.sh`.)
3. **Site configuration → Environment variables:** `DADOS_CHAVE`, `CODIGO_SEGREDO` e `ADMIN_SENHA`.
   A `DADOS_CHAVE` tem de ser **a mesma** usada para cifrar `bloqueados.mjs`.
4. **Deploys → Trigger deploy** (as funções só leem as variáveis num deploy novo).
5. Nome sugerido: **ouroconcursos** → https://ouroconcursos.netlify.app

Pelo terminal, com as 4 variáveis no ambiente: `./scripts/deploy-ouro.sh ouroconcursos`.

## Rotina de liberação
1. O aluno toca num simulado bloqueado e chama você no WhatsApp (51 99192-5356).
2. Confira a compra na Hotmart.
3. Abra `/simulados/admin.html`, cole o e-mail do aluno, digite a `ADMIN_SENHA` e gere o código.
4. Toque em **Enviar por WhatsApp** ou **Enviar por e-mail**: a mensagem já sai pronta com o link.

O código vale só para aquele e-mail e não expira.

## Perdeu a DADOS_CHAVE? Cifre de novo
Com o HTML completo dos simulados (o arquivo original, com os 26) fora do repositório:

    DADOS_CHAVE=$(openssl rand -hex 32) node scripts/cifrar-simulados.mjs caminho/completo.html 3

Guarde a chave gerada, coloque-a no Netlify, faça commit do novo `bloqueados.mjs` e um deploy.
Os códigos já enviados continuam valendo se o `CODIGO_SEGREDO` for o mesmo.

## Tela de resultado
Depois de entregar um simulado, a chamada da apostila cita a matéria que mais pesou:
eliminado por uma básica (HCPA: menos de 2 acertos) → "Você foi eliminado em <matéria>";
abaixo da meta → "Seu ponto fraco: <matéria> (acertos/total)"; aprovado → "Você passaria" (HCPA) ou "Meta atingida" (GHC).
