const cellElements = document.querySelectorAll("[data-cell]");

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
    setTimeout(() => window.location = "./empatou.html", 400);
  } else {
    if (isCircleTurn) {
      setTimeout(() => window.location = "./ovenceu.html", 400);
    } else {
      setTimeout(() => window.location = "./xvenceu.html", 400);
    }
  }
};

const checkForWin = (classToAdd) => {
  return winningCombinations.some((combination) => {
    return combination.every((index) => {
      return cellElements[index].classList.contains(classToAdd);
    });
  });
};

const checkForDraw = () => {
  return [...cellElements].every((cell) => {
    return cell.classList.contains("X") || cell.classList.contains("O");
  });
};

const placeMark = (cell, classToAdd) => {
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
  
  const isWin = checkForWin("X");
  const isDraw = checkForDraw();

  if (isWin) {
    endGame(false);
  } else if (isDraw) {
    endGame(true);
  }
}

const handleClick = (e) => {
  const cell = e.target;
  const classToAdd = isCircleTurn ? "O" : "X";
  
  placeMark(cell, classToAdd);
  
  const isWin = checkForWin(classToAdd);
  const isDraw = checkForDraw();

  if (isWin) {
    endGame(false);
  } else if (isDraw) {
    endGame(true);
  } else {
    isCircleTurn = !isCircleTurn;
    if (!isCircleTurn) {
     
