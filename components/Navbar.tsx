"use client";

import Link from "next/link";
import { ShoppingCart, Menu, X } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/context/CartContext";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/products?category=Electronics", label: "Electronics" },
  { href: "/products?category=Fashion", label: "Fashion" },
  { href: "/products?category=Home+%26+Living", label: "Home & Living" },
];

export default function Navbar() {
  const { itemCount } = useCart();
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-blue-600 shrink-0">
          DigiKare Pro
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
          {navLinks.map((l) => (
            <Link key={l.href} href={l.href} className="hover:text-blue-600 transition-colors">
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/cart"
            className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Cart"
          >
            <ShoppingCart className="w-5 h-5 text-gray-700" />
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold leading-none">
                {itemCount > 9 ? "9+" : itemCount}
              </span>
            )}
          </Link>

          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Menu"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 pb-4">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block py-3 text-sm font-medium text-gray-700 hover:text-blue-600 border-b border-gray-50 last:border-0"
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
