"use client";

import Link from "next/link";
import { Eye } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatPrice, formatDiscount } from "@/lib/format";
import type { Product } from "@/types";
import StarRating from "./StarRating";
import ProductBadge from "./ProductBadge";
import WishlistButton from "./WishlistButton";
import AddToCartButton from "./AddToCartButton";

interface ProductCardProps {
  product: Product;
  className?: string;
}

export default function ProductCard({ product, className }: ProductCardProps) {
  const image = product.images.find((i) => i.isPrimary)?.url ?? product.images[0]?.url ?? "/images/placeholder.jpg";
  const discountPct = product.salePrice ? formatDiscount(product.basePrice, product.salePrice) : 0;
  const isOutOfStock = product.stock <= 0;

  const cartItem = {
    id: product.id,
    productId: product.id,
    name: product.name,
    slug: product.slug,
    image,
    price: product.salePrice ?? product.basePrice,
    quantity: 1,
    stock: product.stock,
  };

  const wishItem = {
    productId: product.id,
    name: product.name,
    slug: product.slug,
    image,
    price: product.basePrice,
    salePrice: product.salePrice,
  };

  return (
    <div className={cn("group relative bg-white dark:bg-slate-800 rounded-2xl border border-border shadow-sm overflow-hidden card-hover", className)}>
      {/* Image */}
      <Link href={`/products/${product.slug}`} className="block relative aspect-product overflow-hidden bg-slate-100 dark:bg-slate-700">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {isOutOfStock && <ProductBadge type="out" />}
          {!isOutOfStock && discountPct > 0 && <ProductBadge type="sale" discount={discountPct} />}
          {!isOutOfStock && product.isNew && !product.salePrice && <ProductBadge type="new" />}
          {product.isBestSeller && <ProductBadge type="best" />}
        </div>

        {/* Hover actions */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 translate-x-10 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
          <WishlistButton product={wishItem} />
          <Link href={`/products/${product.slug}`}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-white dark:bg-slate-800 shadow-md border border-border hover:scale-110 transition-transform">
            <Eye className="w-4 h-4 text-muted-foreground" />
          </Link>
        </div>

        {/* Quick add (desktop) */}
        <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <AddToCartButton item={cartItem} />
        </div>
      </Link>

      {/* Info */}
      <div className="p-4">
        <p className="text-xs text-muted-foreground mb-1">{product.category?.name}</p>
        <Link href={`/products/${product.slug}`}>
          <h3 className="font-semibold text-sm text-foreground line-clamp-2 leading-snug hover:text-brand-600 transition-colors">
            {product.name}
          </h3>
        </Link>

        {(product.reviewCount ?? 0) > 0 && (
          <div className="mt-2">
            <StarRating rating={product.averageRating ?? 0} count={product.reviewCount} />
          </div>
        )}

        <div className="flex items-center gap-2 mt-2">
          <span className={cn("font-bold text-base", product.salePrice ? "price-sale" : "price")}>
            {formatPrice(product.salePrice ?? product.basePrice)}
          </span>
          {product.salePrice && (
            <span className="price-original">{formatPrice(product.basePrice)}</span>
          )}
        </div>

        {/* Mobile add to cart */}
        <div className="mt-3 sm:hidden">
          <AddToCartButton item={cartItem} />
        </div>
      </div>
    </div>
  );
}
