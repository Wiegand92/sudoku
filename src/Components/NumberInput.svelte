<script lang="ts">
  import { onMount } from "svelte";

  import {
    updateConflicts,
    playerSolution,
    numberSelected,
  } from "../store";
  import { makeMove } from "../utils/boardManipulations";

  export let rowIndex: number;
  export let colIndex: number;
  export let classList: string;

  function handleChange(e: Event, row: number, col: number) {
    const target = <HTMLInputElement>e.target;
    const number = Number(target.value);
    updateConflicts(null);
    makeMove(row, col, number);
  }

  function handleClick(e, row, col) {
    const target = <HTMLInputElement>e.target;
    target.focus();
    if ($numberSelected !== null) {
      makeMove(row, col, $numberSelected);
      target.blur();
    }
  }
</script>

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

<style lang="postcss">
  input[type="number"] {
    @apply m-0 p-0 text-center rounded-none transition-all text-purple-700;
  }
  input[type="number"]:focus {
    @apply bg-purple-500 outline-none text-black;
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
