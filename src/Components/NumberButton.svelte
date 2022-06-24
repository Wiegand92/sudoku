<script lang="ts">
import { updateNumberSelected, numberSelected } from "../store";


    export let number: number;
    function handleClick(){
        $numberSelected === number ? updateNumberSelected(null) : updateNumberSelected(number)
    }
</script>
<button on:click={handleClick}>{number}</button>
<style lang='postcss'></style>