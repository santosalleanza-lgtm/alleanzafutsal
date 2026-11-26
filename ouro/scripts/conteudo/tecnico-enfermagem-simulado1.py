# Simulado 1 — Técnico de Enfermagem (Centro Cirúrgico, SR e/ou CME) · GHC 2026 · FUNDATEC
# Formato do edital: 10 P, 10 Políticas Públicas de Saúde (S), 5 Informática (I), 25 Específicos (E); 4 alternativas.
import json, sys

TEXTO = {
 "titulo": "O minuto que salva",
 "corpo": (
  "Às sete da manhã, a sala de cirurgia parece um lugar onde nada pode dar errado. As luzes estão acesas, os instrumentais repousam alinhados sobre a mesa e cada profissional conhece de cor o seu papel. É justamente essa sensação de controle, porém, que costuma esconder os maiores riscos: quando tudo parece óbvio, ninguém confere o óbvio.\n"
  "Foi para enfrentar esse paradoxo que se difundiu, em hospitais do mundo inteiro, a lista de verificação de cirurgia segura. A ideia é simples: antes da anestesia, antes da incisão e antes de o paciente deixar a sala, a equipe interrompe a rotina por alguns instantes e confirma, em voz alta, informações que todos supõem saber. Quem é o paciente? Qual procedimento será realizado? Em que lado do corpo? Todos os materiais foram contados?\n"
  "À primeira vista, o ritual pode parecer burocrático. Profissionais experientes, aliás, às vezes resistem a ele, como se a conferência pusesse em dúvida sua competência. A experiência mostra o contrário: a pausa não substitui o conhecimento técnico, mas o protege das falhas de atenção, que atingem tanto o iniciante quanto o veterano.\n"
  "Há ainda um efeito menos visível. Ao dar voz a cada integrante da equipe — do cirurgião ao técnico de enfermagem —, a lista transforma a segurança em responsabilidade compartilhada. Quem percebe algo errado sente-se autorizado a falar, e falar, nesse ambiente, pode ser a diferença entre um susto e uma tragédia. O minuto gasto na conferência, afinal, é o mais barato de toda a cirurgia."
 ),
 "fonte": "Texto elaborado para este material."
}

Q = []
def q(d, t, e, o, c, x, tx=False):
    item = {"id": f"te1q{len(Q)+1:02d}", "d": d, "t": t, "e": e, "o": o, "c": c, "x": x}
    if tx: item["tx"] = 1
    Q.append(item)

# ---------------- LÍNGUA PORTUGUESA (10) ----------------
q("P","Interpretação de texto","De acordo com o texto, a lista de verificação de cirurgia segura",
 ["substitui o conhecimento técnico da equipe, tornando a experiência dispensável.",
  "protege o conhecimento técnico das falhas de atenção, que afetam iniciantes e veteranos.",
  "é necessária apenas para profissionais iniciantes, que ainda não dominam a rotina.",
  "deve ser aplicada somente antes da incisão, momento de maior risco da cirurgia."],1,
 "O 3º parágrafo afirma que a pausa “não substitui o conhecimento técnico, mas o protege das falhas de atenção, que atingem tanto o iniciante quanto o veterano”. (A) contradiz esse trecho; (C) restringe a quem é iniciante, o oposto do texto; (D) ignora os três momentos citados no 2º parágrafo (antes da anestesia, antes da incisão e antes de o paciente deixar a sala).",tx=True)
q("P","Interpretação de texto","No trecho “quando tudo parece óbvio, ninguém confere o óbvio” (1º parágrafo), o autor sugere que",
 ["a sensação de controle leva a equipe a deixar de verificar o que considera evidente.",
  "os profissionais conferem apenas os procedimentos mais complexos da cirurgia.",
  "a sala de cirurgia é um ambiente onde, de fato, nada pode dar errado.",
  "a rotina cirúrgica dispensa conferências quando a equipe é experiente."],0,
 "O período explica por que a “sensação de controle” esconde riscos: o que parece óbvio deixa de ser conferido. (B) não está no texto; (C) é justamente a falsa impressão que o texto critica (“parece um lugar onde nada pode dar errado”); (D) contraria a tese central do texto.",tx=True)
q("P","Léxico","A palavra “difundiu” (2º parágrafo) poderia ser substituída, sem alteração do sentido no texto, por",
 ["restringiu","espalhou","impôs","questionou"],1,
 "“Difundir-se” significa propagar-se, espalhar-se: a lista se espalhou por hospitais do mundo inteiro. “Restringiu” tem sentido oposto; “impôs” acrescenta ideia de obrigação que o texto não expressa; “questionou” muda completamente o sentido.",tx=True)
