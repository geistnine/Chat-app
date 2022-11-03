import React, {useContext} from 'react'
import { ListGroup } from 'react-bootstrap';
import {UserContext} from './UserContext';
import { TeamsContext } from '../contexts/TeamsProvider';


export default function Teams(props) {
  const [user, setUser] = useContext(UserContext);
  const [selectedTeam, setSelectedTeam] = useContext(TeamsContext);
  const selectTeamHandler = (e) => {
    setSelectedTeam(e.target.textContent);
  }

// TODO: make this active, should display different chats on loading different teams
  return (
    <ListGroup variant='flush'>
      {user.teams.map((team, index) => {
        const teamIsSelected = selectedTeam == team;
        return (
        <ListGroup.Item key={index} action onClick={selectTeamHandler} active={teamIsSelected} className={`${teamIsSelected ? 'bg-success' : 'notactive'}`}>
          {team}
        </ListGroup.Item>
        )
      })}
    </ListGroup>
  )
}