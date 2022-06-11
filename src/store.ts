import { readable, writable, get } from "svelte/store";
import { cloneBoard } from "./utils/cloneBoard";

const puzzleSolution = writable([]);
const puzzle = writable([]);
const playerSolution = writable(null);
const puzzleGenerated = writable(false);
const conflicts = writable(null);
const moves = writable([]);
const solved = writable(false);
const timeStarted = 0;

function initialize() {
  if (get(puzzleGenerated) === true) puzzleGenerated.set(false);
  if (get(conflicts) !== null) conflicts.set(null);
  // worker will generate puzzle on different thread to avoid blocking //
  const worker = new Worker(new URL("./utils/worker", import.meta.url));

  // Generate puzzle //
  worker.postMessage("");

  // When the worker finishes generation, copy over puzzle and puzzleSolution //
  worker.onmessage = function (e) {
    puzzle.set(e.data.puzzle);
    puzzleSolution.set(e.data.puzzleSolution);
    playerSolution.set(cloneBoard(e.data.puzzle));
    puzzleGenerated.set(true);
    worker.terminate();
  };
}

function updateSolution(newBoard) {
  playerSolution.set(newBoard);
}

function updateConflicts(newConflicts) {
  conflicts.set(newConflicts);
}

export {
  initialize,
  puzzleSolution,
  puzzle,
  playerSolution,
  puzzleGenerated,
  conflicts,
  updateSolution,
  updateConflicts,
};
