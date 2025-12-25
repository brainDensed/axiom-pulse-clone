let websocket = null;

export function initWebSocket() {
    const ws = new WebSocket("ws://localhost:3000");

    ws.onopen = () => {
        console.log("websocket is connected");
    }

    ws.onmessage = (event) => {
        console.log("message from server", event.data);
    }

    ws.onclose = () => {
        console.log("websocket is closed");
    }

    ws.onerror = (error) => {
        console.log("websocket error", error);
    }

    websocket = ws;
}