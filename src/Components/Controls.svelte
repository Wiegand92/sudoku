<script lang="ts">
  import BackButton from "./BackButton.svelte";
  import ForwardButton from "./ForwardButton.svelte";
  import NumberButton from "./NumberButton.svelte";
  import NewGameButton from "./NewGameButton.svelte";
  import NoteButton from "./NoteButton.svelte";

  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
</script>

<section>
  <div class="numbers">
    {#each numbers as number}
      <NumberButton {number} />
    {/each}
  </div>
  <div class="history">
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
    @apply flex flex-row mb-2;
    @apply md:mx-auto;
  }

  :global(.numbers button) {
    @apply mx-1;
  }

  :global(.history *) {
    @apply mx-1;
  }
</style>
