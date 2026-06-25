import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Cart from "@/models/Cart";

export const dynamic = "force-dynamic";

// GET /api/cart/[sessionId] - Get cart for current session
export async function GET(request: Request, { params }: { params: { sessionId: string } }) {
  try {
    await dbConnect();
    const { sessionId } = params;

    const cart = await Cart.findOne({ sessionId });
    if (!cart) {
      return NextResponse.json({ sessionId, items: [] });
    }

    return NextResponse.json(cart);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to retrieve cart" }, { status: 500 });
  }
}

// PUT /api/cart/[sessionId] - Replace items list in cart (updates quantities)
export async function PUT(request: Request, { params }: { params: { sessionId: string } }) {
  try {
    await dbConnect();
    const { sessionId } = params;
    const { items } = await request.json();

    if (!items || !Array.isArray(items)) {
      return NextResponse.json({ error: "Invalid items list" }, { status: 400 });
    }

    let cart = await Cart.findOne({ sessionId });

    if (!cart) {
      cart = new Cart({
        sessionId,
        items,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
      });
    } else {
      cart.items = items;
      cart.expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // refresh expiry
    }

    await cart.save();
    return NextResponse.json(cart);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to update cart" }, { status: 500 });
  }
}
