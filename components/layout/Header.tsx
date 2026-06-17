"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ShoppingCart, Heart, Search, Menu, X, User, ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { NAV_LINKS } from "@/lib/constants";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";
import { useUIStore } from "@/store/uiStore";
import Logo from "@/components/common/Logo";
import ThemeToggle from "@/components/common/ThemeToggle";
import CartDrawer from "@/components/cart/CartDrawer";
import MobileNav from "@/components/layout/MobileNav";

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const totalItems    = useCartStore((s) => s.totalItems);
  const toggleCart    = useCartStore((s) => s.toggleCart);
  const wishlistCount = useWishlistStore((s) => s.items.length);
  const { isSearchOpen, toggleSearch, closeSearch, toggleMobileNav } = useUIStore();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close search on route change
  useEffect(() => { closeSearch(); }, [pathname, closeSearch]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery.trim())}`;
      setSearchQuery("");
      closeSearch();
    }
  };

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-sticky h-16 transition-all duration-300",
          scrolled
            ? "bg-white/90 dark:bg-slate-900/90 backdrop-blur-md shadow-sm border-b border-border/50"
            : "bg-white dark:bg-slate-900 border-b border-border"
        )}
      >
        <div className="container h-full flex items-center gap-4">
          {/* ── Logo ── */}
          <Logo className="shrink-0" />

          {/* ── Desktop Nav ── */}
          <nav className="hidden lg:flex items-center gap-1 ml-6">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200",
                  pathname === link.href || pathname.startsWith(link.href + "/")
                    ? "text-brand-600 bg-brand-50 dark:bg-brand-900/20"
                    : "text-slate-600 dark:text-slate-300 hover:text-brand-600 hover:bg-slate-100 dark:hover:bg-slate-800"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* ── Search Bar (desktop, inline) ── */}
          <div
            className={cn(
              "hidden lg:flex flex-1 max-w-md mx-auto transition-all duration-300",
              isSearchOpen ? "opacity-100" : "opacity-0 pointer-events-none"
            )}
          >
            <form onSubmit={handleSearch} className="w-full relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products…"
                autoFocus={isSearchOpen}
                className="w-full pl-10 pr-4 py-2 rounded-xl border border-input bg-background
                           text-sm focus:outline-none focus:ring-2 focus:ring-ring
                           transition-all duration-200"
              />
            </form>
          </div>

          {/* ── Spacer ── */}
          <div className="flex-1 lg:hidden" />

          {/* ── Right Actions ── */}
          <div className="flex items-center gap-1">
            {/* Search toggle */}
            <button
              onClick={toggleSearch}
              aria-label="Toggle search"
              className="w-9 h-9 flex items-center justify-center rounded-lg
                         text-muted-foreground hover:text-foreground hover:bg-muted
                         transition-colors duration-200"
            >
              {isSearchOpen ? <X className="w-5 h-5" /> : <Search className="w-5 h-5" />}
            </button>

            {/* Wishlist */}
            <Link
              href="/wishlist"
              aria-label={`Wishlist (${wishlistCount})`}
              className="relative w-9 h-9 flex items-center justify-center rounded-lg
                         text-muted-foreground hover:text-foreground hover:bg-muted
                         transition-colors duration-200"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1
                                 bg-accent text-white text-[10px] font-bold rounded-full
                                 flex items-center justify-center">
                  {wishlistCount > 99 ? "99+" : wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart */}
            <button
              onClick={() => toggleCart()}
              aria-label={`Cart (${totalItems()})`}
              className="relative w-9 h-9 flex items-center justify-center rounded-lg
                         text-muted-foreground hover:text-foreground hover:bg-muted
                         transition-colors duration-200"
            >
              <ShoppingCart className="w-5 h-5" />
              {totalItems() > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1
                                 bg-brand-600 text-white text-[10px] font-bold rounded-full
                                 flex items-center justify-center">
                  {totalItems() > 99 ? "99+" : totalItems()}
                </span>
              )}
            </button>

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Account */}
            <Link
              href="/account"
              aria-label="My account"
              className="hidden sm:flex w-9 h-9 items-center justify-center rounded-lg
                         text-muted-foreground hover:text-foreground hover:bg-muted
                         transition-colors duration-200"
            >
              <User className="w-5 h-5" />
            </Link>

            {/* Mobile Menu */}
            <button
              onClick={toggleMobileNav}
              aria-label="Open menu"
              className="lg:hidden w-9 h-9 flex items-center justify-center rounded-lg
                         text-muted-foreground hover:text-foreground hover:bg-muted
                         transition-colors duration-200"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* ── Mobile Search Bar ── */}
        {isSearchOpen && (
          <div className="lg:hidden px-4 pb-3 bg-inherit border-b border-border">
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products…"
                autoFocus
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-input bg-background
                           text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </form>
          </div>
        )}
      </header>

      {/* ── Drawers ── */}
      <CartDrawer />
      <MobileNav />
    </>
  );
}
