import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const isLoggedIn = !!localStorage.getItem("token");
  const userRole = localStorage.getItem("userRole");

  const handleGetStarted = () => {
    navigate("/choose-role");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handleDashboard = () => {
    if (userRole === 'admin') {
      navigate("/admin/dashboard");
    } else {
      navigate("/portal/home");
    }
  };

  const navLinks = [
    { name: "Departments", path: "/departments" },
    { name: "Find a Doctor", path: "/doctors" },
    { name: "Pharmacy", path: "/pharmacy" },
    { name: "Patient & Visitor Info", path: "/patient-visitor-info" },
  ];

  return (
    <nav className="w-full bg-white/95 backdrop-blur-xl border-b border-slate-200 sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-12 h-12 bg-brand-700 rounded-xl flex items-center justify-center text-white font-display font-bold text-2xl shadow-md group-hover:bg-brand-800 transition-all duration-300">
            N
          </div>
          <div className="flex flex-col">
            <span className="text-brand-900 font-display text-2xl font-extrabold leading-none tracking-tight">NovaCare</span>
            <span className="text-slate-500 text-xs font-semibold tracking-widest uppercase mt-0.5">Medical Center</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden lg:flex items-center gap-8 text-slate-700 font-medium text-sm tracking-wide uppercase">
          {navLinks.map((item) => (
            <li key={item.name}>
              <Link
                to={item.path}
                className="hover:text-brand-700 transition-colors relative group py-2"
              >
                {item.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-600 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center gap-4">
          {isLoggedIn ? (
            <div className="flex items-center gap-4">
              <button
                onClick={handleDashboard}
                className="text-brand-700 font-semibold hover:text-brand-900 transition-colors flex items-center gap-2"
              >
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                {userRole === 'admin' ? 'Admin Panel' : 'Patient Portal'}
              </button>
              <button
                onClick={handleLogout}
                className="bg-slate-100 text-slate-600 px-6 py-2.5 rounded-lg font-semibold hover:bg-slate-200 transition-all duration-300"
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={handleGetStarted}
              className="bg-brand-700 text-white px-7 py-2.5 rounded-lg font-bold shadow-md hover:bg-brand-800 transition-all duration-300"
            >
              Access Patient Portal
            </button>
          )}
        </div>

        {/* Mobile Hamburger */}
        <div className="lg:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-slate-700 hover:text-brand-700 focus:outline-none transition-colors"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white border-b border-slate-200 shadow-xl py-4 px-6 flex flex-col gap-4">
          {navLinks.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className="text-slate-700 font-medium hover:text-brand-700 hover:bg-slate-50 px-4 py-3 rounded-lg transition-all"
              onClick={() => setMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}

          {isLoggedIn ? (
            <>
              <button
                onClick={() => { setMenuOpen(false); handleDashboard(); }}
                className="bg-brand-50 text-brand-700 px-6 py-3 rounded-lg font-semibold hover:bg-brand-100 transition-all w-full text-left"
              >
                {userRole === 'admin' ? 'Admin Panel' : 'Patient Portal'}
              </button>
              <button
                onClick={() => { setMenuOpen(false); handleLogout(); }}
                className="bg-slate-100 text-slate-700 px-6 py-3 rounded-lg font-semibold hover:bg-slate-200 transition-all w-full text-left"
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={() => { setMenuOpen(false); handleGetStarted(); }}
              className="bg-brand-700 text-white px-6 py-3 rounded-lg font-bold shadow-md transition-all w-full"
            >
              Access Patient Portal
            </button>
          )}
        </div>
      )}
    </nav>
  );
}
