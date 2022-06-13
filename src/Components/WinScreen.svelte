<script lang="ts">
  import { onMount } from "svelte";

  import NewGameButton from "./NewGameButton.svelte";
  const confetti = require("canvas-confetti");
  let canvas: HTMLCanvasElement;
  onMount(() => {
    const myConfetti = confetti.create(canvas);
    myConfetti();
  });
</script>

<section>
  <div>
    <h2>Congrats You Win!!!</h2>
    <canvas bind:this={canvas} />
    <NewGameButton raised={true} />
  </div>
</section>

<style lang="postcss">
  section {
    @apply fixed top-0 left-0 h-full w-full flex z-10;
    @apply bg-slate-500 bg-opacity-50;
  }
  h2 {
    @apply m-auto;
  }
  div {
    @apply bg-purple-500 m-auto h-2/3 aspect-square relative flex flex-col;
    @apply rounded-lg shadow-lg;
  }
  canvas {
    @apply h-full w-full absolute;
  }
</style>
