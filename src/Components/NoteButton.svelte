<script lang="ts">
  import { takeNotes } from "../store";
  function handleClick() {
    $takeNotes = !$takeNotes;
  }
</script>

<svg
  xmlns="http://www.w3.org/2000/svg"
  class={$takeNotes ? "" : "inactive"}
  fill="none"
  viewBox="0 0 24 24"
  stroke="currentColor"
  stroke-width="2"
  on:click={handleClick}
>
  <path
    stroke-linecap="round"
    stroke-linejoin="round"
    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
  />
</svg>

<style lang="postcss">
  svg {
    @apply h-[8vw];
    @apply md:h-[6.5vh];
    @apply bg-green-500 rounded-md shadow-lg cursor-pointer aspect-square;
  }
  .inactive {
    @apply bg-slate-500;
  }
</style>
