<script>
    import { fade, fly } from 'svelte/transition'
    import { createEventDispatcher } from 'svelte'
    import { elasticInOut, linear,  } from 'svelte/easing'

    const dispatch = createEventDispatcher()

    export let movie
    export let teste = false
    export let disabled

    // setTimeout(() => teste = true, 100)

    function changed() {
        dispatch('message', { movie })
    }

    function discard(node, { duration }) {
        return {
            duration,
            css: t => {
                const eased = linear(t);

                // return `
                //     transform: rotate(${eased * 180 - 180}deg);
                //     transform-origin: -120px center;
                // `
                return `
                    transform: rotateY(${eased * 90 - 90}deg) translateX(${eased * -90 + 90}px);
                    transform-origin: 300px 300px;
                `
                // return `
                //     transform: rotate(${eased * 180 - 180}deg);
                //     transform-origin: 120px center;
                // `
            }
        }
    }
</script>
<div id="card" style="z-index: {100 - movie.index}; top: {100 + movie.index * 10 + 'px'}"
     class="teste" class:teste1={movie.index === 0 && teste} out:discard="{{ y: 200, duration: 1000 }}">
        <span id="title">
            {movie.title} - {movie.index}
        </span>
    <span id="stream">
            {movie.stream}
        </span>
    <div id="choices">
        <button on:click={changed} {disabled}>Já vi 😓</button>
        <button {disabled}>Ainda não vi 😀</button>
<!--        <div>-->
<!--            <input type="radio" id="already-watch" name="drone" value="dewey">-->
<!--            <label for="already-watch">Já vi 😓</label>-->
<!--        </div>-->

<!--        <div>-->
<!--            <input type="radio" id="didnt-watch" name="drone" value="huey" checked>-->
<!--            <label for="didnt-watch"></label>-->
<!--        </div>-->
    </div>
</div>

<style>
    .teste {
        transition: all 1.2s ease-in;
        /*transform-origin: -120px center;*/
        /*transform-origin: center center;*/
        transform-origin: 400px;
        /*transform: rotateY(-40deg);*/
        /*transform-origin: 240px center 40px;*/
        perspective: 200px;
    }

    .teste1 {
        /*transform: rotate(-180deg);*/
        /*transform: rotate3d(1, 1, 1, 90deg);*/
        transform: rotate(180deg);
        /*transform: rotateY(90deg);*/
    }

    #card {
        transform-style: preserve-3d;
        position: absolute;
        display: flex;
        /*position: relative;*/
        flex-direction: column;
        height: 100px;
        width: 220px;
        /*min-width: 250px;*/
        padding: 1.5em;
        border-radius: 16px;
        background: #4e326a;
        box-shadow: 0 0.1rem 3rem #000;
        /*background-color: white;*/
        /*margin: auto 8px;*/
        /*padding: 8px;*/
        /*width: 250px;*/
        /*max-width: 500px;*/
        /*!*height: 40px;*!*/
        /*border: #322f2f 2px solid;*/
        /*border-radius: 10px;*/
        /*box-shadow: #c4baba 5px 5px;*/
    }

    .behind {
        /*margin-top: -140px;*/
    }

    #title {
        display: block;
        font-weight: bold;
    }

    #stream {
        font-size: 0.7em;
    }

    #choices {
        margin-top: 18px;
    }

    #choices div {
        margin-top: 8px;
    }

    label {
        display: inline;
    }
</style>