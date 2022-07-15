<script lang="ts">
  import { addNote, moves, movesRewound, playerSolution } from "../store";
  $: active = $moves.length > 0;

  function redoMove() {
    if (active) {
      const newMoveIndex = $movesRewound - 1;
      const nextMove = $moves[$moves.length - 1 - newMoveIndex];
      if (nextMove.noteIndex === undefined) {
        $playerSolution[nextMove.row][nextMove.col] = nextMove.move;
      } else {
        addNote(nextMove.noteIndex, nextMove.move);
      }
      $movesRewound = newMoveIndex;
    }
  }
</script>

<section>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    class={(!active || $movesRewound === 0 ? "inactive " : "") + "forwards"}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    stroke-width="2"
    on:pointerup={redoMove}
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"
    />
  </svg>
</section>

<style lang="postcss">
  svg {
    @apply h-10 w-10;
    @apply md:h-20 md:w-20;
    @apply bg-green-500 rounded-md shadow-lg cursor-pointer;
  }
  .inactive {
    @apply bg-slate-500 cursor-default;
  }
  .forwards {
    transform: scaleX(-1);
  }
</style>
