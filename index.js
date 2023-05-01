const cellElements = document.querySelectorAll("[data-cell]");
//const jogada = document.querySelector(".turno");

let isCircleTurn = true;

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
    // console.log("empatou");
    setTimeout(() => window.location = "./empatou.html", 400);
  } else {
    if (isCircleTurn == true) {
      // console.log("venceu O");
      setTimeout(() => window.location = "./ovenceu.html", 400);
    } else if (isCircleTurn == false) {
      // console.log("venceu X");
      setTimeout(() => window.location = "./xvenceu.html", 400);
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

const checkForX = (classToAdd) => {
  return winningCombinations.some((combination) => {
    return combination.every((index) => {
      return cellElements[index].classList.contains("X");
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

const bot = () => {
  const emptyCells = [...cellElements].filter((cell) => {
    return !cell.classList.contains("X") && !cell.classList.contains("O");
  });

  const randomIndex = Math.floor(Math.random() * emptyCells.length);
  const cell = emptyCells[randomIndex];
  placeMark(cell, "X");


}

/*const swapTurns = () => {
    const isDraw = checkForDraw();

    // if (isWin) {
    //   endGame(false);
    // } else if (isDraw) {
    //   endGame(true);
    // }
    // fim da jogada do computador

  // jogada.innerHTML = "<h3> Jogador da vez: " + jogador + "</h3>";
};*/

const handleClick = (e) => {
  // vê de quem é a vez
  const cell = e.target;
  const classToAdd = isCircleTurn ? "O" : "X";

  setTimeout(() => bot(), 500);

  placeMark(cell, classToAdd);
  const isWin = checkForWin(classToAdd);
  const isDraw = checkForDraw();
  const isWinX = checkForX(classToAdd);

  if (isWin || isWinX) {
    endGame(false);
  } else if (isDraw) {
    endGame(true);
  }
};

for (const cell of cellElements) {
  cell.addEventListener("click", handleClick, { once: true });
}
