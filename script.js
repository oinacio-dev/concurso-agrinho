// //////////////////////////////////////////////////////////////////
// Elementos capturados do DOM (Atendendo ao critério de manipulação)
// //////////////////////////////////////////////////////////////////
const themeToggle = document.getElementById('theme-toggle');
const btnIniciar = document.getElementById('btn-iniciar');
const usernameInput = document.getElementById('username');
const saudacao = document.getElementById('saudacao-personalizada');
const scoreGolsTxt = document.getElementById('score-gols');
const scoreErrosTxt = document.getElementById('score-erros');
const bola = document.getElementById('bola-futebol');
const feedbackJogo = document.getElementById('feedback-jogo');
const btnResetJogo = document.getElementById('btn-reset-jogo');
const formIdeia = document.getElementById('form-ideia');
const feedbackForm = document.getElementById('feedback-form');
const alvos = document.querySelectorAll('.alvo');

// Variables de controle do estado global (Uso estruturado de variáveis)
let jogadorNome = "";
let gols = 0;
let erros = 0;

// Banco de dados interno das ações sustentáveis da Copa Ecológica
const acoesSustentaveis = [
    "Plantio direto adotado! O solo reteve mais carbono.",
    "Uso de biofertilizantes validado! Menos impacto químico na terra.",
    "Reflorestamento de APP ativo! Biodiversidade em alta.",
    "Painéis solares na fazenda instalados! Energia limpa gerada."
];

// //////////////////////////////////////////////////////////////////
// 🌓 Gerenciamento de Tema (Modo Escuro / Claro via JS)
// //////////////////////////////////////////////////////////////////
themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    if (currentTheme === 'dark') {
        document.documentElement.removeAttribute('data-theme');
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
    }
});

// //////////////////////////////////////////////////////////////////
// 👋 Boas-vindas Personalizadas
// //////////////////////////////////////////////////////////////////
btnIniciar.addEventListener('click', () => {
    const nomeInput = usernameInput.value.trim();
    
    if (nomeInput !== "") {
        jogadorNome = nomeInput;
        saudacao.textContent = `Olá, ${jogadorNome}! Entre em campo para equilibrar o placar do planeta!`;
        saudacao.classList.remove('hidden');
        usernameInput.disabled = true;
        btnIniciar.disabled = true;
    } else {
        alert("Por favor, informe seu nome para começarmos.");
    }
});

// //////////////////////////////////////////////////////////////////
// ⚽ Mecânica do Jogo de Futebol Sustentável
// //////////////////////////////////////////////////////////////////
alvos.forEach(alvo => {
    alvo.addEventListener('click', (evento) => {
        if (!jogadorNome) {
            feedbackJogo.textContent = "⚠️ Digite seu nome acima antes de chutar para o gol!";
            return;
        }

        const cantoEscolhido = evento.target.getAttribute('data-canto');
        
        // Simulação de animação da bola dependendo do canto clicado
        if (cantoEscolhido === 'esquerda') bola.style.transform = 'translate(-80px, -120px)';
        if (cantoEscolhido === 'centro') bola.style.transform = 'translate(0, -140px)';
        if (cantoEscolhido === 'direita') bola.style.transform = 'translate(80px, -120px)';

        // Lógica aleatória: O goleiro do desperdício tenta defender
        const sucessoChute = Math.random() > 0.3; // 70% de chance de gol ecológico

        setTimeout(() => {
            if (sucessoChute) {
                gols++;
                scoreGolsTxt.textContent = gols;
                // Pega uma mensagem educativa aleatória da nossa lista
                const fraseAleatoria = acoesSustentaveis[Math.floor(Math.random() * acoesSustentaveis.length)];
                feedbackJogo.textContent = `🎉 GOOOL! ${fraseAleatoria}`;
            } else {
                erros++;
                scoreErrosTxt.textContent = erros;
                feedbackJogo.textContent = "❌ Chute para fora! Faltou planejamento sustentável no manejo da terra.";
            }

            // Reseta a bola de volta à marca do pênalti
            setTimeout(() => {
                bola.style.transform = 'translate(0, 0)';
            }, 1000);

            // Exibe botão de reiniciar se passar de 5 jogadas totais
            if (gols + erros >= 5) {
                btnResetJogo.classList.remove('hidden');
            }

        }, 500);
    });
});

// Reiniciar Placar
btnResetJogo.addEventListener('click', () => {
    gols = 0;
    erros = 0;
    scoreGolsTxt.textContent = "0";
    scoreErrosTxt.textContent = "0";
    feedbackJogo.textContent = "Placar zerado! Novo jogo iniciado.";
    btnResetJogo.classList.add('hidden');
});

// //////////////////////////////////////////////////////////////////
// 📝 Validação do Formulário Semântico
// //////////////////////////////////////////////////////////////////
formIdeia.addEventListener('submit', (e) => {
    e.preventDefault();
    const ideiaValor = document.getElementById('ideia-texto').value.trim();

    if (ideiaValor.length > 5) {
        feedbackForm.textContent = `Obrigado, ${jogadorNome || 'Estudante'}! Sua sugestão ("${ideiaValor}") contribui diretamente com o equilíbrio ecológico!`;
        feedbackForm.classList.remove('hidden');
        feedbackForm.className = "sucesso";
        formIdeia.reset();
    } else {
        alert("Descreva sua ideia com um pouco mais de detalhes!");
    }
});
