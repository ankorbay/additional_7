module.exports = function solveSudoku(sudoku) {
    let x = 0;
    let y = 0;
    let emptyPos;
  
    function checkThePosition(sudoku, x, y, number) {
        for (let i = 0; i < 9; i++)
            if (sudoku[i][y] === number) {
                return false
            };
        for (let j = 0; j < 9; j++)
            if (sudoku[x][j] === number) {
                return false
            };
  
        x = Math.floor(x / 3) * 3;
        y = Math.floor(y / 3) * 3;
  
        for (let i = 0; i < 3; i++)
            for (let j = 0; j < 3; j++)
                if (sudoku[x + i][y + j] === number) {
                    return false
                };
  
        return true;
    }
  
    function searchforEmpty(sudoku, x, y) {
        foundposition = [];
  
        while (true) {
            if (x === sudoku.length) {
                break;
            } 
            if (sudoku[x][y] === 0) {
            foundposition[0] = x;
            foundposition[1] = y;
            break;
            } 
            else {
                if (y < sudoku.length - 1) {
                    y++;
                }
                else {
                x++;
                y = 0;
                }
            }
        }
  
        return foundposition;
    }
  
    function solveRecursively(sudoku, x, y) {
        emptyPos = searchforEmpty(sudoku, x, y);
        x = emptyPos[0];
        y = emptyPos[1];
  
        if (typeof x === "undefined") {
            return true;
        }
        for (let number = 1; number <= 9; number++) {
            if (checkThePosition(sudoku, x, y, number)) {
            sudoku[x][y] = number;
            if (solveRecursively(sudoku, x, y)) {
                return true;
            }
            sudoku[x][y] = 0;
            }
        }
        return false;
    }
    solveRecursively(sudoku, x, y)
    return sudoku;
  }
