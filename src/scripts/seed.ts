import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { loadEnvConfig } from "@next/env";

// Load environment variables from .env.local
const projectDir = process.cwd();
loadEnvConfig(projectDir);

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.error("Error: MONGODB_URI environment variable is missing!");
  process.exit(1);
}

// Import models
import User from "../models/User";
import Product from "../models/Product";
import Order from "../models/Order";
import Cart from "../models/Cart";
import Review from "../models/Review";

const sampleProducts = [
  {
    name: "Premium Acai Bucket (500ml)",
    category: "acai-buckets",
    price: 12.99,
    compareAtPrice: 15.99,
    description: "Our signature blend of premium grade organic acai berries sourced directly from the Amazon. Smooth, creamy, and packed with antioxidants.",
    shortDescription: "Organic Amazonian acai tub topped with fresh fruits.",
    images: ["https://images.unsplash.com/photo-1590301157890-4810ed352733?q=80&w=600&auto=format&fit=crop"],
    tags: ["organic", "acai", "antioxidants", "vegan"],
    ingredients: ["🍇 Acai Berry", "🍌 Banana", "🥥 Coconut", "🫐 Blueberry", "🍓 Strawberry", "🍯 Guarana", "🌾 Oats"],
    nutritionFacts: { calories: 120, protein: 2, carbs: 22, fat: 3, fiber: 4, sugar: 12 },
    badges: ["100% Vegan", "Gluten Free", "Certified Organic"],
    variants: [
      { name: "Single Tub (500ml)", sku: "AUS-ACAI-500", price: 12.99, stock: 50, size: "500ml" },
      { name: "Twin Pack (2x500ml)", sku: "AUS-ACAI-1000", price: 23.99, stock: 30, size: "1L" }
    ],
    totalStock: 80,
    isActive: true,
    isFeatured: true
  },
  {
    name: "Acai Grab 'n Go 3-Pack",
    category: "grab-n-go",
    price: 14.99,
    compareAtPrice: 17.99,
    description: "Individual serving sizes of our award-winning acai. Perfect for packing in lunchboxes or taking on the go.",
    shortDescription: "Convenient single-serve acai cups for active lifestyles.",
    images: ["https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=600&auto=format&fit=crop"],
    tags: ["convenient", "snack", "acai", "vegan"],
    ingredients: ["🍇 Acai Berry", "🍌 Banana", "🍏 Apple", "🥥 Coconut Oil", "🍯 Guarana", "🥛 Vegan Base"],
    nutritionFacts: { calories: 90, protein: 1, carbs: 18, fat: 2, fiber: 3, sugar: 10 },
    badges: ["100% Vegan", "Gluten Free"],
    variants: [
      { name: "3-Pack Cups", sku: "AUS-GNG-3P", price: 14.99, stock: 40, size: "3x150ml" }
    ],
    totalStock: 40,
    isActive: true,
    isFeatured: false
  },
  {
    name: "Acai Tropical Ice Pops",
    category: "ice-pop-line",
    price: 8.99,
    compareAtPrice: 10.99,
    description: "Refreshing icy treats loaded with organic acai, pineapple, and mango. 100% dairy-free, sugar-free, and natural.",
    shortDescription: "Vibrant fruit-forward icy pops for hot summer afternoons.",
    images: ["https://images.unsplash.com/photo-1505394033641-4d32ad966705?q=80&w=600&auto=format&fit=crop"],
    tags: ["icepop", "refreshing", "fruit", "summer"],
    ingredients: ["🍇 Pure Acai", "🍍 Pineapple", "🥭 Mango", "🥥 Coconut Water", "🍋 Lime Juice", "🍁 Maple Syrup"],
    nutritionFacts: { calories: 60, protein: 0.5, carbs: 14, fat: 0.2, fiber: 2, sugar: 9 },
    badges: ["100% Vegan", "Gluten Free", "Non GMO"],
    variants: [
      { name: "Box of 6 Pops", sku: "AUS-POP-6P", price: 8.99, stock: 100, size: "6-Pack" }
    ],
    totalStock: 100,
    isActive: true,
    isFeatured: true
  },
  {
    name: "Acai Booster Smoothie Cubes",
    category: "smoothie-cubes",
    price: 10.99,
    compareAtPrice: 12.99,
    description: "Pre-portioned flash-frozen smoothie booster cubes. Blend with coconut water or almond milk for an instant superfood charge.",
    shortDescription: "Convenient freezer cubes for quick blender smoothies.",
    images: ["https://images.unsplash.com/photo-1553530979-7ee52a2670c4?q=80&w=600&auto=format&fit=crop"],
    tags: ["smoothie", "helper", "quick", "greens"],
    ingredients: ["🍇 Raw Acai", "🥬 Spinach", "🍌 Banana", "🥥 Coconut Milk", "🌱 Chia Seeds", "🍍 Pineapple"],
    nutritionFacts: { calories: 85, protein: 3, carbs: 15, fat: 2, fiber: 5, sugar: 6 },
    badges: ["100% Vegan", "Gluten Free", "Certified Organic", "Essential Minerals"],
    variants: [
      { name: "Smoothie Bag (12 Cubes)", sku: "AUS-CUBE-12", price: 10.99, stock: 65, size: "12 Cubes" }
    ],
    totalStock: 65,
    isActive: true,
    isFeatured: false
  },
  {
    name: "Classic Acai Sorbet Tub",
    category: "sorbet-line",
    price: 11.49,
    compareAtPrice: 13.99,
    description: "Chunky, scoopable sorbet blending rich acai with a hint of guarana energy. Perfect for building custom dessert bowls.",
    shortDescription: "Premium scoopable acai sorbet tub.",
    images: ["https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?q=80&w=600&auto=format&fit=crop"],
    tags: ["sorbet", "scoop", "desert", "guarana"],
    ingredients: ["🍇 Organic Acai", "🍎 Apple", "🍋 Lemon", "🍯 Guarana", "🌾 Rice Syrup", "🍇 Blackberry"],
    nutritionFacts: { calories: 110, protein: 1.5, carbs: 20, fat: 1.5, fiber: 3, sugar: 11 },
    badges: ["100% Vegan", "Gluten Free", "Certified Organic"],
    variants: [
      { name: "Standard Tub (500ml)", sku: "AUS-SORB-500", price: 11.49, stock: 75, size: "500ml" }
    ],
    totalStock: 75,
    isActive: true,
    isFeatured: false
  },
  {
    name: "Super Fruits Mango-Passion Bucket",
    category: "super-fruits-buckets",
    price: 13.99,
    compareAtPrice: 16.99,
    description: "Vibrant bucket loading exotic mango, pineapple, kiwi, and pink pitaya. Sourced ethically from Queensland farms.",
    shortDescription: "Queensland mango and passionfruit superfood bucket.",
    images: ["https://images.unsplash.com/photo-1550258987-190a2d41a8ba?q=80&w=600&auto=format&fit=crop"],
    tags: ["mango", "passionfruit", "yellow", "vitaminC"],
    ingredients: ["🥭 Mango", "🍍 Pineapple", "🥝 Kiwi", "🥥 Coconut", "🍋 Passionfruit", "🍓 Pitaya"],
    nutritionFacts: { calories: 130, protein: 1, carbs: 26, fat: 0.5, fiber: 3, sugar: 18 },
    badges: ["100% Vegan", "Gluten Free", "Non GMO"],
    variants: [
      { name: "Single Tub (500ml)", sku: "AUS-FRT-500", price: 13.99, stock: 55, size: "500ml" }
    ],
    totalStock: 55,
    isActive: true,
    isFeatured: true
  },
  {
    name: "Super Fruits Pitaya Sorbet Tub",
    category: "super-fruits-sorbet",
    price: 11.99,
    compareAtPrice: 14.99,
    description: "Vibrant hot-pink pitaya (dragonfruit) sorbet tub. Naturally sweetened, vitamin-rich, and creamy.",
    shortDescription: "Vibrant hot pink Pitaya dragonfruit sorbet.",
    images: ["https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?q=80&w=600&auto=format&fit=crop"],
    tags: ["pitaya", "pink", "sorbet", "exotic"],
    ingredients: ["🍓 Pink Pitaya", "🍍 Pineapple", "🍋 Key Lime", "🥥 Coconut", "🍌 Banana", "🥭 Mango"],
    nutritionFacts: { calories: 95, protein: 1.2, carbs: 19, fat: 0.4, fiber: 3, sugar: 10 },
    badges: ["100% Vegan", "Gluten Free", "Certified Organic", "Lower Sugar"],
    variants: [
      { name: "Standard Tub (500ml)", sku: "AUS-PITY-500", price: 11.99, stock: 80, size: "500ml" }
    ],
    totalStock: 80,
    isActive: true,
    isFeatured: false
  },
  {
    name: "Super Fruits Tropical Ice Pops",
    category: "super-fruits-ice-pop",
    price: 8.99,
    compareAtPrice: 10.99,
    description: "Icy pops combining organic passionfruit, mango, and sweet strawberries. Low calorie and perfect for hot afternoons.",
    shortDescription: "Passionfruit and strawberry tropical ice pops.",
    images: ["https://images.unsplash.com/photo-1488477181946-6428a0291777?q=80&w=600&auto=format&fit=crop"],
    tags: ["icepop", "passionfruit", "strawberries", "kids"],
    ingredients: ["🍋 Passionfruit", "🥭 Mango", "🍊 Orange", "🥥 Coconut", "🍯 Guarana", "🍓 Strawberry"],
    nutritionFacts: { calories: 55, protein: 0.4, carbs: 12, fat: 0.1, fiber: 1.5, sugar: 8 },
    badges: ["100% Vegan", "Gluten Free", "Non GMO", "Lower Sugar"],
    variants: [
      { name: "Box of 6 Pops", sku: "AUS-FPOP-6P", price: 8.99, stock: 90, size: "6-Pack" }
    ],
    totalStock: 90,
    isActive: true,
    isFeatured: false
  }
];

async function seed() {
  console.log("Connecting to MongoDB database...");
  await mongoose.connect(MONGODB_URI!);
  console.log("Connected successfully.");

  console.log("Cleaning up collections...");
  await User.deleteMany({});
  await Product.deleteMany({});
  await Order.deleteMany({});
  await Cart.deleteMany({});
  await Review.deleteMany({});
  console.log("Collections cleared.");

  console.log("Hashing password for default administrator...");
  const hashedPassword = await bcrypt.hash("Admin@123", 10);
  const admin = new User({
    name: "Austropical Admin",
    email: "admin@austropical.com",
    password: hashedPassword,
    role: "admin",
    isActive: true
  });
  await admin.save();
  console.log("Default admin seeded: admin@austropical.com / Admin@123");

  console.log("Seeding sample products...");
  for (const p of sampleProducts) {
    const product = new Product(p);
    await product.save();
    console.log(`Seeded: ${product.name} (Slug: ${product.slug})`);
  }

  console.log("Database seeded successfully!");
  await mongoose.disconnect();
  console.log("Disconnected from database.");
}

seed().catch((err) => {
  console.error("Database seeding failed:", err);
  process.exit(1);
});
