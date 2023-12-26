import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';

function App() {

  return (
    <BrowserRouter>
    <Routes>
        <Route path="/MyProgressApp/:fecha" element={<MainPage/>} />
    </Routes>
    </BrowserRouter>
  )
}

export default App
