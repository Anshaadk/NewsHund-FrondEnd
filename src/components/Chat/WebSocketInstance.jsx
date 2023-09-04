// WebSocketInstance.js

class WebSocketInstance {
    constructor(roomName) {
        this.roomName = roomName;
        this.socketRef = null;
    }

    connect() {
        const chatSocket = new WebSocket(
            `ws://${window.location.host}/ws/chat/${this.roomName}/`
        );

        chatSocket.onopen = (e) => {
            console.log('WebSocket connected:', e);
        };

        chatSocket.onclose = (e) => {
            console.error('WebSocket closed:', e);
        };

        this.socketRef = chatSocket;
    }

    disconnect() {
        this.socketRef.close();
        this.socketRef = null;
    }

    sendMessage(message) {
        const messageData = {
            message,
        };
        this.socketRef.send(JSON.stringify(messageData));
    }

    addCallbacks(callbacks) {
        this.socketRef.onmessage = (e) => {
            const data = JSON.parse(e.data);
            if (callbacks.onMessage) {
                callbacks.onMessage(data);
            }
        };
    }
}

export default WebSocketInstance;
