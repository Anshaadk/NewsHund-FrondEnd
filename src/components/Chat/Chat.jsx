import React, { useState, useEffect, useRef } from 'react';
import { w3cwebsocket } from 'websocket';
import axios from 'axios';
import './ChatApp.css';
import axiosInstance from '../../api/axios';


const Chat = ({ currentUser, selectedUser, users }) => {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  const messagesEndRef = useRef(null);
  const wssockets=import.meta.env.VITE_WS_KEY

  useEffect(() => {
    // Set up the WebSocket connection
    const newSocket = new w3cwebsocket(`${wssockets}/ws/chat/${selectedUser}/`);
    setSocket(newSocket);

    // Clean up the WebSocket connection on unmount
    return () => {
      if (newSocket.readyState === newSocket.OPEN) {
        newSocket.close();
      }
    };
  }, [selectedUser]);

  const fetchChatMessages = async () => {
    try {
      const response = await axiosInstance.get(`/user_side/api/chat/${selectedUser}/`);
      if (response.status === 200) {
        setMessages(response.data);
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
        setMessages(prevMessages => [...prevMessages, data]);
        scrollToBottom(); // Scroll to the bottom when new messages are added
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

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    
    <div className="chat-container">
      
      <h2 className="chat-heading">Chat with {users.find(user => user.id === selectedUser)?.username}</h2>

      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message ${msg.sender === currentUser.id ? 'own' : 'other'}`}
            style={{
              flexDirection: msg.sender === currentUser.id ? 'row-reverse' : 'row'
            }}
          >
            <div className="message-avatar">
              <img
                src={users.find(user => user.id === msg.sender)?.profile_image || "klk"}
                alt="avatar"
                className={`rounded-circle avatar-image ${msg.sender === currentUser.id ? 'own-avatar' : 'other-avatar'}`}
                width="60"
              />
            </div>
            <div className="message-content">
              <div
                className={`message-box ${msg.sender === currentUser.id ? 'own-box' : 'other-box'}`}
                style={{
                  textAlign: msg.sender === currentUser.id ? 'end' : 'left'
                }}
              >
                {msg.message}
              </div>
              <div
                className={`message-sender ${msg.sender === currentUser.id ? 'own-sender' : 'other-sender'}`}
                style={{
                  textAlign: msg.sender === currentUser.id ? 'right' : 'left'
                }}
              >
                {msg.sender === currentUser.id ? "You" : users.find(user => user.id === msg.sender)?.username || "Unknown"}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} /> {/* This div will be used to scroll to the bottom */}
      
      </div>

      <div className="message-input input-group">
        <input
          type="text"
          className="form-control"
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          placeholder="Type your message..."
        />
        <button
          className="btn btn-info btn-rounded float-end"
          onClick={sendMessage}
        >
          Send
        </button>
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
    
    if (userId === null) {
      setTimeout(() => {
        navigate('/user_login');
      })
    }

    useEffect(() => {
        // Fetch current user's data
        axiosInstance.get('/user_side/api/userlisting/')
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
      <>
      
      <div className="container-fluid mt-5 bg-light">
      

      <div className="row">
        <div className="col-md-4">
          <h2 className="font-weight-bold mb-3 text-center text-md-start">Members</h2>
          <div className="card p-4">
            <div className="card-body">
              <ul className="list-unstyled mb-0">
                {users.map(user => {
                  if (user.is_staffs === true) {
                    return (
                      <li key={user.id} className="p-2 border-bottom" style={{ backgroundColor: "#eee" }}>
                        <a href="#!" className="d-flex justify-content-between" onClick={() => handleUserClick(user)}>
                          <div className="d-flex flex-row">
                            <img
                              src={user.profile_image? user.profile_image :" https://th.bing.com/th/id/OIP.tQ7ULylwMqPFwFtVdCN9mgAAAA?pid=ImgDet&rs=1" }
                              alt="avatar"
                              className=" shadow-1-strong rounded-circle avatar-image"
                              width="60"
                            />
                            <div className="pt-1">
                              <p className="fw-bold mb-0">{user.username}</p>
                              <p className="small text-muted">{user.is_staffs ? 'Active' : 'Invalid'}</p>
                            </div>
                          </div>
                        </a>
                      </li>
                    );
                  } else {
                    return null; // Skip rendering non-staff users
                  }
                })}
              </ul>
            </div>
          </div>
        </div>

        <div className="col-md-8">
          {selectedUser && <Chat currentUser={currentUser} users={users} userId={userId} selectedUser={selectedUser} />}
        </div>
      </div>

      
    </div>
    {/* <User_Footer /> */}
    </>
    );
};

export default ChatApp;
