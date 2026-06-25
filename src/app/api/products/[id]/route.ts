import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Product from "@/models/Product";
import mongoose from "mongoose";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";

export const dynamic = "force-dynamic";

// GET /api/products/[slugOrId] - Get single product
export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    await dbConnect();
    const identifier = params.id;
    let product = null;

    // Check if valid ObjectId
    if (mongoose.Types.ObjectId.isValid(identifier)) {
      product = await Product.findById(identifier);
    }

    // Try finding by slug if not found by ID
    if (!product) {
      product = await Product.findOne({ slug: identifier });
    }

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to fetch product" }, { status: 500 });
  }
}

// PUT /api/products/[id] - Update product (Admin Only)
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user || ((session.user as any).role !== "admin" && (session.user as any).role !== "superadmin")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();
    const identifier = params.id;
    const body = await request.json();

    if (!mongoose.Types.ObjectId.isValid(identifier)) {
      return NextResponse.json({ error: "Invalid Product ID format" }, { status: 400 });
    }

    // Recalculate stock
    if (body.variants && Array.isArray(body.variants)) {
      body.totalStock = body.variants.reduce((sum: number, v: any) => sum + (Number(v.stock) || 0), 0);
    }

    const updatedProduct = await Product.findByIdAndUpdate(identifier, body, {
      new: true,
      runValidators: true
    });

    if (!updatedProduct) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(updatedProduct);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to update product" }, { status: 500 });
  }
}

// DELETE /api/products/[id] - Delete product (Admin Only)
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user || ((session.user as any).role !== "admin" && (session.user as any).role !== "superadmin")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();
    const identifier = params.id;

    if (!mongoose.Types.ObjectId.isValid(identifier)) {
      return NextResponse.json({ error: "Invalid Product ID format" }, { status: 400 });
    }

    const deletedProduct = await Product.findByIdAndDelete(identifier);

    if (!deletedProduct) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Product deleted successfully" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to delete product" }, { status: 500 });
  }
}
