import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { z } from "zod";

const schema = z.object({
  productId: z.string(),
  userId:    z.string(),
  rating:    z.number().int().min(1).max(5),
  title:     z.string().optional(),
  body:      z.string().min(10),
  images:    z.array(z.string()).optional().default([]),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data = schema.parse(body);

    // Check if user has ordered this product
    const hasOrdered = await prisma.orderItem.findFirst({
      where: { productId: data.productId, order: { userId: data.userId, status: { in: ["DELIVERED", "CONFIRMED"] } } },
    });

    const review = await prisma.review.create({
      data: {
        productId: data.productId,
        userId:    data.userId,
        rating:    data.rating,
        title:     data.title,
        body:      data.body,
        isVerifiedPurchase: !!hasOrdered,
        isApproved: false,
        images: { create: data.images.map((url) => ({ url })) },
      },
    });

    return NextResponse.json(review, { status: 201 });
  } catch (e) {
    if (e instanceof z.ZodError) return NextResponse.json({ message: "Validation failed" }, { status: 400 });
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const productId = searchParams.get("productId");
  if (!productId) return NextResponse.json({ message: "productId required" }, { status: 400 });

  const reviews = await prisma.review.findMany({
    where: { productId, isApproved: true },
    include: { user: { select: { name: true, image: true } }, images: true },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(reviews);
}
