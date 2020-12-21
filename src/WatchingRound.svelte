<script>
    import WatchingMovie from './WatchingMovie.svelte'

    export let movies
</script>

<div id="voting-card-list">
    <h2>Filmes para assistir</h2>
    {#each movies.sort((movie1, movie2) => movie1.order - movie2.order) as movie (movie.title)}
        <WatchingMovie {movie}/>
    {/each}
</div>

<style>
    #voting-card-list {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
</style>