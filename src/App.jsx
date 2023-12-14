import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CalendarPage from './CalendarPage';
import BlockList from './BlockList';
import HomePage from './HomePage';

function App() {

  return (
    <BrowserRouter>
    <Routes>
        <Route path="/MyProgressApp/calendar" element={<CalendarPage/>}/>
        <Route path="/MyProgressApp/:fecha" element={<BlockList/>} />
        <Route path="/MyProgressApp/" element={<HomePage/>} />
    </Routes>
    </BrowserRouter>
  )
}

export default App
