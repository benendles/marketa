import Link from "next/link";
import { mockBookings, mockListings, mockNotifications, mockUsers } from "@/lib/mock-data";
import { formatCurrency, formatRelativeTime } from "@/lib/utils";
import Badge from "@/components/ui/Badge";

const me = mockUsers[1];

const statCards = [
  { label: "Active Listings", value: "3", icon: "📦", href: "/dashboard/listings", color: "bg-indigo-50 text-indigo-700" },
  { label: "Pending Bookings", value: "2", icon: "📅", href: "/dashboard/bookings", color: "bg-amber-50 text-amber-700" },
  { label: "Unread Messages", value: "2", icon: "💬", href: "/dashboard/messages", color: "bg-emerald-50 text-emerald-700" },
  { label: "Total Spent", value: formatCurrency(3450), icon: "💰", href: "/dashboard/bookings", color: "bg-purple-50 text-purple-700" },
];

const statusVariant = {
  pending: "warning",
  confirmed: "success",
  completed: "default",
  cancelled: "danger",
} as const;

export default function DashboardPage() {
  const myBookings = mockBookings.slice(0, 3);
  const recentNotifs = mockNotifications.slice(0, 4);

  return (
    <div>
      {/* Welcome */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Welcome back, {me.name.split(" ")[0]}! 👋</h1>
        <p className="text-slate-500 mt-1">Here&apos;s a summary of your marketplace activity.</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statCards.map((card) => (
          <Link key={card.label} href={card.href} className="bg-white rounded-2xl border border-slate-200 p-4 hover:shadow-md transition group">
            <div className={`w-10 h-10 ${card.color} rounded-xl flex items-center justify-center text-xl mb-3`}>{card.icon}</div>
            <p className="text-2xl font-extrabold text-slate-900 group-hover:text-indigo-600 transition">{card.value}</p>
            <p className="text-xs text-slate-500 mt-0.5">{card.label}</p>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent bookings */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-slate-900">Recent Bookings</h2>
            <Link href="/dashboard/bookings" className="text-xs text-indigo-600 hover:underline">View all →</Link>
          </div>
          <div className="space-y-3">
            {myBookings.map((booking) => (
              <div key={booking.id} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 hover:bg-slate-100 transition">
                <img src={booking.listing.images[0]} alt={booking.listing.title} className="w-12 h-12 rounded-lg object-cover flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-slate-900 text-sm truncate">{booking.listing.title}</p>
                  <p className="text-xs text-slate-500">{formatCurrency(booking.totalAmount)}</p>
                </div>
                <Badge variant={statusVariant[booking.status]}>{booking.status}</Badge>
              </div>
            ))}
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-slate-900">Notifications</h2>
            <button className="text-xs text-indigo-600 hover:underline">Mark all read</button>
          </div>
          <div className="space-y-3">
            {recentNotifs.map((notif) => (
              <Link key={notif.id} href={notif.link ?? "#"} className={`flex items-start gap-3 p-3 rounded-xl transition ${notif.isRead ? "hover:bg-slate-50" : "bg-indigo-50 hover:bg-indigo-100"}`}>
                <div className="w-8 h-8 rounded-xl bg-white border border-slate-200 flex items-center justify-center flex-shrink-0 text-sm">
                  {notif.type === "booking" ? "📅" : notif.type === "message" ? "💬" : notif.type === "review" ? "⭐" : "💰"}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-medium ${notif.isRead ? "text-slate-700" : "text-slate-900"}`}>{notif.title}</p>
                  <p className="text-xs text-slate-500 mt-0.5 truncate">{notif.body}</p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="text-xs text-slate-400">{formatRelativeTime(notif.createdAt)}</span>
                  {!notif.isRead && <div className="w-2 h-2 bg-indigo-600 rounded-full" />}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <div className="mt-6 bg-white rounded-2xl border border-slate-200 p-5">
        <h2 className="font-bold text-slate-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { icon: "➕", label: "New Listing", href: "/listings/create" },
            { icon: "🔍", label: "Browse", href: "/marketplace" },
            { icon: "💬", label: "Messages", href: "/dashboard/messages" },
            { icon: "⚙️", label: "Settings", href: "/settings" },
          ].map((action) => (
            <Link key={action.label} href={action.href} className="flex flex-col items-center gap-2 p-4 rounded-xl border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50 transition text-center group">
              <span className="text-2xl">{action.icon}</span>
              <span className="text-xs font-medium text-slate-700 group-hover:text-indigo-700">{action.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