q("P","Coesão textual","No 3º parágrafo, a expressão “a ele”, em “às vezes resistem a ele”, retoma",
 ["“o conhecimento técnico”.","“o paciente”.","“o ritual”.","“o veterano”."],2,
 "O pronome “ele” retoma o termo mais próximo com sentido compatível: “o ritual”, citado na frase anterior (“o ritual pode parecer burocrático”). Os profissionais resistem ao ritual da conferência. As demais expressões aparecem depois ou em outro parágrafo e não fazem sentido como objeto de “resistir”.",tx=True)
q("P","Conjunções","O conector “porém” (1º parágrafo) poderia ser substituído, sem prejuízo do sentido, por",
 ["portanto","no entanto","porque","assim que"],1,
 "“Porém” é conjunção adversativa (ideia de oposição), assim como “no entanto”. “Portanto” é conclusiva; “porque” é causal/explicativa; “assim que” indica tempo. Só (B) mantém a relação de oposição entre a sensação de controle e os riscos escondidos.",tx=True)
q("P","Crase","Assinale a alternativa em que o acento indicativo de crase está empregado corretamente.",
 ["A equipe chegou às sete horas para a primeira cirurgia.",
  "O técnico entregou o material à ele antes da incisão.",
  "A enfermeira começou à conferir os instrumentais.",
  "O paciente foi levado à pé até a sala de recuperação."],0,
 "Há crase na indicação de horas (“às sete horas”), como em “Às sete da manhã”, no início do texto. Não ocorre crase antes de pronome pessoal (“a ele”), antes de verbo no infinitivo (“a conferir”) nem antes de palavra masculina (“a pé”).",tx=True)
q("P","Concordância verbal","Assinale a frase que está de acordo com a norma-padrão quanto à concordância verbal.",
 ["Fazem dois anos que o hospital adotou a lista de verificação.",
  "Houveram falhas de comunicação durante a passagem de plantão.",
  "Existe muitos riscos escondidos na sensação de controle.",
  "Faz dois anos que o hospital adotou a lista de verificação."],3,
 "O verbo “fazer”, indicando tempo decorrido, é impessoal e fica no singular: “Faz dois anos”. “Haver” no sentido de existir também é impessoal (“Houve falhas”). Já “existir” é pessoal e concorda com o sujeito: “Existem muitos riscos”.",tx=True)
q("P","Regência verbal","Está correta, de acordo com a norma-padrão, a regência verbal da frase:",
 ["O residente assistiu o procedimento ao lado do cirurgião.",
  "A equipe obedeceu ao protocolo de cirurgia segura.",
  "A equipe prefere mais conferir do que arriscar.",
  "O paciente chegou na sala de recuperação às dez horas."],1,
 "“Obedecer” é transitivo indireto: obedecer a algo (“ao protocolo”). “Assistir”, no sentido de ver, exige “a” (assistiu ao procedimento); “preferir” rejeita “mais… do que” (prefere conferir a arriscar); “chegar” pede a preposição “a” na norma-padrão (chegou à sala).",tx=True)
q("P","Pontuação","No 4º parágrafo, os travessões em “— do cirurgião ao técnico de enfermagem —” foram empregados para",
 ["isolar uma expressão que especifica quem são os integrantes da equipe.",
  "indicar a fala de um personagem, como em um diálogo.",
  "marcar uma enumeração de ideias em oposição.",
  "substituir o ponto final entre duas orações independentes."],0,
 "Os travessões duplos isolam uma expressão intercalada de caráter explicativo, que especifica “cada integrante da equipe”. Poderiam ser trocados por vírgulas ou parênteses. Não há diálogo, oposição nem separação de orações independentes.",tx=True)
q("P","Acentuação gráfica","As palavras “óbvio” e “experiência”, retiradas do texto, são acentuadas pela mesma regra. Assinale o par que também segue essa regra.",
 ["técnico – está","história – série","também – médico","já – cirúrgico"],1,
 "“Óbvio” e “experiência” são paroxítonas terminadas em ditongo crescente (-io, -ia), assim como “história” e “série”. “Técnico”, “médico” e “cirúrgico” são proparoxítonas; “está” e “também” são oxítonas; “já” é monossílabo tônico.",tx=True)

# ---------------- POLÍTICAS PÚBLICAS DE SAÚDE (10) ----------------
q("S","Constituição Federal","Conforme o art. 196 da Constituição Federal, a saúde é",
 ["direito de quem contribui para a Previdência Social e dever do Estado.",
  "direito de todos e dever do Estado, garantido mediante políticas sociais e econômicas.",
  "dever exclusivo dos municípios, com apoio complementar da União.",
  "serviço gratuito destinado apenas à população de baixa renda."],1,
 "Art. 196 da CF: “A saúde é direito de todos e dever do Estado, garantido mediante políticas sociais e econômicas que visem à redução do risco de doença e de outros agravos e ao acesso universal e igualitário às ações e serviços para sua promoção, proteção e recuperação.” O acesso é universal, e não vinculado à contribuição ou à renda.")
