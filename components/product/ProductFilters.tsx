"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { X, SlidersHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatPrice } from "@/lib/format";

const categories = [
  { id: "all", name: "All Categories" },
  { id: "electronics", name: "Electronics" },
  { id: "fashion", name: "Fashion" },
  { id: "home-living", name: "Home & Living" },
  { id: "health-beauty", name: "Health & Beauty" },
  { id: "sports", name: "Sports" },
  { id: "books", name: "Books" },
];

const priceRanges = [
  { label: "Under ৳500",    min: 0,    max: 500 },
  { label: "৳500 – ৳1000", min: 500,  max: 1000 },
  { label: "৳1000 – ৳3000",min: 1000, max: 3000 },
  { label: "৳3000 – ৳5000",min: 3000, max: 5000 },
  { label: "৳5000+",        min: 5000, max: 999999 },
];

export default function ProductFilters({ onClose }: { onClose?: () => void }) {
  const router = useRouter();
  const params = useSearchParams();

  const set = (key: string, value: string) => {
    const p = new URLSearchParams(params.toString());
    value ? p.set(key, value) : p.delete(key);
    p.delete("page");
    router.push(`?${p.toString()}`);
  };

  const clearAll = () => {
    router.push("/products");
    onClose?.();
  };

  const activeCategory = params.get("category") ?? "all";
  const minPrice = params.get("minPrice");
  const maxPrice = params.get("maxPrice");
  const activeRange = priceRanges.find((r) => String(r.min) === minPrice && String(r.max) === maxPrice);

  const hasFilters = activeCategory !== "all" || minPrice || maxPrice;

  return (
    <aside className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 font-semibold text-foreground">
          <SlidersHorizontal className="w-4 h-4" />
          Filters
        </div>
        {hasFilters && (
          <button onClick={clearAll} className="text-xs text-muted-foreground hover:text-destructive flex items-center gap-1">
            <X className="w-3 h-3" /> Clear all
          </button>
        )}
      </div>

      {/* Category */}
      <div>
        <h3 className="text-sm font-semibold text-foreground mb-3">Category</h3>
        <div className="space-y-1.5">
          {categories.map((c) => (
            <button key={c.id} onClick={() => { set("category", c.id === "all" ? "" : c.id); onClose?.(); }}
              className={cn(
                "w-full text-left text-sm px-3 py-2 rounded-lg transition-colors",
                activeCategory === c.id
                  ? "bg-brand-50 dark:bg-brand-900/20 text-brand-600 font-medium"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}>
              {c.name}
            </button>
          ))}
        </div>
      </div>

      {/* Price */}
      <div>
        <h3 className="text-sm font-semibold text-foreground mb-3">Price Range</h3>
        <div className="space-y-1.5">
          {priceRanges.map((r) => {
            const active = activeRange?.label === r.label;
            return (
              <button key={r.label}
                onClick={() => { set("minPrice", String(r.min)); set("maxPrice", String(r.max)); onClose?.(); }}
                className={cn(
                  "w-full text-left text-sm px-3 py-2 rounded-lg transition-colors",
                  active ? "bg-brand-50 dark:bg-brand-900/20 text-brand-600 font-medium" : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}>
                {r.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Availability */}
      <div>
        <h3 className="text-sm font-semibold text-foreground mb-3">Availability</h3>
        <label className="flex items-center gap-2.5 cursor-pointer">
          <input type="checkbox" checked={params.get("inStock") === "1"}
            onChange={(e) => set("inStock", e.target.checked ? "1" : "")}
            className="w-4 h-4 rounded accent-brand-600" />
          <span className="text-sm text-muted-foreground">In Stock Only</span>
        </label>
      </div>
    </aside>
  );
}
