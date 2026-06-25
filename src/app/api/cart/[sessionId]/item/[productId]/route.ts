import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Cart from "@/models/Cart";

export const dynamic = "force-dynamic";

// DELETE /api/cart/[sessionId]/item/[productId] - Remove item from cart
export async function DELETE(
  request: Request,
  { params }: { params: { sessionId: string; productId: string } }
) {
  try {
    await dbConnect();
    const { sessionId, productId } = params;
    const { searchParams } = new URL(request.url);
    const variant = searchParams.get("variant");

    const cart = await Cart.findOne({ sessionId });
    if (!cart) {
      return NextResponse.json({ sessionId, items: [] });
    }

    // Filter items
    if (variant) {
      cart.items = cart.items.filter(
        (item: any) => !(item.product.toString() === productId && item.variant === variant)
      );
    } else {
      cart.items = cart.items.filter((item: any) => item.product.toString() !== productId);
    }

    cart.expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // refresh expiry
    await cart.save();

    return NextResponse.json(cart);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to delete item from cart" }, { status: 500 });
  }
}
