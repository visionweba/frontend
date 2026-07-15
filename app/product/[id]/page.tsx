"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import { Star, ShoppingCart, Zap, ShieldCheck, Truck } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { apiRequest, imageUrl } from "@/lib/api";
import { Product } from "@/types";
import { useCart } from "@/context/CartContext";

export default function ProductDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const { addToCart } = useCart();

  const [product, setProduct] = useState<Product | null>(null);
  const [activeImg, setActiveImg] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await apiRequest(`/products/${id}`, { auth: false });
        setProduct(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f8f8fb]">
        <Navbar />
        <div className="mx-auto max-w-6xl px-4 py-16 text-center text-[#6b7280]">Loading product...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-[#f8f8fb]">
        <Navbar />
        <div className="mx-auto max-w-6xl px-4 py-16 text-center text-[#6b7280]">Product not found.</div>
      </div>
    );
  }

  const discount = Math.round(((product.mrp - product.price) / product.mrp) * 100);

  return (
    <div className="min-h-screen bg-[#f8f8fb]">
      <Navbar />
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          {/* Gallery */}
          <div className="animate-fade-up">
            <div className="aspect-square overflow-hidden rounded-2xl border border-[#e7e7ee] bg-white">
              {product.images?.[activeImg] ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={imageUrl(product.images[activeImg])}
                  alt={product.title}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-gray-300">No image</div>
              )}
            </div>
            {product.images?.length > 1 && (
              <div className="mt-3 flex gap-3">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImg(idx)}
                    className={`h-16 w-16 overflow-hidden rounded-lg border-2 ${
                      activeImg === idx ? "border-[#4338CA]" : "border-transparent"
                    }`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={imageUrl(img)} alt="" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div className="animate-fade-up">
            <span className="rounded-full bg-[#4338CA]/10 px-3 py-1 text-xs font-semibold text-[#4338CA]">
              {product.category}
            </span>
            <h1 className="mt-3 font-[family-name:var(--font-display)] text-2xl font-bold text-[#14141f] sm:text-3xl">
              {product.title}
            </h1>
            <div className="mt-2 flex items-center gap-2 text-sm text-[#6b7280]">
              <span className="flex items-center gap-1 rounded bg-green-600 px-1.5 py-0.5 text-xs font-bold text-white">
                <Star size={11} className="fill-white" /> {product.rating?.toFixed(1)}
              </span>
              {product.numReviews} ratings
            </div>

            <div className="mt-5 flex items-baseline gap-3">
              <span className="text-3xl font-extrabold text-[#14141f]">₹{product.price.toLocaleString()}</span>
              {product.mrp > product.price && (
                <>
                  <span className="text-lg text-gray-400 line-through">₹{product.mrp.toLocaleString()}</span>
                  <span className="text-lg font-semibold text-green-600">{discount}% off</span>
                </>
              )}
            </div>

            <p className="mt-2 text-sm">
              {product.stock > 0 ? (
                <span className="font-medium text-green-600">In stock</span>
              ) : (
                <span className="font-medium text-red-500">Out of stock</span>
              )}
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <button
                onClick={() => addToCart(product, 1)}
                disabled={product.stock <= 0}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#14141f] py-3.5 text-sm font-semibold text-white transition hover:bg-[#2b2b3a] disabled:cursor-not-allowed disabled:bg-gray-300"
              >
                <ShoppingCart size={18} /> Add to cart
              </button>
              <button
                onClick={() => {
                  addToCart(product, 1);
                  router.push("/cart");
                }}
                disabled={product.stock <= 0}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#F59E0B] py-3.5 text-sm font-semibold text-white transition hover:bg-[#d98d08] disabled:cursor-not-allowed disabled:bg-gray-300"
              >
                <Zap size={18} /> Buy now
              </button>
            </div>

            <div className="mt-6 flex flex-wrap gap-5 text-sm text-[#6b7280]">
              <div className="flex items-center gap-2"><ShieldCheck size={16} className="text-[#4338CA]" /> 1 year warranty</div>
              <div className="flex items-center gap-2"><Truck size={16} className="text-[#4338CA]" /> Delivered in 2-4 days</div>
            </div>

            <div className="mt-8 border-t border-[#e7e7ee] pt-6">
              <h3 className="font-semibold text-[#14141f]">Product description</h3>
              <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-[#4b4b57]">
                {product.description}
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
