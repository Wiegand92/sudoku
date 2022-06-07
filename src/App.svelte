<script lang='ts'>
    import SudokuBoard from "./SudokuBoard.svelte";
</script>

<div>
    <h1>Sudoku by: Alex Wiegand</h1>
    <SudokuBoard />
</div>
<style lang='postcss'>
    :global(html, body) {
        @apply p-0 m-0 h-full w-full fixed;
    }
    div {
        @apply p-0 m-0 h-full w-full fixed flex flex-col;
    }
    h1 {
        @apply text-3xl bg-purple-500 m-0 p-4 text-right;
    }
</style>