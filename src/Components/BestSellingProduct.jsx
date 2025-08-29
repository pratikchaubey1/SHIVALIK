import React, { useContext } from "react";
import { ProductsData } from "../context/Context";

function BestSellingProduct() {
  const { product, HandleClickAdd } = useContext(ProductsData);

  return (
    <div className="px-3 mb-10">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Our Bestsellers
      </h1>

      <div className="flex flex-wrap justify-center gap-6">
        {product.map((item) => (
          <div
            key={item.id}
            className="h-90 w-70 p-3 bg-white rounded-xl shadow-md 
                       hover:shadow-xl transition-transform duration-300 
                       transform hover:-translate-y-2 cursor-pointer"
          >
            {/* Image */}
            <div className="h-50 overflow-hidden mb-3 rounded-lg">
              <img
                className="w-full h-full object-cover rounded-lg 
                           transition-transform duration-500 ease-in-out 
                           hover:scale-110"
                src={item.src}
                alt={item.title}
              />
            </div>

            {/* Content */}
            <div>
              <h1 className="text-lg font-bold mb-2">{item.title}</h1>

              <div className="flex justify-between mb-3">
                <span className=" text-sm">{item.description}</span>
                <span className="font-bold">₹{item.price}</span>
              </div>

              <div className="flex justify-between">
                <button
                  onClick={() => HandleClickAdd(item.id)}
                  className="text-sm text-white bg-black px-5 py-2 rounded-2xl mr-2 
                             transition duration-300 hover:bg-gray-200 hover:text-black"
                >
                  Add to Cart
                </button>
                <button
                  className="text-sm px-8 py-2 bg-gray-300 rounded-2xl 
                             transition duration-300 hover:bg-black hover:text-white"
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BestSellingProduct;
