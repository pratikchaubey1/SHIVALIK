import React from 'react';

function HomePage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="group w-72 h-48 sm:w-80 sm:h-56 md:w-96 md:h-64 [perspective:1000px]">
        <div className="relative w-full h-full transition-transform duration-[1000ms] [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
          {/* Front Side */}
          <div className="absolute w-full h-full bg-purple-800 text-white flex items-center justify-center border-[10px] border-purple-800 rounded-xl text-xl sm:text-2xl [backface-visibility:hidden]">
            Front Side
          </div>
          {/* Back Side */}
          <div className="absolute w-full h-full bg-orange-400 text-white flex items-center justify-center border-[10px] border-orange-400 rounded-xl text-xl sm:text-2xl [transform:rotateY(180deg)] [backface-visibility:hidden]">
            Back Side
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
