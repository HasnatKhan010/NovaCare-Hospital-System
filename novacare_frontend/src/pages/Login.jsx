import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import client from "../api/client";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (fieldErrors[e.target.name]) {
      setFieldErrors({ ...fieldErrors, [e.target.name]: "" });
    }
  };

  const validate = () => {
    const errors = {};
    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Please enter a valid email address";
    }
    if (!formData.password) {
      errors.password = "Password is required";
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    
    setLoading(true);
    setError("");

    try {
      const res = await client.post("/api/auth/login", formData);

      const token = res.data.token || res.data.access;
      const role = res.data.user?.role || res.data.role;

      if (!role) {
        throw new Error("Role not found in response");
      }

      localStorage.setItem("token", token);
      localStorage.setItem("userRole", role);

      if (res.data.user) {
        localStorage.setItem("user", JSON.stringify(res.data.user));
      }

      if (rememberMe) {
        localStorage.setItem("rememberedEmail", formData.email);
      } else {
        localStorage.removeItem("rememberedEmail");
      }

      if (role.toLowerCase() === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/portal/home");
      }
    } catch (err) {
      console.error("Login Error:", err);
      setError(err.response?.data?.message || "Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6 font-sans">
      <div className="absolute top-6 left-6">
        <Link to="/" className="text-brand-700 font-bold flex items-center gap-2 hover:text-brand-900 transition-colors">
          <span>&larr;</span> Back to Home
        </Link>
      </div>
      
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
        <div className="bg-brand-900 px-8 py-10 text-center relative overflow-hidden">
          <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-white font-display font-extrabold text-2xl mx-auto mb-4 border border-white/20 shadow-inner">
            N
          </div>
          <h1 className="text-3xl font-display font-bold text-white mb-2 tracking-tight">Patient Portal</h1>
          <p className="text-brand-100 text-sm font-light">Secure access to your medical records</p>
        </div>

        <div className="p-8 space-y-6">
          {error && (
            <div className="bg-rose-50 text-rose-700 px-4 py-3 rounded-lg text-sm font-medium border border-rose-200 flex items-center gap-2">
              <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"></path></svg>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              label="Email Address"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="you@example.com"
              error={fieldErrors.email}
              required
              icon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.206" />
                </svg>
              }
            />

            <div className="relative">
              <Input
                label="Password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleInputChange}
                placeholder="••••••••"
                error={fieldErrors.password}
                required
                icon={
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                }
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-10 text-slate-400 hover:text-slate-600 transition-colors focus:outline-none text-sm font-medium"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-slate-600 font-medium cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-slate-300 text-brand-700 focus:ring-brand-600 w-4 h-4 cursor-pointer"
                />
                Remember Me
              </label>
              <Link to="/choose-role" className="text-brand-700 hover:text-brand-900 font-semibold hover:underline">
                Forgot password?
              </Link>
            </div>

            <Button
              type="submit"
              loading={loading}
              className="w-full py-3 bg-brand-700 hover:bg-brand-800"
            >
              Sign In to Portal
            </Button>
          </form>

          <div className="text-center pt-4 border-t border-slate-100">
            <p className="text-slate-500 text-sm">
              New patient?{" "}
              <Link to="/signup" className="text-brand-700 hover:text-brand-900 font-bold hover:underline">
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;