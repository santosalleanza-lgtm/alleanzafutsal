export type BlogCategory = "hidratacao" | "musculacao" | "futsal-base" | "taf" | "emagrecimento" | "futebol";

export const blogCategories: Record<BlogCategory, string> = {
  hidratacao: "Hidratação",
  musculacao: "Musculação",
  "futsal-base": "Futsal e escolinha",
  taf: "TAF e concursos",
  emagrecimento: "Emagrecimento",
  futebol: "Futebol",
};

export type BlogPost = {
  slug: string;
  title: string;
  category: BlogCategory;
  excerpt: string;
  /** Resposta curta no topo do artigo. */
  quick: string;
  date: string;
  /** Capa no estilo das artes do Instagram. */
  cover: { kicker: string; lines: [string, string]; variant: "dark" | "gold" };
  /** "## " vira subtítulo, "- " vira lista, "> " vira destaque. */
  body: string;
  featured?: boolean;
};

export const seedPosts: BlogPost[] = [
  {
    slug: "hidratacao-no-treino",
    title: "Hidratação no treino: quanto beber, quando e por quê",
    category: "hidratacao",
    excerpt: "Água antes, durante e depois do treino, sinais de desidratação e quando vale pensar em eletrólitos.",
    quick: "Chegue ao treino hidratado, beba aos poucos durante sessões longas ou no calor e reponha depois. A cor da urina e a sede são bons termômetros do dia a dia.",
    date: "2026-10-18",
    cover: { kicker: "Hidratação", lines: ["Água também", "é treino"], variant: "gold" },
    featured: true,
    body: `Uma das perguntas que mais recebo é "quantos litros de água eu tenho que beber?". A resposta honesta é: depende. Do seu tamanho, do clima, da intensidade do treino e de quanto você transpira. Mais útil do que perseguir um número fixo é criar o hábito e aprender a ler os sinais do corpo.

## Por que a hidratação mexe com o desempenho

Durante o exercício, o corpo produz calor e usa o suor para se resfriar. Quando a perda de líquido é grande e não é reposta, o coração trabalha mais para manter o mesmo esforço, a sensação de cansaço aparece antes e a concentração cai. No calor de Porto Alegre no verão, isso acontece rápido.

## Antes do treino

- Chegue ao treino já hidratado: beber bem ao longo do dia vale mais do que tomar meio litro de uma vez antes de começar.
- Nas duas a três horas anteriores, um ou dois copos de água ajudam.
- Evite treinar com sede: ela já é um sinal de que o corpo pede líquido.

## Durante o treino

- Em treinos de até uma hora, em ambiente fresco, água é suficiente para a maioria das pessoas.
- Beba em pequenos goles, a cada pausa, em vez de grandes quantidades de uma vez.
- Em treinos longos, jogos ou dias muito quentes com muito suor, bebidas com eletrólitos (sódio, principalmente) podem fazer sentido.

## Depois do treino

Reponha o que perdeu ao longo das horas seguintes. Uma forma prática de ter noção é se pesar antes e depois de um treino intenso: a diferença indica, aproximadamente, quanto líquido saiu no suor.

## Sinais de alerta

- Urina muito escura e em pouca quantidade
- Dor de cabeça, tontura ou cansaço fora do normal
- Câimbras frequentes em treinos longos

> Tontura forte, confusão ou mal-estar durante o exercício: pare, procure sombra, hidrate-se e busque atendimento se não melhorar.

## E as crianças?

Criança desidrata com facilidade e nem sempre percebe a sede durante a brincadeira. Na escolinha, garrafinha sempre na mochila e pausas para água a cada bloco de atividade.

## Cuidados especiais

Pessoas com doenças renais ou cardíacas, gestantes e quem fez cirurgia bariátrica têm orientações específicas de líquidos. Nesses casos, siga a sua equipe de saúde.`,
  },
  {
    slug: "musculacao-series-repeticoes-descanso",
    title: "Musculação: séries, repetições e descanso explicados sem complicação",
    category: "musculacao",
    excerpt: "Quantas séries fazer, quantas repetições, quanto descansar e por que a pausa curta demais pode atrapalhar.",
    quick: "Para a maioria das pessoas: 2 a 4 séries por exercício, de 6 a 15 repetições, terminando com 1 a 3 repetições \"na reserva\". Descanse de 1 a 3 minutos, mais nos exercícios pesados.",
    date: "2026-10-16",
    cover: { kicker: "Musculação", lines: ["Descanso", "entre séries"], variant: "dark" },
    featured: true,
    body: `Muita gente treina com dedicação, mas sem saber por que faz 3 séries de 12 ou descansa 30 segundos. Entender o básico muda o resultado.

## Séries: quanto é suficiente

O que gera adaptação é o estímulo somado ao longo da semana. Para quem está começando, 2 séries por exercício já trazem resultado. Com o tempo, 3 a 4 séries e um número maior de séries semanais por grupo muscular passam a fazer sentido. Mais nem sempre é melhor: o volume precisa caber na sua recuperação.

## Repetições: a faixa importa menos do que o esforço

Dá para ganhar massa muscular com faixas diferentes de repetições, de cerca de 6 a 15 ou mais, desde que a série seja exigente. Uma referência prática é terminar a série com 1 a 3 repetições "na reserva": você ainda conseguiria fazer mais algumas, mas não muitas.

- Faixas mais baixas (cerca de 4 a 6): mais foco em força, exigem mais técnica e descanso.
- Faixas moderadas (6 a 12): ótimo equilíbrio para a maioria.
- Faixas mais altas (12 a 20): úteis para exercícios menores e para quem está aprendendo.

## Descanso: não é perda de tempo

Pausa curta demais pode tirar repetições da série seguinte. Se você cai de 10 para 6 repetições porque não recuperou, o estímulo total do treino diminui.

- Exercícios grandes e pesados (agachamento, levantamento, supino): 2 a 3 minutos.
- Exercícios menores (rosca, elevação lateral): 1 a 2 minutos.
- Treinos de condicionamento têm outra lógica: pausas curtas fazem parte do objetivo.

## Progressão: o segredo que ninguém posta

Anote cargas e repetições. Quando você completar todas as séries no topo da faixa com boa técnica, aumente um pouco a carga. Esse registro simples é o que separa treinar de "malhar sem rumo".

> Técnica antes do peso, sempre. Execução ruim com carga alta é o caminho mais curto para a lesão.`,
  },
  {
    slug: "desenvolvimento-aluno-escolinha-de-futsal",
    title: "Como se desenvolve um aluno de escolinha de futsal (e o papel dos pais)",
    category: "futsal-base",
    excerpt: "O que esperar em cada fase, por que o jogo é a melhor ferramenta e como a família pode ajudar sem pressionar.",
    quick: "Até os 12 anos, a prioridade é coordenação, prazer pelo jogo e variedade de movimentos. Resultado vem depois. Os pais ajudam mais incentivando o processo do que cobrando o placar.",
    date: "2026-10-14",
    cover: { kicker: "Futsal · Base", lines: ["O jogo", "ensina"], variant: "gold" },
    featured: true,
    body: `Quem trabalha com crianças no futsal vê todo ano a mesma cena: pais ansiosos porque o filho "não está evoluindo". Quase sempre, a criança está evoluindo exatamente no ritmo esperado para a idade. Entender as fases ajuda a ter a expectativa certa.

## Fase 1: descobrir o movimento (por volta de 5 a 8 anos)

Nessa fase, a criança está aprendendo a controlar o próprio corpo. Correr, frear, saltar, equilibrar e conduzir a bola ao mesmo tempo é muita informação.

- Prioridade: coordenação, equilíbrio e diversão.
- Jogos reduzidos, muita bola no pé e pouco tempo de fila.
- Tática complexa e posições fixas ainda não fazem sentido.

## Fase 2: aprender a jogar (por volta de 9 a 12 anos)

É considerada uma fase muito favorável para aprender habilidades motoras. A criança começa a entender o jogo coletivo.

- Fundamentos técnicos: passe, domínio, condução, finalização.
- Primeiras noções de posicionamento e tomada de decisão.
- Preparação física dentro do jogo e de atividades lúdicas, sem cargas de adulto.

## Fase 3: treinar para competir (adolescência)

Com o crescimento, chegam mudanças grandes no corpo. Cada adolescente amadurece em um ritmo diferente, e isso afeta força, velocidade e coordenação.

- Força com o peso do corpo e técnica, com supervisão.
- Mais conteúdo tático e competitivo.
- Atenção ao período de crescimento rápido: é comum uma "descoordenação" temporária.

## Por que o jogo é a melhor ferramenta

No jogo, a criança decide, erra, tenta de novo e aprende. Atividades com bola desenvolvem a técnica e a preparação física ao mesmo tempo. Fila longa e exercício parado demais diminuem o tempo de aprendizado.

## O papel dos pais

- Elogie o esforço e a evolução, não só os gols.
- Evite instruções da arquibancada: a criança fica dividida entre você e o professor.
- Incentive outros esportes e brincadeiras: variedade forma atletas mais completos.
- Garanta o básico: sono, alimentação regular e água na mochila.

> Criança que gosta de jogar continua jogando. E quem continua jogando é quem evolui.

## Sinais de que algo precisa de atenção

Dor que não passa, medo de ir ao treino ou perda de interesse súbita merecem uma conversa com a criança e com o professor. No caso de dor persistente, procure o pediatra.`,
  },
  {
    slug: "preparacao-fisica-futsal-de-base",
    title: "Preparação física no futsal de base: o que muda em cada idade",
    category: "futsal-base",
    excerpt: "Agilidade, força e resistência no futsal infantil e juvenil, sem copiar o treino do adulto.",
    quick: "Criança treina capacidades físicas brincando e jogando. Adolescente começa força com o peso do corpo e técnica. Cargas e volumes de adulto ficam para depois.",
    date: "2026-10-12",
    cover: { kicker: "Futsal · Base", lines: ["Preparação", "por idade"], variant: "dark" },
    body: `O futsal é intermitente: arranques curtos, freadas, mudanças de direção e pausas. A preparação física de quem joga precisa refletir isso, mas respeitando a fase de cada atleta.

## Crianças: capacidades através do jogo

- Agilidade e coordenação em circuitos com cones, escadas e bola.
- Velocidade de reação com jogos de estímulo (cores, sons, gestos).
- Resistência que vem naturalmente dos jogos reduzidos.

Nada de correr em volta da quadra por longos minutos como castigo. Isso tira o prazer e pouco acrescenta.

## Adolescentes: técnica de movimento e força

- Agachamento, avanço, flexão e prancha com o peso do corpo, aprendendo a técnica.
- Saltos e aterrissagens controladas para proteger os joelhos.
- Progressão de cargas só com técnica consolidada e supervisão.

## Goleiros: demandas próprias

- Deslocamento lateral e reposicionamento rápido.
- Reação a estímulos imprevisíveis.
- Quedas seguras e impulsão, com progressão cuidadosa.

## O que evitar

- Copiar o treino do time adulto.
- Treinar dor: dor persistente precisa de avaliação.
- Especializar cedo demais em uma única posição ou esporte.

> Preparação física na base não é para formar adulto pequeno. É para formar um jogador que aprende, gosta e continua.`,
  },
  {
    slug: "primeiros-30-dias-de-musculacao",
    title: "Primeiros 30 dias de musculação: o que priorizar",
    category: "musculacao",
    excerpt: "O que fazer no primeiro mês para aprender, criar o hábito e evoluir sem lesão.",
    quick: "No primeiro mês, foque em aprender os movimentos básicos, treinar 2 a 3 vezes por semana e terminar os treinos com vontade de voltar.",
    date: "2026-10-10",
    cover: { kicker: "Musculação", lines: ["Primeiro", "mês"], variant: "gold" },
    body: `O primeiro mês de academia define se você vai continuar. Quem começa com tudo costuma parar cedo. Quem começa com método, fica.

## Semana 1 e 2: aprender

- Poucos exercícios, que trabalham o corpo todo: agachar, empurrar, puxar e estabilizar o tronco.
- Cargas leves, foco em execução.
- Dor muscular leve nos primeiros dias é normal; dor articular não é.

## Semana 3 e 4: consolidar

- Aumente um pouco as cargas onde a técnica estiver boa.
- Comece a anotar cargas e repetições.
- Mantenha a regularidade: 2 a 3 treinos por semana são suficientes.

## Erros comuns

- Treinar até não conseguir andar no dia seguinte.
- Pular o aquecimento.
- Trocar o treino toda semana.
- Comparar o seu primeiro mês com o quinto ano de alguém.

> O objetivo do primeiro mês não é ficar exausto. É criar um hábito que dure anos.`,
  },
  {
    slug: "impulsao-horizontal-taf-tecnica",
    title: "Impulsão horizontal no TAF: técnica antes da força",
    category: "taf",
    excerpt: "Os centímetros que saem do movimento: braços, agachamento, projeção e aterrissagem.",
    quick: "Use os braços, agache o suficiente para carregar a mola, projete o corpo para frente e aterrisse sem cair para trás. Técnica bem treinada rende centímetros rápido.",
    date: "2026-10-08",
    cover: { kicker: "TAF · Impulsão", lines: ["Impulsão", "é técnica"], variant: "dark" },
    body: `No salto horizontal, muitos candidatos perdem centímetros por detalhes técnicos, não por falta de força.

## As quatro fases

- Preparação: pés afastados na largura do quadril, braços à frente.
- Carregamento: agache e leve os braços para trás ao mesmo tempo.
- Projeção: estenda quadril, joelhos e tornozelos com os braços indo para frente e para cima.
- Aterrissagem: joelhos flexionados, peso à frente, sem tocar o chão atrás dos calcanhares.

## Erros que custam centímetros

- Braços parados ou atrasados.
- Agachamento curto demais (ou fundo demais e lento).
- Saltar para cima em vez de para frente.
- Cair para trás na aterrissagem: a marca vale a parte do corpo que tocou mais perto da linha.

## Como treinar

- Saltos submáximos com foco em técnica, com descanso completo.
- Força de membros inferiores ao longo da semana.
- Simulados periódicos, sempre aquecido.

> Confira no edital como a prova é medida e quantas tentativas são permitidas.`,
  },
  {
    slug: "emagrecer-sem-passar-fome",
    title: "Emagrecer não é passar fome",
    category: "emagrecimento",
    excerpt: "Por que restrições extremas falham e o que funciona de verdade a longo prazo.",
    quick: "Um déficit moderado, treino de força, movimento no dia a dia e sono regular funcionam melhor do que dietas extremas, porque dá para manter.",
    date: "2026-10-06",
    cover: { kicker: "Emagrecimento", lines: ["Processo,", "não pressa"], variant: "gold" },
    body: `Dietas muito restritivas até mostram resultado rápido na balança, mas costumam ter vida curta. Fome, falta de energia e treinos ruins levam ao abandono.

## O que funciona

- Déficit energético moderado e individualizado, ajustado com nutricionista quando possível.
- Treino de força para ajudar a preservar a massa muscular.
- Movimento ao longo do dia: caminhar, subir escadas, brincar com os filhos.
- Sono regular, que interfere na fome e na disposição.

## O papel do treino de força

Durante o emagrecimento, perder músculo junto com gordura deixa o corpo mais fraco e com menos disposição. O treino de força, combinado com alimentação e recuperação adequadas, ajuda a preservar a musculatura.

## Constância vence intensidade

Uma rotina possível, repetida ao longo de meses, vale mais do que uma estratégia perfeita que não consegue ser mantida.

> Cuidado com promessas de "X kg em X dias". Saúde não tem atalho.`,
  },
  {
    slug: "aquecimento-antes-do-jogo-ou-teste",
    title: "Aquecimento antes do jogo ou do teste: 8 minutos que preparam o corpo",
    category: "futebol",
    excerpt: "Um roteiro simples de aquecimento para futebol, futsal e TAF.",
    quick: "Trote leve, mobilidade de quadril e ombros, educativos e acelerações curtas. Em cerca de 8 a 15 minutos o corpo está pronto.",
    date: "2026-10-04",
    cover: { kicker: "Futebol · TAF", lines: ["Aqueça", "antes"], variant: "dark" },
    body: `Chegar e já entrar no jogo ou no teste é pedir para render menos e aumentar o risco de lesão. Um aquecimento curto e bem feito resolve.

## Roteiro básico

- Trote leve: 3 minutos.
- Mobilidade de quadril e ombros: 3 minutos.
- Educativos de corrida (skipping, anfersen, deslocamentos laterais): 2 a 3 minutos.
- Acelerações curtas e progressivas: 2 a 3 tiros de 15 a 20 segundos.

## Para o futebol e futsal

Inclua freadas e mudanças de direção nas acelerações e alguns toques de bola. Goleiros: deslocamentos laterais, quedas leves e reação.

## Para o TAF

Simule o gesto de cada prova em intensidade baixa antes de fazê-la para valer. Evite gastar energia demais: o aquecimento prepara, não cansa.

> Uma sessão isolada antes do jogo não substitui uma preparação física regular ao longo da semana.`,
  },
];

