// -----------------------------------------------------
// SELECCIÓN DE ELEMENTOS DEL DOM
// -----------------------------------------------------
const game = document.querySelector('#game');
const player1 = document.querySelector('#player1');
const player2 = document.querySelector('#player2');
const ball = document.querySelector('#ball');
const score1 = document.querySelector('#score1');
const score2 = document.querySelector('#score2');
const menu = document.querySelector('#menu');
const winnerDiv = document.querySelector('#winner');
const startBtn = document.querySelector('#startBtn');

// -----------------------------------------------------
// VARIABLES DEL JUEGO
// -----------------------------------------------------
let ballSpeedX = 8;
let ballSpeedY = 8;
let ballPosX = game.offsetWidth / 2;
let ballPosY = game.offsetHeight / 2;
let paddleSpeed = 10;
let player1Score = 0;
let player2Score = 0;
let activePowerUps = [];
let keysPressed = {};
let isPaused = false;
let isGameOver = false;
let powerUpInterval;
const winningScore = 3; // Puedes cambiarlo al número deseado

// -----------------------------------------------------
// LISTA DE POWER-UPS
// -----------------------------------------------------
const powerUps = [
  {
    type: "speed-up",
    rarity: "uncommon",
    effect: () => {
      ballSpeedX *= 1.5;
    },
    color: "red",
  },
  {
    type: "straight",
    rarity: "common",
    effect: () => {
      ballSpeedY = 0;
    },
    color: "blue",
  },
  {
    type: "reverse",
    rarity: "rare",
    effect: () => {
      ballSpeedX *= -1;
    },
    color: "green",
  },
  {
    type: "dead",
    rarity: "very rare",
    effect: () => {
      ballSpeedX *= 5;
      ballSpeedY *= 5;
    },
    color: "purple",
  },
];

// -----------------------------------------------------
// MENÚ INICIAL
// -----------------------------------------------------
startBtn.addEventListener('click', () => {
  // Ocultar menú y mostrar el juego
  menu.style.display = 'none';
  game.style.display = 'block';

  // Reiniciar variables de juego por si es una partida nueva
  resetGame();
  isGameOver = false;
  player1Score = 0;
  player2Score = 0;
  score1.textContent = player1Score;
  score2.textContent = player2Score;

  // Iniciar el bucle de juego
  powerUpInterval = setInterval(spawnPowerUp, 5000);
  gameLoop();
});

// -----------------------------------------------------
// FUNCIÓN PARA MOVER LA PELOTA
// -----------------------------------------------------
function moveBall() {
  ballPosX += ballSpeedX;
  ballPosY += ballSpeedY;

  // Rebote en paredes superior/inferior
  if (ballPosY <= 0 || ballPosY >= game.offsetHeight - ball.offsetHeight) {
    ballSpeedY *= -1;
    // Evita que la pelota se atasque
    ballPosY = Math.max(0, Math.min(ballPosY, game.offsetHeight - ball.offsetHeight));
  }

  // Rebote en paleta player1
  if (
    ballPosX <= player1.offsetWidth &&
    ballPosY + ball.offsetHeight > player1.offsetTop &&
    ballPosY < player1.offsetTop + player1.offsetHeight
  ) {
    const impact = (ballPosY - player1.offsetTop) / player1.offsetHeight;
    ballSpeedX *= -1;
    ballSpeedY = (impact - 0.5) * 12;
    ballPosX = player1.offsetWidth; // Corrige colisiones
  }

  // Rebote en paleta player2
  if (
    ballPosX >= game.offsetWidth - player2.offsetWidth - ball.offsetWidth &&
    ballPosY + ball.offsetHeight > player2.offsetTop &&
    ballPosY < player2.offsetTop + player2.offsetHeight
  ) {
    const impact = (ballPosY - player2.offsetTop) / player2.offsetHeight;
    ballSpeedX *= -1;
    ballSpeedY = (impact - 0.5) * 12;
    ballPosX = game.offsetWidth - player2.offsetWidth - ball.offsetWidth; // Corrige colisiones
  }

  // Detectar goles
  if (ballPosX <= 0) {
    player2Score++;
    score2.textContent = player2Score;
    resetGame();
  }
  if (ballPosX >= game.offsetWidth - ball.offsetWidth) {
    player1Score++;
    score1.textContent = player1Score;
    resetGame();
  }

  // Verificar si alguien alcanzó la puntuación ganadora
  checkWinner();

  // Actualizar posición de la pelota
  ball.style.left = `${ballPosX}px`;
  ball.style.top = `${ballPosY}px`;
}

// -----------------------------------------------------
// VERIFICAR GANADOR
// -----------------------------------------------------
function checkWinner() {
  if (player1Score >= winningScore) {
    showWinner("¡Jugador 1 ha ganado!");
  } else if (player2Score >= winningScore) {
    showWinner("¡Jugador 2 ha ganado!");
  }
}

