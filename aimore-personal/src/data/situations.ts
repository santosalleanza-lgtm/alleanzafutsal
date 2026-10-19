export type Situation = {
  slug: string;
  /** Rótulo curto do menu. */
  label: string;
  kicker: string;
  title: [string, string];
  intro: string;
  /** "Você se identifica?" */
  signs: string[];
  /** Como o treino é organizado para essa situação. */
  approach: { title: string; text: string }[];
  /** Primeiros passos que a pessoa pode aplicar já. */
  firstSteps: string[];
  alert?: string;
  articles: string[];
  training?: string;
  service: string;
  cta: string;
};

export const situations: Situation[] = [
  {
    slug: "quero-emagrecer",
    label: "Quero emagrecer",
    kicker: "Emagrecimento",
    title: ["Emagrecer", "sem passar fome"],
    intro: "Emagrecer de forma sustentável é combinar treino de força, movimento no dia a dia, alimentação organizada e sono. O que funciona é o que você consegue repetir por meses, não por duas semanas.",
    signs: ["Já fez dietas que funcionaram por pouco tempo", "Começa a treinar com tudo e para na terceira semana", "Sente que falta energia para a rotina", "Não sabe se deve priorizar musculação ou aeróbico"],
    approach: [
      { title: "Força primeiro", text: "O treino de força ajuda a preservar massa muscular enquanto o peso diminui." },
      { title: "Condicionamento progressivo", text: "Aeróbico na dose certa, aumentando aos poucos, sem castigo." },
      { title: "Rotina possível", text: "Dias e horários que cabem na sua semana real." },
    ],
    firstSteps: ["Treine força 2 a 3 vezes por semana", "Some passos ao dia: caminhar também conta", "Organize as refeições da semana com antecedência", "Durma bem: o sono interfere na fome e na disposição"],
    articles: ["emagrecer-sem-passar-fome", "hidratacao-no-treino", "musculacao-series-repeticoes-descanso"],
    training: "adultos-iniciantes",
    service: "condicionamento-emagrecimento",
    cta: "Quero um plano para emagrecer",
  },
  {
    slug: "quero-ganhar-massa",
    label: "Quero ganhar força e massa",
    kicker: "Musculação",
    title: ["Força e", "hipertrofia"],
    intro: "Ganhar massa muscular depende de estímulo suficiente, progressão de carga, recuperação e alimentação adequada. Treinar mais nem sempre é treinar melhor.",
    signs: ["Treina há meses e os números não sobem", "Não sabe quantas séries fazer", "Copia treinos da internet sem saber o porquê", "Sente dores ao aumentar a carga"],
    approach: [
      { title: "Volume na medida", text: "Séries suficientes para estimular, sem passar do que você recupera." },
      { title: "Progressão registrada", text: "Carga e repetições anotadas para evoluir com método." },
      { title: "Técnica antes do peso", text: "Execução limpa protege as articulações e dá mais resultado." },
    ],
    firstSteps: ["Anote cargas e repetições de cada treino", "Descanse o suficiente entre séries pesadas", "Distribua proteína ao longo do dia", "Busque progredir aos poucos, semana a semana"],
    articles: ["musculacao-series-repeticoes-descanso", "primeiros-30-dias-de-musculacao", "hidratacao-no-treino"],
    service: "musculacao",
    cta: "Quero evoluir na musculação",
  },
  {
    slug: "vou-fazer-taf",
    label: "Vou fazer TAF",
    kicker: "Concursos",
    title: ["Preparação", "para o TAF"],
    intro: "O teste físico elimina candidatos bem preparados na prova teórica. A preparação precisa de tempo, técnica em cada prova e uma progressão até o dia do teste.",
    signs: ["O edital saiu e você não sabe por onde começar", "Trava na barra ou na flexão", "A corrida é o seu ponto fraco", "Nunca treinou a técnica da impulsão"],
    approach: [
      { title: "Diagnóstico das provas", text: "Ponto de partida em cada prova do seu edital." },
      { title: "Técnica específica", text: "Centímetros e repetições que vêm do movimento certo." },
      { title: "Pico no dia certo", text: "Planejamento para chegar inteiro ao teste." },
    ],
    firstSteps: ["Leia o edital e anote os índices exigidos", "Faça um teste simulado para saber onde está", "Treine as provas com técnica, não só com volume", "Planeje a semana do teste com treinos mais leves"],
    alert: "Cada edital tem provas e índices próprios. Confira sempre as regras oficiais do seu concurso.",
    articles: ["impulsao-horizontal-taf-tecnica", "aquecimento-antes-do-jogo-ou-teste", "hidratacao-no-treino"],
    service: "preparacao-taf",
    cta: "Quero me preparar para o TAF",
  },
  {
    slug: "jogo-futebol",
    label: "Jogo futebol ou futsal",
    kicker: "Futebol · Futsal · Goleiros",
    title: ["Preparação física", "para quem joga"],
    intro: "Do futebol de fim de semana ao atleta, o corpo precisa estar preparado para acelerar, frear, saltar e mudar de direção. Goleiros têm demandas próprias de reação e impulsão.",
    signs: ["Termina o jogo sem perna", "Sente a posterior da coxa em arranques", "É goleiro e quer mais explosão", "Joga uma vez por semana e não treina nos outros dias"],
    approach: [
      { title: "Força de membros inferiores", text: "Base para chutar, saltar e frear com segurança." },
      { title: "Aceleração e agilidade", text: "Arranques, freadas e mudanças de direção com técnica." },
      { title: "Recuperação entre jogos", text: "Chegar inteiro à próxima rodada." },
    ],
    firstSteps: ["Aqueça 10 a 15 minutos antes de jogar", "Inclua força de pernas 2 vezes por semana", "Treine frear, não só acelerar", "No dia seguinte ao jogo, faça atividade leve"],
    articles: ["aquecimento-antes-do-jogo-ou-teste", "preparacao-fisica-futsal-de-base", "hidratacao-no-treino"],
    training: "futebol-fim-de-semana",
    service: "musculacao",
    cta: "Quero render mais em campo",
  },
  {
    slug: "meu-filho-treina",
    label: "Meu filho pratica esporte",
    kicker: "Kids · Escolinha de futsal",
    title: ["Criança não é", "adulto em miniatura"],
    intro: "Na infância, o objetivo é ampliar o repertório de movimentos com prazer e segurança. A especialização precoce costuma atrapalhar mais do que ajudar, e o papel dos pais faz toda a diferença.",
    signs: ["Seu filho joga em escolinha e você quer ajudar", "Tem dúvida se criança pode fazer musculação", "Quer que ele melhore coordenação e agilidade", "Percebe cobrança excessiva por resultado"],
    approach: [
      { title: "Jogo como ferramenta", text: "Brincadeiras que desenvolvem coordenação, equilíbrio e agilidade." },
      { title: "Respeito à idade", text: "Cada fase tem objetivos diferentes, sem cargas de adulto." },
      { title: "Família junto", text: "Pais que incentivam o processo, não só o placar." },
    ],
    firstSteps: ["Varie as atividades: outros esportes também ajudam", "Valorize esforço e evolução, não só o resultado", "Garanta sono, hidratação e refeições regulares", "Deixe o jogo ser divertido"],
    alert: "Atividades para crianças devem ter supervisão de um adulto. Nada de dietas restritivas ou testes físicos de adulto.",
    articles: ["desenvolvimento-aluno-escolinha-de-futsal", "preparacao-fisica-futsal-de-base", "hidratacao-no-treino"],
    training: "criancas",
    service: "funcional-kids",
    cta: "Quero orientação para o meu filho",
  },
  {
    slug: "vou-comecar",
    label: "Estou parado / vou começar",
    kicker: "Primeiros passos",
    title: ["O melhor treino", "é o que você repete"],
    intro: "Começar é a parte mais difícil. Com sessões curtas, poucos exercícios bem feitos e progressão gradual, o hábito se forma e os resultados aparecem.",
    signs: ["Está há meses (ou anos) sem treinar", "Não sabe por onde começar", "Tem medo de se machucar", "Já tentou e desistiu algumas vezes"],
    approach: [
      { title: "Adaptação", text: "Primeiras semanas para aprender os movimentos." },
      { title: "Sessões curtas", text: "20 a 40 minutos que cabem na rotina." },
      { title: "Progressão gradual", text: "Um pouco mais a cada semana, sem exagero." },
    ],
    firstSteps: ["Comece com 2 a 3 sessões por semana", "Escolha horários realistas", "Aprenda a técnica antes de aumentar a carga", "Faça a autoavaliação para saber seu ponto de partida"],
    articles: ["primeiros-30-dias-de-musculacao", "hidratacao-no-treino", "emagrecer-sem-passar-fome"],
    training: "adultos-iniciantes",
    service: "consultoria-online",
    cta: "Quero começar com orientação",
  },
  {
    slug: "mais-de-60",
    label: "Tenho mais de 60 anos",
    kicker: "Autonomia",
    title: ["Força e equilíbrio", "em qualquer idade"],
    intro: "Treinar com mais idade é investir em autonomia: levantar da cadeira, subir escadas e carregar compras com segurança. Força e equilíbrio podem ser desenvolvidos em qualquer idade.",
    signs: ["Sente as pernas mais fracas", "Tem receio de quedas", "Quer manter a independência", "Nunca fez musculação"],
    approach: [
      { title: "Força funcional", text: "Exercícios que conversam com a rotina." },
      { title: "Equilíbrio", text: "Treino específico para prevenir quedas." },
      { title: "Respeito às limitações", text: "Cada exercício com versões mais fáceis e mais difíceis." },
    ],
    firstSteps: ["Converse com seu médico antes de começar", "Treine perto de um apoio firme", "Inclua equilíbrio em pelo menos 3 dias", "Progrida devagar"],
    alert: "Com doenças cardíacas, osteoporose, tonturas ou histórico de quedas, procure avaliação médica antes de iniciar.",
    articles: ["hidratacao-no-treino", "primeiros-30-dias-de-musculacao"],
    training: "mais-velhos",
    service: "funcional-adultos",
    cta: "Quero treinar com segurança",
  },
  {
    slug: "tratamento-controle-de-peso",
    label: "Bariátrica ou canetas",
    kicker: "Acompanhamento",
    title: ["Treino com", "acompanhamento"],
    intro: "Depois de cirurgia bariátrica ou durante o uso de medicamentos para controle de peso, o treino de força ajuda na funcionalidade e nos hábitos. Sempre junto com a equipe de saúde.",
    signs: ["Fez cirurgia bariátrica e já tem liberação", "Usa medicamento prescrito para controle de peso", "Quer preservar força durante o processo", "Não sabe que tipo de treino é seguro"],
    approach: [
      { title: "Liberação primeiro", text: "O treino começa quando a equipe de saúde autoriza." },
      { title: "Força adaptada", text: "Cargas moderadas e progressão cuidadosa." },
      { title: "Atenção aos sinais", text: "Ajustes nos dias de menor disposição." },
    ],
    firstSteps: ["Mantenha o acompanhamento médico e nutricional", "Inclua treino de força quando liberado", "Cuide da hidratação conforme a orientação da equipe", "Interrompa o treino diante de tontura ou mal-estar"],
    alert: "Conteúdo de exercício físico, não tratamento médico. Não orientamos sobre medicamentos, doses ou ajustes de tratamento.",
    articles: ["hidratacao-no-treino", "emagrecer-sem-passar-fome"],
    training: "canetas-emagrecedoras",
    service: "consultoria-online",
    cta: "Quero treinar com segurança",
  },
];

export const getSituation = (slug: string) => situations.find((s) => s.slug === slug) ?? null;