q("S","Constituição Federal","O art. 198 da Constituição Federal organiza as ações e serviços públicos de saúde em rede regionalizada e hierarquizada, com diretrizes. NÃO é uma dessas diretrizes:",
 ["descentralização, com direção única em cada esfera de governo.",
  "atendimento integral, com prioridade para as atividades preventivas, sem prejuízo dos serviços assistenciais.",
  "participação da comunidade.",
  "centralização da gestão no Ministério da Saúde, para garantir uniformidade."],3,
 "As três diretrizes do art. 198 são: descentralização com direção única em cada esfera de governo, atendimento integral e participação da comunidade. A centralização contraria a diretriz de descentralização.")
q("S","Constituição Federal","Sobre a participação da iniciativa privada no SUS, segundo o art. 199 da Constituição Federal, é correto afirmar:",
 ["Instituições privadas podem participar de forma complementar, mediante contrato de direito público ou convênio, com preferência às entidades filantrópicas e às sem fins lucrativos.",
  "É permitida a destinação de recursos públicos para auxílios e subvenções a instituições privadas com fins lucrativos.",
  "Empresas de capital estrangeiro podem participar livremente da assistência à saúde no país.",
  "A assistência à saúde é atividade exclusiva do poder público."],0,
 "Art. 199: a assistência à saúde é livre à iniciativa privada (D errada); a participação no SUS é complementar, por contrato de direito público ou convênio, com preferência às filantrópicas e sem fins lucrativos (§1º). É vedada a destinação de recursos públicos para auxílios ou subvenções a instituições privadas com fins lucrativos (§2º) e a participação de empresas ou capitais estrangeiros, salvo nos casos previstos em lei (§3º).")
q("S","Lei 8.080/1990","Segundo a Lei nº 8.080/1990, o conjunto de ações que proporciona o conhecimento, a detecção ou a prevenção de qualquer mudança nos fatores determinantes e condicionantes da saúde individual ou coletiva, com a finalidade de recomendar e adotar medidas de prevenção e controle das doenças ou agravos, denomina-se",
 ["vigilância sanitária.","vigilância epidemiológica.","saúde do trabalhador.","assistência farmacêutica."],1,
 "É a definição de vigilância epidemiológica (art. 6º, §2º). A vigilância sanitária (§1º) é o conjunto de ações capaz de eliminar, diminuir ou prevenir riscos à saúde e de intervir nos problemas sanitários do meio ambiente, da produção e circulação de bens e da prestação de serviços de interesse da saúde.")
q("S","Lei 8.080/1990","Entre os princípios do SUS previstos no art. 7º da Lei nº 8.080/1990, aquele que assegura o respeito à decisão das pessoas na defesa de sua integridade física e moral é o da",
 ["universalidade de acesso aos serviços de saúde.","integralidade de assistência.","preservação da autonomia das pessoas.","conjugação dos recursos financeiros."],2,
 "Art. 7º, III: “preservação da autonomia das pessoas na defesa de sua integridade física e moral”. Universalidade (I) trata do acesso a todos os níveis; integralidade (II) trata do conjunto articulado de ações preventivas e curativas; a conjugação de recursos (XI) refere-se à gestão financeira, tecnológica e humana.")
q("S","Lei 8.142/1990","De acordo com a Lei nº 8.142/1990, a Conferência de Saúde",
 ["reúne-se a cada quatro anos, com representação dos vários segmentos sociais, para avaliar a situação de saúde e propor diretrizes.",
  "tem caráter permanente e deliberativo e se reúne mensalmente.",
  "é formada apenas por gestores e prestadores de serviço.",
  "é convocada exclusivamente pelo Ministério Público."],0,
 "Art. 1º, §1º: a Conferência de Saúde reúne-se a cada quatro anos, com representação dos vários segmentos sociais, para avaliar a situação de saúde e propor diretrizes para a política de saúde. É convocada pelo Poder Executivo ou, extraordinariamente, por ela própria ou pelo Conselho de Saúde. O caráter permanente e deliberativo é do Conselho de Saúde (§2º).")
q("S","Lei Brasileira de Inclusão","Segundo a Lei nº 13.146/2015 (Lei Brasileira de Inclusão), considera-se pessoa com deficiência aquela que",
 ["tem qualquer limitação temporária de saúde que a afaste do trabalho.",
  "tem impedimento de longo prazo de natureza física, mental, intelectual ou sensorial, o qual, em interação com uma ou mais barreiras, pode obstruir sua participação plena e efetiva na sociedade.",
  "possui laudo médico que comprove incapacidade total e permanente para a vida civil.",
  "depende integralmente de cuidador para as atividades da vida diária."],1,
 "É a definição do art. 2º da LBI. O conceito é biopsicossocial: a deficiência resulta da interação entre o impedimento de longo prazo e as barreiras do ambiente. Não depende de limitação temporária, de incapacidade total nem de dependência integral.")
