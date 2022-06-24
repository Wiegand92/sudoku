<script lang="ts">
  import { moves, movesRewound, playerSolution } from "../store";
  $: active = $moves.length > 0;

  function undoMove() {
    // Only allow undos while there are moves to be undone //
    if (active && $movesRewound < $moves.length) {
      // Find what the last move was //
      const lastMove = $moves[$moves.length - (1 + $movesRewound)];
      // Copy moves array before the last move //
      const previousMoves = [...$moves].slice(
        0,
        $moves.length - (1 + $movesRewound)
      );
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
      // Increment moves rewound //
      $movesRewound += 1;
    }
  }
  function redoMove() {
    if (active) {
      const newMoveIndex = $movesRewound - 1;
      const nextMove = $moves[$moves.length - 1 - newMoveIndex];
      $playerSolution[nextMove.row][nextMove.col] = nextMove.move;
      $movesRewound = newMoveIndex;
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
