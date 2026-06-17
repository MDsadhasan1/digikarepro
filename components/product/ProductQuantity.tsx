"use client";

import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProductQuantityProps {
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
  className?: string;
}

export default function ProductQuantity({ value, onChange, min = 1, max = 99, className }: ProductQuantityProps) {
  return (
    <div className={cn("inline-flex items-center gap-1 rounded-xl border border-input bg-background p-1", className)}>
      <button onClick={() => onChange(Math.max(min, value - 1))} disabled={value <= min}
        className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-muted transition-colors disabled:opacity-40">
        <Minus className="w-4 h-4" />
      </button>
      <span className="w-10 text-center text-sm font-semibold select-none">{value}</span>
      <button onClick={() => onChange(Math.min(max, value + 1))} disabled={value >= max}
        className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-muted transition-colors disabled:opacity-40">
        <Plus className="w-4 h-4" />
      </button>
    </div>
  );
}
