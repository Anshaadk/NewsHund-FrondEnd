import React from 'react'
import ChatApp from '../Chat/Chat'
import User_Navbar from './navbar/User_NavBar'
import { useNavigate } from 'react-router-dom';

function User_chat() {
  const navigate=useNavigate()
  const userJSON = localStorage.getItem('user');
  const user = userJSON ? JSON.parse(userJSON) : null;
  const userId = user ? user.userID : null;
  if (userId === null) {
    setTimeout(() => {
      navigate('/user_login');
    })
  }
  return (
    <div>
        <User_Navbar/>
        <ChatApp/>
        
    </div>
  )
}

export default User_chat