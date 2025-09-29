let gameseq = [];
let userseq = [];
let highestScore = 0;
let currentlevel = 0;
let game1 = false;
const colors = ["red", "blue", "green", "purple"];

const levelDisplay = document.querySelector("h2");
const scoreDisplay = document.querySelector(".sri");
const resetBtn = document.querySelector("button");

// Start the game
function startGame() {
  if (game1) return;
  game1 = true;
  document.body.classList.add("bodycolor");
  levelDisplay.innerText = "Get Ready...";
  setTimeout(() => {
    levelup();
  }, 500);
}

function levelup() {
  userseq = [];
  currentlevel++;
  levelDisplay.innerText = `Level ${currentlevel}`;
  setTimeout(randomColor, 600);
}

function randomColor() {
  const randomIndex = Math.floor(Math.random() * 4);
  const chosenColor = colors[randomIndex];
  gameseq.push(chosenColor);
  const btn = document.querySelector(`.${chosenColor}`);
  blink(btn);
}

function blink(btn) {
  btn.classList.add("flash");
  setTimeout(() => {
    btn.classList.remove("flash");
  }, 250);
}

function userpress() {
  if (!game1) return;
  const pressedBtn = this;
  const pressedColor = pressedBtn.id;
  userseq.push(pressedColor);
  blink(pressedBtn);
  check(userseq.length - 1);
}

// Add event listeners to color buttons
document.querySelectorAll(".btn").forEach(btn => {
  btn.addEventListener("click", userpress);
});

function check(index) {
  if (userseq[index] === gameseq[index]) {
    if (userseq.length === gameseq.length) {
      setTimeout(levelup, 1000);
    }
  } else {
    gameOver();
  }
}

function gameOver() {
  const currentscore = currentlevel - 1;
  levelDisplay.innerHTML = `Game Over! Level <b>${currentscore}</b><br>Press any key or restart`;
  document.body.classList.add("error");
  setTimeout(() => {
    document.body.classList.remove("error");
  }, 200);

  // Update high score
  if (currentscore > highestScore) {
    highestScore = currentscore;
    scoreDisplay.innerText = highestScore;
  }

  // Reset game state
  gameseq = [];
  userseq = [];
  currentlevel = 0;
  game1 = false;

  // On mobile: show Start button
  if (window.innerWidth <= 600) {
    levelDisplay.innerHTML = `<button class="start-btn">Start Game</button>`;
    document.querySelector(".start-btn").addEventListener("click", startGame);
  }
}

// Keyboard start (desktop/tablet only)
document.addEventListener("keydown", () => {
  if (!game1 && window.innerWidth > 600) {
    startGame();
  }
});

// Reset button functionality
function reset() {
  gameseq = [];
  userseq = [];
  currentlevel = 0;
  game1 = false;
  document.body.classList.remove("bodycolor", "error");
  
  // Update high score display
  scoreDisplay.innerText = highestScore;

  // Show appropriate start instruction based on device
  if (window.innerWidth <= 600) {
    // Mobile: show Start button
    levelDisplay.innerHTML = `<button class="start-btn">Start Game</button>`;
    document.querySelector(".start-btn").addEventListener("click", startGame);
  } else {
    // Desktop: show text
    levelDisplay.innerText = "Press any key to start";
  }

  // Optional: disable hover effect briefly
  resetBtn.classList.add("no-hover");
}

resetBtn.addEventListener("click", reset);

// Initial setup for mobile
if (window.innerWidth <= 600) {
  levelDisplay.innerHTML = `<button class="start-btn">Start Game</button>`;
  document.querySelector(".start-btn").addEventListener("click", startGame);
}