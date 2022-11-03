import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";
import { Container, Form, Button } from 'react-bootstrap';

const Register = (props) => {
  const [user, setUser] = useContext(UserContext);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    if (isLoggedIn) {
      navigate('/application');
    }
  }, [isLoggedIn])
  // BACKEND CALLS
  const Login = (user, signedUp) => {
    // if signedUp is false, query DB to check for valid user
    console.log(user);
    fetch('/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'Application/JSON',
      },
      body: JSON.stringify(user),
    })
      .then((data) => {
        console.log(data.body);
        setIsLoggedIn(true);
      })
      .catch((err) => {
        console.log(err);
      })
    console.log(user);
  }
  const Signup = (user) => {
    fetch('/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'Application/JSON'
      },
      body: JSON.stringify(user),
    })
      .then(() => {
        Login(user, true)
      })
      .catch(err => console.log('Signup fetch /register: ERROR: ', err));
  }


  // const Login = user => {
  //   console.log(user);
  // }
  // HANDLERS
  const submitHandler = e =>{{
    e.preventDefault();
  }}
  const signupHandler = () => {
    Signup(user)
  }
  const loginHandler = () => {
    Login(user)
  }
  
  return (
    
  <div className="LoginForm bg-dark text-light vw-100 vh-100 d-flex align-items-center gap-2 justify-content-center m-0 mr-0"> 
    <Form onSubmit={submitHandler} className="rounded bg-green p-5" style={{backgroundColor: "green"}}>
      <div className="form-inner">
        <h2> Login </h2>
        <Form.Group>
          <Form.Label>Name:</Form.Label>
          <Form.Control type="text" name="name" id="name" onChange={e => setUser({...user, name: e.target.value})}/>
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="password">Password:</Form.Label>
          <Form.Control type="text" name="password" id="password" onChange={e => setUser({...user, password: e.target.value})}/>
        </Form.Group>
        <Button onClick={loginHandler}>Log In</Button>
        <Button variant="secondary" onClick={signupHandler}>Sign Up</Button>
      </div>
    </Form>
  </div>)
}

export default Register;