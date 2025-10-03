import React, { useContext } from 'react';
import Navbar from './Components/Navbar';
import HomePage from './Components/HomePage';
import Background from './assets/Background.png';
import Hero from './Components/Hero';
import BestSellingProduct from './Components/BestSellingProduct';
import Products from './Components/Products';
import { motion } from 'framer-motion';
import { Routes, Route, useLocation } from 'react-router-dom';
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
import AdminProducts from './Components/Admin/AdminProducts';
import AdminUsers from './Components/Admin/AdminUsers';
import AdminOrders from './Components/Admin/AdminOrders';
import SignIn from './Components/UserAuth/SignIn';
import SignUp from './Components/UserAuth/SignUp';
import ProtectedRoute from './Components/UserAuth/ProtectedRoute';
import Address from './Components/Checkout/Address';
import { useTheme } from './context/ThemeContext';
import { ProductsData } from './context/Context';

function App() {
  const { theme } = useTheme();
  const { isScroll } = useContext(ProductsData);
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  
  return (
    <div className={`min-h-screen w-full flex flex-col m-0 p-0 transition-colors duration-300 ${
      theme === 'dark' 
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white' 
        : 'bg-gradient-to-br from-gray-50 via-white to-gray-100 text-gray-900'
    }`}>
      <Routes>
        {/* Admin Routes (without navbar and footer) */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/products" element={<AdminProducts />} />
        <Route path="/admin/users" element={<AdminUsers />} />
        <Route path="/admin/orders" element={<AdminOrders />} />
        
        {/* User Auth Routes (without navbar and footer) */}
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        
        {/* Regular Routes (with navbar and footer) */}
        <Route path="/*" element={
          <>
            {/* Single Navbar with dynamic behavior */}
            <Navbar />
            
            {/* Spacer to prevent content from going under the fixed navbar */}
            <div 
              className={`block w-full m-0 p-0 ${
                (isHomePage && !isScroll) 
                  ? 'h-[160px]'
                  : 'h-[90px]'
              }`}
            ></div>

            {/* Main content grows to push footer to the bottom */}
            <main className="flex-1 w-full m-0 p-0">
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
                <Route path="/products" element={<Products />} />
                <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
                <Route path='/cart-Detail' element={<ProtectedRoute><CartDetail/></ProtectedRoute>} />
                <Route path='/about' element={<About/>} />
                <Route path='/contact' element={<Contact/>} />
                <Route path='/account' element={<ProtectedRoute><Account/></ProtectedRoute>} />
                <Route path='/checkout/address' element={<ProtectedRoute><Address/></ProtectedRoute>} />
                <Route path='/pay' element={<ProtectedRoute><Payment/></ProtectedRoute>} />
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