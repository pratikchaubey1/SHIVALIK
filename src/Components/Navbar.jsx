import React, { useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from "framer-motion";
import { IoIosSearch } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { FaShoppingCart } from "react-icons/fa";


function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  const { scrollY } = useScroll();
  const logoSize = useTransform(scrollY, [0, 200], ["13vw", "3vw"]); // text resize on scroll

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

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
        <div className="max-w-7xl mx-auto relative px-6 py-3 flex justify-center items-center">
          
          {/* Center Brand Name */}
          <motion.h1
            style={{ fontSize: logoSize }}
            className="font-serif tracking-widest text-[#611f69] text-center "
          >
            SHIVALIK
          </motion.h1>

          {/* Right Icons */}
          <div className="absolute right-6 top-8 flex gap-6 text-gray-700 text-2xl">
            <a href="#search" className="hover:text-[#611f69] transition-colors">
              <IoIosSearch />
            </a>
           
            <a href="#cart" className="hover:text-[#611f69] transition-colors">
              <FaShoppingCart />
            </a>
             <a href="#contact" className="hover:text-[#611f69] transition-colors">
                 <CgProfile />
             </a>
          </div>

        </div>
      </motion.nav>
    </div>
  )
}

export default Navbar;
