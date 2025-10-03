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
import navBackground from "../assets/images/navimg.JPG";

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
  const isHomePage = location.pathname === "/";
  const { user, logout } = useAuth();
  const { theme, toggleTheme, isDark } = useTheme();

  // Dynamic height based on page and scroll state
  const navbarHeight = isHomePage 
    ? (isScroll ? '90px' : '160px')
    : '90px';

  // Dynamic logo styling
  const logoStyle = isHomePage 
    ? (isScroll 
      ? { fontSize: "1.5rem", y: 0, x: 0 }
      : { fontSize: logoSize, y: logoY, x: logoX })
    : { fontSize: "1.5rem", y: 0, x: 0 };

  // Dynamic icon positioning
  const iconPosition = isHomePage
    ? (isScroll ? 'top-1/2 -translate-y-1/2' : 'top-4 sm:top-8')
    : 'top-1/2 -translate-y-1/2';

  // Dynamic icon size
  const iconSize = isHomePage
    ? (isScroll ? "text-xl" : "text-2xl")
    : "text-xl";

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 right-0 w-full z-40 shadow-md"
        style={{
          backgroundImage: `url(${navBackground})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
          backgroundRepeat: 'no-repeat',
          height: navbarHeight,
          transition: 'height 0.3s ease-in-out'
        }}
      >
        {/* Background overlay */}
        <div className={`absolute inset-0 w-full h-full ${
          isDark ? "bg-black/75" : "bg-white/80"
        }`}></div>
        
        <div className="w-full h-full max-w-7xl mx-auto relative px-4 sm:px-6 flex justify-center items-center">
          {/* Logo */}
          <Link to="/" className="font-playfair tracking-widest">
            <motion.h1
              style={logoStyle}
              className={`font-serif tracking-widest text-center transition-all duration-300 ${
                isHomePage && !isScroll ? 'mt-8' : 'mt-0'
              } ${
                isDark ? 'text-red-500' : 'text-red-600'
              }`}
            >
              SHIVALIK
            </motion.h1>
          </Link>

          {/* Right Side Icons */}
          <div className={`absolute right-4 sm:right-6 flex gap-3 sm:gap-4 ${iconPosition} ${
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
              {isDark ? <FiSun className={iconSize} /> : <FiMoon className={iconSize} />}
            </button>
            
            {/* Cart */}
            <div className="relative">
              <Link
                to="/cart"
                className={`transition-all duration-300 border-b-2 border-transparent ${
                  isDark 
                    ? 'hover:text-white hover:border-white' 
                    : 'hover:text-gray-900 hover:border-gray-900'
                }`}
              >
                <FiShoppingBag className={iconSize} />
                {addCart.length > 0 && (
                  <span className="absolute -top-2 -right-2 h-5 w-5 bg-green-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                    {addCart.length}
                  </span>
                )}
              </Link>
            </div>

            {/* Profile */}
            <div className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className={`transition-all duration-300 border-b-2 border-transparent ${
                  isDark 
                    ? 'hover:text-white hover:border-white' 
                    : 'hover:text-gray-900 hover:border-gray-900'
                }`}
              >
                <FiUser className={iconSize} />
              </button>

              {/* Profile Dropdown */}
              <AnimatePresence>
                {profileOpen && (
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={dropdownVariants}
                    className={`absolute right-0 top-full mt-2 shadow-xl rounded-lg w-60 z-[9999] font-poppins ${
                      isDark 
                        ? 'bg-black border border-gray-600 text-red-400' 
                        : 'bg-white border border-gray-200 text-gray-700'
                    }`}
                  >
                    {!user ? (
                      <Link
                        to="/signin"
                        className={`block px-6 py-3 text-sm font-medium rounded-lg transition-colors ${
                          isDark 
                            ? 'text-red-400 hover:bg-red-600 hover:text-white' 
                            : 'text-gray-700 hover:bg-red-50 hover:text-red-600'
                        }`}
                        onClick={() => setProfileOpen(false)}
                      >
                        SIGN IN
                      </Link>
                    ) : (
                      <>
                        <div className={`px-6 py-3 text-sm border-b ${
                          isDark 
                            ? 'text-red-400 border-gray-600' 
                            : 'text-gray-700 border-gray-200'
                        }`}>
                          Hello, {user.name}
                        </div>
                        <Link
                          to="/account"
                          className={`block px-6 py-3 text-sm font-medium transition-colors ${
                            isDark 
                              ? 'text-red-400 hover:bg-red-600 hover:text-white' 
                              : 'text-gray-700 hover:bg-red-50 hover:text-red-600'
                          }`}
                          onClick={() => setProfileOpen(false)}
                        >
                          ACCOUNT SETTINGS
                        </Link>
                        <button
                          onClick={() => {
                            logout();
                            setProfileOpen(false);
                          }}
                          className={`w-full text-left px-6 py-3 text-sm font-medium transition-colors rounded-b-lg ${
                            isDark 
                              ? 'text-red-400 hover:bg-red-600 hover:text-white' 
                              : 'text-gray-700 hover:bg-red-50 hover:text-red-600'
                          }`}
                        >
                          SIGN OUT
                        </button>
                      </>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Search */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className={`transition-all duration-300 border-b-2 border-transparent ${
                isDark 
                  ? 'hover:text-white hover:border-white' 
                  : 'hover:text-gray-900 hover:border-gray-900'
              }`}
            >
              <IoIosSearch className={iconSize} />
            </button>

            {/* Menu */}
            <button
              onClick={() => setisOpen(!isOpen)}
              className={`transition-all duration-300 border-b-2 border-transparent ${
                isDark 
                  ? 'hover:text-white hover:border-white' 
                  : 'hover:text-gray-900 hover:border-gray-900'
              }`}
            >
              <MdMenu className={iconSize} />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Fullscreen Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            className={`fixed inset-0 z-[9998] flex flex-col font-poppins ${
              isDark ? 'bg-black text-white' : 'bg-white text-gray-900'
            }`}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={overlayVariants}
          >
            <div className={`flex items-center w-full border-b px-6 py-6 ${
              isDark ? 'border-gray-600' : 'border-gray-300'
            }`}>
              <input
                type="text"
                placeholder="What are you looking for?"
                className={`flex-1 border-b px-4 py-3 text-xl focus:outline-none ${
                  isDark 
                    ? 'border-gray-400 bg-black text-white focus:border-red-500' 
                    : 'border-gray-300 bg-white text-gray-900 focus:border-red-600'
                }`}
                autoFocus
              />
              <button
                onClick={() => setIsSearchOpen(false)}
                className={`ml-6 px-6 py-2 font-medium rounded-lg transition-colors ${
                  isDark 
                    ? 'text-red-400 hover:bg-red-600 hover:text-white' 
                    : 'text-red-600 hover:bg-red-50'
                }`}
              >
                Cancel
              </button>
            </div>

            <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-8 ${
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
                  <h3 className="font-semibold mb-6 text-lg">{section.title}</h3>
                  <ul className="space-y-3">
                    {section.items.map((item, index) => (
                      <motion.li
                        key={index}
                        custom={index}
                        initial="hidden"
                        animate="visible"
                        variants={listItemVariants}
                      >
                        <a 
                          href="#" 
                          className={`transition-colors ${
                            isDark ? 'hover:text-white' : 'hover:text-red-600'
                          }`}
                        >
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

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-[320px] sm:w-[400px] shadow-2xl z-[9997] transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } ${
          isDark ? 'bg-black' : 'bg-white'
        }`}
      >
        <div className="flex justify-end p-6">
          <button
            onClick={() => setisOpen(false)}
            className={`rounded-full p-3 transition-colors ${
              isDark 
                ? 'bg-red-600 text-white hover:bg-red-700' 
                : 'bg-red-600 text-white hover:bg-red-700'
            }`}
          >
            <IoCloseSharp size={24} />
          </button>
        </div>
        
        <nav className={`flex flex-col px-8 py-4 space-y-6 font-poppins text-lg ${
          isDark ? 'text-red-400' : 'text-gray-700'
        }`}>
          <Link 
            to="/" 
            className={`transition-colors ${
              isDark ? 'hover:text-white' : 'hover:text-red-600'
            }`}
            onClick={() => setisOpen(false)}
          >
            Home
          </Link>
          <Link 
            to="/products" 
            className={`transition-colors ${
              isDark ? 'hover:text-white' : 'hover:text-red-600'
            }`}
            onClick={() => setisOpen(false)}
          >
            Products
          </Link>
          <Link 
            to="/about" 
            className={`transition-colors ${
              isDark ? 'hover:text-white' : 'hover:text-red-600'
            }`}
            onClick={() => setisOpen(false)}
          >
            About
          </Link>
          <Link 
            to="/contact" 
            className={`transition-colors ${
              isDark ? 'hover:text-white' : 'hover:text-red-600'
            }`}
            onClick={() => setisOpen(false)}
          >
            Contact
          </Link>
        </nav>
      </div>

      {/* Sidebar Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[9996] bg-black/50"
          onClick={() => setisOpen(false)}
        ></div>
      )}
    </>
  );
}

export default Navbar;