import Link from "next/link";
import { Package, ChevronRight } from "lucide-react";
import { ORDER_STATUS_LABELS, ORDER_STATUS_COLORS } from "@/lib/constants";
import { formatPrice, formatDate } from "@/lib/format";

const mockOrders = [
  { id: "ord1", orderNumber: "DGK-2024-00001", status: "DELIVERED", total: 5600, createdAt: new Date("2024-12-01"), items: [{ name: "Wireless Headphones Pro", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100", quantity: 1, price: 2800 }, { name: "Smart Watch Gen 4", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100", quantity: 1, price: 2800 }] },
  { id: "ord2", orderNumber: "DGK-2024-00045", status: "SHIPPED", total: 3200, createdAt: new Date("2024-12-10"), items: [{ name: "Premium Backpack", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=100", quantity: 1, price: 3200 }] },
  { id: "ord3", orderNumber: "DGK-2024-00089", status: "PENDING", total: 1800, createdAt: new Date("2024-12-15"), items: [{ name: "Desk Lamp LED", image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=100", quantity: 2, price: 900 }] },
];

export default function OrdersPage() {
  if (mockOrders.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-4">
        <Package className="w-20 h-20 text-muted-foreground/30" />
        <h2 className="text-2xl font-bold text-foreground">No orders yet</h2>
        <Link href="/products" className="px-6 py-3 bg-brand-600 text-white rounded-xl font-semibold">Start Shopping</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <div className="container py-10">
        <h1 className="text-3xl font-display font-bold text-foreground mb-8">My Orders</h1>
        <div className="space-y-4">
          {mockOrders.map((order) => (
            <Link key={order.id} href={`/orders/${order.id}`}
              className="block bg-white dark:bg-slate-800 rounded-2xl border border-border shadow-sm p-5 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <p className="font-semibold text-foreground">{order.orderNumber}</p>
                    <span className={`badge-pill text-xs ${ORDER_STATUS_COLORS[order.status]}`}>{ORDER_STATUS_LABELS[order.status]}</span>
                  </div>
                  <div className="flex items-center gap-3 mb-3">
                    {order.items.slice(0, 3).map((item, i) => (
                      <div key={i} className="w-12 h-12 rounded-lg overflow-hidden bg-muted shrink-0">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                    ))}
                    {order.items.length > 3 && <span className="text-sm text-muted-foreground">+{order.items.length - 3} more</span>}
                  </div>
                  <p className="text-sm text-muted-foreground">{order.items.map((i) => `${i.name} ×${i.quantity}`).join(", ")}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="font-bold text-accent">{formatPrice(order.total)}</p>
                  <p className="text-xs text-muted-foreground mt-1">{formatDate(order.createdAt)}</p>
                  <ChevronRight className="w-4 h-4 text-muted-foreground ml-auto mt-2" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
