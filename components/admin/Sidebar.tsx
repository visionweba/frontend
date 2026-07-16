"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  UploadCloud,
  Boxes,
  Truck,
  Users,
  LogOut,
  Zap,
} from "lucide-react";
import { clearAdminSession, getAdminUser } from "@/lib/adminApi";

const NAV = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/products/upload", label: "Upload Product", icon: UploadCloud },
  { href: "/admin/products", label: "Manage Products", icon: Boxes },
  { href: "/admin/orders", label: "Manage Delivery", icon: Truck },
  { href: "/admin/users", label: "User Management", icon: Users },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const admin = getAdminUser();

  const handleLogout = () => {
    clearAdminSession();
    router.push("/admin/login");
  };

  return (
    <aside className="flex h-screen w-64 shrink-0 flex-col border-r border-[#232733] bg-[#12141c] text-[#e6e8f0]">
      <div className="flex items-center gap-2 px-6 py-6">
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-[#6D5EF0] to-[#4338CA] text-white">
          <Zap size={18} />
        </span>
        <div>
          <p className="font-[family-name:var(--font-display)] text-base font-bold">VISION</p>
          <p className="text-xs text-[#8b92a6]">Admin Panel</p>
        </div>
      </div>

      <nav className="flex-1 space-y-1 px-3">
        {NAV.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                active
                  ? "bg-[#6D5EF0]/15 text-white shadow-[inset_0_0_0_1px_rgba(109,94,240,0.35)]"
                  : "text-[#8b92a6] hover:bg-[#181b26] hover:text-white"
              }`}
            >
              <Icon size={18} className={active ? "text-[#6D5EF0]" : ""} />
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-[#232733] p-4">
        <p className="truncate text-xs text-[#8b92a6]">{admin?.email}</p>
        <button
          onClick={handleLogout}
          className="mt-3 flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium text-red-400 transition hover:bg-red-500/10"
        >
          <LogOut size={18} /> Logout
        </button>
      </div>
    </aside>
  );
}
