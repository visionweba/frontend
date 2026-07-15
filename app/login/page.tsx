"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Zap, Mail, Lock } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

function LoginContent() {
  const { login } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next") || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      router.push(next);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f8f8fb] px-4">
      <div className="w-full max-w-md animate-fade-up rounded-2xl border border-[#e7e7ee] bg-white p-8 shadow-xl shadow-black/5">
        <div className="flex flex-col items-center">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#4338CA] text-white">
            <Zap size={22} />
          </span>
          <h1 className="mt-4 font-[family-name:var(--font-display)] text-2xl font-bold text-[#14141f]">
            Welcome back
          </h1>
          <p className="mt-1 text-sm text-[#6b7280]">Login to continue to Voltique</p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              className="w-full rounded-xl border border-[#e7e7ee] py-3 pl-10 pr-4 text-sm outline-none focus:border-[#4338CA] focus:ring-2 focus:ring-[#4338CA]/15"
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full rounded-xl border border-[#e7e7ee] py-3 pl-10 pr-4 text-sm outline-none focus:border-[#4338CA] focus:ring-2 focus:ring-[#4338CA]/15"
            />
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-[#14141f] py-3 text-sm font-semibold text-white transition hover:bg-[#2b2b3a] disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-[#6b7280]">
          New to Voltique?{" "}
          <Link href="/signup" className="font-semibold text-[#4338CA]">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginContent />
    </Suspense>
  );
}
