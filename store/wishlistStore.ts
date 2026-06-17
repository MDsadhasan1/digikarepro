"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { toast } from "sonner";

interface WishlistItem {
  productId: string;
  name:      string;
  slug:      string;
  image:     string;
  price:     number;
  salePrice?: number;
}

interface WishlistStore {
  items:      WishlistItem[];
  addItem:    (item: WishlistItem) => void;
  removeItem: (productId: string) => void;
  toggle:     (item: WishlistItem) => void;
  isWishlisted:(productId: string) => boolean;
  clearAll:   () => void;
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem(item) {
        if (get().isWishlisted(item.productId)) return;
        set((state) => ({ items: [...state.items, item] }));
        toast.success("Saved to wishlist", { description: item.name });
      },

      removeItem(productId) {
        set((state) => ({
          items: state.items.filter((i) => i.productId !== productId),
        }));
      },

      toggle(item) {
        get().isWishlisted(item.productId)
          ? get().removeItem(item.productId)
          : get().addItem(item);
      },

      isWishlisted: (productId) => get().items.some((i) => i.productId === productId),

      clearAll: () => set({ items: [] }),
    }),
    { name: "dgk-wishlist" }
  )
);
