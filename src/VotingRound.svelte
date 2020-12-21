<script>
    import VotingMovie from './VotingMovie.svelte'

    export let movies
</script>

<div id="voting-card-list">
    <h2>Filmes para votar</h2>
    {#each movies as movie (movie.title)}
        <VotingMovie {movie} totalUsers={movies.length}/>
    {/each}
</div>

<style>
    #voting-card-list {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
</style>