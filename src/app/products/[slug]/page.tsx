"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Star, Plus, Minus, ShoppingBag, CheckCircle, ShieldAlert, Sparkles, MessageSquare } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { products } from "@/lib/products";

// Base64 solid placeholder to prevent next/image loading issues
const solidColorBlurDataURL =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=";

// Helper to determine theme colors
function getProductTheme(product: any) {
  if (product.bgColor) {
    return {
      bgColor: product.bgColor,
      textColor: product.textColor || (product.bgColor === "#FFD700" ? "#0D0D0D" : "#FFFFFF"),
      isLight: product.bgColor === "#FFD700" || product.bgColor === "#FFF" || product.textColor === "#0D0D0D"
    };
  }

  const cat = (product.category || "").toLowerCase();
  let bgColor = "#4B0082"; // Default deep purple
  
  if (cat.includes("grab-n-go") || cat.includes("sorbet")) {
    bgColor = "#FF1493"; // Deep pink
  } else if (cat.includes("pop")) {
    bgColor = "#FF6B00"; // Orange
  } else if (cat.includes("cube") || cat.includes("smoothie")) {
    bgColor = "#00A86B"; // Green
  } else if (cat.includes("super-fruits") && cat.includes("bucket")) {
    bgColor = "#FFD700"; // Gold/Yellow
  } else if (cat.includes("super-fruits")) {
    bgColor = "#FF1493";
  }

  const isLight = bgColor === "#FFD700";
  return {
    bgColor,
    textColor: isLight ? "#0D0D0D" : "#FFFFFF",
    isLight
  };
}

// Initial mock reviews data
const getInitialReviews = (productName: string) => [
  {
    id: 1,
    customerName: "Liam S.",
    rating: 5,
    title: "Absolutely Delicious!",
    body: `This ${productName} is my absolute go-to snack. The flavor is incredibly rich and clean. Love that it's 100% organic and dairy-free!`,
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toLocaleDateString()
  },
  {
    id: 2,
    customerName: "Emma K.",
    rating: 5,
    title: "Refreshing and Healthy",
    body: `Tastes like real tropical fruit, not artificially sweetened. The texture is extremely smooth. Puts traditional dairy ice creams to shame!`,
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toLocaleDateString()
  },
  {
    id: 3,
    customerName: "Oliver J.",
    rating: 4,
    title: "Super Premium!",
    body: "Excellent quality and natural taste. The packaging keeps it perfectly fresh. Highly recommend trying this flavor.",
    createdAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toLocaleDateString()
  }
];

// Mock nutrition facts mapping based on category
function getMockNutrition(product: any) {
  if (product.nutritionFacts && Object.keys(product.nutritionFacts).length > 0) {
    return {
      calories: product.nutritionFacts.calories || 140,
      fat: product.nutritionFacts.fat || 3,
      carbs: product.nutritionFacts.carbs || 28,
      protein: product.nutritionFacts.protein || 2,
      fiber: product.nutritionFacts.fiber || 5,
      sugar: product.nutritionFacts.sugar || 16
    };
  }

  const cat = (product.category || "").toLowerCase();

  if (cat.includes("bucket")) {
    return { calories: 180, fat: 5, carbs: 34, protein: 3, fiber: 7, sugar: 18 };
  } else if (cat.includes("grab")) {
    return { calories: 160, fat: 4, carbs: 30, protein: 2, fiber: 6, sugar: 15 };
  } else if (cat.includes("pop")) {
    return { calories: 95, fat: 1, carbs: 22, protein: 1, fiber: 3, sugar: 14 };
  } else if (cat.includes("cube") || cat.includes("smoothie")) {
    return { calories: 110, fat: 2, carbs: 23, protein: 3, fiber: 6, sugar: 11 };
  } else if (cat.includes("sorbet")) {
    return { calories: 195, fat: 4, carbs: 38, protein: 2, fiber: 5, sugar: 23 };
  }
  return { calories: 140, fat: 3, carbs: 28, protein: 2, fiber: 5, sugar: 16 };
}

