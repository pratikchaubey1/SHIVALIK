import React, { useState } from 'react'
import Show from './Show'
import Partner from '../assets/Partner.jpg'
import Pan from '../assets/Pan.jpg'
import In from '../assets/Insurance.jpg'
import service from '../assets/service.jpg'
import Tax from '../assets/Tax.jpg'
import land from '../assets/land.jpg'
import certi from '../assets/Car.jpg'
import li from '../assets/li.jpg'

function Hero() {
  const [hoveredItem, setHoveredItem] = useState(null)

  const handleMouseEnter = (item) => {
    setHoveredItem(item)
  }

  const handleMouseLeave = () => {
    setHoveredItem(null)
  }

  return (
    <div className='h-200 bg-[#a7cbd9]'>
      <div className='flex flex-col'>
        <h1 className='text-3xl font-bold ml-4 sm:ml-10 md:ml-15 mt-4 mb-5'>Category</h1>
        <hr className='w-[90%] sm:w-[80%] md:w-[70%] ml-4 sm:ml-10 md:ml-50 mb-3'/>
        
        <div className='flex flex-col sm:flex-row justify-around items-center mb-3'>
          <p 
            className='font-bold hover:cursor-pointer mb-2 sm:mb-0 flex items-center gap-2 transition-all duration-300 ease-in-out'
            onMouseEnter={() => handleMouseEnter('partner')}
            onMouseLeave={handleMouseLeave}
          >
            Partner Program
            {hoveredItem === 'partner' && (
              <img 
                src={Partner} 
                alt="Partner Program" 
                className='w-12 h-6 object-cover rounded transition-all duration-300 ease-in-out animate-fadeIn'
              />
            )}
          </p>
          
          <p 
            className='font-bold hover:cursor-pointer sm:mr-10 md:mr-40 flex items-center gap-2 transition-all duration-300 ease-in-out'
            onMouseEnter={() => handleMouseEnter('pan')}
            onMouseLeave={handleMouseLeave}
          >
            Pan Card
            {hoveredItem === 'pan' && (
              <img 
                src={Pan}
                alt="Pan Card" 
                className='w-12 h-6 object-cover rounded transition-all duration-300 ease-in-out animate-fadeIn'
              />
            )}
          </p>
        </div>
        <hr className='w-[90%] sm:w-[80%] md:w-[70%] ml-4 sm:ml-10 md:ml-50 mt-2 mb-3'/>
        
        <div className='flex flex-col sm:flex-row justify-around items-center mb-3'>
          <p 
            className='font-bold hover:cursor-pointer sm:ml-10 md:ml-40 mb-2 sm:mb-0 flex items-center gap-2 transition-all duration-300 ease-in-out'
            onMouseEnter={() => handleMouseEnter('insurance')}
            onMouseLeave={handleMouseLeave}
          >
            Insurance
            {hoveredItem === 'insurance' && (
              <img 
                src={In} 
                alt="Insurance" 
                className='w-12 h-6 object-cover rounded transition-all duration-300 ease-in-out animate-fadeIn'
              />
            )}
          </p>
          
          <p 
            className='font-bold hover:cursor-pointer flex items-center gap-2 transition-all duration-300 ease-in-out'
            onMouseEnter={() => handleMouseEnter('service')}
            onMouseLeave={handleMouseLeave}
          >
            Service
            {hoveredItem === 'service' && (
              <img 
                src={service} 
                alt="Service" 
                className='w-12 h-6 object-cover rounded transition-all duration-300 ease-in-out animate-fadeIn'
              />
            )}
          </p>
        </div>
        <hr className='w-[90%] sm:w-[80%] md:w-[70%] ml-4 sm:ml-10 md:ml-50 mt-2 mb-3'/>
        
        <div className='flex flex-col sm:flex-row justify-around items-center mb-3'>
          <p 
            className='font-bold hover:cursor-pointer mb-2 sm:mb-0 flex items-center gap-2 transition-all duration-300 ease-in-out'
            onMouseEnter={() => handleMouseEnter('tax')}
            onMouseLeave={handleMouseLeave}
          >
            Tax
            {hoveredItem === 'tax' && (
              <img 
                src={Tax} 
                alt="Tax" 
                className='w-12 h-6 object-cover rounded transition-all duration-300 ease-in-out animate-fadeIn'
              />
            )}
          </p>
          
          <p 
            className='font-bold hover:cursor-pointer sm:mr-10 md:mr-70 flex items-center gap-2 transition-all duration-300 ease-in-out'
            onMouseEnter={() => handleMouseEnter('land')}
            onMouseLeave={handleMouseLeave}
          >
            Land Record
            {hoveredItem === 'land' && (
              <img 
                src={land}
                alt="Land Record" 
                className='w-12 h-6 object-cover rounded transition-all duration-300 ease-in-out animate-fadeIn'
              />
            )}
          </p>
        </div>
        <hr className='w-[90%] sm:w-[80%] md:w-[70%] ml-4 sm:ml-10 md:ml-50 mt-2 mb-3'/>
        
        <div className='flex flex-col sm:flex-row justify-around items-center mb-3'>
          <p 
            className='font-bold hover:cursor-pointer sm:ml-5 md:ml-20 mb-2 sm:mb-0 flex items-center gap-2 transition-all duration-300 ease-in-out'
            onMouseEnter={() => handleMouseEnter('certificate')}
            onMouseLeave={handleMouseLeave}
          >
            Certificate
            {hoveredItem === 'certificate' && (
              <img 
                src={certi}
                alt="Certificate" 
                className='w-12 h-6 object-cover rounded transition-all duration-300 ease-in-out animate-fadeIn'
              />
            )}
          </p>
          
          <p 
            className='font-bold hover:cursor-pointer sm:mr-5 md:mr-20 flex items-center gap-2 transition-all duration-300 ease-in-out'
            onMouseEnter={() => handleMouseEnter('library')}
            onMouseLeave={handleMouseLeave}
          >
            Library
            {hoveredItem === 'library' && (
              <img 
                src={li}
                alt="Library" 
                className='w-12 h-6 object-cover rounded transition-all duration-300 ease-in-out animate-fadeIn'
              />
            )}
          </p>
        </div>
        <hr className='w-[90%] sm:w-[80%] md:w-[70%] ml-4 sm:ml-10 md:ml-50 mt-2'/>
      </div>
      
      <Show/>
    </div>
  )
}

export default Hero;