q("S","Política Nacional de Humanização","Na Política Nacional de Humanização (HumanizaSUS), o acolhimento",
 ["é uma triagem administrativa realizada na recepção para definir a ordem de chegada.",
  "é um espaço físico específico do serviço, com profissional exclusivo.",
  "é uma postura ética de reconhecer o que o outro traz como legítima e singular necessidade de saúde, com escuta qualificada.",
  "dispensa a participação dos trabalhadores, pois é atribuição exclusiva da gestão."],2,
 "Na PNH, acolher é reconhecer o que o outro traz como legítima e singular necessidade de saúde; é uma postura ética, com escuta qualificada, que deve estar presente em todos os momentos do cuidado. Não se reduz a triagem, a um local específico nem a uma tarefa só da gestão.")
q("S","Estatuto da Pessoa Idosa","Segundo o Estatuto da Pessoa Idosa (Lei nº 10.741/2003), à pessoa idosa internada ou em observação",
 ["é assegurado o direito a acompanhante, devendo o órgão de saúde proporcionar condições adequadas para a sua permanência em tempo integral, segundo o critério médico.",
  "o acompanhante é permitido apenas para maiores de 80 anos.",
  "o acompanhante só é permitido durante o horário de visitas.",
  "o direito a acompanhante depende de autorização judicial."],0,
 "Art. 16 do Estatuto: à pessoa idosa internada ou em observação é assegurado o direito a acompanhante, cabendo ao órgão de saúde proporcionar as condições adequadas para a permanência em tempo integral, segundo o critério médico. O direito vale a partir dos 60 anos e não depende de autorização judicial.")
q("S","Saúde da População Negra","A Política Nacional de Saúde Integral da População Negra (Portaria nº 992/2009) tem como marca",
 ["o reconhecimento do racismo, das desigualdades étnico-raciais e do racismo institucional como determinantes sociais das condições de saúde.",
  "a criação de serviços de saúde exclusivos para a população negra, separados da rede do SUS.",
  "a substituição das demais políticas do SUS por ações específicas de base étnico-racial.",
  "o atendimento prioritário apenas às doenças de origem genética, como a doença falciforme."],0,
 "A política reconhece o racismo, as desigualdades étnico-raciais e o racismo institucional como determinantes sociais de saúde, com vistas à promoção da equidade. Ela atua de forma transversal na rede do SUS, sem criar serviços segregados nem substituir outras políticas, e vai além da doença falciforme.")

# ---------------- INFORMÁTICA (5) ----------------
q("I","Windows","No Windows 10 e no Windows 11, o atalho de teclado que abre diretamente o Gerenciador de Tarefas é",
 ["Ctrl + Shift + Esc","Ctrl + Alt + Tab","Windows + D","Alt + F4"],0,
 "Ctrl + Shift + Esc abre o Gerenciador de Tarefas. Windows + D mostra/oculta a área de trabalho; Alt + F4 fecha a janela ativa; Ctrl + Alt + Tab mostra as janelas abertas para alternar entre elas.")
q("I","Windows","No Explorador de Arquivos do Windows, selecionar um arquivo e pressionar Shift + Delete faz com que ele seja",
 ["enviado para a Lixeira, de onde pode ser restaurado.","excluído permanentemente, sem passar pela Lixeira.","copiado para a área de transferência.","renomeado."],1,
 "Shift + Delete exclui o arquivo permanentemente, sem enviá-lo para a Lixeira (o Windows pede confirmação). Apenas Delete envia para a Lixeira; Ctrl + C copia; F2 renomeia.")
q("I","Excel","Em uma planilha do Microsoft Excel 2019, as células A1, A2 e A3 contêm, respectivamente, os valores 10, 20 e 30. O resultado da fórmula =MÉDIA(A1:A3)*2 é",
 ["20","30","40","60"],2,
 "MÉDIA(A1:A3) = (10 + 20 + 30) ÷ 3 = 20. Multiplicando por 2, o resultado é 40. O valor 60 seria a soma (=SOMA(A1:A3)); 20 é só a média, sem a multiplicação.")
q("I","Word","No Microsoft Word 2019, a ferramenta Pincel de Formatação, da guia Página Inicial, serve para",
 ["desenhar formas livres sobre o documento.","copiar a formatação de um trecho e aplicá-la em outro.","remover toda a formatação do documento.","corrigir automaticamente a ortografia."],1,
 "O Pincel de Formatação copia a formatação (fonte, cor, tamanho, estilo) de um trecho selecionado e aplica em outro. Formas são inseridas pela guia Inserir; “Limpar Toda a Formatação” é outro botão; a revisão ortográfica fica na guia Revisão.")
