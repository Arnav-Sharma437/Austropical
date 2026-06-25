import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Order from "@/models/Order";
import Product from "@/models/Product";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";

export const dynamic = "force-dynamic";

// GET /api/admin/stats - Aggregate stats for the admin dashboard (Admin Only)
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user || ((session.user as any).role !== "admin" && (session.user as any).role !== "superadmin")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();

    // 1. Total products count
    const totalProducts = await Product.countDocuments();

    // 2. Total orders count
    const totalOrders = await Order.countDocuments();

    // 3. Total revenue (sum of all non-cancelled orders)
    const revenueRes = await Order.aggregate([
      { $match: { status: { $ne: "cancelled" } } },
      { $group: { _id: null, total: { $sum: "$total" } } }
    ]);
    const totalRevenue = revenueRes[0]?.total || 0;

    // 4. Pending orders count
    const pendingOrdersCount = await Order.countDocuments({ status: "pending" });

    // 5. Recent orders (last 5)
    const recentOrders = await Order.find().sort({ createdAt: -1 }).limit(5);

    // 6. Orders by status count
    const statusAggregation = await Order.aggregate([
      { $group: { _id: "$status", count: { $sum: 1 } } }
    ]);
    const statusCounts: Record<string, number> = {
      pending: 0,
      confirmed: 0,
      processing: 0,
      shipped: 0,
      delivered: 0,
      cancelled: 0,
      refunded: 0
    };
    statusAggregation.forEach((item) => {
      if (item._id in statusCounts) {
        statusCounts[item._id] = item.count;
      }
    });

    // 7. Monthly revenue (last 6 months)
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 5);
    sixMonthsAgo.setDate(1);
    sixMonthsAgo.setHours(0, 0, 0, 0);

    const monthlyRevenueAggregation = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: sixMonthsAgo },
          status: { $ne: "cancelled" }
        }
      },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" }
          },
          revenue: { $sum: "$total" }
        }
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } }
    ]);

    const monthsList: { name: string; year: number; month: number; revenue: number }[] = [];
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    for (let i = 5; i >= 0; i--) {
      const d = new Date();
      d.setMonth(d.getMonth() - i);
      monthsList.push({
        name: `${monthNames[d.getMonth()]} ${d.getFullYear().toString().substring(2)}`,
        year: d.getFullYear(),
        month: d.getMonth() + 1,
        revenue: 0
      });
    }

    monthlyRevenueAggregation.forEach((item) => {
      const match = monthsList.find((m) => m.year === item._id.year && m.month === item._id.month);
      if (match) {
        match.revenue = item.revenue;
      }
    });

    return NextResponse.json({
      totalProducts,
      totalOrders,
      totalRevenue,
      pendingOrdersCount,
      recentOrders,
      statusCounts,
      monthlyRevenue: monthsList.map(({ name, revenue }) => ({ name, revenue }))
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to generate stats" }, { status: 500 });
  }
}
