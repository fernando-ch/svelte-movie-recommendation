<script>
    import { createEventDispatcher } from 'svelte'
    import { getUserId } from './service'

    const dispatch = createEventDispatcher()
    let loadingUser = false
    let showLoading = false
    let userName
    let errorMessage

    async function login() {
        if (loadingUser)
            return

        let timeoutId
        try {
            loadingUser = true
            // Wait 150 ms, so the that the loading won't show on fast connections
            timeoutId = setTimeout(() => showLoading = true, 150)
            let userId = await getUserId(userName)
            dispatch('loggedIn', userId)
        } catch (e) {
            errorMessage = e.message
        } finally {
            clearTimeout(timeoutId)
            showLoading = false
            loadingUser = false
        }
    }
</script>

{#if showLoading}
    Logando ...
{:else}
    <form on:submit|preventDefault={login}>
        <label for="user-name">Nome</label>
        <input id="user-name" type="text" bind:value={userName}>
        <button type="submit">Login</button>
    </form>
    {#if errorMessage}
        <p>{errorMessage}</p>
    {/if}
{/if}