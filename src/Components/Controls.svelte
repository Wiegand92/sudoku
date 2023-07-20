<script lang="ts">
  import BackButton from "./BackButton.svelte";
  import ForwardButton from "./ForwardButton.svelte";
  import NumberButton from "./NumberButton.svelte";
  import NewGameButton from "./NewGameButton.svelte";
  import NoteButton from "./NoteButton.svelte";
  import EraserButton from "./EraserButton.svelte";

  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
</script>

<section>
  <div class="numbers">
    {#each numbers as number}
      <NumberButton {number} />
    {/each}
  </div>
  <div class="history">
    <EraserButton />
    <BackButton />
    <NewGameButton />
    <ForwardButton />
    <NoteButton />
  </div>
</section>

<style lang="postcss">
  section {
    @apply flex flex-col w-full items-center;
  }
  .history {
    @apply flex place-content-around;
  }
  .numbers {
    @apply flex;
    @apply place-content-around;
  }
</style>
