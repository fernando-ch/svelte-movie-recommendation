<script>
    import RecommendationRound from './RecommendationRound.svelte'
    import VotingRound from './VotingRound.svelte'
    import WatchingRound from './WatchingRound.svelte'
    import { round } from "./stores/roundStore"
    import { userId } from "./stores/userIdStore"

    $: tooManyPeopleAlreadyWatched = $round?.step === 'Voting' &&
        $round?.movies?.find(movie => movie.userId === $userId)?.tooManyPeopleAlreadySaw

</script>

{#if $round}
    {#if $round.step === 'Recommendation' || tooManyPeopleAlreadyWatched}
        <RecommendationRound userMovie={$round.movies?.find(movie => movie.userId === $userId)} {tooManyPeopleAlreadyWatched}/>
    {:else if $round.step === 'Voting'}
        <VotingRound movies={$round.movies}/>
    {:else}
        <WatchingRound movies={$round.movies}/>
    {/if}
{:else}
    Carregando round ...
{/if}