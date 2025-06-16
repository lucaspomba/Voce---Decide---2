const caixaInicio = document.querySelector(".caixa-inicio");
const caixaJogo = document.querySelector(".caixa-jogo");
const inputNome = document.getElementById("nomeJogador");

const caixaPerguntas = document.querySelector(".caixa-perguntas");
const caixaAlternativas = document.querySelector(".caixa-alternativas");
const textoResultado = document.querySelector(".texto-resultado");
const botaoReiniciar = document.getElementById("botaoReiniciar");
const musicaFundo = document.getElementById("musicaFundo");

let nome = "";
let atual = 0;
let historiaFinal = "";
let escolheuRuim = false; // Para controlar se escolheu uma alternativa ruim

function iniciarJogo() {
    nome = inputNome.value.trim();
    if (nome === "") {
        alert("Digite seu nome para começar!");
        return;
    }

    perguntas = personalizarPerguntas(perguntasBase, nome);
    caixaInicio.style.display = "none";
    caixaJogo.style.display = "block";
    historiaFinal = "";
    atual = 0;
    escolheuRuim = false;
    botaoReiniciar.style.display = "none";

    musicaFundo.play().catch(() => {
        // Pode falhar se não houver interação do usuário antes, mas já tem clique no botão
    });

    mostraPergunta();
}

// Define as perguntas COM as alternativas ruins adicionadas
const perguntasBase = [
    {
        enunciado: "É o ano de 2035. Você foi eleito prefeito de Guairaçá. Qual será sua prioridade de governo?",
        alternativas: [
            {
                texto: "Investir em tecnologia e internet para conectar os jovens ao futuro.",
                afirmacao: "Transformou Guairaçá em referência digital no Paraná. Jovens começaram a empreender e a cidade ganhou visibilidade."
            },
            {
                texto: "Valorizar a agricultura familiar e os produtores locais.",
                afirmacao: "Investiu no campo, garantindo apoio aos agricultores e fortalecendo a economia rural da cidade."
            },
            {
                texto: "Melhorar a infraestrutura básica da cidade (ruas, iluminação, saneamento).",
                afirmacao: "Melhorou a infraestrutura da cidade, atraindo novos moradores e comércios."
            },
            {
                texto: "Ignorar as prioridades e focar em projetos pessoais.",
                afirmacao: "Desatento às necessidades da população, a cidade sofreu estagnação e perda de confiança.",
                ruim: true
            }
        ]
    },
    {
        enunciado: "Uma empresa quer instalar turbinas eólicas nos arredores da cidade. O que você decide?",
        alternativas: [
            {
                texto: "Aprovar o projeto e garantir retorno financeiro para a cidade.",
                afirmacao: "Com a renda gerada, a cidade investiu em saúde e educação, apesar das críticas visuais."
            },
            {
                texto: "Recusar o projeto e propor alternativas sustentáveis com menor impacto visual.",
                afirmacao: "Priorizou o meio ambiente e atraiu turismo ecológico e universitários para a região."
            },
            {
                texto: "Realizar uma audiência pública com a população antes de decidir.",
                afirmacao: "A decisão foi compartilhada com a população, aumentando a confiança no governo."
            },
            {
                texto: "Permitir o projeto sem avaliação e ignorar protestos.",
                afirmacao: "A cidade enfrentou protestos e danos ambientais, prejudicando a imagem do governo.",
                ruim: true
            }
        ]
    },
    {
        enunciado: "Falta de médicos no posto de saúde. Qual solução você propõe?",
        alternativas: [
            {
                texto: "Oferecer bolsas e moradia para jovens médicos atuarem em Guairaçá.",
                afirmacao: "Novos médicos chegaram e a saúde pública melhorou bastante."
            },
            {
                texto: "Firmar convênios com cidades vizinhas para atendimento emergencial.",
                afirmacao: "Garantiu atendimentos emergenciais, mas a população ainda espera por melhorias permanentes."
            },
            {
                texto: "Investir em atendimento remoto com tecnologia e IA.",
                afirmacao: "Usou tecnologia para expandir o atendimento, mesmo com poucos profissionais disponíveis."
            },
            {
                texto: "Não tomar nenhuma medida e deixar o problema para depois.",
                afirmacao: "A falta de médicos piorou, causando insatisfação e crises frequentes na saúde.",
                ruim: true
            }
        ]
    },
    {
        enunciado: "Com verba extra do estado, você precisa decidir onde investir. Qual a escolha?",
        alternativas: [
            {
                texto: "Construir uma praça moderna com espaço cultural e wi-fi gratuito.",
                afirmacao: "A praça construída virou ponto de encontro e orgulho local."
            },
            {
                texto: "Reformar estradas vicinais para escoar produção rural.",
                afirmacao: "A economia rural floresceu com as reformas, aumentando a renda no campo."
            },
            {
                texto: "Equipar as escolas públicas com computadores e projetores.",
                afirmacao: "As escolas públicas passaram a oferecer ensino mais moderno e interativo."
            },
            {
                texto: "Desviar a verba para gastos não relacionados à cidade.",
                afirmacao: "A população percebeu a má gestão e a confiança no governo caiu drasticamente.",
                ruim: true
            }
        ]
    },
    {
        enunciado: "Uma escola propõe usar IA em sala. Qual decisão você toma?",
        alternativas: [
            {
                texto: "Apoiar com formação para professores e alunos.",
                afirmacao: "Transformou a educação da cidade, com alunos se destacando nacionalmente."
            },
            {
                texto: "Adiar a proposta e focar em infraestrutura básica primeiro.",
                afirmacao: "Com escolas reformadas, preparou terreno para futuras inovações na educação."
            },
            {
                texto: "Aplicar um projeto-piloto em apenas uma escola antes de expandir.",
                afirmacao: "Testou a proposta e identificou pontos de melhoria antes de expandir o projeto."
            },
            {
                texto: "Rejeitar a ideia e manter métodos antigos.",
                afirmacao: "A educação da cidade ficou defasada, e estudantes perderam oportunidades.",
                ruim: true
            }
        ]
    },
    {
        enunciado: "A população jovem pede mais apoio ao esporte. O que você decide?",
        alternativas: [
            {
                texto: "Reformar o estádio municipal e apoiar torneios locais.",
                afirmacao: "As reformas incentivaram a prática esportiva e revelaram talentos da cidade."
            },
            {
                texto: "Criar uma escolinha de esportes para crianças e adolescentes.",
                afirmacao:"Com escolinhas, o esporte virou atividade popular e saudável para a juventude."
            },
            {
                texto: "Apoiar apenas esportes tradicionais e ignorar novas modalidades.",
                afirmacao: "Alguns jovens se sentiram excluídos, reduzindo o engajamento esportivo.",
                ruim: true
            },
            {
                texto: "Não investir em esporte, focando em outras áreas.",
                afirmacao: "A falta de investimento afastou jovens e impactou negativamente a saúde pública.",
                ruim: true
            }
        ]
    }
];

