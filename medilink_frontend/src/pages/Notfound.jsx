import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-slate-900 font-sans text-slate-100 flex flex-col selection:bg-teal-500 selection:text-white">
      <Navbar />
      
      <div className="flex-1 flex items-center justify-center px-6 py-20 relative overflow-hidden">
        {/* Background glow effects */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute top-1/3 left-1/3 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-xl w-full text-center relative z-10">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-teal-500/10 border border-teal-500/20 rounded-3xl mb-8 text-4xl text-teal-400 shadow-xl shadow-teal-500/5">
            🏥
          </div>

          <h1 className="text-7xl font-display font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-teal-400 tracking-tight mb-4">
            404
          </h1>

          <h2 className="text-2xl font-bold text-white mb-3">
            Medical Page Not Found
          </h2>

          <p className="text-slate-400 text-sm leading-relaxed mb-8 max-w-md mx-auto">
            The clinical resource or portal directory you requested could not be located. It may have been moved, renamed, or is restricted to emergency personnel.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/"
              className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white font-semibold text-sm rounded-xl shadow-lg shadow-teal-500/20 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              Return to Homepage
            </Link>
            <Link
              to="/portal"
              className="w-full sm:w-auto px-6 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-sm rounded-xl border border-slate-700 transition-all"
            >
              Access Patient Portal
            </Link>
          </div>

          {/* Quick Help Footer */}
          <div className="mt-12 pt-8 border-t border-slate-800/80 flex items-center justify-center gap-6 text-xs text-slate-400">
            <span>24/7 Emergency Line: <strong className="text-slate-200">1-800-NOVACARE</strong></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;