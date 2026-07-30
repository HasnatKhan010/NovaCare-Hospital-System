import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import AIChatbot from "./AIChatbot";

const UserLayout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const menuItems = [
    { name: "Dashboard Overview", path: "/portal/home", icon: "📊" },
    { name: "Book Appointment", path: "/portal/appointment", icon: "📅" },
    { name: "My Appointments", path: "/portal/appointments", icon: "📋" },
    { name: "Hospital Pharmacy", path: "/portal/medicine", icon: "💊" },
    { name: "Clinical Journal", path: "/portal/notes", icon: "📝" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const sidebarContent = (
    <div className="h-full bg-slate-900 text-white flex flex-col justify-between select-none">
      {/* Brand Header */}
      <div>
        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-teal-500 rounded-xl flex items-center justify-center font-display font-extrabold text-white text-xl shadow-lg shadow-teal-500/20">
              N
            </div>
            <div>
              <h1 className="text-xl font-display font-extrabold text-white tracking-tight leading-none">NovaCare</h1>
              <p className="text-[10px] text-teal-400 font-bold tracking-widest uppercase mt-1">Patient Portal</p>
            </div>
          </Link>
        </div>

        {/* Nav list */}
        <nav className="px-4 py-6 space-y-1.5 overflow-y-auto">
          <div className="px-3 pb-2 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
            Patient Portal Menu
          </div>
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center px-4 py-3 rounded-xl font-semibold text-xs tracking-wide transition-all duration-200
                  ${isActive
                    ? "bg-gradient-to-r from-teal-500 to-teal-600 text-white shadow-lg shadow-teal-500/20"
                    : "text-slate-400 hover:bg-slate-800/60 hover:text-white"
                  }`}
              >
                <span className="text-base flex-shrink-0">{item.icon}</span>
                <span className="ml-3 font-semibold">{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* User Context bottom */}
      <div className="p-4 border-t border-slate-800 bg-slate-950/40">
        <div className="flex items-center gap-3 px-2 py-2 mb-3 bg-slate-800/40 rounded-xl border border-slate-800">
          <div className="w-9 h-9 rounded-lg bg-teal-500/20 border border-teal-500/30 flex items-center justify-center font-bold text-teal-400 text-xs">
            {user.name ? user.name.substring(0, 2).toUpperCase() : "PA"}
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-white text-xs font-bold truncate">{user.name || "Patient Account"}</span>
            <span className="text-slate-400 text-[10px] truncate">{user.email || "patient@novacare.com"}</span>
          </div>
        </div>
        
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-800 hover:bg-rose-600 text-slate-300 hover:text-white rounded-xl text-xs font-bold transition-all duration-200"
        >
          Sign Out
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans text-slate-800">
      {/* Desktop Sidebar */}
      <aside className="w-64 bg-slate-900 hidden md:block fixed inset-y-0 left-0 z-30 shadow-2xl">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-slate-900 animate-in slide-in-from-left duration-200">
            <div className="absolute top-0 right-0 -mr-12 pt-2">
              <button
                onClick={() => setMobileOpen(false)}
                className="ml-1 flex items-center justify-center h-10 w-10 rounded-full text-white focus:outline-none"
              >
                ✕
              </button>
            </div>
            {sidebarContent}
          </div>
        </div>
      )}

      {/* Main body wrapper */}
      <div className="flex-1 flex flex-col min-w-0 md:ml-64">
        {/* Top Navbar Header */}
        <header className="flex items-center justify-between px-6 py-4 bg-white border-b border-slate-200/80 sticky top-0 z-20 shadow-sm">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileOpen(true)}
              className="md:hidden p-1 text-slate-600 hover:text-slate-900 focus:outline-none"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <div className="hidden sm:flex items-center gap-2 text-xs font-semibold text-slate-500">
              <Link to="/" className="hover:text-teal-600 transition-colors">NovaCare Home</Link>
              <span>/</span>
              <span className="text-slate-900 font-bold">Patient Portal</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-xs font-bold border border-emerald-100">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
              Secure System Active
            </div>
            <Link
              to="/"
              className="text-xs font-bold text-slate-600 hover:text-teal-600 transition-colors"
            >
              Exit Portal &rarr;
            </Link>
          </div>
        </header>

        <main className="flex-1 p-6 md:p-10 animate-in fade-in duration-300">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>

      {/* Floating chatbot */}
      <AIChatbot />
    </div>
  );
};

export default UserLayout;
