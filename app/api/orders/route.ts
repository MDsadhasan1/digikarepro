import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { generateOrderNumber } from "@/lib/utils";
import { z } from "zod";

const orderSchema = z.object({
  fullName:    z.string(),
  phone:       z.string(),
  addressLine: z.string(),
  city:        z.string(),
  district:    z.string(),
  notes:       z.string().optional(),
  paymentMethod: z.enum(["CASH_ON_DELIVERY", "BKASH", "NAGAD", "CARD", "BANK_TRANSFER"]),
  items: z.array(z.object({
    productId: z.string(),
    variantId: z.string().optional(),
    name:      z.string(),
    image:     z.string().optional(),
    price:     z.number(),
    quantity:  z.number().int().positive(),
  })),
  subtotal:   z.number(),
  shipping:   z.number(),
  discount:   z.number().default(0),
  total:      z.number(),
  couponCode: z.string().optional(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data = orderSchema.parse(body);

    const order = await prisma.order.create({
      data: {
        orderNumber:     generateOrderNumber(),
        paymentMethod:   data.paymentMethod,
        subtotal:        data.subtotal,
        shippingCost:    data.shipping,
        discount:        data.discount,
        total:           data.total,
        couponCode:      data.couponCode,
        shippingAddress: {
          fullName:    data.fullName,
          phone:       data.phone,
          addressLine: data.addressLine,
          city:        data.city,
          district:    data.district,
        },
        notes: data.notes,
        items: {
          create: data.items.map((item) => ({
            productId: item.productId,
            variantId: item.variantId,
            name:      item.name,
            image:     item.image,
            price:     item.price,
            quantity:  item.quantity,
            total:     item.price * item.quantity,
          })),
        },
        statusLogs: {
          create: { status: "PENDING", note: "Order placed by customer" },
        },
      },
    });

    // Decrement stock for each item
    for (const item of data.items) {
      await prisma.product.update({
        where: { id: item.productId },
        data: { stock: { decrement: item.quantity }, soldCount: { increment: item.quantity } },
      });
    }

    return NextResponse.json({ id: order.id, orderNumber: order.orderNumber }, { status: 201 });
  } catch (e) {
    if (e instanceof z.ZodError) return NextResponse.json({ message: "Validation failed", errors: e.flatten() }, { status: 400 });
    return NextResponse.json({ message: "Failed to create order" }, { status: 500 });
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const page     = Number(searchParams.get("page") ?? 1);
  const pageSize = Number(searchParams.get("pageSize") ?? 20);
  const status   = searchParams.get("status");

  const where: Record<string, unknown> = {};
  if (status && status !== "All") where.status = status;

  const [orders, total] = await Promise.all([
    prisma.order.findMany({ where, orderBy: { createdAt: "desc" }, skip: (page - 1) * pageSize, take: pageSize, include: { items: true } }),
    prisma.order.count({ where }),
  ]);

  return NextResponse.json({ data: orders, total, page, pageSize });
}
