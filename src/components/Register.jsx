import React, { useState } from "react";

const Register = (props) => {
  const [user, setUser] = useState({name:'', password:''});
  const [error, setError] = useState('');
  // const Login = user => {
  //   console.log(user);
  // }
  const submitHandler = e =>{{
    e.preventDefault();

  }}
  const signupHandler = () => {
    props.Signup(user)
  }
  const loginHandler = () => {
    props.Login(user)
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