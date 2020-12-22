<script>
    import { getStreams, makeRecommendation } from './service'
    import { round } from './stores/roundStore'

    export let userMovie
    export let tooManyPeopleAlreadyWatched

    let title = userMovie?.title
    let selectedStream = userMovie?.stream
    let streams = []
    let errorMessage
    let submitting = false
    $: disabled = !selectedStream || !title || (userMovie?.title === title && userMovie?.stream === selectedStream)

    getStreams()
        .then(streamList => streams = streamList)
        .catch(error => errorMessage = error)

    async function submitRecommendation() {
        try {
            submitting = true
            await makeRecommendation(userMovie?.id, title, selectedStream)
            userMovie = { title, stream: selectedStream }
            round.forceUpdate()
        } catch (e) {
            errorMessage = e.message
        } finally {
            submitting = false
        }
    }
</script>

<form on:submit|preventDefault={submitRecommendation}>
    {#if tooManyPeopleAlreadyWatched}
        <h2>Muitas pessoas já viram esse filme, escolha outro</h2>
    {/if}

    <label for="movie-title">Título</label>
    <input id="movie-title" autocomplete="off" type="text" autofocus bind:value={title} on:change={() => title = title?.trim()}>

    <label for="movie-stream">Stream</label>
    <select id="movie-stream" bind:value={selectedStream}>
        <option disabled value="">Escolha um stream</option>
        {#each streams as stream}
            <option value={stream}>
                {stream}
            </option>
        {/each}
    </select>

    {#if !submitting}
        <button type="submit" {disabled}>
            {#if userMovie}
                Editar
            {:else}
                Recommendar
            {/if}
        </button>
    {:else}
        <button>Enviando...</button>
    {/if}

    {#if userMovie && !tooManyPeopleAlreadyWatched}
        <p>Sua recomendação já foi feita. Você pode editá-la se quiser</p>
    {/if}

    {#if errorMessage}
        <p>{errorMessage}</p>
    {/if}
</form>