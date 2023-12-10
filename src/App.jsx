import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Toolbar from './Toolbar';
import CalendarPage from './CalendarPage';
import BlockList from './BlockList';

function App() {

  return (
    <BrowserRouter>
    <Routes>
        <Route path="/calendar" element={<CalendarPage/>}>
          
        </Route>
        <Route path="/" element={<BlockList/>}>
          
        </Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App
