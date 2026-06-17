import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const order = await prisma.order.findFirst({
    where: { OR: [{ id }, { orderNumber: id }] },
    include: { items: true, statusLogs: { orderBy: { createdAt: "asc" } } },
  });
  if (!order) return NextResponse.json({ message: "Not found" }, { status: 404 });
  return NextResponse.json(order);
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await req.json();

  const order = await prisma.order.update({
    where: { id },
    data: {
      status:      body.status,
      adminNotes:  body.adminNotes,
      paymentStatus: body.paymentStatus,
      statusLogs: body.status ? {
        create: { status: body.status, note: body.note ?? `Status updated to ${body.status}`, updatedBy: body.updatedBy }
      } : undefined,
    },
  });
  return NextResponse.json(order);
}
