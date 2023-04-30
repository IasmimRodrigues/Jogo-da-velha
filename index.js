const cellElements = document.querySelectorAll("[data-cell]");

let isCircleTurn = false;

const placeMark = (cell, classToAdd) => {
    cell.innerHTML = classToAdd;
}

const swapTurns = () => {
    isCircleTurn = !isCircleTurn;
}

const handleClick = (e) => {
    const cell = e.target;
    const classToAdd = isCircleTurn ? '<h2> O </h2>' : '<h2> X </h2>';

    // cell.add(classToAdd);
    
    placeMark(cell, classToAdd);
    swapTurns();
}

for (const cell of cellElements) {
    cell.addEventListener('click', handleClick, {once: true});
}

