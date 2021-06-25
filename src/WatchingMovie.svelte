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
        {movie.stream}
    </span>
    <span class="stream">
        {movie.watchedTotal}/{$round.totalPeople}
    </span>
    <span class="watched">
        Assistido
        <input type=checkbox bind:checked={watched} on:change={changed}>
    </span>
</div>

<style>
    .card {
        position: relative;
        margin: 10px;
        display: flex;
        flex-direction: column;
        height: 50px;
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
        /*font-size: 0.7em;*/
    }

    .watched {
        margin-top: 10px;
        position: absolute;
        right: 10px;
    }
</style>