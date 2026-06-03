"use client";

import { useState } from "react";
import { mockListings } from "@/lib/mock-data";
import { formatCurrency, formatDate } from "@/lib/utils";
import Badge from "@/components/ui/Badge";

export default function AdminListingsPage() {
  const [search, setSearch] = useState("");
  const [listings, setListings] = useState(mockListings);

  const filtered = listings.filter(
    (l) =>
      l.title.toLowerCase().includes(search.toLowerCase()) ||
      l.seller.name.toLowerCase().includes(search.toLowerCase())
  );

  const toggleActive = (id: string) => {
    setListings((prev) =>
      prev.map((l) => (l.id === id ? { ...l, isActive: !l.isActive } : l))
    );
  };

  const toggleFeatured = (id: string) => {
    setListings((prev) =>
      prev.map((l) => (l.id === id ? { ...l, isFeatured: !l.isFeatured } : l))
    );
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Listings</h1>
          <p className="text-slate-500 mt-1">{listings.length} total · {listings.filter((l) => l.isActive).length} active · {listings.filter((l) => l.isFeatured).length} featured</p>
        </div>
      </div>

      {/* Search */}
      <div className="relative mb-5">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">🔍</span>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search listings or sellers..."
          className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="text-left px-5 py-3 font-semibold text-slate-600">Listing</th>
                <th className="text-left px-4 py-3 font-semibold text-slate-600 hidden sm:table-cell">Seller</th>
                <th className="text-left px-4 py-3 font-semibold text-slate-600">Price</th>
                <th className="text-left px-4 py-3 font-semibold text-slate-600 hidden md:table-cell">Views</th>
                <th className="text-left px-4 py-3 font-semibold text-slate-600 hidden lg:table-cell">Date</th>
                <th className="text-left px-4 py-3 font-semibold text-slate-600">Featured</th>
                <th className="text-left px-4 py-3 font-semibold text-slate-600">Active</th>
                <th className="text-right px-5 py-3 font-semibold text-slate-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((listing) => (
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
                  <td className="px-4 py-3 hidden sm:table-cell">
                    <div className="flex items-center gap-2">
                      <img src={listing.seller.avatar} alt={listing.seller.name} className="w-6 h-6 rounded-full" />
                      <span className="text-slate-600">{listing.seller.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 font-bold text-indigo-600">{formatCurrency(listing.price)}</td>
                  <td className="px-4 py-3 text-slate-500 hidden md:table-cell">👁 {listing.views}</td>
                  <td className="px-4 py-3 text-slate-400 text-xs hidden lg:table-cell">{formatDate(listing.createdAt)}</td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => toggleFeatured(listing.id)}
                      className={`text-lg transition ${listing.isFeatured ? "text-amber-400" : "text-slate-300 hover:text-amber-300"}`}
                      title="Toggle featured"
                    >
                      ★
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => toggleActive(listing.id)}
                      className={`relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors ${listing.isActive ? "bg-indigo-600" : "bg-slate-200"}`}
                    >
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${listing.isActive ? "translate-x-4" : "translate-x-0"}`} />
                    </button>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <button className="text-xs text-indigo-600 hover:underline">View</button>
                      <button className="text-xs text-red-500 hover:text-red-700">Remove</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-5 py-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>Showing {filtered.length} of {listings.length} listings</span>
          <div className="flex gap-1">
            <button className="px-2 py-1 rounded border border-slate-200 hover:bg-slate-50">← Prev</button>
            <button className="px-2 py-1 rounded border border-indigo-500 bg-indigo-50 text-indigo-700">1</button>
            <button className="px-2 py-1 rounded border border-slate-200 hover:bg-slate-50">Next →</button>
          </div>
        </div>
      </div>
    </div>
  );
}
