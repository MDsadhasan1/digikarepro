"use client";

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { month: "Jul", revenue: 42000, orders: 68 },
  { month: "Aug", revenue: 58000, orders: 89 },
  { month: "Sep", revenue: 51000, orders: 74 },
  { month: "Oct", revenue: 79000, orders: 112 },
  { month: "Nov", revenue: 95000, orders: 148 },
  { month: "Dec", revenue: 145000, orders: 284 },
];

export default function SalesChart() {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-border p-5">
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-semibold text-foreground">Revenue Overview</h3>
        <span className="text-xs text-muted-foreground bg-muted px-2.5 py-1 rounded-full">Last 6 months</span>
      </div>
      <ResponsiveContainer width="100%" height={220}>
        <AreaChart data={data} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
          <defs>
            <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#2563EB" stopOpacity={0.15} />
              <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="currentColor" opacity={0.05} />
          <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "currentColor", opacity: 0.5 }} />
          <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "currentColor", opacity: 0.5 }} tickFormatter={(v) => `৳${(v / 1000).toFixed(0)}k`} />
          <Tooltip
            contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "0.75rem", boxShadow: "0 10px 25px rgba(0,0,0,.1)", fontSize: "12px" }}
            formatter={(v: number) => [`৳${v.toLocaleString()}`, "Revenue"]}
          />
          <Area type="monotone" dataKey="revenue" stroke="#2563EB" strokeWidth={2.5} fill="url(#revGrad)" dot={false} activeDot={{ r: 5, fill: "#2563EB" }} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
