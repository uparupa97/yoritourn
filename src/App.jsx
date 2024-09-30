import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Start from './pages/Start';
import Tournament from './pages/Tournament';
import Result from './pages/Result';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/torun" element={<Tournament />} />
        <Route path="/result" element={<Result />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
