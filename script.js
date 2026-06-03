let donoDaBola = "milho"; // Começa com o Milho
let jogando = false;

function chutarBola() {
    if (jogando) return; // Evita bugar clicando várias vezes seguidas
    jogando = true;

    const bola = document.getElementById("bola
