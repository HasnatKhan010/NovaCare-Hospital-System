import React from "react";
import Navbar from "../components/Navbar";

export default function Departments() {
  const departments = [
    { name: "Cardiology", desc: "Advanced heart and vascular care using state-of-the-art diagnostics." },
    { name: "Neurology", desc: "Comprehensive treatment for neurological and brain disorders." },
    { name: "Oncology", desc: "Leading cancer treatment center with personalized care plans." },
    { name: "Orthopedics", desc: "Specialized care for bones, joints, ligaments, and muscles." },
    { name: "Pediatrics", desc: "Compassionate, expert medical care for infants, children, and adolescents." },
    { name: "Emergency Medicine", desc: "24/7 critical care and trauma center." },
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 selection:bg-brand-200">
      <Navbar />

      <div className="bg-brand-900 text-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-display font-bold tracking-tight mb-4">Medical Departments & Services</h1>
          <p className="text-lg text-brand-100 max-w-2xl font-light">
            NovaCare provides world-class care across a multitude of specialized medical departments.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {departments.map((dept, idx) => (
            <div key={idx} className="bg-white p-8 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
              <h3 className="text-2xl font-bold text-slate-900 mb-3">{dept.name}</h3>
              <p className="text-slate-600 leading-relaxed mb-6">{dept.desc}</p>
              <button className="text-brand-700 font-semibold hover:text-brand-800 transition-colors flex items-center gap-2">
                View Specialists <span aria-hidden="true">&rarr;</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
