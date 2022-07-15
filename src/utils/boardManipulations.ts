import {
  playerSolution,
  updateSolution,
  movesRewound,
  updateRewinds,
  moves,
  updateMoves,
  updateConflicts,
  updateSolved,
  puzzleSolution,
  takeNotes,
  playerNotes,
  addNote,
} from "../store";
import { get } from "svelte/store";
import { cloneBoard } from "./cloneBoard";
import { blockCoordinates } from "./blockCoordinates";
import { validMove } from "./checkHouse";
import { getRow, getColumn, getBlock } from "./getSections";

// Manipulates playerSolution and moves //
function addNumber(row: number, col: number, move: number | "") {
  const takingNotes = get(takeNotes);
  const pNotes = get(playerNotes);
  let noteIndex;
  // Clone puzzle to make changes //
  const newPuzzle = cloneBoard(get(playerSolution));
  // Set puzzle index to move given or 0 //
  if (!takingNotes) {
    newPuzzle[row][col] = move || 0;
    console.log(newPuzzle[row][col]);
    updateSolution(newPuzzle);
  } else {
    noteIndex = pNotes.findIndex(
      (note) => note.index[0] === row && note.index[1] === col
    );
    addNote(noteIndex, move);
  }
  // Update moves array //
  const rewinds = get(movesRewound);
  const playerMoves = get(moves);
  // If player has rewound remove future moves and set rewinds to 0 //
  const newMove = takingNotes ? { noteIndex, move } : { row, col, move };
  if (rewinds > 0) {
    const newMovesArray = [
      ...playerMoves.slice(0, playerMoves.length - rewinds),
      newMove,
    ];
    updateMoves(newMovesArray);
    updateRewinds(0);
  } else {
    // Else add move to end of array //
    updateMoves([...playerMoves, newMove]);
  }
}

function getBlockCoords(blockConflict: number, row: number, col: number) {
  let blockCol = blockConflict % 3;
  let blockRow;
  if (blockConflict > 5) blockRow = 2;
  else if (blockConflict > 2) blockRow = 1;
  else blockRow = 0;
  const blockNum = blockCoordinates[row][col];
  switch (blockNum) {
    case 1:
      blockCol += 3;
      break;
    case 2:
      blockCol += 6;
      break;
    case 3:
      blockRow += 3;
      break;
    case 4: {
      blockCol += 3;
      blockRow += 3;
      break;
    }
    case 5: {
      blockCol += 6;
      blockRow += 3;
      break;
    }
    case 6: {
      blockRow += 6;
      break;
    }
    case 7: {
      blockCol += 3;
      blockRow += 6;
      break;
    }
    case 8: {
      blockCol += 6;
      blockRow += 6;
      break;
    }
  }
  return { blockRow, blockCol };
}

function makeMove(row, col, number) {
  const solution = get(playerSolution);
  // When number is valid add to board/moves //
  console.log(number);
  if (number <= 9 && number > 0) {
    if (!validMove(solution, row, col, blockCoordinates[row][col], number)) {
      const columnConflict = getColumn(solution, col).indexOf(number);
      const rowConflict = getRow(solution, row).indexOf(number);
      const blockConflict = getBlock(
        solution,
        blockCoordinates[row][col]
      ).indexOf(number);
      const newConflicts = {
        origin: { row, col },
        rowConflict: { col: rowConflict, row },
        columnConflict: { row: columnConflict, col },
        blockConflict:
          blockConflict !== -1
            ? getBlockCoords(blockConflict, row, col)
            : { blockRow: -1, blockCol: -1 },
      };

      updateConflicts(newConflicts);
    }
    addNumber(row, col, number);
  }
  // When the player clears the box set it to null //
  else if (number === 0) {
    console.log(number);
    addNumber(row, col, 0);
  }
  if (checkPuzzle()) {
    updateSolved();
  }
}

//Check the solution//
function checkPuzzle() {
  const pSolution = get(playerSolution);
  const solution = get(puzzleSolution);
  let solved = true;
  for (let row = 0; row < 9; row++) {
    // Early break if solved becomes false //
    if (solved === false) {
      break;
    }
    // Check each value against solution given //
    for (let col = 0; col < 9; col++) {
      if (solution[row][col] !== pSolution[row][col]) {
        solved = false;
        break;
      }
    }
  }
  return solved;
}

export { makeMove };
