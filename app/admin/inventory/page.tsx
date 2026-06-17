import { Metadata } from "next";
import { AlertTriangle } from "lucide-react";
import { formatPrice } from "@/lib/format";

export const metadata: Metadata = { title: "Inventory — Admin" };

const inventory = Array.from({ length: 12 }, (_, i) => ({
  id: `p${i + 1}`,
  name: ["Wireless Headphones Pro", "Smart Watch Gen 4", "Premium Backpack", "Running Shoes", "Coffee Maker", "Desk Lamp LED", "Yoga Mat", "Protein Shake", "Gaming Mouse", "Mechanical Keyboard", "Monitor 27\"", "USB-C Hub"][i],
  sku: `DGK-${String(i + 1).padStart(3, "0")}`,
  price: [2800, 7500, 2800, 3200, 4500, 1200, 800, 1500, 2200, 4500, 28000, 1800][i],
  stock: [25, 3, 0, 8, 15, 45, 30, 2, 10, 5, 1, 80][i],
  sold: [456, 234, 89, 178, 67, 123, 45, 567, 89, 234, 12, 345][i],
  threshold: 5,
}));

export default function AdminInventoryPage() {
  const low = inventory.filter((p) => p.stock > 0 && p.stock <= p.threshold);
  const out = inventory.filter((p) => p.stock === 0);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-foreground">Inventory</h1>

      {/* Alerts */}
      {(low.length > 0 || out.length > 0) && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {out.length > 0 && (
            <div className="flex items-center gap-3 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl">
              <AlertTriangle className="w-5 h-5 text-red-500 shrink-0" />
              <div><p className="font-semibold text-red-700 dark:text-red-400 text-sm">{out.length} products out of stock</p><p className="text-xs text-red-600/70 dark:text-red-400/70">Restock immediately</p></div>
            </div>
          )}
          {low.length > 0 && (
            <div className="flex items-center gap-3 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-2xl">
              <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />
              <div><p className="font-semibold text-amber-700 dark:text-amber-400 text-sm">{low.length} products low stock</p><p className="text-xs text-amber-600/70 dark:text-amber-400/70">Consider restocking soon</p></div>
            </div>
          )}
        </div>
      )}

      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead><tr className="border-b border-border bg-slate-50 dark:bg-slate-900/50">
              {["Product", "SKU", "Price", "Stock", "Sold", "Status"].map((h) => (
                <th key={h} className="px-5 py-3.5 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide">{h}</th>
              ))}
            </tr></thead>
            <tbody className="divide-y divide-border">
              {inventory.map((p) => {
                const status = p.stock === 0 ? "out" : p.stock <= p.threshold ? "low" : "ok";
                return (
                  <tr key={p.id} className={`hover:bg-muted/20 transition-colors ${status === "out" ? "bg-red-50/30 dark:bg-red-900/5" : status === "low" ? "bg-amber-50/30 dark:bg-amber-900/5" : ""}`}>
                    <td className="px-5 py-4 font-medium text-sm text-foreground">{p.name}</td>
                    <td className="px-5 py-4 text-sm text-muted-foreground font-mono">{p.sku}</td>
                    <td className="px-5 py-4 text-sm font-semibold text-foreground">{formatPrice(p.price)}</td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <span className={`text-sm font-bold ${status === "out" ? "text-red-500" : status === "low" ? "text-amber-600" : "text-green-600"}`}>{p.stock}</span>
                        <div className="w-16 h-1.5 bg-muted rounded-full overflow-hidden">
                          <div className={`h-full rounded-full ${status === "out" ? "bg-red-500" : status === "low" ? "bg-amber-500" : "bg-green-500"}`} style={{ width: `${Math.min(100, (p.stock / 50) * 100)}%` }} />
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-sm text-muted-foreground">{p.sold.toLocaleString()}</td>
                    <td className="px-5 py-4">
                      <span className={`badge-pill text-xs ${status === "out" ? "bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400" : status === "low" ? "bg-amber-100 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400" : "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400"}`}>
                        {status === "out" ? "Out of Stock" : status === "low" ? "Low Stock" : "In Stock"}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
