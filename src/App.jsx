import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Start from './pages/Start';
import Tournament from './pages/Tournament';
import Result from './pages/Result';
import { useState } from 'react';
import ChefImageList from './extrafunctions/ChefImageLlist';


function App() {
  const [userName, setUserName] = useState('');


  return (
    <div className="bg-black min-h-screen text-white">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Start setUserName={setUserName} />} />
          <Route path="/tournament" element={<Tournament userName={userName}  />} />
          <Route path="/result" element={<Result userName={userName} />} />
          <Route path="/chefImage" element={<ChefImageList/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
