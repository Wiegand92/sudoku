import type { SudokuBoard } from "./sudokuTypes";

function cloneBoard(board: SudokuBoard, targetBoard?: SudokuBoard) {
  if (!!targetBoard) {
    board.forEach((row, rowIndex) => {
      row.forEach((col, colIndex) => {
        targetBoard[rowIndex][colIndex] = col;
      });
    });
    return;
  } else return board.map((row) => row.slice());
}

export { cloneBoard };
