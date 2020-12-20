<script>
    import { fly } from 'svelte/transition'
    import { createEventDispatcher } from 'svelte'
    import { userId } from './stores/userIdStore'

    export let movie

    let watched = movie.watchInformation?.filter(information => information.userId === $userId)

    const dispatch = createEventDispatcher()

    function changed() {
        dispatch('message', { movie, watched })
    }
</script>
<div class="card" out:fly={{duration: 2000, y: 300}}>
        <span class="title">
            {movie.title}
        </span>
    <span class="stream">
            {movie.stream}
        </span>
    <div class="choices">
        <label>
            <input type="radio" bind:group={watched} on:change={changed} value={true}>
            Já vi 😓
        </label>
        <label>
            <input type="radio" bind:group={watched} on:change={changed} value={false}>
            Ainda não vi 😀
        </label>
    </div>
</div>

<style>
    .card {
        margin: 10px;
        display: flex;
        flex-direction: column;
        height: 100px;
        width: 220px;
        padding: 1.5em;
        border-radius: 16px;
        background: #4e326a;
        box-shadow: 0 0.1rem 3rem #000;
       }

    .title {
        display: block;
        font-weight: bold;
    }

    .stream {
        font-size: 0.7em;
    }

    .choices {
        margin-top: 18px;
    }
</style>