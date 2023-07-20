<script lang="ts">
  import { fade } from "svelte/transition";
  import NumberInput from "./NumberInput.svelte";
  import { puzzle, playerSolution, conflicts } from "../store";

  // Returns class list for cells //
  function getClassName(row: number, col: number) {
    let className: string = "puzzlePiece ";
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
    @apply grid grid-cols-9 shadow-lg aspect-square rounded-md bg-black p-[2px] gap-0;
    @apply h-[80vw] md:h-[66vh];
  }

  :global(.puzzlePiece) {
    @apply aspect-square p-0;
    @apply place-content-center flex bg-white;
    font-size: calc(2vw + 10px);
    border: 1px solid black;
  }

  :global(.puzzlePiece:nth-child(n):nth-child(-n + 9)) {
    border-top-width: 4px;
  }
  :global(.puzzlePiece:nth-child(n + 73):nth-child(-n + 81)) {
    border-bottom-width: 4px;
  }
  :global(.puzzlePiece:nth-child(3n)) {
    border-right-width: 4px;
  }
  :global(.puzzlePiece:nth-child(9n + 1)) {
    border-left-width: 4px;
  }
  :global(.puzzlePiece:nth-child(n + 19):nth-child(-n + 27)) {
    border-bottom-width: 4px;
  }
  :global(.puzzlePiece:nth-child(n + 46):nth-child(-n + 54)) {
    border-bottom-width: 4px;
  }
  :global(.conflict p, .conflict) {
    @apply !text-red-600;
  }
  p {
    @apply m-auto;
  }
</style>
