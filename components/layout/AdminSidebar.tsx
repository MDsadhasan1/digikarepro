"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, Package, Tag, ShoppingBag, Users,
  Ticket, Warehouse, Star, Image, Settings, LogOut, X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { APP_NAME } from "@/lib/constants";

const iconMap = {
  LayoutDashboard, Package, Tag, ShoppingBag, Users,
  Ticket, Warehouse, Star, Image, Settings,
} as const;

const navItems = [
  { label: "Dashboard",  href: "/admin",            icon: "LayoutDashboard" },
  { label: "Products",   href: "/admin/products",   icon: "Package" },
  { label: "Categories", href: "/admin/categories", icon: "Tag" },
  { label: "Orders",     href: "/admin/orders",     icon: "ShoppingBag" },
  { label: "Customers",  href: "/admin/customers",  icon: "Users" },
  { label: "Coupons",    href: "/admin/coupons",    icon: "Ticket" },
  { label: "Inventory",  href: "/admin/inventory",  icon: "Warehouse" },
  { label: "Reviews",    href: "/admin/reviews",    icon: "Star" },
  { label: "Banners",    href: "/admin/banners",    icon: "Image" },
  { label: "Settings",   href: "/admin/settings",   icon: "Settings" },
] as const;

interface AdminSidebarProps {
  onClose?: () => void;
}

export default function AdminSidebar({ onClose }: AdminSidebarProps) {
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);

  return (
    <aside className="flex h-full flex-col w-64 bg-slate-900 dark:bg-slate-950 border-r border-slate-800">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800">
        <div>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Admin Panel
          </p>
          <p className="text-sm font-bold text-white mt-0.5">{APP_NAME}</p>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="lg:hidden w-7 h-7 flex items-center justify-center
                       text-slate-400 hover:text-white rounded-md hover:bg-slate-800"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-3">
        <div className="space-y-0.5">
          {navItems.map(({ label, href, icon }) => {
            const Icon = iconMap[icon as keyof typeof iconMap];
            const active = isActive(href);
            return (
              <Link
                key={href}
                href={href}
                onClick={onClose}
                className={cn(
                  "sidebar-item",
                  active ? "sidebar-item-active" : "sidebar-item-inactive"
                )}
              >
                <Icon className="w-4.5 h-4.5 shrink-0" />
                <span>{label}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Footer */}
      <div className="border-t border-slate-800 px-3 py-4 space-y-1">
        <Link
          href="/"
          className="sidebar-item sidebar-item-inactive text-xs"
        >
          <Package className="w-4 h-4" />
          View Store
        </Link>
        <button
          className="sidebar-item sidebar-item-inactive w-full text-left text-red-400 hover:text-red-300 hover:bg-red-500/10"
        >
          <LogOut className="w-4 h-4 shrink-0" />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
