import { getRow, getColumn, getBlock } from "./getSections";

function checkRow(grid: SudokuBoard, row: number, num: number) {
  const fullRow: number[] = getRow(grid, row);

  // true if number is not present, false if it is //
  let valid = !fullRow.includes(num);

  return valid;
}

function checkColumn(grid: SudokuBoard, col: number, num: number) {
  const fullColumn: number[] = getColumn(grid, col);

  let valid = !fullColumn.includes(num);

  return valid;
}

function checkBlock(grid: SudokuBoard, block: number, num: number) {
  const fullBlock: number[] = getBlock(grid, block);

  let valid = !fullBlock.includes(num);

  return valid;
}

function validMove(
  grid: SudokuBoard,
  row: number,
  col: number,
  block: number,
  num: number
) {
  return (
    checkBlock(grid, block, num) &&
    checkColumn(grid, col, num) &&
    checkRow(grid, row, num)
  );
}

export { checkBlock, checkColumn, checkRow, validMove };
