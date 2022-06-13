<script lang="ts">
  import { initialize, puzzleGenerated, updateSolved, solved } from "../store";
  export let raised = false;
</script>

<button
  class={raised ? "raised" : ""}
  on:click={() => {
    initialize();
    if ($solved) updateSolved();
  }}
  disabled={!$puzzleGenerated}
  >{$puzzleGenerated ? "New Game" : "Generating..."}</button
>

<style lang="postcss">
  button {
    @apply h-10 w-60 m-auto bg-green-500 rounded-md shadow-md border-none transition-all;
    @apply text-xl;
  }
  button:hover {
    @apply bg-red-500;
  }
  button:disabled {
    @apply bg-slate-500;
  }
  .raised {
    @apply z-20;
  }
</style>
