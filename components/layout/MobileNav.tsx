"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  X, Home, Package, Tag, Percent, Info, Heart, ShoppingBag, User, LogIn,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useUIStore } from "@/store/uiStore";
import Logo from "@/components/common/Logo";

const mobileLinks = [
  { label: "Home",       href: "/",             icon: Home },
  { label: "Products",   href: "/products",      icon: Package },
  { label: "Categories", href: "/categories",    icon: Tag },
  { label: "Deals",      href: "/products?sort=sale", icon: Percent },
  { label: "Wishlist",   href: "/wishlist",      icon: Heart },
  { label: "My Orders",  href: "/orders",        icon: ShoppingBag },
  { label: "Account",    href: "/account",       icon: User },
  { label: "About",      href: "/about",         icon: Info },
];

export default function MobileNav() {
  const { isMobileNavOpen, closeMobileNav } = useUIStore();
  const pathname = usePathname();

  useEffect(() => { closeMobileNav(); }, [pathname, closeMobileNav]);

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = isMobileNavOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMobileNavOpen]);

  return (
    <>
      {/* Overlay */}
      <div
        onClick={closeMobileNav}
        className={cn(
          "lg:hidden fixed inset-0 z-modal bg-black/60 backdrop-blur-sm transition-opacity duration-300",
          isMobileNavOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      />

      {/* Drawer */}
      <div
        className={cn(
          "lg:hidden fixed top-0 left-0 z-modal h-full w-72 bg-background shadow-2xl",
          "flex flex-col transition-transform duration-300 ease-smooth",
          isMobileNavOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <Logo />
          <button
            onClick={closeMobileNav}
            className="w-8 h-8 flex items-center justify-center rounded-lg
                       text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Links */}
        <nav className="flex-1 overflow-y-auto py-4 px-3">
          {mobileLinks.map(({ label, href, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 px-3 py-3 rounded-xl mb-1 text-sm font-medium",
                "transition-colors duration-200",
                pathname === href
                  ? "bg-brand-50 text-brand-600 dark:bg-brand-900/20 dark:text-brand-400"
                  : "text-slate-600 dark:text-slate-300 hover:bg-muted hover:text-foreground"
              )}
            >
              <Icon className="w-5 h-5 shrink-0" />
              {label}
            </Link>
          ))}
        </nav>

        {/* Footer */}
        <div className="border-t border-border px-4 py-4 space-y-2">
          <Link
            href="/login"
            className="flex items-center justify-center gap-2 w-full py-2.5
                       bg-brand-600 text-white text-sm font-semibold rounded-xl
                       hover:bg-brand-700 transition-colors"
          >
            <LogIn className="w-4 h-4" />
            Sign In
          </Link>
          <p className="text-xs text-center text-muted-foreground">
            © 2025 dogikarepro
          </p>
        </div>
      </div>
    </>
  );
}
