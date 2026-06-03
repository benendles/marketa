"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/admin", label: "Overview", icon: "📊" },
  { href: "/admin/users", label: "Users", icon: "👥" },
  { href: "/admin/listings", label: "Listings", icon: "📦" },
  { href: "/admin/bookings", label: "Bookings", icon: "📅" },
  { href: "/admin/payments", label: "Payments", icon: "💳" },
  { href: "/admin/reports", label: "Reports", icon: "🚩" },
  { href: "/admin/settings", label: "Settings", icon: "⚙️" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      {/* Sidebar */}
      <aside className="w-56 bg-slate-900 text-white flex flex-col flex-shrink-0">
        <div className="p-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center text-xs font-bold">A</div>
            <div>
              <p className="text-sm font-bold">Admin Panel</p>
              <p className="text-xs text-slate-400">Marketa</p>
            </div>
          </div>
        </div>
        <nav className="flex-1 py-4 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-2.5 text-sm font-medium transition mx-2 rounded-lg mb-0.5 ${isActive ? "bg-indigo-600 text-white" : "text-slate-400 hover:text-white hover:bg-slate-800"}`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-slate-800">
          <Link href="/" className="flex items-center gap-2 text-xs text-slate-400 hover:text-white transition">
            ← Back to Site
          </Link>
        </div>
      </aside>

      {/* Content */}
      <main className="flex-1 bg-slate-50 p-6 overflow-auto">{children}</main>
    </div>
  );
}
