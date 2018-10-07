module.exports = function solveSudoku(puzzle) {
  while (!isSolved(puzzle)) {
      for (let x = 0; x < 9; x++) {
          for (let y = 0; y < 9; y++) {
              puzzle[y][x] = checknumber(puzzle, x, y);
          }
      }
  }
  return puzzle;
}

function checknumber(puzzle, x, y) {
  if (puzzle[y][x] !== 0) return puzzle[y][x];

  const row = puzzle[y];
  const column = columnArray(puzzle, x);
  const grid = gridArray(puzzle, x, y);
  
  let nonpossibilities = row.concat(column, grid);
  
  const possibilities = [1, 2, 3, 4, 5, 6, 7, 8, 9].filter(function(item) { return nonpossibilities.indexOf(item) === -1; });

  return possibilities.length == 1 ? possibilities[0] : 0;
}

function columnArray(puzzle, idx) {
  return puzzle.map(function(row) { return row[idx]; });
}

function gridArray(puzzle, x, y) {
  let _x = Math.floor(x / 3) * 3;
  let _y = Math.floor(y / 3) * 3;
  
  const arr = [];
  
  for (let i = _x; i < _x + 3; i++) {
      for (let j = _y; j < _y + 3; j++) {
          arr.push(puzzle[j][i]);
      }
  }
  
  return arr;
}

function sum(arr) {
  return arr.reduce(function(a, n) { return a + n; }, 0);
}

function winningRow(arr) {
  return sum(arr.map(function(num) { return Math.pow(2, num - 1); })) == 511;
}

function isSolved(puzzle) {
  return puzzle.filter(function (row) { return !winningRow(row); }).length === 0;
}