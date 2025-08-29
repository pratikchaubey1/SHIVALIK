import React from "react";
import Background from "../assets/Background.png";
import { motion } from "framer-motion";

function HomePage() {
  return (
    <div className="w-full min-h-screen relative">
      {/* Background */}
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
          <p className="text-base sm:text-lg md:text-xl font-light mb-2 text-black">
            Welcome to
          </p>

          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold text-black leading-tight">
            SHIVALIK
          </h1>

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

        {/* Floating Object Card */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute top-1/3 right-10 sm:right-16 md:right-24 w-64 h-64 sm:w-72 sm:h-72 bg-white rounded-xl shadow-2xl flex items-center justify-center hover:scale-105 transition-transform duration-500"
        >
          <div className="text-center">
            <h3 className="font-bold text-xl sm:text-2xl mb-2">Premium Service</h3>
            <p className="text-sm sm:text-base text-gray-700">
              Get the best services with Shivalik Hub. Reliable, fast, and trusted.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="px-3 sm:px-6 lg:px-8 py-4 sm:py-6">
        {/* You can add more cards or sections here */}
      </div>
    </div>
  );
}

export default HomePage;
