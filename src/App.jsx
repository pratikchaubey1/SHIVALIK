import React from 'react';
import Navbar from './Components/Navbar';
import HomePage from './Components/HomePage';
import Background from './assets/Background.png';
import Hero from './Components/Hero';
import BestSellingProduct from './Components/BestSellingProduct';
import { motion } from 'framer-motion';
import { Routes, Route } from 'react-router-dom';
import Cart from './Components/Cart';
import CartDetail from './Components/CartDetail';

function App() {
  return (
   <div>
    <Navbar/>
      <div>
        <Routes>
          {/* Home Page Route */}
          <Route
            path="/"
            element={
              <>
               <HomePage />
                <Hero />
                <BestSellingProduct />
               
              </>
            }
          />

          {/* Cart Route */}
          <Route path="/cart" element={<Cart />} />
          <Route path='/cart-Detail' element={<CartDetail/>}></Route>
        </Routes>
      </div>
   </div>
  );
}

export default App;
