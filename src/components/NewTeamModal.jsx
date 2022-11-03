import e from 'cors';
import React, {useRef} from 'react'
import { Form, Button, Modal } from 'react-bootstrap';


function NewTeamModal(props) {
  const teamName = useRef();
  const handleSubmit = (e) => {
    e.preventDefault();
  }

  const handleAddTeam = () => {
    console.log(teamName.current.value)
    props.addTeam(teamName.current.value)
    props.closeModal();
  }
  return (
    <>
      <Modal.Header closeButton>Create Team: </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Team Name</Form.Label>
            <Form.Control type='text' ref={teamName}></Form.Control>
          </Form.Group>
          <Button type="submit" onClick={handleAddTeam}>Create</Button>
        </Form>
      </Modal.Body>
    </>
  )
}

export default NewTeamModal
