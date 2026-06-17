"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { ArrowUpDown } from "lucide-react";
import { SORT_OPTIONS } from "@/lib/constants";

export default function ProductSort() {
  const router = useRouter();
  const params = useSearchParams();
  const current = params.get("sort") ?? "newest";

  const handleChange = (value: string) => {
    const p = new URLSearchParams(params.toString());
    p.set("sort", value);
    p.delete("page");
    router.push(`?${p.toString()}`);
  };

  return (
    <div className="flex items-center gap-2">
      <ArrowUpDown className="w-4 h-4 text-muted-foreground shrink-0" />
      <select
        value={current}
        onChange={(e) => handleChange(e.target.value)}
        className="text-sm bg-background border border-input rounded-lg px-3 py-1.5
                   focus:outline-none focus:ring-2 focus:ring-ring cursor-pointer"
      >
        {SORT_OPTIONS.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
    </div>
  );
}
