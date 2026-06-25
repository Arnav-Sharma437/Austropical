import mongoose, { Schema, Document, model, models } from "mongoose";

export interface ICartItem {
  product: mongoose.Types.ObjectId;
  name: string;
  image?: string;
  price: number;
  quantity: number;
  variant?: string;
}

export interface ICart extends Document {
  sessionId: string;
  items: ICartItem[];
  createdAt: Date;
  updatedAt: Date;
  expiresAt: Date;
}

const CartSchema = new Schema<ICart>(
  {
    sessionId: { type: String, required: true, unique: true },
    items: [
      {
        product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
        name: { type: String, required: true },
        image: { type: String },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true },
        variant: { type: String }
      }
    ],
    expiresAt: {
      type: Date,
      required: true,
      default: () => new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      index: { expires: 0 }
    }
  },
  { timestamps: true }
);

export default models.Cart || model<ICart>("Cart", CartSchema);
