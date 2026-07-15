"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ShieldCheck, Mail, Lock } from "lucide-react";
import { apiRequest } from "@/lib/api";
import { setAdminSession } from "@/lib/adminApi";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const data = await apiRequest("/auth/admin-login", {
        method: "POST",
        body: { email, password },
        auth: false,
      });
      setAdminSession(data.token, data.user);
      router.push("/admin");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-sm rounded-2xl border border-[#232733] bg-[#12141c] p-8">
        <div className="flex flex-col items-center">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#6D5EF0] to-[#4338CA] text-white">
            <ShieldCheck size={22} />
          </span>
          <h1 className="mt-4 font-[family-name:var(--font-display)] text-xl font-bold text-white">Admin Login</h1>
          <p className="mt-1 text-sm text-[#8b92a6]">Voltique control center</p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8b92a6]" size={18} />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Admin email"
              className="w-full rounded-xl border border-[#232733] bg-[#0b0d14] py-3 pl-10 pr-4 text-sm text-white outline-none focus:border-[#6D5EF0]"
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8b92a6]" size={18} />
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full rounded-xl border border-[#232733] bg-[#0b0d14] py-3 pl-10 pr-4 text-sm text-white outline-none focus:border-[#6D5EF0]"
            />
          </div>

          {error && <p className="text-sm text-red-400">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-gradient-to-r from-[#6D5EF0] to-[#4338CA] py-3 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}
