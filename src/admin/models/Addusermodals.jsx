import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";

function Addusermodals({ getAlluserdata, addmodals, closeaddmodals }) {
  const { AuthorizationToken } = useAuth();
  const [formData, setformData] = useState({  // ✅ moved before if
    userName: "",
    email: "",
    password: "",
    isAdmin: false,
  });

  if (!addmodals) return null;

  const handlInput = (e, key) => {
    setformData({ ...formData, [key]: e.target.value });
  };

  const adduser = async () => {
    try {
      const response = await fetch(`http://localhost:5000/auth/user/admin/add`, {
        method: "POST",
        headers: {
          Authorization: AuthorizationToken,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData)
      });
      const data = await response.json()
      if (response.ok) {
        toast.success("User added successfully ✅")
        getAlluserdata()
        closeaddmodals()
      } else {
        toast.error(data.msg)  // ✅ show error from backend
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="fixed bg-black/60 z-50 inset-0 flex items-center justify-center px-4" onClick={closeaddmodals}>
      <div className="bg-slate-900 border text-white border-white/10 rounded-2xl p-6 w-full max-w-md shadow-2xl" onClick={(e) => e.stopPropagation()}>
        
        <div className="flex justify-between items-center border-b border-white/5 pb-3">
          <h2 className="text-white font-bold text-lg">Add New User</h2>
          <button onClick={closeaddmodals} className="text-gray-400 hover:text-white w-8 h-8 rounded-lg flex items-center justify-center hover:bg-white/5 transition-all">✕</button>
        </div>

        <div className="flex flex-col gap-4 mt-5">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Username</label>
            <input type="text" value={formData.userName}
              onChange={(e) => handlInput(e, "userName")}  // ✅
              placeholder="john.doe"
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white outline-none text-sm"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Email</label>
            <input type="email" value={formData.email}
              onChange={(e) => handlInput(e, "email")}  // ✅
              placeholder="example@gmail.com"
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white outline-none text-sm"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Password</label>
            <input type="password" value={formData.password}
              onChange={(e) => handlInput(e, "password")}  // ✅
              placeholder="••••••••"
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white outline-none text-sm"
            />
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" id="isAdmin" className="w-4 h-4"
              checked={formData.isAdmin}
              onChange={(e) => setformData({...formData, isAdmin: e.target.checked})}  // ✅
            />
            <label htmlFor="isAdmin" className="text-gray-400 text-sm">Make Admin</label>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-white/5 flex gap-3 justify-end">
          <button onClick={closeaddmodals} className="px-4 py-2 rounded-xl text-sm font-medium bg-gray-800 text-gray-300 hover:bg-gray-700 transition-colors">Cancel</button>
          <button onClick={adduser} className="px-5 py-2 rounded-xl text-sm font-medium bg-blue-600 text-white hover:bg-blue-500 transition-all">Add User</button>
        </div>
      </div>
    </div>
  );
}

export default Addusermodals;