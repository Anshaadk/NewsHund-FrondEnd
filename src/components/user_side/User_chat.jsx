import React from 'react'
import ChatApp from '../Chat/Chat'
import User_Navbar from './navbar/User_NavBar'

function User_chat() {
  return (
    <div>
        <User_Navbar/>
        <ChatApp/>
        
    </div>
  )
}

export default User_chat