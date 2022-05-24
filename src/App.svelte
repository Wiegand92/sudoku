<script lang='ts'>
    import SudokuBoard from "./SudokuBoard.svelte";
</script>

<section>
    <h1>Hello Svelte with Typescript</h1>
    <SudokuBoard></SudokuBoard>
</section>
<style lang='postcss'>
    h1 {
        @apply text-3xl bg-blue-400;
    }
</style>