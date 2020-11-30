<script>
	import LoginPage from './LoginPage.svelte'
	import Round from './Round.svelte'
	import { userId } from "./stores/userIdStore";
</script>

{#if $userId}
	<button on:click={userId.logout}>Logout</button>
	<Round/>
{:else}
	<LoginPage on:loggedIn={event => userId.update(event.detail)}/>
{/if}

<style>
	:global(body) {
		background-color: #17141d;
		color: white;
	}
</style>