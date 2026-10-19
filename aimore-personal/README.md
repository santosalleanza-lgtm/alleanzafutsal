# Aimoré Personal: site oficial

Plataforma da marca **Aimoré Personal** (@aimorepersonal). Reúne programas digitais vendidos pela Hotmart, uma loja de produtos personalizados, autoavaliação física educativa, gerador de sugestões de treino, conteúdos de treinamento e alimentação, área do aluno e painel administrativo.

> O site funciona desde o primeiro deploy, **sem nenhuma credencial**, usando o conteúdo inicial do repositório. Login, painel, pagamentos e liberação de programas ficam ativos conforme cada integração é configurada (veja "O que depende de credenciais").

---

## 1. Arquitetura

| Camada | Escolha | Por quê |
|---|---|---|
| Framework | **Next.js 15 (App Router) + React 19 + TypeScript** | Páginas estáticas rápidas com revalidação (ISR), rotas de API e Server Actions no mesmo projeto |
| Estilo | **Tailwind CSS 3** | Identidade visual com tokens (preto, grafite, branco, verde-limão) |
| Banco e login | **Supabase** (PostgreSQL + Auth + Storage) | Autenticação segura (senhas com hash), regras de acesso por linha (RLS), armazenamento das imagens |
| Pagamento da loja | **Mercado Pago Checkout Pro** | Página de pagamento hospedada (Pix, cartão, boleto); dados de cartão não passam pelo site |
| Programas digitais | **Hotmart** | Botão leva ao checkout oficial; webhook libera o acesso na área do aluno |
| Validação | **Zod** | Todo dado recebido é validado no servidor |
| Testes | **Vitest** + teste de RLS em PostgreSQL | Regras de negócio e regras de acesso testadas |
| Hospedagem sugerida | **Vercel** (ou Netlify) | Suporte nativo a Next.js, HTTPS e domínio próprio |

Fluxos principais:

```
Visitante ─► Página do programa ─► Checkout Hotmart ─► webhook /api/webhooks/hotmart ─► program_access
                                                                                          │
Aluno (login com o mesmo e-mail) ─► /aluno/programas ◄── my_programs() ◄──────────────────┘

Carrinho ─► /api/checkout (reprecifica no servidor, cria pedido) ─► Mercado Pago ─► webhook ─► pedido "pago"
```

Princípios de segurança e privacidade:

- **RLS em todas as tabelas.** O aluno só lê e grava os próprios dados; nem o administrador vê avaliações e medidas dos alunos pelo painel.
- **Preço nunca vem do navegador.** O checkout recalcula tudo com o catálogo do servidor.
- **Pagamento nunca é simulado.** Pedido só vira "pago" após consulta à API do Mercado Pago, com assinatura do webhook validada.
- **Chaves secretas só no servidor** (`SUPABASE_SERVICE_ROLE_KEY`, `MERCADOPAGO_ACCESS_TOKEN`, `HOTMART_HOTTOK`).
- Autoavaliação roda no navegador; só é gravada se o aluno escolher salvar (consentimento explícito para dados de saúde).
- Exportação e exclusão de dados pelo próprio aluno (LGPD), registro de eventos de segurança, limite de tentativas em login e formulários, cabeçalhos de segurança.

## 2. Estrutura de pastas

```
aimore-personal/
├── public/img/produtos/         Ilustrações iniciais dos produtos (substitua por fotos reais pelo painel)
├── src/
│   ├── app/
│   │   ├── page.tsx             Página inicial
│   │   ├── sobre/ contato/ comece/
│   │   ├── loja/ [slug]/        Catálogo e página de produto
│   │   ├── carrinho/ checkout/ pedido/[token]/
│   │   ├── programas/ [slug]/   Vitrine Hotmart
│   │   ├── avaliacao/           Minha Avaliação Física (5 etapas)
│   │   ├── gerador-de-treino/
│   │   ├── treinos/ [slug]/     Central de treinamento por perfil (A a G)
│   │   ├── alimentacao/ [slug]/ Educação alimentar
│   │   ├── aluno/               Login, cadastro, recuperação e (painel)/ área privada
│   │   ├── admin/               Painel administrativo
│   │   ├── auth/                Server Actions de login e callback de e-mail
│   │   ├── api/                 checkout, cupom, contato, conta, webhooks
│   │   ├── privacidade/ termos/ cookies/
│   │   └── sitemap.ts robots.ts opengraph-image.tsx
│   ├── components/              Componentes reutilizáveis (UI, cards, formulários, gráfico)
│   ├── config/site.ts           Menu e dados confirmados do profissional
│   ├── data/                    Conteúdo inicial: produtos, programas, treinos, artigos, exercícios
│   ├── lib/                     Regras de negócio, integrações e acesso a dados
│   └── middleware.ts            Proteção das rotas /aluno e /admin
├── supabase/
│   ├── migrations/0001_schema.sql   Tabelas, RLS, funções, bucket de imagens
│   └── tests/                       Teste das regras de acesso
├── scripts/test-db.sh
├── tests/                       Testes unitários (Vitest)
└── .env.example
```

