"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MapPin } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { apiRequest } from "@/lib/api";

export default function CheckoutPage() {
  const { items, cartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const router = useRouter();

  const [form, setForm] = useState({
    fullName: user?.name || "",
    phone: "",
    line1: "",
    city: "",
    state: "",
    pincode: "",
  });
  const [placing, setPlacing] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async () => {
    setError("");
    if (!form.fullName || !form.phone || !form.line1 || !form.city || !form.state || !form.pincode) {
      setError("Please fill all the address fields.");
      return;
    }
    setPlacing(true);
    try {
      await apiRequest("/orders", {
        method: "POST",
        body: {
          items: items.map((i) => ({
            product: i.product._id,
            title: i.product.title,
            image: i.product.images?.[0] || "",
            price: i.product.price,
            quantity: i.quantity,
          })),
          totalAmount: cartTotal,
          shippingInfo: form,
          paymentMethod: "COD",
        },
      });
      clearCart();
      router.push("/account");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setPlacing(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[#f8f8fb]">
        <Navbar />
        <div className="mx-auto max-w-3xl px-4 py-16 text-center text-[#6b7280]">
          Your cart is empty. Add items before checking out.
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f8fb]">
      <Navbar />
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="flex items-center gap-2 font-[family-name:var(--font-display)] text-2xl font-bold text-[#14141f]">
          <MapPin size={22} className="text-[#4338CA]" /> Shipping details
        </h1>

        <div className="mt-6 grid grid-cols-1 gap-4 rounded-2xl border border-[#e7e7ee] bg-white p-6 sm:grid-cols-2">
          <input name="fullName" value={form.fullName} onChange={handleChange} placeholder="Full name" className="input" />
          <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone number" className="input" />
          <input name="line1" value={form.line1} onChange={handleChange} placeholder="Address" className="input sm:col-span-2" />
          <input name="city" value={form.city} onChange={handleChange} placeholder="City" className="input" />
          <input name="state" value={form.state} onChange={handleChange} placeholder="State" className="input" />
          <input name="pincode" value={form.pincode} onChange={handleChange} placeholder="Pincode" className="input" />
        </div>

        {error && <p className="mt-3 text-sm text-red-500">{error}</p>}

        <div className="mt-6 flex items-center justify-between rounded-2xl border border-[#e7e7ee] bg-white p-6">
          <span className="text-sm text-[#6b7280]">Total payable (Cash on Delivery)</span>
          <span className="text-xl font-bold text-[#14141f]">₹{cartTotal.toLocaleString()}</span>
        </div>

        <button
          onClick={handlePlaceOrder}
          disabled={placing}
          className="mt-6 w-full rounded-xl bg-[#14141f] py-3.5 text-sm font-semibold text-white transition hover:bg-[#2b2b3a] disabled:opacity-60"
        >
          {placing ? "Placing order..." : "Place order"}
        </button>
      </div>
      <Footer />

      <style jsx global>{`
        .input {
          border: 1px solid #e7e7ee;
          border-radius: 0.75rem;
          padding: 0.75rem 1rem;
          font-size: 0.875rem;
          outline: none;
        }
        .input:focus {
          border-color: #4338ca;
          box-shadow: 0 0 0 3px rgba(67, 56, 202, 0.12);
        }
      `}</style>
    </div>
  );
}
