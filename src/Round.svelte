<script>
    import RecommendationRound from './RecommendationRound.svelte'
    import VotingRound from './VotingRound.svelte'
    import { round } from "./stores/roundStore"
    import { userId } from "./stores/userIdStore"

    $: tooManyPeopleAlreadyWatched = $round?.status === 'Voting' &&
        $round?.movies?.find(movie => movie.userId === $userId)
        ?.watchInformationList
        ?.filter(watchInformation => watchInformation.watchedBeforeRound)
        ?.length === Math.round($round.movies.length / 2)

</script>

{#if $round}
    {#if $round.status === 'Recommendation' || tooManyPeopleAlreadyWatched}
        <RecommendationRound userMovie={$round.movies?.find(movie => movie.userId === $userId)} {tooManyPeopleAlreadyWatched}/>
    {:else if $round.status === 'Voting'}
        <VotingRound movies={$round.movies}/>
    {/if}
{:else}
    Carregando round ...
{/if}