import { readable } from "svelte/store"
import { socketUrl } from '../config'

export const round = readable(null, set => {
    const webSocket = new WebSocket(socketUrl);

    webSocket.addEventListener('open', () => {
        webSocket.send('Hello Server!');
    });

    webSocket.addEventListener('message', event => {
        console.log({round: JSON.parse(event.data)})
        set(JSON.parse(event.data))
    });

    return () => {
        // The code 1000 means Normal closure; the connection successfully
        // completed whatever purpose for which it was created.
        webSocket.close(1000)
    }
})