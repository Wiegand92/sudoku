<script lang='ts'>
    import {fade} from 'svelte/transition'
    import LoadingScreen from "./LoadingScreen.svelte";
    import { blockCoordinates } from '../utils/blockCoordinates';
    import { validMove } from '../utils/checkHouse';
    // An array of moves for time travel //
    const moves = [];
    // playerSolution will contain a copy of the puzzle for the player to make changes to //
    let playerSolution = [];
    // These variables will be populated with the puzzle and solution //
    let puzzle = [];
    let puzzleSolution = [];
    // Loading state for puzzle //
    let puzzleGenerated = false;

    // worker will generate puzzle on different thread to avoid blocking //
    const worker = new Worker(new URL('../utils/worker', import.meta.url));

    // Generate puzzle //
    worker.postMessage('')

    // When the worker finishes generation, copy over puzzle and puzzleSolution //
    worker.onmessage = function (e) {
        puzzle = e.data.puzzle;
        puzzleSolution = e.data.puzzleSolution;
        puzzle.forEach(r=> {
            const row = [];
            r.forEach(c => {
                row.push(c)
            })
            playerSolution.push(row)
        });
        puzzleGenerated = true;
    }

    // Returns class list for cells //
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
        if(adjustedCol === 1 && adjustedRow === 1){
            className+= 'topL '
        }
        if(adjustedCol === 9 && adjustedRow === 1) {
            className += 'topR '
        }
        if(adjustedCol === 1 && adjustedRow === 9) {
            className += 'botL '
        }
        if(adjustedCol === 9 && adjustedRow === 9){
            className += 'botR '
        }
        return className.trim();
    }

    // Manipulates playerSolution and moves //
    function addNumber(row: number, col: number, move: (number | '')){
        playerSolution[row][col] = move;
        moves.push({row, col, move});
    }

    // Change Handler //
    function handleChange(e: Event, row: number, col: number){
        const target = <HTMLInputElement>e.target;
        const number = Number(target.value);
        // When number is valid add to board/moves //
        if(number <= 9 && number > 0) {
            addNumber(row, col, number);
            if(!validMove(playerSolution, row, col, blockCoordinates[row][col], number)){
                console.log('Not a valid move')
            }
        }
        // When the player clears the box set it to null //
        else if (target.value === '') addNumber(row, col, '') 
        // Otherwise set the value to last correct value //
        else target.value = playerSolution[row][col] || '';
        if(checkPuzzle()){
            alert('Congrats you win!!!')
        }
    }

    //Check the solution//
    function checkPuzzle(){
        let solved = true
        for(let row = 0; row < 9; row++){
            // Early break if solved becomes false //
            if(solved === false){ break; }
            // Check each value against solution given //
            for(let col = 0; col < 9; col++){
                if(puzzleSolution[row][col] !== playerSolution[row][col]){
                    solved = false
                    break;
                }
            }
        }
        return solved;
    }

    function newGame() {
        playerSolution = []
        puzzleGenerated = false;
        worker.postMessage('')
    }

</script>
<section>
    {#if puzzleGenerated}
    <div class='puzzleGrid' transition:fade>
    {#each puzzle as row, rowIndex}
        {#each row as column, colIndex}
            <span class={getClassName(rowIndex, colIndex)}>
                {#if column !== 0}
                <p>{column}</p>
                {:else}
                <input 
                    type='number' 
                    min=1 
                    max=9 
                    value={playerSolution[rowIndex][colIndex] || ''} 
                    on:change={e=>{
                        handleChange(e, rowIndex, colIndex)
                    }} 
                />
                {/if}
            </span>
        {/each}
    {/each}
    </div>
    {:else}
    <LoadingScreen></LoadingScreen>
    {/if}
    <button on:click={newGame} disabled={!puzzleGenerated}>New Game</button>
</section>
<style lang='postcss'>
    section{
        @apply h-full flex flex-col place-content-around;
    }
    .puzzleGrid{
        @apply inline-grid flex-initial grid-cols-9 m-auto shadow-md;
    }
    span{
        @apply box-border h-8 aspect-square;
        @apply border-solid border-black border-[1px] flex place-content-center;
        @apply md:h-20;
    }
    p{
        @apply m-auto;
    }
    input{
        @apply m-0 p-0 border-0 w-full text-center;
    }
    p, input {
        @apply text-3xl font-mono;
    }
    /* Remove number input spinners */
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
    .topR, .topR:first-child {
        @apply rounded-tr-md;
    }
    .topL, .topL:first-child {
        @apply rounded-tl-md;
    }
    .botR, .botR:first-child{
        @apply rounded-br-md;
    }
    .botL, .botL:first-child {
        @apply rounded-bl-md;
    }
</style>