q("I","Inteligência artificial","Uma ferramenta de inteligência artificial generativa respondeu, com segurança e boa redação, a uma dúvida sobre a dose de um medicamento. A conduta adequada é",
 ["seguir a resposta, pois textos bem escritos indicam informação confiável.",
  "conferir a informação em fontes oficiais e confiáveis, pois a IA pode gerar respostas incorretas com aparência de verdade.",
  "compartilhar a resposta com a equipe, já que a IA não comete erros de cálculo.",
  "inserir dados pessoais do paciente na ferramenta para obter uma resposta mais precisa."],1,
 "Modelos de IA generativa podem produzir informações erradas apresentadas com convicção (as chamadas “alucinações”). Por isso, é preciso verificar em fontes oficiais. Inserir dados pessoais de pacientes em ferramentas externas fere a privacidade e a proteção de dados.")

# ---------------- CONHECIMENTOS ESPECÍFICOS (25) ----------------
q("E","Estrutura do centro cirúrgico","Quanto à divisão do centro cirúrgico em áreas, a sala de operação é classificada como área",
 ["irrestrita.","semirrestrita.","restrita.","de apoio administrativo."],2,
 "A sala de operação (assim como os lavabos) é área restrita, onde se exigem roupa privativa, gorro e máscara. Corredores internos e salas de guarda de material são semirrestritos; vestiários, recepção e sala de espera são irrestritos.")
q("E","Cirurgia segura","No checklist de cirurgia segura da OMS, adotado pelo Programa Nacional de Segurança do Paciente, a confirmação da contagem de instrumentais, compressas e agulhas é realizada",
 ["antes da indução anestésica.","antes da incisão cirúrgica.","antes de o paciente sair da sala de operação.","somente na sala de recuperação pós-anestésica."],2,
 "O checklist tem três momentos: antes da indução anestésica (identificação, sítio, consentimento), antes da incisão (pausa cirúrgica, apresentação da equipe) e antes de o paciente sair da sala (confirmação do procedimento, contagem de instrumentais, compressas e agulhas, identificação de amostras e problemas com equipamentos).")
q("E","Tempos cirúrgicos","A sequência correta dos tempos cirúrgicos fundamentais é",
 ["hemostasia, diérese, síntese e exérese.","diérese, hemostasia, exérese e síntese.","exérese, diérese, hemostasia e síntese.","diérese, síntese, hemostasia e exérese."],1,
 "Diérese (abertura/separação dos tecidos), hemostasia (controle do sangramento), exérese (tempo principal, retirada ou correção da estrutura) e síntese (aproximação e fechamento dos tecidos).")
q("E","Instrumentação cirúrgica","O afastador de Farabeuf pertence ao grupo de instrumentais de",
 ["diérese.","preensão.","hemostasia.","afastamento."],3,
 "Farabeuf é afastador manual, usado para expor o campo operatório. Exemplos dos outros grupos: diérese (bisturi, tesoura de Metzenbaum), preensão (pinça de Allis, pinça anatômica), hemostasia (pinças de Kelly, Crile, Halsted).")
q("E","Fios cirúrgicos","Em relação ao calibre dos fios cirúrgicos, é correto afirmar que",
 ["o fio 2-0 é mais fino que o fio 5-0.","quanto maior o número de zeros, mais fino é o fio.","o calibre não interfere na resistência do fio.","fios de calibre 6-0 são indicados para fechamento de aponeurose."],1,
 "Na escala de calibres, quanto mais zeros, mais fino o fio: 5-0 é mais fino que 2-0. Fios mais finos têm menor resistência e são usados em tecidos delicados (pele de face, vasos); fios mais grossos, em estruturas que exigem maior resistência, como aponeurose.")
q("E","Posicionamento cirúrgico","Para uma cirurgia de coluna lombar por via posterior, a posição cirúrgica habitualmente utilizada é a",
 ["supina (decúbito dorsal).","prona (decúbito ventral).","litotômica.","Trendelenburg."],1,
 "Na via posterior da coluna, o paciente fica em prona (decúbito ventral), com coxins que protegem tórax, pelve e proeminências e deixam o abdome livre. A litotômica é usada em procedimentos perineais, ginecológicos e urológicos; a Trendelenburg (cabeça mais baixa que os pés), em cirurgias pélvicas e abdominais baixas.")
