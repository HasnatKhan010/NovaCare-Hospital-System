import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import client from "../../api/client";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Badge from "../../components/ui/Badge";
import { Skeleton } from "../../components/ui/Loader";

const UserHome = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const userId = user.id || user._id;
  const userRefId = user.userId;
  
  const [appointments, setAppointments] = useState([]);
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (!userId) {
          setLoading(false);
          return;
        }
        
        const [appointmentsRes, billsRes] = await Promise.all([
          client.get(`/api/appointments/user/${userId}`).catch(() => ({ data: [] })),
          client.get("/api/bills").catch(() => ({ data: [] }))
        ]);

        const appts = appointmentsRes.data?.appointments || appointmentsRes.data || [];
        const userBills = (billsRes.data || []).filter(b => b.patientId === userRefId);

        setAppointments(appts.slice(0, 5));
        setBills(userBills.slice(0, 5));
        setLoading(false);
      } catch (err) {
        console.error("Error fetching user dashboard data:", err);
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId, userRefId]);

  if (loading) {
    return (
      <div className="space-y-6 p-2">
        <Skeleton className="h-12 w-72 animate-pulse rounded-2xl" />
        <Skeleton className="h-4 w-96 animate-pulse" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Skeleton className="h-48 rounded-3xl" />
          <Skeleton className="h-48 rounded-3xl" />
          <Skeleton className="h-48 rounded-3xl" />
        </div>
      </div>
    );
  }

  const upcomingAppt = appointments.find(a => a.status === 'confirmed' || a.status === 'pending');
  const outstandingBill = bills.find(b => b.status === 'Pending');

  return (
    <div className="space-y-8 font-sans selection:bg-teal-500 selection:text-white">
      {/* Welcome Hero Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-teal-900 rounded-3xl p-8 md:p-10 text-white shadow-2xl relative overflow-hidden border border-slate-700/50">
        <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl -translate-y-12 translate-x-12 pointer-events-none"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row justify-between md:items-center gap-6">
          <div className="space-y-3 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-teal-500/10 border border-teal-500/20 rounded-full text-xs font-semibold text-teal-300">
              <span className="w-2 h-2 bg-teal-400 rounded-full animate-pulse"></span>
              <span>Authenticated Patient Portal</span>
            </div>

            <h1 className="text-3xl md:text-5xl font-display font-extrabold tracking-tight text-white">
              Welcome Back, {user.name || "Patient"}
            </h1>

            <p className="text-slate-300 text-sm md:text-base font-normal leading-relaxed">
              Your personalized healthcare center. Schedule appointments with top specialists, order prescription refills, and review medical history.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
            <button
              onClick={() => navigate("/portal/appointment")}
              className="px-5 py-3 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white rounded-xl font-bold text-xs shadow-lg shadow-teal-500/20 transition-all transform hover:-translate-y-0.5"
            >
              + Book Appointment
            </button>
            <button
              onClick={() => navigate("/portal/medicine")}
              className="px-5 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl font-bold text-xs border border-slate-700 transition-all"
            >
              Order Pharmacy Refill
            </button>
          </div>
        </div>
      </div>

      {/* Quick Action Hub */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { title: "Book Appointment", desc: "Schedule doctor visit", icon: "📅", path: "/portal/appointment", color: "text-teal-600 bg-teal-50" },
          { title: "My Appointments", desc: "View active schedules", icon: "📋", path: "/portal/appointments", color: "text-blue-600 bg-blue-50" },
          { title: "Hospital Pharmacy", desc: "Order medications", icon: "💊", path: "/portal/medicine", color: "text-emerald-600 bg-emerald-50" },
          { title: "Clinical Journal", desc: "Private medical notes", icon: "📝", path: "/portal/notes", color: "text-purple-600 bg-purple-50" },
        ].map((action, idx) => (
          <div
            key={idx}
            onClick={() => navigate(action.path)}
            className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md hover:border-teal-500/30 transition-all duration-200 cursor-pointer group flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 ${action.color} rounded-xl flex items-center justify-center text-xl shadow-inner group-hover:scale-110 transition-transform`}>
                {action.icon}
              </div>
              <span className="text-slate-400 group-hover:text-teal-600 transition-colors text-xs font-bold">&rarr;</span>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-sm group-hover:text-teal-600 transition-colors">{action.title}</h4>
              <p className="text-slate-500 text-[11px] font-medium mt-0.5">{action.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Next Appointment Card */}
        <Card title="Upcoming Appointment" subtitle="Next verified clinical visit">
          {upcomingAppt ? (
            <div className="space-y-4 pt-2">
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Doctor</span>
                  <span className="text-sm font-bold text-slate-900">Dr. {upcomingAppt.doctor?.name || "Specialist"}</span>
                </div>
                <Badge variant="info" size="xs">{upcomingAppt.doctor?.specialty || "General"}</Badge>
              </div>

              <div className="flex items-center justify-between px-1">
                <span className="text-xs font-semibold text-slate-500">Scheduled Date</span>
                <span className="text-xs font-bold text-slate-800">
                  {new Date(upcomingAppt.scheduledAt).toLocaleDateString()} @ {new Date(upcomingAppt.scheduledAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                </span>
              </div>

              <Button 
                size="sm" 
                variant="outline"
                className="w-full text-xs"
                onClick={() => navigate("/portal/appointments")}
              >
                Manage Appointments
              </Button>
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="w-12 h-12 bg-teal-50 text-teal-600 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-3">
                📅
              </div>
              <p className="text-xs font-semibold text-slate-600 mb-4">No upcoming appointments scheduled</p>
              <Button size="sm" className="bg-teal-600 hover:bg-teal-700" onClick={() => navigate("/portal/appointment")}>
                Find a Specialist
              </Button>
            </div>
          )}
        </Card>

        {/* Outstanding Bills Card */}
        <Card title="Billing & Invoices" subtitle="Account balance and history">
          {outstandingBill ? (
            <div className="space-y-4 pt-2">
              <div className="flex items-center justify-between p-3 bg-rose-50/50 rounded-xl border border-rose-100">
                <div>
                  <span className="text-[10px] font-bold text-rose-500 uppercase tracking-wider block">Unpaid Invoice</span>
                  <span className="text-sm font-bold text-slate-900">#{outstandingBill.billId}</span>
                </div>
                <span className="text-xl font-extrabold text-rose-600">${outstandingBill.totalAmount}</span>
              </div>

              <Button 
                size="sm" 
                className="w-full bg-rose-600 hover:bg-rose-700 text-white"
                onClick={() => navigate("/portal/appointments")}
              >
                Pay Outstanding Bill
              </Button>
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-3">
                ✅
              </div>
              <p className="text-xs font-bold text-emerald-600">All invoices cleared!</p>
              <p className="text-[11px] text-slate-400 mt-1">No outstanding balance on your account.</p>
            </div>
          )}
        </Card>

        {/* Patient Care Support Card */}
        <Card title="Patient Care Support" subtitle="24/7 Clinical Assistance">
          <div className="space-y-3 pt-1 text-xs">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="text-lg">📞</span>
                <div>
                  <p className="font-bold text-slate-800">Nurse Helpline</p>
                  <p className="text-[10px] text-slate-400">Available 24/7 for advice</p>
                </div>
              </div>
              <span className="font-bold text-teal-600">Ext 402</span>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="text-lg">🤖</span>
                <div>
                  <p className="font-bold text-slate-800">NovaCare AI Helper</p>
                  <p className="text-[10px] text-slate-400">Portal navigation assistant</p>
                </div>
              </div>
              <span className="font-bold text-teal-600">Bottom Right</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Detailed Tables Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Appointments history */}
        <Card title="Recent Appointment History" subtitle="Your schedule logs">
          {appointments.length > 0 ? (
            <div className="divide-y divide-slate-100">
              {appointments.map((appt) => (
                <div key={appt._id} className="flex items-center justify-between py-3.5 first:pt-0 last:pb-0">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-slate-100 rounded-xl flex items-center justify-center text-sm font-bold text-slate-700">
                      🩺
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">Dr. {appt.doctor?.name || "Specialist"}</p>
                      <p className="text-slate-400 text-xs font-medium">
                        {new Date(appt.scheduledAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <Badge variant={appt.status === 'confirmed' ? 'success' : appt.status === 'pending' ? 'warning' : 'danger'}>
                    {appt.status}
                  </Badge>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-slate-400 text-xs font-semibold">
              No appointment history records found
            </div>
          )}
        </Card>

        {/* Billing History */}
        <Card title="Invoice & Payment History" subtitle="Billing statements">
          {bills.length > 0 ? (
            <div className="divide-y divide-slate-100">
              {bills.map((bill) => (
                <div key={bill._id} className="flex items-center justify-between py-3.5 first:pt-0 last:pb-0">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-slate-100 rounded-xl flex items-center justify-center text-sm font-bold text-slate-700">
                      💳
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">Invoice #{bill.billId}</p>
                      <p className="text-slate-400 text-xs font-medium">Total: ${bill.totalAmount}</p>
                    </div>
                  </div>
                  <Badge variant={bill.status === 'Paid' ? 'success' : 'warning'}>
                    {bill.status}
                  </Badge>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-slate-400 text-xs font-semibold">
              No invoice records found
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default UserHome;
