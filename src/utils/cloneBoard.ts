import type { SudokuBoard } from "./sudokuTypes";

export function cloneBoard(array: SudokuBoard) {
  return array.map((row) => row.slice());
}
