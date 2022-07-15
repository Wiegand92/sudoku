<script lang="ts">
  import {
    updateConflicts,
    playerSolution,
    numberSelected,
    playerNotes,
    takeNotes,
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

  function handleClick(e, row, col) {
    const target = <HTMLInputElement>e.target;
    target.focus();
    if ($numberSelected !== null) {
      makeMove(row, col, $numberSelected);
      if ($takeNotes) target.value = "";
      target.blur();
    }
  }
</script>

<div>
  {#if showNotes}
    <Note {noteIndex} />
  {/if}
  <input
    type="number"
    inputmode="numeric"
    aria-label={`input-${rowIndex}-${colIndex}`}
    id={`${rowIndex},${colIndex}`}
    min="1"
    max="9"
    value={$playerSolution[rowIndex][colIndex] || ""}
    on:change={(e) => {
      handleChange(e, rowIndex, colIndex);
    }}
    class={classList}
    on:click={(e) => handleClick(e, rowIndex, colIndex)}
  />
</div>

<style lang="postcss">
  input[type="number"] {
    @apply m-0 p-0 text-center rounded-none transition-all text-purple-700 bg-opacity-0;
  }
  input[type="number"]:focus {
    @apply bg-purple-500 outline-none text-black bg-opacity-50;
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
