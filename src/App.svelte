<script lang='ts'>
    import SudokuBoard from "./Components/SudokuBoard.svelte";
</script>

<section>
    <h1>Sudoku by: Alex Wiegand</h1>
    <SudokuBoard></SudokuBoard>
</section>
<style lang='postcss'>
    :global(html, body) {
        @apply p-0 m-0 h-full w-full fixed;
    }
    section {
        @apply p-0 m-0 h-full w-full fixed flex flex-col;
    }
    h1 {
        @apply text-3xl bg-purple-500 m-0 p-4 text-right;
    }
</style>