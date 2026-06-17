"use client";

import { Heart } from "lucide-react";
import { useWishlistStore } from "@/store/wishlistStore";
import { cn } from "@/lib/utils";

interface WishlistButtonProps {
  product: { productId: string; name: string; slug: string; image: string; price: number; salePrice?: number };
  size?: "sm" | "md";
  className?: string;
}

export default function WishlistButton({ product, size = "sm", className }: WishlistButtonProps) {
  const { toggle, isWishlisted } = useWishlistStore();
  const liked = isWishlisted(product.productId);
  const dim = size === "sm" ? "w-8 h-8" : "w-10 h-10";

  return (
    <button
      onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggle(product); }}
      aria-label={liked ? "Remove from wishlist" : "Add to wishlist"}
      className={cn(
        dim,
        "flex items-center justify-center rounded-full bg-white dark:bg-slate-800 shadow-md",
        "border border-border transition-all duration-200 hover:scale-110 active:scale-95",
        className
      )}
    >
      <Heart className={cn(size === "sm" ? "w-4 h-4" : "w-5 h-5", liked ? "fill-red-500 text-red-500" : "text-muted-foreground")} />
    </button>
  );
}
