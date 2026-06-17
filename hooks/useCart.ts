"use client";
import { useCartStore } from "@/store/cartStore";

export function useCart() {
  const store = useCartStore();
  return {
    items:        store.items,
    isOpen:       store.isOpen,
    totalItems:   store.totalItems(),
    totalPrice:   store.totalPrice(),
    addItem:      store.addItem,
    removeItem:   store.removeItem,
    updateQty:    store.updateQty,
    clearCart:    store.clearCart,
    openCart:     store.openCart,
    closeCart:    store.closeCart,
    toggleCart:   store.toggleCart,
  };
}
