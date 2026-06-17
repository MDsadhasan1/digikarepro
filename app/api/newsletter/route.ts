import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { z } from "zod";

const schema = z.object({ email: z.string().email(), source: z.string().optional() });

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, source } = schema.parse(body);

    await prisma.newsletterSubscriber.upsert({
      where: { email },
      update: { isActive: true },
      create: { email, source: source ?? "homepage" },
    });

    return NextResponse.json({ success: true });
  } catch (e) {
    if (e instanceof z.ZodError) return NextResponse.json({ message: "Invalid email" }, { status: 400 });
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
