import React, { useState } from "react";
import { FiEye, FiEyeOff, FiLock, FiMail, FiX } from "react-icons/fi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { API_BASE_URL } from "../utils/api";
function LoginModal({ openModals, closeModels,setRegisterModals }) {
  const { storeToken } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [formData, setformData] = useState({
    email: "",
    password: "",
  });
  //   for handling the input
  const handlInput = (e, key) => {
    setformData({
      ...formData,
      [key]: e.target.value,
    });
  };
  const userLogin = async () => {
    try {
      const { email, password } = formData;
      if (!email || !password) {
        toast.error("All fields are required");
        return;
      }

      const response = await fetch(`${API_BASE_URL}/auth/api/login`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (!response.ok) {
        toast.error(data.msg || "Login failed");

        return;
      }
     if (response.ok) {
  storeToken(data.user.token, data.user.userName)  
  toast.success("Login successful")
  closeModels()  
  navigate("/")
}
      console.log(data.user);
      
    } catch (error) {
      toast.error(error.message);
    }
  };

  if (!openModals) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-4"
      onClick={closeModels}
    >
      <div
        className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-xl font-bold text-gray-900">
              Welcome to <span className="text-blue-500">BAZAR</span>
              <span className="text-red-500">Blizz</span>
            </h1>
            <p className="text-sm text-gray-400 mt-0.5">
              Login to your account
            </p>
          </div>
          <button
            onClick={closeModels}
            className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-400 hover:text-gray-900 hover:bg-slate-50 transition-all"
          >
            <FiX size={16} />
          </button>
        </div>

        {/* Form */}
        <div className="space-y-4">
          {/* Email */}
          <div>
            <label className="text-xs font-semibold text-gray-600 mb-1.5 block">
              Email
            </label>
            <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 h-11 focus-within:border-blue-400 transition-all">
              <FiMail size={15} className="text-gray-400 shrink-0" />
              <input
                type="email"
                autoComplete="off"
                value={formData.email}
                onChange={(e) => handlInput(e, "email")}
                placeholder="you@example.com"
                className="bg-transparent w-full outline-none text-sm text-gray-700 placeholder:text-gray-400"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="text-xs font-semibold text-gray-600 mb-1.5 block">
              Password
            </label>
            <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 h-11 focus-within:border-blue-400 transition-all">
              <FiLock size={15} className="text-gray-400 shrink-0" />
              <input
              autoComplete="new-password"
                value={formData.password}
                onChange={(e) => handlInput(e, "password")}
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="bg-transparent w-full outline-none text-sm text-gray-700 placeholder:text-gray-400"
              />
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="text-gray-400 hover:text-gray-700 transition-all shrink-0"
              >
                {showPassword ? <FiEyeOff size={15} /> : <FiEye size={15} />}
              </button>
            </div>
          </div>

          {/* Forgot */}
          <div className="text-right">
            <span className="text-xs text-blue-500 hover:underline cursor-pointer">
              Forgot password?
            </span>
          </div>

          {/* Submit */}
          <button
            onClick={userLogin}
            className="w-full h-11 bg-gray-900 text-white text-sm font-semibold rounded-lg hover:bg-gray-800 transition-all"
          >
            Login
          </button>

          {/* Register */}
          <p className="text-center text-xs text-gray-400">
            Don't have an account?{" "}
            <span
              onClick={() => {
                closeModels();
                setRegisterModals(true);
              }}
              className="text-blue-500 font-semibold hover:underline cursor-pointer"
            >
              Register
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginModal;
