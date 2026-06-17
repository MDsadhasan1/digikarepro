import { Metadata } from "next";

export const metadata: Metadata = {
  title: "dogikarepro — Smart Care, Smart Shopping",
};

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* ── Hero Section ── */}
      <section className="relative overflow-hidden bg-gradient-hero min-h-[85vh] flex items-center">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-radial-brand opacity-30" />
        <div className="absolute top-20 right-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-400/10 rounded-full blur-2xl" />

        <div className="container relative z-10">
          <div className="max-w-3xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white text-sm font-medium mb-6 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              New Arrivals — Just Dropped
            </div>

            {/* Heading */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-white leading-tight mb-6">
              Smart Care,
              <br />
              <span className="text-teal-300">Smart Shopping</span>
            </h1>

            <p className="text-lg md:text-xl text-white/75 max-w-xl mb-10 leading-relaxed">
              Bangladesh&apos;s premium destination for quality products.
              Delivered fast, with care — right to your door.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4">
              <a
                href="/products"
                className="inline-flex items-center gap-2 px-8 py-4 bg-accent hover:bg-accent/90
                           text-white font-semibold rounded-xl shadow-accent-sm
                           transition-all duration-200 hover:scale-105 active:scale-95"
              >
                Shop Now
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <a
                href="/categories"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20
                           text-white font-semibold rounded-xl border border-white/20
                           backdrop-blur-sm transition-all duration-200"
              >
                Browse Categories
              </a>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 mt-14">
              {[
                { value: "10K+", label: "Happy Customers" },
                { value: "500+", label: "Products" },
                { value: "48hr", label: "Fast Delivery" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-3xl font-bold text-white">{stat.value}</div>
                  <div className="text-sm text-white/60 mt-0.5">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Coming Soon placeholder ── */}
      <section className="section bg-slate-50 dark:bg-slate-900">
        <div className="container text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-50 dark:bg-brand-900/20 text-brand-600 text-sm font-medium mb-4">
            Phase 3 — In Progress
          </div>
          <h2 className="text-3xl font-display font-bold text-slate-900 dark:text-white mb-4">
            Full Homepage Coming Soon
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Featured products, categories, best sellers, testimonials, and newsletter sections are being built in Phase 3.
          </p>
        </div>
      </section>
    </div>
  );
}
