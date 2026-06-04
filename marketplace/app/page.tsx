import Link from "next/link";
import { Star, ChevronRight, Truck, Shield, RotateCcw, Headphones } from "lucide-react";
import { mockListings, CATEGORIES } from "@/lib/mock-data";
import ListingCard from "@/components/marketplace/ListingCard";
import { formatCurrency } from "@/lib/utils";

const TRUST_BADGES = [
  { Icon: Truck, label: "Free delivery", sub: "On orders over $35" },
  { Icon: Shield, label: "Secure payments", sub: "Stripe-protected checkout" },
  { Icon: RotateCcw, label: "Easy returns", sub: "30-day return policy" },
  { Icon: Headphones, label: "24/7 support", sub: "Always here to help" },
];

const DEALS = [
  { label: "Up to 40% off", sub: "Electronics", img: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&q=80" },
  { label: "New arrivals", sub: "Fashion", img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&q=80" },
  { label: "Best sellers", sub: "Home & Garden", img: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=300&q=80" },
  { label: "Starting at $19", sub: "Sports & Outdoor", img: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&q=80" },
];

export default function HomePage() {
  const allListings = mockListings;
  const featured = allListings.filter((l) => l.isFeatured).slice(0, 4);
  const electronics = allListings.filter((l) => l.category === "Electronics").slice(0, 4);
  const recent = allListings.slice(0, 8);

  return (
    <div className="bg-[#EAEDED] min-h-screen">

      {/* ── Hero banner ── */}
      <div className="relative overflow-hidden bg-linear-to-b from-[#1a3c5e] to-[#EAEDED]">
        <div className="max-w-375 mx-auto px-4 py-12 sm:py-16 flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1 text-center md:text-left">
            <p className="text-[#FF9900] text-sm font-semibold mb-2 tracking-wide uppercase">
              Welcome to Marketa
            </p>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight mb-4">
              Buy &amp; Sell<br />
              <span className="text-[#FF9900]">Anything.</span> Anywhere.
            </h1>
            <p className="text-slate-300 text-base mb-6 max-w-md mx-auto md:mx-0">
              Millions of items — from electronics to fashion, services to real estate.
              Secure payments. Verified sellers. Real-time chat.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
              <Link
                href="/marketplace"
                className="px-6 py-3 rounded-full bg-[#FF9900] hover:bg-[#F3A847] text-[#131921] font-bold text-sm transition"
              >
                Shop now
              </Link>
              <Link
                href="/listings/create"
                className="px-6 py-3 rounded-full bg-white hover:bg-[#EAEDED] text-[#0F1111] font-bold text-sm transition border border-[#D5D9D9]"
              >
                Start selling
              </Link>
            </div>
          </div>

          {/* Hero listing cards */}
          <div className="hidden md:flex gap-3">
            {allListings.slice(0, 2).map((l) => (
              <Link key={l.id} href={`/listings/${l.id}`}>
                <div className="bg-white rounded shadow p-3 w-44 hover:shadow-md transition">
                  <img src={l.images[0]} alt={l.title} className="w-full h-32 object-cover rounded mb-2" />
                  <p className="text-xs font-medium text-[#0F1111] line-clamp-2 leading-snug mb-1">{l.title}</p>
                  <p className="text-sm font-bold text-[#B12704]">{formatCurrency(l.price)}</p>
                  <div className="flex gap-px mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-3 h-3 ${i < Math.round(l.rating) ? "fill-[#FF9900] text-[#FF9900]" : "fill-[#ddd] text-[#ddd]"}`} />
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-375 mx-auto px-3 sm:px-4 space-y-4 pb-10">

        {/* ── Today's deals cards ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {DEALS.map((d) => (
            <Link key={d.label} href="/marketplace" className="bg-white p-4 shadow-sm hover:shadow transition rounded-sm">
              <img src={d.img} alt={d.sub} className="w-full h-36 object-cover mb-3 rounded" />
              <p className="font-bold text-[#0F1111] text-sm">{d.label}</p>
              <p className="text-xs text-[#565959]">{d.sub}</p>
              <p className="text-xs text-[#007185] mt-2 flex items-center gap-0.5">
                See all deals <ChevronRight className="w-3 h-3" />
              </p>
            </Link>
          ))}
        </div>

        {/* ── Sign in banner ── */}
        <div className="bg-white shadow-sm rounded-sm px-5 py-4 flex items-center justify-between gap-4">
          <div>
            <p className="font-bold text-[#0F1111]">Sign in for the best experience</p>
            <p className="text-sm text-[#565959]">Personalized recommendations, order tracking, and saved listings.</p>
          </div>
          <Link
            href="/auth/login"
            className="shrink-0 px-5 py-2 rounded-full bg-[#FFD814] hover:bg-[#F7CA00] border border-[#FCD200] text-[#0F1111] text-sm font-medium transition"
          >
            Sign in
          </Link>
        </div>

        {/* ── Shop by category ── */}
        <div className="bg-white shadow-sm rounded-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-[#0F1111]">Shop by category</h2>
            <Link href="/marketplace" className="text-sm text-[#007185] hover:text-[#C7511F] flex items-center gap-0.5 transition">
              See all <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="grid grid-cols-4 sm:grid-cols-8 gap-3">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.name}
                href={`/marketplace?category=${cat.name}`}
                className="flex flex-col items-center gap-2 group text-center"
              >
                <div className="w-14 h-14 rounded-full bg-[#EAEDED] group-hover:bg-[#FFD814] transition flex items-center justify-center overflow-hidden">
                  <div className="w-8 h-8 bg-[#131921] rounded-full opacity-20 group-hover:opacity-30" />
                </div>
                <span className="text-xs font-medium text-[#0F1111] leading-tight group-hover:text-[#C7511F] transition">
                  {cat.name}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* ── Featured listings ── */}
        <div className="bg-white shadow-sm rounded-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-[#0F1111]">Today&apos;s featured deals</h2>
            <Link href="/marketplace" className="text-sm text-[#007185] hover:text-[#C7511F] flex items-center gap-0.5 transition">
              See all <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-1">
            {featured.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        </div>

        {/* ── Electronics ── */}
        <div className="bg-white shadow-sm rounded-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-[#0F1111]">Electronics</h2>
            <Link href="/marketplace?category=Electronics" className="text-sm text-[#007185] hover:text-[#C7511F] flex items-center gap-0.5 transition">
              See more <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-1">
            {electronics.length > 0
              ? electronics.map((l) => <ListingCard key={l.id} listing={l} />)
              : recent.slice(0, 4).map((l) => <ListingCard key={l.id} listing={l} />)}
          </div>
        </div>

        {/* ── All listings ── */}
        <div className="bg-white shadow-sm rounded-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-[#0F1111]">More items to explore</h2>
            <Link href="/marketplace" className="text-sm text-[#007185] hover:text-[#C7511F] flex items-center gap-0.5 transition">
              See all <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-1">
            {recent.map((l) => <ListingCard key={l.id} listing={l} />)}
          </div>
          <div className="mt-4 text-center">
            <Link
              href="/marketplace"
              className="inline-block px-8 py-2.5 rounded-full bg-[#FFD814] hover:bg-[#F7CA00] border border-[#FCD200] text-[#0F1111] text-sm font-medium transition"
            >
              See all listings
            </Link>
          </div>
        </div>

        {/* ── Trust badges ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {TRUST_BADGES.map(({ Icon, label, sub }) => (
            <div key={label} className="bg-white shadow-sm rounded-sm p-4 flex items-start gap-3">
              <Icon className="w-6 h-6 text-[#FF9900] shrink-0 mt-0.5" strokeWidth={1.5} />
              <div>
                <p className="text-sm font-semibold text-[#0F1111]">{label}</p>
                <p className="text-xs text-[#565959] mt-0.5">{sub}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
