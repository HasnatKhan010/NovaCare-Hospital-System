import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Departments() {
  const departments = [
    { 
      icon: "🫀",
      name: "Cardiology & Vascular", 
      desc: "Advanced heart care, cardiovascular surgery, and non-invasive diagnostic imaging by top heart specialists.",
      badge: "Level 1 Heart Center",
      count: "18 Specialists"
    },
    { 
      icon: "🧠",
      name: "Neurology & Spine", 
      desc: "Comprehensive diagnosis and advanced treatment for neurological conditions, stroke care, and spinal disorders.",
      badge: "Comprehensive Stroke Center",
      count: "14 Specialists"
    },
    { 
      icon: "🎗️",
      name: "Oncology Institute", 
      desc: "Leading cancer treatment center featuring immunotherapy, precision radiation, and personalized medical care plans.",
      badge: "National Cancer Institute Accredited",
      count: "22 Specialists"
    },
    { 
      icon: "🦴",
      name: "Orthopedics & Sports Medicine", 
      desc: "Specialized care for joint replacements, complex fractures, athletic injuries, and spinal reconstruction.",
      badge: "Joint Commission Certified",
      count: "16 Specialists"
    },
    { 
      icon: "👶",
      name: "Pediatrics & Neonatal", 
      desc: "Compassionate, child-centric medical care from routine checkups to Level 4 Neonatal Intensive Care (NICU).",
      badge: "Top Rated Children's Care",
      count: "20 Specialists"
    },
    { 
      icon: "🚨",
      name: "Emergency Medicine & Trauma", 
      desc: "24/7 Level 1 Emergency Trauma Center equipped with rapid response surgical teams and heliport access.",
      badge: "24/7 Rapid Response",
      count: "30+ ER Physicians"
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 selection:bg-teal-500 selection:text-white">
      <Navbar />

      {/* Hero Banner */}
      <div className="bg-slate-900 text-white py-16 lg:py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-teal-500/10 border border-teal-500/20 rounded-full text-xs font-semibold text-teal-400 mb-6">
            <span>✨ World-Class Clinical Care</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-extrabold tracking-tight mb-4 text-white">
            Medical Departments & Specialized Centers
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl font-normal leading-relaxed">
            NovaCare provides world-class healthcare across specialized medical institutes, offering state-of-the-art technology and board-certified physicians.
          </p>
        </div>
      </div>

      {/* Grid Section */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {departments.map((dept, idx) => (
            <div 
              key={idx} 
              className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200/80 hover:shadow-xl hover:border-teal-500/30 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 bg-teal-50 text-teal-600 rounded-2xl flex items-center justify-center text-3xl shadow-inner group-hover:scale-110 transition-transform duration-300">
                    {dept.icon}
                  </div>
                  <span className="text-[11px] font-bold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-full border border-teal-100/50">
                    {dept.count}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-teal-700 transition-colors">
                  {dept.name}
                </h3>
                
                <div className="text-[11px] font-semibold text-slate-400 mb-4 tracking-wide">
                  {dept.badge}
                </div>

                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                  {dept.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <Link 
                  to="/doctors" 
                  className="text-xs font-bold text-teal-600 hover:text-teal-800 transition-colors flex items-center gap-1.5"
                >
                  View Specialists <span aria-hidden="true">&rarr;</span>
                </Link>
                <Link 
                  to="/portal" 
                  className="text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors"
                >
                  Book Appointment
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
