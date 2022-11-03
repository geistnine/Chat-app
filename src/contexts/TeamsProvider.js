import React, { useState, createContext } from 'react';

export const TeamsContext = createContext();

export const TeamsProvider = (props) => {
  const [teams, setTeams] = useState(['default']);
  const [selectedTeam, setSelectedTeam] = useState('default')
  return (
    <TeamsContext.Provider value={[teams, setTeams, selectedTeam, setSelectedTeam]}>
      {props.children}
    </TeamsContext.Provider>
  )
}