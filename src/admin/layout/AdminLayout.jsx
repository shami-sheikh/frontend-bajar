import React, { useState, useEffect } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { API_BASE_URL } from "../../utils/api";
import toast from "react-hot-toast";
import { 
  LayoutDashboard, 
  Users, 
  MessageSquare, 
  ShoppingBag, 
  PackageCheck, 
  Menu, 
  X, 
  ArrowLeft 
} from "lucide-react";

function AdminLayout() {
  const { userName, AuthorizationToken } = useAuth();
  const [userCount, setUserCount] = useState(0);
  const [contactCount, setContactCount] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  // Screen size check karne ke liye taaki desktop par sidebar hamesha dikhe
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize(); // Initial check
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Mobile par route change hote hi sidebar auto-close ho jaye
  useEffect(() => {
    if (window.innerWidth < 768) {
      setSidebarOpen(false);
    }
  }, [location]);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const userRes = await fetch(`${API_BASE_URL}/auth/user/admin`, {
          method: "GET",
          headers: { Authorization: AuthorizationToken }
        });
        if (userRes.ok) {
          const userData = await userRes.json();
          setUserCount(userData.users?.length || 0);
        }

        const contactRes = await fetch(`${API_BASE_URL}/auth/user/admincontact`, {
          method: "GET",
          headers: { Authorization: AuthorizationToken }
        });
        if (contactRes.ok) {
          const contactData = await contactRes.json();
          setContactCount(contactData.contacts?.length || 0);
        }
      } catch (error) {
        toast.error("Error fetching dashboard stats: " + error.message);
      }
    };
    if (AuthorizationToken) fetchAllData();
  }, [AuthorizationToken]);

  const navItems = [
    { label: "Dashboard", to: "/admin/dashboard", icon: LayoutDashboard },
    { label: "Products", to: "/admin/products", icon: ShoppingBag },
    { label: "Orders", to: "/admin/orders", icon: PackageCheck },
    { label: "Users", to: "/admin/users", icon: Users, badge: userCount },
    { label: "Messages", to: "/admin/contacts", icon: MessageSquare, badge: contactCount },
  ];

  return (
    <div className="min-h-screen flex text-gray-100" style={{ fontFamily: "'Inter', sans-serif" }}>
      
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-40 md:hidden transition-opacity duration-300"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar Component */}
      <aside 
        className={`fixed md:sticky top-0 left-0 h-screen bg-[#0D1117] border-r border-gray-800/50 flex flex-col z-50 transition-transform duration-300 shrink-0
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
        style={{ width: "260px" }}
      >
        {/* Brand/Header */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-gray-800/50">
          <div>
            <a href="/">
              <span className="text-lg font-bold tracking-wider text-white product-title">BAZAR<span className="text-blue-500">Blizz</span></span>
            <p className="text-[10px] text-blue-500 font-bold tracking-widest mt-0.5">ADMIN PORTAL</p>
            </a>
          </div>
          <button className="md:hidden text-gray-400 hover:text-white" onClick={() => setSidebarOpen(false)}>
            <X size={20} />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 py-6 px-4 space-y-1 overflow-y-auto">
          <p className="text-[10px] font-bold tracking-widest text-gray-500 px-3 mb-2">MANAGEMENT</p>
          {navItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.to}
              className={({ isActive }) => `
                flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group
                ${isActive 
                  ? "bg-blue-600/10 text-blue-400 border border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.05)]" 
                  : "text-gray-400 hover:text-gray-200 hover:bg-gray-800/40"
                }
              `}
            >
              <div className="flex items-center gap-3">
                <item.icon size={18} className="shrink-0 transition-transform group-hover:scale-105" />
                <span>{item.label}</span>
              </div>
              {item.badge > 0 && (
                <span className="text-[11px] px-2 py-0.5 font-bold rounded-full bg-gray-800 text-gray-300 border border-gray-700/50">
                  {item.badge}
                </span>
              )}
            </NavLink>
          ))}

          <div className="pt-4 border-t border-gray-800/50 mt-4">
            <NavLink to="/" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-400 hover:text-red-400 hover:bg-red-500/5 transition-all">
              <ArrowLeft size={18} />
              <span>Back to Website</span>
            </NavLink>
          </div>
        </nav>

        {/* Admin User Profile Footer */}
        <div className="p-4 border-t border-gray-800/50 bg-[#090d12]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center font-bold text-sm text-white shadow-lg shadow-blue-500/10">
              {userName?.charAt(0)?.toUpperCase() || "A"}
            </div>
            <div className="truncate">
              <p className="text-sm font-semibold text-white truncate">{userName || "Admin User"}</p>
              <span className="text-[11px] text-gray-500 font-medium">Super Admin</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 relative flex flex-col min-w-0 bg-whitesmoke text-gray-900">
        
        {/* Top Navbar */}
        <header className="h-16 bg-white border-b border-gray-200 px-6 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button 
              className="md:hidden text-gray-600 p-1 hover:bg-gray-100 rounded-lg transition-colors"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={22} />
            </button>
            <div>
              <h1 className="text-lg font-bold text-gray-800 hero-heading">Control Panel</h1>
              <p className="text-xs text-gray-500 hidden sm:block">Welcome back, {userName || "Admin"}</p>
            </div>
          </div>

          {/* Quick Mini Stats Header */}
          <div className="flex items-center gap-3 sm:gap-4">
          <NavLink to={"/admin/users"}>
              <div className="bg-gray-50 border border-gray-100 rounded-xl px-3 py-1.5 text-center hidden sm:block">
              <span className="text-[10px] text-gray-400 uppercase font-bold block">Live Users</span>
              <span className="text-sm font-bold text-gray-800">{userCount}</span>
            </div>
          </NavLink>
            <div className="bg-gray-50 border border-gray-100 rounded-xl px-3 py-1.5 text-center hidden sm:block">
              <span className="text-[10px] text-gray-400 uppercase font-bold block">New Enquiries</span>
              <span className="text-sm font-bold text-gray-800">{contactCount}</span>
            </div>
          </div>
        </header>

        {/* Dynamic Content Renderer */}
        <main className="p-6 flex-1 overflow-y-auto bg-[#F5F5F5]">
          <Outlet /> {/* <-- Isse saare sub-pages (Users, Contacts) automatically render honge */}
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;