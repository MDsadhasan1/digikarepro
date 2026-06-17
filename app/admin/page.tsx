import { Metadata } from "next";
import { ShoppingBag, Users, Package, TrendingUp, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { formatPrice } from "@/lib/format";
import SalesChart from "@/components/admin/SalesChart";
import RecentOrders from "@/components/admin/RecentOrders";

export const metadata: Metadata = { title: "Dashboard — Admin" };

const stats = [
  { label: "Total Revenue",    value: 145000, prev: 120000, format: true,  icon: TrendingUp,  color: "text-accent",     bg: "bg-orange-50 dark:bg-orange-900/20" },
  { label: "Total Orders",     value: 284,    prev: 230,    format: false, icon: ShoppingBag, color: "text-brand-600",  bg: "bg-brand-50 dark:bg-brand-900/20" },
  { label: "Total Customers",  value: 1240,   prev: 1100,   format: false, icon: Users,       color: "text-teal-600",   bg: "bg-teal-50 dark:bg-teal-900/20" },
  { label: "Total Products",   value: 186,    prev: 160,    format: false, icon: Package,     color: "text-purple-600", bg: "bg-purple-50 dark:bg-purple-900/20" },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-display font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-1 text-sm">Welcome back! Here&apos;s what&apos;s happening.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {stats.map(({ label, value, prev, format, icon: Icon, color, bg }) => {
          const pct = Math.round(((value - prev) / prev) * 100);
          const up = pct >= 0;
          return (
            <div key={label} className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-border shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm text-muted-foreground font-medium">{label}</p>
                <div className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center`}>
                  <Icon className={`w-5 h-5 ${color}`} />
                </div>
              </div>
              <p className="text-2xl font-bold text-foreground">{format ? formatPrice(value) : value.toLocaleString()}</p>
              <div className={`flex items-center gap-1 mt-1.5 text-xs font-medium ${up ? "text-green-600" : "text-red-500"}`}>
                {up ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
                {Math.abs(pct)}% vs last month
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <SalesChart />
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-border p-5">
          <h3 className="font-semibold text-foreground mb-4">Top Categories</h3>
          {[
            { name: "Electronics", pct: 38, color: "bg-brand-600" },
            { name: "Fashion",     pct: 24, color: "bg-teal-500" },
            { name: "Home",        pct: 18, color: "bg-purple-500" },
            { name: "Health",      pct: 12, color: "bg-accent" },
            { name: "Sports",      pct: 8,  color: "bg-green-500" },
          ].map(({ name, pct, color }) => (
            <div key={name} className="mb-3">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-muted-foreground">{name}</span>
                <span className="font-medium text-foreground">{pct}%</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className={`h-full ${color} rounded-full`} style={{ width: `${pct}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent orders */}
      <RecentOrders />
    </div>
  );
}
