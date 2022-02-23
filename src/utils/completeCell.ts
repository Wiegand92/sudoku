import type { SudokuBoard } from "../global";

import { getRow, getColumn, getBlock } from "./getSections";
import { blockCoordinates } from "./blockCoordinates";

function completeCell(board: SudokuBoard, row: number, column: number) {
  const usedNumbers = [
    ...getRow(board, row),
    ...getColumn(board, column),
    ...getBlock(board, blockCoordinates[row][column]),
  ].filter((item) => item !== 0);
  let possibilities: number[] = [];

  // For every possible number, check if it is already taken //
  for (let i = 1; i <= 9; i++) {
    if (!usedNumbers.includes(i)) {
      possibilities.push(i);
    }
  }

  // If there is only one possibility set the cell to the number //
  if (possibilities.length === 1) {
    board[row][column] = possibilities[0];
  } else {
    board[row][column] = possibilities;
  }
}

export { completeCell };
