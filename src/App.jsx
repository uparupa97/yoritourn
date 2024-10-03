import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Start from './pages/Start';
import Tournament from './pages/Tournament';
import Result from './pages/Result';
import { useState } from 'react';
import ChefImageList from './extrafunctions/ChefImageLlist';


function App() {
  const [userName, setUserName] = useState('');
  const [winner, setWinner] = useState(null); // 우승자 상태 생성



  return (
    <div className="bg-black min-h-screen text-white">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Start setUserName={setUserName} />} />
          <Route path="/tournament" element={<Tournament userName={userName} setWinner={setWinner}  />} />
          <Route path="/result" element={<Result userName={userName} winner={winner}/>} />
          <Route path="/chefImage" element={<ChefImageList/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
