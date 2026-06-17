export const APP_NAME = "dogikarepro";
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
export const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "8801700000000";

export const SHIPPING_COST = {
  INSIDE_DHAKA: 60,
  OUTSIDE_DHAKA: 120,
  FREE_THRESHOLD: 1500,
} as const;

export const PAGINATION = {
  PRODUCTS_PER_PAGE: 24,
  ORDERS_PER_PAGE: 20,
  REVIEWS_PER_PAGE: 10,
} as const;

export const ORDER_STATUS_LABELS: Record<string, string> = {
  PENDING:          "Pending",
  CONFIRMED:        "Confirmed",
  PROCESSING:       "Processing",
  SHIPPED:          "Shipped",
  OUT_FOR_DELIVERY: "Out for Delivery",
  DELIVERED:        "Delivered",
  CANCELLED:        "Cancelled",
  REFUNDED:         "Refunded",
  RETURNED:         "Returned",
};

export const ORDER_STATUS_COLORS: Record<string, string> = {
  PENDING:          "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400",
  CONFIRMED:        "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400",
  PROCESSING:       "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400",
  SHIPPED:          "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/20 dark:text-indigo-400",
  OUT_FOR_DELIVERY: "bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400",
  DELIVERED:        "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400",
  CANCELLED:        "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400",
  REFUNDED:         "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400",
  RETURNED:         "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400",
};

export const PAYMENT_METHOD_LABELS: Record<string, string> = {
  CASH_ON_DELIVERY: "Cash on Delivery",
  BKASH:            "bKash",
  NAGAD:            "Nagad",
  CARD:             "Credit / Debit Card",
  BANK_TRANSFER:    "Bank Transfer",
};

export const NAV_LINKS = [
  { label: "Products",   href: "/products" },
  { label: "Categories", href: "/categories" },
  { label: "Deals",      href: "/products?sort=sale" },
  { label: "About",      href: "/about" },
] as const;

export const SORT_OPTIONS = [
  { label: "Newest",        value: "newest" },
  { label: "Price: Low–High", value: "price_asc" },
  { label: "Price: High–Low", value: "price_desc" },
  { label: "Best Selling",  value: "best_selling" },
  { label: "Top Rated",     value: "top_rated" },
] as const;

export const ADMIN_NAV = [
  { label: "Dashboard",  href: "/admin",            icon: "LayoutDashboard" },
  { label: "Products",   href: "/admin/products",   icon: "Package" },
  { label: "Categories", href: "/admin/categories", icon: "Tag" },
  { label: "Orders",     href: "/admin/orders",     icon: "ShoppingBag" },
  { label: "Customers",  href: "/admin/customers",  icon: "Users" },
  { label: "Coupons",    href: "/admin/coupons",    icon: "Ticket" },
  { label: "Inventory",  href: "/admin/inventory",  icon: "Warehouse" },
  { label: "Reviews",    href: "/admin/reviews",    icon: "Star" },
  { label: "Banners",    href: "/admin/banners",    icon: "Image" },
  { label: "Settings",   href: "/admin/settings",   icon: "Settings" },
] as const;
