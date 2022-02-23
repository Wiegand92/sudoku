import type { SudokuBoard } from "../global";
import { backtrackingSolver, foundSolution } from "./backtrackingSolver";
import { blockCoordinates } from "./blockCoordinates";
import { validMove } from "./checkHouse";
import { printBoard } from "./printBoard";

function puzzleGenerator() {
  const emptyPuzzle: SudokuBoard = [
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

  // Try to randomly fill the entire puzzle //
  for (let i = 1; i < 82; i++) {
    let num = Math.floor(Math.random() * 9);
    let row = Math.floor(Math.random() * 8);
    let col = Math.floor(Math.random() * 8);

    if (validMove(emptyPuzzle, row, col, blockCoordinates[row][col], num)) {
      emptyPuzzle[row][col] = num;
    }
  }

  if (backtrackingSolver(emptyPuzzle) === 1) {
    return foundSolution;
  } else {
    return puzzleGenerator();
  }
}

export { puzzleGenerator };
