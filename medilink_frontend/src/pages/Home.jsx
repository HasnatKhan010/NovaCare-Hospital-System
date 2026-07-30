import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import img1 from "../assets/Home/img3.jpg";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 selection:bg-brand-200">
      <Navbar />

      {/* Emergency Alert Bar */}
      <div className="bg-red-700 text-white py-2 px-6 text-center text-sm font-medium flex items-center justify-center gap-2">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
        <span>Current ER Wait Time: <strong>14 minutes</strong> at Main Campus. Call 911 for medical emergencies.</span>
      </div>

      {/* Institutional Hero Section */}
      <section className="relative bg-brand-900 overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-cover bg-center" style={{ backgroundImage: `url(${img1})`, backgroundBlendMode: 'overlay' }}></div>
        <div className="absolute inset-0 bg-gradient-to-r from-brand-900 via-brand-900/90 to-transparent"></div>
        
        <div className="max-w-7xl mx-auto px-6 py-20 lg:py-32 relative z-10 flex flex-col md:flex-row gap-12 items-center">
          <div className="md:w-3/5 space-y-6 text-white">
            <h1 className="text-4xl md:text-6xl font-display font-bold leading-tight tracking-tight">
              World-Class Care, <br />
              Close to Home.
            </h1>
            <p className="text-lg md:text-xl text-brand-100 max-w-xl font-light">
              NovaCare Medical Center is a nationally ranked hospital system providing exceptional patient care, advanced research, and innovative treatments.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <button
                onClick={() => navigate('/doctors')}
                className="px-8 py-3.5 bg-white text-brand-900 rounded-lg font-bold hover:bg-slate-100 transition-colors shadow-lg"
              >
                Find a Doctor
              </button>
              <button
                onClick={() => navigate('/departments')}
                className="px-8 py-3.5 bg-brand-700 text-white rounded-lg font-bold border border-brand-600 hover:bg-brand-800 transition-colors shadow-lg"
              >
                Medical Services
              </button>
            </div>
          </div>

          {/* Quick Portal Access Card */}
          <div className="md:w-2/5 w-full">
            <div className="bg-white p-8 rounded-xl shadow-2xl border-t-4 border-brand-600">
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Patient Portal</h2>
              <p className="text-slate-600 mb-6 text-sm">Access your health records, message your care team, and manage appointments securely.</p>
              
              <div className="space-y-4">
                <button
                  onClick={() => navigate('/login')}
                  className="w-full py-3 bg-brand-700 text-white rounded-lg font-bold hover:bg-brand-800 transition-colors"
                >
                  Log In to Portal
                </button>
                <div className="text-center">
                  <span className="text-sm text-slate-500">New patient? </span>
                  <button onClick={() => navigate('/signup')} className="text-sm text-brand-700 font-semibold hover:underline">
                    Create an account
                  </button>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-100">
                <h3 className="font-semibold text-slate-900 mb-3">Quick Links</h3>
                <ul className="space-y-2 text-sm text-brand-700 font-medium">
                  <li><a href="/pharmacy" className="hover:underline flex items-center gap-2"><span>&rarr;</span> Order Prescription Refill</a></li>
                  <li><a href="/patient-visitor-info" className="hover:underline flex items-center gap-2"><span>&rarr;</span> Visitor Guidelines</a></li>
                  <li><a href="#" className="hover:underline flex items-center gap-2"><span>&rarr;</span> Pay Your Bill</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Services */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="mb-12 border-b border-slate-200 pb-4 flex justify-between items-end">
          <h2 className="text-3xl font-display font-bold text-slate-900">Featured Specialties</h2>
          <button onClick={() => navigate('/departments')} className="text-brand-700 font-semibold hover:underline hidden sm:block">View all departments</button>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { name: "Cancer Center", desc: "Nationally recognized oncology care and clinical trials." },
            { name: "Heart & Vascular", desc: "Advanced cardiology diagnostics and surgical interventions." },
            { name: "Neurological Institute", desc: "Comprehensive care for brain and spine conditions." }
          ].map((specialty, idx) => (
            <div key={idx} className="group cursor-pointer">
              <div className="h-48 bg-slate-200 rounded-t-xl overflow-hidden">
                <div className="w-full h-full bg-brand-800/10 group-hover:bg-brand-800/20 transition-colors"></div>
              </div>
              <div className="bg-white p-6 border border-t-0 border-slate-200 rounded-b-xl group-hover:border-brand-300 transition-colors">
                <h3 className="text-xl font-bold text-brand-900 mb-2">{specialty.name}</h3>
                <p className="text-slate-600 text-sm">{specialty.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8 mb-8 border-b border-slate-800 pb-8">
          <div>
            <h4 className="text-white font-bold mb-4">NovaCare Medical Center</h4>
            <p className="text-sm leading-relaxed">123 Healthway Drive<br/>Medical District<br/>City, ST 12345<br/>1-800-NOVA-CARE</p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Patients & Visitors</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white">Patient Portal</a></li>
              <li><a href="#" className="hover:text-white">Billing & Insurance</a></li>
              <li><a href="#" className="hover:text-white">Medical Records</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Departments</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white">Cardiology</a></li>
              <li><a href="#" className="hover:text-white">Oncology</a></li>
              <li><a href="#" className="hover:text-white">Neurology</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">About Us</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white">Careers</a></li>
              <li><a href="#" className="hover:text-white">Research & Trials</a></li>
              <li><a href="#" className="hover:text-white">Newsroom</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto text-sm text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-4">
          <p>&copy; {new Date().getFullYear()} NovaCare Medical Center. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Use</a>
          </div>
        </div>
      </footer>
    </div>
  );
}