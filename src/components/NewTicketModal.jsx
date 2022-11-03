import React from 'react'
import { Form, Button, Modal } from 'react-bootstrap';


function NewTicketModal({ closeModal }) {

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  return (
    <>
      <Modal.Header closeButton>Create Team: </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Ticket Title: </Form.Label>
            <Form.Control type='text'></Form.Control>
          </Form.Group>
          <Button type="submit">Create</Button>
        </Form>
      </Modal.Body>
    </>
  )
}

export default NewTicketModal