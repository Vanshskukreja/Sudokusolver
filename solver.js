
window.onload = function() {
    createGrid();
};

// Create the Sudoku grid dynamically
function createGrid() {
    const grid = document.getElementById("sudoku-grid").getElementsByTagName("tbody")[0];
    
    for (let i = 0; i < 9; i++) {
        const row = document.createElement("tr");
        for (let j = 0; j < 9; j++) {
            const cell = document.createElement("td");
            const input = document.createElement("input");
            input.type = "text";
            input.maxLength = 1; // Restrict input to 1 digit
            input.oninput = (e) => validateInput(e); // Validate user input (only numbers 1-9)
            cell.appendChild(input);
            row.appendChild(cell);
        }
        grid.appendChild(row);
    }
}

// Validate input (only allow numbers between 1 and 9)
function validateInput(e) {
    const value = e.target.value;
    if (value !== '' && (!Number.isInteger(Number(value)) || value < 1 || value > 9)) {
        e.target.value = '';
    }
}

// Get the current Sudoku board as a 2D array
function getBoard() {
    const grid = document.getElementById("sudoku-grid").getElementsByTagName("input");
    const board = [];
    for (let i = 0; i < 9; i++) {
        board.push([]);
        for (let j = 0; j < 9; j++) {
            const value = grid[i * 9 + j].value;
            board[i].push(value === '' ? 0 : parseInt(value));
        }
    }
    return board;
}

// Set the board with the solved puzzle
function setBoard(board) {
    const grid = document.getElementById("sudoku-grid").getElementsByTagName("input");
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            grid[i * 9 + j].value = board[i][j] !== 0 ? board[i][j] : '';
        }
    }
}

// Check if it's safe to place a number at board[row][col]
function isSafe(board, row, col, num) {
    for (let x = 0; x < 9; x++) {
        if (board[row][x] === num || board[x][col] === num ||
            board[3 * Math.floor(row / 3) + Math.floor(x / 3)][3 * Math.floor(col / 3) + (x % 3)] === num) {
            return false;
        }
    }
    return true;
}

// Solve Sudoku using Backtracking Algorithm
function solve(board) {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (board[row][col] === 0) {
                for (let num = 1; num <= 9; num++) {
                    if (isSafe(board, row, col, num)) {
                        board[row][col] = num;
                        if (solve(board)) {
                            return true;
                        }
                        board[row][col] = 0;
                    }
                }
                return false;
            }
        }
    }
    return true;
}

// Solve the Sudoku when "Solve" button is clicked
function solveSudoku() {
    const board = getBoard();
    if (solve(board)) {
        setBoard(board);
    } else {
        alert("No solution exists for this puzzle!");
    }
}

// Clear the grid when "Clear" button is clicked
function clearGrid() {
    const grid = document.getElementById("sudoku-grid").getElementsByTagName("input");
    for (let i = 0; i < grid.length; i++) {
        grid[i].value = '';
    }
}
