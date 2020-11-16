<script>
    import { getCurrentRound } from "./service";
    import RecommendationRound from './RecommendationRound.svelte'

    let roundPromise = getCurrentRound()

</script>

{#await roundPromise}
    Carregando round ...
{:then round}
    {#if round.status === 'Recommendation'}
        <RecommendationRound {round}/>
    {/if}
{:catch error}
    {error}
{/await}