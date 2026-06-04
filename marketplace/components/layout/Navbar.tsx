"use client";

import Link from "next/link";
import { useState } from "react";
import { Search, MapPin, ShoppingCart, ChevronDown, Menu, X } from "lucide-react";

const SEARCH_CATS = [
  "All", "Electronics", "Fashion", "Home & Garden",
  "Sports", "Vehicles", "Services", "Real Estate", "Jobs",
];

const SUB_LINKS = [
  { label: "Today's Deals", href: "/marketplace" },
  { label: "Customer Service", href: "/" },
  { label: "Sell", href: "/listings/create" },
  { label: "Electronics", href: "/marketplace?category=Electronics" },
  { label: "Fashion", href: "/marketplace?category=Fashion" },
  { label: "Home & Garden", href: "/marketplace?category=Home+%26+Garden" },
  { label: "Sports", href: "/marketplace?category=Sports" },
  { label: "Vehicles", href: "/marketplace?category=Vehicles" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50">

      {/* ── Main bar ── */}
      <div className="bg-[#131921]">
        <div className="max-w-375 mx-auto px-3 flex items-center gap-2 py-2">

          {/* Logo */}
          <Link href="/" className="flex items-center border border-transparent hover:border-white rounded px-2 py-1 shrink-0 mr-1">
            <span className="text-white font-black text-xl tracking-tight leading-none">marketa</span>
            <span className="text-[#FF9900] font-black text-xl leading-none">.com</span>
          </Link>

          {/* Deliver to */}
          <div className="hidden lg:flex flex-col cursor-pointer border border-transparent hover:border-white rounded px-2 py-1 shrink-0">
            <span className="text-[#ccc] text-[11px] leading-none">Deliver to</span>
            <div className="flex items-center gap-0.5 mt-0.5">
              <MapPin className="w-3.5 h-3.5 text-white shrink-0" />
              <span className="text-white text-sm font-bold leading-none">United States</span>
            </div>
          </div>

          {/* Search bar */}
          <div className="flex flex-1 rounded-lg overflow-hidden h-10 shadow-sm">
            <select
              title="Search category"
              className="bg-[#F3F3F3] text-[#0F1111] text-xs border-r border-[#CDCDCD] pl-2 pr-6 focus:outline-none appearance-none cursor-pointer shrink-0 hidden sm:block"
            >
              {SEARCH_CATS.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Search Marketa"
              className="flex-1 px-3 py-2 text-[#0F1111] text-sm focus:outline-none min-w-0"
            />
            <button
              type="button"
              aria-label="Search"
              className="bg-[#FF9900] hover:bg-[#F3A847] transition px-4 flex items-center justify-center shrink-0"
            >
              <Search className="w-5 h-5 text-[#131921]" />
            </button>
          </div>

          {/* Account */}
          <Link href="/auth/login" className="hidden md:flex flex-col border border-transparent hover:border-white rounded px-2 py-1 cursor-pointer shrink-0">
            <span className="text-[#ccc] text-[11px] leading-none">Hello, sign in</span>
            <div className="flex items-center gap-0.5 mt-0.5">
              <span className="text-white text-sm font-bold leading-none">Account & Lists</span>
              <ChevronDown className="w-3 h-3 text-white" />
            </div>
          </Link>

          {/* Returns */}
          <Link href="/dashboard/bookings" className="hidden lg:flex flex-col border border-transparent hover:border-white rounded px-2 py-1 shrink-0">
            <span className="text-[#ccc] text-[11px] leading-none">Returns</span>
            <span className="text-white text-sm font-bold leading-none mt-0.5">&amp; Orders</span>
          </Link>

          {/* Cart */}
          <Link href="/dashboard" className="flex items-end gap-1 border border-transparent hover:border-white rounded px-2 py-1 shrink-0">
            <div className="relative">
              <ShoppingCart className="w-8 h-8 text-white" />
              <span className="absolute -top-1 left-3.5 bg-[#FF9900] text-[#131921] text-[11px] font-extrabold rounded-full w-5 h-5 flex items-center justify-center leading-none">
                3
              </span>
            </div>
            <span className="text-white text-sm font-bold pb-0.5 hidden sm:block">Cart</span>
          </Link>

          {/* Mobile toggle */}
          <button
            type="button"
            aria-label="Menu"
            className="md:hidden border border-transparent hover:border-white rounded p-1.5 text-white"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* ── Sub nav ── */}
      <div className="bg-[#232F3E] text-white hidden md:block">
        <div className="max-w-375 mx-auto px-2 flex items-center overflow-x-auto scrollbar-none">
          <button
            type="button"
            className="flex items-center gap-1.5 px-3 py-2 text-sm font-bold hover:bg-white/10 rounded transition whitespace-nowrap shrink-0"
          >
            <Menu className="w-4 h-4" />
            All
          </button>
          {SUB_LINKS.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              className="px-3 py-2 text-sm hover:bg-white/10 rounded transition whitespace-nowrap shrink-0"
            >
              {l.label}
            </Link>
          ))}
        </div>
      </div>

      {/* ── Mobile menu ── */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 px-4 py-3 space-y-1">
          <div className="flex rounded-lg overflow-hidden border border-gray-300 mb-3">
            <input
              type="text"
              placeholder="Search Marketa"
              className="flex-1 px-3 py-2.5 text-sm focus:outline-none"
            />
            <button type="button" aria-label="Search" className="bg-[#FF9900] px-4">
              <Search className="w-4 h-4 text-[#131921]" />
            </button>
          </div>
          {[
            { href: "/auth/login", label: "Sign in" },
            { href: "/marketplace", label: "Browse listings" },
            { href: "/listings/create", label: "Sell" },
            { href: "/dashboard", label: "Account" },
          ].map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="block px-3 py-2.5 text-sm font-medium text-[#0F1111] hover:bg-[#EAEDED] rounded transition"
              onClick={() => setMobileOpen(false)}
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
