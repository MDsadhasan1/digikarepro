"use client";

import { useState } from "react";
import { Save, Globe, CreditCard, Truck, Bell } from "lucide-react";
import { toast } from "sonner";
import { Metadata } from "next";

const inputCls = "w-full px-4 py-2.5 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring";

export default function AdminSettingsPage() {
  const [saving, setSaving] = useState(false);
  const save = () => { setSaving(true); setTimeout(() => { setSaving(false); toast.success("Settings saved!"); }, 800); };

  const sections = [
    {
      title: "Store Information", icon: Globe,
      fields: [
        { label: "Store Name", value: "dogikarepro", type: "text" },
        { label: "Store Email", value: "support@dogikarepro.com", type: "email" },
        { label: "WhatsApp Number", value: "+8801700000000", type: "tel" },
        { label: "Store Address", value: "Dhaka, Bangladesh", type: "text" },
      ],
    },
    {
      title: "Shipping", icon: Truck,
      fields: [
        { label: "Dhaka Shipping Cost (৳)", value: "60", type: "number" },
        { label: "Outside Dhaka (৳)", value: "120", type: "number" },
        { label: "Free Shipping Threshold (৳)", value: "1500", type: "number" },
      ],
    },
    {
      title: "Payment", icon: CreditCard,
      fields: [
        { label: "bKash Number", value: "01700000000", type: "tel" },
        { label: "Nagad Number", value: "01700000000", type: "tel" },
        { label: "Bank Account", value: "", type: "text" },
      ],
    },
  ];

  return (
    <div className="space-y-6 max-w-2xl">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Settings</h1>
        <button onClick={save} disabled={saving} className="flex items-center gap-2 px-5 py-2.5 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-sm font-semibold shadow-brand-sm disabled:opacity-70">
          <Save className="w-4 h-4" />{saving ? "Saving..." : "Save Changes"}
        </button>
      </div>

      {sections.map(({ title, icon: Icon, fields }) => (
        <div key={title} className="bg-white dark:bg-slate-800 rounded-2xl border border-border p-6 space-y-4">
          <h2 className="font-semibold text-foreground flex items-center gap-2"><Icon className="w-4 h-4 text-brand-600" />{title}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {fields.map(({ label, value, type }) => (
              <div key={label}>
                <label className="block text-sm font-medium text-foreground mb-1.5">{label}</label>
                <input type={type} defaultValue={value} className={inputCls} />
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Notifications */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-border p-6 space-y-4">
        <h2 className="font-semibold text-foreground flex items-center gap-2"><Bell className="w-4 h-4 text-brand-600" />Notifications</h2>
        {[
          { label: "New order notifications", desc: "Get notified when a new order is placed" },
          { label: "Low stock alerts", desc: "Alert when product stock falls below threshold" },
          { label: "New review notifications", desc: "Notify when a new review is submitted" },
          { label: "Customer messages", desc: "Notify on new WhatsApp/Messenger messages" },
        ].map(({ label, desc }) => (
          <label key={label} className="flex items-center justify-between cursor-pointer py-1">
            <div><p className="text-sm font-medium text-foreground">{label}</p><p className="text-xs text-muted-foreground">{desc}</p></div>
            <input type="checkbox" defaultChecked className="w-4 h-4 rounded accent-brand-600" />
          </label>
        ))}
      </div>
    </div>
  );
}
