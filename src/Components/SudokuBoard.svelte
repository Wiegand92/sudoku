<script lang="ts">
  import { fade } from "svelte/transition";
  import NumberInput from "./NumberInput.svelte";
  import { puzzle, playerSolution, conflicts } from "../store";

  // Returns class list for cells //
  function getClassName(row: number, col: number) {
    let className: string = "puzzlePiece ";
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
</script>

<div class="puzzleGrid" in:fade>
  {#each $playerSolution as row, rowIndex}
    {#each row as column, colIndex ([rowIndex, colIndex])}
      {#if $puzzle[rowIndex][colIndex] !== 0}
        <span class={getClassName(rowIndex, colIndex)}>
          <p>{column}</p>
        </span>
      {:else}
        <NumberInput
          {rowIndex}
          {colIndex}
          classList={getClassName(rowIndex, colIndex)}
        />
      {/if}
    {/each}
  {/each}
</div>

<style lang="postcss">
  .puzzleGrid {
    @apply inline-grid flex-initial grid-cols-9 m-auto shadow-lg rounded-md bg-opacity-0;
  }
  :global(.puzzlePiece) {
    @apply h-10 w-10 aspect-square p-0;
    @apply text-2xl;
    @apply md:text-3xl;
    @apply border-solid border-black border-[1px] flex place-content-center bg-white;
    @apply md:h-20 md:w-20;
  }
  :global(.conflict p, .conflict) {
    @apply !text-red-600;
  }
  p {
    @apply m-auto p-0;
  }
  :global(.rowDivider) {
    @apply border-b-4;
  }
  :global(.colDivider) {
    @apply border-r-4;
  }
  :global(.topRow) {
    @apply border-t-4;
  }

  :global(.firstCol) {
    @apply border-l-4;
  }
  :global(.topR, .topR p) {
    @apply !rounded-tr-md;
  }
  :global(.topL, .topL p) {
    @apply !rounded-tl-md;
  }
  :global(.botR, .botR p) {
    @apply !rounded-br-md;
  }
  :global(.botL, .botL p) {
    @apply !rounded-bl-md;
  }
</style>
