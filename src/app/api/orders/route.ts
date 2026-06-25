import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Order from "@/models/Order";
import Product from "@/models/Product";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";

export const dynamic = "force-dynamic";

// GET /api/orders - List all orders (Admin Only)
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user || ((session.user as any).role !== "admin" && (session.user as any).role !== "superadmin")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();
    const orders = await Order.find().sort({ createdAt: -1 });
    return NextResponse.json(orders);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to fetch orders" }, { status: 500 });
  }
}

// POST /api/orders - Create new order (Public Checkout)
export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();

    const { customer, shippingAddress, items, subtotal, shippingCost, tax, total, paymentMethod, notes } = body;

    if (!customer || !shippingAddress || !items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: "Missing required order information" }, { status: 400 });
    }

    // Deduct stock levels for items ordered
    for (const item of items) {
      const product = await Product.findById(item.product);
      if (!product) {
        continue; // Skip or error out, let's keep it safe
      }

      // Deduct variant stock
      if (item.variant && product.variants && product.variants.length > 0) {
        const idx = product.variants.findIndex((v: any) => v.name === item.variant || v.size === item.variant);
        if (idx !== -1) {
          const currentStock = product.variants[idx].stock || 0;
          product.variants[idx].stock = Math.max(0, currentStock - item.quantity);
        }
      }

      // Deduct total stock
      const currentTotalStock = product.totalStock || 0;
      product.totalStock = Math.max(0, currentTotalStock - item.quantity);
      await product.save();
    }

    const newOrder = new Order({
      customer,
      shippingAddress,
      items,
      subtotal,
      shippingCost,
      tax,
      total,
      paymentMethod,
      paymentStatus: "pending",
      status: "pending",
      notes
    });

    await newOrder.save();
    return NextResponse.json(newOrder, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to create order" }, { status: 500 });
  }
}
