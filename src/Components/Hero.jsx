import React from 'react'
import Show from './Show'
import Partner from '../assets/Partner.jpg'
import Pan from '../assets/Pan.jpg'
import In from '../assets/Insurance.jpg'
import service from '../assets/service.jpg'
import Tax from '../assets/tax.jpg'
import land from '../assets/land.jpg'
import certi from '../assets/Car.jpg'
import li from '../assets/li.jpg'
import { useTheme } from '../context/ThemeContext'
import { motion } from 'framer-motion'

function Hero() {
  const { isDark } = useTheme()

  const categories = [
    { img: Partner, label: 'Partner Program' },
    { img: Pan, label: 'Pan Card' },
    { img: In, label: 'Insurance' },
    { img: service, label: 'Service' },
    { img: Tax, label: 'Tax' },
    { img: land, label: 'Land Record' },
    { img: certi, label: 'Certificate' },
    { img: li, label: 'Library' },
  ]

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDark ? 'bg-black' : 'bg-gray-50'
    }`}>
      <div className='container mx-auto px-6 sm:px-8 py-10'>
        <motion.h1 
          className={`text-4xl sm:text-5xl font-extrabold mb-8 ${
            isDark ? 'text-blue-400' : 'text-blue-600'
          }`}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Categories
        </motion.h1>

        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {categories.map((c, idx) => (
            <motion.div
              key={c.label}
              className={`${isDark 
                ? 'bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10 shadow-black/40' 
                : 'bg-gradient-to-br from-white to-blue-50 border border-blue-100 shadow-blue-100'} 
                group rounded-2xl p-4 flex flex-col items-center overflow-hidden shadow-[0_10px_24px_rgba(0,0,0,0.12)]`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.05 * idx }}
              whileHover={{ y: -4 }}
            >
              <div className="relative w-full aspect-square overflow-hidden rounded-xl">
                <img
                  src={c.img}
                  alt={c.label}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-110"
                  loading="lazy"
                />
              </div>
              <div className={`mt-3 text-center text-sm sm:text-base font-semibold ${isDark ? 'text-blue-300' : 'text-blue-700'}`}>
                {c.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>

      {/* Keep the rest of the page content as before */}
      <Show />
    </div>
  )
}

export default Hero
