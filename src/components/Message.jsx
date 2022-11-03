import React, { useContext, useEffect, useState } from "react"


const Message = (props) => {
// TODO: set up each message display to include sentBy and timeSent
  const sentByYou = props.content.sentBy === 'You' ? true : false;
  const textAlignVar = sentByYou ? 'right' : 'left';
  const maxWidthVar = sentByYou ? '750px' : '600px';
  
  return (
    <div 
    className={`d-flex flex-column border ${sentByYou ? 'bg-success' : 'border'} 'text-light' rounded-pill my-3 mx-3 p-3`}
    ref={props.lastMessage ? props.lastMessageRef : null}
    style={{textAlign: textAlignVar, maxWidth: maxWidthVar}}>
      <div>
        <div className="font-italic font-weight-light text-break" style={{fontStyle: 'italic', fontWeight: '200'}}>{props.content.timeSent}</div>
        <div>
          <div className={`text-break`}>{props.content.sentBy} : {props.content.text}</div>
        </div>
      </div>
    </div>
    
  )
}

export default Message;