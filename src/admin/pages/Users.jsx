import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";
import UserModals from "../models/UserModals";
import Addusermodals from "../models/Addusermodals";

// Inject fonts once
const fontLink = document.createElement("link");
fontLink.href =
  "https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap";
fontLink.rel = "stylesheet";
if (!document.head.querySelector("[href*='DM+Sans']")) {
  document.head.appendChild(fontLink);
}

const styles = `
  .users-root { font-family: 'DM Sans', sans-serif; }
  .mono { font-family: 'DM Mono', monospace; }

  @keyframes fadeSlideIn {
    from { opacity: 0; transform: translateY(10px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .card-enter {
    animation: fadeSlideIn 0.28s cubic-bezier(0.22, 1, 0.36, 1) both;
  }
  .card-enter:nth-child(1)  { animation-delay: 0.04s; }
  .card-enter:nth-child(2)  { animation-delay: 0.08s; }
  .card-enter:nth-child(3)  { animation-delay: 0.12s; }
  .card-enter:nth-child(4)  { animation-delay: 0.16s; }
  .card-enter:nth-child(5)  { animation-delay: 0.20s; }
  .card-enter:nth-child(6)  { animation-delay: 0.24s; }
  .card-enter:nth-child(n+7){ animation-delay: 0.28s; }

  .search-input:focus { outline: none; border-color: #6366f1; box-shadow: 0 0 0 3px rgba(99,102,241,0.12); }
  .search-input::placeholder { color: #9ca3af; }

  .avatar-ring {
    background: conic-gradient(from 180deg at 50% 50%, #6366f1, #8b5cf6, #a78bfa, #6366f1);
  }

  .delete-confirm {
    animation: fadeSlideIn 0.18s cubic-bezier(0.22,1,0.36,1) both;
  }

  .skeleton {
    background: linear-gradient(90deg, #f1f5f9 25%, #e2e8f0 50%, #f1f5f9 75%);
    background-size: 200% 100%;
    animation: shimmer 1.4s infinite;
    border-radius: 8px;
  }
  @keyframes shimmer {
    0%   { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }
`;

function SkeletonCard() {
  return (
    <div className="flex items-center gap-4 bg-white border border-gray-100 rounded-2xl p-4">
      <div className="skeleton h-11 w-11 rounded-xl shrink-0" />
      <div className="flex-1 space-y-2">
        <div className="skeleton h-3.5 w-32" />
        <div className="skeleton h-3 w-48" />
        <div className="skeleton h-3 w-24" />
      </div>
      <div className="flex gap-2">
        <div className="skeleton h-8 w-16 rounded-lg" />
        <div className="skeleton h-8 w-16 rounded-lg" />
      </div>
    </div>
  );
}

