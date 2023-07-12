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
    @apply flex flex-col;
  }
  .history {
    @apply flex mx-auto;
  }
  .numbers {
    @apply grid grid-flow-col-dense grid-rows-3;
    @apply mb-2 max-w-min place-self-center;
    @apply md:grid-rows-1;
  }

  :global(.numbers button) {
    @apply mx-1;
  }

  :global(.history *) {
    @apply mx-1;
  }
</style>
