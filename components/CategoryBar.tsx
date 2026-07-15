"use client";

import { Smartphone, Laptop, Headphones, Tv, Camera, Watch, Cable, Gamepad2, LayoutGrid } from "lucide-react";

export const CATEGORIES = [
  { name: "All", icon: LayoutGrid },
  { name: "Mobiles", icon: Smartphone },
  { name: "Laptops", icon: Laptop },
  { name: "Audio", icon: Headphones },
  { name: "Televisions", icon: Tv },
  { name: "Cameras", icon: Camera },
  { name: "Wearables", icon: Watch },
  { name: "Accessories", icon: Cable },
  { name: "Gaming", icon: Gamepad2 },
];

export default function CategoryBar({
  active,
  onSelect,
}: {
  active: string;
  onSelect: (cat: string) => void;
}) {
  return (
    <div className="border-b border-[#e7e7ee] bg-white">
      <div className="mx-auto flex max-w-7xl gap-1 overflow-x-auto px-4 py-3 sm:px-6 lg:px-8">
        {CATEGORIES.map(({ name, icon: Icon }) => {
          const isActive = active === name;
          return (
            <button
              key={name}
              onClick={() => onSelect(name)}
              className={`flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition ${
                isActive
                  ? "border-[#4338CA] bg-[#4338CA] text-white shadow-sm shadow-[#4338CA]/25"
                  : "border-[#e7e7ee] text-[#4b4b57] hover:border-[#4338CA]/40 hover:text-[#4338CA]"
              }`}
            >
              <Icon size={16} />
              {name}
            </button>
          );
        })}
      </div>
    </div>
  );
}
