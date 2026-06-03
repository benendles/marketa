"use client";

import { useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { mockListings } from "@/lib/mock-data";
import { formatCurrency, formatDate } from "@/lib/utils";
import Badge from "@/components/ui/Badge";
import { use } from "react";

export default function ListingDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const listing = mockListings.find((l) => l.id === id);
  const [selectedImage, setSelectedImage] = useState(0);
  const [bookingDate, setBookingDate] = useState("");
  const [message, setMessage] = useState("");
  const [activeTab, setActiveTab] = useState<"details" | "seller" | "reviews">("details");
  const [saved, setSaved] = useState(false);
  const [bookingSubmitted, setBookingSubmitted] = useState(false);

  if (!listing) notFound();

  const related = mockListings.filter((l) => l.id !== listing.id && l.category === listing.category).slice(0, 3);

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingSubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="text-sm text-slate-500 mb-6 flex items-center gap-2">
        <Link href="/" className="hover:text-indigo-600">Home</Link>
        <span>/</span>
        <Link href="/marketplace" className="hover:text-indigo-600">Marketplace</Link>
        <span>/</span>
        <Link href={`/marketplace?category=${listing.category}`} className="hover:text-indigo-600">{listing.category}</Link>
        <span>/</span>
        <span className="text-slate-900 truncate max-w-xs">{listing.title}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Images + Details */}
        <div className="lg:col-span-2">
          {/* Image gallery */}
          <div className="mb-6">
            <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-100 mb-3">
              <img
                src={listing.images[selectedImage]}
                alt={listing.title}
                className="w-full h-full object-cover"
              />
              {listing.isFeatured && (
                <div className="absolute top-4 left-4">
                  <Badge variant="warning">⭐ Featured</Badge>
                </div>
              )}
              <div className="absolute top-4 right-4">
                <Badge variant="success">{listing.condition}</Badge>
              </div>
              <div className="absolute bottom-4 right-4 flex gap-2">
                <button className="px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-lg text-xs font-medium text-slate-700 hover:bg-white transition">
                  🔍 Zoom
                </button>
              </div>
            </div>
            {listing.images.length > 1 && (
              <div className="flex gap-2">
                {listing.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`w-20 h-16 rounded-xl overflow-hidden border-2 transition ${selectedImage === i ? "border-indigo-500" : "border-slate-200 hover:border-slate-300"}`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Title + actions */}
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <h1 className="text-2xl font-bold text-slate-900 mb-1">{listing.title}</h1>
              <div className="flex items-center gap-3 text-sm text-slate-500">
                <span>📍 {listing.location}</span>
                <span>👁 {listing.views} views</span>
                <span>🤍 {listing.saves} saves</span>
                <span>📅 {formatDate(listing.createdAt)}</span>
              </div>
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <button
                onClick={() => setSaved(!saved)}
                className={`p-2.5 rounded-xl border transition ${saved ? "border-red-200 bg-red-50 text-red-500" : "border-slate-200 bg-white text-slate-400 hover:border-slate-300"}`}
              >
                {saved ? "❤️" : "🤍"}
              </button>
              <button className="p-2.5 rounded-xl border border-slate-200 bg-white text-slate-400 hover:border-slate-300 transition">
                🔗
              </button>
            </div>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-2 mb-6">
            <span className="text-3xl font-extrabold text-indigo-600">
              {formatCurrency(listing.price)}
            </span>
            {listing.category === "Services" && (
              <span className="text-slate-400 text-sm">/ hour</span>
            )}
            <div className="ml-3 flex items-center gap-1 text-sm">
              <span className="text-amber-400">★</span>
              <span className="font-semibold text-slate-900">{listing.rating}</span>
              <span className="text-slate-400">({listing.reviewCount} reviews)</span>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {listing.tags.map((tag) => (
              <span key={tag} className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs">
                #{tag}
              </span>
            ))}
          </div>

          {/* Tabs */}
          <div className="border-b border-slate-200 mb-5">
            <div className="flex gap-1">
              {(["details", "seller", "reviews"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-3 text-sm font-medium capitalize border-b-2 transition -mb-px ${activeTab === tab ? "border-indigo-600 text-indigo-600" : "border-transparent text-slate-500 hover:text-slate-700"}`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {activeTab === "details" && (
            <div>
              <p className="text-slate-700 leading-relaxed mb-4">{listing.description}</p>
              <div className="grid grid-cols-2 gap-4 mt-6">
                {[
                  { label: "Category", value: listing.category },
                  { label: "Condition", value: listing.condition },
                  { label: "Location", value: listing.location },
                  { label: "Listed", value: formatDate(listing.createdAt) },
                ].map((item) => (
                  <div key={item.label} className="bg-slate-50 rounded-xl p-4">
                    <p className="text-xs text-slate-500 mb-1">{item.label}</p>
                    <p className="font-semibold text-slate-900 text-sm">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "seller" && (
            <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-2xl">
              <img src={listing.seller.avatar} alt={listing.seller.name} className="w-16 h-16 rounded-xl" />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-bold text-slate-900">{listing.seller.name}</h3>
                  {listing.seller.isVerified && <Badge variant="success">✓ Verified</Badge>}
                </div>
                <p className="text-sm text-slate-500 mb-2">{listing.seller.bio}</p>
                <div className="flex items-center gap-4 text-sm text-slate-500">
                  <span>⭐ {listing.seller.rating} ({listing.seller.reviewCount} reviews)</span>
                  <span>📅 Joined {formatDate(listing.seller.joinedAt)}</span>
                </div>
                <div className="mt-3 flex gap-2">
                  <Link href={`/profile/${listing.seller.id}`} className="px-4 py-2 border border-slate-200 bg-white rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50 transition">
                    View Profile
                  </Link>
                </div>
              </div>
            </div>
          )}

          {activeTab === "reviews" && (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="border border-slate-200 rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=review${i}`} alt="Reviewer" className="w-8 h-8 rounded-full" />
                    <div>
                      <p className="font-semibold text-sm text-slate-900">Anonymous User</p>
                      <div className="flex text-amber-400 text-xs">{"★★★★★"}</div>
                    </div>
                  </div>
                  <p className="text-sm text-slate-600">Great item, exactly as described. Fast communication and smooth transaction.</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right: Booking card */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sticky top-20 shadow-sm">
            <div className="text-center mb-6">
              <span className="text-3xl font-extrabold text-indigo-600">{formatCurrency(listing.price)}</span>
              {listing.category === "Services" && <span className="text-slate-400 text-sm">/hr</span>}
            </div>

            {bookingSubmitted ? (
              <div className="text-center py-4">
                <div className="text-4xl mb-3">✅</div>
                <h3 className="font-bold text-slate-900 mb-1">Request Sent!</h3>
                <p className="text-sm text-slate-500">The seller will respond within 24 hours.</p>
                <Link href="/dashboard/bookings" className="mt-4 block text-sm text-indigo-600 hover:underline">View in Bookings →</Link>
              </div>
            ) : (
              <form onSubmit={handleBooking} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Preferred Date</label>
                  <input
                    type="date"
                    value={bookingDate}
                    onChange={(e) => setBookingDate(e.target.value)}
                    required
                    min={new Date().toISOString().split("T")[0]}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Message to Seller</label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="I'm interested in this item. Is it still available?"
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                  />
                </div>

                <div className="border-t border-slate-100 pt-4 space-y-2 text-sm">
                  <div className="flex justify-between text-slate-600">
                    <span>Item price</span>
                    <span>{formatCurrency(listing.price)}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Platform fee (3%)</span>
                    <span>{formatCurrency(listing.price * 0.03)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-slate-900 border-t border-slate-100 pt-2">
                    <span>Total</span>
                    <span>{formatCurrency(listing.price * 1.03)}</span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition"
                >
                  Request Booking
                </button>
                <button
                  type="button"
                  className="w-full py-3 border border-slate-200 text-slate-700 font-medium rounded-xl hover:bg-slate-50 transition text-sm"
                >
                  💬 Message Seller
                </button>
              </form>
            )}

            <div className="mt-4 flex items-center justify-center gap-2 text-xs text-slate-400">
              <span>🔒</span>
              <span>Secure payment via Stripe · Buyer protected</span>
            </div>
          </div>
        </div>
      </div>

      {/* Related listings */}
      {related.length > 0 && (
        <div className="mt-16">
          <h2 className="text-xl font-bold text-slate-900 mb-6">More in {listing.category}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {related.map((l) => (
              <Link key={l.id} href={`/listings/${l.id}`} className="bg-white rounded-2xl border border-slate-200 hover:border-indigo-300 hover:shadow-md transition overflow-hidden group">
                <div className="h-40 overflow-hidden">
                  <img src={l.images[0]} alt={l.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                </div>
                <div className="p-4">
                  <p className="font-semibold text-slate-900 text-sm mb-1 truncate group-hover:text-indigo-600">{l.title}</p>
                  <p className="text-indigo-600 font-bold text-sm">{formatCurrency(l.price)}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
