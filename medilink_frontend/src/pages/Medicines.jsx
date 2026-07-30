import React, { useEffect, useState, useMemo } from "react";
import client from "../api/client";
import Navbar from "../components/Navbar";
import PurchasePopup from "../components/PurchasePopup";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import Badge from "../components/ui/Badge";
import { Skeleton } from "../components/ui/Loader";

export default function Medicines() {
    const [medicines, setMedicines] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");
    const [selectedMedicine, setSelectedMedicine] = useState(null);
    const [showPurchasePopup, setShowPurchasePopup] = useState(false);
    const [refreshTrigger, setRefreshTrigger] = useState(0);

    useEffect(() => {
        const fetchMedicines = async () => {
            try {
                const res = await client.get("/api/medicines");
                setMedicines(res.data || []);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching medicines:", err);
                setMedicines([]);
                setLoading(false);
            }
        };

        fetchMedicines();
    }, [refreshTrigger]);

    const filteredMedicines = medicines.filter(med => {
        const matchesSearch = med.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            med.genericName?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === "All" || med.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const groupedMedicines = useMemo(() => {
        const groups = {};
        filteredMedicines.forEach(med => {
            const name = med.name?.trim();
            if (!name) return;

            const key = name.toLowerCase();
            const stock = med.stock !== undefined ? med.stock : med.quantity || 0;

            if (!groups[key]) {
                groups[key] = {
                    ...med,
                    _id: med._id,
                    ids: [med._id],
                    medicines: [med],
                    stock: stock,
                    totalStock: stock
                };
            } else {
                groups[key].medicines.push(med);
                groups[key].ids.push(med._id);
                groups[key].totalStock += stock;
            }
        });
        return Object.values(groups);
    }, [filteredMedicines]);

    const handleBuyClick = (group) => {
        setSelectedMedicine(group);
        setShowPurchasePopup(true);
    };

    const handlePurchaseSuccess = () => {
        setRefreshTrigger(prev => prev + 1);
    };

    const handleClosePopup = () => {
        setShowPurchasePopup(false);
        setSelectedMedicine(null);
    };

    return (
        <div className="min-h-screen bg-slate-950 font-sans text-slate-100 flex flex-col justify-between selection:bg-teal-500 selection:text-white">
            <div>
                <Navbar />

                {/* Hero Header */}
                <section className="bg-slate-900 py-16 px-6 relative border-b border-slate-800 overflow-hidden">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>
                    <div className="max-w-7xl mx-auto text-center text-white relative z-10 space-y-4">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-teal-500/10 border border-teal-500/20 rounded-full text-xs font-bold text-teal-400">
                            💊 24/7 Verified Prescription E-Pharmacy
                        </div>
                        <h1 className="text-4xl md:text-5xl font-display font-extrabold tracking-tight text-white">
                            NovaCare Hospital Pharmacy
                        </h1>
                        <p className="text-slate-300 text-sm md:text-base max-w-xl mx-auto font-normal">
                            Order prescription refills and essential medical supplies directly with home delivery.
                        </p>
                    </div>
                </section>

                {/* Search & Filter Bar */}
                <section className="max-w-7xl mx-auto px-6 -mt-7 relative z-20">
                    <div className="bg-slate-900/90 backdrop-blur-xl border border-slate-800 rounded-2xl p-5 shadow-2xl flex flex-col md:flex-row gap-4">
                        <div className="flex-1">
                            <Input
                                placeholder="Search medicine name, generic chemical, or brand..."
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
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl border border-slate-800 bg-slate-950 text-xs font-bold text-white focus:outline-none focus:border-teal-500 transition-all cursor-pointer"
                            >
                                <option value="All">All Availability Status</option>
                                <option value="Available">Available Stock</option>
                                <option value="Out of Stock">Out of Stock</option>
                            </select>
                        </div>
                    </div>
                </section>

                {/* Catalog Grid */}
                <section className="max-w-7xl mx-auto px-6 py-12">
                    {loading ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            <Skeleton className="h-72 rounded-3xl animate-pulse" />
                            <Skeleton className="h-72 rounded-3xl animate-pulse" />
                            <Skeleton className="h-72 rounded-3xl animate-pulse" />
                            <Skeleton className="h-72 rounded-3xl animate-pulse" />
                        </div>
                    ) : groupedMedicines.length === 0 ? (
                        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-12 text-center text-slate-400 shadow-2xl max-w-xl mx-auto">
                            <span className="text-5xl block mb-3">💊</span>
                            <p className="font-bold text-lg text-white">No matching medical items in catalog</p>
                            <p className="text-xs text-slate-500 mt-1">Try adjusting your search terms or filter settings.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-in fade-in duration-300">
                            {groupedMedicines.map((group) => {
                                const stock = group.totalStock;
                                const isAvailable = stock > 0;

                                return (
                                    <div 
                                      key={group._id} 
                                      className="bg-slate-900 border border-slate-800 rounded-3xl p-6 relative overflow-hidden flex flex-col justify-between hover:border-teal-500/40 transition-all duration-300 group shadow-xl"
                                    >
                                        {/* Stock Badge */}
                                        <div className="absolute top-4 right-4 z-10">
                                            <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${
                                                stock > 10 
                                                    ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" 
                                                    : stock > 0 
                                                    ? "bg-amber-500/10 text-amber-400 border-amber-500/20" 
                                                    : "bg-rose-500/10 text-rose-400 border-rose-500/20"
                                            }`}>
                                                Stock: {stock}
                                            </span>
                                        </div>

                                        <div className="h-24 bg-slate-950 rounded-2xl flex items-center justify-center border border-slate-800 mb-4 group-hover:scale-105 transition-transform">
                                            <span className="text-4xl">💊</span>
                                        </div>

                                        <div className="space-y-3 flex-1 flex flex-col justify-between">
                                            <div>
                                                <h3 className="font-bold text-white text-base leading-snug line-clamp-1 group-hover:text-teal-400 transition-colors" title={group.name}>{group.name}</h3>
                                                <p className="text-[10px] text-teal-400 font-bold uppercase tracking-wider mt-1">Generic: {group.genericName || "Standard Formulation"}</p>
                                            </div>

                                            <div className="grid grid-cols-2 gap-2 text-[10px] font-semibold text-slate-400 py-3 border-y border-slate-800">
                                                <div>
                                                    <span className="block text-slate-500 uppercase text-[9px] font-bold">Dosage</span>
                                                    <span className="text-slate-200">{group.dosage || "Standard"}</span>
                                                </div>
                                                <div>
                                                    <span className="block text-slate-500 uppercase text-[9px] font-bold">Brand</span>
                                                    <span className="text-slate-200 truncate block max-w-[80px]">{group.manufacturer || "NovaCare Rx"}</span>
                                                </div>
                                            </div>

                                            <div className="flex items-center justify-between pt-2">
                                                <div>
                                                    <span className="text-[9px] text-slate-500 block font-bold uppercase">Price</span>
                                                    <span className="text-lg font-extrabold text-white">${group.price ? Number(group.price).toFixed(2) : "12.00"}</span>
                                                </div>
                                                <Button
                                                    size="sm"
                                                    disabled={!isAvailable}
                                                    onClick={() => handleBuyClick(group)}
                                                    className="!px-4 !py-2.5 text-xs bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white font-bold rounded-xl shadow-lg shadow-teal-500/10 transition-all"
                                                >
                                                    {isAvailable ? "Order Refill" : "Sold Out"}
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </section>
            </div>

            {/* Footer */}
            <footer className="bg-slate-950 border-t border-slate-800 py-10 text-center text-slate-500 text-xs font-semibold mt-auto">
                <p>&copy; {new Date().getFullYear()} NovaCare Hospital System. All rights reserved.</p>
            </footer>

            {/* Purchase Popup */}
            {showPurchasePopup && selectedMedicine && (
                <PurchasePopup
                    medicine={selectedMedicine}
                    onClose={handleClosePopup}
                    onSuccess={handlePurchaseSuccess}
                />
            )}
        </div>
    );
}
