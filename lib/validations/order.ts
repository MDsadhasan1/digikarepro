import { z } from "zod";
import { isValidBangladeshPhone } from "@/lib/utils";

export const checkoutSchema = z.object({
  fullName:    z.string().min(2, "Full name is required"),
  phone:       z.string().refine(isValidBangladeshPhone, "Please enter a valid Bangladeshi phone number"),
  addressLine: z.string().min(5, "Address must be at least 5 characters"),
  city:        z.string().min(2, "City is required"),
  district:    z.string().min(2, "District is required"),
  notes:       z.string().optional(),
  paymentMethod: z.enum(["CASH_ON_DELIVERY", "BKASH", "NAGAD"], {
    errorMap: () => ({ message: "Please select a payment method" }),
  }),
  couponCode: z.string().optional(),
});

export type CheckoutFormData = z.infer<typeof checkoutSchema>;