function UserCard({ item, onEdit, onDelete }) {
  const [confirmDelete, setConfirmDelete] = useState(false);

  const handleDeleteClick = () => {
    if (confirmDelete) {
      onDelete(item._id);
    } else {
      setConfirmDelete(true);
      setTimeout(() => setConfirmDelete(false), 3000);
    }
  };

  const initials = item.userName
    ? item.userName.slice(0, 2).toUpperCase()
    : "??";

  const dateStr = item.createdAt
    ? new Date(item.createdAt).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "—";

  return (
    <div className="card-enter group relative flex flex-col sm:flex-row justify-between p-4 sm:p-5 sm:items-center bg-white border border-gray-100 rounded-2xl hover:border-indigo-200 hover:shadow-lg hover:shadow-indigo-50/60 transition-all duration-200 gap-4">
      {/* Left — Avatar + Info */}
      <div className="flex gap-4 items-center min-w-0">
        {/* Avatar */}
        <div className="relative shrink-0">
          <div className="avatar-ring h-12 w-12 rounded-xl flex items-center justify-center p-[2px]">
            <div className="bg-white h-full w-full rounded-[10px] flex items-center justify-center">
              <span className="mono text-[13px] font-500 text-indigo-600 tracking-tight font-medium">
                {initials}
              </span>
            </div>
          </div>
          <span
            className={`absolute -bottom-1 -right-1 h-3.5 w-3.5 rounded-full border-2 border-white ${
              item.isAdmin ? "bg-violet-500" : "bg-emerald-400"
            }`}
          />
        </div>

        {/* Text info */}
        <div className="min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h2 className="text-gray-900 font-semibold text-[14px] tracking-tight truncate group-hover:text-indigo-600 transition-colors">
              {item.userName}
            </h2>
            <span
              className={`mono text-[10px] font-medium px-1.5 py-0.5 rounded-md ${
                item.isAdmin
                  ? "bg-violet-50 text-violet-600 ring-1 ring-violet-200"
                  : "bg-emerald-50 text-emerald-600 ring-1 ring-emerald-200"
              }`}
            >
              {item.isAdmin ? "admin" : "user"}
            </span>
          </div>
          <p className="mono text-[12px] text-gray-400 mt-0.5 truncate">
            {item.email}
          </p>
          <p className="text-[11px] text-gray-300 mt-1 flex items-center gap-1">
            <svg
              className="w-3 h-3 shrink-0"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            Joined {dateStr}
          </p>
        </div>
      </div>

      {/* Right — Actions */}
      <div className="flex items-center gap-2 sm:self-auto self-end pt-3 sm:pt-0 border-t border-gray-50 sm:border-0 w-full sm:w-auto justify-end shrink-0">
        <button
          onClick={() => onEdit(item)}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gray-50 hover:bg-indigo-600 text-gray-500 hover:text-white text-xs font-medium ring-1 ring-gray-200 hover:ring-indigo-600 transition-all duration-150 active:scale-95"
        >
          <svg
            className="w-3.5 h-3.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931z"
            />
          </svg>
          Edit
        </button>

        <button
          onClick={handleDeleteClick}
          className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-medium ring-1 transition-all duration-150 active:scale-95 ${
            confirmDelete
              ? "bg-rose-600 text-white ring-rose-600 scale-105"
              : "bg-gray-50 text-gray-500 ring-gray-200 hover:bg-rose-600 hover:text-white hover:ring-rose-600"
          }`}
        >
          {confirmDelete ? (
            <>
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126z"
                />
              </svg>
              Confirm?
            </>
          ) : (
            <>
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
              Delete
            </>
          )}
        </button>
      </div>
    </div>
  );
}

function EmptyState({ hasSearch }) {
  return (
    <div className="card-enter flex flex-col items-center justify-center py-16 bg-white border border-gray-100 rounded-2xl text-center">
      <div className="h-14 w-14 rounded-2xl bg-gray-50 flex items-center justify-center mb-4 ring-1 ring-gray-100">
        {hasSearch ? (
          <svg
            className="w-6 h-6 text-gray-300"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 15.803a7.5 7.5 0 0 0 10.607 0z"
            />
          </svg>
        ) : (
          <svg
            className="w-6 h-6 text-gray-300"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0z"
            />
          </svg>
        )}
      </div>
      <p className="text-sm font-semibold text-gray-700">
        {hasSearch ? "No matching users" : "No users yet"}
      </p>
      <p className="text-xs text-gray-400 mt-1 max-w-xs">
        {hasSearch
          ? "Try a different name or email address."
          : "Add your first user to get started."}
      </p>
    </div>
  );
}

function Users() {
  const [userdata, setuserdata] = useState([]);
  const { AuthorizationToken } = useAuth();
  const [usermodals, setusermodals] = useState(false);
  const [selecteduser, setselecteduser] = useState(null);
  const [addmodals, setaddmodals] = useState(false);
  const [search, setsearch] = useState("");
  const [loading, setloading] = useState(true);

  const handlesearch = (e) => setsearch(e.target.value);

  const filteredUsers = userdata.filter((item) => {
    const q = search.toLowerCase();
    return (
      item.userName?.toLowerCase().includes(q) ||
      item.email?.toLowerCase().includes(q)
    );
  });

  const getAlluserdata = async () => {
    try {
      const response = await fetch(`http://localhost:5000/auth/user/admin`, {
        method: "GET",
        headers: { Authorization: AuthorizationToken },
      });
      const data = await response.json();
      if (response.ok) {
        setuserdata(data.users);
      } else {
        toast.error("Could not load users.");
      }
    } catch (error) {
      console.error(error.message);
    } finally {
      setloading(false);
    }
  };

  const deleteuser = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:5000/auth/user/admin/delete/${id}`,
        {
          method: "DELETE",
          headers: { Authorization: AuthorizationToken },
        },
      );
      if (response.ok) {
        getAlluserdata();
        toast.success("User deleted.");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getAlluserdata();
  }, []);

  const adminCount = userdata.filter((u) => u.isAdmin).length;
  const userCount = userdata.length - adminCount;

  return (
    <>
      <style>{styles}</style>
      <div className="users-root min-h-screen bg-[#f8f9fc] p-5 sm:p-8">
        <div className="max-w-3xl mx-auto space-y-5">
          {/* ── Header ── */}
          <div className="bg-white border border-gray-100 rounded-2xl p-5 sm:p-6 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
              {/* Title + stats */}
              <div>
                <div className="flex items-center gap-2.5 mb-1">
                  <h1 className="text-xl font-bold tracking-tight text-gray-900">
                    User Management
                  </h1>
                  {!loading && (
                    <span className="mono text-[11px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded-lg">
                      {userdata.length} total
                    </span>
                  )}
                </div>
                <p className="text-[13px] text-gray-400 leading-snug">
                  Manage accounts, permissions, and access across your system.
                </p>

                {/* Mini stats */}
                {!loading && userdata.length > 0 && (
                  <div className="flex items-center gap-3 mt-3">
                    <div className="flex items-center gap-1.5 text-[12px] text-violet-600">
                      <span className="h-2 w-2 rounded-full bg-violet-500 inline-block" />
                      <span className="mono">{adminCount}</span> admin
                      {adminCount !== 1 && "s"}
                    </div>
                    <span className="text-gray-200">·</span>
                    <div className="flex items-center gap-1.5 text-[12px] text-emerald-600">
                      <span className="h-2 w-2 rounded-full bg-emerald-400 inline-block" />
                      <span className="mono">{userCount}</span> user
                      {userCount !== 1 && "s"}
                    </div>
                  </div>
                )}
              </div>

              {/* Add button */}
              <button
                onClick={() => setaddmodals(true)}
                className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold shadow-sm shadow-indigo-200 active:scale-95 transition-all duration-150 shrink-0 self-start sm:self-auto"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                Add User
              </button>
            </div>

            {/* Search */}
            <div className="mt-4 relative">
              <svg
                className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300 pointer-events-none"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 15.803a7.5 7.5 0 0 0 10.607 0z"
                />
              </svg>
              <input
                type="search"
                value={search}
                onChange={handlesearch}
                placeholder="Search by name or email…"
                className="search-input w-full pl-10 pr-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl transition-all duration-200"
              />
              {search && (
                <span className="mono absolute right-3.5 top-1/2 -translate-y-1/2 text-[11px] text-gray-300">
                  {filteredUsers.length} result
                  {filteredUsers.length !== 1 && "s"}
                </span>
              )}
            </div>
          </div>

          {/* ── User List ── */}
          <div className="space-y-2.5">
            {loading ? (
              <>
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
              </>
            ) : filteredUsers.length === 0 ? (
              <EmptyState hasSearch={search.length > 0} />
            ) : (
              filteredUsers.map((item) => (
                <UserCard
                  key={item._id}
                  item={item}
                  onEdit={(user) => {
                    setselecteduser(user);
                    setusermodals(true);
                  }}
                  onDelete={deleteuser}
                />
              ))
            )}
          </div>
        </div>

        {/* Modals */}
        <UserModals
          closeusermodals={() => setusermodals(false)}
          usermodals={usermodals}
          useradmin={selecteduser}
          getAlluserdata={getAlluserdata}
        />
        <Addusermodals
          addmodals={addmodals}
          closeaddmodals={() => setaddmodals(false)}
          getAlluserdata={getAlluserdata}
        />
      </div>
    </>
  );
}

export default Users;
