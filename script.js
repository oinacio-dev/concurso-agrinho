// Capturando os elementos da tela para poder movê-los
const bola = document.getElementById('bola');
const milho = document.getElementById('milho');
const soja = document.getElementById('soja');

// Função quando o Milho chuta
function chuteDoMilho() {
    // 1. Milho corre até a meia-lua do campo
    milho.style.left = '40%';
    
    setTimeout(() => {
        // 2. A bola voa girando até o gol da Soja (lado direito, 95% da tela)
        bola.style.left = '95%';
        bola.style.top = '50%';
        bola.style.transform = 'translate(-50%, -50%) rotate(720deg)';
        
        // 3. O Milho volta comemorando para sua posição inicial
        setTimeout(() => {
            milho.style.left = '15%';
        }, 400);
    }, 300); // Tempo do milho chegar até a bola
}

// Função quando a Soja chuta
function chuteDaSoja() {
    // 1. Soja corre até a meia-lua do campo
    soja.style.right = '40%';
    
    setTimeout(() => {
        // 2. A bola voa girando até o gol do Milho (lado esquerdo, 5% da tela)
        bola.style.left = '5%';
        bola.style.top = '50%';
        bola.style.transform = 'translate(-50%, -50%) rotate(-720deg)';
        
        // 3. A Soja volta comemorando para sua posição inicial
        setTimeout(() => {
            soja.style.right = '15%';
        }, 400);
    }, 300); // Tempo da soja chegar até a bola
}

// Função para reiniciar e colocar a bola no centro
function reiniciar() {
    bola.style.left = '50%';
    bola.style.top = '50%';
