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

function App() {
  return (
    <div>
      {/* Navbar Section with Background */}
      <div
        className="h-screen w-full flex items-center justify-center bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${Background})` }}

      >
         <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="absolute bottom-28 left-6 sm:left-12 lg:left-24 transform -translate-y-1/2 text-left"
        >
          {/* Welcome to */}
          <p className="text-base sm:text-lg md:text-xl font-light mb-2 text-black">
            Welcome to
          </p>

          {/* SHIVALIK */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold text-black leading-tight">
            SHIVALIK
          </h1>

          {/* SERVICE HUB */}
          <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-transparent stroke-text">
            SERVICE HUB
          </h2>
        </motion.div>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
          className="absolute bottom-8 left-6 sm:left-12 lg:left-24 flex flex-row gap-3 sm:gap-4 font-bold text-sm sm:text-md"
        >
          <button className="py-2 px-4 sm:py-3 sm:px-6 bg-black rounded-md text-white hover:bg-white hover:text-black hover:border-black border transition duration-200 ease-in-out">
            Shop Now
          </button>
          <button className="py-2 px-4 sm:py-3 sm:px-6 bg-transparent border border-black rounded-md text-black hover:bg-black hover:text-white transition duration-200 ease-in-out">
            Know More
          </button>
        </motion.div>
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
          <Route path='/about' element={<About/>}/>
          <Route path='/contact' element={<Contact/>}></Route>
          <Route path='/account' element={<Account/>}/>
          <Route path='/pay' element={<Payment/>}/>
          <Route path='*' element={<NotFound/>}></Route>
        </Routes>
         <Footer/>
      </div>
      
    </div>
  );
}

export default App;