## 3. Instalação e execução local

Requisitos: Node.js 20 ou superior.

```bash
cd aimore-personal
npm install
cp .env.example .env.local   # preencha o que já tiver; tudo é opcional para começar
npm run dev                  # http://localhost:3000
```

Comandos:

| Comando | O que faz |
|---|---|
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` e `npm start` | Build e servidor de produção |
| `npm test` | Testes unitários (IMC, recomendações, gerador, carrinho, cupons, webhooks) |
| `npm run lint` e `npm run typecheck` | Qualidade e tipos |
| `./scripts/test-db.sh` | Testa a migração e as regras RLS num PostgreSQL local |

## 4. O que depende de credenciais

| Recurso | Sem credencial | Com credencial |
|---|---|---|
| Páginas públicas, loja, programas, treinos, alimentação, autoavaliação e gerador | Funcionam com o conteúdo inicial | Conteúdo passa a vir do painel |
| Login, área do aluno, salvar avaliação | Mostra aviso de configuração | **Supabase** |
| Painel administrativo | Mostra aviso de configuração | **Supabase** + usuário promovido a admin |
| Pagamento da loja | Pedido enviado pelo WhatsApp, sem cobrança | **Supabase + Mercado Pago** |
| Liberação automática de programas | Liberação manual pelo painel | **Hotmart** (webhook) |
| Formulário de contato | Direciona ao WhatsApp | **Supabase** (service role) |
| Análise de uso | Desligada | ID do Google Analytics (carrega só após aceite) |

## 5. Colocar em produção

### 5.1 Supabase (banco e login)

1. Crie um projeto em <https://supabase.com> (região São Paulo).
2. Em **SQL Editor**, cole e execute `supabase/migrations/0001_schema.sql`.
3. Em **Authentication > Providers > Email**, mantenha **Confirm email** ativado. Isso é obrigatório: a liberação dos programas é feita pelo e-mail da compra.
4. Em **Authentication > URL Configuration**, defina *Site URL* como o seu domínio e adicione `https://SEU-DOMINIO/auth/callback` em *Redirect URLs*.
5. (Recomendado) Em **Authentication > SMTP**, configure um provedor de e-mail próprio para os e-mails de confirmação e recuperação.
6. Copie `Project URL`, `anon key` e `service_role key` (Project Settings > API) para as variáveis de ambiente.
7. Crie sua conta pelo site (`/aluno/cadastro`), confirme o e-mail e promova-a a administrador no SQL Editor:

   ```sql
   update public.profiles set role = 'admin'
   where id = (select id from auth.users where email = 'SEU-EMAIL');
   ```

8. Entre em `/admin` e clique em **Importar conteúdo inicial** para copiar produtos, programas e artigos para o banco. A partir daí, tudo é editado pelo painel.

### 5.2 Hospedagem e domínio (Vercel)

1. Em <https://vercel.com>, importe o repositório e defina **Root Directory** como `aimore-personal`.
2. Cadastre as variáveis do `.env.example` em *Settings > Environment Variables* e faça o deploy.
3. Em *Settings > Domains*, adicione o domínio (ex.: `aimorepersonal.com.br`). No registro do domínio (Registro.br ou outro), crie os registros DNS indicados pela Vercel (normalmente `A 76.76.21.21` para o domínio raiz e `CNAME cname.vercel-dns.com` para `www`). O HTTPS é emitido automaticamente.
4. Atualize `NEXT_PUBLIC_SITE_URL` com o domínio final e faça um novo deploy.

