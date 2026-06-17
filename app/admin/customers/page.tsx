import { Metadata } from "next";
import { Search, Users } from "lucide-react";
import { formatDate, formatPrice } from "@/lib/format";

export const metadata: Metadata = { title: "Customers — Admin" };

const customers = Array.from({ length: 10 }, (_, i) => ({
  id: `c${i + 1}`,
  name: ["Rakibul Hasan", "Fatema Begum", "Arif Ahmed", "Nusrat Jahan", "Mehedi Hassan", "Sumaiya Akter", "Tanvir Islam", "Ritu Das", "Kamal Hossain", "Shirin Akter"][i],
  email: [`rakibul${i}@gmail.com`, `fatema${i}@gmail.com`, `arif${i}@gmail.com`, `nusrat${i}@gmail.com`, `mehedi${i}@gmail.com`, `sumaiya${i}@gmail.com`, `tanvir${i}@gmail.com`, `ritu${i}@gmail.com`, `kamal${i}@gmail.com`, `shirin${i}@gmail.com`][i],
  phone: `0171234567${i}`,
  orders: [12, 4, 7, 2, 9, 3, 1, 6, 5, 8][i],
  totalSpent: [45000, 8500, 18000, 3200, 32000, 6700, 1500, 15000, 12000, 22000][i],
  joinDate: new Date(Date.now() - i * 30 * 86400000),
  location: ["Dhaka", "Chittagong", "Sylhet", "Rajshahi", "Khulna", "Dhaka", "Comilla", "Dhaka", "Sylhet", "Chittagong"][i],
}));

export default function AdminCustomersPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-bold text-foreground">Customers</h1><p className="text-muted-foreground text-sm">{customers.length} registered customers</p></div>
        <div className="flex items-center gap-2 px-3 py-2 bg-teal-50 dark:bg-teal-900/20 text-teal-700 dark:text-teal-400 rounded-xl text-sm font-medium">
          <Users className="w-4 h-4" /> 1,240 total
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-border p-4">
        <div className="relative max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input placeholder="Search customers..." className="w-full pl-9 pr-4 py-2 text-sm border border-input rounded-xl bg-background focus:outline-none focus:ring-2 focus:ring-ring" />
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead><tr className="border-b border-border bg-slate-50 dark:bg-slate-900/50">
              {["Customer", "Location", "Orders", "Total Spent", "Joined"].map((h) => (
                <th key={h} className="px-5 py-3.5 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide">{h}</th>
              ))}
            </tr></thead>
            <tbody className="divide-y divide-border">
              {customers.map((c) => (
                <tr key={c.id} className="hover:bg-muted/20 transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-brand flex items-center justify-center text-white text-xs font-bold shrink-0">{c.name[0]}</div>
                      <div><p className="font-medium text-sm text-foreground">{c.name}</p><p className="text-xs text-muted-foreground">{c.email}</p></div>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-sm text-muted-foreground">{c.location}</td>
                  <td className="px-5 py-4 text-sm font-medium text-foreground">{c.orders}</td>
                  <td className="px-5 py-4 text-sm font-semibold text-accent">{formatPrice(c.totalSpent)}</td>
                  <td className="px-5 py-4 text-sm text-muted-foreground">{formatDate(c.joinDate)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
