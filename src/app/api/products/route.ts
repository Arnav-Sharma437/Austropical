import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Product from "@/models/Product";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";

export const dynamic = "force-dynamic";

// GET /api/products - List all products with optional filters
export async function GET(request: Request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const featured = searchParams.get("featured");
    const search = searchParams.get("search");

    const query: any = {};

    if (category && category !== "ALL PRODUCTS") {
      // Map category text to database enum keys
      // e.g. "ACAI BUCKETS" -> "acai-buckets", "GRAB'N GO" -> "grab-n-go"
      const normalizedCategory = category.toLowerCase().trim().replace(/['\s]+/g, "-");
      
      if (normalizedCategory === "super-fruits") {
        query.category = { $regex: /^super-fruits/, $options: "i" };
      } else {
        query.category = normalizedCategory;
      }
    }

    if (featured === "true") {
      query.isFeatured = true;
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { tags: { $regex: search, $options: "i" } },
        { ingredients: { $regex: search, $options: "i" } }
      ];
    }

    const products = await Product.find(query).sort({ createdAt: -1 });
    return NextResponse.json(products);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to fetch products" }, { status: 500 });
  }
}

// POST /api/products - Create a new product (Admin Only)
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user || ((session.user as any).role !== "admin" && (session.user as any).role !== "superadmin")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();
    const body = await request.json();

    // Calculate total stock based on variants sum
    let calculatedStock = 0;
    if (body.variants && Array.isArray(body.variants)) {
      calculatedStock = body.variants.reduce((sum: number, v: any) => sum + (Number(v.stock) || 0), 0);
    } else {
      calculatedStock = Number(body.totalStock) || 0;
    }

    const newProduct = new Product({
      ...body,
      totalStock: calculatedStock
    });

    await newProduct.save();
    return NextResponse.json(newProduct, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to create product" }, { status: 500 });
  }
}
