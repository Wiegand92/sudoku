<script lang="ts">
  import { playerNotes } from "../store";

  export let noteIndex: number;
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
</script>

<div>
  {#each numbers as number}
    <span>
      {$playerNotes[noteIndex].notes.includes(number) ? number : ""}
    </span>
  {/each}
</div>

<style lang="postcss">
  div {
    @apply grid grid-cols-3 absolute z-10 bg-white;
    @apply aspect-square;
    height: 90%;
    place-self: center;
  }
  span {
    @apply flex aspect-square place-content-center items-center;
    font-size: calc(10% + 8px);
  }
</style>
