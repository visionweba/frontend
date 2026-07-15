"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Sidebar from "@/components/admin/Sidebar";
import { getAdminUser } from "@/lib/adminApi";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [checked, setChecked] = useState(false);
  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    if (isLoginPage) {
      setChecked(true);
      return;
    }
    const admin = getAdminUser();
    if (!admin) {
      router.push("/admin/login");
    } else {
      setChecked(true);
    }
  }, [isLoginPage, router]);

  if (isLoginPage) {
    return <div className="admin-shell min-h-screen bg-[#0b0d14]">{children}</div>;
  }

  if (!checked) {
    return <div className="admin-shell min-h-screen bg-[#0b0d14]" />;
  }

  return (
    <div className="admin-shell flex min-h-screen bg-[#0b0d14] text-[#e6e8f0]">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-6 sm:p-8">{children}</main>
    </div>
  );
}
