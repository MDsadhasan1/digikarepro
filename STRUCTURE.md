# dogikarepro – Project Folder Structure

```
dogikarepro/
├── app/                              # Next.js 15 App Router
│   ├── (store)/                      # Route group – customer-facing
│   │   ├── layout.tsx                # Store layout (Header + Footer)
│   │   ├── page.tsx                  # Homepage
│   │   ├── products/
│   │   │   ├── page.tsx              # Product listing / search
│   │   │   └── [slug]/
│   │   │       └── page.tsx          # Product detail
│   │   ├── categories/
│   │   │   └── [slug]/
│   │   │       └── page.tsx          # Category products
│   │   ├── cart/
│   │   │   └── page.tsx
│   │   ├── wishlist/
│   │   │   └── page.tsx
│   │   ├── checkout/
│   │   │   ├── page.tsx              # Checkout form
│   │   │   └── success/
│   │   │       └── page.tsx          # Order confirmation
│   │   ├── orders/
│   │   │   ├── page.tsx              # Order history
│   │   │   └── [id]/
│   │   │       └── page.tsx          # Order detail / tracking
│   │   ├── account/
│   │   │   ├── page.tsx              # Account overview
│   │   │   ├── profile/page.tsx
│   │   │   └── addresses/page.tsx
│   │   └── search/
│   │       └── page.tsx
│   │
│   ├── (auth)/                       # Auth route group
│   │   ├── login/page.tsx
│   │   ├── register/page.tsx
│   │   └── forgot-password/page.tsx
│   │
│   ├── admin/                        # Admin dashboard
│   │   ├── layout.tsx                # Admin sidebar layout
│   │   ├── page.tsx                  # Analytics dashboard
│   │   ├── products/
│   │   │   ├── page.tsx              # Product list
│   │   │   ├── new/page.tsx          # Create product
│   │   │   └── [id]/
│   │   │       └── edit/page.tsx
│   │   ├── categories/
│   │   │   └── page.tsx
│   │   ├── orders/
│   │   │   ├── page.tsx
│   │   │   └── [id]/page.tsx
│   │   ├── customers/
│   │   │   └── page.tsx
│   │   ├── coupons/
│   │   │   └── page.tsx
│   │   ├── inventory/
│   │   │   └── page.tsx
│   │   ├── reviews/
│   │   │   └── page.tsx
│   │   ├── banners/
│   │   │   └── page.tsx
│   │   └── settings/
│   │       └── page.tsx
│   │
│   ├── api/                          # API routes
│   │   ├── auth/
│   │   │   └── [...nextauth]/route.ts
│   │   ├── products/
│   │   │   ├── route.ts              # GET list / POST create
│   │   │   └── [id]/route.ts         # GET / PUT / DELETE
│   │   ├── categories/route.ts
│   │   ├── cart/route.ts
│   │   ├── wishlist/route.ts
│   │   ├── orders/
│   │   │   ├── route.ts
│   │   │   └── [id]/route.ts
│   │   ├── reviews/route.ts
│   │   ├── coupons/
│   │   │   └── validate/route.ts
│   │   ├── upload/route.ts           # Image upload
│   │   ├── newsletter/route.ts
│   │   └── admin/
│   │       ├── analytics/route.ts
│   │       └── reports/route.ts
│   │
│   ├── error.tsx
│   ├── not-found.tsx
│   ├── loading.tsx
│   ├── layout.tsx                    # Root layout
│   └── globals.css
│
├── components/                       # Shared UI components
│   ├── ui/                           # shadcn/ui components (auto-generated)
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── badge.tsx
│   │   ├── dialog.tsx
│   │   ├── sheet.tsx
│   │   ├── skeleton.tsx
│   │   ├── toast.tsx
│   │   └── ...
│   │
│   ├── layout/
│   │   ├── Header.tsx                # Main navbar with cart/wishlist
│   │   ├── Footer.tsx
│   │   ├── MobileNav.tsx
│   │   └── AdminSidebar.tsx
│   │
│   ├── home/
│   │   ├── HeroBanner.tsx
│   │   ├── FeaturedProducts.tsx
│   │   ├── CategoryGrid.tsx
│   │   ├── BestSellers.tsx
│   │   ├── Testimonials.tsx
│   │   ├── NewsletterSection.tsx
│   │   ├── PromoSection.tsx
│   │   └── BrandStory.tsx
│   │
│   ├── product/
│   │   ├── ProductCard.tsx           # Grid card with hover actions
│   │   ├── ProductCardSkeleton.tsx
│   │   ├── ProductGrid.tsx
│   │   ├── ProductFilters.tsx        # Sidebar filters
│   │   ├── ProductSort.tsx
│   │   ├── ProductSearch.tsx
│   │   ├── ProductImageGallery.tsx   # Zoom + carousel
│   │   ├── ProductVariantSelector.tsx
│   │   ├── ProductQuantity.tsx
│   │   ├── ProductBadge.tsx
│   │   ├── AddToCartButton.tsx
│   │   ├── WishlistButton.tsx
│   │   ├── ShareButton.tsx
│   │   └── RelatedProducts.tsx
│   │
│   ├── cart/
│   │   ├── CartDrawer.tsx            # Slide-over cart
│   │   ├── CartItem.tsx
│   │   ├── CartSummary.tsx
│   │   └── CartEmpty.tsx
│   │
│   ├── checkout/
│   │   ├── CheckoutForm.tsx
│   │   ├── ShippingForm.tsx
│   │   ├── PaymentSelector.tsx       # COD / bKash / Nagad
│   │   ├── OrderSummary.tsx
│   │   └── CouponInput.tsx
│   │
│   ├── review/
│   │   ├── ReviewCard.tsx
│   │   ├── ReviewList.tsx
│   │   ├── ReviewForm.tsx
│   │   └── StarRating.tsx
│   │
│   ├── admin/
│   │   ├── StatsCard.tsx
│   │   ├── SalesChart.tsx
│   │   ├── RecentOrders.tsx
│   │   ├── TopProducts.tsx
│   │   ├── DataTable.tsx             # Generic sortable table
│   │   ├── ImageUpload.tsx
│   │   ├── OrderStatusBadge.tsx
│   │   └── QuickActions.tsx
│   │
│   └── common/
│       ├── Logo.tsx                  # SVG logo component
│       ├── ThemeToggle.tsx
│       ├── WhatsAppButton.tsx        # Floating FAB
│       ├── MessengerButton.tsx       # Floating FAB
│       ├── Breadcrumb.tsx
│       ├── EmptyState.tsx
│       ├── LoadingSpinner.tsx
│       ├── SectionHeader.tsx
│       ├── InfiniteScrollTrigger.tsx
│       ├── ImageWithFallback.tsx
│       ├── ConfirmDialog.tsx
│       └── PriceDisplay.tsx
│
├── lib/                              # Utilities & config
│   ├── prisma.ts                     # Prisma client singleton
│   ├── auth.ts                       # NextAuth config
│   ├── validations/
│   │   ├── product.ts                # Zod schemas
│   │   ├── order.ts
│   │   ├── user.ts
│   │   ├── coupon.ts
│   │   └── review.ts
│   ├── utils.ts                      # cn(), formatPrice(), etc.
│   ├── constants.ts                  # App-wide constants
│   ├── format.ts                     # Currency, date formatters
│   └── upload.ts                     # Image upload helpers
│
├── hooks/                            # Custom React hooks
│   ├── useCart.ts
│   ├── useWishlist.ts
│   ├── useProducts.ts
│   ├── useInfiniteProducts.ts
│   ├── useMediaQuery.ts
│   └── useDebounce.ts
│
├── store/                            # Zustand stores
│   ├── cartStore.ts
│   ├── wishlistStore.ts
│   └── uiStore.ts                    # sidebar open, theme, etc.
│
├── types/                            # TypeScript type definitions
│   ├── index.ts
│   ├── product.ts
│   ├── order.ts
│   ├── user.ts
│   └── api.ts
│
├── actions/                          # Next.js Server Actions
│   ├── product.ts
│   ├── cart.ts
│   ├── order.ts
│   ├── coupon.ts
│   ├── review.ts
│   └── newsletter.ts
│
├── prisma/
│   ├── schema.prisma                 # ✅ Done (Phase 1)
│   ├── migrations/
│   └── seed.ts                       # Seed data
│
├── public/
│   ├── logo.svg                      # ✅ Light logo
│   ├── logo-dark.svg                 # ✅ Dark logo
│   ├── logo-icon.svg                 # ✅ Icon only (favicon)
│   ├── favicon.ico
│   ├── og-image.png                  # Open Graph image
│   └── images/
│       └── placeholder.jpg
│
├── styles/
│   └── globals.css                   # Tailwind directives + CSS vars
│
├── .env.local                        # Environment variables
├── .env.example
├── next.config.ts
├── tailwind.config.ts                # ✅ Done (Phase 1)
├── tsconfig.json
├── package.json
├── components.json                   # shadcn/ui config
└── middleware.ts                     # Auth + admin protection
```
