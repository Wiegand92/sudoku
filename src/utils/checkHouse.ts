import type { SudokuBoard } from "../global";
import { getRow, getColumn, getBlock } from "./getSections";

function checkRow(board: SudokuBoard, row: number, num: number) {
  const fullRow: number[] = getRow(board, row);

  // true if number is not present, false if it is //
  let valid = !fullRow.includes(num);

  return valid;
}

function checkColumn(board: SudokuBoard, col: number, num: number) {
  const fullColumn: number[] = getColumn(board, col);

  let valid = !fullColumn.includes(num);

  return valid;
}

function checkBlock(board: SudokuBoard, block: number, num: number) {
  const fullBlock: number[] = getBlock(board, block);

  let valid = !fullBlock.includes(num);

  return valid;
}

function validMove(
  board: SudokuBoard,
  row: number,
  col: number,
  block: number,
  num: number
) {
  return (
    checkBlock(board, block, num) &&
    checkColumn(board, col, num) &&
    checkRow(board, row, num)
  );
}

export { checkBlock, checkColumn, checkRow, validMove };
