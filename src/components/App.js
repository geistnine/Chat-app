import React, { useState } from "react";
import Register from "./Register.jsx";
import Chatbox from "./chatbox.jsx"
import {Route, Routes, Navigate, useAsyncError} from "react-router-dom";

const App = () => {
  
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  // if (isLoggedIn){
  //   return <Navigate to="/application" />
  // }
  
  // the below sets up an infinite loop 
  // if (user.name !== "" && user.password !== ""){
  //   return <Navigate to="/application" />
  // }
    return (
      <Routes>
        <Route path="/" element={<Register/>}/>
        <Route path="/application" element={<Chatbox />}/>
      </Routes>
    )
}

// <div>
// <h1>Hello world! subscroob</h1>
// {user.name && user.password ? (
// <Routes>
//     <Route exact path="/application" component={Chatbox}/>
// </Routes>
// )
// : (<Register Login={Login} Signup={Signup}/>)}

// </div>


export default App;