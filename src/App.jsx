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
import NotFound from './Components/NotFound';
import Footer from './Components/Footer';
import About from './Components/About';
import Contact from './Components/Contact';
import Account from './Components/Account';
import Payment from './Components/Payment';
import Card from './Components/Card';

function App() {
  return (
    <div className="min-h-screen bg- flex flex-col">
      {/* Fixed Navbar (keeps motion effects inside Navbar.jsx) */}
      <Navbar />
      {/* Spacer to prevent content from going under the fixed navbar */}
      <div className="h-24 sm:h-28 md:h-36"></div>

      {/* Main content grows to push footer to the bottom */}
      <main className="flex-1">
        <Routes>
          {/* Home Page Route */}
          <Route
            path="/"
            element={
              <>
                <HomePage />
                <Hero />
                <BestSellingProduct />
                {/* <Card/> */}
              </>
            }
          />

          {/* Other Routes */}
          <Route path="/cart" element={<Cart />} />
          <Route path='/cart-Detail' element={<CartDetail/>} />
          <Route path='/about' element={<About/>} />
          <Route path='/contact' element={<Contact/>} />
          <Route path='/account' element={<Account/>} />
          <Route path='/pay' element={<Payment/>} />
          <Route path='*' element={<NotFound/>} />
        </Routes>
      </main>

      {/* Footer stays at the bottom on every page */}
      <Footer />
    </div>
  );
}

export default App;