<script>
    import RecommendationRound from './RecommendationRound.svelte'
    import VotingRound from './VotingRound.svelte'
    import { round } from "./stores/roundStore"
    import { userId } from "./stores/userIdStore"
</script>

{#if $round}
    {#if $round.status === 'Recommendation'}
        <RecommendationRound userMovie={$round.movies?.find(movie => movie.userId === $userId)}/>
    {:else if $round.status === 'Voting'}
        <VotingRound movies={$round.movies}/>
    {/if}
{:else}
    Carregando round ...
{/if}