// -----------------------------------------------------
// MOSTRAR MENSAJE DE VICTORIA
// -----------------------------------------------------
function showWinner(message) {
  // Detener el juego
  isGameOver = true;
  clearInterval(powerUpInterval);

  // Mostrar el mensaje de ganador
  winnerDiv.innerHTML = `
    <h2>${message}</h2>
    <button id="restartBtn">Volver al Menú</button>
  `;
  winnerDiv.style.display = 'block';

  // Evento para volver al menú
  const restartBtn = document.querySelector('#restartBtn');
  restartBtn.addEventListener('click', () => {
    winnerDiv.style.display = 'none';
    game.style.display = 'none';
    menu.style.display = 'flex';
  });
}

// -----------------------------------------------------
// RESETEAR POSICIÓN Y VELOCIDAD DE LA PELOTA
// -----------------------------------------------------
function resetGame() {
  // Si el juego ya terminó, no reseteamos más
  if (isGameOver) return;

  ballPosX = game.offsetWidth / 2;
  ballPosY = game.offsetHeight / 2;
  // Velocidades aleatorias iniciales
  ballSpeedX = 6 * (Math.random() > 0.5 ? 1 : -1);
  ballSpeedY = 4 * (Math.random() > 0.5 ? 1 : -1);
}

// -----------------------------------------------------
// MOVIMIENTO DE LAS PALETAS
// -----------------------------------------------------
function movePaddles() {
  if (keysPressed["w"] && player1.offsetTop > 0) {
    player1.style.top = `${Math.max(player1.offsetTop - paddleSpeed, 0)}px`;
  }
  if (keysPressed["s"] && player1.offsetTop < game.offsetHeight - player1.offsetHeight) {
    player1.style.top = `${Math.min(
      player1.offsetTop + paddleSpeed,
      game.offsetHeight - player1.offsetHeight
    )}px`;
  }
  if (keysPressed["ArrowUp"] && player2.offsetTop > 0) {
    player2.style.top = `${Math.max(player2.offsetTop - paddleSpeed, 0)}px`;
  }
  if (keysPressed["ArrowDown"] && player2.offsetTop < game.offsetHeight - player2.offsetHeight) {
    player2.style.top = `${Math.min(
      player2.offsetTop + paddleSpeed,
      game.offsetHeight - player2.offsetHeight
    )}px`;
  }
}

// -----------------------------------------------------
// EVENTOS DE TECLADO
// -----------------------------------------------------
document.addEventListener("keydown", (e) => {
  keysPressed[e.key] = true;
  if (e.key === "p") {
    isPaused = !isPaused;
    if (isPaused) {
      clearInterval(powerUpInterval);
    } else {
      // Reiniciar intervalo de power-ups si se despausa
      powerUpInterval = setInterval(spawnPowerUp, 10000);
      gameLoop();
    }
  }
});

document.addEventListener("keyup", (e) => {
  keysPressed[e.key] = false;
});

// -----------------------------------------------------
// GENERAR POWER-UPS ALEATORIOS
// -----------------------------------------------------
function spawnPowerUp() {
  if (isGameOver) return; // No generamos más power-ups si hay ganador

  const rarityWeights = { common: 60, uncommon: 40, rare: 30, "very rare": 20 };
  const totalWeight = Object.values(rarityWeights).reduce((a, b) => a + b, 0);
  const random = Math.random() * totalWeight;

  let accumulated = 0;
  for (const powerUp of powerUps) {
    accumulated += rarityWeights[powerUp.rarity];
    if (random <= accumulated) {
      const powerUpElement = document.createElement("div");
      powerUpElement.classList.add("power-up", powerUp.type);
      // Ajustes de estilo
      powerUpElement.style.left = `${Math.random() * (game.offsetWidth - 20)}px`;
      powerUpElement.style.top = `${Math.random() * (game.offsetHeight - 20)}px`;
      game.appendChild(powerUpElement);
      break;
    }
  }
}

// -----------------------------------------------------
// DETECTAR COLISIÓN CON POWER-UPS
// -----------------------------------------------------
function checkPowerUpCollision() {
  document.querySelectorAll(".power-up").forEach((powerUpElement) => {
    const rect = powerUpElement.getBoundingClientRect();
    const ballRect = ball.getBoundingClientRect();

    // Si colisiona con la pelota
    if (
      rect.left < ballRect.right &&
      rect.right > ballRect.left &&
      rect.top < ballRect.bottom &&
      rect.bottom > ballRect.top
    ) {
      const type = powerUpElement.classList[1];
      const powerUp = powerUps.find((p) => p.type === type);
      if (powerUp) {
        powerUp.effect();
      }
      powerUpElement.remove();
    }
  });
}

// -----------------------------------------------------
// BUCLE PRINCIPAL DEL JUEGO
// -----------------------------------------------------
function gameLoop() {
  if (isPaused || isGameOver) return;
  moveBall();
  movePaddles();
  checkPowerUpCollision();
  requestAnimationFrame(gameLoop);
}

// -----------------------------------------------------
// INICIAR
// (La lógica de empezar el juego está en el botón startBtn)
// -----------------------------------------------------
