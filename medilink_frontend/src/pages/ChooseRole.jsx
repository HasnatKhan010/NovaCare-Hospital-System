import { useNavigate, Link } from "react-router-dom";

export default function ChooseRole() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-4 font-sans">
      <div className="absolute top-6 left-6 hidden md:block">
        <Link to="/" className="text-brand-700 font-bold flex items-center gap-2 hover:text-brand-900 transition-colors">
          <span>&larr;</span> Back to Home
        </Link>
      </div>
      
      <div className="max-w-3xl w-full text-center space-y-8">
        <div>
          <h1 className="text-4xl md:text-5xl font-display font-extrabold text-brand-900 tracking-tight">
            NovaCare Access Portal
          </h1>
          <p className="mt-4 text-lg text-slate-500 font-light">
            Please select your portal destination to securely log in
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          <button
            onClick={() => navigate("/login")}
            className="group relative flex flex-col items-center justify-center p-10 bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-slate-200 hover:border-brand-500 transform hover:-translate-y-1"
          >
            <div className="h-20 w-20 bg-slate-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-brand-100 transition-colors">
              <svg className="w-10 h-10 text-slate-600 group-hover:text-brand-700 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 group-hover:text-brand-700 transition-colors">Staff / Admin Portal</h3>
            <p className="mt-3 text-slate-500">Secure access for healthcare providers and hospital administrators.</p>
          </button>

          <button
            onClick={() => navigate("/login")}
            className="group relative flex flex-col items-center justify-center p-10 bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-slate-200 hover:border-brand-500 transform hover:-translate-y-1"
          >
            <div className="h-20 w-20 bg-slate-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-brand-100 transition-colors">
              <svg className="w-10 h-10 text-slate-600 group-hover:text-brand-700 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 group-hover:text-brand-700 transition-colors">Patient Portal</h3>
            <p className="mt-3 text-slate-500">View medical records, test results, and manage appointments.</p>
          </button>
        </div>
      </div>
    </div>
  );
}