Netlify também funciona (plugin oficial de Next.js); nesse caso use o mesmo diretório base e as mesmas variáveis.

### 5.3 Mercado Pago (loja)

1. Crie uma aplicação em <https://www.mercadopago.com.br/developers> (produto: Checkout Pro).
2. Teste primeiro com as **credenciais de teste** e usuários de teste; depois troque para as **credenciais de produção** em `MERCADOPAGO_ACCESS_TOKEN`.
3. Em **Webhooks**, cadastre `https://SEU-DOMINIO/api/webhooks/mercadopago` com o evento **Pagamentos** e copie a assinatura secreta para `MERCADOPAGO_WEBHOOK_SECRET`.
4. Defina a política de frete (`STORE_SHIPPING_MODE`). Para cálculo automático por CEP, será preciso contratar um serviço de frete (Melhor Envio, Correios com contrato etc.): essa integração ainda não está implementada.

### 5.4 Hotmart (programas)

1. Publique o produto na Hotmart e copie o **link de checkout** e o **ID do produto**.
2. No painel do site (`/admin/programas`), edite o programa: cole o link, o ID, o link do conteúdo (opcional) e mude a situação para **Disponível**.
3. Na Hotmart, em **Ferramentas > Webhook**, crie um webhook na versão 2.0 para `https://SEU-DOMINIO/api/webhooks/hotmart`, com os eventos de compra aprovada, completa, cancelada, reembolsada, chargeback e protesto. Copie o **hottok** para `HOTMART_HOTTOK`.
4. Faça uma compra de teste (a Hotmart permite reenviar eventos de teste) e confira em `/admin/alunos` se o acesso apareceu.

O aluno vê o programa em `/aluno/programas` ao entrar com **o mesmo e-mail usado na compra**. Para compras com outro e-mail, libere manualmente em `/admin/alunos`.

## 6. Lista de tarefas para produção

- [ ] Enviar a **logo oficial** (arquivo em `public/img/` + `NEXT_PUBLIC_LOGO_URL`).
- [ ] Enviar **foto profissional** e revisar biografia, formação e experiência em `/admin/configuracoes`. Hoje constam só as informações já confirmadas: graduação em Educação Física, três pós-graduações (Treinamento Desportivo, Fisiologia do Exercício, Musculação e Condicionamento Físico) e registro profissional 041955. Acrescente a 4ª pós-graduação quando confirmada.
- [ ] Fotografar os produtos e substituir as ilustrações; informar tecido, composição e **guia de tamanhos** com medidas reais.
- [ ] Confirmar tamanhos, cores e estampas disponíveis de cada produto.
- [ ] Criar projeto Supabase, executar a migração, configurar URLs e SMTP, promover o admin e importar o conteúdo inicial.
- [ ] Publicar na Vercel com as variáveis de ambiente e conectar o domínio.
- [ ] Configurar Mercado Pago (teste → produção) e o webhook; fazer uma compra real de baixo valor e conferir o pedido no painel.
- [ ] Publicar o Método TAF 8 Semanas na Hotmart, cadastrar link e ID e configurar o webhook.
- [ ] Definir a política de frete e prazo de produção.
- [ ] Revisar os textos de privacidade, termos e cookies com profissional da área jurídica e informar um e-mail de contato.
- [ ] (Opcional) Configurar Google Analytics e cadastrar Facebook, TikTok e YouTube no painel (só aparecem no site quando preenchidos).

## 7. Conteúdo e responsabilidade

- Nenhum depoimento, número de alunos, resultado ou certificação foi inventado. Campos sem informação confirmada ficam ocultos.
- Nenhum programa aparece como disponível: o Método TAF está "Em breve" e os demais "Em desenvolvimento" até receberem link da Hotmart.
- Programas para públicos clínicos (pós-bariátrica, medicamentos para controle de peso) exibem aviso de liberação profissional e não são apresentados como tratamento.
- A autoavaliação não aplica faixas adultas de IMC a menores de 20 anos, não estima percentual de gordura e não define metas de peso.
- O gerador não prescreve cargas máximas, bloqueia a sugestão automática para pós-operatório, condição clínica e gestação, e oferece só atividades lúdicas para crianças.
