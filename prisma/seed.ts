import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Admin user
  const hashedPassword = await bcrypt.hash("Admin@1234", 12);
  const admin = await prisma.user.upsert({
    where:  { email: "admin@dogikarepro.com" },
    update: {},
    create: {
      name:     "Admin User",
      email:    "admin@dogikarepro.com",
      password: hashedPassword,
      role:     "ADMIN",
      emailVerified: new Date(),
    },
  });
  console.log("✅ Admin user:", admin.email);

  // Categories
  const electronics = await prisma.category.upsert({
    where:  { slug: "electronics" },
    update: {},
    create: { name: "Electronics", slug: "electronics", description: "Gadgets and devices", sortOrder: 1 },
  });
  const fashion = await prisma.category.upsert({
    where:  { slug: "fashion" },
    update: {},
    create: { name: "Fashion", slug: "fashion", description: "Clothing and accessories", sortOrder: 2 },
  });
  const homeAndLiving = await prisma.category.upsert({
    where:  { slug: "home-living" },
    update: {},
    create: { name: "Home & Living", slug: "home-living", description: "Furniture and home decor", sortOrder: 3 },
  });
  const health = await prisma.category.upsert({
    where:  { slug: "health-beauty" },
    update: {},
    create: { name: "Health & Beauty", slug: "health-beauty", description: "Wellness and personal care", sortOrder: 4 },
  });
  console.log("✅ Categories created");

  // Products
  const products = [
    {
      name:         "Wireless Noise-Cancelling Headphones",
      slug:         "wireless-noise-cancelling-headphones",
      shortDesc:    "Premium sound quality with 30hr battery life",
      description:  "Experience crystal-clear audio with our flagship noise-cancelling headphones. Features 30-hour battery, Bluetooth 5.0, and premium drivers.",
      categoryId:   electronics.id,
      price:        4999,
      salePrice:    3999,
      stock:        50,
      sku:          "ELEC-HP-001",
      isFeatured:   true,
      isBestSeller: true,
      soldCount:    124,
      rating:       4.8,
      reviewCount:  48,
    },
    {
      name:         "Smart Watch Pro 2024",
      slug:         "smart-watch-pro-2024",
      shortDesc:    "Fitness tracking, GPS, and 7-day battery",
      description:  "Track your health, monitor workouts, and stay connected with this premium smartwatch. Waterproof, GPS enabled, and 7-day battery life.",
      categoryId:   electronics.id,
      price:        6999,
      salePrice:    5499,
      stock:        35,
      sku:          "ELEC-SW-001",
      isFeatured:   true,
      isBestSeller: false,
      soldCount:    89,
      rating:       4.6,
      reviewCount:  32,
    },
    {
      name:         "Premium Cotton T-Shirt",
      slug:         "premium-cotton-t-shirt",
      shortDesc:    "100% organic cotton, ultra-soft, breathable",
      description:  "Made from 100% GOTS-certified organic cotton. Preshrunk, tagless, and available in 8 colors.",
      categoryId:   fashion.id,
      price:        899,
      salePrice:    null,
      stock:        200,
      sku:          "FASH-TS-001",
      isFeatured:   true,
      isBestSeller: true,
      soldCount:    412,
      rating:       4.5,
      reviewCount:  87,
    },
    {
      name:         "Classic Denim Jacket",
      slug:         "classic-denim-jacket",
      shortDesc:    "Timeless style with modern fit",
      description:  "A wardrobe essential. This classic denim jacket features a slim fit, chest pockets, and button-up closure.",
      categoryId:   fashion.id,
      price:        2499,
      salePrice:    1999,
      stock:        80,
      sku:          "FASH-DJ-001",
      isFeatured:   false,
      isBestSeller: true,
      soldCount:    156,
      rating:       4.7,
      reviewCount:  44,
    },
    {
      name:         "Minimalist Desk Lamp",
      slug:         "minimalist-desk-lamp",
      shortDesc:    "LED, touch-dimming, USB-C charging port",
      description:  "Illuminate your workspace with this sleek desk lamp. Features 3 color temperatures, touch dimming, and a built-in USB-C port.",
      categoryId:   homeAndLiving.id,
      price:        1499,
      salePrice:    1199,
      stock:        60,
      sku:          "HOME-DL-001",
      isFeatured:   true,
      isBestSeller: false,
      soldCount:    203,
      rating:       4.4,
      reviewCount:  61,
    },
    {
      name:         "Ceramic Coffee Mug Set",
      slug:         "ceramic-coffee-mug-set",
      shortDesc:    "Set of 4, microwave and dishwasher safe",
      description:  "Handcrafted ceramic mugs in a beautiful matte finish. Each set includes 4 mugs in assorted earthy tones.",
      categoryId:   homeAndLiving.id,
      price:        799,
      salePrice:    null,
      stock:        120,
      sku:          "HOME-MG-001",
      isFeatured:   false,
      isBestSeller: true,
      soldCount:    321,
      rating:       4.9,
      reviewCount:  112,
    },
    {
      name:         "Vitamin C Serum 30ml",
      slug:         "vitamin-c-serum-30ml",
      shortDesc:    "Brightening formula with 20% Vitamin C",
      description:  "Clinically proven to brighten skin and reduce dark spots. Contains 20% Vitamin C, hyaluronic acid, and Vitamin E.",
      categoryId:   health.id,
      price:        1299,
      salePrice:    999,
      stock:        90,
      sku:          "HLTH-VS-001",
      isFeatured:   true,
      isBestSeller: true,
      soldCount:    567,
      rating:       4.7,
      reviewCount:  189,
    },
    {
      name:         "Wireless Earbuds Pro",
      slug:         "wireless-earbuds-pro",
      shortDesc:    "Active noise cancelling, 24hr total battery",
      description:  "True wireless earbuds with hybrid active noise cancellation. 8hr playback + 16hr case. IPX5 waterproof.",
      categoryId:   electronics.id,
      price:        3499,
      salePrice:    2799,
      stock:        75,
      sku:          "ELEC-EB-001",
      isFeatured:   true,
      isBestSeller: false,
      soldCount:    278,
      rating:       4.6,
      reviewCount:  95,
    },
  ];

  for (const p of products) {
    await prisma.product.upsert({
      where:  { slug: p.slug },
      update: {},
      create: {
        ...p,
        images: {
          create: [
            { url: `https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800`, isPrimary: true, sortOrder: 0 },
          ],
        },
      },
    });
  }
  console.log("✅ Products seeded:", products.length);

  // Coupons
  await prisma.coupon.upsert({
    where:  { code: "WELCOME10" },
    update: {},
    create: {
      code:          "WELCOME10",
      description:   "10% off for new customers",
      discountType:  "PERCENTAGE",
      discountValue: 10,
      maximumDiscount: 200,
      minimumAmount: 500,
      isActive:      true,
    },
  });

  await prisma.coupon.upsert({
    where:  { code: "FLAT200" },
    update: {},
    create: {
      code:          "FLAT200",
      description:   "৳200 off on orders above ৳1500",
      discountType:  "FIXED_AMOUNT",
      discountValue: 200,
      minimumAmount: 1500,
      isActive:      true,
    },
  });

  await prisma.coupon.upsert({
    where:  { code: "FREESHIP" },
    update: {},
    create: {
      code:         "FREESHIP",
      description:  "Free shipping on any order",
      discountType: "FREE_SHIPPING",
      discountValue: 0,
      isActive:     true,
    },
  });
  console.log("✅ Coupons seeded");

  // Banner
  await prisma.banner.upsert({
    where:  { id: "banner-1" },
    update: {},
    create: {
      id:        "banner-1",
      title:     "Summer Sale Up to 50% Off",
      subtitle:  "Shop the best deals on electronics, fashion, and more",
      image:     "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1600",
      cta:       "Shop Now",
      ctaLink:   "/products",
      isActive:  true,
      sortOrder: 0,
    },
  });
  console.log("✅ Banners seeded");

  console.log("🎉 Seeding complete!");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