export default function ProductDetailPage({ params }: { params: { slug: string } }) {
  const { addToCart } = useCart();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isStatic, setIsStatic] = useState(false);
  
  // Custom states
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState<any>(null);
  const [imageCandidates, setImageCandidates] = useState<string[]>([]);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const activeImage = imageCandidates[activeImageIndex] || "";
  const [reviews, setReviews] = useState<any[]>([]);
  const [isAdded, setIsAdded] = useState(false);

  // Review Form States
  const [reviewName, setReviewName] = useState("");
  const [reviewEmail, setReviewEmail] = useState("");
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewTitle, setReviewTitle] = useState("");
  const [reviewBody, setReviewBody] = useState("");
  const [reviewSuccess, setReviewSuccess] = useState(false);

  useEffect(() => {
    async function loadProduct() {
      try {
        setLoading(true);
        // 1. Fetch from Database API
        const res = await fetch(`/api/products/${params.slug}`);
        if (res.ok) {
          const data = await res.json();
          if (data && !data.error) {
            setProduct(data);
            setIsStatic(false);
            
            // Set first variant if available, otherwise mock size variants
            if (data.variants && data.variants.length > 0) {
              setSelectedVariant(data.variants[0]);
            } else {
              setSelectedVariant({ name: "500ml Tub", priceOffset: 0 });
            }

            const candidates = [
              `/products/${params.slug}.png`,
              `/products/${params.slug}.webp`,
              `/products/${params.slug}.jpg`,
              `/products/${params.slug}.jpeg`,
              `/products/${params.slug}.svg`
            ];
            if (data.images && data.images.length > 0) {
              candidates.push(...data.images);
            } else if (data.image) {
              candidates.push(data.image);
            }
            setImageCandidates(candidates);
            setActiveImageIndex(0);
            setReviews(getInitialReviews(data.name));
            setLoading(false);
            return;
          }
        }
      } catch (err) {
        console.warn("Database fetch failed, checking static fallback...", err);
      }

      // 2. Fallback to Static catalog products list
      const staticProduct = products.find((p) => p.id === params.slug);
      if (staticProduct) {
        setProduct(staticProduct);
        setIsStatic(true);
        const candidates = [
          `/products/${params.slug}.png`,
          `/products/${params.slug}.webp`,
          `/products/${params.slug}.jpg`,
          `/products/${params.slug}.jpeg`,
          `/products/${params.slug}.svg`,
          staticProduct.image
        ];
        setImageCandidates(candidates);
        setActiveImageIndex(0);
        setReviews(getInitialReviews(staticProduct.name));
        
        // Mock size variants for static products
        setSelectedVariant({ name: "500ml Tub", priceOffset: 0 });
      }
      setLoading(false);
    }

    loadProduct();
  }, [params.slug]);

  if (loading) {
    return (
      <div className="bg-[#FCF9F2] min-h-screen pt-40 flex flex-col items-center justify-center text-brand-dark">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-orange mb-4"></div>
        <p className="font-display text-xl uppercase tracking-wider animate-pulse">Loading superfood goodness...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="bg-[#FCF9F2] min-h-screen pt-40 px-6 text-center text-brand-dark flex flex-col items-center justify-center">
        <ShieldAlert size={64} className="text-brand-orange mb-4" />
        <h1 className="font-display text-4xl font-black uppercase mb-2">Product Not Found</h1>
        <p className="font-body text-brand-dark/60 max-w-md mb-8">
          The flavor you are looking for might have melted or been scooped up. Explore our other delicious options!
        </p>
        <Link href="/products" className="inline-flex items-center gap-2 bg-brand-dark hover:bg-brand-orange text-white font-display uppercase tracking-wider text-sm px-8 py-4 rounded-full transition-colors shadow-lg">
          <ArrowLeft size={16} /> Back to Flavours
        </Link>
      </div>
    );
  }

  const theme = getProductTheme(product);
  const productPrice = typeof product.price === "number" ? product.price : parseFloat(product.price.replace(/[^0-9.]/g, ""));
  
  // Static mock variants list
  const mockVariants = [
    { name: "500ml Tub", priceOffset: 0 },
    { name: "1L Family Tub", priceOffset: 6.00 },
    { name: "200ml Single Scoop", priceOffset: -4.00 }
  ];

  // Active price calculation
  const basePrice = selectedVariant?.price !== undefined ? selectedVariant.price : (productPrice + (selectedVariant?.priceOffset || 0));
  const activePrice = Math.max(2.99, basePrice);

  // Cart submission helper
  const handleAddCart = async () => {
    setIsAdded(true);
    const item = {
      product: product._id || product.id,
      name: product.name,
      image: isStatic ? product.image : (product.images?.[0] || product.image),
      price: activePrice,
      variant: selectedVariant?.name || "Standard"
    };

    await addToCart(item, quantity);
    
    setTimeout(() => {
      setIsAdded(false);
    }, 2000);
  };

  // Star components
  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={16}
            className={star <= rating ? "fill-brand-orange text-brand-orange" : "text-brand-dark/15"}
          />
        ))}
      </div>
    );
  };

  // Review submission
  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewName || !reviewEmail || !reviewBody) return;

    const newReview = {
      id: Date.now(),
      customerName: reviewName,
      rating: reviewRating,
      title: reviewTitle || "Delicious Scoop",
      body: reviewBody,
      createdAt: new Date().toLocaleDateString()
    };

    setReviews([newReview, ...reviews]);
    setReviewSuccess(true);
    setReviewName("");
    setReviewEmail("");
    setReviewTitle("");
    setReviewBody("");
    setReviewRating(5);

    setTimeout(() => {
      setReviewSuccess(false);
    }, 4000);
  };

  // Related products selection
  const relatedProducts = products
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, 3);

  // Nutrition Facts Values
  const nutrition = getMockNutrition(product);

  return (
    <div className="bg-[#FCF9F2] min-h-screen text-brand-dark selection:bg-brand-orange selection:text-white">
      
      {/* 1. HERO SECTION (Dark matching brand color) */}
      <section 
        className="pt-32 pb-16 md:pt-40 md:pb-24 px-6 md:px-12 transition-all duration-500 overflow-hidden relative"
        style={{ backgroundColor: theme.bgColor, color: theme.textColor }}
      >
        {/* Subtle decorative circles */}
        <div className="absolute top-1/4 left-[-10%] w-[400px] h-[400px] rounded-full bg-white/[0.03] blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-[-10%] w-[500px] h-[500px] rounded-full bg-white/[0.04] blur-3xl pointer-events-none" />

        <div className="mx-auto max-w-7xl relative z-10">
          
          {/* Back button & Breadcrumbs */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8 md:mb-12">
            <Link 
              href="/products" 
              className={`inline-flex items-center gap-2 text-sm font-display uppercase tracking-wider transition-all hover:translate-x-[-4px] ${
                theme.isLight ? "text-brand-dark/70 hover:text-brand-dark" : "text-white/70 hover:text-white"
              }`}
            >
              <ArrowLeft size={16} /> Back to Flavours
            </Link>
            <div className={`text-xs uppercase font-body tracking-widest opacity-60 ${theme.isLight ? "text-brand-dark" : "text-white"}`}>
              Flavours &gt; {product.category.replace("-", " ")} &gt; {product.name}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left: Product Images Gallery */}
            <div className="flex flex-col items-center justify-center">
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 100, damping: 15 }}
                className="relative w-[280px] h-[280px] md:w-[420px] md:h-[420px] mb-6 flex items-center justify-center"
              >
                <div className="absolute inset-0 bg-black/10 rounded-full blur-3xl scale-90 pointer-events-none" />
                <Image
                  src={activeImage || product.image || "/logo/logo (3).png"}
                  alt={product.name}
                  fill
                  sizes="(max-width: 768px) 280px, 420px"
                  placeholder="blur"
                  blurDataURL={solidColorBlurDataURL}
                  className="object-contain drop-shadow-[0_25px_40px_rgba(0,0,0,0.45)] hover:scale-105 transition-transform duration-500 origin-center cursor-zoom-in"
                  unoptimized={true}
                  onError={() => {
                    if (activeImageIndex < imageCandidates.length - 1) {
                      setActiveImageIndex(activeImageIndex + 1);
                    }
                  }}
                />
              </motion.div>

              {/* Gallery Thumbnails (only if multiple images) */}
              {!isStatic && product.images && product.images.length > 1 && (
                <div className="flex gap-3 justify-center">
                  {product.images.map((img: string, idx: number) => (
                    <button
                      key={idx}
                      onClick={() => {
                        const cIdx = imageCandidates.indexOf(img);
                        if (cIdx !== -1) {
                          setActiveImageIndex(cIdx);
                        } else {
                          setImageCandidates(prev => [...prev, img]);
                          setActiveImageIndex(imageCandidates.length);
                        }
                      }}
                      className={`relative w-16 h-16 rounded-xl overflow-hidden border-2 transition-all p-1 bg-white/10 ${
                        activeImage === img ? "border-brand-orange scale-105" : "border-transparent opacity-60 hover:opacity-100"
                      }`}
                    >
                      <Image
                        src={img}
                        alt={`${product.name} gallery ${idx + 1}`}
                        fill
                        sizes="64px"
                        className="object-contain"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right: Product Buy Panel */}
            <div className="flex flex-col items-start">
              
              <div className="flex items-center gap-2 mb-3">
                <span className={`px-3 py-1 text-[10px] font-black uppercase tracking-wider rounded-full ${
                  theme.isLight ? "bg-brand-dark/10 text-brand-dark" : "bg-white/10 text-white"
                }`}>
                  {product.category}
                </span>
                {product.isFeatured && (
                  <span className="bg-brand-orange text-white px-3 py-1 text-[10px] font-black uppercase tracking-wider rounded-full flex items-center gap-1">
                    <Sparkles size={10} /> Popular
                  </span>
                )}
              </div>

              <h1 className={`font-display text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight leading-none mb-4 ${
                theme.isLight ? "text-brand-dark" : "text-white"
              }`}>
                {product.name}
              </h1>

              {/* Star Rating Overview */}
              <div className="flex items-center gap-2 mb-6">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star 
                      key={star} 
                      size={18} 
                      className={`fill-brand-orange text-brand-orange ${star === 5 ? "opacity-80" : ""}`} 
                    />
                  ))}
                </div>
                <span className={`text-sm font-semibold opacity-85 font-body ${theme.isLight ? "text-brand-dark" : "text-white"}`}>
                  4.8 / 5 ({reviews.length} scooper reviews)
                </span>
              </div>

              {/* Price */}
              <div className="mb-6">
                <div className="flex items-baseline gap-3">
                  <span className={`font-display text-4xl sm:text-5xl font-black ${
                    theme.isLight ? "text-brand-dark" : "text-white"
                  }`}>
                    ${activePrice.toFixed(2)}
                  </span>
                  {product.compareAtPrice && (
                    <span className="line-through text-lg opacity-50 font-body">
                      ${product.compareAtPrice.toFixed(2)}
                    </span>
                  )}
                </div>
                <span className="text-[10px] uppercase font-bold tracking-widest opacity-60">
                  GST included. Shipping calculated at checkout
                </span>
              </div>

              {/* Short Description */}
              <p className={`font-body text-sm md:text-base mb-8 max-w-xl leading-relaxed opacity-85 ${
                theme.isLight ? "text-brand-dark" : "text-white"
              }`}>
                {product.shortDescription || product.description || 
                  "Blended with pure organic ingredients harvested under the sun. Rich in antioxidants and vitamins. Austropical brings the sun directly to your spoon with this premium vegan recipe."
                }
              </p>

              {/* Variants Selector */}
              <div className="mb-8 w-full max-w-md">
                <span className={`block text-xs uppercase font-black tracking-wider mb-3 opacity-80 ${
                  theme.isLight ? "text-brand-dark" : "text-white"
                }`}>
                  Choose Size/Pack:
                </span>
                <div className="flex flex-wrap gap-3">
                  {(isStatic ? mockVariants : (product.variants && product.variants.length > 0 ? product.variants : mockVariants)).map((v: any, index: number) => {
                    const isSelected = selectedVariant?.name === v.name;
                    return (
                      <button
                        key={index}
                        onClick={() => setSelectedVariant(v)}
                        className={`px-5 py-3 rounded-full font-display text-xs font-black uppercase tracking-wider transition-all duration-300 border ${
                          isSelected
                            ? "bg-brand-orange border-brand-orange text-white shadow-lg"
                            : theme.isLight
                              ? "border-brand-dark/15 hover:border-brand-dark text-brand-dark bg-white/40"
                              : "border-white/20 hover:border-white text-white bg-white/5"
                        }`}
                      >
                        {v.name}
                        {v.priceOffset > 0 && ` (+$${v.priceOffset.toFixed(2)})`}
                        {v.priceOffset < 0 && ` (-$${Math.abs(v.priceOffset).toFixed(2)})`}
                        {v.price && ` ($${v.price.toFixed(2)})`}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Quantity & Buy Button */}
              <div className="flex flex-wrap gap-4 items-stretch w-full max-w-md">
                
                {/* Quantity */}
                <div className={`flex items-center rounded-full border px-4 py-2 ${
                  theme.isLight ? "border-brand-dark/15 text-brand-dark bg-white/20" : "border-white/20 text-white bg-white/5"
                }`}>
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="hover:scale-110 transition-transform p-1 opacity-70 hover:opacity-100"
                    aria-label="Decrease quantity"
                  >
                    <Minus size={16} strokeWidth={3} />
                  </button>
                  <span className="w-12 text-center font-display text-lg font-black select-none">
                    {quantity}
                  </span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="hover:scale-110 transition-transform p-1 opacity-70 hover:opacity-100"
                    aria-label="Increase quantity"
                  >
                    <Plus size={16} strokeWidth={3} />
                  </button>
                </div>

                {/* Add to Cart button */}
                <button
                  onClick={handleAddCart}
                  disabled={isAdded}
                  className={`flex-1 font-display text-sm font-black uppercase tracking-widest px-8 py-4 rounded-full transition-all duration-500 shadow-xl flex items-center justify-center gap-2 hover:scale-[1.03] ${
                    isAdded 
                      ? "bg-emerald-500 text-white" 
                      : theme.isLight
                        ? "bg-brand-dark text-white hover:bg-brand-orange"
                        : "bg-white text-brand-dark hover:bg-brand-orange hover:text-white"
                  }`}
                >
                  {isAdded ? (
                    <>
                      <CheckCircle size={18} /> Added to Scoop!
                    </>
                  ) : (
                    <>
                      <ShoppingBag size={18} /> Add to Cart
                    </>
                  )}
                </button>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* Wave transition linking Hero to Content */}
      <div 
        className="w-full overflow-hidden leading-[0] translate-y-[-2px]" 
        style={{ backgroundColor: theme.bgColor }}
      >
        <svg viewBox="0 0 1440 120" className="relative block w-full h-[60px] md:h-[100px]" preserveAspectRatio="none">
          <path d="M0,32 C320,96 640,0 960,64 C1280,128 1440,32 1440,32 L1440,120 L0,120 Z" fill="#FCF9F2" />
        </svg>
      </div>

      {/* 2. SPECIFICATIONS & NUTRITION GRID */}
      <section className="py-16 md:py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 items-start">
          
          {/* Left/Middle Column: Description & Ingredients (2/3 width) */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* Full Story Description */}
            <div className="space-y-4">
              <h2 className="font-display text-3xl font-black uppercase tracking-tight text-brand-dark">
                THE SUNSHINE RECIPE
              </h2>
              <p className="font-body text-brand-dark/70 text-base md:text-lg leading-relaxed">
                {product.description || 
                  `Austropical ${product.name} is handcrafted in small batches using premium organic ingredients. We slow-churn our tropical base with ripe organic pulp to lock in the vibrant natural colors and minerals. The result is a clean, refreshing, and incredibly rich superfood treat that is as bright as our beaches, without sacrificing the premium, creamy texture of traditional dairy desserts.`
                }
              </p>
              <p className="font-body text-brand-dark/70 text-base leading-relaxed">
                Our raw ingredients are sourced directly from sustainable family-run farms in Queensland and rainforest collectives, keeping carbon footprints low and nutrition packed high. Scoop with peace of mind.
              </p>
            </div>

            {/* Ingredients Chips */}
            <div>
              <span className="block font-display text-sm font-black uppercase tracking-widest text-brand-orange mb-4">
                ORGANIC INGREDIENTS
              </span>
              <div className="flex flex-wrap gap-2">
                {product.ingredients?.map((ing: string, i: number) => (
                  <span 
                    key={i} 
                    className="bg-white border border-brand-dark/10 px-5 py-3 rounded-full text-sm font-body font-semibold text-brand-dark/80 hover:border-brand-orange hover:bg-white hover:scale-105 transition-all duration-300 shadow-sm flex items-center gap-1.5"
                  >
                    {ing}
                  </span>
                ))}
              </div>
            </div>

            {/* Badging Details */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-6">
              {[
                { label: "100% Organic", desc: "Certified farm sources", icon: "🌱" },
                { label: "Vegan Choice", desc: "Totally dairy-free", icon: "🥥" },
                { label: "Gluten-Free", desc: "Coeliac friendly recipe", icon: "🌾" },
                { label: "Sun Crafted", desc: "Made in sunny Australia", icon: "☀️" }
              ].map((badge, idx) => (
                <div key={idx} className="bg-white/60 backdrop-blur-sm border border-brand-dark/5 p-5 rounded-2xl text-center shadow-sm">
                  <div className="text-3xl mb-2">{badge.icon}</div>
                  <h4 className="font-display text-sm font-black text-brand-dark uppercase leading-tight mb-1">{badge.label}</h4>
                  <p className="font-body text-xs text-brand-dark/55">{badge.desc}</p>
                </div>
              ))}
            </div>

          </div>

          {/* Right Column: Nutrition Facts panel (1/3 width) */}
          <div className="flex justify-center">
            <div className="w-full max-w-[340px] bg-white border-[6px] border-black p-4 text-black shadow-2xl relative font-sans leading-tight">
              
              {/* Heading */}
              <h2 className="font-black text-3xl tracking-tight leading-none text-center uppercase border-b-8 border-black pb-1 mb-1">
                Nutrition Facts
              </h2>
              
              {/* Servings */}
              <div className="text-sm font-bold border-b border-black pb-1">
                {product.category.toLowerCase().includes("bucket") ? (
                  <>
                    <div>3 servings per container</div>
                    <div className="flex justify-between mt-0.5">
                      <span>Serving size</span>
                      <span>1 cup (150g)</span>
                    </div>
                  </>
                ) : product.category.toLowerCase().includes("pop") ? (
                  <>
                    <div>1 serving per container</div>
                    <div className="flex justify-between mt-0.5">
                      <span>Serving size</span>
                      <span>1 pop (80g)</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div>3 servings per container</div>
                    <div className="flex justify-between mt-0.5">
                      <span>Serving size</span>
                      <span>1 serving (150g)</span>
                    </div>
                  </>
                )}
              </div>

              {/* Amount per serving */}
              <div className="flex justify-between items-end border-b-8 border-black py-1 mb-1.5">
                <span className="font-extrabold text-xs">Amount Per Serving</span>
                <span className="font-black text-xl leading-none">Calories</span>
                <span className="font-black text-3xl leading-none">{nutrition.calories}</span>
              </div>

              {/* Daily Value Indicator */}
              <div className="text-right text-xxs font-extrabold border-b border-black pb-1 mb-1.5">% Daily Value*</div>

              {/* Nutrient Rows */}
              <div className="space-y-1.5 text-sm border-b-8 border-black pb-2 mb-2">
                
                <div className="flex justify-between border-b border-black/15 pb-1">
                  <span><strong>Total Fat</strong> {nutrition.fat}g</span>
                  <strong>{Math.round((nutrition.fat / 65) * 100)}%</strong>
                </div>
                
                <div className="flex justify-between border-b border-black/15 pb-1 pl-4 text-xs">
                  <span>Saturated Fat {Math.max(0.1, nutrition.fat * 0.15).toFixed(1)}g</span>
                  <strong>{Math.round((Math.max(0.1, nutrition.fat * 0.15) / 20) * 100)}%</strong>
                </div>

                <div className="flex justify-between border-b border-black/15 pb-1 pl-4 text-xs">
                  <span>Trans Fat 0g</span>
                  <strong>0%</strong>
                </div>

                <div className="flex justify-between border-b border-black/15 pb-1">
                  <span><strong>Sodium</strong> 15mg</span>
                  <strong>1%</strong>
                </div>

                <div className="flex justify-between border-b border-black/15 pb-1">
                  <span><strong>Total Carbohydrate</strong> {nutrition.carbs}g</span>
                  <strong>{Math.round((nutrition.carbs / 300) * 100)}%</strong>
                </div>

                <div className="flex justify-between border-b border-black/15 pb-1 pl-4 text-xs">
                  <span>Dietary Fiber {nutrition.fiber}g</span>
                  <strong>{Math.round((nutrition.fiber / 25) * 100)}%</strong>
                </div>

                <div className="flex justify-between border-b border-black/15 pb-1 pl-4 text-xs">
                  <span>Total Sugars {nutrition.sugar}g</span>
                  <span></span>
                </div>

                <div className="flex justify-between border-b border-black/15 pb-1 pl-8 text-xxs opacity-70">
                  <span>Includes 0g Added Sugars</span>
                  <strong>0%</strong>
                </div>

                <div className="flex justify-between border-b border-black/15 pb-1">
                  <span><strong>Protein</strong> {nutrition.protein}g</span>
                  <strong>{Math.round((nutrition.protein / 50) * 100)}%</strong>
                </div>

              </div>

              {/* Footnote */}
              <div className="text-xxs font-medium leading-normal opacity-75">
                * The % Daily Value (DV) tells you how much a nutrient in a serving of food contributes to a daily diet. 2,000 calories a day is used for general nutrition advice.
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* 3. INTERACTIVE REVIEWS SECTION */}
      <section className="bg-white/40 border-y border-brand-dark/5 py-20 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            
            {/* Reviews Form (Left 1/3) */}
            <div className="bg-white p-8 rounded-3xl border border-brand-dark/5 shadow-xl">
              <span className="block font-display text-xs font-black uppercase tracking-widest text-brand-pink mb-2">
                HAVE A SPOONFUL?
              </span>
              <h3 className="font-display text-2xl font-black uppercase mb-6 text-brand-dark">
                WRITE A REVIEW
              </h3>

              <form onSubmit={handleReviewSubmit} className="space-y-4">
                
                {/* Review Success Popup */}
                <AnimatePresence>
                  {reviewSuccess && (
                    <motion.div 
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.9, opacity: 0 }}
                      className="bg-emerald-500 text-white p-3 rounded-xl text-xs font-body font-semibold flex items-center gap-2 mb-4"
                    >
                      <CheckCircle size={16} /> Review submitted for approval!
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Rating selection stars */}
                <div>
                  <span className="block text-xs uppercase font-bold text-brand-dark/60 mb-2 font-body">Scoop Rating:</span>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setReviewRating(star)}
                        className="hover:scale-125 transition-transform"
                      >
                        <Star
                          size={24}
                          className={star <= reviewRating ? "fill-brand-orange text-brand-orange" : "text-brand-dark/15"}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label htmlFor="revName" className="block text-xs uppercase font-bold text-brand-dark/60 mb-1 font-body">Your Name:</label>
                  <input
                    id="revName"
                    type="text"
                    required
                    value={reviewName}
                    onChange={(e) => setReviewName(e.target.value)}
                    placeholder="Scoop Lover"
                    className="w-full px-4 py-3 rounded-xl border border-brand-dark/10 focus:outline-none focus:border-brand-orange text-sm font-body"
                  />
                </div>

                <div>
                  <label htmlFor="revEmail" className="block text-xs uppercase font-bold text-brand-dark/60 mb-1 font-body">Email Address:</label>
                  <input
                    id="revEmail"
                    type="email"
                    required
                    value={reviewEmail}
                    onChange={(e) => setReviewEmail(e.target.value)}
                    placeholder="email@example.com"
                    className="w-full px-4 py-3 rounded-xl border border-brand-dark/10 focus:outline-none focus:border-brand-orange text-sm font-body"
                  />
                </div>

                <div>
                  <label htmlFor="revTitle" className="block text-xs uppercase font-bold text-brand-dark/60 mb-1 font-body">Title (Optional):</label>
                  <input
                    id="revTitle"
                    type="text"
                    value={reviewTitle}
                    onChange={(e) => setReviewTitle(e.target.value)}
                    placeholder="Best ice cream ever!"
                    className="w-full px-4 py-3 rounded-xl border border-brand-dark/10 focus:outline-none focus:border-brand-orange text-sm font-body"
                  />
                </div>

                <div>
                  <label htmlFor="revBody" className="block text-xs uppercase font-bold text-brand-dark/60 mb-1 font-body">Review Comments:</label>
                  <textarea
                    id="revBody"
                    required
                    rows={4}
                    value={reviewBody}
                    onChange={(e) => setReviewBody(e.target.value)}
                    placeholder="Tell us what you liked about this flavor..."
                    className="w-full px-4 py-3 rounded-xl border border-brand-dark/10 focus:outline-none focus:border-brand-orange text-sm font-body resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full font-display text-xs font-black uppercase tracking-wider bg-brand-dark hover:bg-brand-orange text-white py-4 rounded-xl transition-colors shadow-lg"
                >
                  Submit Scoop Review
                </button>

              </form>
            </div>

            {/* Reviews List (Right 2/3) */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center justify-between pb-6 border-b border-brand-dark/10">
                <h3 className="font-display text-2xl font-black uppercase text-brand-dark">
                  CUSTOMER SCOOPS
                </h3>
                <div className="flex items-center gap-2">
                  <MessageSquare size={18} className="text-brand-orange" />
                  <span className="font-body text-sm font-bold text-brand-dark/60">
                    {reviews.length} total reviews
                  </span>
                </div>
              </div>

              <div className="space-y-6 max-h-[580px] overflow-y-auto pr-2 no-scrollbar">
                {reviews.map((rev) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    key={rev.id}
                    className="bg-white p-6 rounded-2xl border border-brand-dark/5 shadow-sm space-y-3"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="font-display text-sm font-black text-brand-dark uppercase block">
                          {rev.customerName}
                        </span>
                        <span className="text-[10px] text-brand-dark/45 font-body">{rev.createdAt}</span>
                      </div>
                      {renderStars(rev.rating)}
                    </div>
                    <div>
                      <h4 className="font-display text-sm font-black text-brand-dark uppercase">{rev.title}</h4>
                      <p className="font-body text-sm text-brand-dark/65 leading-relaxed mt-1">{rev.body}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* 4. RELATED PRODUCTS CAROUSEL (3 columns) */}
      {relatedProducts.length > 0 && (
        <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="font-display text-xs font-black uppercase tracking-[0.25em] text-brand-orange">
              STILL CRAVING?
            </span>
            <h2 className="mt-2 font-display text-3xl md:text-4xl font-black uppercase text-brand-dark">
              YOU MAY ALSO LIKE
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedProducts.map((p) => {
              const isLight = p.textColor === "#0D0D0D" || p.bgColor === "#FFD700" || p.bgColor === "#FFF";
              return (
                <div
                  key={p.id}
                  className="rounded-3xl p-6 shadow-xl flex flex-col justify-between h-[360px] relative transition-transform hover:scale-[1.02] duration-300"
                  style={{ backgroundColor: p.bgColor }}
                >
                  <Link href={`/products/${p.id}`} className="absolute inset-0 z-0 rounded-3xl" />
                  
                  <div className="z-10 pointer-events-none">
                    <span className={`text-[9px] uppercase tracking-widest font-black ${isLight ? "text-brand-dark/60" : "text-white/60"}`}>
                      {p.category}
                    </span>
                    <h3 className={`font-display text-lg font-black uppercase mt-1 leading-tight ${isLight ? "text-brand-dark" : "text-white"}`}>
                      {p.name}
                    </h3>
                  </div>

                  <div className="relative w-full h-[150px] my-3 flex items-center justify-center pointer-events-none">
                    <div className="absolute w-28 h-28 bg-black/10 rounded-full blur-2xl pointer-events-none" />
                    <Image
                      src={p.image}
                      alt={p.name}
                      fill
                      sizes="150px"
                      className="object-contain drop-shadow-[0_12px_24px_rgba(0,0,0,0.3)]"
                    />
                  </div>

                  <div className="flex justify-between items-center z-10 pointer-events-none mt-auto">
                    <div>
                      <span className={`text-[9px] uppercase tracking-widest font-bold ${isLight ? "text-brand-dark/50" : "text-white/50"}`}>PRICE</span>
                      <p className={`font-display text-xl font-black ${isLight ? "text-brand-dark" : "text-white"}`}>{p.price}</p>
                    </div>
                    <span className={`font-display text-[9px] font-black uppercase tracking-wider px-4 py-2.5 rounded-full ${
                      isLight ? "bg-brand-dark text-white" : "bg-white text-brand-dark"
                    }`}>
                      Scoop Now
                    </span>
                  </div>

                </div>
              );
            })}
          </div>
        </section>
      )}

    </div>
  );
}
