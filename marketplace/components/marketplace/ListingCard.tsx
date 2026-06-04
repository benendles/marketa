"use client";

import Link from "next/link";
import { useState } from "react";
import { Heart, Star } from "lucide-react";
import type { Listing } from "@/types";
import { formatCurrency } from "@/lib/utils";

interface ListingCardProps {
  listing: Listing;
  compact?: boolean;
}

function StarRating({ rating, count }: { rating: number; count: number }) {
  return (
    <div className="flex items-center gap-1.5 mt-1">
      <div className="flex items-center gap-px">
        {[1, 2, 3, 4, 5].map((i) => (
          <Star
            key={i}
            className={`w-3.5 h-3.5 ${
              i <= Math.round(rating)
                ? "fill-[#FF9900] text-[#FF9900]"
                : "fill-[#ddd] text-[#ddd]"
            }`}
          />
        ))}
      </div>
      <span className="text-[#007185] text-xs hover:text-[#C7511F] cursor-pointer">
        {count.toLocaleString()}
      </span>
    </div>
  );
}

export default function ListingCard({ listing, compact = false }: ListingCardProps) {
  const [saved, setSaved] = useState(false);

  return (
    <div className="bg-white group flex flex-col h-full hover:shadow-md transition-shadow duration-150 border border-transparent hover:border-[#D5D9D9] rounded-sm overflow-hidden">
      {/* Image */}
      <Link href={`/listings/${listing.id}`} className="block">
        <div className={`relative overflow-hidden bg-white flex items-center justify-center p-3 ${compact ? "h-40" : "h-52"}`}>
          <img
            src={listing.images[0]}
            alt={listing.title}
            className="w-full h-full object-contain group-hover:scale-[1.04] transition-transform duration-300"
          />
          {listing.isFeatured && (
            <span className="absolute top-2 left-2 bg-[#CC0C39] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-sm">
              Best Seller
            </span>
          )}
          <button
            type="button"
            aria-label={saved ? "Remove from list" : "Add to list"}
            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition w-7 h-7 bg-white rounded-full flex items-center justify-center shadow border border-[#D5D9D9]"
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

      {/* Details */}
      <div className="px-3 pb-3 pt-1 flex flex-col flex-1">
        <Link href={`/listings/${listing.id}`}>
          <h3 className="text-sm text-[#0F1111] hover:text-[#C7511F] line-clamp-2 leading-snug cursor-pointer transition-colors">
            {listing.title}
          </h3>
        </Link>

        <StarRating rating={listing.rating} count={listing.reviewCount} />

        {/* Price */}
        <div className="mt-2">
          <span className="text-xs text-[#565959] align-top leading-5">$</span>
          <span className="text-xl font-medium text-[#0F1111] leading-none">
            {Math.floor(listing.price).toLocaleString()}
          </span>
          <span className="text-xs text-[#565959]">
            .{String(listing.price % 1).substring(2).padEnd(2, "0") || "00"}
          </span>
        </div>

        <p className="text-xs text-[#007185] mt-0.5">FREE delivery</p>
        <p className="text-xs text-[#565959] mt-0.5 truncate">{listing.location}</p>

        {/* Add to cart button */}
        <Link
          href={`/listings/${listing.id}`}
          className="mt-auto pt-3 block"
        >
          <span className="block w-full text-center py-1.5 px-3 rounded-full bg-[#FFD814] hover:bg-[#F7CA00] text-[#0F1111] text-sm font-medium border border-[#FCD200] transition cursor-pointer">
            View listing
          </span>
        </Link>
      </div>
    </div>
  );
}
