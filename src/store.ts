import { readable, writable, get } from "svelte/store";
import { cloneBoard } from "./utils/cloneBoard";

// Holds the filled out puzzle for checking //
const puzzleSolution = writable([]);
// Puzzle with holes //
const puzzle = writable([]);
// Puzzle with player answers //
const playerSolution = writable(null);
// Is the puzzle generated //
const puzzleGenerated = writable(false);
// Conflicts object for clearly wrong answers //
const conflicts = writable(null);
// History of player moves //
const moves = writable([]);
// How many times the back button is used //
const movesRewound = writable(0);
// Is the puzzle finished //
const solved = writable(false);
// Which numberButton is currently active //
const numberSelected = writable(null);
// Holds any notes the player has made //
const playerNotes = writable([]);
// Is the player taking notes //
const takeNotes = writable(true);
const timeStarted = 0;
// Is the Eraser active //
const eraserActive = writable(false);

function initialize() {
  if (get(puzzleGenerated) === true) puzzleGenerated.set(false);
  conflicts.set(null);
  moves.set([]);
  movesRewound.set(0);

  // worker will generate puzzle on different thread to avoid blocking //
  const worker = new Worker(new URL("./utils/worker", import.meta.url));

  // Generate puzzle //
  worker.postMessage("");

  // When the worker finishes generation, copy over puzzle and puzzleSolution //
  worker.onmessage = function (e) {
    puzzle.set(e.data.puzzle);
    puzzleSolution.set(e.data.puzzleSolution);
    playerSolution.set(cloneBoard(e.data.puzzle));
    initializeNotes();
    puzzleGenerated.set(true);
    worker.terminate();
  };
}

function updateNumberSelected(num: null | number) {
  numberSelected.set(num);
}

function updateRewinds(num: number) {
  movesRewound.set(num);
}

function updateMoves(newMoves) {
  moves.set(newMoves);
}

function updateSolution(newBoard) {
  playerSolution.set(newBoard);
}

function updateConflicts(newConflicts) {
  conflicts.set(newConflicts);
}

function updateSolved() {
  get(solved) ? solved.set(false) : solved.set(true);
}

function initializeNotes() {
  const notes = [];
  get(puzzle).forEach((row, rowIndex) => {
    row.forEach((col, colIndex) => {
      if (col === 0) {
        notes.push({ index: [rowIndex, colIndex], notes: [] });
      }
    });
  });
  playerNotes.set(notes);
}

function addNote(index, move) {
  const pNotes = [...get(playerNotes)];
  if (pNotes[index].notes.includes(move)) {
    pNotes[index].notes = pNotes[index].notes.filter(
      (number) => number !== move
    );
    console.log(pNotes[index]);
  } else {
    pNotes[index].notes.push(move);
    console.log(pNotes[index]);
  }
  playerNotes.set(pNotes);
}
export {
  initialize,
  puzzleSolution,
  puzzle,
  playerSolution,
  updateSolution,
  puzzleGenerated,
  conflicts,
  updateConflicts,
  solved,
  updateSolved,
  moves,
  updateMoves,
  movesRewound,
  updateRewinds,
  numberSelected,
  updateNumberSelected,
  playerNotes,
  takeNotes,
  addNote,
  eraserActive,
};
