"use client";

import { useState } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { cn } from "@/lib/utils";

const reviews = [
  { name: "Rakibul Hasan",    location: "Dhaka",       rating: 5, text: "Amazing quality! Ordered a laptop and it arrived next day. Packaging was perfect and product was exactly as described. Will definitely order again.", avatar: "R", verified: true },
  { name: "Fatema Begum",     location: "Chittagong",  rating: 5, text: "Best online store in Bangladesh! bKash payment was super easy and I got extra discount. Customer service replied on WhatsApp within minutes.", avatar: "F", verified: true },
  { name: "Arif Ahmed",       location: "Sylhet",      rating: 5, text: "I was skeptical about online shopping but dogikarepro changed my mind. Fast delivery, genuine products and easy returns. Highly recommended!", avatar: "A", verified: true },
  { name: "Nusrat Jahan",     location: "Rajshahi",    rating: 5, text: "Ordered 3 times already. Every time the experience is smooth. Great prices and the products are exactly what was shown in the photos.", avatar: "N", verified: true },
  { name: "Mehedi Hassan",    location: "Khulna",      rating: 5, text: "The admin actually messaged me after delivery to confirm I was happy. That personal touch is rare. Will be a regular customer!", avatar: "M", verified: true },
  { name: "Sumaiya Akter",    location: "Comilla",     rating: 5, text: "Product quality is outstanding. I ordered skincare products and they were 100% authentic. Fast shipping even to Comilla!", avatar: "S", verified: true },
];

function StarRow({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={cn("w-4 h-4", i < rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground/30")} />
      ))}
    </div>
  );
}

export default function Testimonials() {
  const [page, setPage] = useState(0);
  const perPage = 3;
  const pages = Math.ceil(reviews.length / perPage);
  const visible = reviews.slice(page * perPage, (page + 1) * perPage);

  return (
    <section className="section bg-slate-50 dark:bg-slate-900">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-brand-600 font-semibold text-sm uppercase tracking-wider mb-2">Customer Reviews</p>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 dark:text-white mb-4">
            What Our Customers Say
          </h2>
          <div className="flex items-center justify-center gap-2">
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />)}
            </div>
            <span className="font-bold text-foreground">4.9</span>
            <span className="text-muted-foreground text-sm">from 2,400+ reviews</span>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {visible.map((r) => (
            <div key={r.name} className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-border shadow-sm relative">
              <Quote className="absolute top-4 right-4 w-8 h-8 text-brand-100 dark:text-brand-900/50" />
              <StarRow rating={r.rating} />
              <p className="text-sm text-muted-foreground mt-3 leading-relaxed">"{r.text}"</p>
              <div className="flex items-center gap-3 mt-5">
                <div className="w-10 h-10 rounded-full bg-gradient-brand flex items-center justify-center text-white font-bold text-sm">
                  {r.avatar}
                </div>
                <div>
                  <p className="font-semibold text-sm text-foreground">{r.name}</p>
                  <p className="text-xs text-muted-foreground">{r.location} {r.verified && "· ✓ Verified"}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {pages > 1 && (
          <div className="flex items-center justify-center gap-3 mt-8">
            <button onClick={() => setPage((p) => Math.max(0, p - 1))} disabled={page === 0}
              className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors disabled:opacity-40">
              <ChevronLeft className="w-4 h-4" />
            </button>
            {Array.from({ length: pages }).map((_, i) => (
              <button key={i} onClick={() => setPage(i)}
                className={cn("w-2.5 h-2.5 rounded-full transition-all", i === page ? "bg-brand-600 w-6" : "bg-border hover:bg-muted-foreground")}
              />
            ))}
            <button onClick={() => setPage((p) => Math.min(pages - 1, p + 1))} disabled={page === pages - 1}
              className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors disabled:opacity-40">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
