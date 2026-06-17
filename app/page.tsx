import Link from "next/link";
import { ArrowRight, Truck, ShieldCheck, Headphones, RotateCcw } from "lucide-react";
import { products } from "@/lib/data";
import ProductCard from "@/components/ProductCard";

const features = [
  { icon: Truck, title: "Free Delivery", desc: "Orders above ৳1000" },
  { icon: ShieldCheck, title: "Secure Payment", desc: "100% safe checkout" },
  { icon: Headphones, title: "24/7 Support", desc: "Ready to help" },
  { icon: RotateCcw, title: "Easy Returns", desc: "7-day return policy" },
];

export default function HomePage() {
  const featured = products.filter((p) => p.isFeatured);

  return (
    <div>
      {/* Hero */}
      <section
        className="text-white py-24 px-4"
        style={{ background: "linear-gradient(135deg, #1e3a8a 0%, #2563eb 60%, #0891b2 100%)" }}
      >
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
            DigiKare Pro
          </h1>
          <p className="text-lg md:text-2xl mb-2 opacity-90">সেরা পণ্য, সেরা দামে</p>
          <p className="text-sm opacity-75 mb-10">
            Electronics · Fashion · Home &amp; Living · Health &amp; Beauty
          </p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 bg-white text-blue-700 px-8 py-3.5 rounded-full font-bold text-base hover:bg-gray-100 transition-colors shadow-lg"
          >
            সব পণ্য দেখুন <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {features.map((f) => (
            <div key={f.title} className="bg-white rounded-xl border border-gray-200 p-5 flex flex-col items-center text-center">
              <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center mb-3">
                <f.icon className="w-5 h-5 text-blue-600" />
              </div>
              <p className="font-semibold text-sm text-gray-800">{f.title}</p>
              <p className="text-xs text-gray-500 mt-1">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-6xl mx-auto px-4 pb-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Featured Products</h2>
          <Link
            href="/products"
            className="text-blue-600 text-sm font-medium hover:underline flex items-center gap-1"
          >
            View all <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-blue-600 text-white py-14 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            আজই কেনাকাটা শুরু করুন
          </h2>
          <p className="opacity-85 mb-6 text-sm">
            নতুন কালেকশন প্রতিদিন আপডেট হচ্ছে। সীমিত সময়ের অফার মিস করবেন না।
          </p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 bg-white text-blue-700 px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition-colors"
          >
            Shop Now <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
