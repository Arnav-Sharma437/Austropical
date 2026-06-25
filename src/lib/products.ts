export interface Product {
  id: string;
  name: string;
  category: string;
  price: string;
  image: string;
  ingredients: string[];
  bgColor: string;
  textColor?: string;
}

export const CATEGORIES = [
  "ALL PRODUCTS",
  "ACAI BUCKETS",
  "GRAB'N GO",
  "ICE POP LINE",
  "SMOOTHIE CUBES",
  "SORBET LINE",
  "SUPER FRUITS"
];

export const products: Product[] = [
  {
    id: "acai-bucket",
    name: "Premium Acai Bucket (500ml)",
    category: "ACAI BUCKETS",
    price: "$12.99",
    image: "https://placehold.co/600x600/4B0082/FFFFFF?text=Acai+Bucket",
    ingredients: ["🍇 Acai Berry", "🍌 Banana", "🥥 Coconut", "🫐 Blueberry", "🍓 Strawberry", "🍯 Guarana", "🌾 Oats"],
    bgColor: "#4B0082"
  },
  {
    id: "grab-go-pack",
    name: "Acai Grab 'n Go 3-Pack",
    category: "GRAB'N GO",
    price: "$14.99",
    image: "https://placehold.co/600x600/FF1493/FFFFFF?text=Grab+n+Go",
    ingredients: ["🍇 Acai Berry", "🍌 Banana", "🍏 Apple", "🥥 Coconut Oil", "🍯 Guarana", "🥛 Vegan Base"],
    bgColor: "#FF1493"
  },
  {
    id: "acai-pops",
    name: "Acai Tropical Ice Pops",
    category: "ICE POP LINE",
    price: "$8.99",
    image: "https://placehold.co/600x600/FF6B00/FFFFFF?text=Acai+Pops",
    ingredients: ["🍇 Pure Acai", "🍍 Pineapple", "🥭 Mango", "🥥 Coconut Water", "🍋 Lime Juice", "🍁 Maple Syrup"],
    bgColor: "#FF6B00"
  },
  {
    id: "acai-cubes",
    name: "Acai Booster Smoothie Cubes",
    category: "SMOOTHIE CUBES",
    price: "$10.99",
    image: "https://placehold.co/600x600/00A86B/FFFFFF?text=Smoothie+Cubes",
    ingredients: ["🍇 Raw Acai", "🥬 Spinach", "🍌 Banana", "🥥 Coconut Milk", "🌱 Chia Seeds", "🍍 Pineapple"],
    bgColor: "#00A86B"
  },
  {
    id: "acai-sorbet",
    name: "Classic Acai Sorbet Tub",
    category: "SORBET LINE",
    price: "$11.49",
    image: "https://placehold.co/600x600/4B0082/FFFFFF?text=Acai+Sorbet",
    ingredients: ["🍇 Organic Acai", "🍎 Apple", "🍋 Lemon", "🍯 Guarana", "🌾 Rice Syrup", "🍇 Blackberry"],
    bgColor: "#4B0082"
  },
  {
    id: "super-fruits-bucket",
    name: "Super Fruits Bucket",
    category: "SUPER FRUITS",
    price: "$13.99",
    image: "https://placehold.co/600x600/FFD700/000000?text=Super+Fruits",
    ingredients: ["🥭 Mango", "🍍 Pineapple", "🥝 Kiwi", "🥥 Coconut", "🍋 Passionfruit", "🍓 Pitaya"],
    bgColor: "#FFD700",
    textColor: "#0D0D0D"
  },
  {
    id: "super-fruits-pops",
    name: "Super Fruits Ice Pops",
    category: "ICE POP LINE",
    price: "$8.99",
    image: "https://placehold.co/600x600/FF6B00/FFFFFF?text=Fruit+Pops",
    ingredients: ["🍋 Passionfruit", "🥭 Mango", "🍊 Orange", "🥥 Coconut", "🍯 Guarana", "🍓 Strawberry"],
    bgColor: "#FF6B00"
  },
  {
    id: "super-fruits-cubes",
    name: "Super Fruits Smoothie Cubes",
    category: "SMOOTHIE CUBES",
    price: "$10.99",
    image: "https://placehold.co/600x600/00A86B/FFFFFF?text=Fruit+Cubes",
    ingredients: ["🍓 Dragonfruit", "🥭 Mango", "🍍 Pineapple", "🥬 Spinach", "🌱 Hemp Seeds", "🥥 Coconut"],
    bgColor: "#00A86B"
  },
  {
    id: "super-fruits-sorbet",
    name: "Super Fruits Sorbet Tub",
    category: "SORBET LINE",
    price: "$11.99",
    image: "https://placehold.co/600x600/FF1493/FFFFFF?text=Fruit+Sorbet",
    ingredients: ["🍓 Pink Pitaya", "🍍 Pineapple", "🍋 Key Lime", "🥥 Coconut", "🍌 Banana", "🥭 Mango"],
    bgColor: "#FF1493"
  }
];
