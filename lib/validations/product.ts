import { z } from "zod";

export const productSchema = z.object({
  name:         z.string().min(2, "Name must be at least 2 characters"),
  slug:         z.string().min(2).regex(/^[a-z0-9-]+$/, "Slug must be lowercase letters, numbers, and hyphens only"),
  description:  z.string().optional(),
  shortDesc:    z.string().optional(),
  categoryId:   z.string().min(1, "Category is required"),
  price:        z.number().positive("Price must be positive"),
  salePrice:    z.number().positive().optional().nullable(),
  stock:        z.number().int().min(0),
  sku:          z.string().optional(),
  isFeatured:   z.boolean().default(false),
  isBestSeller: z.boolean().default(false),
  isActive:     z.boolean().default(true),
  images:       z.array(z.string().url()).optional().default([]),
  tags:         z.array(z.string()).optional().default([]),
});

export type ProductFormData = z.infer<typeof productSchema>;
