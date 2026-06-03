"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { mockUsers } from "@/lib/mock-data";

const me = mockUsers[1]; // Jordan Kim — demo user

const navItems = [
  { href: "/dashboard", label: "Overview", icon: "🏠" },
  { href: "/dashboard/bookings", label: "Bookings", icon: "📅" },
  { href: "/dashboard/messages", label: "Messages", icon: "💬", badge: 2 },
  { href: "/dashboard/listings", label: "My Listings", icon: "📦" },
  { href: "/profile/u2", label: "My Profile", icon: "👤" },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex gap-6">
        {/* Sidebar */}
        <aside className="hidden md:flex flex-col w-56 flex-shrink-0">
          {/* User card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-4 mb-4 text-center">
            <img src={me.avatar} alt={me.name} className="w-14 h-14 rounded-full mx-auto mb-2" />
            <p className="font-semibold text-slate-900 text-sm">{me.name}</p>
            <p className="text-xs text-slate-500">{me.role}</p>
            <div className="flex items-center justify-center gap-1 text-xs text-amber-500 mt-1">
              <span>★</span>
              <span className="text-slate-600">{me.rating} · {me.reviewCount} reviews</span>
            </div>
          </div>

          {/* Nav */}
          <nav className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
            {navItems.map((item) => {
              const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 text-sm font-medium transition border-l-2 ${isActive ? "border-indigo-600 bg-indigo-50 text-indigo-700" : "border-transparent text-slate-600 hover:bg-slate-50 hover:text-slate-900"}`}
                >
                  <span>{item.icon}</span>
                  <span className="flex-1">{item.label}</span>
                  {"badge" in item && item.badge && (
                    <span className="bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5 min-w-[1.25rem] text-center leading-none">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Settings link */}
          <div className="mt-4 bg-white rounded-2xl border border-slate-200 overflow-hidden">
            <Link href="/settings" className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-slate-600 hover:bg-slate-50 transition">
              <span>⚙️</span> Settings
            </Link>
            <button className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-500 hover:bg-red-50 transition">
              <span>🚪</span> Log out
            </button>
          </div>
        </aside>

        {/* Mobile bottom nav */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 z-40 flex">
          {navItems.slice(0, 4).map((item) => {
            const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex-1 flex flex-col items-center py-3 text-xs transition ${isActive ? "text-indigo-600" : "text-slate-500"}`}
              >
                <span className="text-lg">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>

        {/* Main content */}
        <main className="flex-1 min-w-0 pb-20 md:pb-0">{children}</main>
      </div>
    </div>
  );
}
