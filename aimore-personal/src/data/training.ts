export type TrainingTopic = { title: string; text: string };
export type ExampleExercise = { name: string; how: string; goal: string };

export type TrainingCategory = {
  slug: string;
  letter: string;
  title: string;
  short: string;
  intro: string;
  topics: TrainingTopic[];
  exercises: ExampleExercise[];
  care: string[];
  /** Mensagem de segurança em destaque (públicos com necessidades específicas). */
  alert?: string;
};

export const trainingCategories: TrainingCategory[] = [
  {
    slug: "criancas",
    letter: "A",
    title: "Crianças e adolescentes",
    short: "Desenvolvimento motor, coordenação e futebol de base com o jogo como ferramenta.",
    intro:
      "Criança não é adulto em miniatura. Nessa fase, o objetivo é ampliar o repertório de movimentos: correr, saltar, equilibrar, arremessar, mudar de direção. A brincadeira é o melhor treino, e a especialização precoce costuma atrapalhar mais do que ajudar.",
    topics: [
      { title: "Desenvolvimento motor", text: "Variar estímulos é mais importante que repetir um único gesto. Circuitos, jogos de perseguição e atividades com bola desenvolvem a base que sustenta qualquer esporte." },
      { title: "Coordenação e equilíbrio", text: "Andar sobre linhas, saltar com um pé, quicar a bola alternando as mãos e brincar de estátua são formas simples de trabalhar coordenação e equilíbrio." },
      { title: "Agilidade", text: "Mudanças de direção em resposta a sinais (cores, palmas, comandos) treinam agilidade e atenção ao mesmo tempo." },
      { title: "Jogos e brincadeiras", text: "Pega-pega, queimada, corrida de obstáculos e jogos reduzidos mantêm a criança engajada e em movimento por mais tempo." },
      { title: "Preparação física adequada à idade", text: "O peso do próprio corpo é suficiente na maior parte da infância. O aumento de exigência acontece aos poucos, sempre com técnica e supervisão." },
      { title: "Futebol de base", text: "Na base, o prazer de jogar vem antes do resultado. Domínio de bola, tomada de decisão e convivência em equipe são as prioridades." },
    ],
    exercises: [
      { name: "Circuito de cones", how: "Monte 5 estações (zigue-zague, salto com dois pés, equilíbrio em um pé, rolamento de bola, corrida curta) e faça a criança passar por todas.", goal: "Coordenação e agilidade" },
      { name: "Siga o sinal", how: "Ao ouvir uma cor ou ver um gesto, a criança corre até o cone correspondente.", goal: "Reação e mudança de direção" },
      { name: "Amarelinha com bola", how: "Saltar as casas da amarelinha conduzindo ou segurando a bola.", goal: "Equilíbrio e controle corporal" },
    ],
    care: [
      "Supervisão de um adulto em todas as atividades.",
      "Sem dietas restritivas, foco em emagrecimento estético ou comparação de corpos.",
      "Sem testes físicos ou cargas de adulto.",
      "Respeitar o cansaço, a hidratação e o tempo de descanso.",
    ],
  },
  {
    slug: "adultos-iniciantes",
    letter: "B",
    title: "Adultos iniciantes",
    short: "Como começar, organizar a semana e criar consistência.",
    intro:
      "Começar é a parte mais difícil, e também a mais importante. Para quem está iniciando, a melhor rotina é aquela que você consegue repetir. Sessões curtas, poucos exercícios bem executados e progressão gradual dão resultado mais duradouro do que treinos longos que duram duas semanas.",
    topics: [
      { title: "Como começar", text: "Duas ou três sessões por semana, de 20 a 40 minutos, são um ótimo ponto de partida. Escolha horários realistas e trate o treino como compromisso." },
      { title: "Adaptação ao exercício", text: "Nas primeiras semanas, o corpo aprende os movimentos. É normal sentir algum desconforto muscular leve; dor forte ou articular é sinal para ajustar." },
      { title: "Organização semanal", text: "Alterne dias de força e de condicionamento e deixe pelo menos um dia de descanso entre treinos intensos do mesmo grupo muscular." },
      { title: "Exercícios em casa", text: "Agachamento, flexão inclinada, ponte de quadril, prancha e remada com mochila já formam um treino completo sem equipamento." },
      { title: "Treinamento de força", text: "Força é base para tudo: postura, disposição, desempenho no esporte e autonomia. Comece com o peso do corpo e aumente a exigência aos poucos." },
      { title: "Condicionamento cardiorrespiratório", text: "Caminhada rápida, bicicleta ou corrida leve, em ritmo que permita conversar, desenvolvem o fôlego com segurança." },
      { title: "Consistência e recuperação", text: "Sono, alimentação e descanso fazem parte do treino. Evolução vem da soma de semanas, não de um treino perfeito." },
    ],
    exercises: [
      { name: "Agachamento no banco", how: "Sente e levante de um banco ou cadeira com os pés afastados na largura do quadril, controlando a descida.", goal: "Força de pernas e glúteos" },
      { name: "Flexão inclinada", how: "Mãos apoiadas em uma mesa ou bancada firme, corpo alinhado, desça o peito até perto do apoio e volte.", goal: "Força de peito, ombros e braços" },
      { name: "Prancha", how: "Antebraços no chão, corpo alinhado da cabeça aos pés, sem deixar o quadril cair. Comece com 15 a 20 segundos.", goal: "Estabilidade do tronco" },
    ],
    care: [
      "Aqueça por 5 a 10 minutos antes de começar.",
      "Priorize a técnica antes de aumentar carga ou velocidade.",
      "Dor no peito, tontura ou falta de ar desproporcional: pare e procure atendimento.",
    ],
  },
  {
    slug: "mais-velhos",
    letter: "C",
    title: "Pessoas com mais idade",
    short: "Mobilidade, equilíbrio, força funcional e autonomia.",
    intro:
      "Treinar com mais idade é investir em autonomia: levantar da cadeira, subir escadas, carregar compras e brincar com os netos com segurança. Força e equilíbrio podem ser desenvolvidos em qualquer idade, respeitando as capacidades de cada pessoa.",
    topics: [
      { title: "Mobilidade", text: "Movimentar as articulações em toda a amplitude confortável ajuda a manter a facilidade nos movimentos do dia a dia." },
      { title: "Equilíbrio", text: "Exercícios simples, como ficar em um pé com apoio por perto, treinam o sistema de equilíbrio e contribuem para a prevenção de quedas." },
      { title: "Força funcional", text: "Sentar e levantar, subir degraus e carregar objetos são exercícios que conversam diretamente com a rotina." },
      { title: "Autonomia", text: "O objetivo é manter a independência para as atividades que fazem sentido para cada pessoa." },
      { title: "Prevenção de quedas", text: "Força de pernas, equilíbrio, ambiente organizado e calçados adequados formam a base da prevenção." },
      { title: "Adaptação às capacidades", text: "Cada exercício tem versões mais fáceis e mais difíceis. A escolha considera o histórico e as limitações de cada um." },
    ],
    exercises: [
      { name: "Sentar e levantar", how: "Em uma cadeira firme encostada na parede, levante sem impulso e sente devagar. Use as mãos se precisar.", goal: "Força de pernas e autonomia" },
      { name: "Equilíbrio com apoio", how: "Segurando o encosto de uma cadeira, tire um pé do chão por alguns segundos. Alterne os lados.", goal: "Equilíbrio" },
      { name: "Elevação de calcanhares", how: "Com apoio nas mãos, suba na ponta dos pés e desça devagar.", goal: "Força de panturrilhas e estabilidade" },
    ],
    care: [
      "Sempre ter um apoio firme por perto nos exercícios de equilíbrio.",
      "Converse com seu médico se houver doenças cardíacas, osteoporose, tonturas ou histórico de quedas.",
      "Progredir devagar e respeitar dias de mais cansaço.",
    ],
  },
  {
    slug: "pos-bariatrica",
    letter: "D",
    title: "Após cirurgia bariátrica",
    short: "Retorno progressivo, força e acompanhamento multidisciplinar.",
    intro:
      "Depois da cirurgia bariátrica, o exercício físico ajuda a recuperar força, mobilidade e condicionamento. O momento de começar e a intensidade dependem da fase de recuperação e da liberação da equipe assistente. Não existe cronograma pós-operatório único que sirva para todos.",
    alert:
      "Conteúdo educativo. Só inicie ou mude sua rotina de exercícios com liberação da equipe que acompanha sua cirurgia. Exercícios intensos não são indicados sem essa liberação.",
    topics: [
      { title: "Retorno progressivo", text: "Caminhadas leves costumam ser o primeiro passo, conforme orientação médica. A progressão acontece em etapas, com a equipe validando cada avanço." },
      { title: "Recuperação da força", text: "Quando liberado, o treino de força contribui para a função muscular e para as atividades do dia a dia." },
      { title: "Mobilidade e condicionamento", text: "Exercícios de mobilidade e atividades aeróbicas leves ajudam a reconstruir o condicionamento com segurança." },
      { title: "Acompanhamento multidisciplinar", text: "Médico, nutricionista, psicólogo e profissional de Educação Física trabalham melhor em conjunto. Leve suas dúvidas sobre exercício para a equipe." },
      { title: "Hidratação e recuperação", text: "As orientações de hidratação e alimentação após a cirurgia são específicas e vêm da equipe assistente. Respeite-as também nos dias de treino." },
    ],
    exercises: [
      { name: "Caminhada leve", how: "Ritmo confortável, em terreno plano, pelo tempo liberado pela equipe.", goal: "Retomada do movimento" },
      { name: "Mobilidade de ombros e quadril", how: "Círculos amplos e controlados, sem dor, sentado ou em pé.", goal: "Mobilidade" },
    ],
    care: [
      "Nunca antecipe etapas por conta própria.",
      "Interrompa diante de dor abdominal, tontura, mal-estar ou qualquer sinal incomum e procure a equipe.",
      "Siga as orientações de hidratação e alimentação da sua equipe.",
    ],
  },
  {
    slug: "canetas-emagrecedoras",
    letter: "E",
    title: "Quem usa medicamentos injetáveis para controle de peso",
    short: "Força, função muscular e acompanhamento profissional durante o tratamento.",
    intro:
      "Medicamentos injetáveis para controle de peso são prescritos e acompanhados por médicos. Durante o tratamento, o treinamento de força ajuda a manter a funcionalidade e os hábitos ativos. O exercício é um complemento ao acompanhamento profissional, nunca um substituto.",
    alert:
      "Não damos orientação sobre medicamentos, doses, ajustes ou interrupção de tratamento. Qualquer decisão sobre a medicação é do seu médico.",
    topics: [
      { title: "Acompanhamento profissional", text: "Mantenha o acompanhamento médico e, quando indicado, nutricional. Informe a equipe sobre a sua rotina de exercícios." },
      { title: "Força e função muscular", text: "O treino de resistência é uma estratégia recomendada para estimular a musculatura durante o processo de perda de peso. Ele não garante, sozinho, a preservação da massa muscular." },
      { title: "Treino de resistência adaptado", text: "Comece com cargas moderadas e progrida aos poucos, ajustando a intensidade aos dias em que a disposição estiver menor." },
      { title: "Hidratação e alimentação", text: "A ingestão de líquidos e de alimentos pode mudar durante o tratamento. Siga as orientações da equipe que acompanha você." },
      { title: "Sintomas que exigem avaliação", text: "Tontura, fraqueza intensa, náuseas persistentes, dor abdominal forte ou desmaio são sinais para interromper o treino e procurar atendimento." },
    ],
    exercises: [
      { name: "Remada com elástico", how: "Elástico preso em um ponto firme, puxe em direção ao tronco aproximando as escápulas.", goal: "Força de costas" },
      { name: "Agachamento no banco", how: "Sentar e levantar controlando a descida, com pés firmes no chão.", goal: "Força de pernas" },
      { name: "Ponte de quadril", how: "Deitado, joelhos dobrados, eleve o quadril contraindo os glúteos e desça devagar.", goal: "Força de glúteos e posterior de coxa" },
    ],
    care: [
      "Evite treinar em jejum prolongado ou com mal-estar.",
      "O treino não elimina efeitos adversos do medicamento.",
      "Ajuste a intensidade em dias de menor disposição.",
    ],
  },
  {
    slug: "futebol-fim-de-semana",
    letter: "F",
    title: "Futebol de fim de semana",
    short: "Aquecimento, força, aceleração e recuperação para quem joga por lazer.",
    intro:
      "Quem joga uma vez por semana sem treinar nos outros dias pede para o corpo um esforço para o qual ele não foi preparado. Uma rotina simples de força e condicionamento ao longo da semana faz diferença no rendimento e no cuidado com o corpo. Uma sessão isolada antes do jogo não substitui uma preparação regular.",
    topics: [
      { title: "Preparação antes dos jogos", text: "Dormir bem, se hidratar e chegar com tempo para aquecer já mudam o jogo." },
      { title: "Aquecimento", text: "De 10 a 15 minutos: trote, mobilidade dinâmica, educativos de corrida e alguns arranques progressivos." },
      { title: "Mobilidade", text: "Quadril e tornozelos móveis ajudam nas mudanças de direção e na proteção dos joelhos." },
      { title: "Força de membros inferiores", text: "Agachamentos, afundos e exercícios para posterior de coxa formam a base para chutar, saltar e frear." },
      { title: "Aceleração e desaceleração", text: "Saber frear é tão importante quanto acelerar. Treine paradas controladas antes de buscar velocidade máxima." },
      { title: "Agilidade e resistência", text: "Trabalhos intervalados e circuitos com mudanças de direção imitam o ritmo do jogo." },
      { title: "Recuperação entre partidas", text: "Atividade leve no dia seguinte, sono e alimentação ajudam a chegar inteiro na próxima rodada." },
      { title: "Prevenção de lesões", text: "Força, aquecimento e progressão de carga são as ferramentas mais consistentes para reduzir o risco de lesão." },
    ],
    exercises: [
      { name: "Afundo alternado", how: "Passo à frente, desça até os dois joelhos formarem cerca de 90 graus e volte. Tronco firme.", goal: "Força e estabilidade de pernas" },
      { name: "Freio em três passos", how: "Corra 10 metros e pare em três passos curtos, com joelhos levemente flexionados.", goal: "Desaceleração" },
      { name: "Ponte unilateral", how: "Deitado, uma perna estendida, eleve o quadril com a outra perna apoiada.", goal: "Posterior de coxa e glúteos" },
    ],
    care: [
      "Aumente o volume de jogos e treinos aos poucos.",
      "Não jogue com dor aguda ou lesão sem avaliação.",
      "Respeite a recuperação, principalmente após jogos intensos.",
    ],
  },
  {
    slug: "atletas-futebol",
    letter: "G",
    title: "Atletas de futebol e goleiros",
    short: "Potência, reação, agilidade e preparação por faixa etária.",
    intro:
      "A preparação física do atleta de futebol combina força, potência, velocidade e resistência específica. O goleiro tem demandas próprias: reação, impulsão, deslocamento lateral e quedas. Em cada faixa etária, o treino muda de objetivo.",
    topics: [
      { title: "Coordenação e velocidade de reação", text: "Estímulos visuais e sonoros, bolas imprevisíveis e trocas rápidas de direção treinam o tempo de resposta." },
      { title: "Potência e força", text: "Saltos, arremessos de medicine ball e exercícios de força bem executados aumentam a capacidade de produzir força rapidamente." },
      { title: "Agilidade e mudanças de direção", text: "Freio, giro e reaceleração devem ser treinados com técnica antes da intensidade máxima." },
      { title: "Resistência específica", text: "Esforços intermitentes, com pausas curtas, reproduzem a exigência do jogo." },
      { title: "Saltos e aterrissagens", text: "Aterrissar com joelhos alinhados e quadril para trás é uma habilidade que se treina e protege as articulações." },
      { title: "Por faixa etária", text: "Crianças: jogo e coordenação. Adolescentes: técnica de movimentos e força com supervisão. Adultos: periodização com foco em desempenho." },
    ],
    exercises: [
      { name: "Deslocamento lateral com reação (goleiro)", how: "Em base de goleiro, desloque-se para o lado indicado por um sinal e volte ao centro.", goal: "Reação e deslocamento" },
      { name: "Salto e aterrissagem controlada", how: "Salte para frente e aterrisse com os dois pés, segurando a posição por 2 segundos.", goal: "Potência e técnica de aterrissagem" },
      { name: "Sprint com mudança de direção 5-10-5", how: "Corra 5 metros, toque a linha, volte 10, toque e volte 5.", goal: "Agilidade" },
    ],
    care: [
      "Adolescentes treinam força com supervisão e técnica antes de carga.",
      "Atletas menores de idade precisam de autorização dos responsáveis.",
      "Planeje a carga de treino em conjunto com o calendário de jogos.",
    ],
  },
];

export const getTrainingCategory = (slug: string) => trainingCategories.find((c) => c.slug === slug) ?? null;
