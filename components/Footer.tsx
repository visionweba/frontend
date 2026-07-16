import Link from "next/link";
import { Zap, ShieldCheck, Truck, RotateCcw } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-[#e7e7ee] bg-white">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 py-10 sm:grid-cols-3 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div>
          <div className="flex items-center gap-1.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#4338CA] text-white">
              <Zap size={18} />
            </span>
            <span className="font-[family-name:var(--font-display)] text-lg font-extrabold">VISION</span>
          </div>
          <p className="mt-3 text-sm text-[#6b7280]">
            Your trusted destination for the latest mobiles, laptops, audio and smart gadgets.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-[#14141f]">Company</h4>
          <ul className="mt-3 space-y-2 text-sm text-[#6b7280]">
            <li><Link href="/">About us</Link></li>
            <li><Link href="/">Careers</Link></li>
            <li><Link href="/">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-[#14141f]">Help</h4>
          <ul className="mt-3 space-y-2 text-sm text-[#6b7280]">
            <li><Link href="/account">Track order</Link></li>
            <li><Link href="/">Returns</Link></li>
            <li><Link href="/">FAQs</Link></li>
          </ul>
        </div>
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm text-[#6b7280]"><ShieldCheck size={16} className="text-[#4338CA]" /> Secure payments</div>
          <div className="flex items-center gap-2 text-sm text-[#6b7280]"><Truck size={16} className="text-[#4338CA]" /> Fast delivery</div>
          <div className="flex items-center gap-2 text-sm text-[#6b7280]"><RotateCcw size={16} className="text-[#4338CA]" /> Easy returns</div>
        </div>
      </div>
      <div className="border-t border-[#e7e7ee] py-4 text-center text-xs text-[#6b7280]">
        © {new Date().getFullYear()} Voltique. All rights reserved.
      </div>
    </footer>
  );
}
