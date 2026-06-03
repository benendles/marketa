"use client";

import { useState } from "react";
import { mockBookings } from "@/lib/mock-data";
import { formatCurrency, formatDate } from "@/lib/utils";
import Badge from "@/components/ui/Badge";
import Link from "next/link";
import type { BookingStatus } from "@/types";

const statusVariant = {
  pending: "warning",
  confirmed: "success",
  completed: "default",
  cancelled: "danger",
} as const;

const TABS: { value: BookingStatus | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "pending", label: "Pending" },
  { value: "confirmed", label: "Confirmed" },
  { value: "completed", label: "Completed" },
  { value: "cancelled", label: "Cancelled" },
];

export default function BookingsPage() {
  const [activeTab, setActiveTab] = useState<BookingStatus | "all">("all");
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered = activeTab === "all" ? mockBookings : mockBookings.filter((b) => b.status === activeTab);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Bookings</h1>
          <p className="text-slate-500 mt-1">{mockBookings.length} total bookings</p>
        </div>
        <Link href="/marketplace" className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-medium hover:bg-indigo-700 transition">
          + New Booking
        </Link>
      </div>

      {/* Status summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {[
          { label: "Pending", count: mockBookings.filter((b) => b.status === "pending").length, color: "text-amber-600 bg-amber-50" },
          { label: "Confirmed", count: mockBookings.filter((b) => b.status === "confirmed").length, color: "text-emerald-600 bg-emerald-50" },
          { label: "Completed", count: mockBookings.filter((b) => b.status === "completed").length, color: "text-indigo-600 bg-indigo-50" },
          { label: "Cancelled", count: mockBookings.filter((b) => b.status === "cancelled").length, color: "text-red-600 bg-red-50" },
        ].map((s) => (
          <div key={s.label} className={`rounded-xl p-3 ${s.color}`}>
            <p className="text-2xl font-extrabold">{s.count}</p>
            <p className="text-xs mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-5 bg-slate-100 p-1 rounded-xl w-fit">
        {TABS.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition ${activeTab === tab.value ? "bg-white text-slate-900 shadow-sm" : "text-slate-600 hover:text-slate-900"}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Booking list */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-200">
            <div className="text-4xl mb-3">📅</div>
            <p className="font-semibold text-slate-900">No {activeTab !== "all" ? activeTab : ""} bookings</p>
            <p className="text-sm text-slate-500 mt-1">Start browsing listings to make a booking.</p>
          </div>
        ) : (
          filtered.map((booking) => (
            <div key={booking.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
              <button
                className="w-full flex items-center gap-4 p-4 text-left hover:bg-slate-50 transition"
                onClick={() => setExpanded(expanded === booking.id ? null : booking.id)}
              >
                <img src={booking.listing.images[0]} alt={booking.listing.title} className="w-16 h-16 rounded-xl object-cover flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-slate-900 truncate">{booking.listing.title}</p>
                  <p className="text-sm text-slate-500">Seller: {booking.seller.name}</p>
                  <p className="text-xs text-slate-400 mt-0.5">📅 {formatDate(booking.startDate)}</p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <Badge variant={statusVariant[booking.status]}>{booking.status}</Badge>
                  <span className="font-bold text-slate-900 text-sm">{formatCurrency(booking.totalAmount)}</span>
                </div>
                <span className="text-slate-400 ml-2">{expanded === booking.id ? "▲" : "▼"}</span>
              </button>

              {expanded === booking.id && (
                <div className="border-t border-slate-100 p-4 bg-slate-50">
                  <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                    <div>
                      <p className="text-slate-500 text-xs mb-1">Booking ID</p>
                      <p className="font-mono text-slate-900">{booking.id}</p>
                    </div>
                    <div>
                      <p className="text-slate-500 text-xs mb-1">Status</p>
                      <Badge variant={statusVariant[booking.status]}>{booking.status}</Badge>
                    </div>
                    {booking.notes && (
                      <div className="col-span-2">
                        <p className="text-slate-500 text-xs mb-1">Notes</p>
                        <p className="text-slate-700">{booking.notes}</p>
                      </div>
                    )}
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    <Link href={`/listings/${booking.listing.id}`} className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-medium text-slate-700 hover:bg-slate-100 transition">
                      View Listing
                    </Link>
                    <button className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-medium text-slate-700 hover:bg-slate-100 transition">
                      💬 Message Seller
                    </button>
                    {booking.status === "pending" && (
                      <button className="px-3 py-1.5 bg-red-50 border border-red-200 rounded-lg text-xs font-medium text-red-600 hover:bg-red-100 transition">
                        Cancel Booking
                      </button>
                    )}
                    {booking.status === "completed" && (
                      <button className="px-3 py-1.5 bg-amber-50 border border-amber-200 rounded-lg text-xs font-medium text-amber-600 hover:bg-amber-100 transition">
                        ⭐ Leave Review
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
