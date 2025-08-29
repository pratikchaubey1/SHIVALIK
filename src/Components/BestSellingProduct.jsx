import React, { useContext } from "react";
import { CiHeart } from "react-icons/ci";
import { ProductsData } from "../context/Context";

function BestSellingProduct() {
  const { product, HandleClickAdd } = useContext(ProductsData);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-center px-4">
      {product.map((item) => (
        <div
          key={item.id}
          className="w-full max-w-[260px] mx-auto rounded-xl border border-black shadow-lg overflow-hidden bg-white transition transform hover:-translate-y-2 hover:shadow-2xl hover:border-purple-600"
        >
          {/* Image Section */}
          <div className="relative p-2">
            <img
              src={item.src}
              alt={item.title}
              className="w-full h-52 object-cover rounded-lg"
            />
            <span className="absolute bottom-2 right-2 bg-purple-200 text-purple-800 text-[10px] font-medium px-2 py-0.5 rounded-lg shadow">
              March, 24
            </span>
          </div>

          {/* Title & Description */}
          <div className="p-3">
            <h2 className="text-base font-semibold">{item.title}</h2>
            <p className="text-gray-500 text-xs mt-1 line-clamp-2">
              {item.description}
            </p>
          </div>

          {/* Price & Wishlist Button */}
          <div className="flex justify-between items-center p-3">
            <span className="flex items-center gap-1 text-gray-800 font-bold text-sm">
              <span className="text-lg">⚡</span> {item.price}
            </span>
            <button
              onClick={() => HandleClickAdd(item.id)}
              className="p-1.5 rounded-full border border-black hover:bg-red-500 hover:text-white transition"
            >
              <CiHeart size={18} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default BestSellingProduct;
