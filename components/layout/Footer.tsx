import Link from "next/link";
import { Mail, Phone, MapPin, Facebook, Instagram, Youtube } from "lucide-react";
import Logo from "@/components/common/Logo";

const footerLinks = {
  shop: [
    { label: "All Products",  href: "/products" },
    { label: "New Arrivals",  href: "/products?filter=new" },
    { label: "Best Sellers",  href: "/products?sort=best_selling" },
    { label: "Deals & Offers",href: "/products?sort=sale" },
    { label: "Categories",    href: "/categories" },
  ],
  account: [
    { label: "My Account",    href: "/account" },
    { label: "Order History", href: "/orders" },
    { label: "Wishlist",      href: "/wishlist" },
    { label: "Track Order",   href: "/orders" },
    { label: "Return Policy", href: "/returns" },
  ],
  company: [
    { label: "About Us",      href: "/about" },
    { label: "Contact",       href: "/contact" },
    { label: "Privacy Policy",href: "/privacy" },
    { label: "Terms of Use",  href: "/terms" },
    { label: "Sitemap",       href: "/sitemap" },
  ],
};

const paymentMethods = [
  { label: "bKash",             color: "bg-[#E2136E]", text: "bKash" },
  { label: "Nagad",             color: "bg-[#F5590A]", text: "Nagad" },
  { label: "Cash on Delivery",  color: "bg-green-600",  text: "COD" },
];

export default function Footer() {
  return (
    <footer className="bg-slate-900 dark:bg-slate-950 text-slate-300">
      {/* ── Main Footer ── */}
      <div className="container py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">
        {/* Brand column */}
        <div className="lg:col-span-2">
          <Logo dark className="mb-5" />
          <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
            Bangladesh&apos;s premium e-commerce destination. Quality products, fast delivery,
            and dedicated support — that&apos;s the dogikarepro promise.
          </p>

          {/* Contact info */}
          <div className="mt-6 space-y-2.5">
            <a
              href="tel:+8801700000000"
              className="flex items-center gap-2.5 text-sm text-slate-400 hover:text-white transition-colors"
            >
              <Phone className="w-4 h-4 text-teal-400 shrink-0" />
              +880 1700-000000
            </a>
            <a
              href="mailto:support@dogikarepro.com"
              className="flex items-center gap-2.5 text-sm text-slate-400 hover:text-white transition-colors"
            >
              <Mail className="w-4 h-4 text-teal-400 shrink-0" />
              support@dogikarepro.com
            </a>
            <div className="flex items-center gap-2.5 text-sm text-slate-400">
              <MapPin className="w-4 h-4 text-teal-400 shrink-0" />
              Dhaka, Bangladesh
            </div>
          </div>

          {/* Social links */}
          <div className="flex items-center gap-3 mt-6">
            {[
              { href: "#", icon: Facebook,  label: "Facebook" },
              { href: "#", icon: Instagram, label: "Instagram" },
              { href: "#", icon: Youtube,   label: "YouTube" },
            ].map(({ href, icon: Icon, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="w-9 h-9 flex items-center justify-center rounded-lg
                           bg-white/5 hover:bg-brand-600 text-slate-400 hover:text-white
                           border border-white/10 transition-all duration-200"
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        {/* Nav columns */}
        {(["shop", "account", "company"] as const).map((key) => (
          <div key={key}>
            <h3 className="font-semibold text-white text-sm uppercase tracking-wider mb-4">
              {key === "shop" ? "Shop" : key === "account" ? "Account" : "Company"}
            </h3>
            <ul className="space-y-2.5">
              {footerLinks[key].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* ── Bottom Bar ── */}
      <div className="border-t border-white/10">
        <div className="container py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} dogikarepro. All rights reserved.
          </p>

          {/* Payment methods */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 mr-1">We accept:</span>
            {paymentMethods.map((pm) => (
              <span
                key={pm.label}
                className={`${pm.color} text-white text-[10px] font-bold px-2 py-1 rounded-md`}
              >
                {pm.text}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
