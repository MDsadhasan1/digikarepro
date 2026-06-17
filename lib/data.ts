export interface Product {
  id: string;
  name: string;
  slug: string;
  category: string;
  price: number;
  salePrice?: number;
  description: string;
  shortDesc: string;
  images: string[];
  stock: number;
  rating: number;
  reviews: number;
  isFeatured: boolean;
  tags: string[];
}

export const categories = ["All", "Electronics", "Fashion", "Home & Living", "Health & Beauty"];

export const products: Product[] = [
  {
    id: "p1",
    name: "Wireless Noise-Cancelling Headphones",
    slug: "wireless-noise-cancelling-headphones",
    category: "Electronics",
    price: 4999,
    salePrice: 3499,
    description: "Experience superior sound quality with active noise cancellation. These premium wireless headphones offer 30+ hours of playtime, comfortable over-ear cushions, and Bluetooth 5.0 connectivity. The built-in microphone delivers crystal-clear calls, and the foldable design makes them perfect for travel.",
    shortDesc: "ANC headphones with 30hr battery and Bluetooth 5.0.",
    images: ["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80"],
    stock: 50,
    rating: 4.5,
    reviews: 128,
    isFeatured: true,
    tags: ["wireless", "headphones", "audio"],
  },
  {
    id: "p2",
    name: "Smart Watch Pro 2024",
    slug: "smart-watch-pro-2024",
    category: "Electronics",
    price: 6999,
    salePrice: 5499,
    description: "Stay on top of your health and productivity with Smart Watch Pro. Features heart rate monitoring, GPS tracking, 100+ workout modes, sleep analysis, and a 7-day battery life. Water resistant up to 50 meters. Compatible with both Android and iOS.",
    shortDesc: "Smartwatch with health tracking, GPS, and 7-day battery.",
    images: ["https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80"],
    stock: 35,
    rating: 4.7,
    reviews: 89,
    isFeatured: true,
    tags: ["smartwatch", "fitness", "wearable"],
  },
  {
    id: "p3",
    name: "Premium Cotton T-Shirt",
    slug: "premium-cotton-t-shirt",
    category: "Fashion",
    price: 899,
    description: "Crafted from 100% premium Pima cotton, this classic T-shirt offers unmatched softness and durability. Designed with a relaxed fit, it is machine washable and retains its shape and color wash after wash. Available in multiple colors.",
    shortDesc: "100% Pima cotton, ultra-soft, machine washable.",
    images: ["https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80"],
    stock: 200,
    rating: 4.3,
    reviews: 245,
    isFeatured: true,
    tags: ["tshirt", "cotton", "casual"],
  },
  {
    id: "p4",
    name: "Classic Denim Jacket",
    slug: "classic-denim-jacket",
    category: "Fashion",
    price: 2499,
    salePrice: 1999,
    description: "A timeless wardrobe staple made from high-quality stretch denim. Features a button-front closure, chest flap pockets, and side hand pockets. The slightly relaxed fit makes it easy to layer. Suitable for all seasons.",
    shortDesc: "Timeless stretch denim jacket with a comfortable fit.",
    images: ["https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&q=80"],
    stock: 80,
    rating: 4.4,
    reviews: 67,
    isFeatured: false,
    tags: ["denim", "jacket", "fashion"],
  },
  {
    id: "p5",
    name: "Minimalist LED Desk Lamp",
    slug: "minimalist-led-desk-lamp",
    category: "Home & Living",
    price: 1499,
    salePrice: 1199,
    description: "Illuminate your workspace beautifully with this modern LED desk lamp. Adjustable brightness and color temperature let you find the perfect light for any task. Includes a USB charging port for your devices. Energy-efficient LEDs last 50,000 hours.",
    shortDesc: "LED desk lamp with adjustable brightness and USB charging port.",
    images: ["https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80"],
    stock: 60,
    rating: 4.6,
    reviews: 93,
    isFeatured: true,
    tags: ["lamp", "desk", "led", "home"],
  },
  {
    id: "p6",
    name: "Ceramic Coffee Mug Set (4 pcs)",
    slug: "ceramic-coffee-mug-set",
    category: "Home & Living",
    price: 799,
    description: "A beautiful set of 4 hand-crafted ceramic coffee mugs with a smooth glazed finish. Each mug holds 350ml and features a comfortable handle. Microwave and dishwasher safe. Makes a great gift for coffee and tea lovers.",
    shortDesc: "Set of 4 ceramic mugs — 350ml, dishwasher safe.",
    images: ["https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=600&q=80"],
    stock: 120,
    rating: 4.2,
    reviews: 156,
    isFeatured: false,
    tags: ["mug", "ceramic", "kitchen", "gift"],
  },
  {
    id: "p7",
    name: "Vitamin C Serum 30ml",
    slug: "vitamin-c-serum-30ml",
    category: "Health & Beauty",
    price: 1299,
    salePrice: 999,
    description: "Brighten and rejuvenate your skin with this powerful 20% Vitamin C serum enriched with hyaluronic acid and vitamin E. Regular use reduces dark spots, evens skin tone, minimizes fine lines, and boosts natural collagen production. Suitable for all skin types. Dermatologist tested.",
    shortDesc: "20% Vitamin C + hyaluronic acid serum for brighter skin.",
    images: ["https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&q=80"],
    stock: 90,
    rating: 4.8,
    reviews: 312,
    isFeatured: false,
    tags: ["serum", "skincare", "vitamin-c", "beauty"],
  },
  {
    id: "p8",
    name: "Wireless Earbuds Pro",
    slug: "wireless-earbuds-pro",
    category: "Electronics",
    price: 3499,
    salePrice: 2799,
    description: "True wireless earbuds with premium sound and active noise cancellation. Each earbud delivers 8 hours of playtime, with the charging case extending total usage to 32 hours. IPX5 water resistance keeps them safe during workouts. Instant pairing with any Bluetooth device.",
    shortDesc: "True wireless ANC earbuds, 8+24hr battery, IPX5 rated.",
    images: ["https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600&q=80"],
    stock: 45,
    rating: 4.6,
    reviews: 178,
    isFeatured: true,
    tags: ["earbuds", "wireless", "audio"],
  },
];
