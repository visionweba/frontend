"use client";

import { useEffect, useState } from "react";
import { Users, Boxes, ClipboardList, Clock, IndianRupee } from "lucide-react";
import StatCard from "@/components/admin/StatCard";
import { adminApiRequest } from "@/lib/adminApi";

interface Stats {
  totalUsers: number;
  totalProducts: number;
  totalOrders: number;
  pendingOrders: number;
  revenue: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    adminApiRequest("/users/stats/dashboard").then(setStats).catch(console.error);
  }, []);

  return (
    <div>
      <h1 className="font-[family-name:var(--font-display)] text-2xl font-bold text-white">Dashboard</h1>
      <p className="mt-1 text-sm text-[#8b92a6]">Overview of your store's performance</p>

      <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-5">
        <StatCard label="Total Users" value={stats?.totalUsers ?? "—"} icon={Users} tint="bg-[#6D5EF0]/15 text-[#6D5EF0]" />
        <StatCard label="Total Products" value={stats?.totalProducts ?? "—"} icon={Boxes} tint="bg-[#22C55E]/15 text-[#22C55E]" />
        <StatCard label="Total Orders" value={stats?.totalOrders ?? "—"} icon={ClipboardList} tint="bg-[#F59E0B]/15 text-[#F59E0B]" />
        <StatCard label="Pending Orders" value={stats?.pendingOrders ?? "—"} icon={Clock} tint="bg-[#EF4444]/15 text-[#EF4444]" />
        <StatCard
          label="Revenue (Delivered)"
          value={stats ? `₹${stats.revenue.toLocaleString()}` : "—"}
          icon={IndianRupee}
          tint="bg-[#38BDF8]/15 text-[#38BDF8]"
        />
      </div>

      <div className="mt-8 rounded-2xl border border-[#232733] bg-[#12141c] p-6 text-sm text-[#8b92a6]">
        Use the sidebar to upload new products, manage existing listings, track and update deliveries,
        and monitor user activity including device, location and login history.
      </div>
    </div>
  );
}
