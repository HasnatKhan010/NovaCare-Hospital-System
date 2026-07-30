import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import ChooseRole from "../pages/ChooseRole";
import NotFound from "../pages/Notfound";

// Public Pages
import Doctors from "../pages/Doctors";
import Medicines from "../pages/Medicines";
import About from "../pages/About";
import Departments from "../pages/Departments";

// Layouts
import AdminLayout from "../components/AdminLayout";
import UserLayout from "../components/UserLayout";

// Admin Pages
import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminAnalytics from "../pages/admin/AdminAnalytics";
import AdminPayments from "../pages/admin/AdminPayments";
import PaymentForm from "../components/PaymentForm";
import AdminUsers from "../pages/admin/AdminUsers";
import AdminAppointments from "../pages/admin/AdminAppointments";
import AdminDoctors from "../pages/admin/AdminDoctors";
import AdminPatients from "../pages/admin/AdminPatients";
import AdminMedicines from "../pages/admin/AdminMedicines";
import AdminBills from "../pages/admin/AdminBills";
import AdminNotes from "../pages/admin/AdminNotes";

// User Pages (Patient Portal)
import UserHome from "../pages/user/UserHome";
import Appointment from "../pages/user/Appointment";
import Medicine from "../pages/user/Medicine";
import MyAppointments from "../pages/user/MyAppointments";
import UserNotes from "../pages/user/UserNotes";

// Protected Route Component
const ProtectedRoute = ({ children, role }) => {
  const userRole = localStorage.getItem("userRole");

  if (!userRole) {
    return <Navigate to="/login" replace />;
  }

  if (role && userRole !== role) {
    return userRole === 'admin'
      ? <Navigate to="/admin/dashboard" replace />
      : <Navigate to="/portal/home" replace />;
  }

  return children;
};

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/doctors" element={<Doctors />} />
      <Route path="/pharmacy" element={<Medicines />} />
      <Route path="/departments" element={<Departments />} />
      <Route path="/patient-visitor-info" element={<About />} />
      <Route path="/choose-role" element={<ChooseRole />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Admin Routes */}
      <Route path="/admin/*" element={
        <ProtectedRoute role="admin">
          <AdminLayout>
            <Routes>
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="analytics" element={<AdminAnalytics />} />
              <Route path="payments" element={<AdminPayments />} />
              <Route path="payments/new" element={<PaymentForm />} />
              <Route path="users" element={<AdminUsers />} />
              <Route path="appointments" element={<AdminAppointments />} />
              <Route path="doctors" element={<AdminDoctors />} />
              <Route path="patients" element={<AdminPatients />} />
              <Route path="medicines" element={<AdminMedicines />} />
              <Route path="bills" element={<AdminBills />} />
              <Route path="notes" element={<AdminNotes />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AdminLayout>
        </ProtectedRoute>
      } />

      {/* Patient Portal Routes */}
      <Route path="/portal/*" element={
        <ProtectedRoute role="user">
          <UserLayout>
            <Routes>
              <Route path="home" element={<UserHome />} />
              <Route path="appointment" element={<Appointment />} />
              <Route path="appointments" element={<MyAppointments />} />
              <Route path="medicine" element={<Medicine />} />
              <Route path="notes" element={<UserNotes />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </UserLayout>
        </ProtectedRoute>
      } />

      {/* Legacy Fallbacks */}
      <Route path="/about" element={<Navigate to="/patient-visitor-info" replace />} />
      <Route path="/medicines" element={<Navigate to="/pharmacy" replace />} />
      <Route path="/user/*" element={<Navigate to="/portal/home" replace />} />

      {/* Catch-all */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}