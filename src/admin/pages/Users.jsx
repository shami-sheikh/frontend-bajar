import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";
import UserModals from "../models/UserModals";
import Addusermodals from "../models/Addusermodals";

function Users() {
  const [userdata, setuserdata] = useState([]);
  const { AuthorizationToken } = useAuth();
  const [usermodals, setusermodals] = useState(false);
  const [selecteduser, setselecteduser] = useState(null);
  const [addmodals, setaddmodals] = useState(false);

  const getAlluserdata = async () => {
    try {
      const response = await fetch(`http://localhost:5000/auth/user/admin`, {
        method: "GET",
        headers: {
          Authorization: AuthorizationToken,
        },
      });
      const data = await response.json();
      
      if (response.ok) {
        setuserdata(data.users);
      } else {
        toast.error("users not found");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const deleteuser = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/auth/user/admin/delete/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: AuthorizationToken,
        },
      });
      const data = await response.json();
      if (response.ok) {
        getAlluserdata();
        toast.success("user deleted sucessfully");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getAlluserdata();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50/50 p-6 sm:p-10 font-sans antialiased text-gray-800">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Header Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200/80 p-6 sm:px-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-black tracking-tight text-gray-900">
              User Management
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Administer system authorizations, review registry timelines, and deploy profile updates.
            </p>
          </div>
          <button 
            onClick={() => setaddmodals(true)} 
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-semibold shadow-sm hover:shadow-indigo-100 active:scale-95 transition-all duration-200 self-stretch sm:self-auto justify-center"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            Add New User
          </button>
        </div>

        {/* User Card List Matrix */}
        <div className="space-y-3">
          {userdata.map((item) => {
            return (
              <div 
                key={item._id} 
                className="group flex flex-col sm:flex-row justify-between p-4 sm:items-center bg-white border border-gray-200/80 rounded-xl hover:shadow-md hover:border-gray-300 transition-all duration-200 gap-4"
              >
                {/* Avatar info profile segment */}
                <div className="flex gap-4 items-center">
                  <div className="bg-gradient-to-tr from-indigo-600 to-violet-500 text-white h-11 w-11 rounded-xl flex items-center justify-center font-bold text-base shadow-sm shrink-0 uppercase tracking-wider">
                    {item.userName?.charAt(0)}
                  </div>
                  <div className="space-y-0.5">
                    <h2 className="text-gray-900 font-bold text-sm tracking-tight group-hover:text-indigo-600 transition-colors">
                      {item.userName}
                    </h2>
                    <p className="text-xs text-gray-500 font-medium">
                      {item.email}
                    </p>
                    <div className="flex items-center gap-2.5 pt-1">
                      <span
                        className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border ${
                          item.isAdmin 
                            ? "bg-purple-50 text-purple-700 border-purple-200" 
                            : "bg-emerald-50 text-emerald-700 border-emerald-200"
                        }`}
                      >
                        {item.isAdmin ? "Admin" : "User"}
                      </span>
                      <span className="w-1 h-1 rounded-full bg-gray-300" />
                      <p className="text-gray-400 text-[11px] font-medium flex items-center gap-1">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        Registered {new Date(item.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Management Action Callouts */}
                <div className="flex items-center gap-2 sm:self-auto self-end border-t border-gray-100 sm:border-0 pt-3 sm:pt-0 w-full sm:w-auto justify-end">
                  <button 
                    onClick={() => {
                      setselecteduser(item); // save user first
                      setusermodals(true);
                    }}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-indigo-50 hover:bg-indigo-600 text-indigo-700 hover:text-white text-xs font-bold transition-all duration-150 shadow-sm active:scale-95"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                    </svg>
                    Edit
                  </button>
                  <button 
                    onClick={() => deleteuser(item._id)} 
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-rose-50 hover:bg-rose-600 text-rose-600 hover:text-white text-xs font-bold transition-all duration-150 shadow-sm active:scale-95"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Profile Adjustment Modal Dialogs */}
      <UserModals 
        closeusermodals={() => setusermodals(false)}
        usermodals={usermodals}
        useradmin={selecteduser}
        getAlluserdata={getAlluserdata}
      />
      
      {/* Registry Assignment Modal Dialogs */}
      <Addusermodals 
        addmodals={addmodals} 
        closeaddmodals={() => setaddmodals(false)} 
        getAlluserdata={getAlluserdata}
      />
    </div>
  );
}

export default Users;