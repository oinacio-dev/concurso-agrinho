// //////////////////////////////////////////////////////////////////
// Elementos capturados do DOM
// //////////////////////////////////////////////////////////////////
const themeToggle = document.getElementById('theme-toggle');
const btnIncrease = document.getElementById('font-increase');
const btnDecrease = document.getElementById('font-decrease');
const btnIniciar = document.getElementById('btn-iniciar');
const usernameInput = document.getElementById('username');
const saudacao = document.getElementById('saudacao-personalizada');
const scoreGolsTxt = document.getElementById('score-gols');
const scoreErrosTxt = document.getElementById('score-erros');
const recordeGolsTxt = document.getElementById('recorde-gols');
const bola = document.getElementById('bola-futebol');
const feedbackJogo = document.getElementById('feedback-jogo');
const btnResetJogo = document.getElementById('btn-reset-jogo');
const formIdeia = document.getElementById('form-ideia');
const feedbackForm = document.getElementById('feedback-form');
const alvos = document.querySelectorAll('.alvo');
const botoesTermo = document.querySelectorAll('.btn-termo');
const painelTermo = document.getElementById('painel-termo');

// Variáveis de controle do estado global (Fundamentos de computação)
let jogadorNome = "";
let gols = 0;
let erros = 0;
let tamanhoFonteAtual = 100; // Representa 100%

// Dicionário de dados para o Glossário Interativo
const dadosGlossario = {
    plantio: "Cultivo feito diretamente sobre a palha do ano anterior, sem arar o solo. Protege a terra contra erosões e economiza água.",
    rotacao: "Alternar o tipo de planta em cada safra na mesma área. Ajuda a quebrar o ciclo de pragas e melhora naturalmente os nutrientes do solo.",
    app: "Margens de rios, lagos e topos de morros que por lei devem ser mantidos com floresta nativa para evitar desabamentos e proteger a água."
};

const acoesSustentaveis = [
    "Plantio direto adotado! O solo reteve mais carbono.",
    "Uso de biofertilizantes validado! Menos impacto químico na terra.",
    "Reflorestamento de APP ativo! Biodiversidade em alta.",
    "Painéis solares na fazenda instalados! Energia limpa gerada."
];

// Carregar recorde salvo anteriormente (Persistência de Dados para Desempate)
let recordeSalvo = localStorage.getItem('agrinhoRecorde') || 0;
recordeGolsTxt.textContent = recordeSalvo;

// //////////////////////////////////////////////////////////////////
// 🔍 Controle de Acessibilidade (Exigência Crítica Nível 4)
// //////////////////////////////////////////////////////////////////
btnIncrease.addEventListener('click', () => {
    if (tamanhoFonteAtual < 130) {
        tamanhoFonteAtual += 10;
        document.body.style.fontSize = `${tamanhoFonteAtual}%`;
    }
});

btnDecrease.addEventListener('click', () => {
    if (tamanhoFonteAtual > 90) {
        tamanhoFonteAtual -= 10;
        document.body.style.fontSize = `${tamanhoFonteAtual}%`;
    }
});

// //////////////////////////////////////////////////////////////////
// 🌱 Lógica do Dicionário do Agro (Manipulação Funcional do DOM)
// //////////////////////////////////////////////////////////////////
botoesTermo.forEach(botao => {
    botao.addEventListener('click', (e) => {
        const chaveTermo = e.target.getAttribute('data-termo');
        painelTermo.textContent = dadosGlossario[chaveTermo];
        
        // Altera levemente o estilo do painel para guiar a atenção do usuário
        painelTermo.style.fontWeight = "bold";
        setTimeout(() => { painelTermo.style.fontWeight = "normal"; }, 300);
    });
});

// //////////////////////////////////////////////////////////////////
// 🔊 Efeitos Sonoros Nativos (Web Audio API)
// //////////////////////////////////////////////////////////////////
function tocarSom(tipo) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const ganho = ctx.createGain();
    
    osc.connect(ganho);
    ganho.connect(ctx.destination);

    if (tipo === 'gol') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(300, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.3);
        ganho.gain.setValueAtTime(0.3, ctx.currentTime);
        ganho.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.4);
        osc.start();
        osc.stop(ctx.currentTime + 0.4);
    } else if (tipo === 'erro') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(150, ctx.currentTime);
        osc.frequency.linearRampToValueAtTime(60, ctx.currentTime + 0.4);
        ganho.gain.setValueAtTime(0.2, ctx.currentTime);
        ganho.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.4);
        osc.start();
        osc.stop(ctx.currentTime + 0.4);
    }
}

// 🌓 Gerenciamento de Tema
themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    if (currentTheme === 'dark') {
        document.documentElement.removeAttribute('data-theme');
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
    }
});

// 👋 Iniciar Sessão do Usuário
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
// ⚽ Mecânica do Jogo com Verificação de Recorde
// //////////////////////////////////////////////////////////////////
alvos.forEach(alvo => {
    alvo.addEventListener('click', (evento) => {
        if (!jogadorNome) {
            feedbackJogo.textContent = "⚠️ Digite seu nome acima antes de chutar para o gol!";
            return;
        }

        const cantoEscolhido = evento.target.getAttribute('data-canto');
        bola.style.transition = 'transform 0.4s ease-out, font-size 0.4s ease-out';
        
        if (cantoEscolhido === 'esquerda') bola.style.transform = 'translate(-100px, -140px) scale(0.6)';
        else if (cantoEscolhido === 'centro') bola.style.transform = 'translate(0, -160px) scale(0.6)';
        else if (cantoEscolhido === 'direita') bola.style.transform = 'translate(100px, -140px) scale(0.6)';

        const sucessoChute = Math.random() > 0.3; 

        setTimeout(() => {
            if (sucessoChute) {
                gols++;
                scoreGolsTxt.textContent = gols;
                tocarSom('gol');
                bola.style.transform += ' translateY(-5px)'; 
                
                // Salvar e atualizar novo recorde se necessário
                if (gols > recordeSalvo) {
                    recordeSalvo = gols;
                    localStorage.setItem('agrinhoRecorde', recordeSalvo);
                    recordeGolsTxt.textContent = recordeSalvo;
                }
                
                const fraseAleatoria = acoesSustentaveis[Math.floor(Math.random() * acoesSustentaveis.length)];
                feedbackJogo.textContent = `🎉 GOOOL! ${fraseAleatoria}`;
            } else {
                erros++;
                scoreErrosTxt.textContent = erros;
                tocarSom('erro');
                
                if (cantoEscolhido === 'esquerda') bola.style.transform = 'translate(-160px, -180px) scale(0.5)';
                if (cantoEscolhido === 'centro') bola.style.transform = 'translate(0, -210px) scale(0.5)';
                if (cantoEscolhido === 'direita') bola.style.transform = 'translate(160px, -180px) scale(0.5)';
                
                feedbackJogo.textContent = "❌ Chute para fora! Faltou planejamento sustentável no manejo da terra.";
            }

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

btnResetJogo.addEventListener('click', () => {
    gols = 0;
    erros = 0;
    scoreGolsTxt.textContent = "0";
    scoreErrosTxt.textContent = "0";
    feedbackJogo.textContent = "Placar zerado! Novo jogo iniciado.";
    btnResetJogo.classList.add('hidden');
});

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
