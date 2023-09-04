import React, { useState, useEffect } from 'react';
import { w3cwebsocket } from 'websocket';
import axios from 'axios';
import './ChatApp.css';
import WebSocketManager from './WebSocketManager';

const Chat = ({ currentUser, selectedUser }) => {
    console.log(currentUser.id);
    const [socket, setSocket] = useState(null);
    const [messages, setMessages] = useState([]);
    const [messageInput, setMessageInput] = useState('');

    useEffect(() => {
        const newSocket = new w3cwebsocket(`ws://localhost:8000/ws/chat/${selectedUser}/`);
        setSocket(newSocket);

        return () => {
            if (newSocket.readyState === newSocket.OPEN) {
                newSocket.close();
            }
        };

    }, [selectedUser]);

    const fetchChatMessages = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/user_side/api/chat/${selectedUser}/`);
            if (response.status === 200) {
                setMessages(response.data);
                console.log(response.data);
            }
        } catch (error) {
            console.error('Error fetching chat messages:', error);
        }
    };

    useEffect(() => {
        fetchChatMessages();
    }, [selectedUser]);

    useEffect(() => {
        if (socket) {
            socket.onmessage = (event) => {
                const data = JSON.parse(event.data);
                setMessages(prevMessages => [...prevMessages, data]); // Use previous state
            };
        }
    }, [socket]);

    const sendMessage = () => {
        if (socket && socket.readyState === socket.OPEN) {
            const data = {
                message: messageInput,
                sender_id: currentUser.id,
                sender_name: currentUser.username,
                chat_room: selectedUser,
            };
            socket.send(JSON.stringify(data));
            setMessageInput('');
        }
    };

    useEffect(() => {
        fetchChatMessages();
    }, []);

    return (
        <div className="chat-container">
            <h2 className="chat-heading">Chat with {selectedUser}</h2>
            <div className="chat-messages">

                {messages.map((msg, index) => (
                    <div key={index} className={`message ${msg.sender_id === currentUser.id ? 'own' : 'other'}`}>
                        <strong>{msg.sender}:</strong> {msg.message}
                    </div>
                ))}
            </div>
            <div className="message-input input-group">
                <input
                    type="text"
                    className="form-control"
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    placeholder="Type your message..."
                />
                <button className="btn btn-primary" onClick={sendMessage}>Send</button>
            </div>
        </div>

    );
};

const ChatApp = () => {
    const [currentUser, setCurrentUser] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null);
    const [users, setUsers] = useState([]);
    const userJSON = localStorage.getItem('user');
    const user = userJSON ? JSON.parse(userJSON) : null;
    const userId = user ? user.userID : null;
    const { phone, name, email, username } = user || { name: '', email: '', username: '', phone: '' };

    useEffect(() => {
        // Fetch current user's data
        axios.get('http://localhost:8000/user_side/api/userlisting/')
            .then(response => {
                const userData = response.data.find(user => user.id == userId);
                console.log(userData);
                setCurrentUser(userData);
                setUsers(response.data);
                console.log(users, 'nkan');

            })
            .catch(error => {
                console.error('Error fetching user data:', error);
            });
    }, []);

    const handleUserClick = (username) => {
        setSelectedUser(username.id);
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center">Chat App</h1>
            <div className="row">
                <div className="col-md-4">
                    <h2>Select a user to chat with:</h2>
                    <ul className="list-group">
                        {users.map(user => {
                            if (user.is_staffs == true) {
                                return (
                                    <li key={user.id} className="list-group-item" onClick={() => handleUserClick(user)}>
                                        {user.username}
                                    </li>
                                );
                            } else {
                                return null; // Skip rendering the current user's item
                            }
                        })}
                    </ul>
                </div>
                <div className="col-md-8">
                    {selectedUser && <Chat currentUser={currentUser} selectedUser={selectedUser} />}
                </div>
            </div>
        </div>
    );
};

export default ChatApp;
