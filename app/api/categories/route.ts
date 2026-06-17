import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { z } from "zod";
import { slugify } from "@/lib/utils";

const schema = z.object({
  name:        z.string().min(1),
  description: z.string().optional(),
  image:       z.string().optional(),
  parentId:    z.string().optional(),
  sortOrder:   z.number().int().optional().default(0),
});

export async function GET() {
  const categories = await prisma.category.findMany({
    where:   { isActive: true },
    include: { children: true, _count: { select: { products: true } } },
    orderBy: { sortOrder: "asc" },
  });
  return NextResponse.json(categories);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data = schema.parse(body);

    const slug = slugify(data.name);

    const category = await prisma.category.create({
      data: { ...data, slug },
    });
    return NextResponse.json(category, { status: 201 });
  } catch (e) {
    if (e instanceof z.ZodError) return NextResponse.json({ message: "Validation failed" }, { status: 400 });
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
