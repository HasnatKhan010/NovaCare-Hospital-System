import React from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

export default function About() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-slate-50 font-sans">
            <Navbar />

            {/* Institutional Header */}
            <div className="bg-brand-900 text-white py-16 lg:py-24 border-b-4 border-brand-600">
                <div className="max-w-7xl mx-auto px-6">
                    <h1 className="text-4xl md:text-5xl font-display font-bold tracking-tight mb-4">Patient & Visitor Information</h1>
                    <p className="text-lg text-brand-100 max-w-2xl font-light">
                        Guidelines, resources, and essential information for your visit to NovaCare Medical Center.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-16 grid lg:grid-cols-3 gap-12">
                
                {/* Main Content Area */}
                <div className="lg:col-span-2 space-y-12">
                    
                    <section>
                        <h2 className="text-2xl font-display font-bold text-brand-900 mb-6 pb-2 border-b border-slate-200">Visiting Hours</h2>
                        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4 text-slate-700">
                            <div className="flex justify-between items-center pb-4 border-b border-slate-100">
                                <div>
                                    <h4 className="font-bold text-slate-900">General Wards</h4>
                                    <p className="text-sm">Medical, Surgical, and Telemetry</p>
                                </div>
                                <div className="text-right font-semibold text-brand-700">
                                    8:00 AM – 8:00 PM
                                </div>
                            </div>
                            <div className="flex justify-between items-center pb-4 border-b border-slate-100">
                                <div>
                                    <h4 className="font-bold text-slate-900">Intensive Care Units (ICU)</h4>
                                    <p className="text-sm">Immediate family only</p>
                                </div>
                                <div className="text-right font-semibold text-brand-700">
                                    10:00 AM – 6:00 PM
                                </div>
                            </div>
                            <div className="flex justify-between items-center">
                                <div>
                                    <h4 className="font-bold text-slate-900">Emergency Department</h4>
                                    <p className="text-sm">One visitor per patient</p>
                                </div>
                                <div className="text-right font-semibold text-brand-700">
                                    Open 24/7
                                </div>
                            </div>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-display font-bold text-brand-900 mb-6 pb-2 border-b border-slate-200">Visitor Guidelines</h2>
                        <ul className="list-disc pl-5 space-y-4 text-slate-700 leading-relaxed">
                            <li><strong>Mask Policy:</strong> Face masks are highly recommended in all clinical areas and required in the Emergency Department and ICUs.</li>
                            <li><strong>Health Screening:</strong> Please do not visit if you are experiencing symptoms of respiratory illness, fever, or flu.</li>
                            <li><strong>Children:</strong> Visitors under the age of 12 must be accompanied by an adult at all times.</li>
                            <li><strong>Quiet Environment:</strong> Please respect the healing environment by keeping noise levels low.</li>
                        </ul>
                    </section>
                </div>

                {/* Sidebar */}
                <div className="space-y-8">
                    <div className="bg-brand-50 p-6 rounded-xl border border-brand-100">
                        <h3 className="text-xl font-bold text-brand-900 mb-4">Contact NovaCare</h3>
                        <div className="space-y-4 text-sm text-brand-800">
                            <div>
                                <strong className="block text-brand-900">Main Hospital Operator</strong>
                                1-800-NOVA-CARE
                            </div>
                            <div>
                                <strong className="block text-brand-900">Emergency Department</strong>
                                (555) 123-4567
                            </div>
                            <div>
                                <strong className="block text-brand-900">Address</strong>
                                123 Healthway Drive<br />
                                Medical District<br />
                                City, ST 12345
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm text-center">
                        <h3 className="text-lg font-bold text-slate-900 mb-2">Need an Appointment?</h3>
                        <p className="text-sm text-slate-600 mb-6">Current patients can schedule through the Patient Portal. New patients can find a provider online.</p>
                        <div className="space-y-3">
                            <button
                                onClick={() => navigate('/login')}
                                className="w-full py-2.5 bg-brand-700 text-white rounded-lg font-bold hover:bg-brand-800 transition-colors"
                            >
                                Patient Portal
                            </button>
                            <button
                                onClick={() => navigate('/doctors')}
                                className="w-full py-2.5 bg-slate-100 text-brand-900 border border-slate-200 rounded-lg font-bold hover:bg-slate-200 transition-colors"
                            >
                                Find a Doctor
                            </button>
                        </div>
                    </div>
                </div>
                
            </div>

            {/* Footer */}
            <footer className="bg-slate-900 text-slate-400 py-8 text-center text-sm mt-12">
                <p>&copy; {new Date().getFullYear()} NovaCare Medical Center. All rights reserved.</p>
            </footer>
        </div>
    );
}
