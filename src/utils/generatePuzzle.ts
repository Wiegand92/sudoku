import type { SudokuBoard } from "./sudokuTypes";
import { backtrackingSolver } from "./backtrackingSolver";
import { blockCoordinates } from "./blockCoordinates";
import { validMove } from "./checkHouse";
import { copyPuzzle } from "./copyPuzzle";

async function generateBoard(): Promise<SudokuBoard> {
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

  const filledBoard = await backtrackingSolver(emptyPuzzle);

  if (filledBoard.count === 1) {
    return filledBoard.foundSolution;
  } else {
    return await generateBoard();
  }
}

async function generatePuzzle(difficulty: "hard" | "medium" | "easy" = "easy") {
  const puzzleSolution: SudokuBoard = await generateBoard();

  // Make a copy of the full board to poke holes in //
  let puzzle: SudokuBoard = [];

  copyPuzzle(puzzleSolution, puzzle);

  // For now we define difficulty by the number of empty cells //
  // Easy = 41 //
  // Medium = 51 //
  // Difficult = 61 //
  if (difficulty === "easy") {
    for (let i = 0; i < 41; i++) {
      await pokeHole(puzzle);
    }
  }

  return { puzzleSolution, puzzle };
}

function getRandomCell() {
  return Math.floor(Math.random() * 9);
}

// Picks random coordinates to set to 0 and checks that the puzzle has only one solution //
async function pokeHole(puzzle) {
  const x = getRandomCell();
  const y = getRandomCell();
  const prevValue = puzzle[x][y];
  if (puzzle[x][y] !== 0) {
    puzzle[x][y] = 0;
    // need to copy puzzle to avoid mutation //
    const puzzleCopy = copyPuzzle(puzzle);
    const solution = await backtrackingSolver(puzzleCopy);
    if (solution.count === 1) return;
    else {
      puzzle[x][y] = prevValue;
      return await pokeHole(puzzle);
    }
  } else {
    return await pokeHole(puzzle);
  }
}

export { generateBoard, generatePuzzle };
