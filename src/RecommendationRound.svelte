<script>
    import { getStreams, makeRecommendation } from './service'

    export let userMovie

    let title = userMovie?.title
    let selectedStream = userMovie?.stream
    let streams = []
    let errorMessage
    $: disabled = !selectedStream || !title || (userMovie?.title === title && userMovie?.stream === selectedStream)

    getStreams()
        .then(streamList => streams = streamList)
        .catch(error => errorMessage = error)

    async function submitRecommendation() {
        try {
            await makeRecommendation(title, selectedStream)
            userMovie = { title, stream: selectedStream }
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
        {#if userMovie}
            Editar
        {:else}
            Recommendar
        {/if}
    </button>

    {#if userMovie}
        <p>Sua recomendação já foi feita. Você pode editá-la se quiser</p>
    {/if}

    {#if errorMessage}
        <p>{errorMessage}</p>
    {/if}
</form>