import React from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Home() {
  const navigate = useNavigate();

  const specialties = [
    {
      name: "Cancer & Oncology Institute",
      icon: "🎗️",
      desc: "Nationally recognized oncology care, personalized precision medicine, and advanced clinical trials.",
      color: "from-rose-500/10 to-rose-500/5 text-rose-500",
      link: "/departments"
    },
    {
      name: "Heart & Vascular Center",
      icon: "🫀",
      desc: "Advanced non-invasive cardiology, complex vascular surgery, and 24/7 cardiac emergency care.",
      color: "from-red-500/10 to-red-500/5 text-red-500",
      link: "/departments"
    },
    {
      name: "Neurological & Spine Institute",
      icon: "🧠",
      desc: "Comprehensive treatment for stroke, epilepsy, neurodegenerative conditions, and spinal reconstruction.",
      color: "from-teal-500/10 to-teal-500/5 text-teal-500",
      link: "/departments"
    },
    {
      name: "Pediatric & Children's Care",
      icon: "👶",
      desc: "Compassionate, specialized care for infants and children featuring Level 4 NICU units.",
      color: "from-sky-500/10 to-sky-500/5 text-sky-500",
      link: "/departments"
    },
    {
      name: "Orthopedics & Joint Care",
      icon: "🦴",
      desc: "Robotic-assisted joint replacement, sports medicine, and rehabilitation by world-class surgeons.",
      color: "from-emerald-500/10 to-emerald-500/5 text-emerald-500",
      link: "/departments"
    },
    {
      name: "24/7 Level 1 Trauma Center",
      icon: "🚨",
      desc: "Immediate critical care, rapid response surgical suites, and dedicated emergency transport.",
      color: "from-amber-500/10 to-amber-500/5 text-amber-500",
      link: "/departments"
    }
  ];

  const stats = [
    { label: "Board Certified Doctors", value: "350+" },
    { label: "Medical Specialties", value: "45+" },
    { label: "Annual Patient Visits", value: "250K+" },
    { label: "Patient Satisfaction Rate", value: "98.4%" }
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 selection:bg-teal-500 selection:text-white">
      <Navbar />

      {/* Emergency Alert Bar */}
      <div className="bg-gradient-to-r from-red-600 to-rose-700 text-white py-2.5 px-6 text-center text-xs font-semibold flex items-center justify-center gap-2 shadow-md">
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white"></span>
        </span>
        <span>
          Current ER Wait Time: <strong className="underline decoration-white/40">12 minutes</strong> at Main Campus. For life-threatening emergencies, call 911 immediately.
        </span>
      </div>

      {/* Hero Section */}
      <section className="relative bg-slate-900 text-white overflow-hidden py-16 lg:py-28">
        {/* Background glow graphics */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 grid lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Heading & CTA */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-teal-500/10 border border-teal-500/20 rounded-full text-xs font-semibold text-teal-400">
              <span className="w-2 h-2 bg-teal-400 rounded-full"></span>
              <span>Nationally Recognized Healthcare Leader</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold leading-tight tracking-tight text-white">
              Compassionate Care, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-emerald-300 to-cyan-300">
                Driven by Science.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-xl font-normal leading-relaxed">
              NovaCare Health System delivers innovative medical treatments, board-certified physician specialists, and a seamless digital patient portal to manage your health journey.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <button
                onClick={() => navigate("/doctors")}
                className="px-6 py-3.5 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white rounded-xl font-bold text-sm shadow-xl shadow-teal-500/20 transition-all transform hover:-translate-y-0.5"
              >
                Find a Specialist
              </button>
              <button
                onClick={() => navigate("/departments")}
                className="px-6 py-3.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl font-bold text-sm border border-slate-700 transition-all"
              >
                Explore Departments
              </button>
            </div>
          </div>

          {/* Right Column: Portal Gateway Card */}
          <div className="lg:col-span-5 w-full">
            <div className="bg-white/95 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-slate-200/80 text-slate-800">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-teal-50 text-teal-600 rounded-xl flex items-center justify-center text-xl shadow-inner">
                    🏥
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-slate-900 leading-tight">Patient Portal</h3>
                    <p className="text-[11px] text-teal-600 font-semibold">Secure MyChart Network</p>
                  </div>
                </div>
                <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded-full text-[10px] font-bold uppercase tracking-wider border border-emerald-100">
                  Online
                </span>
              </div>

              <p className="text-slate-600 text-xs leading-relaxed mb-6">
                Access electronic medical records, view test results, message care providers, and manage appointment bookings.
              </p>

              <div className="space-y-3">
                <button
                  onClick={() => navigate("/login")}
                  className="w-full py-3 bg-slate-900 hover:bg-teal-600 text-white rounded-xl font-bold text-sm shadow-md transition-all duration-300"
                >
                  Access Patient Dashboard
                </button>
                
                <div className="text-center pt-1">
                  <span className="text-xs text-slate-500">First time patient? </span>
                  <button onClick={() => navigate("/signup")} className="text-xs text-teal-600 font-bold hover:underline">
                    Create Patient Account
                  </button>
                </div>
              </div>

              <div className="mt-6 pt-5 border-t border-slate-100">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Instant Portal Actions</h4>
                <div className="grid grid-cols-2 gap-2 text-xs font-semibold text-slate-700">
                  <Link to="/pharmacy" className="p-2.5 bg-slate-50 hover:bg-teal-50 hover:text-teal-700 rounded-xl border border-slate-100 transition-colors flex items-center gap-2">
                    <span>💊</span> Refill Rx
                  </Link>
                  <Link to="/patient-visitor-info" className="p-2.5 bg-slate-50 hover:bg-teal-50 hover:text-teal-700 rounded-xl border border-slate-100 transition-colors flex items-center gap-2">
                    <span>📋</span> Visitor Info
                  </Link>
                  <Link to="/doctors" className="p-2.5 bg-slate-50 hover:bg-teal-50 hover:text-teal-700 rounded-xl border border-slate-100 transition-colors flex items-center gap-2">
                    <span>📅</span> Appointments
                  </Link>
                  <Link to="/portal" className="p-2.5 bg-slate-50 hover:bg-teal-50 hover:text-teal-700 rounded-xl border border-slate-100 transition-colors flex items-center gap-2">
                    <span>💳</span> Pay Invoice
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-white border-y border-slate-200 py-10 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, idx) => (
            <div key={idx} className="text-center lg:text-left border-l-2 border-teal-500 pl-4">
              <div className="text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">{stat.value}</div>
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Medical Specialties */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
          <div>
            <div className="text-xs font-bold text-teal-600 uppercase tracking-wider mb-1">Institutes of Excellence</div>
            <h2 className="text-3xl md:text-4xl font-display font-extrabold text-slate-900">Featured Medical Specialties</h2>
          </div>
          <button 
            onClick={() => navigate("/departments")} 
            className="text-sm font-bold text-teal-600 hover:text-teal-800 transition-colors flex items-center gap-1.5"
          >
            Explore All Departments <span aria-hidden="true">&rarr;</span>
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {specialties.map((item, idx) => (
            <div 
              key={idx}
              onClick={() => navigate(item.link)}
              className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200/80 hover:shadow-xl hover:border-teal-500/30 transition-all duration-300 cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className={`w-14 h-14 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-inner group-hover:scale-110 transition-transform duration-300`}>
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-teal-600 transition-colors">
                  {item.name}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                  {item.desc}
                </p>
              </div>
              <div className="text-xs font-bold text-teal-600 group-hover:text-teal-700 flex items-center gap-1">
                Learn More <span>&rarr;</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-16 px-6 border-t border-slate-800">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-10 mb-12 border-b border-slate-800 pb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-teal-500 text-white font-bold rounded-lg flex items-center justify-center">N</div>
              <span className="text-white font-bold text-lg">NovaCare</span>
            </div>
            <p className="text-xs leading-relaxed text-slate-400 mb-4">
              123 Healthway Drive, Medical District<br />
              City, ST 12345<br />
              Emergency Helpline: <strong>1-800-NOVA-CARE</strong>
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold text-sm mb-4 tracking-wider uppercase">Patients & Visitors</h4>
            <ul className="space-y-2.5 text-xs">
              <li><Link to="/login" className="hover:text-white transition-colors">Patient Portal</Link></li>
              <li><Link to="/patient-visitor-info" className="hover:text-white transition-colors">Visitor Guidelines & Mask Rules</Link></li>
              <li><Link to="/pharmacy" className="hover:text-white transition-colors">Hospital Pharmacy</Link></li>
              <li><Link to="/doctors" className="hover:text-white transition-colors">Find a Doctor</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-sm mb-4 tracking-wider uppercase">Specialized Care</h4>
            <ul className="space-y-2.5 text-xs">
              <li><Link to="/departments" className="hover:text-white transition-colors">Cardiology</Link></li>
              <li><Link to="/departments" className="hover:text-white transition-colors">Oncology Center</Link></li>
              <li><Link to="/departments" className="hover:text-white transition-colors">Neurology</Link></li>
              <li><Link to="/departments" className="hover:text-white transition-colors">Pediatrics</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-sm mb-4 tracking-wider uppercase">About NovaCare</h4>
            <ul className="space-y-2.5 text-xs">
              <li><Link to="/about" className="hover:text-white transition-colors">Institutional Overview</Link></li>
              <li><Link to="/departments" className="hover:text-white transition-colors">Emergency Services</Link></li>
              <li><Link to="/choose-role" className="hover:text-white transition-colors">Staff & Portal Access</Link></li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto text-xs text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-4 text-slate-400">
          <p>&copy; {new Date().getFullYear()} NovaCare Health System. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/patient-visitor-info" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/patient-visitor-info" className="hover:text-white transition-colors">Terms of Use</Link>
            <Link to="/patient-visitor-info" className="hover:text-white transition-colors">Nondiscrimination Notice</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}