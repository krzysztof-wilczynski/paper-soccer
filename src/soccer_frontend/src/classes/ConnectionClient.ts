class ConnectionClient {
    ws: WebSocket;

    constructor() {
        this.ws = new WebSocket("ws://localhost:8000/ws/game/");
        this.ws.onmessage = this.handleWebSocketMessage
    }

    handleWebSocketMessage = (event: MessageEvent) => {
        const messageData = JSON.parse(event.data);
        console.log(messageData)
    }
}

export default ConnectionClient
