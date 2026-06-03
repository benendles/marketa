import Link from "next/link";
import {
  Search, Shield, MessageSquare, CalendarCheck, Star,
  Smartphone, ShieldCheck, Laptop, Shirt, Home, Dumbbell,
  Car, Wrench, Building2, Briefcase, ArrowRight, MapPin,
  ChevronRight, type LucideIcon,
} from "lucide-react";
import { mockListings } from "@/lib/mock-data";
import ListingCard from "@/components/marketplace/ListingCard";
import { formatCurrency } from "@/lib/utils";

const CATEGORY_ICONS: Record<string, LucideIcon> = {
  Electronics: Laptop,
  Fashion: Shirt,
  "Home & Garden": Home,
  Sports: Dumbbell,
  Vehicles: Car,
  Services: Wrench,
  "Real Estate": Building2,
  Jobs: Briefcase,
};

const CATEGORIES = [
  { name: "Electronics", count: 8432 },
  { name: "Fashion", count: 12847 },
  { name: "Home & Garden", count: 6291 },
  { name: "Sports", count: 4183 },
  { name: "Vehicles", count: 2847 },
  { name: "Services", count: 5621 },
  { name: "Real Estate", count: 1924 },
  { name: "Jobs", count: 3148 },
];

const FEATURES = [
  { Icon: Shield, title: "Secure payments", desc: "Stripe escrow holds funds until you confirm receipt." },
  { Icon: MessageSquare, title: "Direct messaging", desc: "Real-time chat between buyers and sellers." },
  { Icon: CalendarCheck, title: "Booking system", desc: "Schedule pickups and appointments from any listing." },
  { Icon: Star, title: "Verified reviews", desc: "Every review is tied to a completed transaction." },
  { Icon: Smartphone, title: "Mobile app", desc: "Browse, list, chat, and pay on iOS and Android." },
  { Icon: ShieldCheck, title: "Buyer protection", desc: "Disputes resolved within 24 hours, every time." },
];

const STEPS = [
  { num: "1", title: "Create an account", desc: "Sign up in under a minute. No credit card required to browse." },
  { num: "2", title: "Browse or list", desc: "Search thousands of items or post your own in 2 minutes." },
  { num: "3", title: "Chat and agree", desc: "Message the seller directly and close the deal." },
  { num: "4", title: "Pay securely", desc: "Stripe holds your payment until you confirm everything is right." },
];

const TESTIMONIALS = [
  {
    quote: "Sold my camera kit in three days at a price I couldn't find anywhere else. The chat made the whole process seamless.",
    name: "Alex R.",
    role: "Seller · San Francisco",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
  },
  {
    quote: "Found a MacBook Pro for $400 under retail. The verified seller reviews made me confident before I even sent a message.",
    name: "Jordan K.",
    role: "Buyer · Austin",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jordan",
  },
  {
    quote: "I book freelance clients through Marketa every week. The scheduling system handles itself so I can focus on the work.",
    name: "Sam C.",
    role: "Service provider · New York",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sam",
  },
];

