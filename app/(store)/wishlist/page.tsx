"use client";

import Link from "next/link";
import { Heart, ShoppingCart, Trash2 } from "lucide-react";
import { useWishlistStore } from "@/store/wishlistStore";
import { useCartStore } from "@/store/cartStore";
import { formatPrice } from "@/lib/format";

export default function WishlistPage() {
  const { items, removeItem } = useWishlistStore();
  const addToCart = useCartStore((s) => s.addItem);

  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-5 text-center">
        <Heart className="w-20 h-20 text-muted-foreground/30" />
        <div>
          <h2 className="text-2xl font-bold text-foreground">Your wishlist is empty</h2>
          <p className="text-muted-foreground mt-1">Save products you love to your wishlist.</p>
        </div>
        <Link href="/products" className="px-8 py-3 bg-brand-600 text-white rounded-xl font-semibold hover:bg-brand-700">
          Explore Products
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <div className="container py-10">
        <h1 className="text-3xl font-display font-bold text-foreground mb-2">Wishlist</h1>
        <p className="text-muted-foreground mb-8">{items.length} saved items</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {items.map((item) => (
            <div key={item.productId} className="bg-white dark:bg-slate-800 rounded-2xl border border-border shadow-sm overflow-hidden">
              <Link href={`/products/${item.slug}`} className="block aspect-square overflow-hidden bg-muted relative group">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              </Link>
              <div className="p-4">
                <Link href={`/products/${item.slug}`} className="font-semibold text-sm text-foreground hover:text-brand-600 line-clamp-2">{item.name}</Link>
                <div className="flex items-center gap-2 mt-2">
                  <span className="font-bold text-accent">{formatPrice(item.salePrice ?? item.price)}</span>
                  {item.salePrice && <span className="text-xs text-muted-foreground line-through">{formatPrice(item.price)}</span>}
                </div>
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => addToCart({ id: item.productId, productId: item.productId, name: item.name, slug: item.slug, image: item.image, price: item.salePrice ?? item.price, quantity: 1, stock: 99 })}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-lg text-xs font-semibold transition-colors">
                    <ShoppingCart className="w-3.5 h-3.5" /> Add to Cart
                  </button>
                  <button onClick={() => removeItem(item.productId)} className="w-9 h-9 flex items-center justify-center rounded-lg border border-border hover:text-destructive hover:border-destructive/30 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
