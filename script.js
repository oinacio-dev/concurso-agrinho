// //////////////////////////////////////////////////////////////////
// Elementos capturados do DOM
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

// Variáveis de controle do estado global
let jogadorNome = "";
let gols = 0;
let erros = 0;

// Banco de dados das ações sustentáveis
const acoesSustentaveis = [
    "Plantio direto adotado! O solo reteve mais carbono.",
    "Uso de biofertilizantes validado! Menos impacto químico na terra.",
    "Reflorestamento de APP ativo! Biodiversidade em alta.",
    "Painéis solares na fazenda instalados! Energia limpa gerada."
];

// //////////////////////////////////////////////////////////////////
// 🔊 Efeitos Sonoros via Web Audio API (Sons 100% Autoria/Código)
// //////////////////////////////////////////////////////////////////
function tocarSom(tipo) {
    // Cria o contexto de áudio do navegador
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    
    const osc = ctx.createOscillator();
    const ganho = ctx.createGain();
    
    osc.connect(ganho);
    ganho.connect(ctx.destination);

    if (tipo === 'gol') {
        // Som festivo ascendente (Apito/Comemoração)
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(300, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.3);
        ganho.gain.setValueAtTime(0.3, ctx.currentTime);
        ganho.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.4);
        osc.start();
        osc.stop(ctx.currentTime + 0.4);
    } else if (tipo === 'erro') {
        // Som grave descendente (Bola para fora / Desperdício)
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(150, ctx.currentTime);
        osc.frequency.linearRampToValueAtTime(60, ctx.currentTime + 0.4);
        ganho.gain.setValueAtTime(0.2, ctx.currentTime);
        ganho.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.4);
        osc.start();
        osc.stop(ctx.currentTime + 0.4);
    }
}

// //////////////////////////////////////////////////////////////////
// 🌓 Gerenciamento de Tema
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
// ⚽ Mecânica do Jogo com Efeitos Sonoros e Animação
// //////////////////////////////////////////////////////////////////
alvos.forEach(alvo => {
    alvo.addEventListener('click', (evento) => {
        if (!jogadorNome) {
            feedbackJogo.textContent = "⚠️ Digite seu nome acima antes de chutar para o gol!";
            return;
        }

        const cantoEscolhido = evento.target.getAttribute('data-canto');
        
        // Aplica classe de animação baseada no alvo selecionado
        bola.style.transition = 'transform 0.4s ease-out, font-size 0.4s ease-out';
        if (cantoEscolhido === 'esquerda') {
            bola.style.transform = 'translate(-100px, -140px) scale(0.6)';
        } else if (cantoEscolhido === 'centro') {
            bola.style.transform = 'translate(0, -160px) scale(0.6)';
        } else if (cantoEscolhido === 'direita') {
            bola.style.transform = 'translate(100px, -140px) scale(0.6)';
        }

        // 70% de chance de gol ecológico
        const sucessoChute = Math.random() > 0.3; 

        setTimeout(() => {
            if (sucessoChute) {
                gols++;
                scoreGolsTxt.textContent = gols;
                tocarSom('gol'); // Dispara efeito sonoro de gol
                
                // Efeito visual na bola de balançar a rede
                bola.style.transform += ' translateY(-5px)'; 
                
                const fraseAleatoria = acoesSustentaveis[Math.floor(Math.random() * acoesSustentaveis.length)];
                feedbackJogo.textContent = `🎉 GOOOL! ${fraseAleatoria}`;
            } else {
                erros++;
                scoreErrosTxt.textContent = erros;
                tocarSom('erro'); // Dispara efeito sonoro de erro
                
                // Desvia a bola para fora do gol
                if (cantoEscolhido === 'esquerda') bola.style.transform = 'translate(-160px, -180px) scale(0.5)';
                if (cantoEscolhido === 'centro') bola.style.transform = 'translate(0, -210px) scale(0.5)';
                if (cantoEscolhido === 'direita') bola.style.transform = 'translate(160px, -180px) scale(0.5)';
                
                feedbackJogo.textContent = "❌ Chute para fora! Faltou planejamento sustentável no manejo da terra.";
            }

            // Reseta a bola de volta à marca do pênalti após 1.5 segundos
            setTimeout(() => {
                bola.style.transition = 'transform 0.3s ease-in, font-size 0.3s ease-in';
                bola.style.transform = 'translate(0, 0) scale(1)';
            }, 1500);

            if (gols + erros >= 5) {
                btnResetJogo.classList.remove('hidden');
            }

        }, 400);
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
