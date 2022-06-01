import type { SudokuBoard } from "./sudokuTypes";
import { backtrackingSolver } from "./backtrackingSolver";
import { blockCoordinates } from "./blockCoordinates";
import { validMove } from "./checkHouse";

function generateBoard(): SudokuBoard {
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
    // If the board is empty at [row][col] & this is a valid move, fill the square //
    if (
      validMove(emptyPuzzle, row, col, blockCoordinates[row][col], num) &&
      emptyPuzzle[row][col] === 0
    ) {
      emptyPuzzle[row][col] = num;
    }
  }

  const filledBoard = backtrackingSolver(emptyPuzzle);

  if (filledBoard.count === 1) {
    return filledBoard.foundSolution;
  } else {
    return generateBoard();
  }
}

function generatePuzzle(difficulty: "hard" | "medium" | "easy" = "easy") {
  const puzzleSolution: SudokuBoard = generateBoard();

  // Make a copy of the full board to poke holes in //
  let puzzle: SudokuBoard = [];

  for (let row = 0; row < 9; row++) {
    const newRow = [];
    for (let col = 0; col < 9; col++) {
      newRow.push(puzzleSolution[row][col]);
    }
    puzzle[row] = [...newRow];
  }

  // For now we define difficulty by the number of empty cells //
  // Easy = 41 //
  // Medium = 51 //
  // Difficult = 61 //
  if (difficulty === "easy") {
    for (let i = 0; i < 41; i++) {
      function getRandomCell() {
        return Math.floor(Math.random() * 9);
      }
      function pokeHole() {
        const x = getRandomCell();
        const y = getRandomCell();
        const prevValue = puzzle[x][y];
        if (puzzle[x][y] !== 0) {
          puzzle[x][y] = 0;
          if (backtrackingSolver(puzzle).count === 1) return;
          else {
            puzzle[x][y] = prevValue;
            pokeHole();
          }
        } else {
          pokeHole();
        }
      }
      pokeHole();
    }
  }

  return { puzzleSolution, puzzle };
}

export { generateBoard, generatePuzzle };
