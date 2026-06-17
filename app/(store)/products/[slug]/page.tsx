"use client";

import { useState } from "react";
import Link from "next/link";
import { ShoppingCart, Heart, Share2, Shield, Truck, RefreshCcw, Star, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatPrice, formatDiscount } from "@/lib/format";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";
import { toast } from "sonner";
import ProductImageGallery from "@/components/product/ProductImageGallery";
import ProductQuantity from "@/components/product/ProductQuantity";
import StarRating from "@/components/product/StarRating";
import ProductCard from "@/components/product/ProductCard";
import type { Product } from "@/types";

// Demo product — replace with DB fetch by slug
const demoProduct: Product = {
  id: "p1",
  name: "Wireless Noise Cancelling Headphones Pro X",
  slug: "wireless-headphones-pro-x",
  description: `Experience premium sound like never before with the Pro X headphones.

Featuring industry-leading Active Noise Cancellation technology that blocks up to 97% of ambient noise, these headphones deliver an immersive listening experience.

**Key Highlights:**
- 30-hour battery life with quick charge (15min = 3hrs)
- Premium 40mm drivers with Hi-Res Audio certification
- Multipoint connection: connect to 2 devices simultaneously
- Comfortable over-ear design with memory foam cushions
- Built-in voice assistant support (Google, Alexa, Siri)
- Foldable design for easy travel`,
  shortDescription: "Premium ANC headphones with 30hr battery, Hi-Res Audio, and multipoint Bluetooth.",
  categoryId: "c1",
  brandId: "b1",
  basePrice: 3500,
  salePrice: 2800,
  sku: "DGK-HP-001",
  stock: 25,
  isFeatured: true,
  isBestSeller: true,
  isNew: false,
  isActive: true,
  isDigital: false,
  tags: ["headphones", "wireless", "anc", "bluetooth"],
  images: [
    { id: "i1", url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80", alt: "Headphones front", isPrimary: true, sortOrder: 0 },
    { id: "i2", url: "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&q=80", alt: "Headphones side", isPrimary: false, sortOrder: 1 },
    { id: "i3", url: "https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?w=800&q=80", alt: "Headphones with case", isPrimary: false, sortOrder: 2 },
  ],
  variants: [
    { id: "v1", name: "Black", sku: "HP-BLK", stock: 15, isActive: true, options: [{ name: "Color", value: "Matte Black" }] },
    { id: "v2", name: "White", sku: "HP-WHT", stock: 8,  isActive: true, options: [{ name: "Color", value: "Pearl White" }] },
    { id: "v3", name: "Blue",  sku: "HP-BLU", stock: 2,  isActive: true, options: [{ name: "Color", value: "Midnight Blue" }] },
  ],
  attributes: [
    { id: "a1", name: "Connectivity", value: "Bluetooth 5.3", sortOrder: 0, productId: "p1" },
    { id: "a2", name: "Battery",      value: "30 hours",       sortOrder: 1, productId: "p1" },
    { id: "a3", name: "Driver Size",  value: "40mm",           sortOrder: 2, productId: "p1" },
    { id: "a4", name: "Weight",       value: "280g",           sortOrder: 3, productId: "p1" },
    { id: "a5", name: "Warranty",     value: "1 Year",         sortOrder: 4, productId: "p1" },
  ],
  category: { id: "c1", name: "Audio", slug: "audio" },
  brand: { id: "b1", name: "SoundMax" },
  reviewCount: 124,
  averageRating: 4.8,
  soldCount: 456,
  createdAt: new Date(),
  updatedAt: new Date(),
};

const relatedProducts: Product[] = Array.from({ length: 4 }, (_, i) => ({
  ...demoProduct,
  id: `rel${i}`,
  name: ["Wireless Earbuds Pro", "Over-Ear Studio Headphones", "Gaming Headset RGB", "Sport Bluetooth Earphones"][i],
  slug: [`earbuds-pro`, `studio-headphones`, `gaming-headset`, `sport-earphones`][i],
  basePrice: [1800, 4500, 3200, 1500][i],
  salePrice: [1500, undefined, 2800, 1200][i],
  isBestSeller: [false, true, false, false][i],
  isNew: [true, false, false, true][i],
}));

export default function ProductDetailPage() {
  const [qty, setQty] = useState(1);
  const [activeVariant, setActiveVariant] = useState(demoProduct.variants[0]?.id ?? "");
  const [tab, setTab] = useState<"desc" | "specs" | "reviews">("desc");

  const addItem = useCartStore((s) => s.addItem);
  const { toggle, isWishlisted } = useWishlistStore();
  const liked = isWishlisted(demoProduct.id);

  const variant = demoProduct.variants.find((v) => v.id === activeVariant);
  const price = demoProduct.salePrice ?? demoProduct.basePrice;
  const discount = demoProduct.salePrice ? formatDiscount(demoProduct.basePrice, demoProduct.salePrice) : 0;
  const stock = variant?.stock ?? demoProduct.stock;

  const handleAddToCart = () => {
    addItem({
      id: demoProduct.id,
      productId: demoProduct.id,
      variantId: activeVariant || undefined,
      name: demoProduct.name,
      slug: demoProduct.slug,
      image: demoProduct.images[0]?.url ?? "",
      price,
      quantity: qty,
      stock,
      variantName: variant?.name,
    });
  };

  const handleShare = () => {
    navigator.share?.({ title: demoProduct.name, url: window.location.href });
    toast.success("Link copied!");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="border-b border-border bg-slate-50 dark:bg-slate-900">
        <div className="container py-3">
          <nav className="flex items-center gap-1 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/products" className="hover:text-foreground">Products</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href={`/categories/${demoProduct.category?.slug}`} className="hover:text-foreground">{demoProduct.category?.name}</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-foreground truncate max-w-[200px]">{demoProduct.name}</span>
          </nav>
        </div>
      </div>

      <div className="container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-16">
          {/* ── Gallery ── */}
          <div>
            <ProductImageGallery images={demoProduct.images} />
          </div>

          {/* ── Info ── */}
          <div className="space-y-5">
            {/* Badges */}
            <div className="flex flex-wrap gap-2">
              {demoProduct.isBestSeller && <span className="badge-pill bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400">Best Seller</span>}
              {demoProduct.isNew && <span className="badge-pill bg-brand-100 text-brand-700 dark:bg-brand-900/30 dark:text-brand-400">New Arrival</span>}
              {demoProduct.brand && <span className="badge-pill bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400">{demoProduct.brand.name}</span>}
            </div>

            <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground leading-tight">
              {demoProduct.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-3">
              <StarRating rating={demoProduct.averageRating ?? 0} count={demoProduct.reviewCount} size="md" />
              <span className="text-sm text-muted-foreground">·</span>
              <span className="text-sm text-muted-foreground">{demoProduct.soldCount} sold</span>
              {demoProduct.sku && <span className="text-sm text-muted-foreground">· SKU: {demoProduct.sku}</span>}
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold text-accent">{formatPrice(price)}</span>
              {demoProduct.salePrice && (
                <>
                  <span className="text-xl text-muted-foreground line-through">{formatPrice(demoProduct.basePrice)}</span>
                  <span className="badge-pill bg-accent text-white">{discount}% OFF</span>
                </>
              )}
            </div>

            {/* Short desc */}
            {demoProduct.shortDescription && (
              <p className="text-muted-foreground text-sm leading-relaxed">{demoProduct.shortDescription}</p>
            )}

            {/* Variants */}
            {demoProduct.variants.length > 0 && (
              <div>
                <p className="text-sm font-semibold text-foreground mb-2.5">
                  Color: <span className="text-muted-foreground font-normal">{variant?.name}</span>
                </p>
                <div className="flex flex-wrap gap-2">
                  {demoProduct.variants.map((v) => (
                    <button key={v.id} onClick={() => setActiveVariant(v.id)} disabled={v.stock <= 0}
                      className={cn(
                        "px-4 py-2 rounded-lg text-sm border-2 transition-all font-medium",
                        activeVariant === v.id ? "border-brand-600 bg-brand-50 dark:bg-brand-900/20 text-brand-700" : "border-border hover:border-brand-400 text-foreground",
                        v.stock <= 0 && "opacity-40 line-through cursor-not-allowed"
                      )}>
                      {v.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Stock */}
            <div className={cn("flex items-center gap-2 text-sm font-medium", stock > 0 ? "text-green-600" : "text-red-500")}>
              <div className={cn("w-2 h-2 rounded-full", stock > 0 ? "bg-green-500" : "bg-red-500")} />
              {stock > 0 ? `In Stock (${stock} available)` : "Out of Stock"}
            </div>

            {/* Qty + Add */}
            <div className="flex flex-wrap items-center gap-3">
              <ProductQuantity value={qty} onChange={setQty} max={stock} />
              <button onClick={handleAddToCart} disabled={stock <= 0}
                className="flex-1 min-w-[180px] flex items-center justify-center gap-2 py-3.5 rounded-xl
                           bg-brand-600 hover:bg-brand-700 text-white font-semibold transition-all
                           hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed shadow-brand-sm">
                <ShoppingCart className="w-5 h-5" />
                {stock <= 0 ? "Out of Stock" : "Add to Cart"}
              </button>
              <button onClick={() => toggle({ productId: demoProduct.id, name: demoProduct.name, slug: demoProduct.slug, image: demoProduct.images[0]?.url ?? "", price: demoProduct.basePrice, salePrice: demoProduct.salePrice })}
                className={cn("w-12 h-12 flex items-center justify-center rounded-xl border-2 transition-all hover:scale-110", liked ? "border-red-300 bg-red-50 dark:bg-red-900/10" : "border-border hover:border-red-300")}>
                <Heart className={cn("w-5 h-5", liked ? "fill-red-500 text-red-500" : "text-muted-foreground")} />
              </button>
              <button onClick={handleShare} className="w-12 h-12 flex items-center justify-center rounded-xl border-2 border-border hover:border-brand-400 transition-all">
                <Share2 className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              {[
                { icon: Truck,       label: "Fast Delivery",  sub: "48hr in Dhaka" },
                { icon: Shield,      label: "Secure Payment", sub: "bKash / Nagad" },
                { icon: RefreshCcw,  label: "Easy Returns",   sub: "7 days" },
              ].map(({ icon: Icon, label, sub }) => (
                <div key={label} className="flex flex-col items-center text-center p-3 rounded-xl bg-slate-50 dark:bg-slate-800">
                  <Icon className="w-5 h-5 text-brand-600 mb-1" />
                  <p className="text-xs font-semibold text-foreground">{label}</p>
                  <p className="text-[10px] text-muted-foreground">{sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Tabs ── */}
        <div className="mt-16">
          <div className="flex gap-1 border-b border-border mb-8">
            {(["desc", "specs", "reviews"] as const).map((t) => (
              <button key={t} onClick={() => setTab(t)}
                className={cn("px-5 py-3 text-sm font-medium rounded-t-lg -mb-px border-b-2 transition-colors",
                  tab === t ? "border-brand-600 text-brand-600" : "border-transparent text-muted-foreground hover:text-foreground")}>
                {t === "desc" ? "Description" : t === "specs" ? "Specifications" : `Reviews (${demoProduct.reviewCount})`}
              </button>
            ))}
          </div>

          {tab === "desc" && (
            <div className="prose prose-slate dark:prose-invert max-w-none text-sm leading-relaxed">
              {demoProduct.description.split("\n").map((line, i) => (
                <p key={i} className={line.startsWith("**") ? "font-semibold" : ""}>{line.replace(/\*\*/g, "")}</p>
              ))}
            </div>
          )}

          {tab === "specs" && (
            <div className="max-w-lg">
              <div className="rounded-2xl border border-border overflow-hidden">
                {demoProduct.attributes.map((attr, i) => (
                  <div key={attr.id} className={cn("flex", i % 2 === 0 ? "bg-slate-50 dark:bg-slate-800" : "bg-white dark:bg-slate-900")}>
                    <div className="w-40 px-4 py-3 text-sm font-medium text-muted-foreground border-r border-border">{attr.name}</div>
                    <div className="flex-1 px-4 py-3 text-sm text-foreground">{attr.value}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === "reviews" && (
            <div className="text-center py-12 text-muted-foreground">
              <Star className="w-10 h-10 mx-auto mb-3 opacity-30" />
              <p className="font-medium">Reviews will load from database</p>
              <p className="text-sm mt-1">Connect Supabase to see real reviews</p>
            </div>
          )}
        </div>

        {/* Related products */}
        <div className="mt-16">
          <h2 className="text-2xl font-display font-bold text-foreground mb-6">Related Products</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {relatedProducts.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </div>
    </div>
  );
}
