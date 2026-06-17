import { format, formatDistanceToNow, isValid } from "date-fns";

export function formatPrice(
  amount: number | string,
  options: { compact?: boolean } = {}
): string {
  const num = typeof amount === "string" ? parseFloat(amount) : amount;
  if (isNaN(num)) return "৳0";
  if (options.compact && num >= 1000) {
    return `৳${(num / 1000).toFixed(1)}k`;
  }
  return `৳${num.toLocaleString("en-BD")}`;
}

export function formatDiscount(original: number, sale: number): number {
  if (original <= 0) return 0;
  return Math.round(((original - sale) / original) * 100);
}

export function formatDate(date: Date | string, pattern = "dd MMM yyyy"): string {
  const d = typeof date === "string" ? new Date(date) : date;
  if (!isValid(d)) return "—";
  return format(d, pattern);
}

export function formatRelativeTime(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  if (!isValid(d)) return "—";
  return formatDistanceToNow(d, { addSuffix: true });
}

export function formatOrderNumber(id: string): string {
  return `#${id.slice(-8).toUpperCase()}`;
}

export function formatPhoneForWhatsApp(phone: string): string {
  const cleaned = phone.replace(/\D/g, "");
  if (cleaned.startsWith("0")) return `88${cleaned}`;
  if (cleaned.startsWith("880")) return cleaned;
  return `880${cleaned}`;
}
