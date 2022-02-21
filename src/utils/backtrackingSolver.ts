import { validMove } from "./checkHouse";
import { blockCoordinates } from "./blockCoordinates";

function backtrackingSolver(
  board: SudokuBoard,
  row: number = 0,
  col: number = 0
) {
  // If we reach board[8][9] the board is solved
  if (col === 9) {
    if (row === 8) {
      return true;
    }
    row++;
    col = 0;
  }

  // If the square is not 0 move to the next square //
  if (board[row][col] > 0) {
    return backtrackingSolver(board, row, col + 1);
  }

  // Try every number from 1...9 //
  for (let num = 1; num < 10; num++) {
    // Check if the move is valid //
    if (validMove(board, row, col, blockCoordinates[row][col], num)) {
      // Set square to the number //
      board[row][col] = num;
      // Continue down branch //
      if (backtrackingSolver(board, row, col + 1)) {
        // Final return call where we return the board //
        return board;
      }
    }
    // Set the square back to 0 because the number was an incorrect move //
    board[row][col] = 0;
  }

  return false;
}

export { backtrackingSolver };
