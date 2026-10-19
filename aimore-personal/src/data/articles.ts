import type { Article } from "@/lib/types";

export const nutritionCategories = [
  { slug: "rotina-ativa", label: "Alimentação para uma rotina ativa" },
  { slug: "hidratacao", label: "Hidratação" },
  { slug: "organizacao", label: "Organização das refeições" },
  { slug: "pre-pos-treino", label: "Antes e depois do exercício" },
  { slug: "familias", label: "Hábitos alimentares para famílias" },
  { slug: "esporte", label: "Nutrição e prática esportiva" },
  { slug: "pos-bariatrica", label: "Cuidados após cirurgia bariátrica" },
  { slug: "tratamento-medicamentoso", label: "Cuidados em tratamento medicamentoso para controle de peso" },
];

const a = (x: Omit<Article, "id" | "section" | "published">): Article => ({
  ...x,
  id: `seed-${x.slug}`,
  section: "alimentacao",
  published: true,
});

export const seedArticles: Article[] = [
  a({
    slug: "prato-de-quem-treina",
    title: "O prato de quem treina: uma base simples",
    category: "rotina-ativa",
    kind: "artigo",
    excerpt: "Uma forma prática de montar refeições equilibradas sem contar calorias.",
    body: `Para a maioria das pessoas ativas, uma boa refeição tem uma lógica simples: uma fonte de proteína, uma fonte de carboidrato, vegetais e uma pequena porção de gordura boa.

- Proteína: ovos, frango, peixe, carne, feijão, lentilha, grão-de-bico ou laticínios.
- Carboidrato: arroz, batata, aipim, massa, pão, frutas ou aveia.
- Vegetais: quanto mais variedade de cores, melhor.
- Gorduras: azeite, castanhas, abacate, em pequenas quantidades.

Essa é uma referência educativa geral. Quantidades e ajustes para objetivos específicos dependem de avaliação com nutricionista.`,
  }),
  a({
    slug: "hidratacao-no-dia-a-dia",
    title: "Hidratação no dia a dia e no treino",
    category: "hidratacao",
    kind: "artigo",
    excerpt: "Como criar o hábito de beber água e perceber sinais de desidratação.",
    body: `A necessidade de água varia com o clima, o tamanho do corpo e a intensidade da atividade. Mais útil do que perseguir um número fixo é criar o hábito de beber água ao longo do dia.

- Deixe uma garrafa à vista e reabasteça sempre.
- Beba água antes, durante (em treinos longos ou no calor) e depois do exercício.
- Urina muito escura e sede intensa são sinais de que é preciso beber mais.

Pessoas com doenças renais, cardíacas ou em pós-operatório devem seguir as orientações específicas da equipe de saúde.`,
  }),
  a({
    slug: "organizar-refeicoes-semana",
    title: "Organizar as refeições da semana em 30 minutos",
    category: "organizacao",
    kind: "material",
    excerpt: "Um roteiro para planejar compras e deixar comida pronta para os dias corridos.",
    body: `Planejamento evita a decisão de última hora, que costuma ser a menos saudável.

- Escolha um dia para listar as refeições principais da semana.
- Faça a lista de compras a partir desse plano.
- Cozinhe em maior quantidade proteínas e carboidratos que conservam bem.
- Deixe vegetais lavados e cortados para facilitar o preparo.
- Tenha opções de lanche simples à mão: frutas, iogurte, ovos cozidos.`,
  }),
  a({
    slug: "comer-antes-e-depois-do-treino",
    title: "O que comer antes e depois do treino",
    category: "pre-pos-treino",
    kind: "artigo",
    excerpt: "Exemplos gerais de lanches para ter energia e se recuperar.",
    body: `Antes do treino, a ideia é ter energia sem desconforto. Refeições maiores pedem um intervalo maior; lanches leves podem ser feitos mais perto do treino.

- Antes: banana com aveia, pão com ovo, iogurte com fruta.
- Depois: uma refeição completa ou um lanche com proteína e carboidrato, como sanduíche de frango, iogurte com granola ou arroz, feijão e carne.

Esses são exemplos educativos. Atletas e pessoas com condições de saúde se beneficiam de orientação nutricional individual.`,
  }),
  a({
    slug: "lanche-pos-escola",
    title: "Lanches para crianças que praticam esporte",
    category: "familias",
    kind: "receita",
    excerpt: "Ideias práticas para o lanche antes e depois da escolinha.",
    body: `Crianças ativas precisam de energia e variedade, sem restrições.

- Fruta picada com aveia e iogurte.
- Pão integral com queijo e tomate.
- Bolo caseiro simples com frutas.
- Água sempre na mochila.

Evite transformar comida em prêmio ou castigo e não use o esporte como justificativa para dietas. Em caso de dúvidas sobre crescimento ou alimentação, procure o pediatra ou um nutricionista.`,
  }),
  a({
    slug: "nutricao-e-esporte",
    title: "Nutrição e prática esportiva: o básico que funciona",
    category: "esporte",
    kind: "artigo",
    excerpt: "Regularidade nas refeições, hidratação e descanso antes de qualquer suplemento.",
    body: `Antes de pensar em suplementos, garanta o básico: refeições regulares, proteína distribuída ao longo do dia, carboidratos suficientes para treinar e hidratação.

Suplementação deve ser avaliada individualmente por nutricionista ou médico, considerando objetivo, exames e rotina de treino.`,
  }),
  a({
    slug: "alimentacao-pos-bariatrica",
    title: "Alimentação após a cirurgia bariátrica: por que o acompanhamento é indispensável",
    category: "pos-bariatrica",
    kind: "artigo",
    excerpt: "As fases da dieta após a cirurgia são definidas pela equipe, e não por conteúdos gerais.",
    body: `Depois da cirurgia bariátrica, a alimentação passa por fases definidas pela equipe de saúde, com consistências, volumes e suplementos específicos.

Este site não oferece plano alimentar para pessoas operadas. O papel do conteúdo aqui é reforçar a importância de seguir o nutricionista e a equipe médica e de levar a eles suas dúvidas, inclusive sobre como alimentar-se nos dias de exercício.`,
  }),
  a({
    slug: "alimentacao-em-tratamento-medicamentoso",
    title: "Alimentação durante o tratamento com medicamentos para controle de peso",
    category: "tratamento-medicamentoso",
    kind: "artigo",
    excerpt: "Mudanças no apetite pedem acompanhamento de nutricionista e da equipe médica.",
    body: `Alguns medicamentos para controle de peso reduzem o apetite e podem causar sintomas gastrointestinais. Isso torna ainda mais importante garantir qualidade nas refeições e hidratação.

Cada caso é diferente. Orientações sobre quantidades, proteína e suplementação devem vir do nutricionista e do médico que acompanham o tratamento. Este conteúdo não substitui essa orientação.`,
  }),
];
