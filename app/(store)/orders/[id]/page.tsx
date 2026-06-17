import Link from "next/link";
import { Package, ChevronRight, CheckCircle2, Truck, Clock, MapPin } from "lucide-react";
import { ORDER_STATUS_LABELS, ORDER_STATUS_COLORS } from "@/lib/constants";
import { formatPrice, formatDate } from "@/lib/format";

const trackingSteps = [
  { status: "CONFIRMED",        label: "Order Confirmed",  icon: CheckCircle2, done: true },
  { status: "PROCESSING",       label: "Processing",        icon: Package,      done: true },
  { status: "SHIPPED",          label: "Shipped",           icon: Truck,        done: false },
  { status: "OUT_FOR_DELIVERY", label: "Out for Delivery",  icon: MapPin,       done: false },
  { status: "DELIVERED",        label: "Delivered",         icon: CheckCircle2, done: false },
];

export default async function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  await params; // id available but we use mock data

  const order = {
    id: "ord1",
    orderNumber: "DGK-2024-00001",
    status: "PROCESSING",
    paymentMethod: "CASH_ON_DELIVERY",
    paymentStatus: "PENDING",
    subtotal: 5540,
    shippingCost: 60,
    discount: 0,
    total: 5600,
    createdAt: new Date("2024-12-10"),
    shippingAddress: { fullName: "Rakibul Hasan", phone: "01712345678", addressLine: "House 12, Road 5, Block B", city: "Mirpur", district: "Dhaka" },
    items: [
      { id: "oi1", name: "Wireless Headphones Pro", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200", price: 2800, quantity: 1, total: 2800 },
      { id: "oi2", name: "Smart Watch Gen 4", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200", price: 2740, quantity: 1, total: 2740 },
    ],
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <div className="container py-10">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1 text-sm text-muted-foreground mb-6">
          <Link href="/orders" className="hover:text-foreground">My Orders</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-foreground">{order.orderNumber}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Status */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl border border-border p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-semibold text-foreground">Order Status</h2>
                <span className={`badge-pill ${ORDER_STATUS_COLORS[order.status]}`}>{ORDER_STATUS_LABELS[order.status]}</span>
              </div>
              {/* Timeline */}
              <div className="relative">
                <div className="absolute left-4 top-4 bottom-4 w-px bg-border" />
                <div className="space-y-6">
                  {trackingSteps.map(({ label, icon: Icon, done }) => (
                    <div key={label} className="flex items-center gap-4 relative">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center z-10 shrink-0 ${done ? "bg-brand-600 text-white" : "bg-muted text-muted-foreground border border-border"}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <p className={`text-sm font-medium ${done ? "text-foreground" : "text-muted-foreground"}`}>{label}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Items */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl border border-border p-6">
              <h2 className="font-semibold text-foreground mb-4">Order Items</h2>
              <div className="space-y-4">
                {order.items.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="w-16 h-16 rounded-xl overflow-hidden bg-muted shrink-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1"><p className="font-medium text-sm text-foreground">{item.name}</p><p className="text-xs text-muted-foreground mt-0.5">Qty: {item.quantity}</p></div>
                    <span className="font-bold text-sm text-foreground">{formatPrice(item.total)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Summary */}
          <div className="space-y-5">
            <div className="bg-white dark:bg-slate-800 rounded-2xl border border-border p-6">
              <h2 className="font-semibold text-foreground mb-4">Order Info</h2>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">Order No.</span><span className="font-medium">{order.orderNumber}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Date</span><span>{formatDate(order.createdAt)}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Payment</span><span>Cash on Delivery</span></div>
                <div className="border-t border-border pt-2 mt-2 space-y-1">
                  <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>{formatPrice(order.subtotal)}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Shipping</span><span>{formatPrice(order.shippingCost)}</span></div>
                  <div className="flex justify-between font-bold"><span>Total</span><span className="text-accent">{formatPrice(order.total)}</span></div>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-2xl border border-border p-6">
              <h2 className="font-semibold text-foreground mb-4 flex items-center gap-2"><MapPin className="w-4 h-4" /> Delivery Address</h2>
              <div className="text-sm text-muted-foreground space-y-1">
                <p className="font-medium text-foreground">{order.shippingAddress.fullName}</p>
                <p>{order.shippingAddress.phone}</p>
                <p>{order.shippingAddress.addressLine}</p>
                <p>{order.shippingAddress.city}, {order.shippingAddress.district}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
