import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate, Link } from "react-router-dom";

export default function About() {
    const navigate = useNavigate();
    const [insuranceQuery, setInsuranceQuery] = useState("");
    const [insuranceResult, setInsuranceResult] = useState(null);

    const acceptedInsurances = [
        "BlueCross BlueShield",
        "Aetna",
        "Cigna",
        "Medicare & Medicaid",
        "UnitedHealthcare",
        "Humana",
        "Kaiser Permanente",
        "Oxford Health",
        "HIP / EmblemHealth"
    ];

    const handleInsuranceCheck = (e) => {
        e.preventDefault();
        if (!insuranceQuery.trim()) return;
        
        const match = acceptedInsurances.some(item => 
            item.toLowerCase().includes(insuranceQuery.toLowerCase())
        );
        
        setInsuranceResult(match);
    };

    return (
        <div className="min-h-screen bg-slate-950 font-sans text-slate-100 selection:bg-teal-500 selection:text-white">
            <Navbar />

            {/* Header Banner */}
            <div className="bg-slate-900 text-white py-16 lg:py-24 relative overflow-hidden border-b border-slate-800">
                <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>
                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-teal-500/10 border border-teal-500/20 rounded-full text-xs font-bold text-teal-400 mb-4">
                        <span>📋 Patient & Visitor Care Center</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-display font-extrabold tracking-tight mb-4 text-white">
                        Visitor Guidelines & Hospital Access
                    </h1>
                    <p className="text-base sm:text-lg text-slate-300 max-w-2xl font-normal leading-relaxed">
                        Essential information for patients and visitors coming to NovaCare Medical Center, including visiting hours, parking access, and insurance verification.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-16 grid lg:grid-cols-12 gap-12">
                
                {/* Main Content Area */}
                <div className="lg:col-span-8 space-y-12">
                    
                    {/* Visiting Hours Card */}
                    <section className="bg-slate-900/80 p-8 rounded-3xl border border-slate-800 shadow-2xl">
                        <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
                            <div>
                                <h2 className="text-2xl font-display font-bold text-white">Visiting Hours & Ward Access</h2>
                                <p className="text-xs text-slate-400 mt-1">General visiting hours are strictly enforced for patient recovery.</p>
                            </div>
                            <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 rounded-full text-xs font-bold border border-emerald-500/20">
                                🟢 Currently Open
                            </span>
                        </div>

                        <div className="space-y-4 text-xs">
                            <div className="flex justify-between items-center p-4 bg-slate-950/60 rounded-2xl border border-slate-800">
                                <div>
                                    <h4 className="font-bold text-white text-sm">General Medical & Surgical Wards</h4>
                                    <p className="text-slate-400">Main Hospital Towers (Floors 3-8)</p>
                                </div>
                                <div className="text-right font-bold text-teal-400 text-sm">
                                    8:00 AM – 8:00 PM
                                </div>
                            </div>

                            <div className="flex justify-between items-center p-4 bg-slate-950/60 rounded-2xl border border-slate-800">
                                <div>
                                    <h4 className="font-bold text-white text-sm">Intensive Care Units (ICU & CCU)</h4>
                                    <p className="text-slate-400">Immediate family only (Max 2 visitors)</p>
                                </div>
                                <div className="text-right font-bold text-teal-400 text-sm">
                                    10:00 AM – 6:00 PM
                                </div>
                            </div>

                            <div className="flex justify-between items-center p-4 bg-slate-950/60 rounded-2xl border border-slate-800">
                                <div>
                                    <h4 className="font-bold text-white text-sm">Emergency Department & Trauma Pavilion</h4>
                                    <p className="text-slate-400">1 visitor companion per patient</p>
                                </div>
                                <div className="text-right font-bold text-emerald-400 text-sm">
                                    Open 24 Hours / 7 Days
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Visitor Safety Guidelines */}
                    <section className="bg-slate-900/80 p-8 rounded-3xl border border-slate-800 shadow-2xl">
                        <h2 className="text-2xl font-display font-bold text-white mb-6 pb-4 border-b border-slate-800">
                            Visitor Health & Safety Policies
                        </h2>
                        
                        <div className="grid sm:grid-cols-2 gap-4 text-xs">
                            <div className="p-4 bg-slate-950/60 rounded-2xl border border-slate-800 space-y-1">
                                <span className="text-lg">😷</span>
                                <h4 className="font-bold text-white">Mask & Hygiene Policy</h4>
                                <p className="text-slate-400">Masks are required in all ICUs, Emergency Departments, and bone marrow transplant units.</p>
                            </div>

                            <div className="p-4 bg-slate-950/60 rounded-2xl border border-slate-800 space-y-1">
                                <span className="text-lg">🤒</span>
                                <h4 className="font-bold text-white">Symptom Screening</h4>
                                <p className="text-slate-400">Visitors with fever, cough, or flu symptoms are asked to reschedule their visits.</p>
                            </div>

                            <div className="p-4 bg-slate-950/60 rounded-2xl border border-slate-800 space-y-1">
                                <span className="text-lg">🅿️</span>
                                <h4 className="font-bold text-white">Garage & Valet Parking</h4>
                                <p className="text-slate-400">24/7 covered garage parking available at Main Campus Entrance B with handicap access.</p>
                            </div>

                            <div className="p-4 bg-slate-950/60 rounded-2xl border border-slate-800 space-y-1">
                                <span className="text-lg">☕</span>
                                <h4 className="font-bold text-white">Dining & Cafeteria</h4>
                                <p className="text-slate-400">Courtyard Café open daily from 6:30 AM to 9:00 PM on the 1st Floor.</p>
                            </div>
                        </div>
                    </section>

                    {/* Interactive Insurance Provider Checker */}
                    <section className="bg-slate-900/80 p-8 rounded-3xl border border-slate-800 shadow-2xl">
                        <div className="flex items-center gap-3 mb-4">
                            <span className="text-2xl">💳</span>
                            <div>
                                <h2 className="text-2xl font-display font-bold text-white">Insurance Coverage Checker</h2>
                                <p className="text-xs text-slate-400">Check if your insurance carrier is accepted at NovaCare Health System.</p>
                            </div>
                        </div>

                        <form onSubmit={handleInsuranceCheck} className="flex gap-3 max-w-md pt-2">
                            <input
                                type="text"
                                value={insuranceQuery}
                                onChange={(e) => {
                                    setInsuranceQuery(e.target.value);
                                    setInsuranceResult(null);
                                }}
                                placeholder="Enter carrier (e.g. Aetna, BlueCross, Cigna)..."
                                className="flex-1 px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-500"
                            />
                            <button type="submit" className="px-5 py-2.5 bg-teal-500 hover:bg-teal-600 text-white font-bold text-xs rounded-xl transition-all">
                                Verify
                            </button>
                        </form>

                        {insuranceResult !== null && (
                            <div className={`mt-4 p-4 rounded-xl text-xs font-bold border ${
                                insuranceResult 
                                    ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" 
                                    : "bg-amber-500/10 text-amber-400 border-amber-500/20"
                            }`}>
                                {insuranceResult 
                                    ? `✓ Yes! NovaCare accepts ${insuranceQuery} across all inpatient and outpatient centers.`
                                    : `⚠️ ${insuranceQuery} may require prior authorization. Please call our billing department at 1-800-555-NOVA for verification.`}
                            </div>
                        )}
                    </section>

                </div>

                {/* Sidebar */}
                <div className="lg:col-span-4 space-y-8">
                    <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800 shadow-2xl">
                        <h3 className="text-xl font-bold text-white mb-4">Emergency & Operators</h3>
                        <div className="space-y-4 text-xs text-slate-300">
                            <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800">
                                <strong className="block text-white mb-0.5">Main Hospital Switchboard</strong>
                                <span className="text-teal-400 font-bold">1-800-555-NOVA (6682)</span>
                            </div>
                            <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800">
                                <strong className="block text-white mb-0.5">24/7 Level 1 Emergency Desk</strong>
                                <span className="text-red-400 font-bold">(555) 123-4567</span>
                            </div>
                            <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800">
                                <strong className="block text-white mb-0.5">Patient Records & Billing</strong>
                                <span className="text-teal-400 font-bold">(555) 987-6543</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800 shadow-2xl text-center space-y-4">
                        <div className="w-12 h-12 bg-teal-500/10 text-teal-400 rounded-2xl flex items-center justify-center text-2xl mx-auto">
                            🏥
                        </div>
                        <h3 className="text-lg font-bold text-white">Need Clinical Care?</h3>
                        <p className="text-xs text-slate-400 leading-relaxed">
                            Existing patients can sign in to the Patient Portal to book appointments and view lab records.
                        </p>
                        <div className="space-y-3 pt-2">
                            <button
                                onClick={() => navigate('/login')}
                                className="w-full py-3 bg-teal-500 hover:bg-teal-600 text-white rounded-xl font-bold text-xs shadow-lg shadow-teal-500/20 transition-all"
                            >
                                Patient Portal Login
                            </button>
                            <button
                                onClick={() => navigate('/doctors')}
                                className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl font-bold text-xs transition-all"
                            >
                                Find a Specialist Doctor
                            </button>
                        </div>
                    </div>
                </div>

            </div>

            {/* Footer */}
            <footer className="bg-slate-950 text-slate-400 py-12 border-t border-slate-800/80 text-center text-xs">
                <p>&copy; {new Date().getFullYear()} NovaCare Hospital System. All rights reserved.</p>
            </footer>
        </div>
    );
}
