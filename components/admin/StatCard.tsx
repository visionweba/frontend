import { LucideIcon } from "lucide-react";

export default function StatCard({
  label,
  value,
  icon: Icon,
  tint,
}: {
  label: string;
  value: string | number;
  icon: LucideIcon;
  tint: string;
}) {
  return (
    <div className="animate-fade-up rounded-2xl border border-[#232733] bg-[#12141c] p-5">
      <div className="flex items-center justify-between">
        <span className="text-sm text-[#8b92a6]">{label}</span>
        <span className={`flex h-9 w-9 items-center justify-center rounded-xl ${tint}`}>
          <Icon size={17} />
        </span>
      </div>
      <p className="mt-3 font-[family-name:var(--font-display)] text-2xl font-bold text-white">{value}</p>
    </div>
  );
}
