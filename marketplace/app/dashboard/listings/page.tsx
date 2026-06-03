"use client";

import { useState } from "react";
import Link from "next/link";
import { mockListings } from "@/lib/mock-data";
import { formatCurrency, formatDate } from "@/lib/utils";
import Badge from "@/components/ui/Badge";

export default function MyListingsPage() {
  const [listings, setListings] = useState(mockListings.slice(0, 4));

  const toggleActive = (id: string) => {
    setListings((prev) =>
      prev.map((l) => (l.id === id ? { ...l, isActive: !l.isActive } : l))
    );
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">My Listings</h1>
          <p className="text-slate-500 mt-1">{listings.length} listings · {listings.filter((l) => l.isActive).length} active</p>
        </div>
        <Link href="/listings/create" className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-medium hover:bg-indigo-700 transition flex items-center gap-2">
          + New Listing
        </Link>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl border border-slate-200 p-4 text-center">
          <p className="text-xl font-bold text-slate-900">{listings.filter((l) => l.isActive).length}</p>
          <p className="text-xs text-slate-500 mt-0.5">Active</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4 text-center">
          <p className="text-xl font-bold text-slate-900">{listings.reduce((a, l) => a + l.views, 0).toLocaleString()}</p>
          <p className="text-xs text-slate-500 mt-0.5">Total Views</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4 text-center">
          <p className="text-xl font-bold text-slate-900">{listings.reduce((a, l) => a + l.saves, 0)}</p>
          <p className="text-xs text-slate-500 mt-0.5">Total Saves</p>
        </div>
      </div>

      {/* Listings table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="text-left px-5 py-3 font-semibold text-slate-600">Listing</th>
                <th className="text-left px-4 py-3 font-semibold text-slate-600 hidden sm:table-cell">Price</th>
                <th className="text-left px-4 py-3 font-semibold text-slate-600 hidden md:table-cell">Views</th>
                <th className="text-left px-4 py-3 font-semibold text-slate-600 hidden md:table-cell">Saves</th>
                <th className="text-left px-4 py-3 font-semibold text-slate-600 hidden lg:table-cell">Date</th>
                <th className="text-left px-4 py-3 font-semibold text-slate-600">Status</th>
                <th className="text-right px-5 py-3 font-semibold text-slate-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {listings.map((listing) => (
                <tr key={listing.id} className="border-b border-slate-100 hover:bg-slate-50 transition">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <img src={listing.images[0]} alt={listing.title} className="w-10 h-10 rounded-lg object-cover flex-shrink-0" />
                      <div>
                        <p className="font-medium text-slate-900 truncate max-w-[160px]">{listing.title}</p>
                        <p className="text-xs text-slate-400">{listing.category}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 font-bold text-indigo-600 hidden sm:table-cell">{formatCurrency(listing.price)}</td>
                  <td className="px-4 py-3 text-slate-600 hidden md:table-cell">👁 {listing.views}</td>
                  <td className="px-4 py-3 text-slate-600 hidden md:table-cell">🤍 {listing.saves}</td>
                  <td className="px-4 py-3 text-slate-400 hidden lg:table-cell">{formatDate(listing.createdAt)}</td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => toggleActive(listing.id)}
                      className={`relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors ${listing.isActive ? "bg-indigo-600" : "bg-slate-200"}`}
                    >
                      <span className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition-transform ${listing.isActive ? "translate-x-4" : "translate-x-0"}`} />
                    </button>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <Link href={`/listings/${listing.id}`} className="text-xs text-indigo-600 hover:underline">View</Link>
                      <button className="text-xs text-slate-500 hover:text-slate-700">Edit</button>
                      <button className="text-xs text-red-500 hover:text-red-700">Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
