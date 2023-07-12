import { readable, writable, get, derived } from "svelte/store";
import { initialize } from "../store";
import { cloneBoard } from "../utils/cloneBoard";
import type { SudokuBoard } from "../utils/sudokuTypes";

// Holds the filled out puzzle for checking //
export const puzzleSolution = writable([]);
// Puzzle with holes //
const puzzle = writable([]);
// Puzzle with player answers //
const playerSolution = writable(null);
// Is the puzzle generated //
const puzzleGenerated = writable(false);

function generatePuzzle(): Promise<{
  puzzle: SudokuBoard;
  playerSolution: SudokuBoard;
  puzzleSolution: SudokuBoard;
}> {
  const worker = new Worker(new URL("../utils/worker", import.meta.url));
  // Generate puzzle //
  worker.postMessage("");

  return new Promise((resolve, reject) => {
    // When the worker finishes generation, terminate. Return puzzle, puzzleSolution, playerSolution //
    worker.onmessage = function (e) {
      worker.terminate();
      resolve({
        puzzle: e.data.puzzle,
        playerSolution: cloneBoard(e.data.puzzle),
        puzzleSolution: e.data.puzzleSolution,
      });
    };
  });
}

export const derivedPuzzles = derived(
  [puzzle, playerSolution, puzzleSolution, puzzleGenerated],
  ([$puzzle, $playerSolution, $puzzleSolution, $puzzleGenerated]) => {
    return {
      initialize: async () => {
        const puzzles = await generatePuzzle();
        $puzzle = puzzles.puzzle;
        $playerSolution = puzzles.playerSolution;
        $puzzleSolution = puzzles.puzzleSolution;
        $puzzleGenerated = true;
        console.log($puzzle);
      },
      reset: () => {
        $puzzleGenerated = false;
        $puzzle = [];
        $puzzleSolution = [];
        $playerSolution = [];
        initialize();
      },
    };
  }
);
