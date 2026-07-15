"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Package, MapPin } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/context/AuthContext";
import { apiRequest, imageUrl } from "@/lib/api";
import { Order } from "@/types";

const STATUS_STEPS = ["Placed", "Packed", "Shipped", "Out for Delivery", "Delivered"];

function statusColor(status: string) {
  if (status === "Delivered") return "text-green-600 bg-green-50";
  if (status === "Failed Delivery" || status === "Cancelled") return "text-red-600 bg-red-50";
  return "text-[#4338CA] bg-[#4338CA]/10";
}

export default function AccountPage() {
  const { user, loading: authLoading, logout } = useAuth();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) router.push("/login");
  }, [authLoading, user, router]);

  useEffect(() => {
    if (!user) return;
    apiRequest("/orders/my")
      .then(setOrders)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [user]);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#f8f8fb]">
      <Navbar />
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-[family-name:var(--font-display)] text-2xl font-bold text-[#14141f]">
              Hi, {user.name}
            </h1>
            <p className="text-sm text-[#6b7280]">{user.email}</p>
          </div>
          <button onClick={logout} className="rounded-xl border border-[#e7e7ee] px-4 py-2 text-sm font-medium text-[#14141f] hover:bg-white">
            Logout
          </button>
        </div>

        <h2 className="mt-8 flex items-center gap-2 text-lg font-semibold text-[#14141f]">
          <Package size={20} className="text-[#4338CA]" /> My Orders
        </h2>

        {loading ? (
          <p className="mt-4 text-sm text-[#6b7280]">Loading orders...</p>
        ) : orders.length === 0 ? (
          <p className="mt-4 text-sm text-[#6b7280]">You haven't placed any orders yet.</p>
        ) : (
          <div className="mt-4 space-y-5">
            {orders.map((order) => (
              <div key={order._id} className="animate-fade-up rounded-2xl border border-[#e7e7ee] bg-white p-5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <p className="text-xs text-[#6b7280]">Order #{order._id.slice(-8).toUpperCase()}</p>
                    <p className="text-xs text-[#6b7280]">{new Date(order.createdAt).toLocaleDateString()}</p>
                  </div>
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusColor(order.status)}`}>
                    {order.status}
                  </span>
                </div>

                <div className="mt-4 space-y-2">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div className="h-12 w-12 overflow-hidden rounded-lg bg-[#f8f8fb]">
                        {item.image && (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={imageUrl(item.image)} alt="" className="h-full w-full object-cover" />
                        )}
                      </div>
                      <div className="flex-1 text-sm">
                        <p className="line-clamp-1 text-[#14141f]">{item.title}</p>
                        <p className="text-xs text-[#6b7280]">
                          Qty {item.quantity} · ₹{item.price.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {!["Cancelled", "Failed Delivery"].includes(order.status) && (
                  <div className="mt-4 flex items-center justify-between text-[10px] text-[#6b7280] sm:text-xs">
                    {STATUS_STEPS.map((step, idx) => {
                      const currentIdx = STATUS_STEPS.indexOf(order.status);
                      const reached = idx <= currentIdx;
                      return (
                        <div key={step} className="flex flex-1 flex-col items-center">
                          <div className={`h-2 w-full ${idx === 0 ? "rounded-l-full" : ""} ${idx === STATUS_STEPS.length - 1 ? "rounded-r-full" : ""} ${reached ? "bg-[#4338CA]" : "bg-[#e7e7ee]"}`} />
                          <span className={`mt-1 ${reached ? "font-semibold text-[#14141f]" : ""}`}>{step}</span>
                        </div>
                      );
                    })}
                  </div>
                )}

                <div className="mt-4 flex items-start gap-2 border-t border-[#e7e7ee] pt-3 text-xs text-[#6b7280]">
                  <MapPin size={14} className="mt-0.5 shrink-0 text-[#4338CA]" />
                  {order.shippingInfo.fullName}, {order.shippingInfo.line1}, {order.shippingInfo.city},{" "}
                  {order.shippingInfo.state} - {order.shippingInfo.pincode}
                </div>

                <p className="mt-2 text-right text-sm font-bold text-[#14141f]">
                  Total: ₹{order.totalAmount.toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
