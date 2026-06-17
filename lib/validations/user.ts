import { z } from "zod";
import { isValidBangladeshPhone } from "@/lib/utils";

export const registerSchema = z.object({
  name:     z.string().min(2, "Name must be at least 2 characters"),
  email:    z.string().email("Please enter a valid email address"),
  phone:    z.string().refine((v) => !v || isValidBangladeshPhone(v), "Please enter a valid Bangladeshi phone number").optional(),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirm:  z.string(),
}).refine((d) => d.password === d.confirm, { message: "Passwords do not match", path: ["confirm"] });

export const loginSchema = z.object({
  email:    z.string().email("Please enter a valid email"),
  password: z.string().min(1, "Password is required"),
});

export const profileSchema = z.object({
  name:  z.string().min(2),
  phone: z.string().refine((v) => !v || isValidBangladeshPhone(v), "Invalid phone").optional(),
  image: z.string().url().optional(),
});

export type RegisterFormData = z.infer<typeof registerSchema>;
export type LoginFormData = z.infer<typeof loginSchema>;
export type ProfileFormData = z.infer<typeof profileSchema>;
