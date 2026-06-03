import { mockAdminStats, mockListings, mockUsers, mockBookings } from "@/lib/mock-data";
import { formatCurrency, formatDate } from "@/lib/utils";
import Badge from "@/components/ui/Badge";
import Link from "next/link";

const kpiCards = [
  { label: "Total Users", value: mockAdminStats.totalUsers.toLocaleString(), change: `+${mockAdminStats.newUsersThisMonth} this month`, icon: "👥", color: "bg-blue-50 text-blue-700 border-blue-200" },
  { label: "Active Listings", value: mockAdminStats.totalListings.toLocaleString(), change: `+${mockAdminStats.newListingsThisMonth} this month`, icon: "📦", color: "bg-indigo-50 text-indigo-700 border-indigo-200" },
  { label: "Total Bookings", value: mockAdminStats.totalBookings.toLocaleString(), change: "All time", icon: "📅", color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
  { label: "Total Revenue", value: formatCurrency(mockAdminStats.totalRevenue), change: `${formatCurrency(mockAdminStats.revenueThisMonth)} this month`, icon: "💰", color: "bg-amber-50 text-amber-700 border-amber-200" },
  { label: "Active Users", value: mockAdminStats.activeUsers.toLocaleString(), change: "Last 30 days", icon: "🟢", color: "bg-purple-50 text-purple-700 border-purple-200" },
  { label: "Avg. Rating", value: "4.87 ★", change: "Platform average", icon: "⭐", color: "bg-orange-50 text-orange-700 border-orange-200" },
];

const statusVariant = {
  pending: "warning",
  confirmed: "success",
  completed: "default",
  cancelled: "danger",
} as const;

export default function AdminOverviewPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Dashboard Overview</h1>
          <p className="text-slate-500 mt-1">Welcome back, Admin · {new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 border border-slate-200 bg-white rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50 transition">
            📥 Export CSV
          </button>
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-medium hover:bg-indigo-700 transition">
            + New Report
          </button>
        </div>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {kpiCards.map((card) => (
          <div key={card.label} className={`bg-white rounded-2xl border p-5 ${card.color}`}>
            <div className="flex items-start justify-between mb-3">
              <span className="text-2xl">{card.icon}</span>
              <span className="text-xs font-medium opacity-70">{card.change}</span>
            </div>
            <p className="text-3xl font-extrabold">{card.value}</p>
            <p className="text-sm mt-1 opacity-80">{card.label}</p>
          </div>
        ))}
      </div>

      {/* Revenue chart placeholder */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-slate-900">Revenue Overview</h2>
          <select className="text-sm border border-slate-200 rounded-lg px-3 py-1.5 text-slate-600 focus:outline-none">
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>Last 90 days</option>
          </select>
        </div>
        {/* Visual bar chart */}
        <div className="flex items-end gap-2 h-32">
          {[40, 65, 55, 80, 70, 90, 75].map((h, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <div className="w-full bg-indigo-600 rounded-t-lg opacity-80 hover:opacity-100 transition" style={{ height: `${h}%` }} />
              <span className="text-xs text-slate-400">{["M", "T", "W", "T", "F", "S", "S"][i]}</span>
            </div>
          ))}
        </div>
        <div className="mt-3 flex items-center gap-4 text-xs text-slate-500">
          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-indigo-600 inline-block" /> Revenue</span>
          <span>Highest: $14,200 (Sat)</span>
          <span>Avg: $9,847/day</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent bookings */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-slate-900">Recent Bookings</h2>
            <Link href="/admin/bookings" className="text-xs text-indigo-600 hover:underline">View all →</Link>
          </div>
          <div className="space-y-3">
            {mockBookings.map((booking) => (
              <div key={booking.id} className="flex items-center gap-3">
                <img src={booking.listing.images[0]} alt="" className="w-10 h-10 rounded-lg object-cover flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-slate-900 text-sm truncate">{booking.listing.title}</p>
                  <p className="text-xs text-slate-500">by {booking.buyer.name}</p>
                </div>
                <Badge variant={statusVariant[booking.status]}>{booking.status}</Badge>
                <span className="text-sm font-bold text-slate-900">{formatCurrency(booking.totalAmount)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent users */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-slate-900">Recent Users</h2>
            <Link href="/admin/users" className="text-xs text-indigo-600 hover:underline">View all →</Link>
          </div>
          <div className="space-y-3">
            {mockUsers.map((user) => (
              <div key={user.id} className="flex items-center gap-3">
                <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full" />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-slate-900 text-sm">{user.name}</p>
                  <p className="text-xs text-slate-500">{user.email}</p>
                </div>
                <Badge variant={user.role === "admin" ? "danger" : user.role === "seller" ? "default" : "outline"}>{user.role}</Badge>
                {user.isVerified && <span className="text-xs text-emerald-500">✓</span>}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top listings */}
      <div className="mt-6 bg-white rounded-2xl border border-slate-200 p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-slate-900">Top Listings by Views</h2>
          <Link href="/admin/listings" className="text-xs text-indigo-600 hover:underline">View all →</Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="text-left py-2 font-semibold text-slate-500 text-xs">Listing</th>
                <th className="text-left py-2 font-semibold text-slate-500 text-xs">Seller</th>
                <th className="text-left py-2 font-semibold text-slate-500 text-xs">Price</th>
                <th className="text-left py-2 font-semibold text-slate-500 text-xs">Views</th>
                <th className="text-left py-2 font-semibold text-slate-500 text-xs">Rating</th>
                <th className="text-left py-2 font-semibold text-slate-500 text-xs">Status</th>
              </tr>
            </thead>
            <tbody>
              {mockListings.sort((a, b) => b.views - a.views).map((listing) => (
                <tr key={listing.id} className="border-b border-slate-50 hover:bg-slate-50 transition">
                  <td className="py-2 pr-4">
                    <div className="flex items-center gap-2">
                      <img src={listing.images[0]} alt="" className="w-8 h-8 rounded-lg object-cover" />
                      <span className="font-medium text-slate-900 truncate max-w-[180px]">{listing.title}</span>
                    </div>
                  </td>
                  <td className="py-2 pr-4 text-slate-500">{listing.seller.name}</td>
                  <td className="py-2 pr-4 font-bold text-indigo-600">{formatCurrency(listing.price)}</td>
                  <td className="py-2 pr-4 text-slate-600">👁 {listing.views}</td>
                  <td className="py-2 pr-4 text-amber-500">★ {listing.rating}</td>
                  <td className="py-2">
                    <Badge variant={listing.isActive ? "success" : "outline"}>{listing.isActive ? "Active" : "Inactive"}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
