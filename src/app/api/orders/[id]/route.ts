import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Order from "@/models/Order";
import mongoose from "mongoose";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";

export const dynamic = "force-dynamic";

// GET /api/orders/[idOrNum] - Fetch order details by ID or Order Number
export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    await dbConnect();
    const identifier = params.id;

    let order = null;
    if (mongoose.Types.ObjectId.isValid(identifier)) {
      order = await Order.findById(identifier);
    }

    if (!order) {
      order = await Order.findOne({ orderNumber: identifier });
    }

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    return NextResponse.json(order);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to fetch order" }, { status: 500 });
  }
}

// PUT /api/orders/[idOrNum] - Update order status (Admin Only)
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user || ((session.user as any).role !== "admin" && (session.user as any).role !== "superadmin")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();
    const identifier = params.id;
    const body = await request.json();

    let order = null;
    if (mongoose.Types.ObjectId.isValid(identifier)) {
      order = await Order.findByIdAndUpdate(identifier, body, { new: true, runValidators: true });
    } else {
      order = await Order.findOneAndUpdate({ orderNumber: identifier }, body, { new: true, runValidators: true });
    }

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    return NextResponse.json(order);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to update order" }, { status: 500 });
  }
}
