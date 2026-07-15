"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Sparkles, ShieldCheck, Truck } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CategoryBar from "@/components/CategoryBar";
import ProductCard from "@/components/ProductCard";
import { apiRequest } from "@/lib/api";
import { Product } from "@/types";

function HomeContent() {
  const searchParams = useSearchParams();
  const search = searchParams.get("search") || "";

  const [category, setCategory] = useState("All");
  const [maxPrice, setMaxPrice] = useState<number | "">("");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (search) params.set("search", search);
        if (category !== "All") params.set("category", category);
        if (maxPrice) params.set("maxPrice", String(maxPrice));
        const data = await apiRequest(`/products?${params.toString()}`, { auth: false });
        setProducts(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [search, category, maxPrice]);

  const priceOptions = [5000, 15000, 30000, 60000, 100000];

  return (
    <div className="min-h-screen bg-[#f8f8fb]">
      <Navbar />
      <CategoryBar active={category} onSelect={setCategory} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[#14141f]">
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#4338CA]/40 blur-3xl" />
        <div className="pointer-events-none absolute -left-16 bottom-0 h-56 w-56 rounded-full bg-[#F59E0B]/20 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium text-white/80">
            <Sparkles size={14} className="text-[#F59E0B]" /> Big Bachat Days — Live Now
          </span>
          <h1 className="mt-4 max-w-2xl font-[family-name:var(--font-display)] text-3xl font-extrabold leading-tight text-white sm:text-5xl">
            Power up with the latest tech, at prices that click.
          </h1>
          <p className="mt-3 max-w-xl text-sm text-white/70 sm:text-base">
            Mobiles, laptops, audio, wearables and more — curated, genuine and delivered fast.
          </p>
          <div className="mt-6 flex flex-wrap gap-4 text-sm text-white/70">
            <div className="flex items-center gap-2"><ShieldCheck size={16} className="text-[#F59E0B]" /> 100% Authentic</div>
            <div className="flex items-center gap-2"><Truck size={16} className="text-[#F59E0B]" /> Fast Delivery</div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h2 className="font-[family-name:var(--font-display)] text-xl font-bold text-[#14141f]">
            {search ? `Results for "${search}"` : "Shop all electronics"}
          </h2>
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm text-[#6b7280]">Under:</span>
            {priceOptions.map((p) => (
              <button
                key={p}
                onClick={() => setMaxPrice(maxPrice === p ? "" : p)}
                className={`rounded-full border px-3 py-1.5 text-xs font-medium transition ${
                  maxPrice === p
                    ? "border-[#4338CA] bg-[#4338CA] text-white"
                    : "border-[#e7e7ee] text-[#4b4b57] hover:border-[#4338CA]/40"
                }`}
              >
                ₹{p.toLocaleString()}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="mt-8 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="animate-shimmer h-72 rounded-2xl border border-[#e7e7ee]" />
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="mt-16 text-center text-[#6b7280]">No products found. Try a different filter.</div>
        ) : (
          <div className="mt-8 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
            {products.map((p) => (
              <ProductCard key={p._id} product={p} />
            ))}
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={null}>
      <HomeContent />
    </Suspense>
  );
}
