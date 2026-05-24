import React from "react";
import { useCart } from "../context/Cartcontext";
import { NavLink, useNavigate } from "react-router-dom";

function Cart() {
  const {
    cart,
    removeFromCart,
    clearCart,
    totalItems,
    totalPrice,
    increaseQty,
    decreaseQty,
  } = useCart();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="w-full min-h-screen bg-[#fcfaf6] flex flex-col items-center justify-center gap-6 p-4">
        <div className="w-20 h-20 bg-indigo-50/80 border border-indigo-100 rounded-2xl flex items-center justify-center text-indigo-500 animate-pulse">
          <svg
            className="w-9 h-9"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
            />
          </svg>
        </div>
        <div className="text-center space-y-1">
          <h2 className="text-xl font-bold text-gray-900 tracking-tight">
            Your cart is empty
          </h2>
          <p className="text-sm text-gray-400 font-light max-w-xs leading-relaxed">
            Add architectural system products to your active order matrix to get
            started.
          </p>
        </div>
        <button
          onClick={() => navigate("/collection")}
          className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold uppercase tracking-widest rounded-xl transition-all shadow-sm active:scale-95 cursor-pointer"
        >
          Browse Collection
        </button>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-[#fcfaf6] py-16 px-4 sm:px-8 lg:px-12 font-sans antialiased text-gray-800">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200/80 p-6 sm:px-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-black tracking-tight text-gray-900">
              Your Cart
            </h1>
            <p className="text-xs text-gray-400 mt-1 font-medium tracking-wide">
              {totalItems} item{totalItems !== 1 ? "s" : ""} registered in
              checkout matrix
            </p>
          </div>
          <button
            onClick={clearCart}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-600 hover:text-white bg-rose-50 hover:bg-rose-600 border border-rose-100 hover:border-rose-600 px-4 py-2 rounded-xl transition-all active:scale-95 cursor-pointer"
          >
            Clear All Elements
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Cart Items List */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            {cart.map((item) => (
              <div
                key={item._id}
                className="group bg-white border border-gray-200/80 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row gap-5 sm:items-center justify-between hover:shadow-md transition-all duration-200"
              >
                {/* Left Side: Image & Text info */}
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  <div className="w-20 h-20 rounded-xl overflow-hidden bg-gray-50 border border-gray-100 shrink-0 shadow-sm relative">
                   <NavLink to={"/productdetails"}>
                     <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-102"
                      onError={(e) =>
                        (e.target.src = "https://via.placeholder.com/80")
                      }
                    />
                   </NavLink>
                  </div>
                  <div className="space-y-1 flex-1 min-w-0">
                    <h3
                      className="text-sm font-bold text-gray-900 tracking-tight truncate group-hover:text-indigo-600 transition-colors"
                      title={item.title}
                    >
                      {item.title}
                    </h3>
                    {item.category && (
                      <span className="inline-block text-[10px] px-2 py-0.5 rounded-md bg-gray-100 text-gray-500 font-bold uppercase tracking-wide capitalize">
                        {item.category}
                      </span>
                    )}
                    <p className="text-base font-black text-indigo-600 pt-0.5">
                      ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                    </p>
                  </div>
                </div>

                {/* Right Side: Operations Panel */}
                <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-3 border-t sm:border-0 border-gray-50 pt-3 sm:pt-0">
                  <button
                    onClick={() => removeFromCart(item._id)}
                    className="inline-flex items-center gap-1 text-xs font-bold text-gray-400 hover:text-rose-600 bg-gray-50 hover:bg-rose-50 px-3 py-1.5 rounded-lg transition-all order-last sm:order-first cursor-pointer"
                  >
                    <svg
                      className="w-3.5 h-3.5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                    Remove
                  </button>

                  {/* Quantity Alignment Matrix Layout */}
                  <div className="flex items-center gap-3 bg-gray-50 border border-gray-200/40 p-1 rounded-xl shadow-inner shrink-0">
                    <button onClick={()=>decreaseQty(item._id)} className="w-7 h-7 flex items-center justify-center bg-white rounded-lg border border-gray-200/60 shadow-sm text-gray-600 hover:text-indigo-600 hover:border-indigo-100 font-black transition-all active:scale-90 cursor-pointer text-sm">
                      −
                    </button>
                    <span className="text-xs font-bold text-gray-800 min-w-[20px] text-center tabular-nums">
                      {item.quantity}
                    </span>
                    <button onClick={()=>increaseQty(item._id)} className="w-7 h-7 flex items-center justify-center bg-white rounded-lg border border-gray-200/60 shadow-sm text-gray-600 hover:text-indigo-600 hover:border-indigo-100 font-black transition-all active:scale-90 cursor-pointer text-sm">
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-gray-200/80 rounded-2xl p-6 shadow-sm sticky top-24 space-y-5">
              <h2 className="text-sm font-bold uppercase tracking-wider text-gray-900 border-b border-gray-50 pb-3">
                Order Summary
              </h2>

              {/* Items Breakdown list matrix */}
              <div className="flex flex-col gap-3 max-h-40 overflow-y-auto pr-1">
                {cart.map((item) => (
                  <div
                    key={item._id}
                    className="flex justify-between items-center gap-4"
                  >
                    <span className="text-xs text-gray-500 truncate font-light flex-1">
                      {item.title}{" "}
                      <span className="text-gray-400 font-normal">
                        × {item.quantity}
                      </span>
                    </span>
                    <span className="text-xs font-semibold text-gray-700 tabular-nums shrink-0">
                      ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                    </span>
                  </div>
                ))}
              </div>

              {/* Financial calculations metadata block */}
              <div className="border-t border-gray-100 pt-4 flex flex-col gap-3.5">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Subtotal
                  </span>
                  <span className="text-sm font-bold text-gray-800 tabular-nums">
                    ₹{totalPrice.toLocaleString("en-IN")}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Shipping
                  </span>
                  <span
                    className={`text-xs font-bold tracking-wide ${totalPrice >= 2500 ? "text-emerald-600" : "text-gray-700"}`}
                  >
                    {totalPrice >= 2500 ? "FREE EXPRESS" : "₹99"}
                  </span>
                </div>

                <div className="border-t border-gray-100 pt-4 flex justify-between items-end">
                  <div>
                    <span className="text-xs font-bold text-gray-900 uppercase tracking-widest">
                      Total
                    </span>
                    <p className="text-[10px] text-gray-400 font-medium">
                      VAT & Duties inclusive
                    </p>
                  </div>
                  <span className="text-xl font-black text-indigo-600 tabular-nums leading-none">
                    ₹
                    {(totalPrice >= 2500
                      ? totalPrice
                      : totalPrice + 99
                    ).toLocaleString("en-IN")}
                  </span>
                </div>

                <div className="flex justify-between items-center bg-gray-50 border border-gray-100 px-3 py-1.5 rounded-lg">
                  <span className="text-[11px] text-gray-400 font-semibold">
                    Total Items Registered
                  </span>
                  <span className="text-xs font-bold text-gray-800 tabular-nums">
                    {totalItems} unit{totalItems !== 1 ? "s" : ""}
                  </span>
                </div>
              </div>

              {/* Free shipping banner notice */}
              {totalPrice < 2500 && (
                <div className="bg-indigo-50/60 border border-indigo-100/40 rounded-xl px-4 py-3 text-center">
                  <p className="text-xs text-indigo-600 font-medium leading-relaxed">
                    Add{" "}
                    <span className="font-bold">
                      ₹{(2500 - totalPrice).toLocaleString("en-IN")}
                    </span>{" "}
                    more for free priority shipping!
                  </p>
                </div>
              )}

              {/* Action Operations Matrix */}
              <div className="space-y-2.5 pt-2">
                <button className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold uppercase tracking-widest rounded-xl transition-all active:scale-98 shadow-md shadow-indigo-100 cursor-pointer">
                  Proceed to Checkout
                </button>

                <button
                  onClick={() => navigate("/collection")}
                  className="w-full py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold uppercase tracking-widest rounded-xl transition-all active:scale-98 cursor-pointer"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
