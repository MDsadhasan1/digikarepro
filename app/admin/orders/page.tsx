import { Metadata } from "next";
import Link from "next/link";
import { Search, Filter } from "lucide-react";
import OrderStatusBadge from "@/components/admin/OrderStatusBadge";
import { formatPrice, formatDate } from "@/lib/format";
import { PAYMENT_METHOD_LABELS } from "@/lib/constants";

export const metadata: Metadata = { title: "Orders — Admin" };

const orders = Array.from({ length: 12 }, (_, i) => ({
  id: `o${i + 1}`,
  orderNumber: `DGK-2024-${String(284 - i).padStart(5, "0")}`,
  customer: ["Rakibul Hasan", "Fatema Begum", "Arif Ahmed", "Nusrat Jahan", "Mehedi Hassan", "Sumaiya Akter", "Tanvir Islam", "Ritu Das", "Kamal Hossain", "Shirin Akter", "Rahim Uddin", "Mitu Begum"][i],
  phone: "01712345678",
  total: [5600, 2800, 9800, 1200, 3200, 4500, 800, 6700, 1500, 2200, 3800, 950][i],
  status: ["DELIVERED", "SHIPPED", "PROCESSING", "PENDING", "CONFIRMED", "CANCELLED", "DELIVERED", "SHIPPED", "PROCESSING", "PENDING", "DELIVERED", "REFUNDED"][i],
  paymentMethod: "CASH_ON_DELIVERY",
  date: new Date(Date.now() - i * 86400000),
  itemCount: [2, 1, 3, 1, 1, 2, 1, 4, 1, 2, 1, 1][i],
}));

const statusList = ["All", "PENDING", "CONFIRMED", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED"];

export default function AdminOrdersPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-bold text-foreground">Orders</h1><p className="text-muted-foreground text-sm">{orders.length} orders</p></div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-border p-4 flex flex-wrap gap-3 items-center">
        <div className="relative flex-1 min-w-48">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input placeholder="Search orders, customers..." className="w-full pl-9 pr-4 py-2 text-sm border border-input rounded-xl bg-background focus:outline-none focus:ring-2 focus:ring-ring" />
        </div>
        <div className="flex gap-2 overflow-x-auto">
          {statusList.map((s) => (
            <button key={s} className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${s === "All" ? "bg-brand-600 text-white" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}>{s}</button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead><tr className="border-b border-border bg-slate-50 dark:bg-slate-900/50">
              {["Order", "Customer", "Items", "Total", "Payment", "Status", "Date"].map((h) => (
                <th key={h} className="px-5 py-3.5 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide whitespace-nowrap">{h}</th>
              ))}
            </tr></thead>
            <tbody className="divide-y divide-border">
              {orders.map((o) => (
                <tr key={o.id} className="hover:bg-muted/20 transition-colors">
                  <td className="px-5 py-4"><Link href={`/admin/orders/${o.id}`} className="font-medium text-sm text-brand-600 hover:text-brand-700">{o.orderNumber}</Link></td>
                  <td className="px-5 py-4"><p className="text-sm font-medium text-foreground">{o.customer}</p><p className="text-xs text-muted-foreground">{o.phone}</p></td>
                  <td className="px-5 py-4 text-sm text-muted-foreground">{o.itemCount} item{o.itemCount > 1 ? "s" : ""}</td>
                  <td className="px-5 py-4 text-sm font-semibold text-foreground">{formatPrice(o.total)}</td>
                  <td className="px-5 py-4 text-sm text-muted-foreground">{PAYMENT_METHOD_LABELS[o.paymentMethod]}</td>
                  <td className="px-5 py-4"><OrderStatusBadge status={o.status} /></td>
                  <td className="px-5 py-4 text-sm text-muted-foreground whitespace-nowrap">{formatDate(o.date)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
