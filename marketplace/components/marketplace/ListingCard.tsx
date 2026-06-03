"use client";

import Link from "next/link";
import { useState } from "react";
import { Heart, MapPin, Star } from "lucide-react";
import type { Listing } from "@/types";
import { formatCurrency } from "@/lib/utils";

interface ListingCardProps {
  listing: Listing;
  compact?: boolean;
}

export default function ListingCard({ listing, compact = false }: ListingCardProps) {
  const [saved, setSaved] = useState(false);

  return (
    <Link href={`/listings/${listing.id}`} className="group block">
      <div className="bg-white rounded-xl overflow-hidden border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all duration-200">
        {/* Image */}
        <div className={`relative overflow-hidden bg-slate-100 ${compact ? "h-36" : "h-48"}`}>
          <img
            src={listing.images[0]}
            alt={listing.title}
            className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
          />
          {listing.isFeatured && (
            <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded text-xs font-semibold bg-amber-400 text-amber-900">
              Featured
            </span>
          )}
          <button
            type="button"
            aria-label={saved ? "Remove from saved" : "Save listing"}
            className="absolute bottom-2.5 right-2.5 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow border border-slate-100 opacity-0 group-hover:opacity-100 transition"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setSaved(!saved);
            }}
          >
            <Heart className={`w-4 h-4 transition-colors ${saved ? "fill-red-500 text-red-500" : "text-slate-400"}`} />
          </button>
        </div>

        {/* Content */}
        <div className="p-3.5">
          <h3 className="font-semibold text-slate-900 text-sm leading-snug line-clamp-2 group-hover:text-indigo-600 transition-colors mb-2">
            {listing.title}
          </h3>
          <div className="flex items-center gap-1 text-xs text-slate-400 mb-3">
            <MapPin className="w-3 h-3 shrink-0" />
            <span className="truncate">{listing.location}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-bold text-slate-900 text-sm">
              {formatCurrency(listing.price)}
              {listing.category === "Services" && (
                <span className="text-xs font-normal text-slate-400 ml-0.5">/hr</span>
              )}
            </span>
            <div className="flex items-center gap-1 text-xs text-slate-500">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              <span className="font-medium">{listing.rating}</span>
              <span className="text-slate-300">({listing.reviewCount})</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
