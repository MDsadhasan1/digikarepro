"use client";

import { useState } from "react";
import { Plus, Copy, Trash2, Tag } from "lucide-react";
import { formatPrice, formatDate } from "@/lib/format";
import { toast } from "sonner";

const initCoupons = [
  { id: "cp1", code: "WELCOME10", type: "PERCENTAGE", value: 10, minOrder: 500, used: 234, limit: null, active: true, expires: null },
  { id: "cp2", code: "FLAT200",   type: "FIXED_AMOUNT", value: 200, minOrder: 1000, used: 89, limit: 500, active: true, expires: new Date("2025-01-31") },
  { id: "cp3", code: "BKASH5",    type: "PERCENTAGE", value: 5, minOrder: 500, used: 456, limit: null, active: true, expires: new Date("2025-02-28") },
  { id: "cp4", code: "FREESHIP",  type: "FREE_SHIPPING", value: 0, minOrder: 1500, used: 123, limit: 1000, active: false, expires: new Date("2024-12-31") },
];

export default function AdminCouponsPage() {
  const [coupons, setCoupons] = useState(initCoupons);

  const copyCode = (code: string) => { navigator.clipboard.writeText(code); toast.success(`Copied: ${code}`); };
  const toggleActive = (id: string) => setCoupons(coupons.map((c) => c.id === id ? { ...c, active: !c.active } : c));
  const remove = (id: string) => setCoupons(coupons.filter((c) => c.id !== id));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-bold text-foreground">Coupons</h1><p className="text-muted-foreground text-sm">{coupons.length} coupon codes</p></div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-sm font-semibold shadow-brand-sm">
          <Plus className="w-4 h-4" /> Create Coupon
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {[{ label: "Total Coupons", v: coupons.length, color: "text-brand-600" }, { label: "Active", v: coupons.filter(c=>c.active).length, color: "text-green-600" }, { label: "Total Uses", v: coupons.reduce((a, c) => a + c.used, 0), color: "text-teal-600" }, { label: "Inactive", v: coupons.filter(c=>!c.active).length, color: "text-muted-foreground" }].map(({ label, v, color }) => (
          <div key={label} className="bg-white dark:bg-slate-800 rounded-2xl border border-border p-4"><p className="text-sm text-muted-foreground">{label}</p><p className={`text-2xl font-bold mt-1 ${color}`}>{v}</p></div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {coupons.map((c) => (
          <div key={c.id} className={`bg-white dark:bg-slate-800 rounded-2xl border-2 p-5 ${c.active ? "border-border" : "border-dashed border-muted opacity-70"}`}>
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <Tag className="w-4 h-4 text-brand-600" />
                <button onClick={() => copyCode(c.code)} className="font-mono font-bold text-lg text-foreground hover:text-brand-600 flex items-center gap-1.5">
                  {c.code} <Copy className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="flex gap-2">
                <button onClick={() => toggleActive(c.id)} className={`badge-pill text-xs cursor-pointer ${c.active ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>{c.active ? "Active" : "Inactive"}</button>
                <button onClick={() => remove(c.id)} className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-red-50 text-muted-foreground hover:text-red-500 transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div><p className="text-muted-foreground text-xs">Discount</p><p className="font-semibold text-accent">{c.type === "PERCENTAGE" ? `${c.value}%` : c.type === "FIXED_AMOUNT" ? formatPrice(c.value) : "Free Shipping"}</p></div>
              <div><p className="text-muted-foreground text-xs">Min Order</p><p className="font-medium">{formatPrice(c.minOrder)}</p></div>
              <div><p className="text-muted-foreground text-xs">Used</p><p className="font-medium">{c.used}{c.limit ? `/${c.limit}` : ""}</p></div>
              <div><p className="text-muted-foreground text-xs">Expires</p><p className="font-medium">{c.expires ? formatDate(c.expires) : "Never"}</p></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
