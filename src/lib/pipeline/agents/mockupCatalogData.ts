export interface StoreProductVariant {
  name: string;
  colorHex?: string;
  image?: string;
}

export interface StoreProductItem {
  id: string;
  title: string;
  tagline: string;
  priceINR: number;
  originalPriceINR: number;
  priceUSD: number;
  originalPriceUSD: number;
  discountBadge: string;
  badge?: string;
  category: "AI Tools" | "Laptops" | "Mobile & Accessories" | "Gaming" | "Wearables" | "Smart Home" | "Travel Gear" | "Storage" | "Security" | "Deals";
  isPhysical: boolean;
  stock: number;
  inStock: boolean;
  rating: number;
  reviewsCount: number;
  isFlashDeal?: boolean;
  isTrending?: boolean;
  image: string;
  galleryImages: string[];
  colors: StoreProductVariant[];
  shippingDetails: {
    origin: string;
    estimatedDelivery: string;
    shippingCost: string;
    carrier: string;
    supportedCountries?: string[];
  };
  features: string[];
  specs?: { label: string; value: string }[];
  faqs?: { q: string; a: string }[];
  supplier?: string;
  supplierOrigin?: string;
  availability?: string;
  complianceVerified?: boolean;
}

export const STORE_MOCKUP_PRODUCTS: StoreProductItem[] = [
  // 1. Hero / Flash Deal: Wireless ANC Headphones
  {
    id: "wireless-anc-headphones",
    title: "Wireless ANC Headphones with Deep Bass & 60H Battery",
    tagline: "Immersive sound, active noise cancellation, and all-day comfort for work, travel and gaming.",
    priceINR: 2399,
    originalPriceINR: 3999,
    priceUSD: 28.99,
    originalPriceUSD: 49.99,
    discountBadge: "-40%",
    badge: "Bestseller",
    category: "Gaming",
    isPhysical: true,
    stock: 45,
    inStock: true,
    rating: 4.8,
    reviewsCount: 2418,
    isFlashDeal: true,
    isTrending: false,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&auto=format&fit=crop&q=80",
    ],
    colors: [
      { name: "Matte Black", colorHex: "#111827" },
      { name: "Midnight Blue", colorHex: "#1e3a8a" },
      { name: "Silver Ash", colorHex: "#94a3b8" },
    ],
    shippingDetails: {
      origin: "Shenzhen Air Logistics Center",
      estimatedDelivery: "3 - 5 Business Days",
      shippingCost: "Free Shipping",
      carrier: "Blue Dart / Delhivery Express",
      supportedCountries: ["India", "USA", "UK", "Canada", "Australia", "UAE"],
    },
    features: [
      "Hybrid Active Noise Cancellation blocks up to 38dB of ambient background chatter",
      "Massive 60-Hour playtime with ultra-fast USB-C charge (10 mins = 5 hours)",
      "Custom 40mm titanium diaphragm drivers delivering thunderous deep bass",
      "Ultra-soft memory protein ear cushions with aerospace-grade swivel hinges",
    ],
    supplier: "CJ Dropshipping Global",
    supplierOrigin: "Shenzhen Air Logistics Center",
    availability: "IN_STOCK_DROPSHIP",
    complianceVerified: true,
    specs: [
      { label: "Bluetooth Version", value: "v5.3 Low-Latency" },
      { label: "Battery Life", value: "60 Hours (ANC Off) / 45 Hours (ANC On)" },
      { label: "Driver Size", value: "40mm Titanium Dynamic" },
      { label: "Weight", value: "245 grams" },
    ],
    faqs: [
      { q: "Can I connect this to two devices simultaneously?", a: "Yes, multi-point pairing allows seamless switching between laptop and smartphone." },
      { q: "What is included inside the box?", a: "Headphones, premium hard-shell travel case, USB-C braided charging cable, 3.5mm audio cable." },
    ],
  },

  // 2. Flash Deal: RGB Mechanical Gaming Keyboard
  {
    id: "rgb-mechanical-gaming-keyboard",
    title: "RGB Mechanical Gaming Keyboard",
    tagline: "Custom hot-swappable tactile linear switches with per-key dynamic RGB backlighting.",
    priceINR: 1299,
    originalPriceINR: 1999,
    priceUSD: 16.99,
    originalPriceUSD: 24.99,
    discountBadge: "-35%",
    badge: "Hot Deal",
    category: "Gaming",
    isPhysical: true,
    stock: 82,
    inStock: true,
    rating: 4.7,
    reviewsCount: 1100,
    isFlashDeal: true,
    isTrending: false,
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&auto=format&fit=crop&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=800&auto=format&fit=crop&q=80",
    ],
    colors: [
      { name: "RGB Black", colorHex: "#0f172a" },
      { name: "Retro White", colorHex: "#f8fafc" },
    ],
    shippingDetails: {
      origin: "Express Depot",
      estimatedDelivery: "3 - 6 Business Days",
      shippingCost: "Free Shipping",
      carrier: "Delhivery / DHL",
      supportedCountries: ["India", "USA", "UK"],
    },
    features: [
      "Hot-swappable switches compatible with 3-pin & 5-pin mechanical switches",
      "18 pre-programmed RGB lighting effects with reactive typing modes",
      "Double-shot PBT keycaps resist shine and fading over millions of keypresses",
    ],
    supplier: "AliExpress Pro Verified",
    supplierOrigin: "Express Depot Shenzhen",
    availability: "IN_STOCK_DROPSHIP",
    complianceVerified: true,
  },

  // 3. Flash Deal: Pro Wireless Gaming Mouse
  {
    id: "pro-wireless-gaming-mouse",
    title: "Pro Wireless Gaming Mouse (26K DPI Optical)",
    tagline: "Ultra-lightweight 58g ergonomic chassis with pixel-perfect flawless sensor tracking.",
    priceINR: 999,
    originalPriceINR: 1999,
    priceUSD: 12.99,
    originalPriceUSD: 24.99,
    discountBadge: "-50%",
    badge: "Trending",
    category: "Gaming",
    isPhysical: true,
    stock: 120,
    inStock: true,
    rating: 4.8,
    reviewsCount: 3900,
    isFlashDeal: true,
    isTrending: true,
    image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=800&auto=format&fit=crop&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&auto=format&fit=crop&q=80",
    ],
    colors: [
      { name: "Matte Black", colorHex: "#000000" },
      { name: "Ghost White", colorHex: "#ffffff" },
    ],
    shippingDetails: {
      origin: "Direct Express",
      estimatedDelivery: "2 - 5 Business Days",
      shippingCost: "Free Shipping",
      carrier: "Blue Dart / FedEx",
      supportedCountries: ["India", "USA", "UK", "Canada", "Australia"],
    },
    features: [
      "PAW3395 26,000 DPI flagship optical sensor with 650 IPS speed",
      "Tri-mode: 2.4G 1000Hz polling rate, Bluetooth 5.2, and braided USB-C",
      "100% Virgin PTFE skates for silky smooth effortless gliding across pads",
    ],
    supplier: "CJ Dropshipping Global",
    supplierOrigin: "Direct Express Depot",
    availability: "IN_STOCK_DROPSHIP",
    complianceVerified: true,
  },

  // 4. Flash Deal: Smart Watch Pro (Health & Fitness)
  {
    id: "smart-watch-pro-health",
    title: "Smart Watch Pro (Health & Fitness AMOLED)",
    tagline: "1.96-inch curved AMOLED display with 24/7 heart-rate, SpO2 & sleep tracking.",
    priceINR: 2799,
    originalPriceINR: 3999,
    priceUSD: 34.99,
    originalPriceUSD: 49.99,
    discountBadge: "-30%",
    badge: "Bestseller",
    category: "Wearables",
    isPhysical: true,
    stock: 60,
    inStock: true,
    rating: 4.7,
    reviewsCount: 2200,
    isFlashDeal: true,
    isTrending: false,
    image: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800&auto=format&fit=crop&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80",
    ],
    colors: [
      { name: "Space Black", colorHex: "#18181b" },
      { name: "Rose Gold", colorHex: "#fb7185" },
    ],
    shippingDetails: {
      origin: "Shenzhen Fast Hub",
      estimatedDelivery: "4 - 7 Business Days",
      shippingCost: "Free Shipping",
      carrier: "Blue Dart Express",
      supportedCountries: ["India", "USA", "UK", "UAE"],
    },
    features: [
      "Crisp 60Hz AMOLED screen with Always-On display capability",
      "Bluetooth calling with noise-canceling dual HD microphone",
      "IP68 waterproof certified for swimming and heavy workouts",
    ],
    supplier: "AliExpress Pro Verified",
    supplierOrigin: "Shenzhen Fast Hub",
    availability: "IN_STOCK_DROPSHIP",
    complianceVerified: true,
  },

  // 5. Trending: 4K Camera Drone with GPS & Auto Return
  {
    id: "4k-camera-drone-gps",
    title: "4K Camera Drone with GPS & Auto Return",
    tagline: "Foldable brushless motor quadcopter with 3-axis mechanical gimbal and 5km video transmission.",
    priceINR: 18999,
    originalPriceINR: 24999,
    priceUSD: 229.99,
    originalPriceUSD: 299.99,
    discountBadge: "24% OFF",
    badge: "Top Tech",
    category: "Travel Gear",
    isPhysical: true,
    stock: 24,
    inStock: true,
    rating: 4.7,
    reviewsCount: 865,
    isFlashDeal: false,
    isTrending: true,
    image: "https://images.unsplash.com/photo-1521405924368-64c5b84bec60?w=800&auto=format&fit=crop&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1521405924368-64c5b84bec60?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1495594430525-e63434930a44?w=800&auto=format&fit=crop&q=80",
    ],
    colors: [{ name: "Carbon Gray", colorHex: "#374151" }],
    shippingDetails: {
      origin: "Air Freight Hub",
      estimatedDelivery: "5 - 8 Business Days",
      shippingCost: "Free Insured Delivery",
      carrier: "DHL Express / Blue Dart",
      supportedCountries: ["India", "USA", "UK", "Australia", "UAE"],
    },
    features: [
      "True 4K HDR Sony sensor captures breathtaking aerial video at 60fps",
      "GPS/GLONASS satellite positioning with one-key auto return on low battery",
      "Dual intelligent flight batteries providing up to 62 minutes total flight time",
    ],
    supplier: "CJ Dropshipping Global",
    supplierOrigin: "Air Freight Hub",
    availability: "IN_STOCK_DROPSHIP",
    complianceVerified: true,
  },

  // 6. Trending: Portable Power Station 600W (Fast Charging)
  {
    id: "portable-power-station-600w",
    title: "Portable Power Station 600W (Fast Charging)",
    tagline: "512Wh LiFePO4 battery pack with 220V AC outlets, 100W PD USB-C, and solar input.",
    priceINR: 21999,
    originalPriceINR: 29999,
    priceUSD: 269.99,
    originalPriceUSD: 359.99,
    discountBadge: "27% OFF",
    badge: "Heavy Duty",
    category: "Travel Gear",
    isPhysical: true,
    stock: 18,
    inStock: true,
    rating: 4.8,
    reviewsCount: 423,
    isFlashDeal: false,
    isTrending: true,
    image: "https://images.unsplash.com/photo-1681263576084-e054b2d89903?w=800&auto=format&fit=crop&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1681263576084-e054b2d89903?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1679274649021-067d0003d9bf?w=800&auto=format&fit=crop&q=80",
    ],
    colors: [{ name: "Industrial Gray", colorHex: "#4b5563" }],
    shippingDetails: {
      origin: "Special Heavy Cargo Hub",
      estimatedDelivery: "4 - 7 Business Days",
      shippingCost: "Free Freight",
      carrier: "SafeXpress / FedEx",
      supportedCountries: ["India", "USA", "UK"],
    },
    features: [
      "Durable LiFePO4 battery chemistry rated for 3,500+ charge cycles (10+ years)",
      "Charges from 0% to 80% in just 50 minutes via wall outlet",
      "Powers mini-fridges, laptops, CPAP machines, and camping gear effortlessly",
    ],
    supplier: "AliExpress Pro Verified",
    supplierOrigin: "Special Heavy Cargo Hub",
    availability: "IN_STOCK_DROPSHIP",
    complianceVerified: true,
  },

  // 7. Trending: Universal Travel Adapter (150+ Countries)
  {
    id: "universal-travel-adapter-150-countries",
    title: "Universal Travel Adapter (150+ Countries)",
    tagline: "All-in-one worldwide international plug with dual 65W GaN USB-C fast charging.",
    priceINR: 1099,
    originalPriceINR: 1499,
    priceUSD: 14.99,
    originalPriceUSD: 19.99,
    discountBadge: "27% OFF",
    badge: "Must Have",
    category: "Travel Gear",
    isPhysical: true,
    stock: 180,
    inStock: true,
    rating: 4.7,
    reviewsCount: 1300,
    isFlashDeal: false,
    isTrending: true,
    image: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=800&auto=format&fit=crop&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1585338107529-13afc5f02586?w=800&auto=format&fit=crop&q=80",
    ],
    colors: [
      { name: "Jet Black", colorHex: "#0a0a0a" },
      { name: "Arctic White", colorHex: "#ffffff" },
    ],
    shippingDetails: {
      origin: "Express Depot",
      estimatedDelivery: "3 - 5 Business Days",
      shippingCost: "Free Delivery",
      carrier: "Blue Dart / Delhivery",
      supportedCountries: ["India", "USA", "UK", "Australia", "EU", "UAE", "Singapore"],
    },
    features: [
      "Built-in US, UK, EU, and AU slide-out pins for seamless global compatibility",
      "65W GaN power delivery charges laptops, phones, and tablets at full speed",
      "Auto-resetting 8A ceramic fuse guards against over-voltage spikes",
    ],
    supplier: "AliExpress Pro Verified",
    supplierOrigin: "Hong Kong / Shenzhen Air Depot",
    availability: "IN_STOCK_DROPSHIP",
    complianceVerified: true,
  },

  // 8. Trending: 27" 4K UHD Monitor (IPS, USB-C, HDR)
  {
    id: "27-inch-4k-uhd-monitor",
    title: "27\" 4K UHD Monitor (IPS, USB-C, HDR)",
    tagline: "3840×2160 frameless IPS panel with 99% sRGB color accuracy and 65W USB-C PD.",
    priceINR: 24999,
    originalPriceINR: 32999,
    priceUSD: 299.99,
    originalPriceUSD: 399.99,
    discountBadge: "24% OFF",
    badge: "Pro Display",
    category: "Laptops",
    isPhysical: true,
    stock: 15,
    inStock: true,
    rating: 4.8,
    reviewsCount: 523,
    isFlashDeal: false,
    isTrending: true,
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&auto=format&fit=crop&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&auto=format&fit=crop&q=80",
    ],
    colors: [{ name: "Space Gray Bezel", colorHex: "#1f2937" }],
    shippingDetails: {
      origin: "National Display Warehouse",
      estimatedDelivery: "3 - 6 Business Days",
      shippingCost: "Free Insured Courier",
      carrier: "Blue Dart Surface / DHL",
      supportedCountries: ["India", "USA"],
    },
    features: [
      "Stunning 4K resolution (3840x2160) with HDR10 deep contrast and ultra-wide viewing angles",
      "Single USB-C cable transmits 4K display, high-speed data, and charges laptop at 65W",
      "TÜV Rheinland certified low blue light and flicker-free eye care filter",
    ],
    supplier: "CJ Dropshipping Global",
    supplierOrigin: "National Display Warehouse",
    availability: "IN_STOCK_DROPSHIP",
    complianceVerified: true,
  },

  // 9. Trending: True Wireless Earbuds (ANC, 40H Battery)
  {
    id: "true-wireless-earbuds-anc",
    title: "True Wireless Earbuds (ANC, 40H Battery)",
    tagline: "Bluetooth 5.3 earbuds with active noise cancelation, wireless charging and IPX5.",
    priceINR: 2499,
    originalPriceINR: 3999,
    priceUSD: 29.99,
    originalPriceUSD: 49.99,
    discountBadge: "38% OFF",
    badge: "Audio Bestseller",
    category: "Mobile & Accessories",
    isPhysical: true,
    stock: 95,
    inStock: true,
    rating: 4.7,
    reviewsCount: 2900,
    isFlashDeal: false,
    isTrending: true,
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&auto=format&fit=crop&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&auto=format&fit=crop&q=80",
    ],
    colors: [
      { name: "Obsidian Black", colorHex: "#09090b" },
      { name: "Pearl White", colorHex: "#f4f4f5" },
    ],
    shippingDetails: {
      origin: "Express Depot",
      estimatedDelivery: "3 - 5 Business Days",
      shippingCost: "Free Shipping",
      carrier: "Blue Dart / Delhivery",
      supportedCountries: ["India", "USA", "UK", "Canada", "Australia"],
    },
    features: [
      "35dB Hybrid Active Noise Cancellation with Transparency Awareness mode",
      "Total 40 hours playtime with pocket-sized Qi wireless charging case",
      "4-mic beamforming array with AI environmental noise reduction for crystal clear calls",
    ],
    supplier: "AliExpress Pro Verified",
    supplierOrigin: "Express Audio Depot",
    availability: "IN_STOCK_DROPSHIP",
    complianceVerified: true,
  },

  // 10. AI Software / Toolkits
  {
    id: "ai-prompt-powerpack-2026",
    title: "500+ Ultimate AI Prompt PowerPack 2026",
    tagline: "Top AI software & toolkits for work, content & business automation.",
    priceINR: 499,
    originalPriceINR: 1999,
    priceUSD: 6.99,
    originalPriceUSD: 24.99,
    discountBadge: "75% OFF",
    badge: "AI Essential",
    category: "AI Tools",
    isPhysical: false,
    stock: 9999,
    inStock: true,
    rating: 4.9,
    reviewsCount: 3120,
    isFlashDeal: false,
    isTrending: false,
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80",
    ],
    colors: [{ name: "Digital Instant Download", colorHex: "#6366f1" }],
    shippingDetails: {
      origin: "Cloud Instant Dispatch",
      estimatedDelivery: "Instant (0 Seconds)",
      shippingCost: "Free Instant Access",
      carrier: "Secure Cloud API",
      supportedCountries: ["Worldwide"],
    },
    features: [
      "500+ production-tested system prompts for Claude 4.5, GPT-5 & Gemini 2",
      "Programmatic SEO and high-RPM blog content generation blueprints",
      "Algorithmic quant trading and risk-management scripts included",
    ],
  },
];
