const board = document.getElementById('board');
let currentPlayer = 'X';
let gameOver = false;


const cellSize = 100;
const boardSize = 3;
const playerCharSize = 24;

function createCell(row, col) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.style.width = cellSize + 'px';
    cell.style.height = cellSize + 'px';
    cell.style.fontSize = playerCharSize + 'px';
    cell.dataset.row = row;
    cell.dataset.col = col;
    cell.addEventListener('click', cellClick);
    return cell;
}

function cellClick(event) {
    if (gameOver) return;

    const cell = event.target;

    if (cell.textContent === '') {
        cell.textContent = currentPlayer;
        if (checkWin(cell.dataset.row, cell.dataset.col)) {
            gameOver = true;
            alert(currentPlayer + ' nyert!');
        } else if (checkDraw()) {
            gameOver = true;
            alert('Döntetlen!');
        } else {
            currentPlayer = (currentPlayer === 'X') ? 'O' : 'X';
            computerMove();
        }
    }
}

function computerMove() {
    if (gameOver) return;

    const emptyCells = Array.from(document.querySelectorAll('.cell')).filter(cell => cell.textContent === '');

    if (emptyCells.length > 0) {
        const randomIndex = Math.floor(Math.random() * emptyCells.length);
        const randomCell = emptyCells[randomIndex];
        setTimeout(() => {
            randomCell.textContent = 'O';
            if (checkWin(randomCell.dataset.row, randomCell.dataset.col)) {
                gameOver = true;
                alert('Számítógép nyert!');
            } else if (checkDraw()) {
                gameOver = true;
                alert('Döntetlen!');
            } else {
                currentPlayer = 'X';
            }
        }, 1000);
    }
}

function checkWin(row, col) {
    const cells = Array.from(document.querySelectorAll('.cell'));
    return (
        checkLine(cells, row, col, 0, 1) ||
        checkLine(cells, row, col, 1, 0) ||
        checkLine(cells, row, col, 1, 1) ||
        checkLine(cells, row, col, -1, 1)
    );
}

function checkLine(cells, row, col, rowIncrement, colIncrement) {
    const player = currentPlayer;
    let count = 0;

    for (let i = -2; i <= 2; i++) {
        const currentRow = parseInt(row) + i * rowIncrement;
        const currentCol = parseInt(col) + i * colIncrement;

        if (currentRow >= 0 && currentRow < boardSize && currentCol >= 0 && currentCol < boardSize) {
            const cell = cells.find(cell => cell.dataset.row == currentRow && cell.dataset.col == currentCol);
            if (cell && cell.textContent === player) {
                count++;
                if (count === 3) {
                    return true;
                }
            }
        }
    }

    return false;
}

function checkDraw() {
    const cells = Array.from(document.querySelectorAll('.cell'));
    return cells.every(cell => cell.textContent !== '');
}

function initializeBoard() {
    for (let i = 0; i < boardSize; i++) {
        for (let j = 0; j < boardSize; j++) {
            board.appendChild(createCell(i, j));
        }
    }
}

initializeBoard();