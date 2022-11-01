import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = (props) => {
  const [user, setUser] = useState({name:'', password:''});
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
  
  return (<div className="LoginForm"> 
    <form onSubmit={submitHandler}>
      <div className="form-inner">
        <h2> Login </h2>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input type="text" name="name" id="name" onChange={e => setUser({...user, name: e.target.value})}/>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input type="text" name="password" id="password" onChange={e => setUser({...user, password: e.target.value})}/>
        </div>
        <button onClick={loginHandler}>Log In</button>
        <button onClick={signupHandler}>Sign Up</button>
      </div>
    </form>
  </div>)
}

export default Register;