<script>
    import VotingMovie from "./VotingMovie.svelte";
    import { userId } from './stores/userIdStore'

    export let movies

    function handleMessage(event) {
        let index = movies.findIndex(movie => movie.title === event.detail.movie.title)
        if (!movies[index].watchInformation) {
            movies[index].watchInformation = [
                {
                    userId: $userId,
                    watchedBeforeRound: event.detail.watched
                }
            ]
        }
        console.log(movies[index].watchInformation)
    }
</script>

<div id="voting-card-list">
    <h2>Filmes para votar</h2>
    {#each movies as movie (movie.title)}
        <VotingMovie {movie} on:message={handleMessage}/>
    {/each}
</div>

<style>
    #voting-card-list {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
</style>