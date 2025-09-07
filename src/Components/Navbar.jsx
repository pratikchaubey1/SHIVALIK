import React, { useContext } from "react";
import { ProductsData } from "../context/Context";
import { FiShoppingBag, FiUser } from "react-icons/fi";
import { IoIosSearch } from "react-icons/io";
import { MdMenu } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { IoCloseSharp } from "react-icons/io5";

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

  return (
    <div className="font-poppins justify-between text-black overflow-x-hidden">
      <motion.div
        className={`fixed top-0 left-0 w-full h-22 z-50 transition-colors duration-500 ${
          isScroll ? "bg-black shadow-md" : "bg-transparent"
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
                className="font-serif tracking-widest mt-7 text-red-500 text-center"
              >
                SHIVALIK
              </motion.h1>
            </div>
          </Link>

          {/* Right Side Icons */}
          <div className="absolute right-4 sm:right-6 top-2 sm:top-6 flex gap-3 sm:gap-6 text-red-500">
            {/* Cart */}
            <div className="relative flex items-center">
              <Link
                to="/Cart"
                className="hover:text-white transition-all duration-300 border-b-2 border-transparent hover:border-white"
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
              className="hover:text-white transition-all duration-300 border-b-2 border-transparent hover:border-white"
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
                  className="absolute right-6 top-14 bg-black shadow-lg rounded-md w-56 z-50 font-poppins text-red-500"
                >
                  {[
                    { to: "/signin", text: "SIGN IN" },
                    { to: "/orders", text: "MY ORDERS" },
                    { to: "/account", text: "ACCOUNT SETTINGS" },
                    { to: "/address", text: "ADDRESS BOOK" },
                    { to: "/wallet", text: "WALLET" },
                    { to: "/saved", text: "SAVED ITEMS" },
                    { to: "/appointments", text: "MY APPOINTMENTS" },
                  ].map((item, i) => (
                    <Link
                      key={i}
                      to={item.to}
                      className="block px-4 py-2 mt-2 text-sm font-medium text-red-500 hover:bg-red-600 hover:text-white"
                    >
                      {item.text}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Search */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="hover:text-white transition-all duration-300 border-b-2 border-transparent hover:border-white"
            >
              <IoIosSearch className="text-2xl" />
            </button>

            {/* Fullscreen Search */}
            <AnimatePresence>
              {isSearchOpen && (
                <motion.div
                  className="fixed inset-0 bg-black z-50 flex flex-col font-poppins text-white"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={overlayVariants}
                >
                  <motion.div
                    variants={inputVariants}
                    className="flex items-center w-full border-b px-6 py-4"
                  >
                    <input
                      type="text"
                      placeholder="What are you looking for?"
                      className="flex-1 border-b border-gray-400 px-3 py-2 text-lg bg-black text-white focus:outline-none focus:border-red-600"
                    />
                    <button
                      onClick={() => setIsSearchOpen(false)}
                      className="ml-4 text-red-500 font-medium hover:text-white"
                    >
                      Cancel
                    </button>
                  </motion.div>

                  <div className="grid grid-cols-3 gap-8 p-8 text-red-400">
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
                className="hover:text-white transition-all duration-300 border-b-2 border-transparent hover:border-white"
              >
                <MdMenu className="text-2xl" />
              </button>

              {/* Sidebar */}
              <div
                className={`fixed top-0 right-0 h-full w-[320px] sm:w-[400px] bg-black shadow-2xl z-50 transform transition-transform duration-300 ${
                  isOpen ? "translate-x-0" : "translate-x-full"
                }`}
              >
                <div className="absolute top-4 right-4 flex items-center p-4">
                  <button
                    onClick={() => setisOpen(false)}
                    className="rounded-full py-3 px-3 focus:outline-none bg-red-500 text-white"
                  >
                    <IoCloseSharp size={24} />
                  </button>
                </div>
                <nav className="mt-14 flex flex-col p-6 space-y-4 font-poppins text-red-500">
                  <Link to="/" className="hover:text-white">
                    Home
                  </Link>
                  <Link to="/services" className="hover:text-white">
                    Services
                  </Link>
                  <Link to="/about" className="hover:text-white">
                    About
                  </Link>
                  <Link to="/contact" className="hover:text-white">
                    Contact
                  </Link>
                </nav>
              </div>

              {isOpen && (
                <div
                  className="fixed inset-0 bg-black/50 z-40"
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
