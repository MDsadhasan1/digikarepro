"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Search, X } from "lucide-react";
import { useDebounce } from "@/hooks/useDebounce";
import ProductCard from "@/components/product/ProductCard";
import ProductCardSkeleton from "@/components/product/ProductCardSkeleton";

const DEMO_PRODUCTS = [
  { id: "1", name: "Wireless Noise-Cancelling Headphones", slug: "wireless-noise-cancelling-headphones", price: 3999, salePrice: null, stock: 50, isBestSeller: true, isFeatured: true, rating: 4.8, reviewCount: 48, images: [{ url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800", isPrimary: true }], category: { name: "Electronics" } },
  { id: "2", name: "Smart Watch Pro 2024", slug: "smart-watch-pro-2024", price: 5499, salePrice: null, stock: 35, isBestSeller: false, isFeatured: true, rating: 4.6, reviewCount: 32, images: [{ url: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800", isPrimary: true }], category: { name: "Electronics" } },
  { id: "3", name: "Premium Cotton T-Shirt", slug: "premium-cotton-t-shirt", price: 899, salePrice: null, stock: 200, isBestSeller: true, isFeatured: true, rating: 4.5, reviewCount: 87, images: [{ url: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800", isPrimary: true }], category: { name: "Fashion" } },
  { id: "4", name: "Vitamin C Serum 30ml", slug: "vitamin-c-serum-30ml", price: 999, salePrice: null, stock: 90, isBestSeller: true, isFeatured: false, rating: 4.7, reviewCount: 189, images: [{ url: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800", isPrimary: true }], category: { name: "Health & Beauty" } },
  { id: "5", name: "Wireless Earbuds Pro", slug: "wireless-earbuds-pro", price: 2799, salePrice: null, stock: 75, isBestSeller: false, isFeatured: true, rating: 4.6, reviewCount: 95, images: [{ url: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800", isPrimary: true }], category: { name: "Electronics" } },
  { id: "6", name: "Minimalist Desk Lamp", slug: "minimalist-desk-lamp", price: 1199, salePrice: null, stock: 60, isBestSeller: false, isFeatured: true, rating: 4.4, reviewCount: 61, images: [{ url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800", isPrimary: true }], category: { name: "Home & Living" } },
];

export default function SearchPage() {
  const searchParams  = useSearchParams();
  const initialQuery  = searchParams.get("q") ?? "";
  const [query, setQuery]     = useState(initialQuery);
  const [loading, setLoading] = useState(false);
  const debouncedQ            = useDebounce(query, 350);

  // Filter demo products by query
  const results = debouncedQ.trim()
    ? DEMO_PRODUCTS.filter((p) =>
        p.name.toLowerCase().includes(debouncedQ.toLowerCase()) ||
        p.category.name.toLowerCase().includes(debouncedQ.toLowerCase())
      )
    : [];

  useEffect(() => {
    if (debouncedQ) { setLoading(true); setTimeout(() => setLoading(false), 300); }
  }, [debouncedQ]);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Search Input */}
      <div className="max-w-2xl mx-auto mb-10">
        <h1 className="text-3xl font-bold text-center mb-6">Search Products</h1>
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for products..."
            className="w-full pl-12 pr-12 py-4 rounded-xl border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-brand-500 text-lg"
            autoFocus
          />
          {query && (
            <button onClick={() => setQuery("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Results */}
      {!debouncedQ.trim() && (
        <p className="text-center text-muted-foreground">Start typing to search for products...</p>
      )}

      {debouncedQ.trim() && loading && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => <ProductCardSkeleton key={i} />)}
        </div>
      )}

      {debouncedQ.trim() && !loading && results.length === 0 && (
        <div className="text-center py-16">
          <Search className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
          <h2 className="text-xl font-semibold mb-2">No results found</h2>
          <p className="text-muted-foreground">Try different keywords or browse our <a href="/products" className="text-brand-600 hover:underline">all products</a> page.</p>
        </div>
      )}

      {debouncedQ.trim() && !loading && results.length > 0 && (
        <>
          <p className="text-sm text-muted-foreground mb-4">{results.length} result{results.length !== 1 ? "s" : ""} for &ldquo;{debouncedQ}&rdquo;</p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {results.map((p) => <ProductCard key={p.id} product={p as any} />)}
          </div>
        </>
      )}
    </div>
  );
}
