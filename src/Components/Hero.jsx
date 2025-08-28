import React from 'react'
import Show from './Show'

function Hero() {
  return (
    <div className='h-200 bg-[#a7cbd9]'>
      <div className='flex flex-col'>
        <h1 className='text-3xl font-bold ml-4 sm:ml-10 md:ml-15 mt-4 mb-5'>Category</h1>
        <hr className='w-[90%] sm:w-[80%] md:w-[70%] ml-4 sm:ml-10 md:ml-50 mb-3'/>

        <div className='flex flex-col sm:flex-row justify-around items-center mb-3'>
          <p className='font-bold hover:cursor-pointer mb-2 sm:mb-0'>Partner Program</p>
          <p className='font-bold hover:cursor-pointer sm:mr-10 md:mr-40'>Pan Card</p>
        </div>
        <hr className='w-[90%] sm:w-[80%] md:w-[70%] ml-4 sm:ml-10 md:ml-50 mt-2 mb-3'/>

        <div className='flex flex-col sm:flex-row justify-around items-center mb-3'>
          <p className='font-bold hover:cursor-pointer sm:ml-10 md:ml-40 mb-2 sm:mb-0'>Insurance</p>
          <p className='font-bold hover:cursor-pointer'>Service</p>
        </div>
        <hr className='w-[90%] sm:w-[80%] md:w-[70%] ml-4 sm:ml-10 md:ml-50 mt-2 mb-3'/>

        <div className='flex flex-col sm:flex-row justify-around items-center mb-3'>
          <p className='font-bold hover:cursor-pointer mb-2 sm:mb-0'>Tax</p>
          <p className='font-bold hover:cursor-pointer sm:mr-10 md:mr-70'>Land Record</p>
        </div>
        <hr className='w-[90%] sm:w-[80%] md:w-[70%] ml-4 sm:ml-10 md:ml-50 mt-2 mb-3'/>

        <div className='flex flex-col sm:flex-row justify-around items-center mb-3'>
          <p className='font-bold hover:cursor-pointer sm:ml-5 md:ml-20 mb-2 sm:mb-0'>Certificate</p>
          <p className='font-bold hover:cursor-pointer sm:mr-5 md:mr-20'>Library</p>
        </div>
        <hr className='w-[90%] sm:w-[80%] md:w-[70%] ml-4 sm:ml-10 md:ml-50 mt-2'/>
      </div>

      <Show/>
    </div>
  )
}

export default Hero
