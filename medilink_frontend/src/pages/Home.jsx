import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Home() {
  const navigate = useNavigate();
  const [selectedCampus, setSelectedCampus] = useState(0);
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFaq, setActiveFaq] = useState(null);

  const campuses = [
    {
      id: "main",
      name: "NovaCare Main Medical Campus & ER",
      type: "Level 1 Trauma Center & Main Hospital",
      waitTime: "12 min",
      status: "Open 24/7",
      address: "First Ave & 16th St, New York, NY 10003",
      phone: "1-800-555-NOVA",
      mapEmbedUrl: "https://maps.google.com/maps?q=Bellevue%20Hospital%20Center%20New%20York&t=&z=15&ie=UTF8&iwloc=&output=embed",
      features: ["24/7 Level 1 Emergency", "Heliport Access", "Surgical Suites", "ICU Beds"]
    },
    {
      id: "children",
      name: "NovaCare Children's Hospital",
      type: "Pediatric Emergency Pavilion",
      waitTime: "8 min",
      status: "Open 24/7",
      address: "550 1st Ave, New York, NY 10016",
      phone: "1-800-555-KIDS",
      mapEmbedUrl: "https://maps.google.com/maps?q=Hassenfeld%20Children's%20Hospital%20New%20York&t=&z=15&ie=UTF8&iwloc=&output=embed",
      features: ["Level 4 NICU", "Pediatric ER", "Child Life Specialists", "Parent Suites"]
    },
    {
      id: "heart",
      name: "Heart & Vascular Specialty Institute",
      type: "Cardiac Center of Excellence",
      waitTime: "By Appointment",
      status: "8:00 AM - 6:00 PM",
      address: "525 E 68th St, New York, NY 10065",
      phone: "1-800-555-HEART",
      mapEmbedUrl: "https://maps.google.com/maps?q=NewYork-Presbyterian%20Hospital%20Weill%20Cornell&t=&z=15&ie=UTF8&iwloc=&output=embed",
      features: ["Catheterization Lab", "Cardiac Rehab", "3D Echocardiography", "Heart Transplants"]
    },
    {
      id: "outpatient",
      name: "Westside Surgery & Diagnostic Center",
      type: "Outpatient Surgical Facility",
      waitTime: "By Appointment",
      status: "7:00 AM - 7:00 PM",
      address: "1000 10th Ave, New York, NY 10019",
      phone: "1-800-555-SURG",
      mapEmbedUrl: "https://maps.google.com/maps?q=Mount%20Sinai%20West%20New%20York&t=&z=15&ie=UTF8&iwloc=&output=embed",
      features: ["Same-Day Surgery", "3T MRI & CT Diagnostics", "Physical Therapy", "Outpatient Rehab"]
    }
  ];

  const featuredDoctors = [
    {
      name: "Dr. Sarah Jenkins, MD",
      role: "Chief of Cardiology",
      specialty: "Heart Failure & Interventions",
      experience: "18+ Yrs Exp",
      rating: "4.9",
      reviews: "240",
      avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400",
      availableToday: true
    },
    {
      name: "Dr. Marcus Vance, MD",
      role: "Director of Neurosurgery",
      specialty: "Brain & Spinal Reconstruction",
      experience: "22+ Yrs Exp",
      rating: "5.0",
      reviews: "310",
      avatar: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400",
      availableToday: true
    },
    {
      name: "Dr. Elena Rostova, MD",
      role: "Lead Oncologist",
      specialty: "Precision Cancer Immunotherapy",
      experience: "15+ Yrs Exp",
      rating: "4.9",
      reviews: "189",
      avatar: "https://images.unsplash.com/photo-1594824813566-88855ce78905?auto=format&fit=crop&q=80&w=400",
      availableToday: false
    },
    {
      name: "Dr. James Sterling, MD",
      role: "Head of Orthopedics",
      specialty: "Robotic Joint Replacement",
      experience: "20+ Yrs Exp",
      rating: "5.0",
      reviews: "412",
      avatar: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=400",
      availableToday: true
    }
  ];

  const specialties = [
    { category: "cardiology", icon: "🫀", title: "Cardiology & Heart Institute", desc: "Leading cardiovascular surgeries, non-invasive imaging, catheterization, and 24/7 cardiac emergency care.", tag: "Top 10 in Nation" },
    { category: "neurology", icon: "🧠", title: "Neurology & Brain Health", desc: "Comprehensive treatment for stroke, epilepsy, neurodegenerative diseases, and spinal reconstruction.", tag: "Comprehensive Stroke Center" },
    { category: "oncology", icon: "🎗️", title: "Oncology & Cancer Center", desc: "Immunotherapy, precision radiation therapy, and personalized cancer survival programs.", tag: "NCI Designated Center" },
    { category: "pediatrics", icon: "👶", title: "Pediatrics & Children's ER", desc: "Child-centered compassionate medical care with Level 4 Neonatal Intensive Care (NICU).", tag: "Level 4 NICU" },
    { category: "orthopedics", icon: "🦴", title: "Orthopedics & Joint Surgery", desc: "Robotic-assisted joint replacement, sports injury rehabilitation, and complex bone reconstruction.", tag: "Robotic Surgical Tech" },
    { category: "emergency", icon: "🚨", title: "Level 1 Trauma & Emergency", desc: "Immediate 24/7 critical care, trauma surgical bays, and rapid helicopter transport.", tag: "24/7 Level 1 Trauma" }
  ];

  const filteredSpecialties = specialties.filter(item => activeTab === "all" || item.category === activeTab);

  const testimonials = [
    {
      quote: "NovaCare's cardiology team saved my life. The digital patient portal made booking appointments and accessing my lab results completely stress-free.",
      author: "Robert Chen",
      type: "Cardiology Patient",
      rating: "5.0"
    },
    {
      quote: "The pediatric ER at NovaCare Children's Pavilion was incredible when my son broke his arm. The staff had him comfortable and treated within minutes.",
      author: "Amanda Miller",
      type: "Parent & Patient",
      rating: "5.0"
    },
    {
      quote: "Navigating prescription refills used to take hours. With NovaCare's integrated pharmacy portal, my medication is delivered straight to my doorstep.",
      author: "David Miller",
      type: "Pharmacy Member",
      rating: "5.0"
    }
  ];

  const faqs = [
    {
      q: "How do I schedule an appointment with a specialist?",
      a: "You can book directly online through our Patient Portal, search for doctors by specialty on our 'Find a Doctor' page, or call our 24/7 scheduling desk at 1-800-555-NOVA."
    },
    {
      q: "What should I bring for Emergency Room visits?",
      a: "Please bring a photo ID, your health insurance card, a list of current medications, and any emergency contact details. Emergency care is provided regardless of insurance status."
    },
    {
      q: "How does the NovaCare Patient Portal work?",
      a: "Our portal allows you to view lab results, message your care team, pay medical bills online, and request prescription refills securely from any desktop or mobile device."
    }
  ];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/doctors?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-100 selection:bg-teal-500 selection:text-white">
      <Navbar />

      {/* Emergency Alert Bar */}
      <div className="bg-gradient-to-r from-red-600 via-rose-600 to-red-700 text-white py-2.5 px-6 shadow-xl relative z-30 border-b border-red-500/30">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs font-semibold">
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
            </span>
            <span>
              <strong>Main Campus ER Live Wait Time:</strong> <span className="bg-white/20 px-2 py-0.5 rounded text-white font-bold">12 mins</span> • Trauma Surgical Bays Open 24/7
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a href="tel:911" className="bg-white/15 hover:bg-white/25 px-3.5 py-1 rounded-full font-bold transition-all border border-white/30 hover:scale-105">
              🚨 Life-Threatening: Call 911
            </a>
            <a href="#map-locator" className="hover:underline text-red-100 font-bold hidden md:inline">
              View Real Interactive Map ↓
            </a>
          </div>
        </div>
      </div>

      {/* Hero Section with Cinematic Background & Glass Cards */}
      <section className="relative pt-12 pb-24 lg:pt-20 lg:pb-36 overflow-hidden">
        {/* Background Image with Dark Gradient Mask */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-25 filter blur-sm scale-105 transform pointer-events-none"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=2000')` }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-950/90 to-slate-950 pointer-events-none"></div>

        {/* Ambient Neon Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-gradient-to-tr from-teal-500/20 via-cyan-500/15 to-indigo-500/20 rounded-full blur-[140px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 bg-teal-500/10 border border-teal-500/30 rounded-full text-xs font-bold text-teal-300 shadow-xl shadow-teal-500/10">
              <span className="w-2 h-2 bg-teal-400 rounded-full animate-pulse"></span>
              <span>Nationally Ranked Hospital System & Research Institute</span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-extrabold tracking-tight text-white leading-[1.1]">
              Next-Gen Healthcare. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-emerald-300 to-cyan-300">
                Human Compassion.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
              NovaCare is a top-ranked health system providing world-class medical specialists, 24/7 Level 1 emergency care, and a digital patient portal to manage your health journey.
            </p>

            {/* Interactive Doctor & Department Search Bar */}
            <form onSubmit={handleSearchSubmit} className="max-w-xl mx-auto pt-4">
              <div className="relative flex items-center bg-slate-900/90 backdrop-blur-2xl border border-slate-700/80 rounded-2xl p-2.5 shadow-2xl focus-within:border-teal-500 focus-within:ring-4 focus-within:ring-teal-500/15 transition-all">
                <span className="pl-3 text-xl">🔍</span>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search doctors, medical specialties, or conditions..."
                  className="w-full bg-transparent px-3 py-2 text-sm text-white placeholder-slate-400 focus:outline-none font-medium"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white font-bold text-xs rounded-xl shadow-lg transition-all flex-shrink-0"
                >
                  Search Directory
                </button>
              </div>
            </form>

            <div className="flex flex-wrap items-center justify-center gap-6 pt-4 text-xs font-semibold text-slate-400">
              <span className="flex items-center gap-1.5"><span className="text-emerald-400">🟢</span> 42 Attending Specialists On Duty</span>
              <span>•</span>
              <span className="flex items-center gap-1.5"><span className="text-teal-400">⭐</span> 99.2% Patient Satisfaction</span>
              <span>•</span>
              <span className="flex items-center gap-1.5"><span className="text-cyan-400">🏆</span> Top 10 National Hospital</span>
            </div>
          </div>
        </div>
      </section>

      {/* REAL INTERACTIVE GOOGLE MAPS LOCATOR */}
      <section id="map-locator" className="py-16 px-6 max-w-7xl mx-auto scroll-mt-20">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-red-500/10 border border-red-500/20 rounded-full text-xs font-bold text-red-400 mb-3">
            <span>📍 Real-Time GPS & Map Network</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white">Emergency & Hospital Location Finder</h2>
          <p className="text-slate-400 text-sm mt-2">Select a regional medical campus below to load real interactive satellite maps and live wait times.</p>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-2xl">
          {/* Campus Selector Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
            {campuses.map((campus, idx) => (
              <button
                key={campus.id}
                onClick={() => setSelectedCampus(idx)}
                className={`p-4 rounded-2xl text-left border transition-all duration-300 flex flex-col justify-between ${
                  selectedCampus === idx
                    ? "bg-gradient-to-r from-teal-500/20 to-teal-600/10 border-teal-500 text-white shadow-lg shadow-teal-500/10"
                    : "bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-white"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${selectedCampus === idx ? "bg-teal-500 text-white" : "bg-slate-800 text-slate-400"}`}>
                      Location #{idx + 1}
                    </span>
                    <span className="text-xs font-extrabold text-emerald-400">{campus.waitTime}</span>
                  </div>
                  <h4 className="font-bold text-xs leading-snug line-clamp-2">{campus.name}</h4>
                </div>
              </button>
            ))}
          </div>

          {/* Map Display & Live Details Grid */}
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            {/* Real Embedded Google Map Iframe */}
            <div className="lg:col-span-7 bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden shadow-inner h-[380px] relative group">
              <iframe
                title={campuses[selectedCampus].name}
                src={campuses[selectedCampus].mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) contrast(120%)" }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              ></iframe>
              <div className="absolute top-4 left-4 bg-slate-900/90 backdrop-blur-md px-3.5 py-2 rounded-xl border border-slate-800 text-xs font-bold text-white shadow-lg flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-emerald-400 rounded-full animate-pulse"></span>
                Live GPS Map Active
              </div>
            </div>

            {/* Selected Campus Info Side Card */}
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
                      <h3 className="text-2xl font-bold text-white mb-2">{current.name}</h3>
                      <p className="text-xs text-slate-300 flex items-center gap-2 font-medium">
                        <span className="text-teal-400 text-base">📍</span> {current.address}
                      </p>
                    </div>

                    {/* ER Wait Time Card */}
                    <div className="bg-gradient-to-r from-red-950/70 to-slate-950 border border-red-500/30 rounded-2xl p-4 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] font-bold text-red-400 uppercase tracking-wider block">Estimated Live ER Wait</span>
                        <span className="text-2xl font-extrabold text-white">{current.waitTime}</span>
                      </div>
                      <a
                        href={`tel:${current.phone}`}
                        className="px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl shadow-md transition-colors"
                      >
                        Call Campus
                      </a>
                    </div>

                    {/* Facility Tags */}
                    <div>
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">Clinical Features</span>
                      <div className="flex flex-wrap gap-2">
                        {current.features.map((feat, i) => (
                          <span key={i} className="px-3 py-1 bg-slate-800 border border-slate-700/80 rounded-xl text-xs font-semibold text-slate-200">
                            ✓ {feat}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="pt-2 flex gap-3">
                      <button
                        onClick={() => navigate("/doctors")}
                        className="flex-1 py-3.5 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white font-bold text-xs rounded-xl shadow-lg transition-all text-center"
                      >
                        Book Specialist at this Campus
                      </button>
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        </div>
      </section>

      {/* SPECIALTY & DEPARTMENT EXPLORER */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
          <div>
            <div className="text-xs font-bold text-teal-400 uppercase tracking-wider mb-1">Specialized Institutes</div>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white">Clinical Departments & Care</h2>
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
              className="bg-slate-900/70 p-8 rounded-3xl border border-slate-800 hover:border-teal-500/50 transition-all duration-300 hover:-translate-y-1 group flex flex-col justify-between shadow-xl"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 bg-teal-500/10 border border-teal-500/20 rounded-2xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <span className="text-[10px] font-bold text-teal-300 bg-teal-500/10 px-2.5 py-1 rounded-full border border-teal-500/20">
                    {item.tag}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-teal-400 transition-colors">
                  {item.title}
                </h3>
                <p className="text-slate-400 text-xs leading-relaxed mb-6">
                  {item.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                <Link to="/departments" className="text-xs font-bold text-teal-400 hover:underline">
                  Department Details &rarr;
                </Link>
                <Link to="/doctors" className="text-xs font-semibold text-slate-400 hover:text-white">
                  Find Doctor
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED ATTENDING DOCTORS (REAL AVATARS) */}
      <section className="py-20 px-6 bg-slate-900/40 border-y border-slate-800/80">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
            <div>
              <div className="text-xs font-bold text-teal-400 uppercase tracking-wider mb-1">Attending Physicians</div>
              <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white">Board-Certified Specialists</h2>
            </div>
            <button onClick={() => navigate("/doctors")} className="text-xs font-bold text-teal-400 hover:underline">
              View All 350+ Doctors Directory &rarr;
            </button>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredDoctors.map((doc, idx) => (
              <div key={idx} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 flex flex-col justify-between hover:border-teal-500/40 transition-all duration-300 group shadow-xl">
                <div>
                  <div className="relative w-full h-48 rounded-2xl overflow-hidden mb-4 border border-slate-800">
                    <img
                      src={doc.avatar}
                      alt={doc.name}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=400";
                      }}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute bottom-2 left-2 bg-slate-900/90 backdrop-blur-md px-2.5 py-1 rounded-lg text-amber-400 text-[11px] font-bold border border-slate-800 flex items-center gap-1 shadow-md">
                      <span>⭐ {doc.rating}</span>
                      <span className="text-slate-400">({doc.reviews})</span>
                    </div>
                  </div>

                  <h3 className="font-bold text-white text-base leading-tight mb-1">{doc.name}</h3>
                  <p className="text-teal-400 text-xs font-semibold">{doc.role}</p>
                  <p className="text-slate-400 text-xs mt-1">{doc.specialty}</p>
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

      {/* PATIENT TESTIMONIALS & TRUST */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="text-xs font-bold text-teal-400 uppercase tracking-wider mb-1">Verified Care Stories</div>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white">What Our Patients Say</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((item, idx) => (
            <div key={idx} className="bg-slate-900/80 p-8 rounded-3xl border border-slate-800 flex flex-col justify-between shadow-xl">
              <div>
                <div className="text-amber-400 text-sm mb-4">⭐⭐⭐⭐⭐</div>
                <p className="text-slate-300 text-xs leading-relaxed italic mb-6">"{item.quote}"</p>
              </div>
              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-white text-sm">{item.author}</h4>
                  <p className="text-teal-400 text-[11px] font-semibold">{item.type}</p>
                </div>
                <span className="text-xs font-bold text-emerald-400">Verified Patient ✓</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FREQUENTLY ASKED QUESTIONS */}
      <section className="py-20 px-6 max-w-4xl mx-auto border-t border-slate-800">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-display font-extrabold text-white">Frequently Asked Questions</h2>
          <p className="text-slate-400 text-xs mt-2">Common questions about hospital visits, emergency wait times, and portal access.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div 
              key={idx}
              className="bg-slate-900/90 border border-slate-800 rounded-2xl overflow-hidden transition-all"
            >
              <button
                onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                className="w-full p-5 text-left font-bold text-sm text-white flex justify-between items-center hover:text-teal-400 transition-colors"
              >
                <span>{faq.q}</span>
                <span className="text-teal-400 text-base">{activeFaq === idx ? "−" : "+"}</span>
              </button>
              {activeFaq === idx && (
                <div className="px-5 pb-5 text-xs text-slate-300 leading-relaxed border-t border-slate-800/60 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* PATIENT PORTAL CTA BANNER */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="bg-gradient-to-r from-teal-900 via-slate-900 to-cyan-950 rounded-3xl p-8 sm:p-14 border border-teal-500/30 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
          <div className="space-y-4 max-w-xl relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-teal-500/20 rounded-full text-xs font-bold text-teal-300">
              🔒 Encrypted Patient Portal
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