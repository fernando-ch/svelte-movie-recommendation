import { writable } from "svelte/store"
import { getCurrentRound } from '../service'

const { subscribe, set } = writable(null, set => {
    getCurrentRound().then(round => set(round))

    const interval = setInterval(async () => {
        const round = await getCurrentRound()
        console.log({ round })
        set(round)

        if (round.step === 'Watching') {
            clearInterval(interval)
        }
    }, 5000)

    return () => {
        clearInterval(interval)
    }
})

export const round = {
    subscribe,
    forceUpdate: () => {
        getCurrentRound().then(round => set(round))
    }
}
