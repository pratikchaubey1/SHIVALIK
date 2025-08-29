
import React, { useState, useEffect, useContext } from 'react'
import { motion, useScroll, useTransform } from "framer-motion";
import { IoIosSearch } from "react-icons/io";
import { MdMenu } from "react-icons/md";
import { FiShoppingBag } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import { Link } from 'react-router-dom';
import { ProductsData } from '../context/Context';

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const {addCart} = useContext(ProductsData)

  const { scrollY } = useScroll();
  const logoSize = useTransform(scrollY, [0, 200], ["8vw", "4vw"]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="font-sans bg-white text-gray-900 overflow-x-hidden">
      <motion.nav
        className={`fixed top-0 left-0 w-full z-50 transition-colors duration-500 ${
          isScrolled ? "bg-white shadow-md" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto relative px-4 sm:px-6 py-2 sm:py-3 flex justify-center items-center">
          {/* Brand Name */}
          <motion.h1
            style={{ fontSize: logoSize }}
            className="font-serif tracking-widest text-[#611f69] text-center text-3xl sm:text-6xl lg:text-8xl"
          >
            SHIVALIK
          </motion.h1>

          {/* Icons */}
    
        </div>      
        <div className="absolute right-4 sm:right-6 top-2 sm:top-6 flex gap-3 sm:gap-6 text-gray-700 text-xl sm:text-xl">
            <div className='flex gap-1 justify-center items-center' >
            <Link to="/cart" className="hover:text-[rgb(97,31,105)] transition-colors">
            <FiShoppingBag/>
            </Link>
             <span className='h-6 w-6 text-base rounded-full bg-purple-500 animate-bounce flex justify-center items-center'>{addCart.length}</span>
            </div>
             <a href="#menu" className="hover:text-[#611f69] transition-colors">
             <CgProfile/>
            </a>
            <a href="#search" className="hover:text-[#611f69] transition-colors">
              <IoIosSearch />
            </a>
            
             <a href="#menu" className="hover:text-[#611f69] transition-colors">
              <MdMenu /> 
            </a>
          </div>
      </motion.nav>
    </div>
  );
}

export default Navbar;
