import React from 'react';
import Navbar from './Components/Navbar';
import HomePage from './Components/HomePage';
import Background from './assets/BG.png';
import Hero from './Components/Hero';
import BestSellingProduct from './Components/BestSellingProduct';
import { Routes, Route } from 'react-router-dom';
import Cart from './Components/Cart';
import CartDetail from './Components/CartDetail';
import NotFound from './Components/NotFound';

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
        <Routes>
          {/* Home Page Route */}
          <Route
            path="/"
            element={
              <>
                <Hero />
                <BestSellingProduct />
                <HomePage />
              </>
            }
          />

          {/* Cart Route */}
          <Route path="/cart" element={<Cart />} />
          <Route path='/cart-Detail' element={<CartDetail/>}></Route>
          <Route path='*' element={<NotFound/>}></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
