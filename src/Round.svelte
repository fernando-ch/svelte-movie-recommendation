<script>
    import RecommendationRound from './RecommendationRound.svelte'
    import VotingRound from './VotingRound.svelte'
    import WatchingRound from './WatchingRound.svelte'
    import { round } from './stores/roundStore'
    import { userId } from './stores/userIdStore'
    import { subscribeToNotification } from './service'

    $: tooManyPeopleAlreadyWatched = $round?.step === 'Voting' &&
        $round?.movies?.find(movie => movie.userId === $userId)?.tooManyPeopleAlreadySaw

    if ('Notification' in window && navigator.serviceWorker) {
        Notification.requestPermission().then(status => {
            console.log('Notification permission status:', status);
            if (status === 'granted') {
                navigator.serviceWorker.register('service-worker.js').then(reg => {
                    console.log('Service Worker Registered!', reg);

                    reg.pushManager.getSubscription().then(sub => {
                        if (sub === null) {
                            // Update UI to ask user to register for Push
                            console.log('Not subscribed to push service!');
                            subscribeUser()
                        } else {
                            // We have a subscription, update the database
                            sub = JSON.parse(JSON.stringify(sub))
                            console.log('Subscription object: ', sub);
                            subscribeToNotification($userId, { endpoint: sub.endpoint, key: sub.keys.p256dh, auth: sub.keys.auth });
                        }
                    });
                })
                    .catch(err => {
                        console.log('Service Worker registration failed: ', err);
                    });
            }
        });
    }

    function subscribeUser() {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.ready.then(reg => {
                const publicKey = urlBase64ToUint8Array('BD0rt2diA_2KNVNBPAWMikPS7XhGmBS6F-hHwM7xEysA0TazG-hhIddJaRr5HfYVu2x1p_3ZeWjjr8pj0voIthQ=');

                reg.pushManager.subscribe({
                    userVisibleOnly: true,
                    applicationServerKey: publicKey
                }).then(sub => {
                    sub = JSON.parse(JSON.stringify(sub))
                    console.log('Endpoint URL: ', sub.endpoint);
                    subscribeToNotification($userId, { endpoint: sub.endpoint, key: sub.keys.p256dh, auth: sub.keys.auth });
                }).catch(e => {
                    if (Notification.permission === 'denied') {
                        console.warn('Permission for notifications was denied');
                    } else {
                        console.error('Unable to subscribe to push', e);
                    }
                });
            })
        }
    }

    function urlBase64ToUint8Array(base64String) {
        const padding = '='.repeat((4 - base64String.length % 4) % 4);
        const base64 = (base64String + padding)
            .replace(/\-/g, '+')
            .replace(/_/g, '/');

        const rawData = window.atob(base64);
        const outputArray = new Uint8Array(rawData.length);

        for (let i = 0; i < rawData.length; ++i) {
            outputArray[i] = rawData.charCodeAt(i);
        }
        return outputArray;
    }

</script>

{#if $round}
    {#if $round.step === 'Recommendation' || tooManyPeopleAlreadyWatched}
        <RecommendationRound userMovie={$round.movies?.find(movie => movie.userId === $userId)} {tooManyPeopleAlreadyWatched}/>
    {:else if $round.step === 'Voting'}
        <VotingRound movies={$round.movies}/>
    {:else}
        <WatchingRound movies={$round.movies}/>
    {/if}
{:else}
    Carregando round ...
{/if}