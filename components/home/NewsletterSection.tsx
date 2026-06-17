"use client";

import { useState } from "react";
import { Mail, ArrowRight, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setSubmitted(true);
        setEmail("");
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } catch {
      toast.error("Connection error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="section bg-gradient-brand">
      <div className="container">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-6">
            <Mail className="w-7 h-7 text-white" />
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
            Get Exclusive Deals
          </h2>
          <p className="text-white/75 mb-8 text-lg">
            Subscribe to our newsletter and be first to know about new products, flash sales, and exclusive offers.
          </p>

          {submitted ? (
            <div className="flex items-center justify-center gap-3 py-4 px-6 rounded-2xl bg-white/20 text-white">
              <CheckCircle2 className="w-6 h-6 text-green-300" />
              <span className="font-semibold">You&apos;re subscribed! Welcome to the family 🎉</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex gap-3 max-w-md mx-auto">
              <div className="flex-1 relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-white/15 border border-white/25
                             text-white placeholder:text-white/50 focus:outline-none focus:ring-2
                             focus:ring-white/40 backdrop-blur-sm text-sm"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3.5 bg-accent hover:bg-accent/90 text-white font-semibold
                           rounded-xl transition-all duration-200 hover:scale-105 active:scale-95
                           disabled:opacity-70 flex items-center gap-2 shrink-0"
              >
                {loading ? "..." : <><span className="hidden sm:inline">Subscribe</span><ArrowRight className="w-4 h-4" /></>}
              </button>
            </form>
          )}

          <p className="text-white/50 text-xs mt-4">
            No spam, ever. Unsubscribe anytime. We respect your privacy.
          </p>
        </div>
      </div>
    </section>
  );
}
