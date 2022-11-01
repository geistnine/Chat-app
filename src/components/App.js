import React, { useState } from "react";
import Register from "./Register.jsx";
import Chatbox from "./chatbox.jsx"
import {Route, Link, Navigate} from "react-router-dom";

const App = () => {
  const [user, setUser] = useState({name: '', password: ''});
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
      .then(() => {
        setUser(user);
        Navigate('/application');
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
    return (
      <div>
        <h1>Hello world! subscroob</h1>
        {user.name && user.password ? (
        
            <Route exact path="/application" component={Chatbox}/>
        
        )
        : (<Register Login={Login} Signup={Signup}/>)}
        
      </div>
    )
}

export default App;