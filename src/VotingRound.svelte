<script>
    import VotingMovie from './VotingMovie.svelte'

    export let movies
</script>

<div class="voting-card-list">
    <h2>Filmes para votar</h2>
    <div class="cards-container">
        {#each movies as movie (movie.title)}
            <VotingMovie {movie}/>
        {/each}
    </div>
</div>

<style>
    .voting-card-list {
        display: flex;
        flex-direction: column;
        align-items: center;
        background-color: #000000ba;
        height: 80%;
    }

    .cards-container {
        height: 100%;
        overflow: scroll;
    }
</style>