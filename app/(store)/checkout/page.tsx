"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CreditCard, Smartphone, Truck, Tag, ArrowRight, CheckCircle2 } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { formatPrice } from "@/lib/format";
import { SHIPPING_COST } from "@/lib/constants";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const schema = z.object({
  fullName:    z.string().min(3, "Name is required"),
  phone:       z.string().regex(/^(\+?880|0)?1[3-9]\d{8}$/, "Enter a valid BD phone number"),
  addressLine: z.string().min(5, "Address is required"),
  city:        z.string().min(2, "City is required"),
  district:    z.string().min(2, "District is required"),
  notes:       z.string().optional(),
});
type FormData = z.infer<typeof schema>;

const paymentMethods = [
  { id: "CASH_ON_DELIVERY", label: "Cash on Delivery", icon: Truck,      desc: "Pay when you receive" },
  { id: "BKASH",            label: "bKash",            icon: Smartphone, desc: "Mobile banking payment" },
  { id: "NAGAD",            label: "Nagad",            icon: Smartphone, desc: "Mobile banking payment" },
];

const districts = ["Dhaka", "Chittagong", "Sylhet", "Rajshahi", "Khulna", "Barishal", "Mymensingh", "Rangpur", "Comilla", "Narayanganj"];

export default function CheckoutPage() {
  const router = useRouter();
  const { items, totalPrice, clearCart } = useCartStore();
  const [payment, setPayment] = useState("CASH_ON_DELIVERY");
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  const { register, handleSubmit, watch, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) });
  const district = watch("district");

  const subtotal = totalPrice();
  const shipping = district === "Dhaka" ? SHIPPING_COST.INSIDE_DHAKA : SHIPPING_COST.OUTSIDE_DHAKA;
  const total = subtotal + shipping - discount;

  const applyCoupon = async () => {
    if (!coupon.trim()) return;
    try {
      const res = await fetch("/api/coupons/validate", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ code: coupon, total: subtotal }) });
      const data = await res.json();
      if (data.valid) { setDiscount(data.discountAmount); toast.success(`Coupon applied! You saved ${formatPrice(data.discountAmount)}`); }
      else toast.error(data.message ?? "Invalid coupon code");
    } catch { toast.error("Could not validate coupon"); }
  };

  const onSubmit = async (data: FormData) => {
    if (items.length === 0) return toast.error("Your cart is empty");
    setSubmitting(true);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, paymentMethod: payment, items, subtotal, shipping, discount, total, couponCode: discount > 0 ? coupon : undefined }),
      });
      const order = await res.json();
      if (res.ok) { clearCart(); router.push(`/checkout/success?orderId=${order.id}`); }
      else toast.error(order.message ?? "Order failed. Please try again.");
    } catch { toast.error("Network error. Please try again."); }
    finally { setSubmitting(false); }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
        <CheckCircle2 className="w-16 h-16 text-muted-foreground/30" />
        <p className="text-foreground font-semibold">Your cart is empty</p>
        <a href="/products" className="text-brand-600 hover:underline text-sm">Continue shopping</a>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <div className="container py-10">
        <h1 className="text-3xl font-display font-bold text-foreground mb-8">Checkout</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left: Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Shipping */}
              <div className="bg-white dark:bg-slate-800 rounded-2xl border border-border p-6">
                <h2 className="font-semibold text-foreground mb-5 flex items-center gap-2"><Truck className="w-4 h-4 text-brand-600" /> Delivery Information</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { name: "fullName", label: "Full Name", placeholder: "Your full name", span: 2 },
                    { name: "phone", label: "Phone Number", placeholder: "01XXXXXXXXX", span: 1 },
                    { name: "city", label: "City / Area", placeholder: "e.g. Mirpur, Uttara", span: 1 },
                    { name: "addressLine", label: "Full Address", placeholder: "House no, Road, Area...", span: 2 },
                  ].map(({ name, label, placeholder, span }) => (
                    <div key={name} className={span === 2 ? "sm:col-span-2" : ""}>
                      <label className="block text-sm font-medium text-foreground mb-1.5">{label}</label>
                      <input {...register(name as keyof FormData)} placeholder={placeholder}
                        className="w-full px-4 py-3 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
                      {errors[name as keyof FormData] && <p className="text-xs text-destructive mt-1">{errors[name as keyof FormData]?.message}</p>}
                    </div>
                  ))}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">District</label>
                    <select {...register("district")} className="w-full px-4 py-3 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring">
                      <option value="">Select district</option>
                      {districts.map((d) => <option key={d} value={d}>{d}</option>)}
                    </select>
                    {errors.district && <p className="text-xs text-destructive mt-1">{errors.district.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Special Notes (optional)</label>
                    <input {...register("notes")} placeholder="Any special delivery instructions" className="w-full px-4 py-3 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
                  </div>
                </div>
              </div>

              {/* Payment */}
              <div className="bg-white dark:bg-slate-800 rounded-2xl border border-border p-6">
                <h2 className="font-semibold text-foreground mb-5 flex items-center gap-2"><CreditCard className="w-4 h-4 text-brand-600" /> Payment Method</h2>
                <div className="space-y-3">
                  {paymentMethods.map(({ id, label, icon: Icon, desc }) => (
                    <label key={id} className={cn("flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all", payment === id ? "border-brand-600 bg-brand-50 dark:bg-brand-900/20" : "border-border hover:border-brand-300")}>
                      <input type="radio" name="payment" value={id} checked={payment === id} onChange={() => setPayment(id)} className="accent-brand-600" />
                      <Icon className="w-5 h-5 text-brand-600 shrink-0" />
                      <div>
                        <p className="font-medium text-sm text-foreground">{label}</p>
                        <p className="text-xs text-muted-foreground">{desc}</p>
                      </div>
                    </label>
                  ))}
                </div>
                {(payment === "BKASH" || payment === "NAGAD") && (
                  <div className="mt-4 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-xl border border-amber-200 dark:border-amber-800 text-sm text-amber-700 dark:text-amber-400">
                    After placing your order, you will receive payment instructions via SMS and WhatsApp.
                  </div>
                )}
              </div>
            </div>

            {/* Right: Summary */}
            <div className="space-y-5">
              <div className="bg-white dark:bg-slate-800 rounded-2xl border border-border p-6">
                <h2 className="font-semibold text-foreground mb-4">Order Summary</h2>
                <div className="space-y-3 max-h-64 overflow-y-auto mb-4">
                  {items.map((item) => (
                    <div key={item.productId} className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg overflow-hidden bg-muted shrink-0">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-foreground line-clamp-1">{item.name}</p>
                        <p className="text-xs text-muted-foreground">×{item.quantity}</p>
                      </div>
                      <span className="text-xs font-bold text-foreground shrink-0">{formatPrice(item.price * item.quantity)}</span>
                    </div>
                  ))}
                </div>

                {/* Coupon */}
                <div className="flex gap-2 mb-4">
                  <div className="flex-1 relative">
                    <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input value={coupon} onChange={(e) => setCoupon(e.target.value.toUpperCase())} placeholder="Coupon code" className="w-full pl-9 pr-3 py-2.5 text-sm rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring" />
                  </div>
                  <button type="button" onClick={applyCoupon} className="px-4 py-2.5 bg-muted hover:bg-muted/80 text-foreground text-sm font-medium rounded-lg transition-colors">Apply</button>
                </div>

                <div className="space-y-2 text-sm border-t border-border pt-4">
                  <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>{formatPrice(subtotal)}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Shipping</span><span>{formatPrice(shipping)}</span></div>
                  {discount > 0 && <div className="flex justify-between text-green-600"><span>Discount</span><span>-{formatPrice(discount)}</span></div>}
                  <div className="flex justify-between font-bold text-base pt-2 border-t border-border"><span>Total</span><span className="text-accent">{formatPrice(total)}</span></div>
                </div>
              </div>

              <button type="submit" disabled={submitting}
                className="w-full flex items-center justify-center gap-2 py-4 bg-brand-600 hover:bg-brand-700 text-white font-semibold rounded-xl transition-all shadow-brand-sm disabled:opacity-70 disabled:cursor-not-allowed hover:scale-[1.01] active:scale-[0.99]">
                {submitting ? "Placing Order..." : <><span>Place Order</span><ArrowRight className="w-4 h-4" /></>}
              </button>
              <p className="text-xs text-center text-muted-foreground">By placing an order you agree to our Terms & Privacy Policy</p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
