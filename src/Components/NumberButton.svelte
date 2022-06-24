<script lang="ts">
  import { updateNumberSelected, numberSelected } from "../store";
  import { makeMove } from "../utils/boardManipulations";

  export let number: number;
  let prevElement = null;
  function handleClick() {
    if (prevElement !== null) {
      const indices = prevElement.id.split(",");
      if (indices.length === 2) {
        const row = indices[0];
        const col = indices[1];
        makeMove(row, col, number);
        prevElement = null;
      }
    } else {
      $numberSelected === number
        ? updateNumberSelected(null)
        : updateNumberSelected(number);
    }
  }
</script>

<button
  on:pointerdown={() => (prevElement = document.activeElement)}
  on:click={handleClick}>{number}</button
>

<style lang="postcss"></style>
