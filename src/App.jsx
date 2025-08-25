import React from 'react';
import Navbar from './Components/Navbar';
import HomePage from './Components/HomePage';
import bg from '../assets/bg.png';
function App() {
  return (
    <div>
    <div
      className="h-screen w-full flex items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${bg})` }}
    >
      
      
        <Navbar />
    </div>
    <div>
      <HomePage />
    </div>
    </div>
  );
}

export default App;
