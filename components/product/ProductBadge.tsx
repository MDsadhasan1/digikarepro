import { cn } from "@/lib/utils";

interface ProductBadgeProps {
  type: "new" | "sale" | "best" | "out";
  discount?: number;
  className?: string;
}

const config = {
  new:  { label: "New",          cls: "bg-brand-600 text-white" },
  sale: { label: "",             cls: "bg-accent text-white" },
  best: { label: "Best Seller",  cls: "bg-teal-500 text-white" },
  out:  { label: "Out of Stock", cls: "bg-slate-500 text-white" },
};

export default function ProductBadge({ type, discount, className }: ProductBadgeProps) {
  const { cls } = config[type];
  const label = type === "sale" ? `${discount ?? 0}% OFF` : config[type].label;
  return (
    <span className={cn("badge-pill text-[11px] font-bold px-2 py-0.5", cls, className)}>
      {label}
    </span>
  );
}
