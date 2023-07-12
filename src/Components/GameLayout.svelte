<script lang="ts">
  import { onMount } from "svelte";
  import { solved, puzzleGenerated, initialize } from "../store";
  import WinScreen from "./WinScreen.svelte";
  import Controls from "./Controls.svelte";
  import SudokuBoard from "./SudokuBoard.svelte";
  import LoadingScreen from "./LoadingScreen.svelte";
  onMount(initialize);
</script>

<section>
  {#if $solved}
    <WinScreen />
  {/if}

  {#if $puzzleGenerated}
    <SudokuBoard />
  {:else}
    <LoadingScreen />
  {/if}

  {#if !$solved}
    <Controls />
  {/if}
</section>

<style lang="postcss">
  section {
    @apply h-full flex flex-col;
  }
</style>
