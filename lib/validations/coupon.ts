import { z } from "zod";

export const couponSchema = z.object({
  code:            z.string().min(3).max(20).toUpperCase(),
  discountType:    z.enum(["PERCENTAGE", "FIXED_AMOUNT", "FREE_SHIPPING"]),
  discountValue:   z.number().positive(),
  minimumAmount:   z.number().optional(),
  maximumDiscount: z.number().optional(),
  usageLimit:      z.number().int().positive().optional(),
  expiresAt:       z.string().datetime().optional(),
  isActive:        z.boolean().default(true),
  description:     z.string().optional(),
});

export type CouponFormData = z.infer<typeof couponSchema>;
