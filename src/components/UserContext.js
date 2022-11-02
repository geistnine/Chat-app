import React, {useState, createContext} from 'react';
export const UserContext = createContext();

export const UserProvider = (props) => {
  const [user, setUser] = useState({name:'', password:'', teams: [],});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <UserContext.Provider value={[user, setUser, isLoggedIn, setIsLoggedIn]}>
      {props.children}
    </UserContext.Provider>
  )
}
