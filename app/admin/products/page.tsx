"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Plus, Search, Edit, Trash2, Eye, Loader2, RefreshCw, AlertCircle } from "lucide-react";
import { formatPrice } from "@/lib/format";
import { toast } from "sonner";

interface Product {
  id:          string;
  name:        string;
  slug:        string;
  price:       number;
  salePrice:   number | null;
  stock:       number;
  isActive:    boolean;
  isFeatured:  boolean;
  category:    { name: string } | null;
  images:      { url: string; isPrimary: boolean }[];
}

// Fallback demo data shown when DB is not connected
const DEMO_PRODUCTS: Product[] = [
  { id: "p1", name: "Wireless Noise-Cancelling Headphones", slug: "wireless-noise-cancelling-headphones", price: 4999, salePrice: 3999, stock: 50, isActive: true,  isFeatured: true,  category: { name: "Electronics" }, images: [{ url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=80", isPrimary: true }] },
  { id: "p2", name: "Smart Watch Pro 2024",                slug: "smart-watch-pro-2024",                price: 6999, salePrice: 5499, stock: 35, isActive: true,  isFeatured: true,  category: { name: "Electronics" }, images: [{ url: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=80", isPrimary: true }] },
  { id: "p3", name: "Premium Cotton T-Shirt",              slug: "premium-cotton-t-shirt",              price: 899,  salePrice: null, stock: 200,isActive: true,  isFeatured: true,  category: { name: "Fashion" },     images: [{ url: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=80", isPrimary: true }] },
  { id: "p4", name: "Classic Denim Jacket",                slug: "classic-denim-jacket",                price: 2499, salePrice: 1999, stock: 80, isActive: true,  isFeatured: false, category: { name: "Fashion" },     images: [{ url: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=80", isPrimary: true }] },
  { id: "p5", name: "Minimalist Desk Lamp",                slug: "minimalist-desk-lamp",                price: 1499, salePrice: 1199, stock: 60, isActive: true,  isFeatured: true,  category: { name: "Home & Living" },images: [{ url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80", isPrimary: true }] },
  { id: "p6", name: "Ceramic Coffee Mug Set",              slug: "ceramic-coffee-mug-set",              price: 799,  salePrice: null, stock: 120,isActive: true,  isFeatured: false, category: { name: "Home & Living" },images: [{ url: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=80", isPrimary: true }] },
  { id: "p7", name: "Vitamin C Serum 30ml",                slug: "vitamin-c-serum-30ml",                price: 1299, salePrice: 999,  stock: 90, isActive: true,  isFeatured: true,  category: { name: "Health & Beauty" },images:[{ url: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=80", isPrimary: true }] },
  { id: "p8", name: "Wireless Earbuds Pro",                slug: "wireless-earbuds-pro",                price: 3499, salePrice: 2799, stock: 0,  isActive: false, isFeatured: false, category: { name: "Electronics" }, images: [{ url: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=80", isPrimary: true }] },
];

export default function AdminProductsPage() {
  const [products,   setProducts]   = useState<Product[]>([]);
  const [loading,    setLoading]    = useState(true);
  const [search,     setSearch]     = useState("");
  const [deleting,   setDeleting]   = useState<string | null>(null);
  const [dbMode,     setDbMode]     = useState(false); // true = real DB connected

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/products?pageSize=100");
      if (res.ok) {
        const json = await res.json();
        const items = Array.isArray(json) ? json : (json.data ?? []);
        if (items.length > 0) { setProducts(items); setDbMode(true); }
        else { setProducts(DEMO_PRODUCTS); setDbMode(false); }
      } else {
        setProducts(DEMO_PRODUCTS);
        setDbMode(false);
      }
    } catch {
      setProducts(DEMO_PRODUCTS);
      setDbMode(false);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchProducts(); }, [fetchProducts]);

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`"${name}" ডিলিট করতে চান? এই কাজটি পূর্বাবস্থায় ফেরানো যাবে না।`)) return;
    setDeleting(id);
    try {
      if (dbMode) {
        const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
        if (!res.ok) throw new Error();
      }
      setProducts((prev) => prev.filter((p) => p.id !== id));
      toast.success(`"${name}" ডিলিট হয়েছে`);
    } catch {
      toast.error("ডিলিট করতে সমস্যা হয়েছে");
    } finally {
      setDeleting(null);
    }
  };

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    (p.category?.name ?? "").toLowerCase().includes(search.toLowerCase())
  );

  const primaryImage = (p: Product) => p.images?.find((i) => i.isPrimary)?.url ?? p.images?.[0]?.url;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Products</h1>
          <p className="text-sm text-muted-foreground">
            {loading ? "Loading..." : `${filtered.length} products`}
            {!dbMode && !loading && (
              <span className="ml-2 inline-flex items-center gap-1 text-amber-600 text-xs">
                <AlertCircle className="w-3 h-3" /> Demo mode — database not connected
              </span>
            )}
          </p>
        </div>
        <div className="flex gap-2">
          <button onClick={fetchProducts} className="p-2 border rounded-xl hover:bg-muted transition-colors" title="Refresh">
            <RefreshCw className="w-4 h-4" />
          </button>
          <Link href="/admin/products/new"
            className="flex items-center gap-2 px-4 py-2.5 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-sm font-semibold transition-colors shadow-brand-sm">
            <Plus className="w-4 h-4" /> Add Product
          </Link>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-border p-4">
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="নাম বা ক্যাটাগরি দিয়ে খুঁজুন..."
            className="w-full pl-9 pr-4 py-2 text-sm border border-input rounded-xl bg-background focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-border overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-20 text-muted-foreground">
            <Loader2 className="w-6 h-6 animate-spin mr-2" /> লোড হচ্ছে...
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16 text-muted-foreground">
            <p className="text-lg font-medium mb-1">কোনো প্রোডাক্ট পাওয়া যায়নি</p>
            <p className="text-sm">সার্চ পরিবর্তন করুন বা নতুন প্রোডাক্ট যোগ করুন</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-slate-50 dark:bg-slate-900/50">
                  {["প্রোডাক্ট", "ক্যাটাগরি", "মূল্য", "স্টক", "স্ট্যাটাস", "অ্যাকশন"].map((h) => (
                    <th key={h} className="px-5 py-3.5 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filtered.map((p) => (
                  <tr key={p.id} className="hover:bg-muted/20 transition-colors">
                    {/* Product */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg overflow-hidden bg-muted shrink-0">
                          {primaryImage(p)
                            ? <img src={primaryImage(p)} alt={p.name} className="w-full h-full object-cover" /> // eslint-disable-line @next/next/no-img-element
                            : <div className="w-full h-full bg-slate-200" />}
                        </div>
                        <div className="min-w-0">
                          <p className="font-medium text-sm line-clamp-1">{p.name}</p>
                          {p.isFeatured && <span className="text-xs text-brand-600 font-medium">Featured</span>}
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="px-5 py-4 text-sm text-muted-foreground">{p.category?.name ?? "—"}</td>

                    {/* Price */}
                    <td className="px-5 py-4">
                      <div className="text-sm">
                        <span className="font-semibold">{formatPrice(p.salePrice ?? p.price)}</span>
                        {p.salePrice && <span className="text-muted-foreground line-through ml-1 text-xs">{formatPrice(p.price)}</span>}
                      </div>
                    </td>

                    {/* Stock */}
                    <td className="px-5 py-4">
                      <span className={`text-sm font-medium ${p.stock === 0 ? "text-red-500" : p.stock < 10 ? "text-amber-600" : "text-green-600"}`}>
                        {p.stock === 0 ? "স্টক নেই" : p.stock}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="px-5 py-4">
                      <span className={`badge-pill text-xs ${p.isActive ? "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400" : "bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400"}`}>
                        {p.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-1">
                        <Link href={`/products/${p.slug}`} title="View"
                          className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors">
                          <Eye className="w-4 h-4" />
                        </Link>
                        <Link href={`/admin/products/${p.id}/edit`} title="Edit"
                          className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-muted text-muted-foreground hover:text-brand-600 transition-colors">
                          <Edit className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => handleDelete(p.id, p.name)}
                          disabled={deleting === p.id}
                          title="Delete"
                          className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-red-50 dark:hover:bg-red-900/10 text-muted-foreground hover:text-red-500 transition-colors disabled:opacity-50">
                          {deleting === p.id
                            ? <Loader2 className="w-4 h-4 animate-spin" />
                            : <Trash2 className="w-4 h-4" />}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Stats bar */}
      {!loading && (
        <div className="grid grid-cols-3 gap-4 text-center">
          {[
            { label: "মোট প্রোডাক্ট", value: products.length },
            { label: "স্টকে আছে",     value: products.filter((p) => p.stock > 0).length },
            { label: "স্টক শেষ",      value: products.filter((p) => p.stock === 0).length },
          ].map((s) => (
            <div key={s.label} className="bg-white dark:bg-slate-800 rounded-xl border border-border p-4">
              <p className="text-2xl font-bold text-brand-600">{s.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
