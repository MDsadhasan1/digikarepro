import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  const now   = new Date();
  const start = new Date(now.getFullYear(), now.getMonth(), 1);   // start of this month
  const prev  = new Date(now.getFullYear(), now.getMonth() - 1, 1); // start of last month

  const [
    totalRevenue,
    prevRevenue,
    totalOrders,
    prevOrders,
    totalCustomers,
    prevCustomers,
    pendingOrders,
    topProducts,
    monthlySales,
  ] = await Promise.all([
    prisma.order.aggregate({ where: { createdAt: { gte: start } }, _sum: { total: true } }),
    prisma.order.aggregate({ where: { createdAt: { gte: prev, lt: start } }, _sum: { total: true } }),
    prisma.order.count({ where: { createdAt: { gte: start } } }),
    prisma.order.count({ where: { createdAt: { gte: prev, lt: start } } }),
    prisma.user.count({ where: { createdAt: { gte: start } } }),
    prisma.user.count({ where: { createdAt: { gte: prev, lt: start } } }),
    prisma.order.count({ where: { status: "PENDING" } }),
    prisma.product.findMany({ orderBy: { soldCount: "desc" }, take: 5, select: { id: true, name: true, soldCount: true, price: true, images: { take: 1 } } }),
    // Last 6 months revenue grouped by month
    prisma.$queryRaw<{ month: string; revenue: number }[]>`
      SELECT TO_CHAR(created_at, 'Mon') as month,
             COALESCE(SUM(total), 0)::float as revenue
      FROM orders
      WHERE created_at >= NOW() - INTERVAL '6 months'
      GROUP BY DATE_TRUNC('month', created_at), TO_CHAR(created_at, 'Mon')
      ORDER BY DATE_TRUNC('month', created_at)
    `,
  ]);

  const pct = (curr: number, prev: number) =>
    prev === 0 ? 100 : Math.round(((curr - prev) / prev) * 100);

  const rev     = Number(totalRevenue._sum.total ?? 0);
  const prevRev = Number(prevRevenue._sum.total ?? 0);

  return NextResponse.json({
    revenue:       { value: rev, change: pct(rev, prevRev) },
    orders:        { value: totalOrders, change: pct(totalOrders, prevOrders) },
    customers:     { value: totalCustomers, change: pct(totalCustomers, prevCustomers) },
    pendingOrders,
    topProducts,
    monthlySales,
  });
}
