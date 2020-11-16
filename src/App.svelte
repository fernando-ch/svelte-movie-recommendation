<script>
	import LoginPage from './LoginPage.svelte'
	import Round from './Round.svelte'
	import { userId } from "./store";
</script>

{#if $userId}
	<button on:click={userId.logout}>Logout</button>
	<Round/>
{:else}
	<LoginPage on:loggedIn={event => userId.update(event.detail)}/>
{/if}
