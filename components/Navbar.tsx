"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Search, ShoppingCart, User, Zap, LogOut, Package } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
  const [query, setQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const { cartCount } = useCart();
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(query ? `/?search=${encodeURIComponent(query)}` : "/");
  };

  return (
    <header className="sticky top-0 z-40 border-b border-[#e7e7ee] bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-1.5 shrink-0">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#4338CA] text-white">
            <Zap size={18} strokeWidth={2.5} />
          </span>
          <span className="font-[family-name:var(--font-display)] text-xl font-extrabold tracking-tight text-[#14141f]">
            Voltique
          </span>
        </Link>

        <form onSubmit={handleSearch} className="relative hidden flex-1 max-w-xl sm:block">
          <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search phones, laptops, headphones..."
            className="w-full rounded-full border border-[#e7e7ee] bg-[#f8f8fb] py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-[#4338CA] focus:bg-white focus:ring-2 focus:ring-[#4338CA]/15"
          />
        </form>

        <div className="ml-auto flex items-center gap-2 sm:gap-4">
          <div className="relative">
            <button
              onClick={() => setMenuOpen((v) => !v)}
              onBlur={() => setTimeout(() => setMenuOpen(false), 150)}
              className="flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium text-[#14141f] transition hover:bg-[#f8f8fb]"
            >
              <User size={19} />
              <span className="hidden sm:inline">{user ? user.name.split(" ")[0] : "Account"}</span>
            </button>
            {menuOpen && (
              <div className="absolute right-0 top-full mt-2 w-52 animate-fade-up rounded-xl border border-[#e7e7ee] bg-white p-1.5 shadow-xl shadow-black/5">
                {user ? (
                  <>
                    <Link href="/account" className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm hover:bg-[#f8f8fb]">
                      <Package size={16} /> My Orders
                    </Link>
                    <button
                      onClick={logout}
                      className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50"
                    >
                      <LogOut size={16} /> Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link href="/login" className="block rounded-lg px-3 py-2 text-sm hover:bg-[#f8f8fb] z-20">
                      Login
                    </Link>
                    <Link href="/signup" className="block rounded-lg px-3 py-2 text-sm hover:bg-[#f8f8fb] z-20">
                      Create account
                    </Link>
                  </>
                )}
              </div>
            )}
          </div>

          <Link
            href="/cart"
            className="relative flex items-center gap-2 rounded-full bg-[#14141f] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#2b2b3a]"
          >
            <ShoppingCart size={18} />
            <span className="hidden sm:inline">Cart</span>
            {cartCount > 0 && (
              <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-[#F59E0B] text-[11px] font-bold text-white">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>
      <form onSubmit={handleSearch} className="relative block px-4 pb-3 sm:hidden">
        <Search className="pointer-events-none absolute left-7 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search products..."
          className="w-full rounded-full border border-[#e7e7ee] bg-[#f8f8fb] py-2.5 pl-10 pr-4 text-sm outline-none focus:border-[#4338CA]"
        />
      </form>
    </header>
  );
}
