import Link from "next/link";
import { Truck, ShieldCheck, RefreshCcw, Headphones } from "lucide-react";

const perks = [
  { icon: Truck,        title: "Fast Delivery",      desc: "Dhaka: 24-48hrs. Nationwide: 3-5 days.",  color: "text-brand-600", bg: "bg-brand-50 dark:bg-brand-900/20" },
  { icon: ShieldCheck,  title: "Secure Payments",    desc: "bKash, Nagad, COD — all 100% secure.",   color: "text-teal-600",  bg: "bg-teal-50  dark:bg-teal-900/20" },
  { icon: RefreshCcw,   title: "Easy Returns",       desc: "7-day hassle-free return policy.",        color: "text-purple-600",bg: "bg-purple-50 dark:bg-purple-900/20" },
  { icon: Headphones,   title: "24/7 Support",       desc: "WhatsApp & phone support always on.",    color: "text-accent",    bg: "bg-orange-50 dark:bg-orange-900/20" },
];

const promos = [
  {
    bg: "bg-gradient-to-br from-brand-600 to-teal-500",
    badge: "Special Offer",
    title: "Get 10% Off\nYour First Order",
    desc: "Use code WELCOME10 at checkout.",
    cta: { label: "Shop Now", href: "/products" },
  },
  {
    bg: "bg-gradient-to-br from-slate-800 to-slate-700 dark:from-slate-700 dark:to-slate-600",
    badge: "bKash Offer",
    title: "Pay with bKash,\nSave Extra 5%",
    desc: "Valid on orders above ৳500.",
    cta: { label: "Learn More", href: "/products" },
  },
];

export default function PromoSection() {
  return (
    <section className="section bg-white dark:bg-slate-950">
      <div className="container space-y-16">
        {/* Perks */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {perks.map(({ icon: Icon, title, desc, color, bg }) => (
            <div key={title} className="flex items-start gap-4 p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-border">
              <div className={`w-11 h-11 rounded-xl ${bg} flex items-center justify-center shrink-0`}>
                <Icon className={`w-5 h-5 ${color}`} />
              </div>
              <div>
                <h3 className="font-semibold text-sm text-foreground">{title}</h3>
                <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Promo banners */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {promos.map((p) => (
            <div key={p.title} className={`${p.bg} rounded-2xl p-8 relative overflow-hidden`}>
              <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="relative z-10">
                <span className="inline-block px-3 py-1 rounded-full bg-white/20 text-white text-xs font-medium mb-3">
                  {p.badge}
                </span>
                <h3 className="text-2xl font-display font-bold text-white whitespace-pre-line mb-2">
                  {p.title}
                </h3>
                <p className="text-white/70 text-sm mb-5">{p.desc}</p>
                <Link href={p.cta.href}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-slate-900 font-semibold text-sm rounded-xl hover:bg-white/90 transition-colors">
                  {p.cta.label}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
