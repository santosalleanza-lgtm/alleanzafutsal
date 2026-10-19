-- Blog do Aimoré: artigos e perguntas respondidas na tabela articles.
alter table public.articles drop constraint if exists articles_section_check;
alter table public.articles add constraint articles_section_check check (section in ('alimentacao', 'treinamento', 'blog'));
alter table public.articles drop constraint if exists articles_kind_check;
alter table public.articles add constraint articles_kind_check check (kind in ('artigo', 'receita', 'material', 'pergunta'));