// Função para substituir 'nome' nas perguntas e respostas
function personalizarPerguntas(perguntas, nome) {
    return perguntas.map(pergunta => {
        let enunciado = pergunta.enunciado.replace("{nome}", nome);
        let alternativas = pergunta.alternativas.map(alt => {
            return {
                texto: alt.texto.replace("{nome}", nome),
                afirmacao: alt.afirmacao.replace("{nome}", nome),
                ruim: alt.ruim || false
            };
        });
        return { enunciado, alternativas };
    });
}

function mostraPergunta() {
    const perguntaAtual = perguntas[atual];
    caixaPerguntas.textContent = perguntaAtual.enunciado;
    caixaAlternativas.innerHTML = "";

    perguntaAtual.alternativas.forEach((alt, i) => {
        const botao = document.createElement("button");
        botao.textContent = alt.texto;
        botao.onclick = () => escolheAlternativa(i);
        caixaAlternativas.appendChild(botao);
    });
}

function escolheAlternativa(indice) {
    const alternativa = perguntas[atual].alternativas[indice];

    historiaFinal += `Pergunta ${atual + 1}: ${alternativa.afirmacao}\n\n`;

    if (alternativa.ruim) {
        escolheuRuim = true;
    }

    atual++;
    if (atual < perguntas.length) {
        mostraPergunta();
    } else {
        mostraResultado();
    }
}

function mostraResultado() {
    caixaPerguntas.style.display = "none";
    caixaAlternativas.style.display = "none";
    textoResultado.style.display = "block";
    botaoReiniciar.style.display = "inline-block";

    let mensagemFinal = "";

    if (escolheuRuim) {
        mensagemFinal = `Infelizmente, algumas decisões prejudicaram Guairaçá. 
        Isso afetou a confiança da população e trouxe desafios para o futuro da cidade. 
        Como prefeito, você precisa refletir sobre suas escolhas e buscar melhorias.`;
    } else {
        mensagemFinal = `Parabéns, prefeito ${nome}! Suas decisões acertadas fizeram Guairaçá prosperar. 
        A cidade cresceu em tecnologia, educação, saúde e qualidade de vida, conquistando reconhecimento estadual.`;
    }

    textoResultado.textContent = mensagemFinal;
}

function reiniciarJogo() {
    atual = 0;
    historiaFinal = "";
    escolheuRuim = false;
    textoResultado.textContent = "";
    textoResultado.style.display = "none";
    botaoReiniciar.style.display = "none";
    caixaPerguntas.style.display = "block";
    caixaAlternativas.style.display = "block";

    caixaInicio.style.display = "block";
    caixaJogo.style.display = "none";

    inputNome.value = "";
    musicaFundo.pause();
    musicaFundo.currentTime = 0;
}

