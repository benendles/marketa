import Link from "next/link";
import {
  ChevronRight, Truck, Shield, RotateCcw, Headphones,
  Laptop, Shirt, Home, Dumbbell, Car, Wrench, Building2, Briefcase,
  type LucideIcon,
} from "lucide-react";
import { mockListings } from "@/lib/mock-data";
import ListingCard from "@/components/marketplace/ListingCard";

/* ─── data ─── */
const CATEGORIES: { name: string; Icon: LucideIcon }[] = [
  { name: "Electronics", Icon: Laptop },
  { name: "Fashion", Icon: Shirt },
  { name: "Home & Garden", Icon: Home },
  { name: "Sports", Icon: Dumbbell },
  { name: "Vehicles", Icon: Car },
  { name: "Services", Icon: Wrench },
  { name: "Real Estate", Icon: Building2 },
  { name: "Jobs", Icon: Briefcase },
];

const DEALS = [
  { label: "Up to 40% off", sub: "Electronics", img: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&q=80" },
  { label: "New arrivals", sub: "Fashion", img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&q=80" },
  { label: "Best sellers", sub: "Home & Garden", img: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=300&q=80" },
  { label: "Starting at $19", sub: "Sports", img: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&q=80" },
];

const TRUST = [
  { Icon: Truck, label: "Free delivery", sub: "On qualifying orders" },
  { Icon: Shield, label: "Secure payments", sub: "Stripe-protected checkout" },
  { Icon: RotateCcw, label: "Easy returns", sub: "30-day return window" },
  { Icon: Headphones, label: "24/7 support", sub: "Always here to help" },
];

export default function HomePage() {
  const featured = mockListings.filter((l) => l.isFeatured).slice(0, 4);
  const recent = mockListings.slice(0, 8);

  return (
    <div className="bg-[#EAEDED] min-h-screen">

      {/* ── Deals strip ── */}
      <div className="bg-white border-b border-[#D5D9D9]">
        <div className="max-w-375 mx-auto px-4 py-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {DEALS.map((d) => (
              <Link key={d.label} href="/marketplace" className="group block">
                <img
                  src={d.img}
                  alt={d.sub}
                  className="w-full h-36 object-cover mb-2"
                />
                <p className="text-sm font-bold text-[#0F1111] group-hover:text-[#C7511F] transition">{d.label}</p>
                <p className="text-xs text-[#565959]">{d.sub}</p>
                <p className="text-xs text-[#007185] mt-1 flex items-center gap-0.5">
                  See all deals <ChevronRight className="w-3 h-3" />
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* ── Sign in prompt ── */}
      <div className="bg-white border-b border-[#D5D9D9] mt-2">
        <div className="max-w-375 mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <p className="text-sm font-semibold text-[#0F1111]">
            Sign in for personalized recommendations and order tracking
          </p>
          <Link
            href="/auth/login"
            className="shrink-0 px-5 py-2 rounded-full bg-[#FFD814] hover:bg-[#F7CA00] border border-[#FCD200] text-[#0F1111] text-sm font-semibold transition"
          >
            Sign in
          </Link>
        </div>
      </div>

      {/* ── Categories ── */}
      <div className="bg-white mt-2 border-y border-[#D5D9D9]">
        <div className="max-w-375 mx-auto px-4 py-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold text-[#0F1111]">Shop by category</h2>
            <Link href="/marketplace" className="text-sm text-[#007185] hover:text-[#C7511F] flex items-center gap-0.5 transition">
              See all <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="flex gap-5 overflow-x-auto pb-1 scrollbar-none md:grid md:grid-cols-8 md:overflow-visible md:pb-0">
            {CATEGORIES.map(({ name, Icon }) => (
              <Link
                key={name}
                href={`/marketplace?category=${encodeURIComponent(name)}`}
                className="flex flex-col items-center gap-2 group shrink-0 w-16 md:w-auto"
              >
                <div className="w-14 h-14 rounded-full bg-[#EAEDED] group-hover:bg-[#FFD814] transition flex items-center justify-center">
                  <Icon className="w-6 h-6 text-[#131921]" strokeWidth={1.5} />
                </div>
                <span className="text-[11px] font-medium text-[#0F1111] text-center leading-tight">
                  {name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* ── Featured ── */}
      <div className="bg-white mt-2 border-y border-[#D5D9D9]">
        <div className="max-w-375 mx-auto px-4 py-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold text-[#0F1111]">Today&apos;s featured deals</h2>
            <Link href="/marketplace" className="text-sm text-[#007185] hover:text-[#C7511F] flex items-center gap-0.5 transition">
              See all <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {featured.map((l) => <ListingCard key={l.id} listing={l} />)}
          </div>
        </div>
      </div>

      {/* ── More listings ── */}
      <div className="bg-white mt-2 border-y border-[#D5D9D9]">
        <div className="max-w-375 mx-auto px-4 py-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold text-[#0F1111]">More items to explore</h2>
            <Link href="/marketplace" className="text-sm text-[#007185] hover:text-[#C7511F] flex items-center gap-0.5 transition">
              See all <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
            {recent.map((l) => <ListingCard key={l.id} listing={l} />)}
          </div>
          <div className="mt-5 text-center">
            <Link
              href="/marketplace"
              className="inline-block px-8 py-2.5 rounded-full bg-[#FFD814] hover:bg-[#F7CA00] border border-[#FCD200] text-[#0F1111] text-sm font-semibold transition"
            >
              See all listings
            </Link>
          </div>
        </div>
      </div>

      {/* ── Trust badges ── */}
      <div className="bg-white mt-2 border-y border-[#D5D9D9]">
        <div className="max-w-375 mx-auto px-4 py-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {TRUST.map(({ Icon, label, sub }) => (
              <div key={label} className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-full bg-[#EAEDED] flex items-center justify-center shrink-0">
                  <Icon className="w-4 h-4 text-[#131921]" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#0F1111]">{label}</p>
                  <p className="text-xs text-[#565959] mt-0.5">{sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Sell CTA ── */}
      <div className="bg-white mt-2 border-y border-[#D5D9D9]">
        <div className="max-w-375 mx-auto px-4 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="text-base font-bold text-[#0F1111]">Start selling today</p>
            <p className="text-sm text-[#565959] mt-0.5">Post your first listing in under 2 minutes. Free to join.</p>
          </div>
          <Link
            href="/listings/create"
            className="shrink-0 px-6 py-2.5 rounded-full bg-[#FFD814] hover:bg-[#F7CA00] border border-[#FCD200] text-[#0F1111] text-sm font-semibold transition flex items-center gap-1.5"
          >
            Post an item <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

    </div>
  );
}
