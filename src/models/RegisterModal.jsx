import React, { useState } from "react";
import toast from "react-hot-toast";
import { FiX } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function RegisterModal({ RegisterModals, closeRegisterModels, openModals }) {
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();
  const { storeToken } = useAuth();
  const [formData, setformData] = useState({
    userName: "",
    email: "",
    password: "",
    confirmpassword: "",
  });
  const handleinput = (e, key) => {
    setformData({
      ...formData,
      [key]: e.target.value,
    });
  };
  const userRegister = async () => {
    const { userName, email, password, confirmpassword } = formData;
    if (!userName || !email || !password || !confirmpassword) {
      toast.error("All feilds are required");
      return;
    }
    if (password !== confirmpassword) {
      toast.error("Passwords do not match");
      return;
    }
    try {
      const response = await fetch(`http://localhost:5000/auth/api/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userName, email, password }),
      });
      const data = await response.json();
      console.log(data);
      
      if (response.ok) {
        storeToken(data.user.token, data.user.userName);
        toast.success(data.msg || "Registered successfully ✅");
        closeRegisterModels();
        navigate("/");
      } else {
        toast.error(data.msg || "Registration failed");
      }
      console.log("register data ", data);
    } catch (error) {
      toast.error(error.message);
    }
  };
  if (!RegisterModals) return null;
  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-4"
      onClick={closeRegisterModels}
    >
      <div
        className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* headers */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-xl font-bold text-gray-900">
              Welcome to <span className="text-blue-500">BAZAR</span>
              <span className="text-red-500">Blizz</span>
            </h1>
            <p className="text-sm text-gray-400 mt-0.5">
              Register to your account
            </p>
          </div>
          <button
            onClick={closeRegisterModels}
            className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-400 hover:text-gray-900 hover:bg-slate-50 transition-all"
          >
            <FiX size={16} />
          </button>
        </div>

        {/* forms */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium shrink-0 text-gray-600">
              userName
            </label>
            <div className="flex border border-gray-200 gap-2 px-3 h-11 rounded-lg  items-center ">
              <input
                onChange={(e) => handleinput(e, "userName")}
                type="text"
                value={formData.userName}
                placeholder="john.down"
                className="bg-transparent w-full text-sm text-gray-600 placeholder:text-gray-400 outline-none "
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium shrink-0 text-gray-600">
              Email
            </label>
            <div className="flex border border-gray-200 gap-2 px-3 h-11 rounded-lg  items-center ">
              <input
                value={formData.email}
                onChange={(e) => handleinput(e, "email")}
                type="email"
                autoComplete="off"
                placeholder="example@.com"
                className="bg-transparent w-full text-sm text-gray-600 placeholder:text-gray-400 outline-none "
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium shrink-0 text-gray-600">
              password
            </label>
            <div className="flex border border-gray-200 gap-2 px-3 h-11 rounded-lg  items-center ">
              <input
                type="password"
                onChange={(e) => handleinput(e, "password")}
                autoComplete="new-password"
                value={formData.password}
                placeholder="••••••••"
                className="bg-transparent w-full text-sm text-gray-600 placeholder:text-gray-400 outline-none "
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium shrink-0 text-gray-600">
              Confirm password
            </label>
            <div className="flex border border-gray-200 gap-2 px-3 h-11 rounded-lg  items-center ">
              <input
                value={formData.confirmpassword}
                type="password"
                onChange={(e) => handleinput(e, "confirmpassword")}
                autoComplete="new-password"
                placeholder="••••••••"
                className="bg-transparent w-full text-sm text-gray-600 placeholder:text-gray-400 outline-none "
              />
            </div>
          </div>
          <div className="flex flex-col items-center w-full space-y-3">
            <button
              onClick={userRegister}
              className="w-full h-11 bg-gray-900 text-white text-sm font-semibold rounded-lg hover:bg-gray-800 transition-all"
            >
              {loading ? "Creating account..." : "Create Account"}
            </button>
            <p className="text-center text-xs text-gray-400">
              allready have an account?{" "}
              <span
                onClick={() => {
                  closeRegisterModels();
                }}
                className="text-blue-500 font-semibold hover:underline cursor-pointer"
              >
                login
              </span>
            </p>{" "}
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterModal;
