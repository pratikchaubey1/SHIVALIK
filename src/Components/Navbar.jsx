import React, { useContext } from "react";
import { ProductsData } from "../context/Context";
import { FiShoppingBag, FiUser, FiSun, FiMoon } from "react-icons/fi";
import { IoIosSearch } from "react-icons/io";
import { MdMenu } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { IoCloseSharp } from "react-icons/io5";
import { useAuth } from "../context/Auth/AuthContext";
import { useTheme } from "../context/ThemeContext";

function Navbar() {
  const {
    isScroll,
    logoSize,
    logoY,
    logoX,
    isOpen,
    setisOpen,
    isSearchOpen,
    setIsSearchOpen,
    profileOpen,
    setProfileOpen,
    dropdownVariants,
    overlayVariants,
    inputVariants,
    listItemVariants,
    addCart,
  } = useContext(ProductsData);

  const location = useLocation();
  const isLanding = location.pathname === "/";
  const { user, logout } = useAuth();
  const { theme, toggleTheme, isDark } = useTheme();

  return (
    <div className="font-poppins justify-between overflow-x-hidden">
      <motion.div
        className={`fixed top-0 left-0 w-full h-22 z-50 transition-colors duration-500 ${
          isScroll 
            ? isDark 
              ? "bg-black shadow-md" 
              : "bg-white/90 backdrop-blur-sm shadow-md"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto relative px-4 sm:px-6 py-2 sm:py-3 flex justify-center items-center">
          {/* Logo */}
          <Link to="/" className="font-playfair tracking-widest text-red-500">
            <div className="flex justify-center items-center">
              <motion.h1
                style={
                  isLanding
                    ? { fontSize: logoSize, y: logoY, x: logoX }
                    : { fontSize: "2vw", y: 0 }
                }
                className={`font-serif tracking-widest mt-7 text-center transition-colors duration-300 ${
                  isDark ? 'text-red-500' : 'text-red-600'
                }`}
              >
                SHIVALIK
              </motion.h1>
            </div>
          </Link>

          {/* Right Side Icons */}
          <div className={`absolute right-4 sm:right-6 top-2 sm:top-6 flex gap-3 sm:gap-6 ${
            isDark ? 'text-red-500' : 'text-gray-600'
          }`}>
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`transition-all duration-300 border-b-2 border-transparent ${
                isDark 
                  ? 'hover:text-white hover:border-white' 
                  : 'hover:text-gray-900 hover:border-gray-900'
              }`}
              title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDark ? <FiSun className="text-2xl" /> : <FiMoon className="text-2xl" />}
            </button>
            
            {/* Cart */}
            <div className="relative flex items-center">
              <Link
                to="/Cart"
                className={`transition-all duration-300 border-b-2 border-transparent ${
                  isDark 
                    ? 'hover:text-white hover:border-white' 
                    : 'hover:text-gray-900 hover:border-gray-900'
                }`}
              >
                <FiShoppingBag className="text-2xl" />
                {addCart.length > 0 && (
                  <span className="absolute -top-2 -right-2 h-5 w-5 bg-green-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                    {addCart.length}
                  </span>
                )}
              </Link>
            </div>

            {/* Profile */}
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className={`transition-all duration-300 border-b-2 border-transparent ${
                isDark 
                  ? 'hover:text-white hover:border-white' 
                  : 'hover:text-gray-900 hover:border-gray-900'
              }`}
            >
              <FiUser className="text-2xl" />
            </button>

            {/* Profile Dropdown */}
            <AnimatePresence>
              {profileOpen && (
                <motion.div
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={dropdownVariants}
                  className={`absolute right-6 top-14 shadow-lg rounded-md w-56 z-50 font-poppins ${
                    isDark 
                      ? 'bg-black text-red-500' 
                      : 'bg-white border border-gray-200 text-gray-600'
                  }`}
                >
                  {!user ? (
                    <Link
                      to="/signin"
                      className={`block px-4 py-2 mt-2 text-sm font-medium ${
                        isDark 
                          ? 'text-red-500 hover:bg-red-600 hover:text-white' 
                          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                      }`}
                    >
                      SIGN IN
                    </Link>
                  ) : (
                    <>
                      <div className={`px-4 py-2 mt-2 text-sm ${
                        isDark ? 'text-red-500' : 'text-gray-600'
                      }`}>Hello, {user.name}</div>
                      <Link
                        to="/account"
                        className={`block px-4 py-2 mt-2 text-sm font-medium ${
                          isDark 
                            ? 'text-red-500 hover:bg-red-600 hover:text-white' 
                            : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                        }`}
                      >
                        ACCOUNT SETTINGS
                      </Link>
                      <button
                        onClick={logout}
                        className={`w-full text-left px-4 py-2 mt-2 text-sm font-medium ${
                          isDark 
                            ? 'text-red-500 hover:bg-red-600 hover:text-white' 
                            : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                        }`}
                      >
                        SIGN OUT
                      </button>
                    </>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Search */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className={`transition-all duration-300 border-b-2 border-transparent ${
                isDark 
                  ? 'hover:text-white hover:border-white' 
                  : 'hover:text-gray-900 hover:border-gray-900'
              }`}
            >
              <IoIosSearch className="text-2xl" />
            </button>

            {/* Fullscreen Search */}
            <AnimatePresence>
              {isSearchOpen && (
                <motion.div
                  className={`fixed inset-0 z-50 flex flex-col font-poppins ${
                    isDark ? 'bg-black text-white' : 'bg-white text-gray-900'
                  }`}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={overlayVariants}
                >
                  <motion.div
                    variants={inputVariants}
                    className={`flex items-center w-full border-b px-6 py-4 ${
                      isDark ? 'border-gray-600' : 'border-gray-300'
                    }`}
                  >
                    <input
                      type="text"
                      placeholder="What are you looking for?"
                      className={`flex-1 border-b px-3 py-2 text-lg focus:outline-none ${
                        isDark 
                          ? 'border-gray-400 bg-black text-white focus:border-red-600' 
                          : 'border-gray-300 bg-white text-gray-900 focus:border-red-500'
                      }`}
                    />
                    <button
                      onClick={() => setIsSearchOpen(false)}
                      className={`ml-4 font-medium ${
                        isDark 
                          ? 'text-red-500 hover:text-white' 
                          : 'text-red-600 hover:text-gray-900'
                      }`}
                    >
                      Cancel
                    </button>
                  </motion.div>

                  <div className={`grid grid-cols-3 gap-8 p-8 ${
                    isDark ? 'text-red-400' : 'text-gray-600'
                  }`}>
                    {[
                      {
                        title: "TRENDING SEARCHES",
                        items: ["Handbags", "Shoes", "Belts", "Bags"],
                      },
                      { title: "NEW IN", items: ["Women", "Men"] },
                      {
                        title: "SUGGESTIONS",
                        items: [
                          "GG Monogram Selection",
                          "Personalization",
                          "Store Locator",
                        ],
                      },
                    ].map((section, i) => (
                      <div key={i}>
                        <h3 className="font-semibold mb-4">{section.title}</h3>
                        <ul className="space-y-2">
                          {section.items.map((item, index) => (
                            <motion.li
                              key={index}
                              custom={index}
                              initial="hidden"
                              animate="visible"
                              variants={listItemVariants}
                            >
                              <a href="#" className="hover:text-white">
                                {item}
                              </a>
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Menu */}
            <div>
              <button
                onClick={() => setisOpen(!isOpen)}
                className={`transition-all duration-300 border-b-2 border-transparent ${
                  isDark 
                    ? 'hover:text-white hover:border-white' 
                    : 'hover:text-gray-900 hover:border-gray-900'
                }`}
              >
                <MdMenu className="text-2xl" />
              </button>

              {/* Sidebar */}
              <div
                className={`fixed top-0 right-0 h-full w-[320px] sm:w-[400px] shadow-2xl z-50 transform transition-transform duration-300 ${
                  isOpen ? "translate-x-0" : "translate-x-full"
                } ${
                  isDark ? 'bg-black' : 'bg-white'
                }`}
              >
                <div className="absolute top-4 right-4 flex items-center p-4">
                  <button
                    onClick={() => setisOpen(false)}
                    className={`rounded-full py-3 px-3 focus:outline-none ${
                      isDark 
                        ? 'bg-red-500 text-white' 
                        : 'bg-red-600 text-white'
                    }`}
                  >
                    <IoCloseSharp size={24} />
                  </button>
                </div>
                <nav className={`mt-14 flex flex-col p-6 space-y-4 font-poppins ${
                  isDark ? 'text-red-500' : 'text-gray-600'
                }`}>
                  <Link to="/" className={isDark ? 'hover:text-white' : 'hover:text-gray-900'}>
                    Home
                  </Link>
                  <Link to="/services" className={isDark ? 'hover:text-white' : 'hover:text-gray-900'}>
                    Services
                  </Link>
                  <Link to="/about" className={isDark ? 'hover:text-white' : 'hover:text-gray-900'}>
                    About
                  </Link>
                  <Link to="/contact" className={isDark ? 'hover:text-white' : 'hover:text-gray-900'}>
                    Contact
                  </Link>
                </nav>
              </div>

              {isOpen && (
                <div
                  className={`fixed inset-0 z-40 ${
                    isDark ? 'bg-black/50' : 'bg-gray-900/50'
                  }`}
                  onClick={() => setisOpen(false)}
                ></div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default Navbar;
