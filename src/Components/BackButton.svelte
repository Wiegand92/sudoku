<script lang="ts">
  import { addNote, moves, movesRewound, playerSolution } from "../store";
  $: active = $moves.length > 0;

  function undoMove() {
    // Only allow undos while there are moves to be undone //
    if (active && $movesRewound < $moves.length) {
      // Find what the last move was //
      const lastMove = $moves[$moves.length - (1 + $movesRewound)];
      console.log(lastMove);
      // Copy moves array before the last move //
      const previousMoves = [...$moves].slice(
        0,
        $moves.length - (1 + $movesRewound)
      );
      if (lastMove.noteIndex === undefined) {
        // Look for previous values at the index //
        const previousValues = previousMoves.filter(
          (move) => move.row === lastMove.row && move.col === lastMove.col
        );
        // If previous values, set to most recent, else set to zero //
        if (previousValues.length > 0) {
          $playerSolution[lastMove.row][lastMove.col] =
            previousValues[previousValues.length - 1].move;
        } else {
          $playerSolution[lastMove.row][lastMove.col] = 0;
        }
      } else {
        addNote(lastMove.noteIndex, lastMove.move);
      }
      // Increment moves rewound //
      $movesRewound += 1;
    }
  }
</script>

<section>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    class={(!active || $movesRewound === $moves.length ? "inactive " : "") +
      "reverse"}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    stroke-width="2"
    on:pointerup={undoMove}
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
    @apply aspect-square;
    @apply bg-green-500 rounded-md shadow-lg cursor-pointer;
    @apply h-[8vw];
    @apply md:h-[6.5vh];
  }
  .inactive {
    @apply bg-slate-500 cursor-default;
  }
</style>
