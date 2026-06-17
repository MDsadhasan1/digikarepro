"use client";

import { X, ShoppingCart, Trash2, Plus, Minus, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useCartStore } from "@/store/cartStore";
import { formatPrice } from "@/lib/format";
import { cn } from "@/lib/utils";

export default function CartDrawer() {
  const { isOpen, closeCart, items, removeItem, updateQty, totalPrice, totalItems } =
    useCartStore();

  return (
    <>
      {/* Overlay */}
      <div
        onClick={closeCart}
        className={cn(
          "fixed inset-0 z-modal bg-black/50 backdrop-blur-sm transition-opacity duration-300",
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      />

      {/* Drawer */}
      <div
        className={cn(
          "fixed top-0 right-0 z-modal h-full w-full max-w-md bg-background shadow-2xl",
          "flex flex-col transition-transform duration-300 ease-smooth",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <div className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5 text-brand-600" />
            <h2 className="font-semibold text-foreground">
              Cart
              {totalItems() > 0 && (
                <span className="ml-2 text-sm text-muted-foreground font-normal">
                  ({totalItems()} items)
                </span>
              )}
            </h2>
          </div>
          <button
            onClick={closeCart}
            className="w-8 h-8 flex items-center justify-center rounded-lg
                       text-muted-foreground hover:text-foreground hover:bg-muted
                       transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto py-4 px-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
              <ShoppingCart className="w-16 h-16 text-muted-foreground/30" />
              <div>
                <p className="font-semibold text-foreground">Your cart is empty</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Add some products to get started
                </p>
              </div>
              <button
                onClick={closeCart}
                className="px-6 py-2.5 bg-brand-600 text-white rounded-xl text-sm
                           font-semibold hover:bg-brand-700 transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={`${item.productId}-${item.variantId}`}
                  className="flex gap-4 p-3 rounded-xl bg-muted/50 border border-border"
                >
                  {/* Image */}
                  <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted shrink-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.image || "/images/placeholder.jpg"}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground line-clamp-2 leading-tight">
                      {item.name}
                    </p>
                    {item.variantName && (
                      <p className="text-xs text-muted-foreground mt-0.5">{item.variantName}</p>
                    )}
                    <p className="text-sm font-bold text-brand-600 mt-1">
                      {formatPrice(item.price)}
                    </p>

                    {/* Qty control */}
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => updateQty(item.productId, item.variantId, item.quantity - 1)}
                        className="w-6 h-6 flex items-center justify-center rounded-md
                                   border border-border hover:bg-muted transition-colors"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQty(item.productId, item.variantId, item.quantity + 1)}
                        disabled={item.quantity >= item.stock}
                        className="w-6 h-6 flex items-center justify-center rounded-md
                                   border border-border hover:bg-muted transition-colors
                                   disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  {/* Remove */}
                  <button
                    onClick={() => removeItem(item.productId, item.variantId)}
                    aria-label="Remove item"
                    className="self-start w-7 h-7 flex items-center justify-center rounded-lg
                               text-muted-foreground hover:text-destructive hover:bg-destructive/10
                               transition-colors shrink-0"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-border px-6 py-5 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="text-lg font-bold text-foreground">
                {formatPrice(totalPrice())}
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              Shipping calculated at checkout
            </p>
            <Link
              href="/checkout"
              onClick={closeCart}
              className="flex items-center justify-center gap-2 w-full py-3.5
                         bg-brand-600 hover:bg-brand-700 text-white font-semibold
                         rounded-xl transition-colors shadow-brand-sm"
            >
              Proceed to Checkout
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/cart"
              onClick={closeCart}
              className="flex items-center justify-center w-full py-2.5
                         border border-border text-foreground text-sm font-medium
                         rounded-xl hover:bg-muted transition-colors"
            >
              View Full Cart
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
