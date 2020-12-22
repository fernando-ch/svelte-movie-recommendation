import { writable } from "svelte/store"

const { subscribe, set } = writable(parseInt(window.localStorage.getItem('userId')))

export const userId = {
    subscribe,
    update: (id) => {
        window.localStorage.setItem('userId', id)
        set(parseInt(id))
    },
    logout: () => {
        window.localStorage.removeItem('userId')
        set(null)
    }
}

