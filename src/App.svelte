<script lang="ts">
  import GameLayout from "./Components/GameLayout.svelte";
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
    @apply p-0 m-0 h-full w-full fixed flex flex-col;
  }
  h1 {
    @apply text-3xl bg-purple-500 m-0 p-4 text-right;
  }
</style>
