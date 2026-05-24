import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FiShoppingBag } from "react-icons/fi";
import LoginModels from "../models/LoginModels";
import { useAuth } from "../context/AuthContext";
import RegisterModal from "../models/RegisterModal";
import { useCart } from "../context/Cartcontext";

function Navbar() {
  
  const { totalItems } = useCart();
  const [userDropdown, setUserDropdown] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openModals, setModels] = useState(false);
  const { isloggedIn, userName, user } = useAuth();
  const [RegisterModals, setRegisterModals] = useState(false);

  // Desktop Links Styling
  const Linkclass = ({ isActive }) =>
    `text-xs font-bold tracking-wider px-3 py-2 rounded-md transition-all duration-200 relative ${
      isActive
        ? "text-blue-600 after:absolute after:bottom-0 after:left-3 after:right-3 after:h-0.5 after:bg-blue-600 after:rounded-t"
        : "text-slate-500 hover:text-gray-900 hover:bg-slate-100"
    }`;

  // Mobile Links Styling
  const MobileLinkclass = ({ isActive }) =>
    `block text-sm font-semibold px-4 py-3 rounded-xl transition-all duration-200 ${
      isActive
        ? "text-blue-600 bg-blue-500/5 border-l-4 border-blue-500"
        : "text-slate-600 hover:text-gray-900 hover:bg-slate-50"
    }`;

  // Safe Name Generator Helper
  const getFirstName = () => {
    if (!userName) return "User";
    return userName.split(" ")[0];
  };

  return (
    <div className="w-full sticky top-0 z-40 bg-white border-b border-gray-200/80 shadow-sm">
      <div className="w-full h-16 flex items-center px-4 md:px-8 justify-between max-w-7xl mx-auto">
        {/* Logo */}
        <NavLink to="/">
          <h1 className="text-xl font-bold tracking-tight product-title">
            <span className="text-blue-600">BAZAR</span>
            <span className="text-gray-900">Blizz</span>
          </h1>
        </NavLink>

        {/* Nav Links — Desktop */}
        <ul className="hidden md:flex items-center gap-1">
          <li>
            <NavLink to="/" className={Linkclass}>
              HOME
            </NavLink>
          </li>
          <li>
            <NavLink to="/collection" className={Linkclass}>
              COLLECTION
            </NavLink>
          </li>
          <li>
            <NavLink to="/testimonial" className={Linkclass}>
              TESTIMONIAL
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" className={Linkclass}>
              ABOUT
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact" className={Linkclass}>
              CONTACT
            </NavLink>
          </li>

          {/* ✅ Safe Optional Chaining to prevent crashes */}
          {user?.isAdmin && (
            <li className="ml-2">
              <NavLink
                to="/admin/dashboard"
                className="bg-gray-900 hover:bg-gray-800 text-[11px] font-bold tracking-wider uppercase text-white px-3 py-1.5 rounded-lg transition-colors"
              >
                Admin Panel
              </NavLink>
            </li>
          )}
        </ul>

        {/* Actions — Desktop */}
        <div className="hidden md:flex items-center gap-4">
          {/* Search Box */}
          <div className="flex bg-slate-50 border border-gray-200 rounded-xl px-3 h-10 items-center focus-within:border-blue-500/50 focus-within:bg-white transition-all">
            <input
              type="search"
              placeholder="Search products..."
              className="bg-transparent w-36 text-gray-700 outline-none text-xs placeholder:text-gray-400"
            />
          </div>

          {/* Cart Icon */}
            <NavLink to={"/cart"} className={""}>
          <button className="relative w-10 h-10 cursor-pointer encoding-style flex items-center justify-center rounded-xl border border-gray-200 text-gray-600 hover:text-gray-900 hover:bg-slate-50 transition-all">
            <FiShoppingBag size={18} />
              {" "}
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                {totalItems}
              </span>
          </button>
            </NavLink>

          {/* User Profile / Login trigger */}
          {isloggedIn ? (
            <div className="relative">
              <button
                onClick={() => setUserDropdown(!userDropdown)}
                className="flex items-center gap-2 px-2 py-1 rounded-xl hover:bg-slate-50 transition-all border border-transparent hover:border-gray-100"
              >
                <div className="w-8 h-8 bg-gradient-to-tr from-blue-600 to-indigo-600 text-white rounded-xl flex items-center justify-center font-bold text-xs shadow-md shadow-blue-500/10">
                  {userName ? userName.charAt(0).toUpperCase() : "U"}
                </div>
                <span className="text-xs font-semibold text-gray-700">
                  Hi, {getFirstName()}
                </span>
              </button>

              {/* User Dropdown Drop Menu */}
              {userDropdown && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setUserDropdown(false)}
                  />
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200/80 rounded-2xl shadow-xl py-2 z-20">
                    <NavLink
                      to="/cart"
                      onClick={() => setUserDropdown(false)}
                      className="block px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-slate-50 hover:text-blue-600"
                    >
                      My Orders
                    </NavLink>
                    <hr className="my-1.5 border-gray-100" />
                    <NavLink
                      to="/logout"
                      onClick={() => setUserDropdown(false)}
                      className="block px-4 py-2 text-xs text-red-600 hover:bg-red-50 font-bold"
                    >
                      Logout Account
                    </NavLink>
                  </div>
                </>
              )}
            </div>
          ) : (
            <button
              onClick={() => setModels(true)}
              className="px-5 py-2 rounded-xl bg-gray-950 text-white text-xs font-bold tracking-wider uppercase hover:bg-gray-800 transition-all active:scale-95"
            >
              Login
            </button>
          )}
        </div>

        {/* Mobile Right Action Area */}
        <div className="flex md:hidden items-center gap-2">
          <div className="flex bg-slate-50 border border-gray-200 rounded-xl px-2 h-9 items-center">
            <input
              type="search"
              placeholder="Search..."
              className="bg-transparent w-24 text-gray-700 outline-none text-xs"
            />
          </div>

          <button className="relative w-9 h-9 flex items-center justify-center rounded-lg border border-gray-200 text-gray-600">
            <FiShoppingBag size={16} />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
             {totalItems}
            </span>
          </button>

          {/* Hamburger Menu Icon */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="w-9 h-9 flex flex-col items-center justify-center gap-1.5 rounded-lg border border-gray-200 hover:bg-slate-50 transition-all"
          >
            <span
              className={`block h-0.5 w-5 bg-gray-700 transition-all duration-200 ${menuOpen ? "rotate-45 translate-y-2" : ""}`}
            />
            <span
              className={`block h-0.5 w-5 bg-gray-700 transition-all duration-200 ${menuOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`block h-0.5 w-5 bg-gray-700 transition-all duration-200 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}
            />
          </button>
        </div>
      </div>

      {/* Mobile Sidebar Dropdown Options */}
      {menuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 px-4 py-4 flex flex-col gap-1.5 shadow-lg animate-fadeIn">
          <NavLink
            to="/"
            className={MobileLinkclass}
            onClick={() => setMenuOpen(false)}
          >
            HOME
          </NavLink>
          <NavLink
            to="/collection"
            className={MobileLinkclass}
            onClick={() => setMenuOpen(false)}
          >
            COLLECTION
          </NavLink>
          <NavLink
            to="/testimonial"
            className={MobileLinkclass}
            onClick={() => setMenuOpen(false)}
          >
            TESTIMONIAL
          </NavLink>
          <NavLink
            to="/about"
            className={MobileLinkclass}
            onClick={() => setMenuOpen(false)}
          >
            ABOUT
          </NavLink>
          <NavLink
            to="/contact"
            className={MobileLinkclass}
            onClick={() => setMenuOpen(false)}
          >
            CONTACT
          </NavLink>

          {user?.isAdmin && (
            <NavLink
              to="/admin/dashboard"
              className="block text-sm font-bold px-4 py-3 mt-1 text-white bg-blue-600 rounded-xl text-center shadow-md shadow-blue-500/10"
              onClick={() => setMenuOpen(false)}
            >
              ADMIN DASHBOARD
            </NavLink>
          )}

          {/* Auth Trigger Footer for Mobile screens */}
          <div className="pt-4 border-t border-gray-100 mt-3">
            {isloggedIn ? (
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-3 px-4 py-3 bg-slate-50 rounded-2xl mb-1.5">
                  <div className="w-9 h-9 bg-blue-600 text-white rounded-xl flex items-center justify-center font-bold text-sm">
                    {userName ? userName.charAt(0).toUpperCase() : "U"}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-900">
                      Hi, {getFirstName()}
                    </p>
                    <p className="text-[9px] text-gray-400 uppercase tracking-wider font-medium">
                      Verified Customer
                    </p>
                  </div>
                </div>

                <NavLink
                  to="/orders"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-between px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-slate-50 rounded-xl"
                >
                  <span>My Orders</span>
                  <span className="text-gray-400">→</span>
                </NavLink>

                <NavLink
                  to="/logout"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-between px-4 py-3 text-sm font-bold text-red-600 hover:bg-red-50 rounded-xl"
                >
                  <span>Logout Account</span>
                  <span className="text-red-400">→</span>
                </NavLink>
              </div>
            ) : (
              <button
                onClick={() => {
                  setModels(true);
                  setMenuOpen(false);
                }}
                className="w-full text-xs font-bold tracking-wider uppercase px-4 py-3.5 bg-gray-950 text-white rounded-xl hover:bg-gray-900 shadow-md transition-all active:scale-95"
              >
                LOGIN / REGISTER
              </button>
            )}
          </div>
        </div>
      )}

      {/* Modals Mounting Injection */}
      <LoginModels
        openModals={openModals}
        closeModels={() => setModels(false)}
        setRegisterModals={setRegisterModals}
      />

      <RegisterModal
        RegisterModals={RegisterModals}
        openModals={() => setModels(true)}
        closeRegisterModels={() => setRegisterModals(false)}
      />
    </div>
  );
}

export default Navbar;
