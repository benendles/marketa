"use client";

import Link from "next/link";
import { useState } from "react";
import { Heart, Star, MapPin } from "lucide-react";
import type { Listing } from "@/types";

interface ListingCardProps {
  listing: Listing;
  compact?: boolean;
}

export default function ListingCard({ listing, compact = false }: ListingCardProps) {
  const [saved, setSaved] = useState(false);

  return (
    <div className="bg-white border border-[#D5D9D9] flex flex-col group hover:shadow-md transition-shadow duration-150">
      {/* Image */}
      <Link href={`/listings/${listing.id}`} className="block relative overflow-hidden bg-white">
        <div className={`relative ${compact ? "h-36" : "h-48"} flex items-center justify-center p-2`}>
          <img
            src={listing.images[0]}
            alt={listing.title}
            className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
          />
          {listing.isFeatured && (
            <span className="absolute top-2 left-2 bg-[#CC0C39] text-white text-[10px] font-bold px-1.5 py-0.5">
              Best Seller
            </span>
          )}
          <button
            type="button"
            aria-label={saved ? "Remove from saved" : "Save listing"}
            className="absolute top-2 right-2 w-7 h-7 bg-white border border-[#D5D9D9] rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition shadow-sm"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setSaved(!saved);
            }}
          >
            <Heart className={`w-3.5 h-3.5 ${saved ? "fill-[#CC0C39] text-[#CC0C39]" : "text-[#565959]"}`} />
          </button>
        </div>
      </Link>

      {/* Body */}
      <div className="px-3 pb-3 pt-2 flex flex-col flex-1">
        <Link href={`/listings/${listing.id}`}>
          <h3 className="text-sm text-[#0F1111] line-clamp-2 leading-snug hover:text-[#C7511F] transition-colors cursor-pointer">
            {listing.title}
          </h3>
        </Link>

        {/* Stars */}
        <div className="flex items-center gap-1 mt-1.5">
          <div className="flex items-center gap-px">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star
                key={i}
                className={`w-3 h-3 ${i <= Math.round(listing.rating) ? "fill-[#FF9900] text-[#FF9900]" : "fill-[#ddd] text-[#ddd]"}`}
              />
            ))}
          </div>
          <span className="text-xs text-[#007185]">({listing.reviewCount})</span>
        </div>

        {/* Price */}
        <div className="mt-2">
          <span className="text-lg font-bold text-[#0F1111] leading-none">
            ${Math.floor(listing.price).toLocaleString()}
          </span>
          <span className="text-xs text-[#565959]">
            .{String((listing.price % 1).toFixed(2)).substring(2)}
          </span>
        </div>

        <p className="text-xs text-[#007185] mt-0.5">FREE delivery</p>

        <div className="flex items-center gap-1 mt-0.5">
          <MapPin className="w-3 h-3 text-[#565959] shrink-0" />
          <p className="text-xs text-[#565959] truncate">{listing.location}</p>
        </div>

        {/* CTA */}
        <Link
          href={`/listings/${listing.id}`}
          className="mt-auto pt-3 block"
        >
          <span className="block w-full text-center py-1.5 rounded-full bg-[#FFD814] hover:bg-[#F7CA00] border border-[#FCD200] text-[#0F1111] text-xs font-semibold transition cursor-pointer">
            View listing
          </span>
        </Link>
      </div>
    </div>
  );
}
