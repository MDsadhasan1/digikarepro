"use client";

import { useState, use } from "react";
import Link from "next/link";
import { ArrowLeft, Package, Truck, CheckCircle, Clock, XCircle, Loader2 } from "lucide-react";
import { ORDER_STATUS_LABELS, ORDER_STATUS_COLORS } from "@/lib/constants";
import { formatPrice, formatDate } from "@/lib/format";
import { toast } from "sonner";

const DEMO_ORDER = {
  id:          "ord_001",
  orderNumber: "DGK-2024-00042",
  createdAt:   "2024-12-01T10:30:00Z",
  status:      "PROCESSING",
  paymentMethod:  "BKASH",
  paymentStatus:  "PAID",
  subtotal:    5499,
  shippingCost: 60,
  discount:    0,
  total:       5559,
  notes:       "Please deliver after 5pm",
  shippingAddress: {
    fullName:    "Rafiqul Islam",
    phone:       "01711234567",
    addressLine: "House 12, Road 4, Block C",
    city:        "Dhaka",
    district:    "Dhaka",
  },
  items: [
    { id: "1", name: "Smart Watch Pro 2024", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200", price: 5499, quantity: 1, total: 5499 },
  ],
  statusLogs: [
    { id: "1", status: "PENDING",    note: "Order placed by customer",          createdAt: "2024-12-01T10:30:00Z" },
    { id: "2", status: "CONFIRMED",  note: "Order confirmed by admin",           createdAt: "2024-12-01T11:00:00Z" },
    { id: "3", status: "PROCESSING", note: "Order is being prepared for dispatch", createdAt: "2024-12-01T14:00:00Z" },
  ],
};

const STATUS_OPTIONS = ["PENDING", "CONFIRMED", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED", "RETURNED"];

export default function AdminOrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id }     = use(params);
  const order      = { ...DEMO_ORDER, id };
  const [status,   setStatus]  = useState(order.status);
  const [note,     setNote]    = useState("");
  const [updating, setUpdating] = useState(false);

  const handleStatusUpdate = async () => {
    setUpdating(true);
    try {
      await fetch(`/api/orders/${id}`, {
        method:  "PUT",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ status, note: note || undefined }),
      });
      toast.success("Order status updated");
      setNote("");
    } catch {
      toast.error("Failed to update status");
    } finally {
      setUpdating(false);
    }
  };

  const statusIcons: Record<string, React.ReactNode> = {
    PENDING:    <Clock className="w-4 h-4" />,
    CONFIRMED:  <CheckCircle className="w-4 h-4" />,
    PROCESSING: <Package className="w-4 h-4" />,
    SHIPPED:    <Truck className="w-4 h-4" />,
    DELIVERED:  <CheckCircle className="w-4 h-4" />,
    CANCELLED:  <XCircle className="w-4 h-4" />,
    RETURNED:   <XCircle className="w-4 h-4" />,
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/admin/orders" className="p-2 hover:bg-accent rounded-lg transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div className="flex-1">
          <h1 className="text-2xl font-bold">Order {order.orderNumber}</h1>
          <p className="text-sm text-muted-foreground">{formatDate(order.createdAt)}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${ORDER_STATUS_COLORS[order.status as keyof typeof ORDER_STATUS_COLORS] ?? "bg-gray-100 text-gray-800"}`}>
          {ORDER_STATUS_LABELS[order.status as keyof typeof ORDER_STATUS_LABELS] ?? order.status}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Items */}
          <div className="card p-6">
            <h2 className="font-semibold mb-4">Order Items</h2>
            <div className="divide-y">
              {order.items.map((item) => (
                <div key={item.id} className="flex gap-4 py-4 first:pt-0 last:pb-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg border" />
                  <div className="flex-1">
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-muted-foreground">Qty: {item.quantity} × {formatPrice(item.price)}</p>
                  </div>
                  <p className="font-semibold">{formatPrice(item.total)}</p>
                </div>
              ))}
            </div>
            <div className="border-t mt-4 pt-4 space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>{formatPrice(order.subtotal)}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Shipping</span><span>{formatPrice(order.shippingCost)}</span></div>
              {order.discount > 0 && <div className="flex justify-between text-green-600"><span>Discount</span><span>-{formatPrice(order.discount)}</span></div>}
              <div className="flex justify-between font-semibold text-base border-t pt-2"><span>Total</span><span>{formatPrice(order.total)}</span></div>
            </div>
          </div>

          {/* Status Timeline */}
          <div className="card p-6">
            <h2 className="font-semibold mb-4">Status History</h2>
            <div className="space-y-4">
              {order.statusLogs.map((log, i) => (
                <div key={log.id} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white ${i === order.statusLogs.length - 1 ? "bg-brand-600" : "bg-gray-300"}`}>
                      {statusIcons[log.status]}
                    </div>
                    {i < order.statusLogs.length - 1 && <div className="w-px flex-1 bg-border mt-1" />}
                  </div>
                  <div className="pb-4">
                    <p className="font-medium">{ORDER_STATUS_LABELS[log.status as keyof typeof ORDER_STATUS_LABELS] ?? log.status}</p>
                    <p className="text-sm text-muted-foreground">{log.note}</p>
                    <p className="text-xs text-muted-foreground">{formatDate(log.createdAt)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Update Status */}
          <div className="card p-6">
            <h2 className="font-semibold mb-4">Update Status</h2>
            <select value={status} onChange={(e) => setStatus(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border bg-background mb-3">
              {STATUS_OPTIONS.map((s) => (
                <option key={s} value={s}>{ORDER_STATUS_LABELS[s as keyof typeof ORDER_STATUS_LABELS] ?? s}</option>
              ))}
            </select>
            <textarea value={note} onChange={(e) => setNote(e.target.value)} rows={3}
              className="w-full px-3 py-2 rounded-lg border bg-background resize-none text-sm mb-3"
              placeholder="Add a note (optional)" />
            <button onClick={handleStatusUpdate} disabled={updating}
              className="w-full btn-primary py-2 rounded-lg flex items-center justify-center gap-2 disabled:opacity-70">
              {updating && <Loader2 className="w-4 h-4 animate-spin" />}
              {updating ? "Updating..." : "Update Status"}
            </button>
          </div>

          {/* Shipping Address */}
          <div className="card p-6">
            <h2 className="font-semibold mb-4">Shipping Address</h2>
            <div className="text-sm space-y-1">
              <p className="font-medium">{order.shippingAddress.fullName}</p>
              <p className="text-muted-foreground">{order.shippingAddress.phone}</p>
              <p className="text-muted-foreground">{order.shippingAddress.addressLine}</p>
              <p className="text-muted-foreground">{order.shippingAddress.city}, {order.shippingAddress.district}</p>
            </div>
          </div>

          {/* Payment Info */}
          <div className="card p-6">
            <h2 className="font-semibold mb-4">Payment Info</h2>
            <div className="text-sm space-y-2">
              <div className="flex justify-between"><span className="text-muted-foreground">Method</span><span className="font-medium">{order.paymentMethod.replace("_", " ")}</span></div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Status</span>
                <span className={`font-medium ${order.paymentStatus === "PAID" ? "text-green-600" : "text-amber-600"}`}>{order.paymentStatus}</span>
              </div>
            </div>
          </div>

          {order.notes && (
            <div className="card p-6">
              <h2 className="font-semibold mb-2">Customer Note</h2>
              <p className="text-sm text-muted-foreground">{order.notes}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
