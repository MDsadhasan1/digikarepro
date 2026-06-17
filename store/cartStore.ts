"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem } from "@/types";
import { toast } from "sonner";

interface CartStore {
  items:       CartItem[];
  isOpen:      boolean;
  addItem:     (item: CartItem) => void;
  removeItem:  (id: string, variantId?: string) => void;
  updateQty:   (id: string, variantId: string | undefined, quantity: number) => void;
  clearCart:   () => void;
  openCart:    () => void;
  closeCart:   () => void;
  toggleCart:  () => void;
  totalItems:  () => number;
  totalPrice:  () => number;
}

const itemKey = (productId: string, variantId?: string) =>
  `${productId}-${variantId ?? "default"}`;

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items:  [],
      isOpen: false,

      addItem(item) {
        const key = itemKey(item.productId, item.variantId);
        const existing = get().items.find(
          (i) => itemKey(i.productId, i.variantId) === key
        );

        if (existing) {
          const newQty = Math.min(existing.quantity + item.quantity, item.stock);
          set((state) => ({
            items: state.items.map((i) =>
              itemKey(i.productId, i.variantId) === key ? { ...i, quantity: newQty } : i
            ),
          }));
          toast.success("Cart updated", { description: `${item.name} quantity updated.` });
        } else {
          set((state) => ({ items: [...state.items, item] }));
          toast.success("Added to cart", { description: item.name });
        }
        set({ isOpen: true });
      },

      removeItem(productId, variantId) {
        const key = itemKey(productId, variantId);
        set((state) => ({
          items: state.items.filter((i) => itemKey(i.productId, i.variantId) !== key),
        }));
      },

      updateQty(productId, variantId, quantity) {
        if (quantity < 1) return get().removeItem(productId, variantId);
        const key = itemKey(productId, variantId);
        set((state) => ({
          items: state.items.map((i) =>
            itemKey(i.productId, i.variantId) === key
              ? { ...i, quantity: Math.min(quantity, i.stock) }
              : i
          ),
        }));
      },

      clearCart: () => set({ items: [] }),
      openCart:  () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart:() => set((state) => ({ isOpen: !state.isOpen })),

      totalItems: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
      totalPrice: () =>
        get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),
    }),
    {
      name: "dgk-cart",
      partialize: (state) => ({ items: state.items }),
    }
  )
);
