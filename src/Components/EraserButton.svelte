<script lang="ts">
  import { eraserActive } from "../store";
  $: active = $eraserActive;
</script>

<svg
  on:click={() => ($eraserActive = !$eraserActive)}
  class:active
  xmlns="http://www.w3.org/2000/svg"
  viewBox="-1.5 -1 27 27"
  stroke="currentColor"
  fill-rule="evenodd"
  clip-rule="evenodd"
  ><path
    d="M5.662 23l-5.369-5.365c-.195-.195-.293-.45-.293-.707 0-.256.098-.512.293-.707l14.929-14.928c.195-.194.451-.293.707-.293.255 0 .512.099.707.293l7.071 7.073c.196.195.293.451.293.708 0 .256-.097.511-.293.707l-11.216 11.219h5.514v2h-12.343zm3.657-2l-5.486-5.486-1.419 1.414 4.076 4.072h2.829zm6.605-17.581l-10.677 10.68 5.658 5.659 10.676-10.682-5.657-5.657z"
  /></svg
>

<style lang="postcss">
  svg {
    @apply text-center aspect-square;
    @apply bg-slate-500 rounded-md shadow-lg cursor-pointer;
    @apply h-[8vw];
    @apply md:h-[6.5vh];
  }
  .active {
    @apply bg-green-500;
  }
</style>
