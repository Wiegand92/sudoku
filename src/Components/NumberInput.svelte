<script lang="ts">
  import {
    updateConflicts,
    playerSolution,
    puzzleSolution,
    updateSolved,
    updateSolution,
    moves,
    movesRewound,
    numberSelected,
  } from "../store";
  import { cloneBoard } from "../utils/cloneBoard";
  import { validMove } from "../utils/checkHouse";
  import { blockCoordinates } from "../utils/blockCoordinates";
  import { getColumn, getRow, getBlock } from "../utils/getSections";

  export let rowIndex: number;
  export let colIndex: number;
  export let classList: string;

  // Manipulates playerSolution and moves //
  function addNumber(row: number, col: number, move: number | "") {
    const newPuzzle = cloneBoard($playerSolution);
    newPuzzle[row][col] = move || 0;
    updateSolution(newPuzzle);
    if ($movesRewound > 0) {
      const newMovesArray = [
        ...$moves.slice(0, $moves.length - $movesRewound),
        { row, col, move },
      ];
      $moves = newMovesArray;
      $movesRewound = 0;
    }
    $moves = [...$moves, { row, col, move }];
  }
  // Change Handler //
  function handleChange(e: Event, row: number, col: number) {
    const target = <HTMLInputElement>e.target;
    const number = Number(target.value);
    updateConflicts(null);
    // When number is valid add to board/moves //
    if (number <= 9 && number > 0) {
      if (
        !validMove(
          $playerSolution,
          row,
          col,
          blockCoordinates[row][col],
          number
        )
      ) {
        const columnConflict = getColumn($playerSolution, col).indexOf(number);
        const rowConflict = getRow($playerSolution, row).indexOf(number);
        const blockConflict = getBlock(
          $playerSolution,
          blockCoordinates[row][col]
        ).indexOf(number);
        function getBlockCoords(
          blockConflict: number,
          row: number,
          col: number
        ) {
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
    else if (target.value === "") addNumber(row, col, "");
    // Otherwise set the value to last correct value //
    else {
      console.log("Numbers only!");
      target.value = $playerSolution[row][col];
    }
    if (checkPuzzle()) {
      updateSolved();
    }
  }

  //Check the solution//
  function checkPuzzle() {
    let solved = true;
    for (let row = 0; row < 9; row++) {
      // Early break if solved becomes false //
      if (solved === false) {
        break;
      }
      // Check each value against solution given //
      for (let col = 0; col < 9; col++) {
        if ($puzzleSolution[row][col] !== $playerSolution[row][col]) {
          solved = false;
          break;
        }
      }
    }
    return solved;
  }

  function handleClick(e) {
    const target = <HTMLInputElement>e.target;
    target.focus();
    if ($numberSelected !== null) {
      target.value = $numberSelected;
      target.blur();
    }
  }
</script>

<input
  type="number"
  inputmode="numeric"
  aria-label={`input-${rowIndex}-${colIndex}`}
  min="1"
  max="9"
  value={$playerSolution[rowIndex][colIndex] || ""}
  on:change={(e) => {
    handleChange(e, rowIndex, colIndex);
  }}
  class={classList}
  on:pointerup={handleClick}
/>

<style lang="postcss">
  input[type="number"] {
    @apply m-0 p-0 text-center rounded-none transition-all;
  }
  input[type="number"]:focus {
    @apply bg-slate-500 outline-none;
  }
  /* Remove number input spinners */
  /* Chrome, Safari, Edge, Opera */
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  /* Firefox */
  input[type="number"] {
    -moz-appearance: textfield;
  }
</style>
