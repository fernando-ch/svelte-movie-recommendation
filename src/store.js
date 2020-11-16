import { writable } from "svelte/store"

const { subscribe, set, update } = writable(window.localStorage.getItem('userId'))

export const userId = {
    subscribe,
    update: (id) => {
        window.localStorage.setItem('userId', id)
        set(id)
    },
    logout: () => {
        window.localStorage.removeItem('userId')
        set(null)
    }
}

