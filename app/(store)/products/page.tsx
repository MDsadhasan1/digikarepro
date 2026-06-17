import { Metadata } from "next";
import { Suspense } from "react";
import ProductCard from "@/components/product/ProductCard";
import ProductFilters from "@/components/product/ProductFilters";
import ProductSort from "@/components/product/ProductSort";
import { ProductGridSkeleton } from "@/components/product/ProductCardSkeleton";
import type { Product } from "@/types";

export const metadata: Metadata = { title: "All Products" };

// Demo data — replace with DB query
const mockProducts: Product[] = Array.from({ length: 16 }, (_, i) => ({
  id: `prod${i + 1}`,
  name: [`Wireless Headphones Pro`, `Smart Watch Gen 4`, `Premium Backpack`, `Running Shoes`, `Coffee Maker`, `Desk Lamp LED`, `Yoga Mat`, `Protein Shake`, `Gaming Mouse`, `Mechanical Keyboard`, `Monitor 27"`, `USB-C Hub`, `Sunglasses UV400`, `Wallet Slim`, `Notebook Journal`, `Plant Pot Set`][i],
  slug: [`wireless-headphones-pro`, `smart-watch-gen4`, `premium-backpack`, `running-shoes`, `coffee-maker`, `desk-lamp`, `yoga-mat`, `protein-shake`, `gaming-mouse`, `keyboard`, `monitor-27`, `usb-c-hub`, `sunglasses`, `slim-wallet`, `notebook`, `plant-pot`][i],
  description: "Quality product.",
  categoryId: "c1",
  basePrice: [3500, 9800, 2800, 3200, 4500, 1200, 800, 1500, 2200, 4500, 28000, 1800, 1400, 850, 350, 950][i],
  salePrice: [i % 3 === 0 ? undefined : undefined][0],
  stock: i === 10 ? 0 : 25,
  isFeatured: i < 4,
  isBestSeller: [1, 3, 7].includes(i),
  isNew: [0, 5, 9, 12].includes(i),
  isActive: true,
  isDigital: false,
  tags: [],
  images: [{ id: `img${i}`, url: `https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=70`, alt: "", isPrimary: true, sortOrder: 0 }],
  variants: [],
  attributes: [],
  category: { id: "c1", name: "Electronics", slug: "electronics" },
  soldCount: Math.floor(Math.random() * 500),
  reviewCount: Math.floor(Math.random() * 200),
  averageRating: 4 + Math.random(),
  createdAt: new Date(),
  updatedAt: new Date(),
}));

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ sort?: string; category?: string; q?: string; page?: string }>;
}) {
  const params = await searchParams;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Page header */}
      <div className="bg-white dark:bg-slate-950 border-b border-border py-8">
        <div className="container">
          <h1 className="text-3xl font-display font-bold text-foreground">
            {params.q ? `Results for "${params.q}"` : "All Products"}
          </h1>
          <p className="text-muted-foreground mt-1">{mockProducts.length} products found</p>
        </div>
      </div>

      <div className="container py-8">
        <div className="flex gap-8">
          {/* Sidebar filters (desktop) */}
          <aside className="hidden lg:block w-56 shrink-0">
            <div className="sticky top-20 bg-white dark:bg-slate-800 rounded-2xl border border-border p-5">
              <Suspense>
                <ProductFilters />
              </Suspense>
            </div>
          </aside>

          {/* Main content */}
          <div className="flex-1 min-w-0">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-6 bg-white dark:bg-slate-800 rounded-xl border border-border px-4 py-3">
              <p className="text-sm text-muted-foreground">
                Showing <strong className="text-foreground">{mockProducts.length}</strong> products
              </p>
              <Suspense>
                <ProductSort />
              </Suspense>
            </div>

            {/* Product grid */}
            <Suspense fallback={<ProductGridSkeleton />}>
              <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4">
                {mockProducts.map((p) => <ProductCard key={p.id} product={p} />)}
              </div>
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
