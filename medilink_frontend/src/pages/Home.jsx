import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Home() {
  const navigate = useNavigate();
  const [selectedCampus, setSelectedCampus] = useState(0);
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const campuses = [
    {
      id: "main",
      name: "NovaCare Main Medical Campus & ER",
      type: "Level 1 Trauma Center",
      waitTime: "12 min",
      status: "Open 24/7",
      address: "123 Healthway Blvd, Medical District",
      phone: "1-800-555-NOVA",
      coordinates: { x: "45%", y: "40%" },
      features: ["24/7 Emergency", "Heliport Access", "Surgical Suites", "ICU"]
    },
    {
      id: "children",
      name: "NovaCare Children's Hospital",
      type: "Pediatric Emergency Pavilion",
      waitTime: "8 min",
      status: "Open 24/7",
      address: "450 Care Pediatrics Way",
      phone: "1-800-555-KIDS",
      coordinates: { x: "70%", y: "65%" },
      features: ["Level 4 NICU", "Pediatric ER", "Child Life Specialists"]
    },
    {
      id: "heart",
      name: "Heart & Vascular Specialty Institute",
      type: "Cardiac Center of Excellence",
      waitTime: "No Wait (By Appt)",
      status: "8:00 AM - 6:00 PM",
      address: "88 Cardiology Plaza, Suite 400",
      phone: "1-800-555-HEART",
      coordinates: { x: "30%", y: "75%" },
      features: ["Catheterization Lab", "Cardiac Rehab", "Echocardiography"]
    },
    {
      id: "outpatient",
      name: "Westside Surgery & Diagnostic Center",
      type: "Outpatient Surgical Facility",
      waitTime: "By Appointment",
      status: "7:00 AM - 7:00 PM",
      address: "1200 Westside Medical Pkwy",
      phone: "1-800-555-SURG",
      coordinates: { x: "20%", y: "30%" },
      features: ["Same-Day Surgery", "MRI & CT Diagnostics", "Physical Therapy"]
    }
  ];

  const featuredDoctors = [
    {
      name: "Dr. Sarah Jenkins, MD",
      specialty: "Cardiology & Heart Failure",
      experience: "16+ Years Experience",
      rating: "4.9",
      reviews: "184",
      image: "👩‍⚕️",
      availableToday: true
    },
    {
      name: "Dr. Marcus Vance, MD",
      specialty: "Neurosurgeon & Spine Specialist",
      experience: "20+ Years Experience",
      rating: "5.0",
      reviews: "210",
      image: "👨‍⚕️",
      availableToday: true
    },
    {
      name: "Dr. Elena Rostova, MD",
      specialty: "Pediatric Oncology",
      experience: "14+ Years Experience",
      rating: "4.9",
      reviews: "156",
      image: "👩‍⚕️",
      availableToday: false
    },
    {
      name: "Dr. James Sterling, MD",
      specialty: "Orthopedic Joint Surgeon",
      experience: "18+ Years Experience",
      rating: "5.0",
      reviews: "320",
      image: "👨‍⚕️",
      availableToday: true
    }
  ];

  const filteredSpecialties = [
    { category: "cardiology", icon: "🫀", title: "Heart & Vascular Care", desc: "Leading cardiovascular surgeries, non-invasive imaging, and 24/7 cardiac emergency care." },
    { category: "neurology", icon: "🧠", title: "Neurology & Brain Health", desc: "Comprehensive treatment for stroke, epilepsy, neurodegenerative diseases, and spine care." },
    { category: "oncology", icon: "🎗️", title: "Oncology & Cancer Center", desc: "Immunotherapy, precision radiation therapy, and personalized cancer survival programs." },
    { category: "pediatrics", icon: "👶", title: "Pediatrics & Children's ER", desc: "Child-centered compassionate medical care with Level 4 Neonatal Intensive Care." },
    { category: "orthopedics", icon: "🦴", title: "Orthopedics & Joint Surgery", desc: "Robotic-assisted joint replacement, sports injury rehabilitation, and spinal reconstruction." },
    { category: "emergency", icon: "🚨", title: "Level 1 Trauma & Emergency", desc: "Immediate 24/7 critical care, trauma surgical bays, and rapid helicopter transport." }
  ].filter(item => activeTab === "all" || item.category === activeTab);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/doctors?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-100 selection:bg-teal-500 selection:text-white">
      <Navbar />

      {/* Live Emergency Ticker */}
      <div className="bg-gradient-to-r from-red-600 via-rose-600 to-red-700 text-white py-2.5 px-6 shadow-lg relative z-20">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs font-semibold">
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
            </span>
            <span>
              <strong>Main Campus ER Wait Time:</strong> <span className="bg-white/20 px-2 py-0.5 rounded text-white font-bold">12 mins</span> • Trauma Bay Ready 24/7
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a href="tel:911" className="bg-white/15 hover:bg-white/25 px-3 py-1 rounded-full font-bold transition-colors border border-white/30">
              🚨 Emergency: Call 911
            </a>
            <button onClick={() => setSelectedCampus(0)} className="hover:underline text-red-100 font-bold hidden md:inline">
              View Live ER Map ↓
            </button>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative pt-12 pb-24 lg:pt-20 lg:pb-36 overflow-hidden">
        {/* Ambient Neon Background Effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-tr from-teal-500/20 via-cyan-500/10 to-indigo-500/20 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute top-10 right-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 bg-teal-500/10 border border-teal-500/30 rounded-full text-xs font-bold text-teal-300 shadow-xl shadow-teal-500/5">
              <span className="w-2 h-2 bg-teal-400 rounded-full animate-pulse"></span>
              <span>Next-Gen Institutional Healthcare</span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-extrabold tracking-tight text-white leading-[1.1]">
              Advanced Medicine. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-emerald-300 to-cyan-300">
                Human Compassion.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
              NovaCare is a top-ranked health system providing world-class medical specialists, 24/7 Level 1 emergency care, and a digital patient portal.
            </p>

            {/* Interactive Search Bar */}
            <form onSubmit={handleSearchSubmit} className="max-w-xl mx-auto pt-2">
              <div className="relative flex items-center bg-slate-900/90 backdrop-blur-2xl border border-slate-700/80 rounded-2xl p-2 shadow-2xl focus-within:border-teal-500 focus-within:ring-4 focus-within:ring-teal-500/10 transition-all">
                <span className="pl-3 text-lg">🔍</span>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search doctors, conditions, or departments..."
                  className="w-full bg-transparent px-3 py-2 text-sm text-white placeholder-slate-400 focus:outline-none font-medium"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white font-bold text-xs rounded-xl shadow-md transition-all flex-shrink-0"
                >
                  Search
                </button>
              </div>
            </form>

            <div className="flex items-center justify-center gap-6 pt-4 text-xs font-semibold text-slate-400">
              <span className="flex items-center gap-1.5"><span className="text-emerald-400">🟢</span> 42 Specialists On Duty</span>
              <span>•</span>
              <span className="flex items-center gap-1.5"><span className="text-teal-400">⭐</span> 99.2% Satisfaction Rate</span>
            </div>
          </div>
        </div>
      </section>

      {/* LIVE INTERACTIVE CAMPUS & EMERGENCY MAP LOCATOR */}
      <section className="py-16 px-6 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-500/10 border border-red-500/20 rounded-full text-xs font-bold text-red-400 mb-3">
            <span>🗺️ Live Campus Network</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white">Emergency & Hospital Campus Locator</h2>
          <p className="text-slate-400 text-sm mt-2">Select a campus to view real-time ER wait times, available medical facilities, and directions.</p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-center bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
          {/* Interactive Visual Map Representation */}
          <div className="lg:col-span-7 bg-slate-950 rounded-2xl border border-slate-800 p-6 relative min-h-[380px] flex flex-col justify-between overflow-hidden group">
            {/* Grid Pattern overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30"></div>

            <div className="relative z-10 flex justify-between items-center">
              <div className="flex items-center gap-2 bg-slate-900/90 border border-slate-800 px-3 py-1.5 rounded-xl text-xs font-bold text-slate-300">
                <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
                Interactive Regional Grid
              </div>
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Click pin to inspect</span>
            </div>

            {/* Interactive Pins on Map */}
            <div className="relative w-full h-64 my-4">
              {campuses.map((campus, idx) => (
                <button
                  key={campus.id}
                  onClick={() => setSelectedCampus(idx)}
                  style={{ top: campus.coordinates.y, left: campus.coordinates.x }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 transition-all duration-300 group/pin ${
                    selectedCampus === idx ? "scale-125 z-20" : "scale-100 opacity-70 hover:opacity-100 z-10"
                  }`}
                >
                  <div className={`relative flex items-center justify-center w-10 h-10 rounded-2xl border ${
                    selectedCampus === idx 
                      ? "bg-teal-500 text-white border-white shadow-lg shadow-teal-500/50" 
                      : "bg-slate-900 text-teal-400 border-teal-500/30 hover:border-teal-400"
                  }`}>
                    <span className="text-base font-bold">{idx + 1}</span>
                    {selectedCampus === idx && (
                      <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full border-2 border-slate-900 animate-ping"></span>
                    )}
                  </div>
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 bg-slate-900/90 text-white text-[10px] font-bold px-2 py-0.5 rounded border border-slate-800 whitespace-nowrap opacity-0 group-hover/pin:opacity-100 transition-opacity">
                    {campus.name}
                  </div>
                </button>
              ))}
            </div>

            <div className="relative z-10 flex items-center justify-between text-xs text-slate-400 pt-3 border-t border-slate-800/80">
              <span>📍 Showing 4 Primary Regional Centers</span>
              <span className="text-teal-400 font-bold">Live Data Sync Active</span>
            </div>
          </div>

          {/* Active Campus Information Card */}
          <div className="lg:col-span-5 space-y-6">
            {(() => {
              const current = campuses[selectedCampus];
              return (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 bg-teal-500/10 border border-teal-500/20 text-teal-300 rounded-full text-xs font-bold">
                      {current.type}
                    </span>
                    <span className="text-xs font-semibold text-slate-400">{current.status}</span>
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold text-white mb-1">{current.name}</h3>
                    <p className="text-xs text-slate-400 flex items-center gap-1.5 mt-2">
                      <span>📍</span> {current.address}
                    </p>
                  </div>

                  {/* ER Wait Banner */}
                  <div className="bg-gradient-to-r from-red-950/60 to-slate-900 border border-red-500/30 rounded-2xl p-4 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-red-400 uppercase tracking-wider block">Estimated ER Wait Time</span>
                      <span className="text-2xl font-extrabold text-white">{current.waitTime}</span>
                    </div>
                    <a
                      href={`tel:${current.phone}`}
                      className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl shadow-md transition-colors"
                    >
                      Call Center
                    </a>
                  </div>

                  {/* Key Features Pill Group */}
                  <div>
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">Campus Facilities</span>
                    <div className="flex flex-wrap gap-2">
                      {current.features.map((feat, i) => (
                        <span key={i} className="px-3 py-1 bg-slate-800 border border-slate-700/80 rounded-xl text-xs font-semibold text-slate-300">
                          ✓ {feat}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="pt-2 flex gap-3">
                    <button
                      onClick={() => navigate("/doctors")}
                      className="flex-1 py-3 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white font-bold text-xs rounded-xl shadow-lg transition-all text-center"
                    >
                      Find Doctor at this Location
                    </button>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      </section>

      {/* SPECIALTY & DEPARTMENT EXPLORER */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
          <div>
            <div className="text-xs font-bold text-teal-400 uppercase tracking-wider mb-1">Institutes of Clinical Excellence</div>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white">Specialized Medical Care</h2>
          </div>
          
          {/* Tab Filter */}
          <div className="flex flex-wrap gap-2 bg-slate-900 p-1.5 rounded-2xl border border-slate-800">
            {["all", "cardiology", "neurology", "oncology", "pediatrics", "emergency"].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold capitalize transition-all ${
                  activeTab === tab 
                    ? "bg-teal-500 text-white shadow-md" 
                    : "text-slate-400 hover:text-white hover:bg-slate-800"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSpecialties.map((item, idx) => (
            <div 
              key={idx}
              className="bg-slate-900/60 p-7 rounded-3xl border border-slate-800 hover:border-teal-500/50 transition-all duration-300 hover:-translate-y-1 group flex flex-col justify-between"
            >
              <div>
                <div className="w-14 h-14 bg-teal-500/10 border border-teal-500/20 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-teal-400 transition-colors">
                  {item.title}
                </h3>
                <p className="text-slate-400 text-xs leading-relaxed mb-6">
                  {item.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                <Link to="/departments" className="text-xs font-bold text-teal-400 hover:underline">
                  Department Details &rarr;
                </Link>
                <Link to="/doctors" className="text-xs font-semibold text-slate-400 hover:text-white">
                  Specialists
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED DOCTORS SPOTLIGHT */}
      <section className="py-20 px-6 bg-slate-900/40 border-y border-slate-800/80">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
            <div>
              <div className="text-xs font-bold text-teal-400 uppercase tracking-wider mb-1">Top Attending Physicians</div>
              <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white">Board-Certified Specialists</h2>
            </div>
            <button onClick={() => navigate("/doctors")} className="text-xs font-bold text-teal-400 hover:underline">
              View All 350+ Doctors &rarr;
            </button>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredDoctors.map((doc, idx) => (
              <div key={idx} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 flex flex-col justify-between hover:border-teal-500/40 transition-all">
                <div>
                  <div className="w-16 h-16 bg-teal-500/10 border border-teal-500/20 rounded-2xl flex items-center justify-center text-4xl mb-4">
                    {doc.image}
                  </div>
                  <div className="flex items-center gap-1 text-amber-400 text-xs font-bold mb-1">
                    <span>⭐ {doc.rating}</span>
                    <span className="text-slate-500">({doc.reviews} reviews)</span>
                  </div>
                  <h3 className="font-bold text-white text-base leading-tight mb-1">{doc.name}</h3>
                  <p className="text-teal-400 text-xs font-semibold mb-2">{doc.specialty}</p>
                  <p className="text-slate-400 text-[11px] font-medium">{doc.experience}</p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    doc.availableToday ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-slate-800 text-slate-400"
                  }`}>
                    {doc.availableToday ? "Available Today" : "Next Available Tomorrow"}
                  </span>
                  <button 
                    onClick={() => navigate("/portal")}
                    className="text-xs font-bold text-teal-400 hover:text-teal-300"
                  >
                    Book &rarr;
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PATIENT PORTAL CTA BANNER */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="bg-gradient-to-r from-teal-900 via-slate-900 to-cyan-950 rounded-3xl p-8 sm:p-14 border border-teal-500/30 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
          <div className="space-y-4 max-w-xl relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-teal-500/20 rounded-full text-xs font-bold text-teal-300">
              🔒 MyChart Encrypted Portal
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white">
              Manage Your Health Online 24/7
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              Create an account or sign in to your secure patient portal to view medical records, order prescription refills, pay bills, and message your care team.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 flex-shrink-0 w-full sm:w-auto relative z-10">
            <button
              onClick={() => navigate("/login")}
              className="px-8 py-4 bg-teal-500 hover:bg-teal-600 text-white rounded-2xl font-bold text-sm shadow-xl shadow-teal-500/30 transition-all text-center"
            >
              Sign In to Patient Portal
            </button>
            <button
              onClick={() => navigate("/signup")}
              className="px-8 py-4 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-2xl font-bold text-sm border border-slate-700 transition-all text-center"
            >
              Create Account
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-950 text-slate-400 py-16 px-6 border-t border-slate-800/80">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-10 mb-12 border-b border-slate-800/80 pb-12">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 bg-teal-500 text-white font-bold rounded-xl flex items-center justify-center font-display text-lg">N</div>
              <span className="text-white font-extrabold text-xl font-display">NovaCare</span>
            </div>
            <p className="text-xs leading-relaxed text-slate-400 mb-4">
              123 Healthway Blvd, Medical District<br />
              Emergency Helpline: <strong className="text-white">1-800-555-NOVA</strong>
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-4">Quick Links</h4>
            <ul className="space-y-2.5 text-xs">
              <li><Link to="/doctors" className="hover:text-white transition-colors">Find a Doctor</Link></li>
              <li><Link to="/departments" className="hover:text-white transition-colors">Medical Departments</Link></li>
              <li><Link to="/pharmacy" className="hover:text-white transition-colors">Pharmacy Refills</Link></li>
              <li><Link to="/patient-visitor-info" className="hover:text-white transition-colors">Visitor Rules & Mask Policy</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-4">Specialties</h4>
            <ul className="space-y-2.5 text-xs">
              <li><Link to="/departments" className="hover:text-white transition-colors">Cardiology & Heart</Link></li>
              <li><Link to="/departments" className="hover:text-white transition-colors">Oncology Institute</Link></li>
              <li><Link to="/departments" className="hover:text-white transition-colors">Neurology & Spine</Link></li>
              <li><Link to="/departments" className="hover:text-white transition-colors">Pediatric ER</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-4">Portal Gateway</h4>
            <ul className="space-y-2.5 text-xs">
              <li><Link to="/login" className="hover:text-white transition-colors">Patient Login</Link></li>
              <li><Link to="/signup" className="hover:text-white transition-colors">New Patient Signup</Link></li>
              <li><Link to="/choose-role" className="hover:text-white transition-colors">Staff Access</Link></li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto text-xs flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500">
          <p>&copy; {new Date().getFullYear()} NovaCare Hospital System. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/patient-visitor-info" className="hover:text-slate-300">Privacy Notice</Link>
            <Link to="/patient-visitor-info" className="hover:text-slate-300">Patient Rights</Link>
            <Link to="/patient-visitor-info" className="hover:text-slate-300">Emergency Protocol</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}