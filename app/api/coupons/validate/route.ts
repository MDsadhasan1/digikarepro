import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  const { code, total } = await req.json();

  const coupon = await prisma.coupon.findUnique({ where: { code: code.toUpperCase() } });

  if (!coupon) return NextResponse.json({ valid: false, message: "Invalid coupon code" });
  if (!coupon.isActive) return NextResponse.json({ valid: false, message: "This coupon is no longer active" });
  if (coupon.expiresAt && coupon.expiresAt < new Date()) return NextResponse.json({ valid: false, message: "This coupon has expired" });
  if (coupon.usageLimit && coupon.usedCount >= coupon.usageLimit) return NextResponse.json({ valid: false, message: "Coupon usage limit reached" });
  if (coupon.minimumAmount && total < Number(coupon.minimumAmount)) return NextResponse.json({ valid: false, message: `Minimum order amount is ৳${coupon.minimumAmount}` });

  let discountAmount = 0;
  if (coupon.discountType === "PERCENTAGE") {
    discountAmount = (total * Number(coupon.discountValue)) / 100;
    if (coupon.maximumDiscount) discountAmount = Math.min(discountAmount, Number(coupon.maximumDiscount));
  } else if (coupon.discountType === "FIXED_AMOUNT") {
    discountAmount = Math.min(Number(coupon.discountValue), total);
  } else if (coupon.discountType === "FREE_SHIPPING") {
    discountAmount = 120; // max shipping
  }

  return NextResponse.json({ valid: true, discountAmount: Math.round(discountAmount), discountType: coupon.discountType });
}
