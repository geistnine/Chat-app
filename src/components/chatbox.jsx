import React, { useContext, useEffect, useState } from "react"
import Message from './Message.jsx'
import { UserContext } from "./UserContext";
import styled from "styled-components";
const socket = io();

const ChatBox = () => {
  const [user, setUser] = useContext(UserContext);
  const [messages, setMessages] = useState([]);

  const submitHandler = (e) => {
    e.preventDefault();
  }
  // TODO: event listener for submitting message
  const sendHandler = (e) => {
    const messageBarText = document.getElementById('messagetext').value;
    socket.emit('chat message', messageBarText)
  }
  // useEffect hook to update message components??? maybe not
  useEffect( () => {
    console.log(messages);
  })
  // functionality for array of messages
  // needs a message component possibly
  const messageArr = messages.map( message => <Message content={message}/>)

  socket.on('chat message', function(msg) {
    console.log('Chat message event received at socket listener')
    setMessages([...messages, msg]);
  })

  return (
    <div>
      <p>You arrived at Chatbox, but it's still under construction!</p>
      <div className="chatcontainer">
        <p>Welcome, {user.name}!</p>
        {messageArr}
      </div>
        <form onSubmit={submitHandler}>
          <input type="text" name="messagetext" id="messagetext"/>
          <button onClick={sendHandler}>Send</button>
        </form>
    </div>
  )
}

export default ChatBox;