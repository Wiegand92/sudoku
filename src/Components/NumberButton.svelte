<script lang="ts">
  import { updateNumberSelected, numberSelected } from "../store";
  import { makeMove } from "../utils/boardManipulations";

  export let number: number;
  let prevElement = null;
  $: active = $numberSelected === number;
  function handleClick() {
    const indices = prevElement.id.split(",");
    if (indices.length === 2) {
      const row = indices[0];
      const col = indices[1];
      makeMove(row, col, number);
      prevElement = null;
    } else {
      if (active) {
        updateNumberSelected(null);
      } else {
        updateNumberSelected(number);
      }
    }
  }
</script>

<button
  class:selected={active}
  on:pointerdown={() => (prevElement = document.activeElement)}
  on:click={handleClick}>{number}</button
>

<style lang="postcss">
  button {
    @apply rounded-md place-items-center aspect-square place-content-center flex;
    @apply bg-slate-500 text-black;
    font-size: calc(2vw + 10px);
    @apply h-[8vw];
    @apply md:h-[6.5vh];
  }
  .selected {
    @apply bg-green-500;
  }
</style>
