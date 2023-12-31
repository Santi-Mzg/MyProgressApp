import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';

function App() {

  return (
    <BrowserRouter>
    <Routes>
        <Route path="/MyProgressApp/" element={<MainPage/>} />
        <Route path="/MyProgressApp/:date" element={<MainPage/>} />
    </Routes>
    </BrowserRouter>
  )
}

export default App
