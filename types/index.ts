// ─── Product ──────────────────────────────────────────────────────────────────

export interface ProductImage {
  id:        string;
  url:       string;
  alt?:      string;
  isPrimary: boolean;
  sortOrder: number;
}

export interface ProductVariant {
  id:       string;
  name:     string;
  sku?:     string;
  price?:   number;
  stock:    number;
  image?:   string;
  isActive: boolean;
  options:  { name: string; value: string }[];
}

export interface Product {
  id:               string;
  name:             string;
  slug:             string;
  description:      string;
  shortDescription?: string;
  categoryId:       string;
  brandId?:         string;
  basePrice:        number;
  salePrice?:       number;
  sku?:             string;
  stock:            number;
  isFeatured:       boolean;
  isBestSeller:     boolean;
  isNew:            boolean;
  isActive:         boolean;
  tags:             string[];
  images:           ProductImage[];
  variants:         ProductVariant[];
  category?:        { id: string; name: string; slug: string };
  brand?:           { id: string; name: string };
  reviewCount?:     number;
  averageRating?:   number;
  soldCount:        number;
  createdAt:        Date;
  updatedAt:        Date;
}

// ─── Cart ─────────────────────────────────────────────────────────────────────

export interface CartItem {
  id:         string;
  productId:  string;
  variantId?: string;
  name:       string;
  slug:       string;
  image:      string;
  price:      number;
  quantity:   number;
  stock:      number;
  variantName?: string;
}

// ─── Order ────────────────────────────────────────────────────────────────────

export type OrderStatus =
  | "PENDING" | "CONFIRMED" | "PROCESSING"
  | "SHIPPED" | "OUT_FOR_DELIVERY" | "DELIVERED"
  | "CANCELLED" | "REFUNDED" | "RETURNED";

export type PaymentMethod = "CASH_ON_DELIVERY" | "BKASH" | "NAGAD" | "CARD" | "BANK_TRANSFER";
export type PaymentStatus = "PENDING" | "PAID" | "FAILED" | "REFUNDED" | "PARTIALLY_REFUNDED";

export interface ShippingAddress {
  fullName:    string;
  phone:       string;
  addressLine: string;
  city:        string;
  district:    string;
  postalCode?: string;
}

export interface Order {
  id:              string;
  orderNumber:     string;
  status:          OrderStatus;
  paymentMethod:   PaymentMethod;
  paymentStatus:   PaymentStatus;
  subtotal:        number;
  shippingCost:    number;
  discount:        number;
  total:           number;
  shippingAddress: ShippingAddress;
  items:           OrderItem[];
  couponCode?:     string;
  createdAt:       Date;
  updatedAt:       Date;
}

export interface OrderItem {
  id:        string;
  productId: string;
  name:      string;
  image?:    string;
  price:     number;
  quantity:  number;
  total:     number;
}

// ─── User ─────────────────────────────────────────────────────────────────────

export type UserRole = "CUSTOMER" | "ADMIN" | "MANAGER";

export interface User {
  id:    string;
  name?: string;
  email: string;
  image?: string;
  phone?: string;
  role:  UserRole;
}

// ─── Review ───────────────────────────────────────────────────────────────────

export interface Review {
  id:                 string;
  productId:          string;
  userId:             string;
  rating:             number;
  title?:             string;
  body:               string;
  isVerifiedPurchase: boolean;
  helpfulCount:       number;
  user:               { name?: string; image?: string };
  images:             { url: string }[];
  createdAt:          Date;
}

// ─── API ──────────────────────────────────────────────────────────────────────

export interface ApiResponse<T> {
  data:    T;
  message?: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data:       T[];
  total:      number;
  page:       number;
  pageSize:   number;
  totalPages: number;
}

export interface ApiError {
  message: string;
  errors?: Record<string, string[]>;
}

// ─── Filters ──────────────────────────────────────────────────────────────────

export interface ProductFilters {
  search?:     string;
  categoryId?: string;
  brandId?:    string;
  minPrice?:   number;
  maxPrice?:   number;
  sort?:       "newest" | "price_asc" | "price_desc" | "best_selling" | "top_rated";
  tags?:       string[];
  page?:       number;
  pageSize?:   number;
}
