<script lang="ts">
  import { fade } from "svelte/transition";
  import LoadingScreen from "./LoadingScreen.svelte";
  import { blockCoordinates } from "../utils/blockCoordinates";
  import { validMove } from "../utils/checkHouse";
  import { getBlock, getColumn, getRow } from "../utils/getSections";
  import {
    initialize,
    puzzle,
    playerSolution,
    puzzleSolution,
    puzzleGenerated,
    conflicts,
    updateSolution,
    updateConflicts,
  } from "../store";
  import { cloneBoard } from "../utils/cloneBoard";
  // An array of moves for time travel //
  const moves = [];

  initialize();

  // Returns class list for cells //
  function getClassName(row: number, col: number) {
    let className: string = "";
    const adjustedRow = row + 1;
    const adjustedCol = col + 1;
    if (adjustedRow % 3 === 0) {
      className += "rowDivider ";
    }
    if (adjustedCol % 3 === 0) {
      className += "colDivider ";
    }
    if (adjustedCol === 1) {
      className += "firstCol ";
    }
    if (adjustedRow === 1) {
      className += "topRow ";
    }
    if (adjustedCol === 1 && adjustedRow === 1) {
      className += "topL ";
    }
    if (adjustedCol === 9 && adjustedRow === 1) {
      className += "topR ";
    }
    if (adjustedCol === 1 && adjustedRow === 9) {
      className += "botL ";
    }
    if (adjustedCol === 9 && adjustedRow === 9) {
      className += "botR ";
    }
    if ($conflicts !== null) {
      const { rowConflict, columnConflict, blockConflict, origin } = $conflicts;
      if (
        (row === rowConflict.row && col === rowConflict.col) ||
        (col === columnConflict.col && row === columnConflict.row) ||
        (col === origin.col && row === origin.row) ||
        (col === blockConflict.blockCol && row === blockConflict.blockRow)
      ) {
        className += "conflict ";
      }
    }
    return className.trim();
  }

  // Manipulates playerSolution and moves //
  function addNumber(row: number, col: number, move: number | "") {
    const newPuzzle = cloneBoard($playerSolution);
    newPuzzle[row][col] = move || 0;
    updateSolution(newPuzzle);
    moves.push({ row, col, move });
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
          blockConflict: getBlockCoords(blockConflict, row, col),
        };

        updateConflicts(newConflicts);
        console.log($conflicts);
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
      alert("Congrats you win!!!");
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
</script>

<section>
  {#if $puzzleGenerated}
    <div class="puzzleGrid" transition:fade>
      {#each $playerSolution as row, rowIndex}
        {#each row as column, colIndex ([rowIndex, colIndex])}
          {#if $puzzle[rowIndex][colIndex] !== 0}
            <span class={getClassName(rowIndex, colIndex)}>
              <p>{column}</p>
            </span>
          {:else}
            <input
              type="number"
              inputmode="numeric"
              min="1"
              max="9"
              value={$playerSolution[rowIndex][colIndex] || ""}
              on:change={(e) => {
                handleChange(e, rowIndex, colIndex);
              }}
              class={getClassName(rowIndex, colIndex)}
            />
          {/if}
        {/each}
      {/each}
    </div>
  {:else}
    <LoadingScreen />
  {/if}
  <button on:click={initialize} disabled={!$puzzleGenerated}>New Game</button>
</section>

<style lang="postcss">
  section {
    @apply h-full flex flex-col place-content-around;
  }
  .puzzleGrid {
    @apply inline-grid flex-initial grid-cols-9 m-auto shadow-lg rounded-md bg-black;
  }
  span,
  input {
    @apply h-10 w-10 aspect-square p-0;
    @apply border-solid border-black border-[1px] flex place-content-center bg-white;
    @apply md:h-20 md:w-20;
  }
  .conflict p,
  .conflict {
    @apply text-red-600;
  }
  p {
    @apply m-auto p-0;
  }
  input[type="number"] {
    @apply m-0 p-0 text-center rounded-none;
  }
  input[type="number"]:focus {
    @apply bg-slate-500 outline-none;
  }
  p,
  input[type="number"] {
    @apply text-3xl font-mono;
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
  .rowDivider {
    @apply border-b-4;
  }
  .colDivider {
    @apply border-r-4;
  }
  .topRow {
    @apply border-t-4;
  }

  .firstCol {
    @apply border-l-4;
  }
  .topR,
  .topR p {
    @apply !rounded-tr-md;
  }
  .topL,
  .topL p {
    @apply !rounded-tl-md;
  }
  .botR,
  .botR p {
    @apply !rounded-br-md;
  }
  .botL,
  .botL p {
    @apply !rounded-bl-md;
  }
</style>
