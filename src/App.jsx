import React from 'react';
import Navbar from './Components/Navbar';
import HomePage from './Components/HomePage';
import Background from './assets/BG.png';
import  Hero from './Components/Hero';

function App() {
  return (
    <div>
      {/* Navbar Section with Background */}
      <div
        className="h-screen w-full flex items-center justify-center bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${Background})` }}
      >
        <Navbar />
      </div>

      
      <div>
        <HomePage />
        <Hero />
      </div>
    </div>
  );
}

export default App;