export default function HomePage() {
  const featured = mockListings.filter((l) => l.isFeatured).slice(0, 4);
  const heroCards = mockListings.slice(0, 3);

  return (
    <div className="bg-white">

      {/* ─── Hero ─── */}
      <section className="bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 py-14 lg:py-20 items-center">

            {/* Copy */}
            <div className="lg:col-span-3">
              <h1 className="text-4xl sm:text-5xl lg:text-[3.4rem] font-extrabold text-white leading-[1.15] tracking-tight mb-4">
                Buy and sell,<br />
                <span className="text-indigo-400">the right way.</span>
              </h1>
              <p className="text-slate-400 text-lg mb-8 max-w-lg leading-relaxed">
                Direct deals between real people — secure payments, verified reviews, and real-time chat. No middlemen.
              </p>

              {/* Search */}
              <div className="flex max-w-xl rounded-xl bg-white overflow-hidden shadow-xl mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                  <input
                    type="text"
                    placeholder="What are you looking for?"
                    className="w-full pl-11 pr-4 py-4 text-slate-900 text-sm placeholder:text-slate-400 focus:outline-none"
                  />
                </div>
                <select
                  title="Category"
                  className="hidden sm:block border-l border-slate-100 px-4 py-4 text-sm text-slate-600 bg-white focus:outline-none cursor-pointer appearance-none"
                >
                  <option value="">All categories</option>
                  {CATEGORIES.map((c) => (
                    <option key={c.name} value={c.name}>{c.name}</option>
                  ))}
                </select>
                <Link
                  href="/marketplace"
                  className="px-6 py-4 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold transition whitespace-nowrap"
                >
                  Search
                </Link>
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/marketplace"
                  className="px-5 py-2.5 rounded-lg bg-white text-slate-900 text-sm font-semibold hover:bg-slate-100 transition"
                >
                  Browse listings
                </Link>
                <Link
                  href="/listings/create"
                  className="px-5 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold transition flex items-center gap-1.5"
                >
                  Post an item <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Floating listing cards */}
            <div className="hidden lg:block lg:col-span-2">
              <div className="space-y-3">
                {heroCards.map((listing, i) => (
                  <div
                    key={listing.id}
                    className={`bg-white rounded-2xl p-3 flex items-center gap-3 shadow-xl border border-slate-100 transition-transform ${
                      i === 1 ? "translate-x-5" : i === 2 ? "-translate-x-3" : ""
                    }`}
                  >
                    <img
                      src={listing.images[0]}
                      alt={listing.title}
                      className="w-14 h-14 rounded-xl object-cover shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-slate-900 truncate">{listing.title}</p>
                      <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-1 truncate">
                        <MapPin className="w-3 h-3 shrink-0" />
                        {listing.location}
                      </p>
                      <p className="text-sm font-bold text-indigo-600 mt-1">{formatCurrency(listing.price)}</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-300 shrink-0" />
                  </div>
                ))}
              </div>
              <p className="text-xs text-slate-600 mt-4 text-right">48,000+ listings live</p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Stats ─── */}
      <section className="border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:divide-x divide-slate-100">
            {[
              { value: "12,847", label: "Active users" },
              { value: "48,293", label: "Listings" },
              { value: "9,412", label: "Deals completed" },
              { value: "4.87 / 5", label: "Average rating" },
            ].map((s) => (
              <div key={s.label} className="text-center md:pl-6 first:pl-0">
                <p className="text-2xl sm:text-3xl font-extrabold text-slate-900">{s.value}</p>
                <p className="text-sm text-slate-500 mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Categories ─── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="flex items-end justify-between mb-7">
          <h2 className="text-lg font-bold text-slate-900">Browse by category</h2>
          <Link href="/marketplace" className="text-sm font-medium text-indigo-600 hover:text-indigo-700 flex items-center gap-0.5">
            All listings <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
        {/* Carousel on mobile, grid on desktop */}
        <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-none sm:grid sm:grid-cols-4 lg:grid-cols-8 sm:overflow-visible sm:pb-0">
          {CATEGORIES.map((cat) => {
            const Icon = CATEGORY_ICONS[cat.name];
            return (
              <Link
                key={cat.name}
                href={`/marketplace?category=${cat.name}`}
                className="group flex flex-col items-center gap-2 py-5 px-3 rounded-xl border border-slate-200 bg-white hover:border-indigo-200 hover:bg-indigo-50 transition shrink-0 w-22.5 sm:w-auto text-center"
              >
                {Icon && <Icon className="w-5 h-5 text-slate-400 group-hover:text-indigo-500 transition-colors" strokeWidth={1.5} />}
                <span className="text-xs font-medium text-slate-600 group-hover:text-indigo-700 transition-colors leading-tight">{cat.name}</span>
                <span className="text-[11px] text-slate-400">{cat.count.toLocaleString()}</span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ─── Featured listings ─── */}
      <section className="bg-slate-50 py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-7">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Popular right now</h2>
              <p className="text-sm text-slate-500 mt-0.5">Top picks across the platform this week</p>
            </div>
            <Link href="/marketplace" className="text-sm font-medium text-indigo-600 hover:text-indigo-700 flex items-center gap-0.5 shrink-0">
              View all <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {featured.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── How it works ─── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 lg:gap-8">
          <div className="lg:col-span-1">
            <h2 className="text-lg font-bold text-slate-900 mb-2">How it works</h2>
            <p className="text-sm text-slate-500 leading-relaxed">
              From signup to completed deal in four steps. No hidden fees.
            </p>
          </div>
          <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {STEPS.map((step) => (
              <div key={step.num}>
                <div className="w-8 h-8 rounded-full bg-indigo-600 text-white text-sm font-bold flex items-center justify-center mb-4">
                  {step.num}
                </div>
                <h3 className="text-sm font-semibold text-slate-900 mb-1.5">{step.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Features ─── */}
      <section className="bg-slate-950 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-lg font-bold text-white mb-1">Built for trust</h2>
              <p className="text-sm text-slate-400">Every feature is designed to make transactions safer and faster.</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-slate-800">
            {FEATURES.map(({ Icon, title, desc }) => (
              <div key={title} className="bg-slate-950 hover:bg-[#0d1117] transition p-7">
                <div className="w-8 h-8 rounded-lg bg-indigo-900/50 flex items-center justify-center mb-4">
                  <Icon className="w-4 h-4 text-indigo-400" strokeWidth={1.5} />
                </div>
                <h3 className="text-sm font-semibold text-white mb-1.5">{title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Testimonials ─── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-lg font-bold text-slate-900 mb-8">What people say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {TESTIMONIALS.map((t) => (
            <div key={t.name} className="border border-slate-200 rounded-xl p-6 bg-white">
              <div className="flex gap-px mb-4">
                {[...Array(5)].map((_, idx) => (
                  <Star key={idx} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-slate-600 text-sm leading-relaxed mb-6">&ldquo;{t.quote}&rdquo;</p>
              <div className="flex items-center gap-3">
                <img src={t.avatar} alt={t.name} className="w-8 h-8 rounded-full bg-slate-100" />
                <div>
                  <p className="text-sm font-semibold text-slate-900">{t.name}</p>
                  <p className="text-xs text-slate-400">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="bg-indigo-600 rounded-2xl px-8 sm:px-12 py-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <h2 className="text-xl font-bold text-white mb-1">Ready to start?</h2>
              <p className="text-indigo-200 text-sm">Free to join. Post your first listing in under 2 minutes.</p>
            </div>
            <div className="flex gap-3 shrink-0">
              <Link href="/auth/register" className="px-5 py-2.5 bg-white text-indigo-700 text-sm font-semibold rounded-lg hover:bg-indigo-50 transition">
                Create account
              </Link>
              <Link href="/marketplace" className="px-5 py-2.5 bg-indigo-500 hover:bg-indigo-400 border border-indigo-400 text-white text-sm font-semibold rounded-lg transition">
                Browse listings
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
