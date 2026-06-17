import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { z } from "zod";

const productSchema = z.object({
  name:             z.string().min(2),
  slug:             z.string().min(2),
  description:      z.string().min(10),
  shortDescription: z.string().optional(),
  categoryId:       z.string(),
  basePrice:        z.number().positive(),
  salePrice:        z.number().optional(),
  stock:            z.number().int().min(0),
  sku:              z.string().optional(),
  isFeatured:       z.boolean().optional().default(false),
  isBestSeller:     z.boolean().optional().default(false),
  tags:             z.array(z.string()).optional().default([]),
  images:           z.array(z.string()).optional().default([]),
});

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const page     = Number(searchParams.get("page") ?? 1);
  const pageSize = Number(searchParams.get("pageSize") ?? 24);
  const sort     = searchParams.get("sort") ?? "newest";
  const category = searchParams.get("category");
  const search   = searchParams.get("q");
  const featured = searchParams.get("featured");

  const where: Record<string, unknown> = { isActive: true };
  if (category) where.category = { slug: category };
  if (featured) where.isFeatured = true;
  if (search) where.name = { contains: search, mode: "insensitive" };

  const orderBy: Record<string, string> =
    sort === "price_asc"     ? { basePrice: "asc" } :
    sort === "price_desc"    ? { basePrice: "desc" } :
    sort === "best_selling"  ? { soldCount: "desc" } :
                               { createdAt: "desc" };

  const [products, total] = await Promise.all([
    prisma.product.findMany({
      where,
      orderBy,
      skip: (page - 1) * pageSize,
      take: pageSize,
      include: { images: true, category: { select: { name: true, slug: true } } },
    }),
    prisma.product.count({ where }),
  ]);

  return NextResponse.json({ data: products, total, page, pageSize, totalPages: Math.ceil(total / pageSize) });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data = productSchema.parse(body);

    const product = await prisma.product.create({
      data: {
        name:             data.name,
        slug:             data.slug,
        description:      data.description,
        shortDescription: data.shortDescription,
        categoryId:       data.categoryId,
        basePrice:        data.basePrice,
        salePrice:        data.salePrice,
        stock:            data.stock,
        sku:              data.sku,
        isFeatured:       data.isFeatured,
        isBestSeller:     data.isBestSeller,
        tags:             data.tags,
        images: {
          create: data.images.map((url, i) => ({ url, isPrimary: i === 0, sortOrder: i })),
        },
      },
    });

    return NextResponse.json(product, { status: 201 });
  } catch (e) {
    if (e instanceof z.ZodError) return NextResponse.json({ message: "Validation failed", errors: e.flatten() }, { status: 400 });
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
