<script lang="ts">
  import { playerNotes } from "../store";

  export let noteIndex;
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
</script>

<div>
  {#each numbers as number}
    <span>{$playerNotes[noteIndex].notes.includes(number) ? number : ""}</span>
  {/each}
</div>

<style lang="postcss">
  div {
    @apply text-[0.5rem];
    @apply grid grid-cols-3 absolute -z-10;
    @apply h-10 w-10 aspect-square p-0;
    @apply md:h-20 md:text-sm md:w-20;
    @apply place-items-center;
  }
</style>
