-- Aimoré Personal — esquema inicial
-- Execute no SQL Editor do Supabase (ou com `supabase db push`).
-- Princípios: RLS em todas as tabelas, coleta mínima, dados de saúde visíveis só para o próprio aluno.

create extension if not exists pgcrypto;

-- ---------------------------------------------------------------------------
-- Perfis e papéis
-- ---------------------------------------------------------------------------
create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text check (char_length(full_name) <= 120),
  phone text check (char_length(phone) <= 30),
  role text not null default 'student' check (role in ('admin', 'student')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.is_admin()
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.profiles where id = auth.uid() and role = 'admin');
$$;

-- Cria o perfil automaticamente no cadastro.
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, left(coalesce(new.raw_user_meta_data ->> 'full_name', ''), 120));
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Impede que um aluno altere o próprio papel. Roda com os privilégios de quem chama
-- (security invoker): pelo site o papel é anon/authenticated; no SQL Editor do
-- Supabase (postgres) a troca é permitida, o que viabiliza promover o primeiro admin.
create or replace function public.protect_role()
returns trigger language plpgsql set search_path = public as $$
begin
  if new.role is distinct from old.role and current_user in ('anon', 'authenticated') and not public.is_admin() then
    raise exception 'Somente administradores podem alterar papéis';
  end if;
  new.updated_at := now();
  return new;
end;
$$;

create trigger profiles_protect_role before update on public.profiles
  for each row execute function public.protect_role();

alter table public.profiles enable row level security;
create policy "perfil: dono lê" on public.profiles for select using (id = auth.uid() or public.is_admin());
create policy "perfil: dono atualiza" on public.profiles for update using (id = auth.uid() or public.is_admin());

-- ---------------------------------------------------------------------------
-- Conteúdo público editável pelo painel
-- ---------------------------------------------------------------------------
create table public.site_settings (
  id int primary key default 1 check (id = 1),
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);
alter table public.site_settings enable row level security;
create policy "config: leitura pública" on public.site_settings for select using (true);
create policy "config: admin escreve" on public.site_settings for all using (public.is_admin()) with check (public.is_admin());