q("E","Eletrocirurgia","Sobre a placa dispersiva (placa neutra) do bisturi elétrico monopolar, é INCORRETO afirmar:",
 ["Deve ser aplicada em área muscular e bem vascularizada, próxima ao sítio cirúrgico.",
  "A pele deve estar limpa e seca, sem excesso de pelos no local.",
  "Pode ser posicionada sobre proeminências ósseas, cicatrizes ou próteses metálicas, desde que bem aderida.",
  "Placa mal aderida aumenta o risco de queimadura no paciente."],2,
 "A placa deve ficar sobre massa muscular bem vascularizada, próxima ao sítio, em pele limpa, seca e sem pelos em excesso. Proeminências ósseas, cicatrizes e próteses metálicas devem ser evitadas, porque concentram a corrente e aumentam o risco de queimadura.")
q("E","Degermação das mãos","Durante a degermação cirúrgica das mãos e antebraços, o profissional deve",
 ["manter as mãos abaixo do nível dos cotovelos, para a água escorrer em direção às mãos.",
  "manter as mãos acima do nível dos cotovelos, para a água escorrer das mãos para os cotovelos.",
  "iniciar a fricção pelos cotovelos e terminar nas pontas dos dedos.",
  "secar as mãos com papel-toalha comum antes de vestir o avental estéril."],1,
 "As mãos ficam acima dos cotovelos, para que a água escorra das áreas mais limpas (mãos) para as menos limpas (cotovelos). A fricção começa pelas unhas e mãos e segue para os antebraços. A secagem é feita com compressa estéril.")
q("E","Recuperação pós-anestésica","A escala de Aldrete e Kroulik, utilizada na sala de recuperação pós-anestésica, avalia atividade motora, respiração, circulação, consciência e saturação de oxigênio. NÃO faz parte dessa escala a avaliação da",
 ["consciência.","circulação (pressão arterial).","temperatura corporal.","respiração."],2,
 "A escala modificada de Aldrete e Kroulik pontua de 0 a 2 cinco parâmetros: atividade, respiração, circulação, consciência e saturação de O₂ (total de 0 a 10). A temperatura é monitorada na SRPA, mas não compõe a escala.")
q("E","Recuperação pós-anestésica","A escala de Bromage é utilizada na sala de recuperação para avaliar",
 ["o nível de sedação do paciente.","o grau de bloqueio motor dos membros inferiores após raquianestesia ou peridural.","a intensidade da dor pós-operatória.","o risco de lesão por pressão."],1,
 "Bromage avalia o bloqueio motor dos membros inferiores após anestesia neuroaxial (raqui ou peridural), ajudando a acompanhar a regressão do bloqueio. Sedação é avaliada pela escala de Ramsay; a dor, por escalas como a numérica ou a visual analógica; o risco de lesão por pressão, pela escala de Braden.")
q("E","Complicações na SRPA","Na sala de recuperação, um paciente ainda sonolento após anestesia geral apresenta náuseas e começa a vomitar. A conduta imediata do técnico de enfermagem é",
 ["elevar os membros inferiores e oferecer água.","lateralizar a cabeça (ou o paciente, se não houver contraindicação), aspirar se necessário e comunicar o enfermeiro.","manter o paciente em decúbito dorsal e aguardar o término do episódio.","administrar antiemético sem prescrição, para agilizar o atendimento."],1,
 "Com o nível de consciência reduzido, o risco de broncoaspiração é alto: lateraliza-se a cabeça ou o paciente, mantém-se o aspirador pronto e comunica-se o enfermeiro. Medicamentos só podem ser administrados com prescrição. Oferecer água a paciente sonolento e manter decúbito dorsal aumentam o risco de aspiração.")
q("E","Complicações anestésicas","A cefaleia pós-punção dural, complicação que pode ocorrer após raquianestesia, caracteriza-se tipicamente por",
 ["dor que melhora na posição sentada ou em pé e piora deitado.","dor que piora na posição sentada ou em pé e melhora em decúbito.","dor exclusivamente no local da punção, sem relação com a posição.","início imediato na sala de cirurgia, antes do término do procedimento."],1,
 "A cefaleia pós-punção dural é postural: piora ao sentar ou levantar e alivia com o paciente deitado, por causa da perda de líquor pelo orifício da punção. Costuma surgir horas a poucos dias após o procedimento, e não durante a cirurgia.")
q("E","Classificação dos artigos","Segundo a classificação de Spaulding, adotada no CME, a lâmina de laringoscópio é um artigo",
 ["crítico, pois penetra tecidos estéreis.","semicrítico, pois entra em contato com mucosa íntegra.","não crítico, pois entra em contato apenas com pele íntegra.","descartável, não podendo ser reprocessada."],1,
 "Artigos semicríticos entram em contato com mucosa íntegra ou pele não íntegra e exigem, no mínimo, desinfecção (de alto nível, em geral). Críticos penetram tecidos estéreis ou o sistema vascular e devem ser esterilizados (ex.: instrumental cirúrgico); não críticos têm contato só com pele íntegra (ex.: estetoscópio).")
