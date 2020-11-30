<script>
    import VotingMovie from "./VotingMovie.svelte";

    export let movies

    $: indexedMovies = movies?.map((movie, index) =>  {
        return { index, ...movie }
    })

    function handleMessage(event) {
        console.log({movie: event.detail.movie.title})
        let index = indexedMovies.findIndex(movie => movie.title === event.detail.movie.title)
        indexedMovies[index].teste = true
    }
</script>

<div id="container">
    <div id="voting-card-list">
        {#each indexedMovies.filter(movie => !movie.teste) as movie, index (movie.title)}
            <VotingMovie {movie} on:message={handleMessage} disabled={index !== 0}/>
        {/each}
    </div>

<!--    <div id="voted-card-list">-->
<!--        {#each indexedMovies.filter(movie => movie.teste) as movie, index (movie.title)}-->
<!--            <VotingMovie {movie}/>-->
<!--        {/each}-->
<!--    </div>-->
</div>

<style>
    #container {
        /*display: flex;*/
        /*position: relative;*/
        /*padding: 4rem;*/
    }

    #voting-card-list {
        position: relative;
        /*display: flex;*/
        /*align-items: center;*/
        /*justify-content: center;*/
        /*flex-direction: column;*/
        /*padding: 3rem;*/
    }

    #voted-card-list {
        position: relative;
        /*display: flex;*/
        /*align-items: center;*/
        /*justify-content: center;*/
        /*flex-direction: column;*/
        /*padding: 3rem;*/
    }
</style>