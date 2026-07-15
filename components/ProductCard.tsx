"use client";

import Link from "next/link";
import { Star, ShoppingCart } from "lucide-react";
import { Product } from "@/types";
import { imageUrl } from "@/lib/api";
import { useCart } from "@/context/CartContext";

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const discount =
    product.discountPercent ?? Math.round(((product.mrp - product.price) / product.mrp) * 100);

  return (
    <div className="group animate-fade-up overflow-hidden rounded-2xl border border-[#e7e7ee] bg-white transition hover:-translate-y-1 hover:border-[#4338CA]/30 hover:shadow-xl hover:shadow-[#4338CA]/10">
      <Link href={`/product/${product._id}`} className="block">
        <div className="relative aspect-square overflow-hidden bg-[#f8f8fb]">
          {discount > 0 && (
            <span className="absolute left-3 top-3 z-10 rounded-full bg-[#F59E0B] px-2.5 py-1 text-xs font-bold text-white">
              {discount}% OFF
            </span>
          )}
          {product.images?.[0] ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={imageUrl(product.images[0])}
              alt={product.title}
              className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-gray-300">No image</div>
          )}
        </div>
        <div className="p-4">
          <p className="line-clamp-2 min-h-[2.5rem] text-sm font-medium text-[#14141f]">
            {product.title}
          </p>
          <div className="mt-1.5 flex items-center gap-1 text-xs text-[#6b7280]">
            <Star size={13} className="fill-[#F59E0B] text-[#F59E0B]" />
            {product.rating?.toFixed(1)} · {product.numReviews} reviews
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-lg font-bold text-[#14141f]">₹{product.price.toLocaleString()}</span>
            {product.mrp > product.price && (
              <span className="text-xs text-gray-400 line-through">₹{product.mrp.toLocaleString()}</span>
            )}
          </div>
        </div>
      </Link>
      <div className="px-4 pb-4">
        <button
          onClick={() => addToCart(product, 1)}
          disabled={product.stock <= 0}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#14141f] py-2.5 text-sm font-semibold text-white transition hover:bg-[#4338CA] disabled:cursor-not-allowed disabled:bg-gray-300"
        >
          <ShoppingCart size={16} />
          {product.stock <= 0 ? "Out of stock" : "Add to cart"}
        </button>
      </div>
    </div>
  );
}