q("E","Centro de material e esterilização","No CME, o fluxo de trabalho deve ser unidirecional, seguindo a sequência",
 ["armazenamento → esterilização → preparo → recepção e limpeza.","recepção e limpeza → preparo e acondicionamento → esterilização → armazenamento e distribuição.","preparo → recepção e limpeza → armazenamento → esterilização.","esterilização → recepção e limpeza → preparo → distribuição."],1,
 "O fluxo é unidirecional, do sujo para o limpo, sem cruzamento de artigos contaminados com processados: recepção e limpeza (área suja) → preparo e acondicionamento → esterilização → armazenamento e distribuição (RDC ANVISA nº 15/2012).")
q("E","Monitorização da esterilização","O teste de Bowie-Dick é realizado em autoclaves com pré-vácuo para avaliar",
 ["a presença de microrganismos sobreviventes após o ciclo.","a eficácia da remoção do ar e da penetração do vapor na câmara.","a temperatura das embalagens após o resfriamento.","a umidade relativa do ambiente de armazenamento."],1,
 "O Bowie-Dick verifica a remoção do ar e a penetração uniforme do vapor em autoclaves com bomba de vácuo. Deve ser feito diariamente, no primeiro ciclo do dia, com a câmara vazia e após o aquecimento. A presença de microrganismos sobreviventes é avaliada pelo indicador biológico.")
q("E","Monitorização da esterilização","O microrganismo utilizado no indicador biológico para monitorar a esterilização por vapor saturado sob pressão é o",
 ["Bacillus atrophaeus.","Geobacillus stearothermophilus.","Staphylococcus aureus.","Escherichia coli."],1,
 "Para vapor saturado sob pressão (e para plasma de peróxido de hidrogênio) usa-se o Geobacillus stearothermophilus. O Bacillus atrophaeus é usado para óxido de etileno e calor seco. S. aureus e E. coli não são indicadores biológicos de esterilização.")
q("E","Métodos de esterilização","Na esterilização por plasma de peróxido de hidrogênio, NÃO podem ser utilizados materiais e embalagens à base de",
 ["polipropileno.","celulose, como papel grau cirúrgico e tecido de algodão.","Tyvek® (polietileno de alta densidade).","plástico termorresistente."],1,
 "A celulose (papel, papel grau cirúrgico, tecido de algodão) absorve o peróxido de hidrogênio e inviabiliza o ciclo. No plasma usam-se embalagens sintéticas, como Tyvek® ou não tecido de polipropileno. Líquidos e pós também não são compatíveis com o método.")
q("E","Resíduos de serviços de saúde","De acordo com a RDC ANVISA nº 222/2018, agulhas, lâminas de bisturi e ampolas de vidro pertencem ao grupo",
 ["A.","B.","D.","E."],3,
 "O grupo E reúne os materiais perfurocortantes ou escarificantes (agulhas, lâminas de bisturi, ampolas de vidro, lancetas), descartados em recipiente rígido, resistente à punctura e à ruptura. O grupo A reúne os resíduos com possível presença de agentes biológicos; o B, os químicos; o C, os radioativos; o D, os comuns.")
q("E","NR-32","Segundo a NR-32, em relação às agulhas utilizadas na assistência, é vedado(a)",
 ["o descarte em recipiente rígido próprio para perfurocortantes.","o reencape e a desconexão manual de agulhas.","o uso de dispositivos de segurança.","a substituição do coletor quando atingir o limite de enchimento."],1,
 "A NR-32 proíbe o reencape e a desconexão manual de agulhas, principais causas de acidentes percutâneos. O descarte em coletor rígido, os dispositivos de segurança e a troca do coletor no limite de enchimento são práticas corretas.")
q("E","Acidente com material biológico","Após um acidente percutâneo com agulha contaminada com sangue de paciente, a primeira conduta recomendada ao profissional é",
 ["espremer o local para eliminar o sangue e aplicar hipoclorito de sódio.","lavar o local com água e sabão, sem espremer, comunicar a chefia e procurar atendimento o mais rápido possível.","aguardar o resultado da sorologia do paciente antes de qualquer cuidado.","cobrir o ferimento e procurar atendimento somente se surgirem sintomas."],1,
 "Lava-se a área com água e sabão (mucosas, com água ou soro fisiológico), sem espremer e sem substâncias cáusticas. O acidente deve ser comunicado e avaliado com urgência: a profilaxia pós-exposição ao HIV, quando indicada, deve começar idealmente nas primeiras 2 horas e no máximo em 72 horas.")
q("E","Cálculo de medicações","Foi prescrito soro fisiológico 0,9%, 500 mL, para correr em 8 horas. Utilizando equipo de macrogotas, o gotejamento aproximado será de",
 ["7 gotas/min.","14 gotas/min.","21 gotas/min.","63 gotas/min."],2,
 "Macrogotas: gotas/min = volume (mL) ÷ (tempo em horas × 3) = 500 ÷ (8 × 3) = 500 ÷ 24 ≈ 20,8 ≈ 21 gotas/min. Em microgotas seria volume ÷ tempo = 500 ÷ 8 ≈ 63 microgotas/min (a pegadinha da alternativa D).")
