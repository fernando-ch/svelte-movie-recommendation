<script>
    import { userId } from './stores/userIdStore'
    import { round } from './stores/roundStore'
    import { toggleWatched } from './service'

    export let movie

    let watched = movie.movieVisualizations.find(it => it.userId === $userId)?.watchedDuringRound

    async function changed() {
        await toggleWatched($userId, movie.title, watched)
        round.forceUpdate()
    }
</script>
<div class="card">
    <span class="title">
        {movie.title}
    </span>
    <span class="stream">
        {#if movie.stream === 'Netflix'}
            <img src="/netflix-icon.png" width="50" height="15" alt="{movie.stream}">
        {:else if movie.stream === 'Disney Plus'}
            <img src="/disney-plus-icon.png" width="60" height="40" alt="{movie.stream}">
        {:else if movie.stream === 'Globo Play'}
            <img src="/globoplay-icon.png" width="60" height="15" alt="{movie.stream}">
        {:else if movie.stream === 'HBO'}
            <img src="/hbo-icon.png" width="50" height="15" alt="{movie.stream}">
        {:else if movie.stream === 'Prime'}
            <img src="/prime-icon.png" width="70" height="30" alt="{movie.stream}">
        {:else if movie.stream === 'Telecine'}
            <img src="/telecine-icon.png" width="70" height="10" alt="{movie.stream}">
        {:else}
            {movie.stream}
        {/if}
    </span>
    <div style="position: relative">
        <span>{movie.watchedTotal}/{$round.totalPeople}</span>
        <span class="watched">
            <label>
                <span>Assistido</span>
                <input type=checkbox bind:checked={watched} on:change={changed}>
            </label>
        </span>
    </div>
</div>

<style>
    .card {
        position: relative;
        margin: 10px;
        display: flex;
        flex-direction: column;
        /*height: 65px;*/
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
        margin-top: 10px;
        margin-bottom: 10px;
    }

    .watched {
        position: absolute;
        right: 0;
    }

    label {
        position: relative;
    }

    label > span {
        position: absolute;
        right: 20px;
        bottom: 7px;
    }
</style>