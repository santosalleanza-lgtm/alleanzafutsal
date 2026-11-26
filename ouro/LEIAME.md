# Ouro Concursos: catálogo + simulados grátis

> **Nov/2026:** a criptografia e a liberação por código foram removidas. Todos os simulados do site são
> abertos e grátis, e o site não usa funções nem variáveis de ambiente. Os simulados que estavam
> bloqueados (23 do HCPA, 2 de Higienização e 2 de Vigia) só existiam criptografados e saíram do site;
> continuam no histórico do Git (commit anterior a esta mudança) e podem voltar com as chaves
> DADOS_CHAVE/GHC_CHAVE ou com os arquivos originais das questões.


Um só site para a marca:

| Endereço | O que é |
|---|---|
| `/` | Catálogo: chamada para o simulado grátis, 8 materiais por cargo (sem promoção), "Quem faz o material" |
| `/simulados/` | Página de escolha: HCPA, Higienização e Vigia, com quantos são grátis e o progresso salvo no aparelho |
| `/simulados/hcpa/` | Simulados HCPA: 1 a 3 grátis; 4 a 26 liberados por código para quem comprou a apostila |
| `/simulados/tecnico-enfermagem/` | Técnico de Enfermagem (CC, SR e/ou CME) · GHC 2026: Simulado 1 grátis, 50 questões no formato do edital FUNDATEC 03/2026 (fonte das questões: `scripts/conteudo/tecnico-enfermagem-simulado1.py`) |
| `/simulados/higienizacao/`, `/simulados/vigia/` | Simulados GHC: 1 grátis; 2 liberados por código (`/api/liberar-ghc`) |

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

## Técnico de Enfermagem (GHC 2026)
Regras do edital (Anexo II, nível técnico): 50 questões de 4 alternativas, 2 pontos cada; mínimo de 1 acerto em
Português, Políticas Públicas de Saúde e Informática, 13 nos Específicos e 50 pontos no total; 3h30 de prova.
Conteúdo segue o Anexo V (prova base) e o Anexo VI, Cargo 3 (Parte 1 e Parte 2).
Para gerar de novo os dados do Simulado 1: `python3 scripts/conteudo/tecnico-enfermagem-simulado1.py saida.json`
e substituir o `<script id="data">` do app. Ainda não há apostila à venda: o card do app leva à lista de espera no WhatsApp.
