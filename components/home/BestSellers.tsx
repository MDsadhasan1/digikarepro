import Link from "next/link";
import { TrendingUp, ArrowRight } from "lucide-react";
import ProductCard from "@/components/product/ProductCard";
import type { Product } from "@/types";

const bestSellers: Product[] = Array.from({ length: 4 }, (_, i) => ({
  id: `bs${i + 1}`,
  name: ["iPhone 15 Pro Case Premium", "Xiaomi Band 8 Smartband", "Anker PowerBank 20000mAh", "Samsung 128GB Memory Card"][i],
  slug: ["iphone-case", "xiaomi-band-8", "anker-powerbank", "samsung-memory"][i],
  description: "Best selling product.",
  categoryId: "c1",
  basePrice: [890, 3200, 2800, 650][i],
  salePrice: [750, 2700, undefined, 550][i],
  stock: 50,
  isFeatured: false,
  isBestSeller: true,
  isNew: false,
  isActive: true,
  isDigital: false,
  tags: [],
  images: [{ id: `bimg${i}`, url: `https://images.unsplash.com/photo-${["1601593346740-925612772716", "1523275335684-37898b6baf30", "1609592806598-24d48b0a4e0d", "1517336714731-489689fd1ca8"][i]}?w=600&q=80`, alt: "", isPrimary: true, sortOrder: 0 }],
  variants: [],
  attributes: [],
  category: { id: "c1", name: ["Accessories", "Wearables", "Power", "Storage"][i], slug: "category" },
  soldCount: [1200, 890, 760, 1450][i],
  reviewCount: [342, 189, 234, 567][i],
  averageRating: [4.9, 4.8, 4.7, 4.9][i],
  createdAt: new Date(),
  updatedAt: new Date(),
}));

export default function BestSellers() {
  return (
    <section className="section bg-slate-50 dark:bg-slate-900">
      <div className="container">
        <div className="flex items-end justify-between mb-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-accent" />
              <p className="text-accent font-semibold text-sm uppercase tracking-wider">Trending Now</p>
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 dark:text-white">
              Best Sellers
            </h2>
          </div>
          <Link href="/products?sort=best_selling" className="hidden sm:flex items-center gap-1.5 text-brand-600 hover:text-brand-700 text-sm font-medium">
            See All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {bestSellers.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </div>
    </section>
  );
}
