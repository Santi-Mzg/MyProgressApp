import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CalendarPage from './CalendarPage';
import BlockList from './BlockList';

function App() {

  return (
    <BrowserRouter>
    <Routes>
        <Route path="/calendar" element={<CalendarPage/>}/>
        <Route path="/:fecha" element={<BlockList/>} />
    </Routes>
    </BrowserRouter>
  )
}

export default App
