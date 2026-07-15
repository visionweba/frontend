"use client";

import { useEffect, useState, use } from "react";
import Link from "next/link";
import { ArrowLeft, MonitorSmartphone, MapPin, Globe, Clock } from "lucide-react";
import { adminApiRequest } from "@/lib/adminApi";
import { AdminUser } from "@/types";

export default function UserDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [user, setUser] = useState<AdminUser | null>(null);

  useEffect(() => {
    adminApiRequest(`/users/${id}`).then(setUser).catch(console.error);
  }, [id]);

  if (!user) return <p className="text-[#8b92a6]">Loading user...</p>;

  return (
    <div>
      <Link href="/admin/users" className="flex items-center gap-2 text-sm text-[#8b92a6] hover:text-white">
        <ArrowLeft size={16} /> Back to all users
      </Link>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-[#232733] bg-[#12141c] p-6">
        <div>
          <h1 className="font-[family-name:var(--font-display)] text-xl font-bold text-white">{user.name}</h1>
          <p className="text-sm text-[#8b92a6]">{user.email} · {user.phone || "No phone"}</p>
        </div>
        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${user.isBlocked ? "bg-[#EF4444]/15 text-[#EF4444]" : "bg-[#22C55E]/15 text-[#22C55E]"}`}>
          {user.isBlocked ? "Blocked" : "Active"}
        </span>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-[#232733] bg-[#12141c] p-5">
          <p className="flex items-center gap-2 text-xs text-[#8b92a6]"><MonitorSmartphone size={14} /> Current Device</p>
          <p className="mt-2 text-sm text-white">{user.lastDevice}</p>
          <p className="text-xs text-[#8b92a6]">{user.lastBrowser} · {user.lastOs}</p>
        </div>
        <div className="rounded-2xl border border-[#232733] bg-[#12141c] p-5">
          <p className="flex items-center gap-2 text-xs text-[#8b92a6]"><MapPin size={14} /> Last Location</p>
          <p className="mt-2 text-sm text-white">{user.lastCity}, {user.lastState}</p>
          <p className="text-xs text-[#8b92a6]">{user.lastCountry}</p>
        </div>
        <div className="rounded-2xl border border-[#232733] bg-[#12141c] p-5">
          <p className="flex items-center gap-2 text-xs text-[#8b92a6]"><Globe size={14} /> Last IP Address</p>
          <p className="mt-2 text-sm text-white">{user.lastIp}</p>
          <p className="text-xs text-[#8b92a6]">
            {user.lastActiveAt ? new Date(user.lastActiveAt).toLocaleString() : "—"}
          </p>
        </div>
      </div>

      <h2 className="mt-8 flex items-center gap-2 text-lg font-semibold text-white">
        <Clock size={18} className="text-[#6D5EF0]" /> Login History
      </h2>

      <div className="mt-4 space-y-3">
        {user.loginHistory.length === 0 ? (
          <p className="text-sm text-[#8b92a6]">No login history recorded.</p>
        ) : (
          user.loginHistory.map((h, idx) => (
            <div key={idx} className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-[#232733] bg-[#12141c] px-5 py-3 text-sm">
              <div className="text-[#c4c8d4]">
                <span className="font-medium text-white">{h.device}</span> · {h.browser} · {h.os}
              </div>
              <div className="text-xs text-[#8b92a6]">
                {h.city}, {h.state}, {h.country} · IP {h.ip}
              </div>
              <div className="text-xs text-[#8b92a6]">{new Date(h.loginAt).toLocaleString()}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
