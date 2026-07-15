"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { imageUrl } from "@/lib/api";

export default function CartPage() {
  const { items, updateQuantity, removeFromCart, cartTotal } = useCart();
  const { user } = useAuth();
  const router = useRouter();

  const handleCheckout = () => {
    if (!user) {
      router.push("/login?next=/checkout");
      return;
    }
    router.push("/checkout");
  };

  return (
    <div className="min-h-screen bg-[#f8f8fb]">
      <Navbar />
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="font-[family-name:var(--font-display)] text-2xl font-bold text-[#14141f]">Your Cart</h1>

        {items.length === 0 ? (
          <div className="mt-16 flex flex-col items-center gap-4 text-center text-[#6b7280]">
            <ShoppingBag size={48} className="text-gray-300" />
            <p>Your cart is empty.</p>
            <Link href="/" className="rounded-xl bg-[#4338CA] px-5 py-2.5 text-sm font-semibold text-white">
              Continue shopping
            </Link>
          </div>
        ) : (
          <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="space-y-4 lg:col-span-2">
              {items.map(({ product, quantity }) => (
                <div
                  key={product._id}
                  className="flex animate-fade-up gap-4 rounded-2xl border border-[#e7e7ee] bg-white p-4"
                >
                  <div className="h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-[#f8f8fb]">
                    {product.images?.[0] && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={imageUrl(product.images[0])} alt="" className="h-full w-full object-cover" />
                    )}
                  </div>
                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <Link href={`/product/${product._id}`} className="line-clamp-1 text-sm font-medium text-[#14141f]">
                        {product.title}
                      </Link>
                      <p className="mt-1 text-sm font-bold text-[#14141f]">₹{product.price.toLocaleString()}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 rounded-full border border-[#e7e7ee] px-2 py-1">
                        <button onClick={() => updateQuantity(product._id, quantity - 1)}>
                          <Minus size={14} />
                        </button>
                        <span className="w-4 text-center text-sm">{quantity}</span>
                        <button onClick={() => updateQuantity(product._id, quantity + 1)}>
                          <Plus size={14} />
                        </button>
                      </div>
                      <button onClick={() => removeFromCart(product._id)} className="text-red-500">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="h-fit rounded-2xl border border-[#e7e7ee] bg-white p-6">
              <h2 className="font-semibold text-[#14141f]">Order summary</h2>
              <div className="mt-4 flex justify-between text-sm text-[#6b7280]">
                <span>Subtotal</span>
                <span>₹{cartTotal.toLocaleString()}</span>
              </div>
              <div className="mt-2 flex justify-between text-sm text-[#6b7280]">
                <span>Delivery</span>
                <span className="text-green-600">Free</span>
              </div>
              <div className="mt-4 flex justify-between border-t border-[#e7e7ee] pt-4 text-base font-bold text-[#14141f]">
                <span>Total</span>
                <span>₹{cartTotal.toLocaleString()}</span>
              </div>
              <button
                onClick={handleCheckout}
                className="mt-6 w-full rounded-xl bg-[#14141f] py-3 text-sm font-semibold text-white transition hover:bg-[#2b2b3a]"
              >
                Proceed to checkout
              </button>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
