"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Users, Ban, Trash2, MonitorSmartphone, MapPin } from "lucide-react";
import { adminApiRequest } from "@/lib/adminApi";
import { AdminUser } from "@/types";

function timeAgo(dateStr?: string) {
  if (!dateStr) return "Never";
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

export default function UserManagementPage() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);

  const load = () => {
    setLoading(true);
    adminApiRequest("/users").then(setUsers).catch(console.error).finally(() => setLoading(false));
  };

  useEffect(load, []);

  const toggleBlock = async (id: string) => {
    const res = await adminApiRequest(`/users/${id}/block`, { method: "PUT" });
    setUsers((prev) => prev.map((u) => (u._id === id ? res.user : u)));
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this user permanently?")) return;
    await adminApiRequest(`/users/${id}`, { method: "DELETE" });
    setUsers((prev) => prev.filter((u) => u._id !== id));
  };

  return (
    <div>
      <h1 className="flex items-center gap-2 font-[family-name:var(--font-display)] text-2xl font-bold text-white">
        <Users size={24} className="text-[#6D5EF0]" /> User Management
      </h1>
      <p className="mt-1 text-sm text-[#8b92a6]">
        Every user's device, location and login activity, at a glance
      </p>

      <div className="mt-6 overflow-x-auto rounded-2xl border border-[#232733] bg-[#12141c]">
        <table className="w-full min-w-[900px] text-sm">
          <thead className="border-b border-[#232733] text-left text-xs uppercase text-[#8b92a6]">
            <tr>
              <th className="px-5 py-3">User</th>
              <th className="px-5 py-3">Contact</th>
              <th className="px-5 py-3">Device</th>
              <th className="px-5 py-3">Location</th>
              <th className="px-5 py-3">Last Active</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={7} className="px-5 py-8 text-center text-[#8b92a6]">Loading...</td></tr>
            ) : users.length === 0 ? (
              <tr><td colSpan={7} className="px-5 py-8 text-center text-[#8b92a6]">No users yet.</td></tr>
            ) : (
              users.map((u) => (
                <tr key={u._id} className="border-b border-[#1c1f2a] last:border-0">
                  <td className="px-5 py-3">
                    <Link href={`/admin/users/${u._id}`} className="font-medium text-white hover:text-[#6D5EF0]">
                      {u.name}
                    </Link>
                    <p className="text-xs text-[#8b92a6]">{u.email}</p>
                  </td>
                  <td className="px-5 py-3 text-[#c4c8d4]">{u.phone || "—"}</td>
                  <td className="px-5 py-3">
                    <span className="flex items-center gap-1.5 text-[#c4c8d4]">
                      <MonitorSmartphone size={14} className="text-[#6D5EF0]" /> {u.lastDevice || "Unknown"}
                    </span>
                    <p className="mt-0.5 text-xs text-[#8b92a6]">{u.lastBrowser} · {u.lastOs}</p>
                  </td>
                  <td className="px-5 py-3">
                    <span className="flex items-center gap-1.5 text-[#c4c8d4]">
                      <MapPin size={14} className="text-[#6D5EF0]" /> {u.lastCity}, {u.lastState}
                    </span>
                    <p className="mt-0.5 text-xs text-[#8b92a6]">{u.lastCountry} · IP: {u.lastIp}</p>
                  </td>
                  <td className="px-5 py-3 text-[#c4c8d4]">{timeAgo(u.lastActiveAt)}</td>
                  <td className="px-5 py-3">
                    <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${u.isBlocked ? "bg-[#EF4444]/15 text-[#EF4444]" : "bg-[#22C55E]/15 text-[#22C55E]"}`}>
                      {u.isBlocked ? "Blocked" : "Active"}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => toggleBlock(u._id)}
                        className="rounded-lg p-2 text-[#8b92a6] hover:bg-[#F59E0B]/15 hover:text-[#F59E0B]"
                        title={u.isBlocked ? "Unblock user" : "Block user"}
                      >
                        <Ban size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(u._id)}
                        className="rounded-lg p-2 text-[#8b92a6] hover:bg-[#EF4444]/15 hover:text-[#EF4444]"
                        title="Delete user"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
