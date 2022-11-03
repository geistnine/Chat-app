import React, { useState } from "react";
import Register from "./Register.jsx";
import AppPage from "./AppPage.jsx";
import {Route, Routes, Navigate, useAsyncError} from "react-router-dom";
import {UserProvider} from './UserContext';

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
      <UserProvider>
        <Routes>
          <Route path="/" element={<Register/>}/>
          <Route path="/application" element={<AppPage/>}/>
        </Routes>
      </UserProvider>
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