<script lang="ts">
  import NumberButton from "./NumberButton.svelte";

  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
</script>

<section>
  <slot name="history" />
  <slot name="new-game" />
  {#each numbers as number}
    <NumberButton {number} />
  {/each}
</section>

<style lang="postcss">
  section {
    @apply flex flex-row justify-center;
  }
</style>
