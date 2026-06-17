import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = await prisma.product.findFirst({
    where: { OR: [{ id }, { slug: id }], isActive: true },
    include: {
      images: { orderBy: { sortOrder: "asc" } },
      variants: { include: { options: true } },
      attributes: { orderBy: { sortOrder: "asc" } },
      category: true,
      brand: true,
      reviews: { where: { isApproved: true }, include: { user: { select: { name: true, image: true } }, images: true }, orderBy: { createdAt: "desc" }, take: 10 },
    },
  });
  if (!product) return NextResponse.json({ message: "Not found" }, { status: 404 });

  // Increment view count
  await prisma.product.update({ where: { id: product.id }, data: { viewCount: { increment: 1 } } });

  return NextResponse.json(product);
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await req.json();
  const product = await prisma.product.update({ where: { id }, data: body });
  return NextResponse.json(product);
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await prisma.product.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
