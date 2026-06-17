import { Metadata } from "next";
import { ShoppingBag, Users, Package, TrendingUp } from "lucide-react";

export const metadata: Metadata = { title: "Dashboard — Admin" };

const stats = [
  { label: "Total Orders",    value: "0",    icon: ShoppingBag, color: "text-brand-600",  bg: "bg-brand-50 dark:bg-brand-900/20" },
  { label: "Total Customers", value: "0",    icon: Users,       color: "text-teal-600",   bg: "bg-teal-50  dark:bg-teal-900/20" },
  { label: "Total Products",  value: "0",    icon: Package,     color: "text-purple-600", bg: "bg-purple-50 dark:bg-purple-900/20" },
  { label: "Total Revenue",   value: "৳0",  icon: TrendingUp,  color: "text-accent",     bg: "bg-orange-50 dark:bg-orange-900/20" },
];

export default function AdminDashboard() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-display font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-1">Welcome to dogikarepro admin panel.</p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
        {stats.map(({ label, value, icon: Icon, color, bg }) => (
          <div
            key={label}
            className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-border shadow-sm"
          >
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-muted-foreground font-medium">{label}</p>
              <div className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center`}>
                <Icon className={`w-5 h-5 ${color}`} />
              </div>
            </div>
            <p className="text-2xl font-bold text-foreground">{value}</p>
            <p className="text-xs text-muted-foreground mt-1">All time</p>
          </div>
        ))}
      </div>

      {/* Placeholder notice */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800
                      rounded-2xl p-6 text-center">
        <p className="text-blue-700 dark:text-blue-300 font-medium">
          Charts, recent orders table, and top products will be added in Phase 5 (Admin Dashboard).
        </p>
      </div>
    </div>
  );
}
