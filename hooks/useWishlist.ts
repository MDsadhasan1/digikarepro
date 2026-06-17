"use client";
import { useWishlistStore } from "@/store/wishlistStore";

export function useWishlist() {
  const store = useWishlistStore();
  return {
    items:        store.items,
    count:        store.items.length,
    addItem:      store.addItem,
    removeItem:   store.removeItem,
    toggle:       store.toggle,
    isWishlisted: store.isWishlisted,
    clearAll:     store.clearAll,
  };
}
