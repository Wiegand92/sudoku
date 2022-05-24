<script lang='ts'>
    import { generatePuzzle } from "./utils/generatePuzzle";
    const game = generatePuzzle();
    const solution = game.puzzleSolution
    const puzzle = game.puzzle

    function getClassName(row: number, col: number) {
        let className: string = '';
        const adjustedRow = row + 1;
        const adjustedCol = col + 1;
        if(adjustedRow % 3 === 0 ){
            className += 'rowDivider '
        }
        if(adjustedCol % 3 === 0) {
            className += 'colDivider '
        }
        if(adjustedCol === 1) {
            className += 'firstCol '
        }
        if(adjustedRow === 1) {
            className += 'topRow '
        }
        return className.trim();
    }
</script>
<section>
    {#each puzzle as row, rowIndex}
        {#each row as column, colIndex}
            <div class={getClassName(rowIndex, colIndex)}>
                {#if column !== 0}
                <p>{column}</p>
                {:else}
                <input type='number' min=1 max=9/>
                {/if}
            </div>
        {/each}
    {/each}
</section>
<style lang='postcss'>
    section{
        @apply inline-grid grid-cols-9;
    }
    div{
        @apply box-border h-8 aspect-square;
        @apply border-solid border-black border-[1px] flex place-content-center;
    }
    p{
        @apply m-auto;
    }
    input{
        @apply m-0 p-0 border-0 max-w-full text-center;
    }
    /* Chrome, Safari, Edge, Opera */
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
    }

    /* Firefox */
    input[type=number] {
    -moz-appearance: textfield;
    }
    .rowDivider{
        @apply border-b-4;
    }
    .colDivider{
        @apply border-r-4;
    }
    .topRow {
        @apply border-t-4;
    }

    .firstCol {
        @apply border-l-4;
    }
</style>