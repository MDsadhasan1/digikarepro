"use client";

import Link from "next/link";
import { ShoppingCart, Star, Package, ArrowLeft, CheckCircle } from "lucide-react";
import { Product } from "@/lib/data";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import { useState } from "react";

export default function ProductClient({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const discount = product.salePrice
    ? Math.round((1 - product.salePrice / product.price) * 100)
    : 0;

  const handleAdd = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <Link
        href="/products"
        className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-blue-600 mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Products
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Image */}
        <div className="aspect-square rounded-2xl overflow-hidden border border-gray-200 bg-gray-50">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Info */}
        <div className="flex flex-col">
          <p className="text-sm font-medium text-blue-600 mb-2">{product.category}</p>
          <h1 className="text-2xl font-bold text-gray-900 mb-3 leading-snug">{product.name}</h1>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-4">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i <= Math.round(product.rating)
                      ? "fill-amber-400 text-amber-400"
                      : "text-gray-200 fill-gray-200"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-500">
              {product.rating} · {product.reviews} reviews
            </span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-3 mb-5">
            <span className="text-3xl font-bold text-gray-900">
              {formatPrice(product.salePrice ?? product.price)}
            </span>
            {product.salePrice && (
              <>
                <span className="text-lg text-gray-400 line-through">
                  {formatPrice(product.price)}
                </span>
                <span className="bg-red-100 text-red-600 text-sm px-2 py-0.5 rounded-full font-semibold">
                  -{discount}%
                </span>
              </>
            )}
          </div>

          <p className="text-gray-600 text-sm leading-relaxed mb-5">{product.shortDesc}</p>

          {/* Stock */}
          <div className="flex items-center gap-2 mb-6 text-sm">
            <Package className="w-4 h-4 text-gray-400" />
            {product.stock > 0 ? (
              <span className="text-green-600 font-medium">
                In Stock ({product.stock} available)
              </span>
            ) : (
              <span className="text-red-500 font-medium">Out of Stock</span>
            )}
          </div>

          {/* Add to Cart */}
          <button
            onClick={handleAdd}
            disabled={product.stock === 0}
            className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-semibold text-base transition-colors disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed"
            style={{
              backgroundColor: added ? "#16a34a" : product.stock === 0 ? undefined : "#2563eb",
              color: product.stock === 0 ? undefined : "white",
            }}
          >
            {added ? (
              <>
                <CheckCircle className="w-5 h-5" /> Added to Cart!
              </>
            ) : (
              <>
                <ShoppingCart className="w-5 h-5" />
                {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
              </>
            )}
          </button>

          <Link
            href="/cart"
            className="mt-3 block text-center text-sm text-blue-600 hover:underline"
          >
            View Cart →
          </Link>
        </div>
      </div>

      {/* Description */}
      <div className="mt-10 border-t border-gray-200 pt-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Product Description</h2>
        <p className="text-gray-600 leading-relaxed">{product.description}</p>

        {product.tags.length > 0 && (
          <div className="mt-4 flex gap-2 flex-wrap">
            {product.tags.map((tag) => (
              <span
                key={tag}
                className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
