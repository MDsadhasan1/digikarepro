import Link from "next/link";
import { ArrowRight } from "lucide-react";

const categories = [
  { name: "Electronics",    slug: "electronics",    icon: "💻", count: 120, color: "from-blue-500 to-cyan-400" },
  { name: "Fashion",        slug: "fashion",         icon: "👗", count: 85,  color: "from-pink-500 to-rose-400" },
  { name: "Home & Living",  slug: "home-living",     icon: "🏠", count: 64,  color: "from-amber-500 to-yellow-400" },
  { name: "Health & Beauty",slug: "health-beauty",   icon: "✨", count: 97,  color: "from-emerald-500 to-teal-400" },
  { name: "Sports",         slug: "sports",          icon: "⚽", count: 43,  color: "from-orange-500 to-red-400" },
  { name: "Books",          slug: "books",           icon: "📚", count: 210, color: "from-violet-500 to-purple-400" },
  { name: "Baby & Kids",    slug: "baby-kids",       icon: "🧸", count: 58,  color: "from-sky-500 to-blue-400" },
  { name: "Groceries",      slug: "groceries",       icon: "🛒", count: 145, color: "from-green-500 to-emerald-400" },
];

export default function CategoryGrid() {
  return (
    <section className="section bg-slate-50 dark:bg-slate-900">
      <div className="container">
        {/* Header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-brand-600 font-semibold text-sm uppercase tracking-wider mb-2">Shop by Category</p>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 dark:text-white">
              Browse Categories
            </h2>
          </div>
          <Link href="/categories" className="hidden sm:flex items-center gap-1.5 text-brand-600 hover:text-brand-700 text-sm font-medium transition-colors">
            All Categories <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/categories/${cat.slug}`}
              className="group relative flex flex-col items-center justify-center p-6 rounded-2xl
                         bg-white dark:bg-slate-800 border border-border shadow-sm
                         hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden"
            >
              {/* Gradient bg on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${cat.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />

              {/* Icon */}
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${cat.color} flex items-center justify-center text-3xl mb-4 shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                {cat.icon}
              </div>

              <h3 className="font-semibold text-sm text-slate-800 dark:text-slate-100 text-center group-hover:text-brand-600 transition-colors">
                {cat.name}
              </h3>
              <p className="text-xs text-muted-foreground mt-1">{cat.count} products</p>
            </Link>
          ))}
        </div>

        <div className="flex sm:hidden justify-center mt-6">
          <Link href="/categories" className="flex items-center gap-1.5 text-brand-600 text-sm font-medium">
            View All Categories <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
