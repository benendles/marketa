"use client";

import { useState } from "react";
import Link from "next/link";

const ROLES = [
  { value: "buyer", label: "Buyer", desc: "I want to find and purchase items", icon: "🛒" },
  { value: "seller", label: "Seller", desc: "I want to list and sell items", icon: "🏪" },
  { value: "both", label: "Both", desc: "I want to buy and sell", icon: "🔄" },
];

export default function RegisterPage() {
  const [step, setStep] = useState(1);
  const [role, setRole] = useState("both");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) { setStep(2); return; }
    setLoading(true);
    setTimeout(() => setLoading(false), 1500);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-linear-to-br from-purple-700 to-indigo-600 text-white flex-col justify-between p-12">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center font-bold text-lg">M</div>
          <span className="font-bold text-xl">Marketa</span>
        </div>
        <div>
          <h2 className="text-4xl font-extrabold mb-4 leading-tight">
            Join the marketplace. Start selling or buying today.
          </h2>
          <p className="text-indigo-200 text-lg mb-8">
            Free to join. Post your first listing in under 2 minutes.
          </p>
          <ul className="space-y-3">
            {[
              "✅ No listing fees for the first 30 days",
              "✅ Secure Stripe-powered payments",
              "✅ Real-time chat with buyers & sellers",
              "✅ Verified review system",
              "✅ iOS & Android mobile app included",
            ].map((item) => (
              <li key={item} className="text-sm text-indigo-100">{item}</li>
            ))}
          </ul>
        </div>
        <div className="flex -space-x-3">
          {["Alex", "Jordan", "Sam", "Morgan", "Taylor"].map((name) => (
            <img key={name} src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`} alt={name} className="w-10 h-10 rounded-full border-2 border-white bg-white" />
          ))}
          <div className="w-10 h-10 rounded-full border-2 border-white bg-indigo-500 flex items-center justify-center text-xs font-bold">12K+</div>
        </div>
      </div>

      {/* Right panel – form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 bg-slate-50">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center justify-center gap-2 mb-6">
            <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center font-bold text-white text-lg">M</div>
            <span className="font-bold text-xl text-slate-900">Marketa</span>
          </div>

          {/* Step indicator */}
          <div className="flex items-center gap-2 mb-6">
            {[1, 2].map((s) => (
              <div key={s} className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition ${step >= s ? "bg-indigo-600 text-white" : "bg-slate-200 text-slate-500"}`}>{s}</div>
                {s < 2 && <div className={`flex-1 h-0.5 w-16 transition ${step > s ? "bg-indigo-600" : "bg-slate-200"}`} />}
              </div>
            ))}
            <span className="text-xs text-slate-500 ml-2">Step {step} of 2</span>
          </div>

          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-slate-900">
              {step === 1 ? "Create your account" : "Choose your role"}
            </h1>
            <p className="text-slate-500 mt-2 text-sm">
              Already have an account?{" "}
              <Link href="/auth/login" className="text-indigo-600 font-medium hover:underline">Sign in</Link>
            </p>
          </div>

          {step === 1 ? (
            <>
              {/* Social login */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <button className="flex items-center justify-center gap-2 px-4 py-3 border border-slate-200 rounded-xl bg-white hover:bg-slate-50 transition text-sm font-medium text-slate-700">
                  <span>G</span> Google
                </button>
                <button className="flex items-center justify-center gap-2 px-4 py-3 border border-slate-200 rounded-xl bg-white hover:bg-slate-50 transition text-sm font-medium text-slate-700">
                  <span>f</span> Facebook
                </button>
              </div>
              <div className="flex items-center gap-3 mb-6">
                <hr className="flex-1 border-slate-200" />
                <span className="text-xs text-slate-400">or with email</span>
                <hr className="flex-1 border-slate-200" />
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">First name</label>
                    <input required placeholder="John" className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Last name</label>
                    <input required placeholder="Doe" className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Email address</label>
                  <input type="email" required placeholder="you@example.com" className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Password</label>
                  <div className="relative">
                    <input type={showPassword ? "text" : "password"} required placeholder="Min. 8 characters" className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition pr-12" />
                    <button type="button" className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-sm" onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? "🙈" : "👁"}
                    </button>
                  </div>
                </div>
                <button type="submit" className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition">
                  Continue →
                </button>
              </form>
            </>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-3">
                {ROLES.map((r) => (
                  <button
                    key={r.value}
                    type="button"
                    onClick={() => setRole(r.value)}
                    className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 text-left transition ${role === r.value ? "border-indigo-500 bg-indigo-50" : "border-slate-200 bg-white hover:border-slate-300"}`}
                  >
                    <span className="text-2xl">{r.icon}</span>
                    <div>
                      <p className={`font-semibold text-sm ${role === r.value ? "text-indigo-700" : "text-slate-900"}`}>{r.label}</p>
                      <p className="text-xs text-slate-500 mt-0.5">{r.desc}</p>
                    </div>
                    <div className={`ml-auto w-5 h-5 rounded-full border-2 flex items-center justify-center ${role === r.value ? "border-indigo-600 bg-indigo-600" : "border-slate-300"}`}>
                      {role === r.value && <div className="w-2 h-2 rounded-full bg-white" />}
                    </div>
                  </button>
                ))}
              </div>
              <div className="flex items-start gap-2 mt-4">
                <input type="checkbox" id="terms" required className="mt-0.5 rounded border-slate-300 text-indigo-600" />
                <label htmlFor="terms" className="text-sm text-slate-600">
                  I agree to the{" "}
                  <Link href="/terms" className="text-indigo-600 hover:underline">Terms of Service</Link> and{" "}
                  <Link href="/privacy" className="text-indigo-600 hover:underline">Privacy Policy</Link>
                </label>
              </div>
              <div className="flex gap-3">
                <button type="button" onClick={() => setStep(1)} className="flex-1 py-3 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold rounded-xl transition">
                  ← Back
                </button>
                <button type="submit" disabled={loading} className="flex-1 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition flex items-center justify-center gap-2 disabled:opacity-60">
                  {loading && <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />}
                  {loading ? "Creating..." : "Create Account"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
