"use client";

import { useState, useMemo } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { mockListings, CATEGORIES } from "@/lib/mock-data";
import ListingCard from "@/components/marketplace/ListingCard";
import type { ListingCategory, ListingCondition } from "@/types";

const CONDITIONS: ListingCondition[] = ["New", "Like New", "Good", "Fair", "Poor"];
const SORT_OPTIONS = [
  { value: "newest", label: "Newest" },
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

  const filtered = useMemo(() => {
    let r = [...mockListings];
    if (query) r = r.filter((l) => l.title.toLowerCase().includes(query.toLowerCase()));
    if (selectedCategory) r = r.filter((l) => l.category === selectedCategory);
    if (selectedCondition) r = r.filter((l) => l.condition === selectedCondition);
    if (minPrice) r = r.filter((l) => l.price >= Number(minPrice));
    if (maxPrice) r = r.filter((l) => l.price <= Number(maxPrice));
    if (sortBy === "price_asc") r.sort((a, b) => a.price - b.price);
    else if (sortBy === "price_desc") r.sort((a, b) => b.price - a.price);
    else if (sortBy === "rating") r.sort((a, b) => b.rating - a.rating);
    return r;
  }, [query, selectedCategory, selectedCondition, minPrice, maxPrice, sortBy]);

  const clearFilters = () => {
    setQuery(""); setSelectedCategory(""); setSelectedCondition("");
    setMinPrice(""); setMaxPrice(""); setSortBy("newest");
  };

  const hasFilters = !!(query || selectedCategory || selectedCondition || minPrice || maxPrice);

  const Sidebar = () => (
    <div className="bg-white border border-[#D5D9D9] sticky top-28">
      <div className="flex items-center justify-between px-4 py-3 border-b border-[#D5D9D9]">
        <span className="text-sm font-bold text-[#0F1111]">Filters</span>
        {hasFilters && (
          <button type="button" onClick={clearFilters} className="text-xs text-[#007185] hover:text-[#C7511F] transition">
            Clear all
          </button>
        )}
      </div>

      {/* Category */}
      <div className="border-b border-[#D5D9D9] px-4 py-4">
        <p className="text-xs font-bold text-[#0F1111] uppercase tracking-wide mb-2">Category</p>
        <div className="space-y-0.5">
          <button
            type="button"
            onClick={() => setSelectedCategory("")}
            className={`w-full text-left px-2 py-1.5 text-sm transition ${!selectedCategory ? "text-[#C7511F] font-semibold" : "text-[#007185] hover:text-[#C7511F]"}`}
          >
            All Categories
          </button>
          {CATEGORIES.map((cat) => (
            <button
              type="button"
              key={cat.name}
              onClick={() => setSelectedCategory(cat.name as ListingCategory)}
              className={`w-full text-left px-2 py-1.5 text-sm flex items-center justify-between transition ${selectedCategory === cat.name ? "text-[#C7511F] font-semibold" : "text-[#007185] hover:text-[#C7511F]"}`}
            >
              <span>{cat.name}</span>
              <span className="text-xs text-[#565959]">{cat.count.toLocaleString()}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Price */}
      <div className="border-b border-[#D5D9D9] px-4 py-4">
        <p className="text-xs font-bold text-[#0F1111] uppercase tracking-wide mb-2">Price</p>
        <div className="flex gap-2 items-center">
          <input
            type="number"
            placeholder="Min"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="w-full px-2.5 py-2 border border-[#D5D9D9] text-sm text-[#0F1111] focus:outline-none focus:border-[#FF9900]"
          />
          <span className="text-[#565959] text-sm shrink-0">–</span>
          <input
            type="number"
            placeholder="Max"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="w-full px-2.5 py-2 border border-[#D5D9D9] text-sm text-[#0F1111] focus:outline-none focus:border-[#FF9900]"
          />
        </div>
      </div>

      {/* Condition */}
      <div className="px-4 py-4">
        <p className="text-xs font-bold text-[#0F1111] uppercase tracking-wide mb-2">Condition</p>
        <div className="space-y-0.5">
          <button
            type="button"
            onClick={() => setSelectedCondition("")}
            className={`w-full text-left px-2 py-1.5 text-sm transition ${!selectedCondition ? "text-[#C7511F] font-semibold" : "text-[#007185] hover:text-[#C7511F]"}`}
          >
            Any
          </button>
          {CONDITIONS.map((c) => (
            <button
              type="button"
              key={c}
              onClick={() => setSelectedCondition(c)}
              className={`w-full text-left px-2 py-1.5 text-sm transition ${selectedCondition === c ? "text-[#C7511F] font-semibold" : "text-[#007185] hover:text-[#C7511F]"}`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-[#EAEDED] min-h-screen">

      {/* Search strip */}
      <div className="bg-[#131921] px-4 py-3 flex items-center gap-3">
        <div className="flex-1 flex items-center bg-white overflow-hidden max-w-2xl">
          <Search className="ml-3 w-4 h-4 text-[#565959] shrink-0" />
          <input
            type="text"
            placeholder="Search Marketa"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 px-3 py-2.5 text-sm text-[#0F1111] placeholder:text-[#565959] focus:outline-none"
          />
          {query && (
            <button type="button" onClick={() => setQuery("")} className="pr-3">
              <X className="w-4 h-4 text-[#565959]" />
            </button>
          )}
        </div>
        <button
          type="button"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="lg:hidden flex items-center gap-1.5 px-3 py-2 bg-white text-[#0F1111] text-sm font-medium"
        >
          <SlidersHorizontal className="w-4 h-4" />
          Filters
          {hasFilters && <span className="w-2 h-2 bg-[#FF9900] rounded-full" />}
        </button>
      </div>

      {/* Category pills */}
      <div className="bg-[#232F3E] px-3 overflow-x-auto scrollbar-none">
        <div className="flex gap-2 py-2">
          <button
            type="button"
            onClick={() => setSelectedCategory("")}
            className={`px-3 py-1.5 text-xs font-semibold rounded-full border transition whitespace-nowrap shrink-0 ${!selectedCategory ? "bg-[#FF9900] border-[#FF9900] text-[#131921]" : "border-white/30 text-white hover:border-white/60"}`}
          >
            All
          </button>
          {CATEGORIES.map((cat) => (
            <button
              type="button"
              key={cat.name}
              onClick={() => setSelectedCategory(cat.name as ListingCategory)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-full border transition whitespace-nowrap shrink-0 ${selectedCategory === cat.name ? "bg-[#FF9900] border-[#FF9900] text-[#131921]" : "border-white/30 text-white hover:border-white/60"}`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Results + sort */}
      <div className="bg-white border-b border-[#D5D9D9] px-4 py-2.5 flex items-center justify-between">
        <p className="text-sm text-[#0F1111]">
          <span className="font-bold">{filtered.length.toLocaleString()}</span>
          <span className="text-[#565959]"> results</span>
          {selectedCategory && <span className="text-[#565959]"> in <span className="text-[#0F1111] font-medium">{selectedCategory}</span></span>}
        </p>
        <div className="flex items-center gap-2">
          <label htmlFor="sort" className="text-xs text-[#565959] hidden sm:block">Sort by</label>
          <select
            id="sort"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="text-sm text-[#0F1111] border border-[#D5D9D9] px-2 py-1 focus:outline-none focus:border-[#FF9900]"
          >
            {SORT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Active filter chips */}
      {hasFilters && (
        <div className="bg-white border-b border-[#D5D9D9] px-4 py-2 flex flex-wrap gap-2">
          {selectedCategory && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#EAEDED] text-[#0F1111] text-xs font-medium border border-[#D5D9D9]">
              {selectedCategory}
              <button type="button" aria-label="Remove category filter" onClick={() => setSelectedCategory("")}><X className="w-3 h-3" /></button>
            </span>
          )}
          {selectedCondition && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#EAEDED] text-[#0F1111] text-xs font-medium border border-[#D5D9D9]">
              {selectedCondition}
              <button type="button" aria-label="Remove condition filter" onClick={() => setSelectedCondition("")}><X className="w-3 h-3" /></button>
            </span>
          )}
          {(minPrice || maxPrice) && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#EAEDED] text-[#0F1111] text-xs font-medium border border-[#D5D9D9]">
              ${minPrice || "0"} – ${maxPrice || "any"}
              <button type="button" aria-label="Remove price filter" onClick={() => { setMinPrice(""); setMaxPrice(""); }}><X className="w-3 h-3" /></button>
            </span>
          )}
        </div>
      )}

      {/* Content */}
      <div className="max-w-375 mx-auto px-3 py-3 flex gap-3 items-start">

        {/* Desktop sidebar */}
        <div className="hidden lg:block w-56 shrink-0"><Sidebar /></div>

        {/* Mobile sidebar overlay */}
        {sidebarOpen && (
          <div className="lg:hidden fixed inset-0 z-50 flex">
            <div className="flex-1 bg-black/50" onClick={() => setSidebarOpen(false)} />
            <div className="w-72 bg-white h-full overflow-y-auto shadow-xl">
              <div className="flex items-center justify-between px-4 py-3 border-b border-[#D5D9D9] bg-[#131921]">
                <span className="text-sm font-bold text-white">Filters</span>
                <button type="button" aria-label="Close filters" onClick={() => setSidebarOpen(false)}>
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>
              <Sidebar />
            </div>
          </div>
        )}

        {/* Grid */}
        <div className="flex-1 min-w-0">
          {filtered.length === 0 ? (
            <div className="bg-white border border-[#D5D9D9] py-16 text-center">
              <Search className="w-10 h-10 text-[#D5D9D9] mx-auto mb-3" />
              <p className="font-bold text-[#0F1111] mb-1">No results found</p>
              <p className="text-sm text-[#565959] mb-4">Try adjusting your filters or search term.</p>
              <button
                type="button"
                onClick={clearFilters}
                className="px-5 py-2 rounded-full bg-[#FFD814] hover:bg-[#F7CA00] border border-[#FCD200] text-[#0F1111] text-sm font-semibold transition"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-2">
              {filtered.map((l) => <ListingCard key={l.id} listing={l} />)}
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
