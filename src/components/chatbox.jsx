import React, { useContext, useEffect, useState, useRef } from "react"
import Message from './Message.jsx'
import { UserContext } from "./UserContext";
import { TeamsContext } from "../contexts/TeamsProvider.js";
import io from "socket.io-client";
const socket = io('http://localhost:8080');

const ChatBox = () => {
  const [user, setUser] = useContext(UserContext);
  const [selectedTeam] = useContext(TeamsContext);

  // TODO: refactor state and socketio messages to include 'sentBy' and 'time' to be rendered
  // need state to store an array of message objects from database depending on which team is selected
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
    // make call to backend db to fetch team's messages
    console.log('Changing team? ', selectedTeam)
    fetch(`/messages/${selectedTeam}`)
    // set messages to be that array
      .then(response => response.json())
      .then( data  => {
        setMessages(data);
      });
  }, [selectedTeam])
  // functionality for array of messages
  // needs a message component possibly
  
  const lastMessageRef = useRef()

  useEffect(() => {
    if (lastMessageRef.current){
      lastMessageRef.current.scrollIntoView({smooth: true})
    }
  })
  

  useEffect( () => {
    socket.on('chat message', (msg) => {
      console.log('Chat message event received at socket listener. Messages: ', messages)
      setMessages([...messages, msg]);
    })
    return () => {
      socket.off('message');
    }
    
  })

  const messageArr = messages.map( (message, index) => {
     message.sentBy = message.sentBy === user.name ? 'You' : message.sentBy;
     const lastMessage = messages.length - 1 === index;
     return <Message content={message} lastMessage={lastMessage} lastMessageRef={lastMessageRef}/>
    })


// TODO: fix scrolling behavior in the chat
  return (
    <div className="d-flex flex-column flex-grow-1">
      <p>Welcome, {user.name}!</p>
      <div className="flex-grow-1 overflow-auto justify-content-end" style={{overflowAnchor: 'none', gap: '16px'}}>
        <p>Beginning of Log</p>
        {messageArr}
      </div>
      <div style={{overflowAnchor: 'auto', height: '1px'}}></div>
        <form onSubmit={submitHandler}>
          <input className="w-75" type="text" name="messagetext" id="messagetext"/>
          <button onClick={sendHandler}>Send</button>
        </form>
    </div>
  )
}

export default ChatBox;