import React, {useContext, useEffect, useState} from 'react';
import {Tab, Nav, Button, Modal} from 'react-bootstrap';
import Teams from './Teams.jsx';
import Tickets from './Tickets.jsx';
import NewTeamModal from './NewTeamModal.jsx';
import NewTicketModal from './NewTicketModal.jsx';
import { UserContext } from './UserContext.js';
import { TeamsContext } from '../contexts/TeamsProvider.js';
import { addTeam } from '../../server/controllers/userController.js';


const TEAMS_KEY = "teams";
const TICKETS_KEY = "tickets";

export default function Sidebar() {
  const [activeKey, setActiveKey] = useState(TEAMS_KEY);
  const teamsOpen = activeKey === TEAMS_KEY;
  const [modalOpen, setModalOpen] = useState(false);
  const [user, setUser] = useContext(UserContext);
  // now we have access to teams state from TeamsProvider
  const [teams, setTeams] = useContext(TeamsContext);
  // what we want is for teams tab to populate with the current user's list of teams
  // use setTeams to match teams context with current user's list of teams


  // now let's add a new team to our user's list of teams using our modal
  const addTeamHandler = (newTeam) => {
    // initiate fetch request to backend
    // post team to database first
    fetch(`/teams/${newTeam}`);


    fetch('/users', {
      method: 'PUT',
      headers: {
        'Content-Type': 'Application/JSON'
      },
      body: JSON.stringify({...user, teams: [...teams, newTeam]})
    })
    .then(() => {
      setTeams([...teams, newTeam])
      setUser({...user, teams: [...user.teams, newTeam] })
    })
    .catch(err => console.log(err));
  }

  useEffect(() => {
    fetch(`/users/${user.name}`)
      .then((response) => response.json())
      .then((data) => setUser({name: data.username, password: data.password, teams: data.teams}))
      .catch(err => console.log(err));
  }, user.teams)

  function closeModal() {
    setModalOpen(false);
  }


  return (
    <div style={{width: '250px'}} className="d-flex flex-column">
      <Tab.Container activeKey={activeKey} onSelect={setActiveKey}>
        <Nav variant="tabs" className='justify-content-center'>
          <Nav.Item>
            <Nav.Link eventKey="teams" className='text-success'>Teams</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="tickets" className='text-success'>Tickets</Nav.Link>
          </Nav.Item>
        </Nav>
        <Tab.Content className='overflow-auto flex-grow-1' style={{borderRight: 'solid 1px'}}>
          <Tab.Pane eventKey={TEAMS_KEY}>
            <Teams/>
          </Tab.Pane>
          <Tab.Pane eventKey={TICKETS_KEY}>
            <Tickets/>
          </Tab.Pane>
        </Tab.Content>
        <Button className='btn-success rounded-0' onClick={() => setModalOpen(true)}> New {teamsOpen ? 'Team' : 'Ticket'}</Button>
      </Tab.Container>
      <Modal show={modalOpen} onHide={closeModal}>
        {teamsOpen ? 
          <NewTeamModal closeModal={closeModal} addTeam={addTeamHandler}/> : 
          <NewTicketModal closeModal={closeModal} />
          }
      </Modal>
    </div>
  )
}