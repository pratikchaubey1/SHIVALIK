import React from "react";

function Cart() {
  
  return (
    <div className="bg-g min-h-screen py-6 px-4 sm:px-8 md:px-16 lg:px-24">
      {/* Header */}
      <header className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-10">
        <h1 className="text-2xl font-semibold">Cart page</h1>
        <nav className="flex flex-wrap justify-center sm:justify-end items-center gap-4 sm:gap-6 text-gray-700">
          <a href="/" className="hover:text-orange-500">Home</a>
          <a href="/shop" className="hover:text-orange-500">Shop</a>
          <a href="/cart" className="text-orange-500 font-semibold">Cart</a>
          <a href="/account" className="hover:text-orange-500">My Account</a>
          <span className="font-medium">$130.00</span>
          <span className="text-sm text-gray-500">2 item</span>
          <span className="cursor-pointer">🛒</span>
        </nav>
      </header>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="w-full text-left text-sm md:text-base">
          <thead>
            <tr className="border-t border-b bg-g">
              <th className="py-3 px-2">Product</th>
              <th className="py-3 px-2">Price</th>
              <th className="py-3 px-2">Quantity</th>
              <th className="py-3 px-2">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="flex items-center gap-3 py-3 px-2 min-w-[220px]">
                <button className="text-gray-400 hover:text-red-500">✕</button>
                <img src="https://via.placeholder.com/50" alt="Yellow Jacket" className="h-10 w-10 sm:h-12 sm:w-12" />
                <span className="truncate">Yellow Jacket</span>
              </td>
              <td className="py-3 px-2">$95.00</td>
              <td className="py-3 px-2">
                <input type="number" defaultValue="4" className="w-16 border px-2 py-1 rounded" />
              </td>
              <td className="py-3 px-2">$380.00</td>
            </tr>
            <tr>
              <td className="flex items-center gap-3 py-3 px-2 min-w-[220px]">
                <button className="text-gray-400 hover:text-red-500">✕</button>
                <img src="https://via.placeholder.com/50" alt="Casacos Parka Homens" className="h-10 w-10 sm:h-12 sm:w-12" />
                <span className="truncate">Casacos Parka Homens</span>
              </td>
              <td className="py-3 px-2">$95.00</td>
              <td className="py-3 px-2">
                <input type="number" defaultValue="3" className="w-16 border px-2 py-1 rounded" />
              </td>
              <td className="py-3 px-2">$90.00</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Buttons + Coupon */}
      <div className="flex flex-col lg:flex-row justify-between items-center mt-6 gap-4">
        <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
          <input
            type="text"
            placeholder="Enter Coupon Code Here"
            className="border px-3 py-2 rounded w-full sm:w-64"
          />
          <button className="bg-black text-white px-4 py-2 rounded w-full sm:w-auto">
            Apply Coupon
          </button>
        </div>
        <div className="flex flex-wrap gap-3 w-full lg:w-auto justify-center">
          <button className="bg-green-500 text-white px-4 py-2 rounded w-full sm:w-auto">
            ← Continue Shopping
          </button>
          <button className="bg-orange-400 text-white px-4 py-2 rounded w-full sm:w-auto">
            Empty Cart
          </button>
          <button className="bg-blue-400 text-white px-4 py-2 rounded w-full sm:w-auto">
            Update Cart
          </button>
        </div>
      </div>

      {/* Cart bottom section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-10">
        {/* Recommended products */}
        <div className="flex flex-wrap justify-center gap-6">
          <div className="text-center w-28 sm:w-32">
            <img src="https://images.unsplash.com/photo-1756370473190-4c41ddbd5e59?q=80&w=692&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Jeans" className="mx-auto" />
            <p className="mt-2 text-sm sm:text-base">Blue Jeans</p>
            <p className="text-xs sm:text-sm text-gray-600">$15.00</p>
            <button className="border border-red-500 text-red-500 px-2 py-1 mt-2 text-xs sm:text-sm rounded hover:bg-red-500 hover:text-white w-full">
              ADD TO CART
            </button>
          </div>
          <div className="text-center w-28 sm:w-32">
            <img src="https://images.unsplash.com/photo-1646295433021-926281ff0d6f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxOHx8fGVufDB8fHx8fA%3D%3D" alt="Shoes" className="mx-auto" />
            <p className="mt-2 text-sm sm:text-base">Pearl Platform</p>
            <p className="text-xs sm:text-sm text-gray-600">$20.00</p>
            <button className="border border-red-500 text-red-500 px-2 py-1 mt-2 text-xs sm:text-sm rounded hover:bg-red-500 hover:text-white w-full">
              ADD TO CART
            </button>
          </div>
          <div className="text-center w-28 sm:w-32">
            <img src="https://plus.unsplash.com/premium_photo-1756181211629-a024a0154173?q=80&w=1196&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Watch" className="mx-auto" />
            <p className="mt-2 text-sm sm:text-base">Uomo Watch</p>
            <p className="text-xs sm:text-sm line-through text-gray-400">$3.00</p>
            <p className="text-xs sm:text-sm text-gray-600">$2.00</p>
            <button className="border border-red-500 text-red-500 px-2 py-1 mt-2 text-xs sm:text-sm rounded hover:bg-red-500 hover:text-white w-full">
              ADD TO CART
            </button>
          </div>
        </div>

        {/* Cart Total */}
        <div className="border rounded-lg p-6 bg-white shadow">
          <h2 className="text-lg font-semibold mb-4">Cart Total</h2>
          <div className="flex justify-between mb-2 text-sm sm:text-base">
            <span>Subtotal</span>
            <span>$470.00</span>
          </div>
          <div className="flex justify-between mb-4 text-sm sm:text-base">
            <span>Shipping</span>
            <span className="text-blue-500 cursor-pointer">Calculate Shipping</span>
          </div>
          <div className="flex justify-between font-semibold mb-6 text-sm sm:text-base">
            <span>Total</span>
            <span>$470.00</span>
          </div>
          <button className="w-full bg-indigo-400 text-white py-3 font-medium hover:bg-indigo-500 rounded">
            Proceed To Checkout →
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
