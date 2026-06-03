"use client";

import Link from "next/link";
import { useState } from "react";
import { Search, Bell, Menu, X, Plus } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-14 gap-6">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-1.5 shrink-0 text-slate-900 hover:text-slate-700 transition">
            <div className="w-6 h-6 bg-indigo-600 rounded flex items-center justify-center shrink-0">
              <span className="text-white font-black text-[11px]">M</span>
            </div>
            <span className="font-bold text-base tracking-tight">arketa</span>
          </Link>

          {/* Search */}
          <div className="hidden md:flex flex-1">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              <input
                type="text"
                placeholder="Search listings..."
                className="w-full pl-9 pr-4 py-2 rounded-lg border border-slate-200 bg-slate-50 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white focus:border-transparent transition"
              />
            </div>
          </div>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1 ml-auto">
            <Link href="/marketplace" className="px-3 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-50 transition">
              Browse
            </Link>
            <Link href="/dashboard" className="px-3 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-50 transition">
              Dashboard
            </Link>
            <button
              type="button"
              aria-label="Notifications"
              className="relative p-2 text-slate-500 hover:text-slate-700 rounded-lg hover:bg-slate-50 transition ml-1"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-red-500 ring-2 ring-white" />
            </button>
            <Link
              href="/listings/create"
              className="ml-2 flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-lg transition"
            >
              <Plus className="w-3.5 h-3.5" />
              Sell
            </Link>
            <Link
              href="/auth/login"
              className="ml-1.5 px-3 py-2 text-sm font-medium text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-50 transition"
            >
              Log in
            </Link>
          </nav>

          {/* Mobile toggle */}
          <button
            type="button"
            aria-label="Toggle menu"
            className="md:hidden ml-auto p-2 text-slate-500 hover:bg-slate-50 rounded-lg transition"
            onClick={() => setOpen(!open)}
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-slate-100 bg-white px-4 py-3 space-y-1">
          <div className="relative mb-3">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Search listings..."
              className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          {[
            { href: "/marketplace", label: "Browse" },
            { href: "/listings/create", label: "Sell something" },
            { href: "/dashboard", label: "Dashboard" },
          ].map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="block px-3 py-2.5 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
          <hr className="border-slate-100 my-1" />
          <Link href="/auth/login" className="block px-3 py-2.5 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition">
            Log in
          </Link>
          <Link href="/auth/register" className="block px-3 py-2.5 rounded-lg bg-indigo-600 text-white text-sm font-semibold text-center hover:bg-indigo-700 transition">
            Create account
          </Link>
        </div>
      )}
    </header>
  );
}