q("E","Cálculo de medicações","Foi prescrito 300 mg de um antibiótico. O frasco-ampola contém 1 g do pó, que deve ser diluído em 10 mL de água destilada. O volume a ser aspirado após a diluição é de",
 ["0,3 mL.","3 mL.","3,3 mL.","30 mL."],1,
 "1 g = 1.000 mg em 10 mL → concentração de 100 mg/mL. Para 300 mg: 300 ÷ 100 = 3 mL. Ou pela regra de três: 1.000 mg está para 10 mL assim como 300 mg está para x; x = 3 mL.")
q("E","Parada cardiorrespiratória","Na ressuscitação cardiopulmonar de um adulto sem via aérea avançada, as compressões torácicas de alta qualidade devem ser realizadas",
 ["na frequência de 60 a 80 por minuto, com profundidade de 2 a 3 cm.","na frequência de 100 a 120 por minuto, com profundidade de 5 a 6 cm, na relação de 30 compressões para 2 ventilações.","na frequência de 100 a 120 por minuto, na relação de 15 compressões para 2 ventilações, com um socorrista.","sem permitir o retorno completo do tórax entre as compressões, para manter a pressão."],1,
 "No adulto: 100 a 120 compressões/min, profundidade de 5 a 6 cm, retorno completo do tórax, mínimo de interrupções e relação 30:2 sem via aérea avançada (com um ou dois socorristas). A relação 15:2 é usada em crianças com dois socorristas.")
q("E","Lei do exercício profissional","De acordo com a Lei nº 7.498/1986, é atividade privativa do enfermeiro, NÃO podendo ser realizada pelo técnico de enfermagem:",
 ["a verificação de sinais vitais.","a prescrição da assistência de enfermagem.","a realização de curativos.","o registro de informações no prontuário."],1,
 "O art. 11, I, da Lei nº 7.498/1986 lista como privativos do enfermeiro, entre outros, a consulta de enfermagem, a prescrição da assistência de enfermagem e os cuidados diretos a pacientes graves com risco de vida. Sinais vitais, curativos e registros fazem parte da atuação do técnico, sob supervisão do enfermeiro.")
q("E","Queimaduras","Pela regra dos nove, um adulto com queimadura em todo o membro inferior direito e em toda a face anterior do tronco tem superfície corporal queimada de aproximadamente",
 ["18%.","27%.","36%.","45%."],2,
 "Regra dos nove (adulto): cabeça e pescoço 9%, cada membro superior 9%, cada membro inferior 18%, tronco anterior 18%, tronco posterior 18% e períneo 1%. Membro inferior direito (18%) + tronco anterior (18%) = 36%.")

assert len(Q) == 50, len(Q)
from collections import Counter
cont = Counter(x["d"] for x in Q)
assert cont == {"P":10,"S":10,"I":5,"E":25}, cont
for x in Q:
    assert len(x["o"]) == 4 and 0 <= x["c"] < 4, x["id"]
gab = Counter(x["c"] for x in Q)
print("distribuição do gabarito (A,B,C,D):", [gab[i] for i in range(4)])
data = {"sims":[{"n":1,"tema":"Prova completa no formato do edital","texto":TEXTO,"q":Q}]}
json.dump(data, open(sys.argv[1],"w",encoding="utf-8"), ensure_ascii=False, separators=(",",":"))
print("ok", len(Q))

# ---- equilibra o gabarito (sem mexer em questões cujo comentário cita letra de alternativa) ----
import re
def equilibrar(questoes):
    uso = [0,0,0,0]
    fixas = [x for x in questoes if re.search(r'\(([A-D])\)|alternativa [A-D]', x["x"])]
    for x in fixas: uso[x["c"]] += 1
    for x in questoes:
        if x in fixas: continue
        alvo = min(range(4), key=lambda i: (uso[i], (i - x["c"]) % 4 == 0))
        if alvo != x["c"]:
            certa = x["o"][x["c"]]
            outras = [o for i,o in enumerate(x["o"]) if i != x["c"]]
            outras.insert(alvo, certa)
            x["o"] = outras; x["c"] = alvo
        uso[x["c"]] += 1
    return uso
uso = equilibrar(Q)
print("gabarito equilibrado (A,B,C,D):", uso)
data = {"sims":[{"n":1,"tema":"Prova completa no formato do edital","texto":TEXTO,"q":Q}]}
json.dump(data, open(sys.argv[1],"w",encoding="utf-8"), ensure_ascii=False, separators=(",",":"))
