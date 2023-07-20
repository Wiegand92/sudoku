<script lang="ts">
  import {
    updateConflicts,
    playerSolution,
    numberSelected,
    playerNotes,
    takeNotes,
    eraserActive,
  } from "../store";
  import { makeMove } from "../utils/boardManipulations";
  import Note from "./Note.svelte";

  export let rowIndex: number;
  export let colIndex: number;
  export let classList: string;
  let noteIndex: number;
  $: showNotes = $playerSolution[rowIndex][colIndex] === 0;
  $playerNotes.some((note, index) => {
    if (note.index[0] === rowIndex && note.index[1] === colIndex) {
      noteIndex = index;
      return true;
    }
  });

  function handleChange(e: Event, row: number, col: number) {
    const target = <HTMLInputElement>e.target;
    const number = Number(target.value);
    updateConflicts(null);
    makeMove(row, col, number);
    if ($takeNotes) {
      target.value = "";
    }
  }

  function handleClick(e: Event, row: number, col: number) {
    const target = <HTMLInputElement>e.target;
    console.log(target.value, $eraserActive);
    target.focus();
    if ($numberSelected !== null && !$eraserActive) {
      makeMove(row, col, $numberSelected);
      if ($takeNotes) target.value = "";
      target.blur();
    }
    if ($eraserActive && target.value !== "") {
      makeMove(row, col, 0);
    }
  }
</script>

<div class={classList}>
  {#if showNotes}
    <Note {noteIndex} />
  {/if}
  <input
    type="number"
    inputmode="none"
    aria-label={`input-${rowIndex}-${colIndex}`}
    id={`${rowIndex},${colIndex}`}
    min="1"
    max="9"
    value={$playerSolution[rowIndex][colIndex] || ""}
    on:change={(e) => {
      handleChange(e, rowIndex, colIndex);
    }}
    on:click={(e) => handleClick(e, rowIndex, colIndex)}
  />
</div>

<style lang="postcss">
  div {
    @apply relative flex;
  }
  input[type="number"] {
    @apply aspect-square p-0 text-center rounded-none transition-all z-20 bg-opacity-0 text-purple-700 bg-white border-0;
    font-size: calc(2vw + 10px);
  }
  input[type="number"]:focus {
    @apply bg-purple-500 bg-opacity-50 outline-none text-black;
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