create table public.products (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique check (slug ~ '^[a-z0-9-]+$'),
  name text not null,
  category text not null,
  price int not null check (price >= 0),
  short_description text not null default '',
  description text not null default '',
  details text[] not null default '{}',
  images text[] not null default '{}',
  options jsonb not null default '{}'::jsonb,
  size_guide jsonb,
  active boolean not null default true,
  featured boolean not null default false,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.products enable row level security;
create policy "produtos: ativos públicos" on public.products for select using (active or public.is_admin());
create policy "produtos: admin escreve" on public.products for all using (public.is_admin()) with check (public.is_admin());

create table public.programs (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique check (slug ~ '^[a-z0-9-]+$'),
  name text not null,
  status text not null default 'em-desenvolvimento' check (status in ('disponivel', 'em-breve', 'em-desenvolvimento')),
  tagline text not null default '',
  description text not null default '',
  audience text not null default '',
  goals text[] not null default '{}',
  includes text[] not null default '{}',
  duration text,
  safety text not null default '',
  price int check (price >= 0),
  hotmart_url text check (hotmart_url is null or hotmart_url ~ '^https://'),
  hotmart_product_id text,
  cover text,
  clinical boolean not null default false,
  featured boolean not null default false,
  active boolean not null default true,
  category_slug text,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.programs enable row level security;
create policy "programas: públicos" on public.programs for select using (active or public.is_admin());
create policy "programas: admin escreve" on public.programs for all using (public.is_admin()) with check (public.is_admin());

-- Link do conteúdo entregue após a compra (ex.: área de membros da Hotmart).
-- Fica em tabela separada, sem leitura pública: só chega ao aluno via my_programs().
create table public.program_content (
  program_id uuid primary key references public.programs (id) on delete cascade,
  content_url text not null check (content_url ~ '^https://'),
  updated_at timestamptz not null default now()
);
alter table public.program_content enable row level security;
create policy "conteúdo: admin" on public.program_content for all using (public.is_admin()) with check (public.is_admin());

create table public.articles (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique check (slug ~ '^[a-z0-9-]+$'),
  title text not null,
  section text not null default 'alimentacao' check (section in ('alimentacao', 'treinamento')),
  category text not null,
  kind text not null default 'artigo' check (kind in ('artigo', 'receita', 'material')),
  excerpt text not null default '',
  body text not null default '',
  published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.articles enable row level security;
create policy "artigos: publicados" on public.articles for select using (published or public.is_admin());
create policy "artigos: admin escreve" on public.articles for all using (public.is_admin()) with check (public.is_admin());

-- ---------------------------------------------------------------------------
-- Loja
-- ---------------------------------------------------------------------------
create table public.coupons (
  code text primary key check (code = upper(code)),
  kind text not null check (kind in ('percent', 'fixed')),
  value int not null check (value > 0),
  min_subtotal int not null default 0,
  active boolean not null default true,
  expires_at timestamptz,
  created_at timestamptz not null default now()
);
alter table public.coupons enable row level security;
-- Validação de cupom acontece no servidor; o público não lista cupons.
create policy "cupons: admin" on public.coupons for all using (public.is_admin()) with check (public.is_admin());

create table public.orders (
  id uuid primary key default gen_random_uuid(),
  -- Token aleatório para a página de acompanhamento (não expõe dados pessoais).
  public_token uuid not null unique default gen_random_uuid(),
  user_id uuid references auth.users (id) on delete set null,
  email text not null,
  customer jsonb not null,
  shipping_address jsonb not null,
  subtotal int not null,
  discount int not null default 0,
  shipping int,
  total int not null,
  coupon_code text,
  status text not null default 'aguardando_pagamento'
    check (status in ('aguardando_pagamento', 'pago', 'em_producao', 'enviado', 'entregue', 'cancelado', 'reembolsado')),
  payment_provider text,
  payment_id text,
  preference_id text,
  tracking_code text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.orders enable row level security;
create policy "pedidos: dono lê" on public.orders for select using (user_id = auth.uid() or public.is_admin());
create policy "pedidos: admin atualiza" on public.orders for update using (public.is_admin());

create table public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders (id) on delete cascade,
  product_id uuid references public.products (id) on delete set null,
  name text not null,
  unit_price int not null,
  quantity int not null check (quantity between 1 and 20),
  options jsonb not null default '{}'::jsonb
);
alter table public.order_items enable row level security;
create policy "itens: dono lê" on public.order_items for select using (
  exists (select 1 from public.orders o where o.id = order_id and (o.user_id = auth.uid() or public.is_admin()))
);

-- ---------------------------------------------------------------------------
-- Acesso aos programas (Hotmart ou liberação manual)
-- ---------------------------------------------------------------------------
create table public.program_access (
  id uuid primary key default gen_random_uuid(),
  buyer_email text not null,
  program_id uuid references public.programs (id) on delete set null,
  hotmart_product_id text,
  source text not null check (source in ('hotmart', 'manual')),
  transaction text unique,
  status text not null default 'ativa' check (status in ('ativa', 'cancelada', 'reembolsada', 'chargeback')),
  note text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index on public.program_access (lower(buyer_email));
alter table public.program_access enable row level security;
-- O aluno só vê acessos do e-mail da própria conta. Mantenha "Confirm email" ativo no Supabase:
-- sem confirmação, alguém poderia se cadastrar com o e-mail de outro comprador.
create policy "acesso: dono lê" on public.program_access for select using (
  public.is_admin() or lower(buyer_email) = lower(auth.jwt() ->> 'email')
);
create policy "acesso: admin escreve" on public.program_access for all using (public.is_admin()) with check (public.is_admin());

-- Retorna os programas liberados do aluno logado, incluindo o link do conteúdo.
create or replace function public.my_programs()
returns table (id uuid, slug text, name text, content_url text, granted_at timestamptz)
language sql stable security definer set search_path = public as $$
  select p.id, p.slug, p.name, c.content_url, a.created_at
  from public.program_access a
  join public.programs p on p.id = a.program_id
     or (a.program_id is null and a.hotmart_product_id is not null and p.hotmart_product_id = a.hotmart_product_id)
  left join public.program_content c on c.program_id = p.id
  join auth.users u on u.id = auth.uid()
  where a.status = 'ativa'
    and u.email_confirmed_at is not null
    and lower(a.buyer_email) = lower(u.email);
$$;
revoke all on function public.my_programs() from public, anon;
grant execute on function public.my_programs() to authenticated;

-- ---------------------------------------------------------------------------
-- Dados do aluno (somente o próprio aluno acessa; nem o admin lê dados de saúde)
-- ---------------------------------------------------------------------------
create table public.assessments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  inputs jsonb not null,
  bmi numeric(5, 2),
  summary jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table public.measurements (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  measured_on date not null default current_date,
  weight_kg numeric(5, 2) check (weight_kg between 10 and 400),
  waist_cm numeric(5, 1) check (waist_cm between 20 and 300),
  hip_cm numeric(5, 1) check (hip_cm between 20 and 300),
  abdomen_cm numeric(5, 1) check (abdomen_cm between 20 and 300),
  created_at timestamptz not null default now()
);

create table public.activities (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  title text not null check (char_length(title) between 1 and 140),
  done boolean not null default false,
  done_at timestamptz,
  created_at timestamptz not null default now()
);

create table public.notes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  body text not null check (char_length(body) between 1 and 2000),
  created_at timestamptz not null default now()
);

do $$
declare t text;
begin
  foreach t in array array['assessments', 'measurements', 'activities', 'notes'] loop
    execute format('alter table public.%I enable row level security', t);
    execute format('create policy "%s: dono" on public.%I for all using (user_id = auth.uid()) with check (user_id = auth.uid())', t, t);
  end loop;
end $$;

-- ---------------------------------------------------------------------------
-- Contato e auditoria
-- ---------------------------------------------------------------------------
create table public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  subject text not null,
  message text not null,
  created_at timestamptz not null default now()
);
alter table public.contact_messages enable row level security;
create policy "contato: admin lê" on public.contact_messages for select using (public.is_admin());
create policy "contato: admin apaga" on public.contact_messages for delete using (public.is_admin());

create table public.security_events (
  id bigint generated always as identity primary key,
  user_id uuid,
  event text not null,
  detail jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);
alter table public.security_events enable row level security;
create policy "auditoria: admin lê" on public.security_events for select using (public.is_admin());

-- ---------------------------------------------------------------------------
-- Imagens públicas (produtos, programas, foto do profissional)
-- ---------------------------------------------------------------------------
insert into storage.buckets (id, name, public) values ('media', 'media', true) on conflict (id) do nothing;
create policy "media: leitura pública" on storage.objects for select using (bucket_id = 'media');
create policy "media: admin envia" on storage.objects for insert with check (bucket_id = 'media' and public.is_admin());
create policy "media: admin altera" on storage.objects for update using (bucket_id = 'media' and public.is_admin());
create policy "media: admin apaga" on storage.objects for delete using (bucket_id = 'media' and public.is_admin());
