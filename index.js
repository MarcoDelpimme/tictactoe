const board = document.getElementById("board");
const cells = document.querySelectorAll("[data-cell]");
const statusDisplay = document.getElementById("status");
const restartBtn = document.getElementById("restartButton");

let currentPlayer = "X";
let gameActive = true;
let gameState = ["", "", "", "", "", "", "", "", ""];

const winningConditions = [
  [0, 1, 2], //vittoria in orizzontale prima row
  [3, 4, 5], //vittoria orizz seconda row
  [6, 7, 8], //vittoria orizz 3 row
  [0, 4, 8], //vittoria angolare 0-9
  [2, 4, 6], //vittoria angolare 3-7
  [0, 3, 6], //vittoria verticale 1-7
  [1, 4, 7], //vittoria verticale 2-8
  [2, 5, 8], //vittoria verticale 3-9
];

function handleCellClick(clickedCellEvent) {
  if (!clickedCellEvent || !clickedCellEvent.target) {
    console.error("Evento di click non valido!");
    return;
  }
  const clickedCell = clickedCellEvent.target;
  const clickedCellIndex = parseInt(clickedCell.getAttribute("data-cell"));

  if (isNaN(clickedCellIndex)) {
    console.error("Indice della cella non valido!");
    return;
  }

  if (gameState[clickedCellIndex] !== "" || !gameActive) return;
  handleCellPlay(clickedCell, clickedCellIndex);
  handleResult();
}

function handleCellPlay(clickedCell, clickedCellIndex) {
  gameState[clickedCellIndex] = currentPlayer;
  clickedCell.innerText = currentPlayer;
}

function handleResult() {
  let roundWon = false;
  for (let i = 0; i < winningConditions.length; i++) {
    const winningCondition = winningConditions[i];

    let a = gameState[winningCondition[0]];
    let b = gameState[winningCondition[1]];
    let c = gameState[winningCondition[2]];
    if (a === "" || b === "" || c === "") {
      continue;
    }

    if (a === b && b === c && c) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    statusDisplay.innerText = `${currentPlayer} ha vinto`;
    gameActive = false;
    return;
  }

  let roundDraw = !gameState.includes("");
  if (roundDraw) {
    statusDisplay.innerText = "pareggio";
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusDisplay.innerText = `${currentPlayer} è il tuo turno`;
}

function restartGame() {
  currentPlayer = "X";
  gameActive = true;
  gameState = ["", "", "", "", "", "", "", "", ""];
  statusDisplay.innerText = `${currentPlayer} è il tuo turno`;

  cells.forEach((cell) => {
    cell.innerText = "";
  });
}

cells.forEach((cell) => cell.addEventListener("click", handleCellClick));

restartBtn.addEventListener("click", restartGame);
