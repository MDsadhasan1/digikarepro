"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const slides = [
  {
    id: 1,
    badge: "New Arrivals",
    heading: "Smart Care,\nSmart Shopping",
    subheading: "Bangladesh's premium destination for quality products. Delivered fast, with care.",
    cta: { label: "Shop Now", href: "/products" },
    cta2: { label: "Browse Categories", href: "/categories" },
    stats: [{ v: "10K+", l: "Happy Customers" }, { v: "500+", l: "Products" }, { v: "48hr", l: "Fast Delivery" }],
    gradient: "from-[#1E3A8A] via-[#1D4ED8] to-[#0D9488]",
    accent: "text-teal-300",
  },
  {
    id: 2,
    badge: "Best Sellers",
    heading: "Top Products\nTop Quality",
    subheading: "Handpicked by thousands of happy customers. Premium quality guaranteed.",
    cta: { label: "View Best Sellers", href: "/products?sort=best_selling" },
    cta2: { label: "All Products", href: "/products" },
    stats: [{ v: "4.9★", l: "Avg Rating" }, { v: "Free", l: "Returns" }, { v: "24/7", l: "Support" }],
    gradient: "from-[#0F172A] via-[#1E293B] to-[#0D9488]",
    accent: "text-orange-300",
  },
  {
    id: 3,
    badge: "Limited Deals",
    heading: "Up to 50% Off\nSelected Items",
    subheading: "Exclusive discounts on top brands. Pay with bKash or Nagad for extra 10% off.",
    cta: { label: "Grab Deals", href: "/products?sort=sale" },
    cta2: { label: "Use Coupon", href: "/products?sort=sale" },
    stats: [{ v: "50%", l: "Max Discount" }, { v: "৳60", l: "Dhaka Shipping" }, { v: "COD", l: "Available" }],
    gradient: "from-[#1E3A8A] via-[#7C3AED] to-[#0D9488]",
    accent: "text-yellow-300",
  },
];

export default function HeroBanner() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    const t = setInterval(() => goNext(), 6000);
    return () => clearInterval(t);
  }, [current]);

  const goTo = (idx: number) => {
    if (animating || idx === current) return;
    setAnimating(true);
    setTimeout(() => { setCurrent(idx); setAnimating(false); }, 300);
  };
  const goPrev = () => goTo((current - 1 + slides.length) % slides.length);
  const goNext = () => goTo((current + 1) % slides.length);

  const slide = slides[current];

  return (
    <section className={cn(
      "relative min-h-[88vh] flex items-center overflow-hidden bg-gradient-to-br",
      slide.gradient,
      "transition-all duration-700"
    )}>
      {/* BG decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl" />
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-400/10 rounded-full blur-2xl" />
        {/* Grid overlay */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: "linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)", backgroundSize: "60px 60px" }}
        />
      </div>

      <div className={cn("container relative z-10 transition-opacity duration-300", animating ? "opacity-0" : "opacity-100")}>
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white text-sm font-medium mb-6 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            {slide.badge}
          </div>

          {/* Heading */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-white leading-tight mb-6 whitespace-pre-line">
            {slide.heading.split("\n").map((line, i) => (
              <span key={i}>
                {i === 1 ? <span className={slide.accent}>{line}</span> : line}
                {i < slide.heading.split("\n").length - 1 && <br />}
              </span>
            ))}
          </h1>

          <p className="text-lg md:text-xl text-white/75 max-w-xl mb-10 leading-relaxed">
            {slide.subheading}
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4 mb-14">
            <Link href={slide.cta.href}
              className="inline-flex items-center gap-2 px-8 py-4 bg-accent hover:bg-accent/90 text-white font-semibold rounded-xl shadow-accent-sm transition-all duration-200 hover:scale-105 active:scale-95">
              {slide.cta.label}
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href={slide.cta2.href}
              className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl border border-white/20 backdrop-blur-sm transition-all duration-200">
              {slide.cta2.label}
            </Link>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-8">
            {slide.stats.map((s) => (
              <div key={s.l}>
                <div className="text-3xl font-bold text-white">{s.v}</div>
                <div className="text-sm text-white/60 mt-0.5">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4 z-10">
        <button onClick={goPrev} className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white transition-colors">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-2">
          {slides.map((_, i) => (
            <button key={i} onClick={() => goTo(i)}
              className={cn("rounded-full transition-all duration-300", i === current ? "w-6 h-2 bg-white" : "w-2 h-2 bg-white/40 hover:bg-white/60")}
            />
          ))}
        </div>
        <button onClick={goNext} className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white transition-colors">
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
}
