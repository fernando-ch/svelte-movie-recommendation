<script>
    import { getStreams } from './service'

    export let round
    let title
    let selectedStream
    let streams = []
    let errorMessage

    getStreams()
        .then(streamList => streams = streamList)
        .catch(error => errorMessage = error)

    function makeRecommendation() {

    }

</script>

<form on:submit|preventDefault={makeRecommendation}>
    <label for="movie-title">Título</label>
    <input id="movie-title" type="text" bind:value={title}>

    <label for="movie-stream">Stream</label>
    <select id="movie-stream" bind:value={selectedStream}>
        {#each streams as stream}
            <option value={stream}>
                {stream}
            </option>
        {/each}
    </select>

    <button type="submit">Recommendar</button>

    {#if errorMessage}
        <p>{errorMessage}</p>
    {/if}
</form>