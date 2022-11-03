import React, {useContext} from 'react'
import { ListGroup } from 'react-bootstrap';
import {UserContext} from './UserContext';


export default function Teams(props) {
  const [user, setUser] = useContext(UserContext);
// TODO: make this active, should display different chats on loading different teams
  return (
    <ListGroup variant='flush'>
      {user.teams.map(team => (
        <ListGroup.Item>
          <p>{team}</p>
        </ListGroup.Item>
      ))}
    </ListGroup>
  )
}