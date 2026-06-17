"use client";

import { ShoppingCart, Check } from "lucide-react";
import { useState } from "react";
import { useCartStore } from "@/store/cartStore";
import { cn } from "@/lib/utils";
import type { CartItem } from "@/types";

interface AddToCartButtonProps {
  item: CartItem;
  className?: string;
  variant?: "full" | "icon";
}

export default function AddToCartButton({ item, className, variant = "full" }: AddToCartButtonProps) {
  const addItem = useCartStore((s) => s.addItem);
  const [added, setAdded] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (item.stock <= 0) return;
    addItem(item);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  const disabled = item.stock <= 0;

  if (variant === "icon") {
    return (
      <button onClick={handleAdd} disabled={disabled}
        aria-label="Add to cart"
        className={cn(
          "w-8 h-8 flex items-center justify-center rounded-full shadow-md",
          "bg-brand-600 hover:bg-brand-700 text-white transition-all duration-200",
          "hover:scale-110 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed",
          added && "bg-green-600 hover:bg-green-700",
          className
        )}>
        {added ? <Check className="w-4 h-4" /> : <ShoppingCart className="w-4 h-4" />}
      </button>
    );
  }

  return (
    <button onClick={handleAdd} disabled={disabled}
      className={cn(
        "flex items-center justify-center gap-2 w-full py-3 rounded-xl font-semibold text-sm",
        "transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]",
        disabled
          ? "bg-muted text-muted-foreground cursor-not-allowed"
          : added
            ? "bg-green-600 hover:bg-green-700 text-white"
            : "bg-brand-600 hover:bg-brand-700 text-white shadow-brand-sm",
        className
      )}>
      {disabled ? "Out of Stock" : added ? <><Check className="w-4 h-4" /> Added!</> : <><ShoppingCart className="w-4 h-4" /> Add to Cart</>}
    </button>
  );
}
