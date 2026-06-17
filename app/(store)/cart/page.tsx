"use client";

import Link from "next/link";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { formatPrice } from "@/lib/format";
import { SHIPPING_COST } from "@/lib/constants";

export default function CartPage() {
  const { items, removeItem, updateQty, totalPrice, clearCart } = useCartStore();
  const subtotal = totalPrice();
  const shipping = subtotal >= SHIPPING_COST.FREE_THRESHOLD ? 0 : SHIPPING_COST.INSIDE_DHAKA;
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-5 text-center px-4">
        <ShoppingBag className="w-20 h-20 text-muted-foreground/30" />
        <div>
          <h2 className="text-2xl font-bold text-foreground">Your cart is empty</h2>
          <p className="text-muted-foreground mt-1">Add some amazing products to get started!</p>
        </div>
        <Link href="/products" className="px-8 py-3 bg-brand-600 text-white rounded-xl font-semibold hover:bg-brand-700 transition-colors">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <div className="container py-10">
        <h1 className="text-3xl font-display font-bold text-foreground mb-8">Shopping Cart</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div key={`${item.productId}-${item.variantId}`}
                className="flex gap-4 p-4 bg-white dark:bg-slate-800 rounded-2xl border border-border shadow-sm">
                <div className="w-20 h-20 rounded-xl overflow-hidden bg-muted shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <Link href={`/products/${item.slug}`} className="font-semibold text-foreground hover:text-brand-600 line-clamp-2 text-sm">{item.name}</Link>
                  {item.variantName && <p className="text-xs text-muted-foreground mt-0.5">{item.variantName}</p>}
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-2 border border-input rounded-lg p-0.5">
                      <button onClick={() => updateQty(item.productId, item.variantId, item.quantity - 1)} className="w-7 h-7 flex items-center justify-center hover:bg-muted rounded-md transition-colors">
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
                      <button onClick={() => updateQty(item.productId, item.variantId, item.quantity + 1)} disabled={item.quantity >= item.stock} className="w-7 h-7 flex items-center justify-center hover:bg-muted rounded-md transition-colors disabled:opacity-40">
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-accent">{formatPrice(item.price * item.quantity)}</span>
                      <button onClick={() => removeItem(item.productId, item.variantId)} className="text-muted-foreground hover:text-destructive transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <button onClick={clearCart} className="text-sm text-muted-foreground hover:text-destructive transition-colors flex items-center gap-1.5">
              <Trash2 className="w-4 h-4" /> Clear all items
            </button>
          </div>

          {/* Summary */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-border shadow-sm p-6 h-fit sticky top-20">
            <h2 className="font-semibold text-foreground mb-5">Order Summary</h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span className="font-medium">{formatPrice(subtotal)}</span></div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping (Dhaka)</span>
                <span className="font-medium">{shipping === 0 ? <span className="text-green-600 font-semibold">Free</span> : formatPrice(shipping)}</span>
              </div>
              {shipping > 0 && <p className="text-xs text-muted-foreground">Free shipping on orders above {formatPrice(SHIPPING_COST.FREE_THRESHOLD)}</p>}
              <div className="border-t border-border pt-3 flex justify-between font-bold text-base">
                <span>Total</span><span className="text-accent">{formatPrice(total)}</span>
              </div>
            </div>
            <Link href="/checkout" className="mt-5 flex items-center justify-center gap-2 w-full py-3.5 bg-brand-600 hover:bg-brand-700 text-white font-semibold rounded-xl transition-colors shadow-brand-sm">
              Checkout <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/products" className="mt-3 flex justify-center text-sm text-brand-600 hover:text-brand-700">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
