import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ProductCard from "@/components/product/ProductCard";
import type { Product } from "@/types";

// Demo products for static render until DB is connected
const demoProducts: Product[] = Array.from({ length: 8 }, (_, i) => ({
  id: `p${i + 1}`,
  name: ["Wireless Noise Cancelling Headphones", "Premium Leather Wallet", "Smart Watch Series 5", "Portable Bluetooth Speaker", "Mechanical Gaming Keyboard", "4K Action Camera", "Electric Toothbrush Pro", "Running Shoes Air Max"][i],
  slug: ["wireless-headphones", "leather-wallet", "smart-watch", "bluetooth-speaker", "gaming-keyboard", "action-camera", "electric-toothbrush", "running-shoes"][i],
  description: "High quality product with premium features.",
  categoryId: "c1",
  basePrice: [3500, 850, 8900, 2200, 4500, 12000, 1800, 3200][i],
  salePrice: [i === 0 ? 2800 : i === 2 ? 7500 : i === 4 ? 3800 : undefined][0],
  stock: i === 6 ? 0 : 15,
  isFeatured: true,
  isBestSeller: [1, 3, 5].includes(i),
  isNew: [0, 2, 7].includes(i),
  isActive: true,
  isDigital: false,
  tags: [],
  images: [{ id: `img${i}`, url: `https://images.unsplash.com/photo-${["1505740420928-5e560c06d30e", "1627123424574-724758594785", "1523275335684-37898b6baf30", "1608043152269-423dbba4e7e1", "1587202372583-49330a15584d", "1502920917128-1aa500764cbd", "1559757148-5c350d0d3c56", "1542291026-7eec264c27ff"][i]}?w=600&q=80`, alt: "", isPrimary: true, sortOrder: 0 }],
  variants: [],
  attributes: [],
  category: { id: "c1", name: ["Audio", "Accessories", "Wearables", "Audio", "Gaming", "Cameras", "Health", "Sports"][i], slug: "category" },
  soldCount: [450, 230, 180, 390, 120, 85, 310, 200][i],
  reviewCount: [124, 67, 89, 156, 43, 28, 201, 78][i],
  averageRating: [4.8, 4.6, 4.9, 4.7, 4.5, 4.8, 4.9, 4.6][i],
  createdAt: new Date(),
  updatedAt: new Date(),
}));

export default function FeaturedProducts() {
  return (
    <section className="section bg-white dark:bg-slate-950">
      <div className="container">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-brand-600 font-semibold text-sm uppercase tracking-wider mb-2">Handpicked for You</p>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 dark:text-white">
              Featured Products
            </h2>
          </div>
          <Link href="/products" className="hidden sm:flex items-center gap-1.5 text-brand-600 hover:text-brand-700 text-sm font-medium transition-colors">
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
          {demoProducts.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>

        <div className="flex sm:hidden justify-center mt-6">
          <Link href="/products" className="px-6 py-2.5 border border-brand-600 text-brand-600 rounded-xl font-medium text-sm hover:bg-brand-50 transition-colors">
            View All Products
          </Link>
        </div>
      </div>
    </section>
  );
}
