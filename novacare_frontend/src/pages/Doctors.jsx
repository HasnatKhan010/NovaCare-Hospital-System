import React, { useEffect, useState } from "react";
import client from "../api/client";
import Navbar from "../components/Navbar";
import BookAppointmentModal from "../components/BookAppointmentModal";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { Skeleton } from "../components/ui/Loader";
import { useSearchParams } from "react-router-dom";

export default function Doctors() {
  const [searchParams] = useSearchParams();
  const initialSearch = searchParams.get("search") || "";

  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [specialtyFilter, setSpecialtyFilter] = useState("All");
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await client.get("/api/doctors");
        const doctorsData = Array.isArray(res.data?.doctors)
          ? res.data.doctors
          : Array.isArray(res.data)
          ? res.data
          : [];

        setDoctors(doctorsData);
      } catch (err) {
        console.error("Error fetching doctors:", err);
        setDoctors([]);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  const doctorList = Array.isArray(doctors) ? doctors : [];

  const specialties = [
    "All",
    ...new Set(doctorList.map((doc) => doc.specialty).filter(Boolean)),
  ];

  const filteredDoctors = doctorList.filter((doc) => {
    const matchesSearch =
      doc.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.specialty?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesSpecialty =
      specialtyFilter === "All" ||
      doc.specialty === specialtyFilter;

    return matchesSearch && matchesSpecialty;
  });

  const handleBookAppointment = (doctor) => {
    setSelectedDoctor(doctor);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-100 flex flex-col justify-between selection:bg-teal-500 selection:text-white">
      <div>
        <Navbar />

        {/* Hero Section */}
        <section className="bg-slate-900 py-16 px-6 relative border-b border-slate-800 overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="max-w-7xl mx-auto text-center text-white relative z-10 space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-teal-500/10 border border-teal-500/20 rounded-full text-xs font-bold text-teal-400">
              👨‍⚕️ 350+ Board Certified Attending Physicians
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-extrabold tracking-tight text-white">
              NovaCare Provider Directory
            </h1>

            <p className="text-slate-300 text-sm md:text-base max-w-xl mx-auto font-normal">
              Find attending specialists, view clinical experience, and schedule consultations online.
            </p>
          </div>
        </section>

        {/* Filter Bar */}
        <section className="max-w-7xl mx-auto px-6 -mt-7 relative z-20">
          <div className="bg-slate-900/90 backdrop-blur-xl border border-slate-800 rounded-2xl p-5 shadow-2xl flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search by doctor name or medical specialty..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-slate-950 border-slate-800 text-white placeholder-slate-500 focus:border-teal-500"
                icon={
                  <svg className="w-4 h-4 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                }
              />
            </div>

            <div className="flex flex-col gap-1 w-full md:max-w-xs justify-center">
              <select
                value={specialtyFilter}
                onChange={(e) => setSpecialtyFilter(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-800 bg-slate-950 text-xs font-bold text-white focus:outline-none focus:border-teal-500 transition-all cursor-pointer"
              >
                {specialties.map((specialty) => (
                  <option key={specialty} value={specialty}>
                    Specialty: {specialty}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </section>

        {/* Doctors Grid */}
        <section className="max-w-7xl mx-auto px-6 py-12">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <Skeleton className="h-80 rounded-3xl" />
              <Skeleton className="h-80 rounded-3xl" />
              <Skeleton className="h-80 rounded-3xl" />
              <Skeleton className="h-80 rounded-3xl" />
            </div>
          ) : filteredDoctors.length === 0 ? (
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-12 text-center text-slate-400 shadow-2xl max-w-xl mx-auto">
              <span className="text-5xl block mb-3">👨‍⚕️</span>
              <p className="font-bold text-lg text-white">No specialist profiles found</p>
              <p className="text-xs text-slate-500 mt-1">Try clearing search filters or checking spelling.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-in fade-in duration-300">
              {filteredDoctors.map((doc) => (
                <div
                  key={doc._id}
                  className="bg-slate-900 border border-slate-800 rounded-3xl p-6 flex flex-col justify-between hover:border-teal-500/40 transition-all duration-300 group shadow-xl"
                >
                  <div className="space-y-4">
                    <div className="w-16 h-16 bg-teal-500/10 border border-teal-500/20 rounded-2xl flex items-center justify-center text-3xl font-extrabold text-teal-400 shadow-inner group-hover:scale-105 transition-transform duration-300">
                      {doc.name?.charAt(0) || "D"}
                    </div>

                    <div>
                      <h3 className="text-base font-bold text-white leading-snug group-hover:text-teal-400 transition-colors">
                        {doc.name}
                      </h3>
                      <p className="text-teal-400 text-xs font-bold tracking-wider mt-1">
                        {doc.specialty || "General Specialist"}
                      </p>
                    </div>

                    <div className="space-y-2 text-xs text-slate-400 font-medium border-t border-slate-800 pt-4">
                      {doc.yearsExperience && (
                        <div className="flex justify-between">
                          <span className="text-slate-500">Experience:</span>
                          <span className="text-slate-200 font-bold">{doc.yearsExperience} Years</span>
                        </div>
                      )}
                      {doc.licenseNumber && (
                        <div className="flex justify-between">
                          <span className="text-slate-500">License:</span>
                          <span className="text-slate-200 font-semibold">{doc.licenseNumber}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="pt-6">
                    <Button
                      onClick={() => handleBookAppointment(doc)}
                      className="w-full text-xs py-3 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white font-bold rounded-xl shadow-lg shadow-teal-500/10 transition-all"
                    >
                      Book Consultation
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>

      <BookAppointmentModal
        doctor={selectedDoctor}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={() => console.log("Appointment booked successfully")}
      />

      <footer className="bg-slate-950 border-t border-slate-800 py-10 text-center text-slate-500 text-xs font-semibold mt-auto">
        <p>&copy; {new Date().getFullYear()} NovaCare Hospital System. All rights reserved.</p>
      </footer>
    </div>
  );
}