import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Cart from "@/models/Cart";

export const dynamic = "force-dynamic";

// POST /api/cart - Add item to cart (creates cart if doesn't exist)
export async function POST(request: Request) {
  try {
    await dbConnect();
    const { sessionId, product, name, image, price, quantity, variant } = await request.json();

    if (!sessionId || !product || !name || price === undefined || !quantity) {
      return NextResponse.json({ error: "Missing required cart parameters" }, { status: 400 });
    }

    let cart = await Cart.findOne({ sessionId });
    const cartItem = { product, name, image, price, quantity, variant };

    if (!cart) {
      cart = new Cart({
        sessionId,
        items: [cartItem],
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days from now
      });
    } else {
      // Check if product + variant matches
      const itemIndex = cart.items.findIndex(
        (item: any) => item.product.toString() === product && item.variant === variant
      );

      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity;
      } else {
        cart.items.push(cartItem);
      }
      cart.expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // refresh expiry
    }

    await cart.save();
    return NextResponse.json(cart);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to add to cart" }, { status: 500 });
  }
}
