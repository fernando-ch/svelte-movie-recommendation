<script>
    import { userId } from "./store"
    import { getStreams, makeRecommendation } from './service'

    export let round

    let previousMovie = round.movies?.find(movie => movie.userId === $userId)
    let title = previousMovie?.title
    let selectedStream = previousMovie?.stream
    let streams = []
    let errorMessage
    $: disabled = !selectedStream || !title || (previousMovie?.title === title && previousMovie?.stream === selectedStream)

    getStreams()
        .then(streamList => streams = streamList)
        .catch(error => errorMessage = error)

    async function submitRecommendation() {
        try {
            await makeRecommendation(title, selectedStream)
            previousMovie = { title, stream: selectedStream }
        } catch (e) {
            errorMessage = e.message
        }
    }

</script>

<form on:submit|preventDefault={submitRecommendation}>
    <label for="movie-title">Título</label>
    <input id="movie-title" autocomplete="off" type="text" bind:value={title} on:change={() => title = title?.trim()}>

    <label for="movie-stream">Stream</label>
    <select id="movie-stream" bind:value={selectedStream}>
        <option disabled value="">Escolha um stream</option>
        {#each streams as stream}
            <option value={stream}>
                {stream}
            </option>
        {/each}
    </select>

    <button type="submit" {disabled}>
        {#if previousMovie}
            Editar
        {:else}
            Recommendar
        {/if}
    </button>

    {#if previousMovie}
        <p>Sua recomendação já foi feita. Você pode editá-la se quiser</p>
    {/if}

    {#if errorMessage}
        <p>{errorMessage}</p>
    {/if}
</form>