// WebSocketManager.js
import React, { useState, useEffect } from 'react';
import { w3cwebsocket } from 'websocket';

const WebSocketManager = ({ url, onMessageReceived }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = new w3cwebsocket(url);
    setSocket(newSocket);

    return () => {
      if (newSocket.readyState === newSocket.OPEN) {
        newSocket.close();
      }
    };
  }, [url]);

  useEffect(() => {
    if (socket) {
      socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        onMessageReceived(data);
      };
    }
  }, [socket, onMessageReceived]);

  return null; // This component doesn't render anything visible
};

export default WebSocketManager;
