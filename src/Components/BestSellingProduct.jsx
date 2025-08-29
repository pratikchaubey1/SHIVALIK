import React, { useContext } from "react";
import { motion } from "framer-motion";
import { ProductsData } from "../context/Context";

function BestSellingProduct() {
  const { product } = useContext(ProductsData);

  return (
    <div className="mt-10 flex flex-col items-center gap-10 px-5">
      <h1 className="text-4xl font-bold tracking-wide text-center">
        Best Selling Products
      </h1>

      {/* 3 Square Cards in a Row */}
      <div className="grid grid-cols-3 gap-6 justify-items-center">
        {product && product.slice(0, 3).map((data, index) => (
          <motion.div
            key={data.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group [perspective:1000px] cursor-pointer"
          >
            <div className="relative w-72 h-72 sm:w-80 sm:h-80 md:w-80 md:h-80 transition-transform duration-[1000ms] [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] rounded-xl overflow-hidden shadow-lg">
              
              {/* Front Side */}
              <div className="absolute w-full h-full [backface-visibility:hidden]">
                <img
                  src={data.src}
                  alt={data.title}
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>

              {/* Back Side */}
              <div className="absolute w-full h-full [transform:rotateY(180deg)] [backface-visibility:hidden]">
                <img
                  src={data.sck}
                  alt={data.title}
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default BestSellingProduct;
