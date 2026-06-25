import mongoose, { Schema, Document, model, models } from "mongoose";

export interface IReview extends Document {
  product: mongoose.Types.ObjectId;
  customerName: string;
  customerEmail: string;
  rating: number;
  title?: string;
  body?: string;
  isApproved: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ReviewSchema = new Schema<IReview>(
  {
    product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    customerName: { type: String, required: true },
    customerEmail: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    title: { type: String },
    body: { type: String },
    isApproved: { type: Boolean, default: false }
  },
  { timestamps: true }
);

export default models.Review || model<IReview>("Review", ReviewSchema);
