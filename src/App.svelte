<script lang="ts">
  import { onMount } from "svelte";

  import GameLayout from "./Components/GameLayout.svelte";
  import { derivedPuzzles, puzzleSolution } from "./Stores/puzzleStore";

  onMount(async () => {
    const puzzles = await $derivedPuzzles.initialize();
    console.log($puzzleSolution);
  });
</script>

<section>
  <h1>Sudoku by: Alex Wiegand</h1>
  <GameLayout />
</section>

<style lang="postcss">
  :global(html, body) {
    @apply p-0 m-0 h-full w-full fixed;
  }
  :global(*, *::after, *::before) {
    @apply box-border;
  }
  section {
    @apply h-[calc(100%-68px)];
  }
  h1 {
    @apply text-3xl bg-purple-500 m-0 p-4 text-right;
  }
</style>
