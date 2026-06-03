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

// Inicializa o Quiz
function loadQuestion() {
    if (currentQuestionIndex < questions.length) {
        const currentQuestion = questions[currentQuestionIndex];
        document.getElementById("question-text").innerText = currentQuestion.question;
