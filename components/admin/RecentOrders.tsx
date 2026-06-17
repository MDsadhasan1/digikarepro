import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ORDER_STATUS_LABELS, ORDER_STATUS_COLORS } from "@/lib/constants";
import { formatPrice, formatDate } from "@/lib/format";

const orders = [
  { id: "o1", orderNumber: "DGK-2024-00284", customer: "Rakibul Hasan", total: 5600, status: "DELIVERED",  date: new Date("2024-12-15") },
  { id: "o2", orderNumber: "DGK-2024-00283", customer: "Fatema Begum",  total: 2800, status: "SHIPPED",    date: new Date("2024-12-14") },
  { id: "o3", orderNumber: "DGK-2024-00282", customer: "Arif Ahmed",    total: 9800, status: "PROCESSING", date: new Date("2024-12-14") },
  { id: "o4", orderNumber: "DGK-2024-00281", customer: "Nusrat Jahan",  total: 1200, status: "PENDING",    date: new Date("2024-12-13") },
  { id: "o5", orderNumber: "DGK-2024-00280", customer: "Mehedi Hassan", total: 3200, status: "CONFIRMED",  date: new Date("2024-12-13") },
];

export default function RecentOrders() {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-border">
      <div className="flex items-center justify-between p-5 border-b border-border">
        <h3 className="font-semibold text-foreground">Recent Orders</h3>
        <Link href="/admin/orders" className="text-sm text-brand-600 hover:text-brand-700 flex items-center gap-1">
          View all <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead><tr className="border-b border-border">
            {["Order", "Customer", "Total", "Status", "Date"].map((h) => (
              <th key={h} className="px-5 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wide">{h}</th>
            ))}
          </tr></thead>
          <tbody className="divide-y divide-border">
            {orders.map((o) => (
              <tr key={o.id} className="hover:bg-muted/30 transition-colors">
                <td className="px-5 py-3.5 text-sm font-medium text-brand-600"><Link href={`/admin/orders/${o.id}`}>{o.orderNumber}</Link></td>
                <td className="px-5 py-3.5 text-sm text-foreground">{o.customer}</td>
                <td className="px-5 py-3.5 text-sm font-semibold text-foreground">{formatPrice(o.total)}</td>
                <td className="px-5 py-3.5"><span className={`badge-pill text-xs ${ORDER_STATUS_COLORS[o.status]}`}>{ORDER_STATUS_LABELS[o.status]}</span></td>
                <td className="px-5 py-3.5 text-sm text-muted-foreground">{formatDate(o.date)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
