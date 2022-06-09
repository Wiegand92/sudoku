import { validMove } from "./checkHouse";
import { blockCoordinates } from "./blockCoordinates";
// import { printBoard } from "./printBoard";

import type { SudokuBoard } from "./sudokuTypes";
import { cloneBoard } from "./cloneBoard";
import { emptySudokuBoard } from "./fixtures/sudokuBoard";

// Create an empty board to copy solution into //
const foundSolution: SudokuBoard = cloneBoard(emptySudokuBoard);

function backtrackingSolver(
  board: SudokuBoard,
  row: number = 0,
  col: number = 0,
  count: number = 0
) {
  // Early exit as soon as we find more than 1 solution //
  if (count === 2) return { count, foundSolution };
  // If col is 9 we have reached the end of the row //
  if (col === 9) {
    // If we reach board[8][9] the board is solved
    if (row === 8) {
      return { count: (count += 1), foundSolution };
    }
    // Increment row, and reset col to 0 //
    row++;
    col = 0;
  }

  // If the square is not 0 //
  if (board[row][col] > 0) {
    return backtrackingSolver(board, row, col + 1, count);
  }

  // Try every number from 1...9 //
  for (let num = 1; num < 10; num++) {
    // Check if the move is valid //
    if (validMove(board, row, col, blockCoordinates[row][col], num)) {
      // Set square to the number //
      board[row][col] = num;

      // Check if this is a valid solution //
      const solutions = backtrackingSolver(board, row, col + 1, count);

      // If the solutions are higher than the count update count //
      if (solutions.count > count) {
        count = solutions.count;

        // Copy array at row 8, col 8 //
        if (row === 8 && col === 8) cloneBoard(board, foundSolution);

        // Reset this square to 0 to check for non uniqueness //
        board[row][col] = 0;
      }
      // Set the square back to 0 because the number was an incorrect move //
      else board[row][col] = 0;
    }
  }

  // When we have gone through the entire board, return the number of solutions, and the full board //
  return { count, foundSolution };
}

export { backtrackingSolver };
