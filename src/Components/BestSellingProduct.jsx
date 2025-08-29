import React, { useContext } from "react";
import { BsFillCartPlusFill } from "react-icons/bs";
import { ProductsData } from "../context/Context";
import { Link } from "react-router-dom";

function BestSellingProduct() {
  const { product,HandleClickAdd} = useContext(ProductsData);
  console.log(product);
  

  return (
    <div className="mt-10 flex flex-wrap justify-center mb-4 gap-9 flex-col items-center">
      <h1 className="mt-10 mb-10 text-3xl font-bold">Best Selling Products</h1>
      <div className="flex flex-wrap gap-8 justify-center">
      {product && product.length > 0 ? (
        product.map((data) => (
          <div
            key={data.id}
            className="w-80 bg-white rounded-2xl shadow-md overflow-hidden flex flex-col transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-[#008585]/50"
          >
            {/* Product Image */}
            <img
              className="h-56 w-full object-cover rounded-t-2xl cursor-pointer transition-transform duration-500 hover:scale-110"
              src={data.src}
              alt={data.title}
            />

            {/* Content */}
            <div className="p-6 flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <h1 className="text-2xl font-semibold text-gray-800">{data.title}</h1>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {data.description}
                </p>
              </div>

              {/* Price + Cart Button */}
              <div className="flex justify-between items-center bg-white/70 backdrop-blur-md rounded-xl px-5 py-3 shadow-md transition-all duration-300 hover:shadow-lg">
                <h1 className="text-xl font-bold text-blue-500">₹{data.price}</h1>
                <button
                onClick={() => HandleClickAdd(data.id)}
                className="hover:cursor-pointer items-center justify-center p-3 rounded-full border-2 border-[#008585] text-[#008585] transition-all duration-300 hover:bg-[#008585] hover:text-white hover:shadow-md">
                  <BsFillCartPlusFill size={20} />
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-600 text-lg">No products found</p>
      )}
      </div>
      <Link to="/cart-Detail">
       <button className="h-15 w-50 bg-[#008585] rounded-md text-2xl hover:cursor-pointer text-white font-bold hover:border-2 hover:text-black hover:bg-white">See more </button>
      </Link>
     
    </div>
  );
}

export default BestSellingProduct;
