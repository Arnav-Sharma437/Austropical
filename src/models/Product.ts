import mongoose, { Schema, Document, model, models } from "mongoose";

export interface IVariant {
  name: string;
  sku?: string;
  price?: number;
  stock?: number;
  size?: string;
}

export interface IProduct extends Document {
  name: string;
  slug: string;
  description?: string;
  shortDescription?: string;
  price: number;
  compareAtPrice?: number;
  images: string[];
  category: 'acai-buckets' | 'grab-n-go' | 'ice-pop-line' | 'smoothie-cubes' | 'sorbet-line' | 'super-fruits-buckets' | 'super-fruits-ice-pop' | 'super-fruits-smoothie-cubes' | 'super-fruits-sorbet';
  tags: string[];
  ingredients: string[];
  nutritionFacts: {
    calories?: number;
    protein?: number;
    carbs?: number;
    fat?: number;
    fiber?: number;
    sugar?: number;
  };
  badges: string[];
  variants: IVariant[];
  totalStock?: number;
  isActive: boolean;
  isFeatured: boolean;
  metaTitle?: string;
  metaDescription?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true },
    slug: { type: String, unique: true },
    description: { type: String },
    shortDescription: { type: String },
    price: { type: Number, required: true },
    compareAtPrice: { type: Number },
    images: [{ type: String }],
    category: {
      type: String,
      required: true,
      enum: [
        'acai-buckets',
        'grab-n-go',
        'ice-pop-line',
        'smoothie-cubes',
        'sorbet-line',
        'super-fruits-buckets',
        'super-fruits-ice-pop',
        'super-fruits-smoothie-cubes',
        'super-fruits-sorbet'
      ]
    },
    tags: [{ type: String }],
    ingredients: [{ type: String }],
    nutritionFacts: {
      calories: { type: Number, default: 0 },
      protein: { type: Number, default: 0 },
      carbs: { type: Number, default: 0 },
      fat: { type: Number, default: 0 },
      fiber: { type: Number, default: 0 },
      sugar: { type: Number, default: 0 }
    },
    badges: [{ type: String }],
    variants: [
      {
        name: { type: String, required: true },
        sku: { type: String },
        price: { type: Number },
        stock: { type: Number, default: 0 },
        size: { type: String }
      }
    ],
    totalStock: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
    isFeatured: { type: Boolean, default: false },
    metaTitle: { type: String },
    metaDescription: { type: String }
  },
  { timestamps: true }
);

// Slug generation before validation/save
ProductSchema.pre<IProduct>("validate", function (next: any) {
  if (!this.slug || this.isModified("name")) {
    this.slug = this.name
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }
  next();
});

export default models.Product || model<IProduct>("Product", ProductSchema);