export type Question = { slug: string; question: string; category: BlogCategory; answer: string };

/** Perguntas frequentes que recebo no Instagram e no WhatsApp, respondidas para todo mundo. */
export const seedQuestions: Question[] = [
  { slug: "quanta-agua", category: "hidratacao", question: "Quanto de água eu preciso beber quando treino?", answer: "Não existe um número único: depende do seu tamanho, do clima e de quanto você transpira. Chegue ao treino hidratado, beba aos poucos nas pausas e reponha depois. Urina clara e ausência de sede são bons sinais. Em treinos longos e no calor, eletrólitos podem ajudar." },
  { slug: "dor-no-dia-seguinte", category: "musculacao", question: "Se não ficar dolorido no dia seguinte, o treino não funcionou?", answer: "Não. A dor muscular tardia é comum quando o estímulo é novo, mas diminui com a adaptação. O que indica evolução é a progressão de cargas, repetições e a qualidade da execução ao longo das semanas." },
  { slug: "quantas-vezes-por-semana", category: "musculacao", question: "Quantas vezes por semana preciso treinar para ter resultado?", answer: "Duas a três sessões bem feitas já trazem resultado para quem está começando. Com o tempo, 3 a 5 sessões fazem sentido, conforme seu objetivo e recuperação. A regularidade importa mais do que a quantidade de uma semana isolada." },
  { slug: "musculacao-ou-aerobico", category: "emagrecimento", question: "Para emagrecer, musculação ou aeróbico?", answer: "Os dois somam. A musculação ajuda a preservar a massa muscular e o aeróbico contribui para o gasto e o condicionamento. A combinação com alimentação organizada e sono é o que faz a diferença." },
  { slug: "crianca-musculacao", category: "futsal-base", question: "Criança pode fazer musculação?", answer: "Treino de força para crianças e adolescentes, bem orientado e supervisionado, pode ser seguro. Mas para criança a prioridade é o movimento variado e lúdico. Cargas e métodos de adulto não se aplicam." },
  { slug: "filho-preparacao-fisica", category: "futsal-base", question: "Meu filho precisa de preparação física além da escolinha?", answer: "Na infância, a escolinha e outras brincadeiras costumam ser suficientes, desde que as aulas tenham variedade de movimento. Mais importante do que treino extra é sono, alimentação e prazer pelo jogo. Na adolescência, um trabalho de força supervisionado pode complementar." },
  { slug: "treinar-todo-dia", category: "musculacao", question: "Posso treinar todos os dias?", answer: "Pode se movimentar todos os dias, mas o mesmo grupo muscular precisa de recuperação entre treinos intensos. Alternar estímulos e incluir dias mais leves é o caminho." },
  { slug: "tempo-taf", category: "taf", question: "Quanto tempo antes do TAF devo começar a treinar?", answer: "Quanto antes, melhor. Comece assim que decidir prestar o concurso, sem esperar o edital. O tempo necessário depende do seu ponto de partida e dos índices exigidos: um simulado das provas ajuda a definir." },
  { slug: "alongar-antes", category: "futebol", question: "Devo alongar antes ou depois do treino?", answer: "Antes, prefira aquecimento com mobilidade dinâmica, que prepara o corpo para o movimento. Alongamentos estáticos mais longos funcionam melhor depois ou em outro momento do dia." },
  { slug: "treinar-em-jejum", category: "emagrecimento", question: "Treinar em jejum emagrece mais?", answer: "Para a maioria das pessoas, o resultado no fim do mês depende mais do total de alimentação, treino e sono do que do horário da refeição. Se você se sente bem treinando em jejum, tudo bem; se sente fraqueza ou tontura, coma antes. Quem tem diabetes ou usa medicamentos deve conversar com o médico." },
];
