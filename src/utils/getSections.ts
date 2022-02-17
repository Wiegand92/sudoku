import { squareCoordinates } from "./squareCoordinates";

// Returns a single Row of the sudoku board //
function getRow(board: number[][], row: number) {
  return board[row];
}

// Returns a single Columnn of the sudoku board //
function getColumn(board: number[][], column: number) {
  const boardColumn = [];
  for (let row = 0; row < 9; row++) {
    boardColumn.push(board[row][column]);
  }
  return boardColumn;
}

// Returns a single square of the sudoku board //
function getSquare(board: number[][], square: number) {
  const boardSquare = [];
  for (let row = 0; row < 9; row++) {
    for (let column = 0; column < 9; column++) {
      if (square === squareCoordinates[row][column]) {
        boardSquare.push(board[row][column]);
      }
    }
  }
  return boardSquare;
}

export { getRow, getColumn, getSquare };
