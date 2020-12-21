<script>
    import VotingMovie from './VotingMovie.svelte'
    import { userId } from './stores/userIdStore'

    export let movies

    function handleMessage(event) {
        let index = movies.findIndex(movie => movie.title === event.detail.movie.title)

        if (!movies[index].watchInformationList) {
            movies[index].watchInformationList = [
                {
                    userId: $userId,
                    watchedBeforeRound: event.detail.watched
                }
            ]
        }
    }
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