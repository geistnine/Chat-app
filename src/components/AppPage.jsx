import React from 'react';
import ChatBox from './chatbox.jsx';
import Sidebar from './Sidebar.jsx';
import { TeamsProvider } from '../contexts/TeamsProvider.js';

export default function AppPage() {
  return (
    <div className='d-flex flex-row vh-100 gap-2 bg-dark text-light'>
      <TeamsProvider>
        <Sidebar/>
        <ChatBox/>
      </TeamsProvider>
    </div>
  )
}