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
import AdminLogin from './Components/Admin/AdminLogin';
import AdminDashboard from './Components/Admin/AdminDashboard';
import SignIn from './Components/UserAuth/SignIn';
import SignUp from './Components/UserAuth/SignUp';

function App() {
  return (
    <div className="min-h-screen bg- flex flex-col">
      <Routes>
        {/* Admin Routes (without navbar and footer) */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        
        {/* User Auth Routes (without navbar and footer) */}
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        
        {/* Regular Routes (with navbar and footer) */}
        <Route path="/*" element={
          <>
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
          </>
        } />
      </Routes>
    </div>
  );
}

export default App;