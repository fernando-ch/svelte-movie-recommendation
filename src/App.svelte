<script>
	import LoginPage from './LoginPage.svelte'
	import Round from './Round.svelte'
	import { userId } from './stores/userIdStore'
	import { newRound } from './service'
</script>

{#if $userId}
	<div>
		<button on:click={userId.logout}>Logout</button>
		{#if $userId === 1}
			<button style="background-color: red" on:click={newRound}>Novo Round</button>
		{/if}
		<Round/>
	</div>
{:else}
	<LoginPage on:loggedIn={event => userId.update(event.detail)}/>
{/if}

<style>
	:global(body) {
		background-color: #17141d;
		color: white;
	}


</style>