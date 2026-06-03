// Perguntas do Quiz
const questions = [
    {
        question: "Na hora de produzir ou consumir alimentos, o que é mais importante para você?",
        A: "Usar o máximo de tecnologia e robótica para evitar desperdícios.",
        B: "Garantir que a produção respeite a natureza e proteja o meio ambiente."
    },
    {
        question: "Como você vê o uso de drones no campo e no futebol?",
        A: "Uma ferramenta fantástica de inovação para mapear dados e melhorar táticas.",
        B: "Uma forma inteligente de economizar recursos (água no campo / energia no estádio)."
    },
    {
        question: "Qual o seu principal objetivo para o futuro das cidades e do campo?",
        A: "Conectar tudo através de robótica, sensores e Inteligência Artificial.",
        B: "Criar um ciclo sustentável onde o campo alimenta a cidade sem esgotar o planeta."
    }
];

let currentQuestionIndex = 0;
let scoreA = 0;
let scoreB = 0;

// Carrega a pergunta atual nos elementos do HTML
function loadQuestion() {
    if (currentQuestionIndex < questions.length) {
        const currentQuestion = questions[currentQuestionIndex];
        
        // Atualiza o texto da pergunta
        document.getElementById("question-text").innerText = currentQuestion.question;
        
        // Atualiza o texto dos botões
        const buttons = document.querySelectorAll(".option-btn");
        buttons[0].innerText = currentQuestion.A;
        buttons[1].innerText = currentQuestion.B;
    } else {
        // Se responder todas, mostra o resultado
        showResult();
    }
}

// Avança para a próxima pergunta e soma a pontuação
function nextQuestion(answer) {
    if (answer === 'A') {
        scoreA++;
    } else if (answer === 'B') {
        scoreB++;
    }

    // Avança o contador
    currentQuestionIndex++;
    
    // Chama a próxima pergunta
    loadQuestion();
}

// Exibe o resultado final alterando o container do quiz
function showResult() {
    let resultTitle = "";
    let resultDescription = "";

    if (scoreA > scoreB) {
        resultTitle = "Você é o Craque da Tecnologia! 🤖⚽";
        resultDescription = "Seu foco está na robótica, na inovação e em usar dados para transformar tanto o agro quanto o futebol no futuro!";
    } else {
        resultTitle = "Você é o Camisa 10 da Sustentabilidade! 🌱🏆";
        resultDescription = "Para você, o jogo mais importante é cuidar do planeta, garantindo um agro verde e estádios ecoeficientes.";
    }

    // Substitui o conteúdo da caixinha pelo resultado
    const quizContainer = document.getElementById("quiz-container");
    quizContainer.innerHTML = `
        <h2 style="color: #0b5125; margin-bottom: 20px;">${resultTitle}</h2>
        <p id="result-text" style="font-size: 18px; line-height: 1.6; margin-bottom: 30px;">${resultDescription}</p>
        <button onclick="location.reload()" class="btn-primary">Jogar Novamente</button>
    `;
}

// Executa a função assim que a página terminar de carregar no navegador
window.onload = loadQuestion;
