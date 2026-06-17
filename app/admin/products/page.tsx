import Link from "next/link";
import { Plus, Search, Edit, Trash2, Eye } from "lucide-react";
import { formatPrice } from "@/lib/format";
import { Metadata } from "next";

export const metadata: Metadata = { title: "Products — Admin" };

const products = Array.from({ length: 10 }, (_, i) => ({
  id: `p${i + 1}`,
  name: ["Wireless Headphones Pro", "Smart Watch Gen 4", "Premium Backpack", "Running Shoes", "Coffee Maker", "Desk Lamp LED", "Yoga Mat", "Protein Shake", "Gaming Mouse", "Mechanical Keyboard"][i],
  category: ["Audio", "Wearables", "Bags", "Sports", "Kitchen", "Lighting", "Fitness", "Health", "Gaming", "Gaming"][i],
  price: [2800, 7500, 2800, 3200, 4500, 1200, 800, 1500, 2200, 4500][i],
  stock: [25, 12, 0, 8, 15, 45, 30, 60, 10, 5][i],
  status: [true, true, true, true, false, true, true, true, true, true][i],
  image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=80&q=60",
}));

export default function AdminProductsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-bold text-foreground">Products</h1><p className="text-muted-foreground text-sm mt-0.5">{products.length} products total</p></div>
        <Link href="/admin/products/new" className="flex items-center gap-2 px-4 py-2.5 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-sm font-semibold transition-colors shadow-brand-sm">
          <Plus className="w-4 h-4" /> Add Product
        </Link>
      </div>

      {/* Search */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-border p-4">
        <div className="relative max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input placeholder="Search products..." className="w-full pl-9 pr-4 py-2 text-sm border border-input rounded-xl bg-background focus:outline-none focus:ring-2 focus:ring-ring" />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead><tr className="border-b border-border bg-slate-50 dark:bg-slate-900/50">
              {["Product", "Category", "Price", "Stock", "Status", "Actions"].map((h) => (
                <th key={h} className="px-5 py-3.5 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide">{h}</th>
              ))}
            </tr></thead>
            <tbody className="divide-y divide-border">
              {products.map((p) => (
                <tr key={p.id} className="hover:bg-muted/20 transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg overflow-hidden bg-muted shrink-0">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                      </div>
                      <span className="font-medium text-sm text-foreground line-clamp-1">{p.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-sm text-muted-foreground">{p.category}</td>
                  <td className="px-5 py-4 text-sm font-semibold text-foreground">{formatPrice(p.price)}</td>
                  <td className="px-5 py-4">
                    <span className={`text-sm font-medium ${p.stock === 0 ? "text-red-500" : p.stock < 10 ? "text-amber-600" : "text-green-600"}`}>{p.stock === 0 ? "Out of Stock" : p.stock}</span>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`badge-pill text-xs ${p.status ? "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400" : "bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400"}`}>
                      {p.status ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <Link href={`/products/${p.id}`} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"><Eye className="w-4 h-4" /></Link>
                      <Link href={`/admin/products/${p.id}/edit`} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-muted text-muted-foreground hover:text-brand-600 transition-colors"><Edit className="w-4 h-4" /></Link>
                      <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-red-50 dark:hover:bg-red-900/10 text-muted-foreground hover:text-red-500 transition-colors"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
