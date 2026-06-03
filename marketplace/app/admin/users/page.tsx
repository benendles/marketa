"use client";

import { useState } from "react";
import { mockUsers } from "@/lib/mock-data";
import { formatDate } from "@/lib/utils";
import Badge from "@/components/ui/Badge";
import type { User } from "@/types";

export default function AdminUsersPage() {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<"all" | "buyer" | "seller" | "admin">("all");
  const [selected, setSelected] = useState<string[]>([]);

  const filtered = mockUsers.filter((u) => {
    const matchesSearch = u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase());
    const matchesRole = roleFilter === "all" || u.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const toggleSelect = (id: string) => {
    setSelected((prev) => prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]);
  };

  const selectAll = () => {
    setSelected(filtered.length === selected.length ? [] : filtered.map((u) => u.id));
  };

  const roleVariant = {
    buyer: "outline",
    seller: "default",
    admin: "danger",
  } as const;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Users</h1>
          <p className="text-slate-500 mt-1">{mockUsers.length} total users</p>
        </div>
        <div className="flex gap-2">
          {selected.length > 0 && (
            <button className="px-4 py-2 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm font-medium hover:bg-red-100 transition">
              Suspend {selected.length} selected
            </button>
          )}
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-medium hover:bg-indigo-700 transition">
            + Invite User
          </button>
        </div>
      </div>

      {/* Search + filter */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="relative flex-1">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">🔍</span>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search users..."
            className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div className="flex gap-1 bg-slate-100 p-1 rounded-xl">
          {(["all", "buyer", "seller", "admin"] as const).map((role) => (
            <button
              key={role}
              onClick={() => setRoleFilter(role)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium capitalize transition ${roleFilter === role ? "bg-white text-slate-900 shadow-sm" : "text-slate-600 hover:text-slate-900"}`}
            >
              {role}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="w-10 px-5 py-3">
                  <input type="checkbox" checked={selected.length === filtered.length && filtered.length > 0} onChange={selectAll} className="rounded border-slate-300 text-indigo-600" />
                </th>
                <th className="text-left px-4 py-3 font-semibold text-slate-600">User</th>
                <th className="text-left px-4 py-3 font-semibold text-slate-600 hidden sm:table-cell">Role</th>
                <th className="text-left px-4 py-3 font-semibold text-slate-600 hidden md:table-cell">Rating</th>
                <th className="text-left px-4 py-3 font-semibold text-slate-600 hidden lg:table-cell">Joined</th>
                <th className="text-left px-4 py-3 font-semibold text-slate-600">Verified</th>
                <th className="text-right px-5 py-3 font-semibold text-slate-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((user) => (
                <tr key={user.id} className={`border-b border-slate-100 hover:bg-slate-50 transition ${selected.includes(user.id) ? "bg-indigo-50/30" : ""}`}>
                  <td className="px-5 py-3">
                    <input
                      type="checkbox"
                      checked={selected.includes(user.id)}
                      onChange={() => toggleSelect(user.id)}
                      className="rounded border-slate-300 text-indigo-600"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <img src={user.avatar} alt={user.name} className="w-9 h-9 rounded-full flex-shrink-0" />
                      <div>
                        <p className="font-medium text-slate-900">{user.name}</p>
                        <p className="text-xs text-slate-400">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 hidden sm:table-cell">
                    <Badge variant={roleVariant[user.role]}>{user.role}</Badge>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell text-amber-500">
                    ★ {user.rating} <span className="text-slate-400 text-xs">({user.reviewCount})</span>
                  </td>
                  <td className="px-4 py-3 hidden lg:table-cell text-slate-400 text-xs">{formatDate(user.joinedAt)}</td>
                  <td className="px-4 py-3">
                    {user.isVerified
                      ? <Badge variant="success">✓ Verified</Badge>
                      : <Badge variant="outline">Unverified</Badge>
                    }
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <button className="text-xs text-indigo-600 hover:underline">View</button>
                      <button className="text-xs text-slate-500 hover:text-slate-700">Edit</button>
                      <button className="text-xs text-red-500 hover:text-red-700">Suspend</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-5 py-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>Showing {filtered.length} of {mockUsers.length} users</span>
          <div className="flex gap-1">
            <button className="px-2 py-1 rounded border border-slate-200 hover:bg-slate-50">← Prev</button>
            <button className="px-2 py-1 rounded border border-indigo-500 bg-indigo-50 text-indigo-700">1</button>
            <button className="px-2 py-1 rounded border border-slate-200 hover:bg-slate-50">Next →</button>
          </div>
        </div>
      </div>
    </div>
  );
}
