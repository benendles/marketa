"use client";

import { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => setLoading(false), 1500);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex">
      {/* Left panel – branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-linear-to-br from-indigo-600 to-purple-700 text-white flex-col justify-between p-12">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center font-bold text-lg">M</div>
          <span className="font-bold text-xl">Marketa</span>
        </div>
        <div>
          <h2 className="text-4xl font-extrabold mb-4 leading-tight">
            Welcome back to the marketplace.
          </h2>
          <p className="text-indigo-200 text-lg mb-8">
            Thousands of listings waiting. Your next great deal is one login away.
          </p>
          <div className="grid grid-cols-2 gap-4">
            {[
              { value: "48K+", label: "Active Listings" },
              { value: "4.9★", label: "Avg. Seller Rating" },
              { value: "99%", label: "Secure Transactions" },
              { value: "24/7", label: "Support" },
            ].map((s) => (
              <div key={s.label} className="bg-white/10 rounded-xl p-4">
                <div className="text-2xl font-bold">{s.value}</div>
                <div className="text-indigo-200 text-sm">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-3 bg-white/10 rounded-xl p-4">
          <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" alt="User" className="w-10 h-10 rounded-full" />
          <div>
            <p className="font-semibold text-sm">"Sold my camera in 3 days. Amazing platform!"</p>
            <p className="text-indigo-300 text-xs mt-0.5">— Alex R., Verified Seller</p>
          </div>
        </div>
      </div>

      {/* Right panel – form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 bg-slate-50">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="lg:hidden flex items-center justify-center gap-2 mb-6">
              <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center font-bold text-white text-lg">M</div>
              <span className="font-bold text-xl text-slate-900">Marketa</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900">Sign in to your account</h1>
            <p className="text-slate-500 mt-2 text-sm">
              Don&apos;t have an account?{" "}
              <Link href="/auth/register" className="text-indigo-600 font-medium hover:underline">
                Sign up free
              </Link>
            </p>
          </div>

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
            <span className="text-xs text-slate-400">or continue with email</span>
            <hr className="flex-1 border-slate-200" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Email address</label>
              <input
                type="email"
                required
                placeholder="you@example.com"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-sm font-medium text-slate-700">Password</label>
                <Link href="/auth/forgot-password" className="text-xs text-indigo-600 hover:underline">Forgot password?</Link>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition pr-12"
                />
                <button
                  type="button"
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-sm"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "🙈" : "👁"}
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input type="checkbox" id="remember" className="rounded border-slate-300 text-indigo-600" />
              <label htmlFor="remember" className="text-sm text-slate-600">Remember me for 30 days</label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading && <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />}
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>

          <p className="text-center text-xs text-slate-400 mt-6">
            By signing in you agree to our{" "}
            <Link href="/terms" className="underline hover:text-slate-600">Terms</Link> and{" "}
            <Link href="/privacy" className="underline hover:text-slate-600">Privacy Policy</Link>.
          </p>
        </div>
      </div>
    </div>
  );
}
