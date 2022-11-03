import React, { useContext, useEffect, useState } from "react"
import Message from './Message.jsx'
import { UserContext } from "./UserContext";
import { TeamsContext } from "../contexts/TeamsProvider.js";
const socket = io();

const ChatBox = () => {
  const [user, setUser] = useContext(UserContext);
  const [selectedTeam] = useContext(TeamsContext);

  // TODO: refactor state and socketio messages to include 'sentBy' and 'time' to be rendered
  const [messages, setMessages] = useState([]);

  const submitHandler = (e) => {
    e.preventDefault();
  }
  // TODO: refactor socket event to include sentBy and timeSent
  const sendHandler = (e) => {
    const messageBarText = document.getElementById('messagetext').value;
    const date = new Date(Date.now());
    const message = {
      text: messageBarText,
      sentBy: user.name,
      timeSent: date.toString()
    }
    fetch(`/messages/${selectedTeam}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'Application/JSON',
      },
      body: JSON.stringify(message),
    })
    .then(socket.emit('chat message', message))
    
  }
  // useEffect hook to update message components??? maybe not
  useEffect( () => {
    console.log(messages);
  })
  // functionality for array of messages
  // needs a message component possibly
  const messageArr = messages.map( message => {
     message.sentBy = message.sentBy === user.name ? 'You' : message.sentBy;
     return <Message content={message}/>
    })

  socket.on('chat message', function(msg) {
    console.log('Chat message event received at socket listener')
    setMessages([...messages, msg]);
  })

  return (
    <div className="vw-100">
      <p>You arrived at Chatbox, but it's still under construction!</p>
      <div className="chatcontainer">
        <p>Welcome, {user.name}!</p>
        {messageArr}
      </div>
        <form onSubmit={submitHandler}>
          <input className="w-75" type="text" name="messagetext" id="messagetext"/>
          <button onClick={sendHandler}>Send</button>
        </form>
    </div>
  )
}

export default ChatBox;