const cellElements = document.querySelectorAll("[data-cell]");
const jogada = document.querySelector(".turno");

let isCircleTurn = false;

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const endGame = (isDraw) => {
  if (isDraw) {
    window.location = "./empatou.html";
  } else {
    if (isCircleTurn == true) {
        window.location = "./ovenceu.html";
    } else {
        window.location = "./xvenceu.html";
    }
  }
};

const checkForWin = (currentPlayer) => {
  return winningCombinations.some((combination) => {
    return combination.every((index) => {
      return cellElements[index].classList.contains(currentPlayer);
    });
  });
};

const checkForDraw = () => {
  return [...cellElements].every((cell) => {
    return cell.classList.contains("X") || cell.classList.contains("O");
  });
};

const placeMark = (cell, classToAdd) => {
  // adiciona X e O
  cell.innerHTML = classToAdd;
  cell.classList.add(classToAdd);
};

const swapTurns = () => {
  // troca de turno
  isCircleTurn = !isCircleTurn; //inverte o turno

  let jogador;
    if (isCircleTurn == true) {
        jogador = "O";
    } else {
        jogador = "X";
    }

    jogada.innerHTML = "<h3> Jogador da vez: " + jogador + "</h3>";
};

const handleClick = (e) => {
  // vê de quem é a vez
  const cell = e.target;
  console.log("handle: " + isCircleTurn);
  const classToAdd = isCircleTurn ? "O" : "X";

  placeMark(cell, classToAdd);

  const isWin = checkForWin(classToAdd);

  const isDraw = checkForDraw();

  if (isWin) {
    endGame(false);
  } else if (isDraw) {
    endGame(true);
  } else {
    swapTurns();
  }
};

for (const cell of cellElements) {
  cell.addEventListener("click", handleClick, { once: true });
}
