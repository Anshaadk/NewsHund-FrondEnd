import React, { useEffect, useState } from 'react';
import UserList from './UserList';
import ChatBox from './Chat';
import WebSocketInstance from './WebSocketInstance';

function ChatRoom({ roomName, currentUser }) {
    const [chats, setChats] = useState([]);

    useEffect(() => {
        WebSocketInstance.connect(roomName);
        WebSocketInstance.addCallbacks({ onMessage: handleNewMessage });
        return () => {
            WebSocketInstance.disconnect();
        };
    }, [roomName]);

    const handleNewMessage = (message) => {
        setChats((prevChats) => [...prevChats, message]);
    };

    return (
        <div className="row">
            <div className="col-lg-4">
                {/* Pass users as a prop */}
                <UserList users={users} roomName={roomName} />
            </div>
            {/* Pass chats, roomName, and currentUser as props */}
            <ChatBox chats={chats} roomName={roomName} currentUser={currentUser} />
        </div>
    );
}

export default ChatRoom;
