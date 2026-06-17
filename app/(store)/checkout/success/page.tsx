import Link from "next/link";
import { CheckCircle2, Package, ArrowRight } from "lucide-react";

export default async function OrderSuccessPage({ searchParams }: { searchParams: Promise<{ orderId?: string }> }) {
  const { orderId } = await searchParams;
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="w-24 h-24 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-12 h-12 text-green-600" />
        </div>
        <h1 className="text-3xl font-display font-bold text-foreground mb-3">Order Placed!</h1>
        <p className="text-muted-foreground mb-2">Thank you for your order. We'll confirm it via WhatsApp shortly.</p>
        {orderId && <p className="text-sm text-brand-600 font-medium mb-8">Order ID: #{orderId.slice(-8).toUpperCase()}</p>}
        <div className="bg-slate-50 dark:bg-slate-800 rounded-2xl p-5 mb-8 text-left space-y-3">
          {[["📦", "Order Confirmed", "You'll receive SMS + WhatsApp confirmation"], ["🚚", "Packed & Shipped", "We'll notify you with tracking details"], ["🎉", "Delivered", "Enjoy your purchase!"]].map(([icon, title, desc]) => (
            <div key={title as string} className="flex items-start gap-3">
              <span className="text-xl">{icon}</span>
              <div><p className="font-semibold text-sm text-foreground">{title as string}</p><p className="text-xs text-muted-foreground">{desc as string}</p></div>
            </div>
          ))}
        </div>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href={`/orders/${orderId ?? ""}`} className="flex items-center justify-center gap-2 px-6 py-3 bg-brand-600 text-white rounded-xl font-semibold hover:bg-brand-700 transition-colors">
            <Package className="w-4 h-4" /> Track Order
          </Link>
          <Link href="/products" className="flex items-center justify-center gap-2 px-6 py-3 border border-border text-foreground rounded-xl font-medium hover:bg-muted transition-colors">
            Continue Shopping <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
