import React from "react";
import { motion } from "framer-motion";
import Navbar from "./Components/Navbar";
import Background from "./assets/Background.png";

function App() {
  return (
    <div className="w-full min-h-screen">
      {/* Background Section */}
      <div
        className="relative min-h-screen w-full bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${Background})` }}
      >
        {/* Text Section */}
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

        {/* Navbar */}
        <Navbar />
      </div>

      {/* Main Content */}
      <div className="px-3 sm:px-6 lg:px-8 py-4 sm:py-6">
     
      </div>
    </div>
  );
}

export default App;
