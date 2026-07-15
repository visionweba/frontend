"use client";

import { useEffect, useState } from "react";
import { Truck, MapPin, Phone, User } from "lucide-react";
import { adminApiRequest } from "@/lib/adminApi";
import { Order } from "@/types";

const STATUS_FLOW = [
  "Placed",
  "Packed",
  "Shipped",
  "Out for Delivery",
  "Delivered",
  "Failed Delivery",
  "Cancelled",
];

function statusTint(status: string) {
  if (status === "Delivered") return "bg-[#22C55E]/15 text-[#22C55E]";
  if (status === "Failed Delivery" || status === "Cancelled") return "bg-[#EF4444]/15 text-[#EF4444]";
  if (status === "Placed") return "bg-[#38BDF8]/15 text-[#38BDF8]";
  return "bg-[#F59E0B]/15 text-[#F59E0B]";
}

export default function ManageOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);

  const load = () => {
    setLoading(true);
    adminApiRequest("/orders").then(setOrders).catch(console.error).finally(() => setLoading(false));
  };

  useEffect(load, []);

  const updateStatus = async (orderId: string, status: string) => {
    const updated = await adminApiRequest(`/orders/${orderId}/status`, { method: "PUT", body: { status } });
    setOrders((prev) => prev.map((o) => (o._id === orderId ? updated : o)));
  };

  const filtered = filter === "All" ? orders : orders.filter((o) => o.status === filter);

  return (
    <div>
      <h1 className="flex items-center gap-2 font-[family-name:var(--font-display)] text-2xl font-bold text-white">
        <Truck size={24} className="text-[#6D5EF0]" /> Manage Delivery
      </h1>
      <p className="mt-1 text-sm text-[#8b92a6]">Track and update the delivery status of every order</p>

      <div className="mt-4 flex flex-wrap gap-2">
        {["All", ...STATUS_FLOW].map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`rounded-full border px-3 py-1.5 text-xs font-medium transition ${
              filter === s ? "border-[#6D5EF0] bg-[#6D5EF0]/15 text-[#6D5EF0]" : "border-[#232733] text-[#8b92a6] hover:text-white"
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      <div className="mt-6 space-y-4">
        {loading ? (
          <p className="text-sm text-[#8b92a6]">Loading orders...</p>
        ) : filtered.length === 0 ? (
          <p className="text-sm text-[#8b92a6]">No orders in this stage.</p>
        ) : (
          filtered.map((order) => (
            <div key={order._id} className="rounded-2xl border border-[#232733] bg-[#12141c] p-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-xs text-[#8b92a6]">Order #{order._id.slice(-8).toUpperCase()}</p>
                  <p className="text-xs text-[#8b92a6]">{new Date(order.createdAt).toLocaleString()}</p>
                </div>
                <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusTint(order.status)}`}>
                  {order.status}
                </span>
              </div>

              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-1.5 text-sm text-[#c4c8d4]">
                  <p className="flex items-center gap-2"><User size={14} className="text-[#6D5EF0]" /> {order.shippingInfo.fullName}</p>
                  <p className="flex items-center gap-2"><Phone size={14} className="text-[#6D5EF0]" /> {order.shippingInfo.phone}</p>
                  <p className="flex items-start gap-2">
                    <MapPin size={14} className="mt-0.5 shrink-0 text-[#6D5EF0]" />
                    {order.shippingInfo.line1}, {order.shippingInfo.city}, {order.shippingInfo.state} - {order.shippingInfo.pincode}
                  </p>
                </div>
                <div className="space-y-1 text-sm text-[#c4c8d4]">
                  {order.items.map((item, idx) => (
                    <p key={idx} className="line-clamp-1">
                      {item.title} × {item.quantity}
                    </p>
                  ))}
                  <p className="mt-2 font-semibold text-white">Total: ₹{order.totalAmount.toLocaleString()}</p>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-[#1c1f2a] pt-4">
                <span className="text-xs text-[#8b92a6]">Update status:</span>
                <select
                  value={order.status}
                  onChange={(e) => updateStatus(order._id, e.target.value)}
                  className="rounded-xl border border-[#232733] bg-[#0b0d14] px-3 py-1.5 text-xs text-white outline-none focus:border-[#6D5EF0]"
                >
                  {STATUS_FLOW.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
