import React, { useContext, useEffect, useState } from "react"


const Message = (props) => {
// TODO: set up each message display to include sentBy and timeSent
  const textAlignVar = props.content.sentBy === 'You' ? 'right' : 'left';

  return (
    <div style={{textalign: props.content.sentBy === 'You' ? 'right' : 'left'}}>
      <p style={{textalign: props.content.sentBy === 'You' ? 'right' : 'left'}}>{props.content.sentBy}, {props.content.timeSent}</p>
      <div>
        <p>{props.content.text}</p>
      </div>
    </div>
  )
}

export default Message;