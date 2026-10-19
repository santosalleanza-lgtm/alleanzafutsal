-- Testes das políticas RLS. Linhas "ERROR" marcadas como "esperado: erro" são bloqueios corretos.
\set ON_ERROR_STOP 0
-- Usuários: A e B alunos, C admin
insert into auth.users values
 ('aaaaaaaa-0000-0000-0000-000000000001','a@x.com',now(),'{"full_name":"Aluno A"}'),
 ('bbbbbbbb-0000-0000-0000-000000000002','b@x.com',now(),'{"full_name":"Aluno B"}'),
 ('cccccccc-0000-0000-0000-000000000003','admin@x.com',now(),'{}');
update public.profiles set role='admin' where id='cccccccc-0000-0000-0000-000000000003';
select 'perfis criados pelo gatilho' t, count(*) from public.profiles;

insert into public.products (slug,name,category,price,active) values ('ativo','Ativo','camisetas',8990,true),('inativo','Inativo','camisetas',100,false);
insert into public.programs (id,slug,name,status,hotmart_product_id) values ('dddddddd-0000-0000-0000-000000000004','taf','TAF','em-breve','999');
insert into public.program_content values ('dddddddd-0000-0000-0000-000000000004','https://membros.exemplo.com/taf',now());
insert into public.program_access (buyer_email,hotmart_product_id,source,transaction) values ('A@X.com','999','hotmart','T1');
insert into public.coupons (code,kind,value) values ('SEGREDO','percent',10);

-- ANON
set role anon; select set_config('request.jwt.claims','',false);
select 'anon vê produtos ativos (esperado 1)' t, count(*) from public.products;
select 'anon vê cupons (esperado 0)' t, count(*) from public.coupons;
select 'anon vê conteúdo pago (esperado 0)' t, count(*) from public.program_content;
select 'anon vê acessos (esperado 0)' t, count(*) from public.program_access;
insert into public.contact_messages (name,email,subject,message) values ('x','x@x.com','s','mensagem'); -- esperado: erro RLS
select 'anon lê config (esperado 0 linhas, sem erro)' t, count(*) from public.site_settings;
reset role;

-- ALUNO A
set role authenticated; select set_config('request.jwt.claims','{"sub":"aaaaaaaa-0000-0000-0000-000000000001","email":"a@x.com","role":"authenticated"}',false);
insert into public.assessments (inputs) values ('{"x":1}');
insert into public.measurements (weight_kg) values (80);
select 'A vê suas avaliações (esperado 1)' t, count(*) from public.assessments;
select 'A vê acesso do próprio e-mail (esperado 1)' t, count(*) from public.program_access;
select 'A my_programs com link (esperado 1)' t, count(*) from public.my_programs() where content_url is not null;
update public.profiles set role='admin' where id='aaaaaaaa-0000-0000-0000-000000000001'; -- esperado: erro
select 'A continua aluno' t, role from public.profiles where id='aaaaaaaa-0000-0000-0000-000000000001';
insert into public.products (slug,name,category,price) values ('hack','Hack','x',1); -- esperado: erro RLS
insert into public.assessments (user_id, inputs) values ('bbbbbbbb-0000-0000-0000-000000000002','{}'); -- esperado: erro RLS
select 'A vê pedidos (esperado 0)' t, count(*) from public.orders;
reset role;

-- ALUNO B
set role authenticated; select set_config('request.jwt.claims','{"sub":"bbbbbbbb-0000-0000-0000-000000000002","email":"b@x.com","role":"authenticated"}',false);
select 'B vê avaliações de A (esperado 0)' t, count(*) from public.assessments;
select 'B vê medidas de A (esperado 0)' t, count(*) from public.measurements;
select 'B vê acesso de A (esperado 0)' t, count(*) from public.program_access;
select 'B my_programs (esperado 0)' t, count(*) from public.my_programs();
select 'B vê perfis (esperado 1, o próprio)' t, count(*) from public.profiles;
delete from public.assessments; -- não deve apagar nada de A
reset role;
select 'avaliações de A intactas (esperado 1)' t, count(*) from public.assessments;

-- ADMIN
set role authenticated; select set_config('request.jwt.claims','{"sub":"cccccccc-0000-0000-0000-000000000003","email":"admin@x.com","role":"authenticated"}',false);
select 'admin vê produtos inclusive inativos (esperado 2)' t, count(*) from public.products;
select 'admin vê cupons (esperado 1)' t, count(*) from public.coupons;
select 'admin NÃO vê avaliações dos alunos (esperado 0)' t, count(*) from public.assessments;
insert into public.site_settings (id,data) values (1,'{"bio":"x"}') on conflict (id) do update set data=excluded.data;
select 'admin salvou config (esperado 1)' t, count(*) from public.site_settings;
update public.profiles set role='admin' where id='bbbbbbbb-0000-0000-0000-000000000002';
select 'admin promoveu B' t, role from public.profiles where id='bbbbbbbb-0000-0000-0000-000000000002';
reset role;

-- Exclusão de conta em cascata
delete from auth.users where id='aaaaaaaa-0000-0000-0000-000000000001';
select 'dados de A apagados em cascata (esperado 0)' t, (select count(*) from public.assessments)+(select count(*) from public.measurements)+(select count(*) from public.profiles where id='aaaaaaaa-0000-0000-0000-000000000001');
