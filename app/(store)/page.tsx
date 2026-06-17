import { Metadata } from "next";
import HeroBanner from "@/components/home/HeroBanner";
import CategoryGrid from "@/components/home/CategoryGrid";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import BestSellers from "@/components/home/BestSellers";
import PromoSection from "@/components/home/PromoSection";
import Testimonials from "@/components/home/Testimonials";
import NewsletterSection from "@/components/home/NewsletterSection";

export const metadata: Metadata = {
  title: "dogikarepro — Smart Care, Smart Shopping",
  description: "Bangladesh's premium e-commerce destination. Shop the best products with secure payment and fast delivery.",
};

export default function HomePage() {
  return (
    <main>
      <HeroBanner />
      <CategoryGrid />
      <FeaturedProducts />
      <PromoSection />
      <BestSellers />
      <Testimonials />
      <NewsletterSection />
    </main>
  );
}
