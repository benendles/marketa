"use client";

import { useState, useMemo } from "react";
import { mockListings, CATEGORIES } from "@/lib/mock-data";
import ListingCard from "@/components/marketplace/ListingCard";
import type { ListingCategory, ListingCondition } from "@/types";

const CONDITIONS: ListingCondition[] = ["New", "Like New", "Good", "Fair", "Poor"];
const SORT_OPTIONS = [
  { value: "newest", label: "Newest First" },
  { value: "price_asc", label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
  { value: "rating", label: "Top Rated" },
];

export default function MarketplacePage() {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<ListingCategory | "">("");
  const [selectedCondition, setSelectedCondition] = useState<ListingCondition | "">("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filtered = useMemo(() => {
    let results = [...mockListings];
    if (query) results = results.filter((l) => l.title.toLowerCase().includes(query.toLowerCase()) || l.description.toLowerCase().includes(query.toLowerCase()));
    if (selectedCategory) results = results.filter((l) => l.category === selectedCategory);
    if (selectedCondition) results = results.filter((l) => l.condition === selectedCondition);
    if (minPrice) results = results.filter((l) => l.price >= Number(minPrice));
    if (maxPrice) results = results.filter((l) => l.price <= Number(maxPrice));
    if (sortBy === "price_asc") results.sort((a, b) => a.price - b.price);
    else if (sortBy === "price_desc") results.sort((a, b) => b.price - a.price);
    else if (sortBy === "rating") results.sort((a, b) => b.rating - a.rating);
    return results;
  }, [query, selectedCategory, selectedCondition, minPrice, maxPrice, sortBy]);

  const clearFilters = () => {
    setQuery("");
    setSelectedCategory("");
    setSelectedCondition("");
    setMinPrice("");
    setMaxPrice("");
    setSortBy("newest");
  };

  const hasFilters = query || selectedCategory || selectedCondition || minPrice || maxPrice;

  const Sidebar = () => (
    <aside className="w-full lg:w-64 flex-shrink-0">
      <div className="bg-white rounded-2xl border border-slate-200 p-5 sticky top-20">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-slate-900">Filters</h3>
          {hasFilters && (
            <button onClick={clearFilters} className="text-xs text-indigo-600 hover:underline">Clear all</button>
          )}
        </div>

        {/* Category */}
        <div className="mb-5">
          <h4 className="text-sm font-semibold text-slate-700 mb-2">Category</h4>
          <div className="space-y-1">
            <button
              onClick={() => setSelectedCategory("")}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition ${!selectedCategory ? "bg-indigo-50 text-indigo-700 font-medium" : "text-slate-600 hover:bg-slate-50"}`}
            >
              All Categories
            </button>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.name}
                onClick={() => setSelectedCategory(cat.name as ListingCategory)}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition flex items-center justify-between ${selectedCategory === cat.name ? "bg-indigo-50 text-indigo-700 font-medium" : "text-slate-600 hover:bg-slate-50"}`}
              >
                <span>{cat.icon} {cat.name}</span>
                <span className="text-xs text-slate-400">{cat.count.toLocaleString()}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Price range */}
        <div className="mb-5">
          <h4 className="text-sm font-semibold text-slate-700 mb-2">Price Range</h4>
          <div className="flex gap-2">
            <input
              type="number"
              placeholder="Min"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <input
              type="number"
              placeholder="Max"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* Condition */}
        <div className="mb-5">
          <h4 className="text-sm font-semibold text-slate-700 mb-2">Condition</h4>
          <div className="space-y-1">
            <button
              onClick={() => setSelectedCondition("")}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition ${!selectedCondition ? "bg-indigo-50 text-indigo-700 font-medium" : "text-slate-600 hover:bg-slate-50"}`}
            >
              Any Condition
            </button>
            {CONDITIONS.map((c) => (
              <button
                key={c}
                onClick={() => setSelectedCondition(c)}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition ${selectedCondition === c ? "bg-indigo-50 text-indigo-700 font-medium" : "text-slate-600 hover:bg-slate-50"}`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Browse Marketplace</h1>
        <p className="text-slate-500 mt-1">
          {filtered.length.toLocaleString()} listing{filtered.length !== 1 ? "s" : ""} found
        </p>
      </div>

      {/* Search + Sort bar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="flex-1 relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">🔍</span>
          <input
            type="text"
            placeholder="Search listings..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
          />
        </div>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-4 py-3 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm text-slate-700"
        >
          {SORT_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
        <div className="flex gap-2">
          <button
            onClick={() => setViewMode("grid")}
            className={`px-4 py-3 rounded-xl border text-sm transition ${viewMode === "grid" ? "border-indigo-500 bg-indigo-50 text-indigo-700" : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"}`}
          >
            ⊞
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`px-4 py-3 rounded-xl border text-sm transition ${viewMode === "list" ? "border-indigo-500 bg-indigo-50 text-indigo-700" : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"}`}
          >
            ☰
          </button>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 text-sm transition"
          >
            ⚙ Filters {hasFilters && <span className="ml-1 w-2 h-2 bg-indigo-600 rounded-full inline-block" />}
          </button>
        </div>
      </div>

      {/* Active filter chips */}
      {hasFilters && (
        <div className="flex flex-wrap gap-2 mb-4">
          {selectedCategory && (
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-medium">
              {selectedCategory}
              <button onClick={() => setSelectedCategory("")} className="ml-1 hover:text-indigo-900">✕</button>
            </span>
          )}
          {selectedCondition && (
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-medium">
              {selectedCondition}
              <button onClick={() => setSelectedCondition("")} className="ml-1 hover:text-indigo-900">✕</button>
            </span>
          )}
          {(minPrice || maxPrice) && (
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-medium">
              ${minPrice || "0"} – ${maxPrice || "∞"}
              <button onClick={() => { setMinPrice(""); setMaxPrice(""); }} className="ml-1 hover:text-indigo-900">✕</button>
            </span>
          )}
        </div>
      )}

      <div className="flex gap-6">
        {/* Sidebar – desktop always visible */}
        <div className="hidden lg:block"><Sidebar /></div>

        {/* Mobile sidebar overlay */}
        {sidebarOpen && (
          <div className="lg:hidden fixed inset-0 z-50 flex">
            <div className="flex-1 bg-black/40" onClick={() => setSidebarOpen(false)} />
            <div className="w-72 bg-white h-full overflow-y-auto p-4">
              <div className="flex items-center justify-between mb-4">
                <span className="font-bold text-slate-900">Filters</span>
                <button onClick={() => setSidebarOpen(false)} className="text-slate-400 hover:text-slate-600">✕</button>
              </div>
              <Sidebar />
            </div>
          </div>
        )}

        {/* Listings grid */}
        <div className="flex-1 min-w-0">
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-5xl mb-4">🔍</div>
              <h3 className="font-bold text-slate-900 mb-2">No listings found</h3>
              <p className="text-slate-500 text-sm">Try adjusting your filters or search term.</p>
              <button onClick={clearFilters} className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm hover:bg-indigo-700 transition">
                Clear Filters
              </button>
            </div>
          ) : (
            <div className={viewMode === "grid"
              ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5"
              : "space-y-4"
            }>
              {filtered.map((listing) => (
                <ListingCard key={listing.id} listing={listing} compact={viewMode === "list"} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
