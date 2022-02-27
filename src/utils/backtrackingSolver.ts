import { validMove } from "./checkHouse";
import { blockCoordinates } from "./blockCoordinates";
import { printBoard } from "./printBoard";

import type { SudokuBoard } from "./sudokuTypes";

// Create an empty board to copy solution into //
const foundSolution: SudokuBoard = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
];

function backtrackingSolver(
  board: SudokuBoard,
  row: number = 0,
  col: number = 0,
  count: number = 0
) {
  // If we reach board[8][9] the board is solved
  if (col === 9) {
    if (row === 8) {
      return (count += 1);
    }
    row++;
    col = 0;
  }

  // If the square is not 0 move to the next square //
  if (board[row][col] > 0 && count < 2) {
    return backtrackingSolver(board, row, col + 1, count);
  }

  // Try every number from 1...9 //
  for (let num = 1; num < 10 && count < 2; num++) {
    // Check if the move is valid //
    if (validMove(board, row, col, blockCoordinates[row][col], num)) {
      // Set square to the number //
      board[row][col] = num;
      const solutions = backtrackingSolver(board, row, col + 1, count);

      // If the solutions are higher than the count, copy the array //
      if (solutions > count) {
        count = solutions;
        for (let r = 0; r < 9; r++) {
          for (let c = 0; c < 9; c++) {
            if (board[r][c] > 0) {
              // This is not copying properly //
              foundSolution[r][c] = board[r][c];
            }
          }
        }

        // This is being logged more times than it should be //
        // console.log("The current board:");
        // printBoard(board);
        // console.log("The copied board");
        // printBoard(foundSolution);
        // After the array is copied, reset this square to 0 to check for non uniqueness //
        board[row][col] = 0;
      }
    }
    // Set the square back to 0 because the number was an incorrect move //
    board[row][col] = 0;
  }
  return count;
}

export { backtrackingSolver, foundSolution };
