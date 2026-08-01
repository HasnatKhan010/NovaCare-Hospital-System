import React, { useEffect, useState } from "react";
import client from "../../api/client";
import BookAppointmentModal from "../../components/BookAppointmentModal";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import { Skeleton } from "../../components/ui/Loader";

export default function Appointment() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [specialtyFilter, setSpecialtyFilter] = useState("All");
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await client.get("/api/doctors");
        const doctorsData = Array.isArray(res.data?.doctors) ? res.data.doctors : [];
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
  const specialties = ["All", ...new Set(doctorList.map((doc) => doc.specialty).filter(Boolean))];

  const filteredDoctors = doctorList.filter((doc) => {
    const matchesSearch =
      doc.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.specialty?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = specialtyFilter === "All" || doc.specialty === specialtyFilter;
    return matchesSearch && matchesSpecialty;
  });

  const handleBookAppointment = (doctor) => {
    setSelectedDoctor(doctor);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-display font-bold text-slate-900">Book Appointment</h1>
        <p className="text-slate-500 mt-1">Search for specialists and schedule a consultation.</p>
      </div>

      {/* Filter */}
      <Card bodyClass="p-4 flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <Input
            placeholder="Search by name or specialty..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            icon={
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            }
          />
        </div>

        <div className="flex flex-col gap-1 w-full md:max-w-xs justify-center">
          <select
            value={specialtyFilter}
            onChange={(e) => setSpecialtyFilter(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all duration-200"
          >
            {specialties.map((specialty) => (
              <option key={specialty} value={specialty}>{specialty}</option>
            ))}
          </select>
        </div>
      </Card>

      {/* Doctors Grid */}
      <div>
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Skeleton className="h-72 rounded-2xl" />
            <Skeleton className="h-72 rounded-2xl" />
            <Skeleton className="h-72 rounded-2xl" />
          </div>
        ) : filteredDoctors.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center text-slate-400 shadow-sm max-w-xl mx-auto">
            <span className="text-5xl block mb-3">👨‍⚕️</span>
            <p className="font-semibold text-lg text-slate-600">No matching specialist profiles found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in duration-200">
            {filteredDoctors.map((doc) => (
              <Card key={doc._id} hoverEffect bodyClass="p-0 flex flex-col justify-between h-full" className="overflow-hidden border-slate-200 shadow-sm">
                <div className="p-6 text-center space-y-4">
                  <div className="w-20 h-20 bg-brand-50 border border-brand-100 rounded-full flex items-center justify-center text-2xl font-extrabold text-brand-700 mx-auto">
                    {doc.name?.charAt(0) || "D"}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 leading-tight">{doc.name}</h3>
                    <p className="text-brand-700 text-xs font-bold uppercase tracking-wider mt-1">{doc.specialty}</p>
                  </div>
                  <div className="space-y-1.5 text-xs text-slate-500 font-semibold border-t border-slate-100 pt-4 text-left">
                    {doc.yearsExperience && (
                      <div className="flex justify-between">
                        <span className="text-slate-400">Experience:</span>
                        <span className="text-slate-700">{doc.yearsExperience} years</span>
                      </div>
                    )}
                    {doc.licenseNumber && (
                      <div className="flex justify-between">
                        <span className="text-slate-400">License:</span>
                        <span className="text-slate-700">{doc.licenseNumber}</span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="p-4 bg-slate-50 border-t border-slate-100 mt-auto">
                  <Button onClick={() => handleBookAppointment(doc)} className="w-full text-sm py-2.5 bg-brand-700 hover:bg-brand-800">
                    Book Consultation
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      <BookAppointmentModal
        doctor={selectedDoctor}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={() => {
          console.log("Appointment booked successfully");
        }}
      />
    </div>
  );
}
