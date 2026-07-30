import React, { useEffect, useState, useMemo } from "react";
import client from "../../api/client";
import PurchasePopup from "../../components/PurchasePopup";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import Badge from "../../components/ui/Badge";
import { Skeleton } from "../../components/ui/Loader";

export default function Medicine() {
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
      } catch (err) {
        console.error("Error fetching medicines:", err);
      } finally {
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
    <div className="space-y-8 font-sans">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-teal-900 rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden border border-slate-700/50">
        <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-teal-500/10 border border-teal-500/20 rounded-full text-xs font-bold text-teal-300">
            <span>💊 NovaCare Pharmacy Refills</span>
          </div>
          <h1 className="text-3xl font-display font-extrabold tracking-tight text-white">Hospital Pharmacy Portal</h1>
          <p className="text-slate-300 text-xs sm:text-sm font-normal max-w-xl">
            Order prescription medications directly to your home with free express delivery for registered patients.
          </p>
        </div>
      </div>

      {/* Filter */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <Input
            placeholder="Search by medicine name or generic formulation..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            icon={
              <svg className="w-4 h-4 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            }
          />
        </div>
        <div className="flex flex-col gap-1 w-full md:max-w-xs justify-center">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-bold text-slate-700 focus:outline-none focus:border-teal-500 transition-all cursor-pointer"
          >
            <option value="All">All Availability Status</option>
            <option value="Available">Available Stock</option>
            <option value="Out of Stock">Out of Stock</option>
          </select>
        </div>
      </div>

      {/* Pharmacy Grid */}
      <div>
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Skeleton className="h-64 rounded-2xl" />
            <Skeleton className="h-64 rounded-2xl" />
            <Skeleton className="h-64 rounded-2xl" />
          </div>
        ) : groupedMedicines.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-3xl p-12 text-center text-slate-400 shadow-sm max-w-xl mx-auto">
            <span className="text-5xl block mb-3">💊</span>
            <p className="font-bold text-base text-slate-800">No matching medical items in catalog</p>
            <p className="text-xs text-slate-400 mt-1">Try searching for generic chemical names or brands.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in duration-200">
            {groupedMedicines.map((group) => {
              const stock = group.totalStock;
              const isAvailable = stock > 0;

              return (
                <div key={group._id} className="bg-white border border-slate-200/80 rounded-3xl p-6 relative overflow-hidden flex flex-col justify-between hover:shadow-xl hover:border-teal-500/30 transition-all duration-300 group">
                  <div className="absolute top-4 right-4 z-10">
                    <Badge variant={stock > 10 ? "success" : stock > 0 ? "warning" : "danger"} size="xs">
                      Stock: {stock}
                    </Badge>
                  </div>

                  <div className="h-24 bg-slate-50 rounded-2xl flex items-center justify-center border border-slate-100 mb-4 group-hover:scale-105 transition-transform">
                    <span className="text-4xl">💊</span>
                  </div>

                  <div className="p-1 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <h3 className="font-bold text-slate-900 text-base leading-snug line-clamp-1 group-hover:text-teal-600 transition-colors" title={group.name}>{group.name}</h3>
                      <p className="text-[10px] text-teal-600 font-bold uppercase tracking-wider mt-1">Generic: {group.genericName || "Standard"}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-[10px] font-semibold text-slate-500 py-3 border-y border-slate-100">
                      <div>
                        <span className="block text-slate-400 uppercase text-[9px] font-bold">Dosage</span>
                        <span className="text-slate-800 font-bold">{group.dosage || "Standard"}</span>
                      </div>
                      <div>
                        <span className="block text-slate-400 uppercase text-[9px] font-bold">Brand</span>
                        <span className="text-slate-800 font-bold truncate block max-w-[80px]">{group.manufacturer || "NovaCare Rx"}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <div>
                        <span className="text-[9px] text-slate-400 block font-bold uppercase">Price</span>
                        <span className="text-lg font-extrabold text-teal-700">${group.price ? Number(group.price).toFixed(2) : "12.00"}</span>
                      </div>
                      <Button
                        size="sm"
                        disabled={!isAvailable}
                        onClick={() => handleBuyClick(group)}
                        className="!px-4 !py-2 text-xs bg-teal-600 hover:bg-teal-700"
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
      </div>

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