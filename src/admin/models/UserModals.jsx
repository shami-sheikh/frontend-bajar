import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";

function UserModals({ closeusermodals, usermodals, useradmin,getAlluserdata }) {
  const [formData, setformData] = useState({
    userName: "",
    email: "",
  });
const {AuthorizationToken}=useAuth()
//  useradmin
  useEffect(()=>{
    if(useradmin){
        setformData(
         {
            userName:useradmin.userName||"",
            email:useradmin.email||""
         }
        )
    }
  },[useradmin])

  if (!usermodals || !useradmin) return null; // ✅ Safety check

  const handleinput = (e, key) => {
    setformData({
      ...formData,
      [key]: e.target.value,
    });
  };
// fetching update user data from backend
const Update = async () => {
  try {
    const response = await fetch(`http://localhost:5000/auth/user/admin/update/${useradmin._id}`, {
      method: "PUT",
      headers: {
        Authorization: AuthorizationToken,
        "Content-Type": "application/json"  // ✅
      },
      body: JSON.stringify(formData)  
    })
    const data = await response.json()
    if (response.ok) {
      getAlluserdata()
      toast.success("User updated successfully ✅")
      closeusermodals()
    } else {
      toast.error(data.message)
    }
  } catch (error) {
    toast.error(error.message)
  }
}
  return (
    <div
      className="fixed bg-black/60 z-50 inset-0 flex items-center justify-center px-4"
      onClick={closeusermodals} // ✅ Backdrop click par close
    >
      <div
        className="bg-slate-900 border text-white border-white/10 rounded-2xl p-6 w-full max-w-md shadow-2xl transition-all duration-200"
        onClick={(e) => e.stopPropagation()} // ✅ Internal clicks prevent stop closing
      >
        {/* Header */}
        <div className="flex justify-between items-center border-b border-white/5 pb-3">
          <h2 className="text-white font-bold text-lg tracking-wide">
            Edit User Account
          </h2>
          <button
            onClick={closeusermodals}
            className="text-gray-400 hover:text-white w-8 h-8 rounded-lg flex items-center justify-center hover:bg-white/5 transition-all text-sm"
          >
            ✕
          </button>
        </div>

        {/* User Form Fields */}
        <div className="flex flex-col gap-4 mt-5">
          {/* Username Input */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Username
            </label>
            <input
              type="text"
              value={formData.userName}
              onChange={(e) => handleinput(e, "userName")}
              placeholder="john.doe"
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-white/10 focus:border-blue-500/50 text-white outline-none transition-all text-sm"
            />
          </div>

          {/* Email Input */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Email Address
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleinput(e, "email")} 
              placeholder="example@gmail.com"
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-white/10 focus:border-blue-500/50 text-white outline-none transition-all text-sm"
            />
          </div>
        </div>

        {/* Action Buttons Footer */}
        <div className="mt-6 pt-4 border-t border-white/5 flex gap-3 justify-end">
          <button
            onClick={closeusermodals}
            className="px-4 py-2 rounded-xl text-sm font-medium bg-gray-800 text-gray-300 hover:bg-gray-700/80 hover:text-white transition-colors"
          >
            Cancel
          </button>
          <button 
          onClick={()=>Update()}
          className="px-5 py-2 rounded-xl text-sm font-medium bg-blue-600 text-white hover:bg-blue-500 shadow-lg shadow-blue-600/10 transition-all">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserModals;
