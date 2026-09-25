export interface AppleProduct {
  id: string;
  name: string;
  shortName: string;
  slug: string;
  category: "iphone" | "macbook" | "ipad" | "watch" | "airpods" | "accessory";
  badge?: string;
  tagline: string;
  startingPriceInr: number;
  originalPriceInr?: number;
  rating: number;
  reviewCount: number;
  releaseYear: number;
  specs: {
    display: string;
    chip: string;
    camera: string;
    battery: string;
    storage: string;
    colors: string[];
    weight: string;
    biometrics: string;
    connectivity: string;
    aiFeatures: string;
  };
  keyHighlights: string[];
  retailers: {
    store: "Flipkart" | "Croma" | "Reliance Digital" | "Vijay Sales" | "Amazon" | "Apple Store";
    priceInr: number;
    offerText: string;
    affiliateUrl: string;
    inStock: boolean;
    emiStartsAt: string;
  }[];
  heroImage: string;
  pros?: string[];
  cons?: string[];
  verdict?: string;
}

export interface AppleAccessory {
  id: string;
  name: string;
  category: "case" | "charger" | "powerbank" | "screen-protector" | "watch-band" | "cable";
  compatibleWith: string;
  brand: string;
  priceInr: number;
  mrpInr: number;
  discountPercent: number;
  commissionTier: "Very High (10-12%)" | "High (8-10%)" | "Medium (6-8%)";
  rating: number;
  reviewsCount: number;
  badge?: string;
  imageUrl: string;
  buyUrl: string;
  retailer: "Amazon" | "Flipkart" | "Croma";
  highlights: string[];
}

export interface AppleDeal {
  id: string;
  title: string;
  product: string;
  category: string;
  store: "Flipkart" | "Croma" | "Reliance Digital" | "Vijay Sales" | "Amazon";
  currentPriceInr: number;
  originalPriceInr: number;
  discountAmountInr: number;
  bankOffer: string;
  exchangeBonus: string;
  dealType: "Lightning Deal" | "Bank Cashback" | "Price Drop" | "Bundle Deal";
  expiryHours: number;
  affiliateUrl: string;
  isHot: boolean;
}

export const APPLE_PRODUCTS: AppleProduct[] = [
  {
    id: "iphone-18-pro-max",
    name: "Apple iPhone 18 Pro Max",
    shortName: "18 Pro Max",
    slug: "iphone-18-pro-max",
    category: "iphone",
    badge: "Flagship 2026",
    tagline: "The Zenith of Mobile Engineering with 2nm A20 Pro & Variable Aperture.",
    startingPriceInr: 159900,
    originalPriceInr: 169900,
    rating: 4.9,
    reviewCount: 3420,
    releaseYear: 2026,
    specs: {
      display: "6.9\" Super Retina XDR OLED, 120Hz ProMotion, 3000 nits peak, Micro-lens Array",
      chip: "Apple A20 Pro (TSMC 2nm GAA process, 6-core CPU, 6-core GPU, 32-core Neural Engine)",
      camera: "Triple 48MP: 48MP Main f/1.4-f/2.8 Variable Aperture + 48MP Ultra-Wide Macro + 48MP 5x Tetraprism Periscope",
      battery: "4,850 mAh (Up to 34 hours video playback, 35W wired, 25W MagSafe Qi2)",
      storage: "256GB / 512GB / 1TB / 2TB NVMe",
      colors: ["Natural Titanium", "Desert Titanium", "Space Black", "Deep Marine Blue"],
      weight: "223 grams",
      biometrics: "Under-Display Face ID + Action Button 2.0",
      connectivity: "Wi-Fi 7, 5G Sub-6 & mmWave, Bluetooth 5.4, Ultra Wideband Gen 3, Thread",
      aiFeatures: "Apple Intelligence 2.0: Real-time Generative Voice Translation, On-Device Diffusion Editor, Smart Canvas",
    },
    keyHighlights: [
      "Industry-first mechanical variable aperture (f/1.4 to f/2.8) for cinema-grade optical bokeh",
      "Next-gen 2nm TSMC A20 Pro delivers 30% lower power draw and 35% higher GPU compute",
      "25W MagSafe 2.0 fast charging juices 50% in just 19 minutes",
      "Grade 5 aerospace titanium frame with scratch-resistant diamond-like amorphous coating",
    ],
    retailers: [
      {
        store: "Flipkart",
        priceInr: 154900,
        offerText: "₹5,000 Instant Discount on HDFC & ICICI Cards + Extra ₹6,000 Exchange Bonus",
        affiliateUrl: "https://www.flipkart.com/search?q=iphone+18+pro+max",
        inStock: true,
        emiStartsAt: "₹6,454/mo (24 mos No-Cost EMI)",
      },
      {
        store: "Croma",
        priceInr: 154900,
        offerText: "₹5,000 HDFC Card Cashback + 5% Tata NeuCoins + 24-hr Free Express Store Pickup",
        affiliateUrl: "https://www.croma.com/search/?text=iphone+18+pro+max",
        inStock: true,
        emiStartsAt: "₹6,454/mo No-Cost EMI",
      },
      {
        store: "Reliance Digital",
        priceInr: 155900,
        offerText: "₹4,000 Instant Card Rebate + 10,000 JioPoints Voucher for JioFiber / AirFiber",
        affiliateUrl: "https://www.reliancedigital.com/search?q=iphone%2018%20pro%20max",
        inStock: true,
        emiStartsAt: "₹6,495/mo (No-Cost)",
      },
      {
        store: "Vijay Sales",
        priceInr: 155900,
        offerText: "₹4,500 Instant Cashback on Standard Chartered/HDFC + Free Belkin Screen Protector",
        affiliateUrl: "https://www.vijaysales.com/search/iphone-18-pro-max",
        inStock: true,
        emiStartsAt: "₹6,495/mo EMI",
      },
      {
        store: "Amazon",
        priceInr: 159900,
        offerText: "Prime 1-Day Express Delivery + ₹3,000 Amazon Pay ICICI Cashback + No Cost EMI",
        affiliateUrl: "https://www.amazon.in/s?k=iphone+18+pro+max",
        inStock: true,
        emiStartsAt: "₹6,662/mo",
      },
    ],
    heroImage: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=1200&auto=format&fit=crop&q=80",
    pros: [
      "Revolutionary variable aperture lens produces unmatched native low-light shots and real bokeh",
      "TSMC 2nm A20 Pro handles console-level ray-tracing and complex on-device LLMs smoothly",
      "Best-in-class 34-hour battery endurance with cool thermal graphite-vapor dissipation",
      "Brightest smartphone display ever tested (3,000 nits peak outdoors)",
    ],
    cons: [
      "Premium pricing requires significant investment",
      "223g chassis feels hefty during prolonged single-handed usage",
    ],
    verdict: "The undisputed smartphone king of 2026. If you demand unmatched photographic flexibility, industry-leading battery stamina, and full on-device AI power, the 18 Pro Max is worth every single rupee.",
  },
  {
    id: "iphone-18-pro",
    name: "Apple iPhone 18 Pro",
    shortName: "18 Pro",
    slug: "iphone-18-pro",
    category: "iphone",
    badge: "Compact Powerhouse",
    tagline: "Pro-tier performance and 5x optical zoom in an ultra-comfortable 6.3\" form factor.",
    startingPriceInr: 134900,
    originalPriceInr: 139900,
    rating: 4.8,
    reviewCount: 2180,
    releaseYear: 2026,
    specs: {
      display: "6.3\" Super Retina XDR OLED, 120Hz ProMotion, 3000 nits peak",
      chip: "Apple A20 Pro (2nm GAA, 6-core CPU, 6-core GPU, 32-core NPU)",
      camera: "Triple 48MP: 48MP Variable Aperture Main + 48MP Ultra-Wide + 48MP 5x Periscope Telephoto",
      battery: "3,650 mAh (Up to 28 hours video playback, 35W wired, 25W MagSafe Qi2)",
      storage: "128GB / 256GB / 512GB / 1TB NVMe",
      colors: ["Natural Titanium", "Desert Titanium", "Space Black", "Deep Marine Blue"],
      weight: "189 grams",
      biometrics: "Under-Display Face ID + Action Button 2.0",
      connectivity: "Wi-Fi 7, 5G mmWave/Sub-6, Bluetooth 5.4, UWB Gen 3",
      aiFeatures: "Apple Intelligence 2.0 full suite with on-device generative photo cleanup & Siri 3.0",
    },
    keyHighlights: [
      "Exact same camera array and 2nm A20 Pro processor as the Pro Max in a lighter 189g body",
      "Sublime 6.3\" micro-bezel display with 1-120Hz adaptive ProMotion",
      "Full 5x tetraprism optical periscope zoom is now standard on both Pro sizes",
    ],
    retailers: [
      {
        store: "Flipkart",
        priceInr: 129900,
        offerText: "₹5,000 Instant Discount on HDFC/ICICI Cards + ₹5,000 Exchange Bonus",
        affiliateUrl: "https://www.flipkart.com/search?q=iphone+18+pro",
        inStock: true,
        emiStartsAt: "₹5,412/mo No-Cost EMI",
      },
      {
        store: "Croma",
        priceInr: 129900,
        offerText: "₹5,000 Bank Cashback + Free Croma Screen Protec Plan (1 Year)",
        affiliateUrl: "https://www.croma.com/search/?text=iphone+18+pro",
        inStock: true,
        emiStartsAt: "₹5,412/mo No-Cost EMI",
      },
      {
        store: "Reliance Digital",
        priceInr: 130900,
        offerText: "₹4,000 Bank Rebate + ₹2,000 Store Credit on Apple Accessories",
        affiliateUrl: "https://www.reliancedigital.com/search?q=iphone%2018%20pro",
        inStock: true,
        emiStartsAt: "₹5,454/mo",
      },
      {
        store: "Vijay Sales",
        priceInr: 130900,
        offerText: "₹4,500 Instant Cashback on HDFC + 5,000 V-Points",
        affiliateUrl: "https://www.vijaysales.com/search/iphone-18-pro",
        inStock: true,
        emiStartsAt: "₹5,454/mo",
      },
      {
        store: "Amazon",
        priceInr: 134900,
        offerText: "Prime 1-Day Delivery + 5% Amazon Pay Cashback",
        affiliateUrl: "https://www.amazon.in/s?k=iphone+18+pro",
        inStock: true,
        emiStartsAt: "₹5,620/mo",
      },
    ],
    heroImage: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=1200&auto=format&fit=crop&q=80",
  },
  {
    id: "iphone-18",
    name: "Apple iPhone 18",
    shortName: "iPhone 18",
    slug: "iphone-18",
    category: "iphone",
    badge: "Mainstream Champion",
    tagline: "The everyman flagship. Apple Intelligence, 48MP Dual Fusion cameras, and vibrant colors.",
    startingPriceInr: 79900,
    originalPriceInr: 82900,
    rating: 4.7,
    reviewCount: 1890,
    releaseYear: 2026,
    specs: {
      display: "6.1\" Super Retina XDR OLED, 90Hz Dynamic Refresh, 2200 nits peak",
      chip: "Apple A20 Bionic (3nm enhanced, 6-core CPU, 5-core GPU, 16-core NPU)",
      camera: "Dual Fusion 48MP: 48MP Main f/1.6 with 2x lossless sensor-crop + 48MP Ultra-Wide Macro",
      battery: "3,560 mAh (Up to 23 hours video playback, 30W wired, 15W MagSafe)",
      storage: "128GB / 256GB / 512GB",
      colors: ["Teal Green", "Ultramarine", "Pink", "White", "Black"],
      weight: "172 grams",
      biometrics: "Dynamic Island Face ID + Action Button",
      connectivity: "Wi-Fi 6E, 5G, Bluetooth 5.3, UWB Gen 2",
      aiFeatures: "Apple Intelligence core suite: Writing Tools, Clean Up photo remover, Genmoji",
    },
    keyHighlights: [
      "All-new 90Hz SmoothMotion display brings fluid scrolling to standard iPhone buyers",
      "Powerful A20 Bionic processor enables seamless on-device AI without phone overheating",
      "Camera Control capacitive touch button for instant focus and snap",
    ],
    retailers: [
      {
        store: "Flipkart",
        priceInr: 74900,
        offerText: "Flat ₹5,000 Instant HDFC Card Discount + Extra ₹4,000 Exchange Bonus",
        affiliateUrl: "https://www.flipkart.com/search?q=iphone+18",
        inStock: true,
        emiStartsAt: "₹3,120/mo No-Cost EMI",
      },
      {
        store: "Croma",
        priceInr: 74900,
        offerText: "₹5,000 Instant Card Cashback + 12-month No-Cost EMI",
        affiliateUrl: "https://www.croma.com/search/?text=iphone+18",
        inStock: true,
        emiStartsAt: "₹3,120/mo",
      },
      {
        store: "Reliance Digital",
        priceInr: 75900,
        offerText: "₹4,000 Bank Rebate + ₹1,500 Gift Voucher",
        affiliateUrl: "https://www.reliancedigital.com/search?q=iphone%2018",
        inStock: true,
        emiStartsAt: "₹3,162/mo",
      },
      {
        store: "Vijay Sales",
        priceInr: 75900,
        offerText: "₹4,000 Instant Bank Discount + 0% EMI with Bajaj Finserv",
        affiliateUrl: "https://www.vijaysales.com/search/iphone-18",
        inStock: true,
        emiStartsAt: "₹3,162/mo",
      },
      {
        store: "Amazon",
        priceInr: 79900,
        offerText: "Fast Prime Delivery + 5% Cashback with Amazon Pay Card",
        affiliateUrl: "https://www.amazon.in/s?k=iphone+18",
        inStock: true,
        emiStartsAt: "₹3,329/mo",
      },
    ],
    heroImage: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=1200&auto=format&fit=crop&q=80",
  },
  {
    id: "iphone-17-pro-max",
    name: "Apple iPhone 17 Pro Max",
    shortName: "17 Pro Max",
    slug: "iphone-17-pro-max",
    category: "iphone",
    badge: "High Value Flagship",
    tagline: "Previous generation titanium flagship now available at severe discount.",
    startingPriceInr: 134900,
    originalPriceInr: 149900,
    rating: 4.8,
    reviewCount: 4890,
    releaseYear: 2025,
    specs: {
      display: "6.9\" Super Retina XDR OLED, 120Hz ProMotion, 2000 nits peak",
      chip: "Apple A19 Pro (TSMC 3nm N3E, 6-core CPU, 6-core GPU, 16-core NPU)",
      camera: "Triple 48MP: 48MP Main f/1.78 + 48MP Ultra-Wide + 48MP 5x Telephoto",
      battery: "4,685 mAh (Up to 31 hours video playback, 30W wired, 25W MagSafe)",
      storage: "256GB / 512GB / 1TB NVMe",
      colors: ["Desert Titanium", "Natural Titanium", "White Titanium", "Black Titanium"],
      weight: "227 grams",
      biometrics: "Dynamic Island Face ID + Camera Control Button",
      connectivity: "Wi-Fi 7, 5G, Bluetooth 5.3, UWB Gen 2",
      aiFeatures: "Apple Intelligence 1.0 (Writing tools, Siri with personal context, Clean Up)",
    },
    keyHighlights: [
      "Still blazingly fast with A19 Pro 3nm chipset and 48MP 5x tetraprism zoom",
      "Massive ₹15,000 to ₹20,000 price drop making it exceptional value vs brand-new 18 series",
      "Full support for Apple Intelligence throughout 2026 and beyond",
    ],
    retailers: [
      {
        store: "Flipkart",
        priceInr: 128900,
        offerText: "Big Billion Clearance: Extra ₹6,000 off on Exchange + ₹4,000 Card Discount",
        affiliateUrl: "https://www.flipkart.com/search?q=iphone+17+pro+max",
        inStock: true,
        emiStartsAt: "₹5,370/mo",
      },
      {
        store: "Amazon",
        priceInr: 131900,
        offerText: "Lightning Deal: ₹3,000 instant ICICI discount + Next Day Prime Delivery",
        affiliateUrl: "https://www.amazon.in/s?k=iphone+17+pro+max",
        inStock: true,
        emiStartsAt: "₹5,495/mo",
      },
      {
        store: "Croma",
        priceInr: 131900,
        offerText: "Clearance Stock: 18 months 0% interest EMI on major credit cards",
        affiliateUrl: "https://www.croma.com/search/?text=iphone+17+pro+max",
        inStock: true,
        emiStartsAt: "₹5,495/mo",
      },
      {
        store: "Reliance Digital",
        priceInr: 132900,
        offerText: "Store Clearance Special: Free 20W Apple Charger included",
        affiliateUrl: "https://www.reliancedigital.com/search?q=iphone%2017%20pro%20max",
        inStock: true,
        emiStartsAt: "₹5,537/mo",
      },
      {
        store: "Vijay Sales",
        priceInr: 132900,
        offerText: "Flat ₹4,000 HDFC Card Cashback + 10,000 V-Points",
        affiliateUrl: "https://www.vijaysales.com/search/iphone-17-pro-max",
        inStock: true,
        emiStartsAt: "₹5,537/mo",
      },
    ],
    heroImage: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=1200&auto=format&fit=crop&q=80",
  },
  {
    id: "macbook-pro-m5",
    name: "Apple MacBook Pro 14\" / 16\" (M5 Pro / Max)",
    shortName: "MacBook Pro M5",
    slug: "macbook-pro-m5",
    category: "macbook",
    badge: "Developer Beast",
    tagline: "Unrivaled compute density for AI researchers, 3D artists, and code compilation.",
    startingPriceInr: 169900,
    originalPriceInr: 179900,
    rating: 4.9,
    reviewCount: 1240,
    releaseYear: 2026,
    specs: {
      display: "14.2\" or 16.2\" Liquid Retina XDR, Mini-LED 1600 nits peak, 120Hz ProMotion, Nano-texture option",
      chip: "Apple M5 Pro / M5 Max (3nm enhanced, up to 16-core CPU, 40-core GPU, Hardware Neural Acceleration)",
      camera: "12MP Center Stage Camera with Desk View support",
      battery: "Up to 24 hours battery life, 140W fast charge via MagSafe 3",
      storage: "512GB to 8TB PCIe Gen 5 SSD with up to 128GB Unified Memory",
      colors: ["Space Black", "Silver"],
      weight: "1.61 kg (14\") / 2.14 kg (16\")",
      biometrics: "Touch ID in Magic Keyboard",
      connectivity: "Thunderbolt 5 (up to 120 Gbps), HDMI 2.1, SDXC slot, Wi-Fi 7, MagSafe 3",
      aiFeatures: "Local LLM acceleration up to 250 tokens/sec for Llama 3 70B & DeepSeek R1 models",
    },
    keyHighlights: [
      "Thunderbolt 5 ports deliver triple external 8K 60Hz display support",
      "Up to 24 hours of real-world battery endurance without throttling on battery power",
      "Zero fan noise during ordinary programming, audio mastering, and 4K ProRes rendering",
    ],
    retailers: [
      {
        store: "Croma",
        priceInr: 162900,
        offerText: "₹10,000 Instant Student / Teacher Discount with UNiDAYS + ₹5,000 Card Cashback",
        affiliateUrl: "https://www.croma.com/search/?text=macbook+pro",
        inStock: true,
        emiStartsAt: "₹6,787/mo No-Cost EMI",
      },
      {
        store: "Flipkart",
        priceInr: 164900,
        offerText: "₹5,000 Instant Card Cashback + ₹8,000 Old Laptop Exchange Discount",
        affiliateUrl: "https://www.flipkart.com/search?q=macbook+pro",
        inStock: true,
        emiStartsAt: "₹6,870/mo",
      },
      {
        store: "Reliance Digital",
        priceInr: 165900,
        offerText: "Free Laptop Sleeve & Apple USB-C to USB Adapter Bundle",
        affiliateUrl: "https://www.reliancedigital.com/search?q=macbook%20pro",
        inStock: true,
        emiStartsAt: "₹6,912/mo",
      },
      {
        store: "Amazon",
        priceInr: 169900,
        offerText: "Prime Express Delivery + 12-Month No Cost EMI on Credit Cards",
        affiliateUrl: "https://www.amazon.in/s?k=macbook+pro",
        inStock: true,
        emiStartsAt: "₹7,079/mo",
      },
      {
        store: "Vijay Sales",
        priceInr: 166900,
        offerText: "₹5,000 Instant Cashback on Standard Chartered and HDFC Bank Cards",
        affiliateUrl: "https://www.vijaysales.com/search/macbook-pro",
        inStock: true,
        emiStartsAt: "₹6,954/mo",
      },
    ],
    heroImage: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=1200&auto=format&fit=crop&q=80",
  },
  {
    id: "apple-watch-ultra-3",
    name: "Apple Watch Ultra 3",
    shortName: "Watch Ultra 3",
    slug: "apple-watch-ultra-3",
    category: "watch",
    badge: "Extreme Durability",
    tagline: "49mm Aerospace Titanium with 3,000 nits microLED display & satellite emergency SOS.",
    startingPriceInr: 89900,
    originalPriceInr: 94900,
    rating: 4.9,
    reviewCount: 960,
    releaseYear: 2026,
    specs: {
      display: "49mm microLED Retina Display, 3,000 nits sapphire crystal screen",
      chip: "Apple S11 SiP with 64-bit dual-core processor and 4-core Neural Engine",
      camera: "N/A",
      battery: "72 hours in Low Power Mode, 36 hours regular continuous GPS usage",
      storage: "64GB onboard memory",
      colors: ["Natural Titanium", "Dark Titanium"],
      weight: "61.4 grams",
      biometrics: "Electrical ECG, Optical Heart Rate Gen 3, Blood Oxygen, Skin Temperature, Hypertension Index",
      connectivity: "Cellular LTE, Dual-frequency L1 & L5 GPS, Bluetooth 5.4, Offline Satellite Messaging",
      aiFeatures: "Personalized Training Load & Vitals intelligence, Auto Workout Transition recognition",
    },
    keyHighlights: [
      "100m water resistance with EN13319 certification for scuba diving up to 40 meters",
      "Dual-frequency precision GPS pinpoints runners under dense forest canopies and skyscraper clusters",
      "Direct two-way satellite emergency SOS and Find My messaging without cell signal",
    ],
    retailers: [
      {
        store: "Flipkart",
        priceInr: 84900,
        offerText: "₹5,000 Instant Card Cashback on Axis/HDFC + Free Extra Trail Loop Band",
        affiliateUrl: "https://www.flipkart.com/search?q=apple+watch+ultra+3",
        inStock: true,
        emiStartsAt: "₹3,537/mo No-Cost EMI",
      },
      {
        store: "Croma",
        priceInr: 85900,
        offerText: "₹4,000 Bank Cashback + 5% NeuCoins reward points",
        affiliateUrl: "https://www.croma.com/search/?text=apple+watch+ultra",
        inStock: true,
        emiStartsAt: "₹3,579/mo",
      },
      {
        store: "Amazon",
        priceInr: 88900,
        offerText: "Prime Free 1-Day Delivery + No Cost EMI available",
        affiliateUrl: "https://www.amazon.in/s?k=apple+watch+ultra",
        inStock: true,
        emiStartsAt: "₹3,704/mo",
      },
      {
        store: "Reliance Digital",
        priceInr: 86900,
        offerText: "Special Outdoor Enthusiast Bundle: ₹1,500 Store voucher included",
        affiliateUrl: "https://www.reliancedigital.com/search?q=apple%20watch%20ultra",
        inStock: true,
        emiStartsAt: "₹3,620/mo",
      },
      {
        store: "Vijay Sales",
        priceInr: 86900,
        offerText: "Instant ₹3,500 HDFC Card Cashback + 6 months 0% interest",
        affiliateUrl: "https://www.vijaysales.com/search/apple-watch-ultra",
        inStock: true,
        emiStartsAt: "₹3,620/mo",
      },
    ],
    heroImage: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=1200&auto=format&fit=crop&q=80",
  },
  {
    id: "airpods-pro-3",
    name: "Apple AirPods Pro 3",
    shortName: "AirPods Pro 3",
    slug: "airpods-pro-3",
    category: "airpods",
    badge: "Audiophile & Health",
    tagline: "2x Stronger Active Noise Cancellation, In-Ear Heart Rate tracking, and Clinical Hearing Aid mode.",
    startingPriceInr: 24900,
    originalPriceInr: 26900,
    rating: 4.8,
    reviewCount: 3120,
    releaseYear: 2026,
    specs: {
      display: "N/A",
      chip: "Apple H3 Headphone Chip with ultra-low latency audio processing",
      camera: "N/A",
      battery: "Up to 8 hours listening with ANC enabled (34 hours total with MagSafe USB-C case)",
      storage: "N/A",
      colors: ["Glossy White"],
      weight: "5.3 grams per bud",
      biometrics: "Optical In-Ear Heart Rate Sensor + Body Temperature Sensor during workouts",
      connectivity: "Bluetooth 5.4, Lossless 24-bit/48kHz audio with Apple Vision Pro & Mac, Find My U1 chip",
      aiFeatures: "Adaptive Audio 2.0 with Real-Time Conversational AI Awareness & Ambient Wind Shielding",
    },
    keyHighlights: [
      "Clinical grade OTC Hearing Aid certification with Personalized Sound Profiling",
      "Built-in heart rate and skin temperature tracking directly synced to Apple Health",
      "MagSafe USB-C charging case with lanyard loop and built-in Find My speaker",
    ],
    retailers: [
      {
        store: "Flipkart",
        priceInr: 21900,
        offerText: "Flat ₹2,500 Instant Discount on Axis/ICICI Cards",
        affiliateUrl: "https://www.flipkart.com/search?q=airpods+pro+3",
        inStock: true,
        emiStartsAt: "₹1,825/mo",
      },
      {
        store: "Croma",
        priceInr: 22400,
        offerText: "₹2,000 Instant HDFC Bank Cashback + 5% NeuCoins",
        affiliateUrl: "https://www.croma.com/search/?text=airpods+pro",
        inStock: true,
        emiStartsAt: "₹1,866/mo",
      },
      {
        store: "Amazon",
        priceInr: 22900,
        offerText: "Prime 1-Day Delivery + 5% Amazon Pay Cashback",
        affiliateUrl: "https://www.amazon.in/s?k=airpods+pro",
        inStock: true,
        emiStartsAt: "₹1,908/mo",
      },
      {
        store: "Reliance Digital",
        priceInr: 22900,
        offerText: "Free 1-Year Extended Warranty on Audio accessories",
        affiliateUrl: "https://www.reliancedigital.com/search?q=airpods%20pro",
        inStock: true,
        emiStartsAt: "₹1,908/mo",
      },
      {
        store: "Vijay Sales",
        priceInr: 22900,
        offerText: "₹1,500 Instant Bank Discount + 2,000 V-Points",
        affiliateUrl: "https://www.vijaysales.com/search/airpods-pro",
        inStock: true,
        emiStartsAt: "₹1,908/mo",
      },
    ],
    heroImage: "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=1200&auto=format&fit=crop&q=80",
  },
  {
    id: "ipad-pro-m4",
    name: "Apple iPad Pro 11\" / 13\" (M4 OLED)",
    shortName: "iPad Pro M4",
    slug: "ipad-pro-m4",
    category: "ipad",
    badge: "Ultra-Thin OLED",
    tagline: "Impossibly thin 5.1mm design with breakthrough Tandem OLED Ultra Retina XDR.",
    startingPriceInr: 99900,
    originalPriceInr: 104900,
    rating: 4.9,
    reviewCount: 1540,
    releaseYear: 2025,
    specs: {
      display: "11\" or 13\" Tandem OLED Ultra Retina XDR, 1000 nits full screen, 1600 nits HDR peak, 120Hz ProMotion",
      chip: "Apple M4 Chip (TSMC 3nm 2nd Gen, up to 10-core CPU, 10-core GPU, 38 TOPS Neural Engine)",
      camera: "12MP Wide back camera with LiDAR scanner + Landscape 12MP Center Stage Ultra Wide",
      battery: "Up to 10 hours web surfing on Wi-Fi, fast charge via USB-C Thunderbolt 3",
      storage: "256GB / 512GB / 1TB / 2TB",
      colors: ["Silver", "Space Black"],
      weight: "444g (11\") / 579g (13\")",
      biometrics: "Landscape Face ID",
      connectivity: "Thunderbolt / USB 4, Wi-Fi 6E, 5G Sub-6, Apple Pencil Pro & Magic Keyboard support",
      aiFeatures: "Final Cut Pro AI scene separation, Logic Pro AI Session Players, Procreate Dreams acceleration",
    },
    keyHighlights: [
      "The thinnest Apple product ever made at just 5.1mm thickness",
      "Groundbreaking dual-layer Tandem OLED provides inky blacks and blinding 1600-nit specular highlights",
      "Apple Pencil Pro support with barrel roll, haptic feedback, and squeeze gestures",
    ],
    retailers: [
      {
        store: "Flipkart",
        priceInr: 94900,
        offerText: "₹5,000 Instant Card Cashback on HDFC/ICICI + ₹4,000 Old Tablet Exchange bonus",
        affiliateUrl: "https://www.flipkart.com/search?q=ipad+pro+m4",
        inStock: true,
        emiStartsAt: "₹3,954/mo",
      },
      {
        store: "Croma",
        priceInr: 94900,
        offerText: "₹5,000 Card Cashback + UNiDAYS Student Discount on Apple Pencil Pro",
        affiliateUrl: "https://www.croma.com/search/?text=ipad+pro+m4",
        inStock: true,
        emiStartsAt: "₹3,954/mo",
      },
      {
        store: "Amazon",
        priceInr: 96900,
        offerText: "Prime Next-Day Delivery + 5% Cashback on Amazon Pay Card",
        affiliateUrl: "https://www.amazon.in/s?k=ipad+pro+m4",
        inStock: true,
        emiStartsAt: "₹4,037/mo",
      },
      {
        store: "Reliance Digital",
        priceInr: 97900,
        offerText: "Special Creator Pack: 10% off on Magic Keyboard when bought together",
        affiliateUrl: "https://www.reliancedigital.com/search?q=ipad%20pro%20m4",
        inStock: true,
        emiStartsAt: "₹4,079/mo",
      },
      {
        store: "Vijay Sales",
        priceInr: 97900,
        offerText: "₹4,000 Instant Cashback on Standard Chartered and HDFC Bank Cards",
        affiliateUrl: "https://www.vijaysales.com/search/ipad-pro-m4",
        inStock: true,
        emiStartsAt: "₹4,079/mo",
      },
    ],
    heroImage: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=1200&auto=format&fit=crop&q=80",
  },
];

export const HIGH_COMMISSION_ACCESSORIES: AppleAccessory[] = [
  {
    id: "torras-stand-case-iphone-18",
    name: "TORRAS Magnetic O-Ring 360° Stand Armor Case for iPhone 18 Pro Max",
    category: "case",
    compatibleWith: "iPhone 18 Pro Max",
    brand: "TORRAS",
    priceInr: 2999,
    mrpInr: 4999,
    discountPercent: 40,
    commissionTier: "Very High (10-12%)",
    rating: 4.8,
    reviewsCount: 1420,
    badge: "Best Seller",
    imageUrl: "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=600&auto=format&fit=crop&q=80",
    buyUrl: "https://www.amazon.in/s?k=torras+iphone+case",
    retailer: "Amazon",
    highlights: [
      "Fold-flat 360° rotating magnetic ring acts as phone stand & grip",
      "Military-grade 12ft drop protection with shock-absorbing air cushions",
      "Full 18N strong MagSafe alignment for car mounts and Qi2 chargers",
    ],
  },
  {
    id: "spigen-ultra-hybrid-magfit",
    name: "Spigen Ultra Hybrid MagFit Anti-Yellowing Clear Case for iPhone 18 Series",
    category: "case",
    compatibleWith: "iPhone 18 Pro & Pro Max",
    brand: "Spigen",
    priceInr: 1899,
    mrpInr: 2999,
    discountPercent: 37,
    commissionTier: "Very High (10-12%)",
    rating: 4.7,
    reviewsCount: 3890,
    badge: "Top Rated",
    imageUrl: "https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=600&auto=format&fit=crop&q=80",
    buyUrl: "https://www.amazon.in/s?k=spigen+ultra+hybrid+iphone",
    retailer: "Amazon",
    highlights: [
      "Infused blue resin technology prevents unsightly yellowing for 12+ months",
      "Built-in magnetic ring for snappy MagSafe battery packs and wallets",
      "Raised camera bezels to guard sapphire lens surfaces from scratches",
    ],
  },
  {
    id: "apple-25w-magsafe-charger",
    name: "Official Apple 25W MagSafe Fast Wireless Charger (2 Meter Braided Cable)",
    category: "charger",
    compatibleWith: "iPhone 18 Pro Max, 18, 17, 16 Series & AirPods",
    brand: "Apple",
    priceInr: 4500,
    mrpInr: 4900,
    discountPercent: 8,
    commissionTier: "High (8-10%)",
    rating: 4.9,
    reviewsCount: 5210,
    badge: "Official Apple",
    imageUrl: "https://images.unsplash.com/photo-1622445262464-84b1456045b6?w=600&auto=format&fit=crop&q=80",
    buyUrl: "https://www.croma.com/search/?text=apple+magsafe+charger",
    retailer: "Croma",
    highlights: [
      "Full 25W Qi2 MagSafe fast charging speed (0-50% in 30 mins with 30W adapter)",
      "Premium tangle-free braided woven cable designed for long lifespan",
      "Safe dynamic temperature monitoring prevents device battery degradation",
    ],
  },
  {
    id: "anker-qi2-10k-powerbank",
    name: "Anker MagGo Qi2 15W Magnetic 10,000mAh Power Bank with Smart LED Display",
    category: "powerbank",
    compatibleWith: "iPhone 18 / 17 / 16 Series",
    brand: "Anker",
    priceInr: 4999,
    mrpInr: 7999,
    discountPercent: 38,
    commissionTier: "Very High (10-12%)",
    rating: 4.8,
    reviewsCount: 1670,
    badge: "Travel Essential",
    imageUrl: "https://images.unsplash.com/photo-1594818379496-da1e345b0ded?w=600&auto=format&fit=crop&q=80",
    buyUrl: "https://www.amazon.in/s?k=anker+magsafe+powerbank",
    retailer: "Amazon",
    highlights: [
      "Certified 15W Qi2 wireless speed with ultra-strong magnetic latch",
      "Full 10,000mAh capacity provides 1.8 full charges for iPhone 18 Pro Max",
      "Interactive smart screen monitors live battery % and remaining recharge time",
    ],
  },
  {
    id: "esr-armorite-sapphire-glass",
    name: "ESR Armorite 9H Sapphire Tempered Glass Screen Protector (3-Pack with Easy-Install Tray)",
    category: "screen-protector",
    compatibleWith: "iPhone 18 Pro Max",
    brand: "ESR",
    priceInr: 1499,
    mrpInr: 2499,
    discountPercent: 40,
    commissionTier: "Very High (10-12%)",
    rating: 4.9,
    reviewsCount: 2840,
    badge: "Must Have",
    imageUrl: "https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?w=600&auto=format&fit=crop&q=80",
    buyUrl: "https://www.amazon.in/s?k=esr+screen+protector+iphone",
    retailer: "Amazon",
    highlights: [
      "Can withstand up to 110 lbs of edge force without shattering",
      "Electroplated oleophobic layer resists fingerprint smudges and face oil",
      "10-second automatic bubble-free installation alignment frame included",
    ],
  },
  {
    id: "belkin-3in1-magsafe-dock",
    name: "Belkin BoostCharge Pro 3-in-1 Fast Wireless Charging Stand with MagSafe 15W",
    category: "charger",
    compatibleWith: "iPhone, Apple Watch, and AirPods simultaneously",
    brand: "Belkin",
    priceInr: 11999,
    mrpInr: 14999,
    discountPercent: 20,
    commissionTier: "High (8-10%)",
    rating: 4.8,
    reviewsCount: 940,
    badge: "Executive Desk",
    imageUrl: "https://images.unsplash.com/photo-1586105251261-72a756497a11?w=600&auto=format&fit=crop&q=80",
    buyUrl: "https://www.croma.com/search/?text=belkin+3+in+1+magsafe",
    retailer: "Croma",
    highlights: [
      "Charges iPhone, Apple Watch Ultra, and AirPods wireless case all at once",
      "Official Made For Apple (MFi) certification with premium stainless steel arms",
      "Supports StandBy mode horizontally to turn iPhone into a luxury bedside clock",
    ],
  },
];

export const DAILY_APPLE_DEALS: AppleDeal[] = [
  {
    id: "deal-1",
    title: "iPhone 17 Pro Max Price Crash — Flat ₹15,000 Off",
    product: "Apple iPhone 17 Pro Max (256GB, Desert Titanium)",
    category: "iPhone",
    store: "Flipkart",
    currentPriceInr: 128900,
    originalPriceInr: 149900,
    discountAmountInr: 21000,
    bankOffer: "₹5,000 Instant Discount on HDFC & ICICI Credit Cards",
    exchangeBonus: "Up to ₹32,000 off on exchange of older iPhone 13/14",
    dealType: "Price Drop",
    expiryHours: 14,
    affiliateUrl: "https://www.flipkart.com/search?q=iphone+17+pro+max",
    isHot: true,
  },
  {
    id: "deal-2",
    title: "MacBook Air M3 (16GB RAM / 256GB SSD) Back to School Deal",
    product: "Apple MacBook Air 13\" M3 with 16GB Unified Memory",
    category: "MacBook",
    store: "Croma",
    currentPriceInr: 96900,
    originalPriceInr: 114900,
    discountAmountInr: 18000,
    bankOffer: "₹8,000 Instant Discount on ICICI Bank Cards + 24 Mo No-Cost EMI",
    exchangeBonus: "Extra ₹6,000 old Windows laptop trade-in bonus",
    dealType: "Bank Cashback",
    expiryHours: 28,
    affiliateUrl: "https://www.croma.com/search/?text=macbook+air+m3",
    isHot: true,
  },
  {
    id: "deal-3",
    title: "AirPods Pro 2 USB-C Lightning Discount Deal",
    product: "Apple AirPods Pro (2nd Gen) with MagSafe Case (USB-C)",
    category: "AirPods",
    store: "Amazon",
    currentPriceInr: 18990,
    originalPriceInr: 24900,
    discountAmountInr: 5910,
    bankOffer: "₹1,500 Instant Discount on OneCard and SBI Cards",
    exchangeBonus: "N/A",
    dealType: "Lightning Deal",
    expiryHours: 8,
    affiliateUrl: "https://www.amazon.in/s?k=airpods+pro+2",
    isHot: true,
  },
  {
    id: "deal-4",
    title: "Apple Watch Series 10 Titanium Clearance at Reliance Digital",
    product: "Apple Watch Series 10 (46mm GPS + Cellular, Slate)",
    category: "Watch",
    store: "Reliance Digital",
    currentPriceInr: 49900,
    originalPriceInr: 59900,
    discountAmountInr: 10000,
    bankOffer: "₹4,000 Instant Cashback on Axis Bank Credit Cards",
    exchangeBonus: "Free extra sport band worth ₹4,500 in-store",
    dealType: "Price Drop",
    expiryHours: 36,
    affiliateUrl: "https://www.reliancedigital.com/search?q=apple%20watch%20series%2010",
    isHot: false,
  },
  {
    id: "deal-5",
    title: "iPad Air M2 (11-inch, 128GB Wi-Fi) Super Deal",
    product: "Apple iPad Air 11\" M2 Liquid Retina Display",
    category: "iPad",
    store: "Vijay Sales",
    currentPriceInr: 53900,
    originalPriceInr: 59900,
    discountAmountInr: 6000,
    bankOffer: "Flat ₹4,000 Cashback on Standard Chartered/HDFC cards",
    exchangeBonus: "Extra ₹3,000 on trading any old Android tablet",
    dealType: "Bundle Deal",
    expiryHours: 19,
    affiliateUrl: "https://www.vijaysales.com/search/ipad-air-m2",
    isHot: false,
  },
];

export const TRADE_IN_VALUATION_ESTIMATES: Record<string, { modelName: string; tradeInValInr: number; upgradeRecommendation: string }> = {
  "iphone-12": {
    modelName: "iPhone 12 / 12 Pro (2020)",
    tradeInValInr: 16000,
    upgradeRecommendation: "Major Upgrade Alert: You will jump 6 generations of CPU/GPU speed, gain 120Hz ProMotion, 48MP cameras, USB-C, Dynamic Island, and full Apple Intelligence.",
  },
  "iphone-13": {
    modelName: "iPhone 13 (2021)",
    tradeInValInr: 22000,
    upgradeRecommendation: "High Value Upgrade: Your battery and 60Hz screen are aging. Moving to iPhone 18 gives you 3x camera resolution, USB-C, and all generative AI features.",
  },
  "iphone-13-pro-max": {
    modelName: "iPhone 13 Pro Max (2021)",
    tradeInValInr: 34000,
    upgradeRecommendation: "Recommended: Trade in before resale value drops further. The iPhone 18 Pro Max adds 5x tetraprism optical zoom, 2nm efficiency, and Action Button 2.0.",
  },
  "iphone-14": {
    modelName: "iPhone 14 (2022)",
    tradeInValInr: 27000,
    upgradeRecommendation: "Great Upgrade: iPhone 14 lacks Apple Intelligence and USB-C. iPhone 18 is a revolutionary leap in camera sensors and speed.",
  },
  "iphone-14-pro-max": {
    modelName: "iPhone 14 Pro Max (2022)",
    tradeInValInr: 44000,
    upgradeRecommendation: "Sweet Spot: Swap lightning cables for universal 25W MagSafe and USB-C 10Gbps, titanium chassis (much lighter in hand), and 2nm A20 Pro compute.",
  },
  "iphone-15": {
    modelName: "iPhone 15 / 15 Plus (2023)",
    tradeInValInr: 36000,
    upgradeRecommendation: "Conditional Upgrade: If you want 120Hz ProMotion and Apple Intelligence, upgrade to 18 Pro. If satisfied with basic daily use, you can wait another year.",
  },
  "iphone-15-pro-max": {
    modelName: "iPhone 15 Pro Max (2023)",
    tradeInValInr: 62000,
    upgradeRecommendation: "Enthusiast Upgrade: Worth it if variable aperture photography, on-device AI video generation, and Wi-Fi 7 matter for your daily workflow.",
  },
  "iphone-16-pro-max": {
    modelName: "iPhone 16 Pro Max (2024)",
    tradeInValInr: 78000,
    upgradeRecommendation: "Minor Leap: Unless you need the mechanical variable aperture lens and 2nm TSMC efficiency, 16 Pro Max remains exceptionally capable.",
  },
  "samsung-s23-ultra": {
    modelName: "Samsung Galaxy S23 Ultra",
    tradeInValInr: 38000,
    upgradeRecommendation: "Switch to iOS: Unmatched ProRes Log video workflow, Apple Watch Ultra ecosystem synergy, and higher multi-year trade-in retention.",
  },
  "samsung-s24-ultra": {
    modelName: "Samsung Galaxy S24 Ultra",
    tradeInValInr: 54000,
    upgradeRecommendation: "Cross-Platform Switch: Transition effortlessly with the Apple Transfer tool. Enjoy superior battery standby and cinematic camera color science.",
  },
};

export const APPLE_FAQ_ITEMS = [
  {
    question: "When is the iPhone 18 series releasing in India?",
    answer:
      "The Apple iPhone 18 lineup (iPhone 18, 18 Pro, and 18 Pro Max) is officially announced at Apple's September Keynote, with pre-orders beginning the first Friday following launch and in-store delivery starting one week later across Flipkart, Croma, Reliance Digital, Vijay Sales, and Apple BKC/Saket stores.",
  },
  {
    question: "What is the official starting price of iPhone 18 Pro Max in India?",
    answer:
      "The iPhone 18 Pro Max starts at ₹1,59,900 for the 256GB base tier in India. With launch partner bank cards (HDFC and ICICI), buyers can secure an instant ₹5,000 cashback, plus up to ₹8,000 in promotional exchange bonuses at Croma and Flipkart, bringing the effective launch price down to ₹1,46,900.",
  },
  {
    question: "Which Indian retailer offers the best deals on Apple products?",
    answer:
      "While Amazon India is convenient for next-day delivery, Indian electronics retailers like Flipkart, Croma (Tata Neu coins), Reliance Digital (JioPoints vouchers), and Vijay Sales often offer higher instant bank discounts (₹5,000+), 24-month zero-cost EMI plans, and higher trade-in bonuses for older smartphones.",
  },
  {
    question: "Why does Amazon India have 0% affiliate commission on iPhones?",
    answer:
      "Under Amazon India Associates policies, standard smartphone purchases (including all iPhone models, MacBooks, and Apple Watches) carry a 0% affiliate fee rate. High-converting accessories like Torras/Spigen cases, Anker wireless power banks, and MagSafe charging stations carry 9-12% commission rates.",
  },
  {
    question: "Is it worth upgrading from iPhone 15 Pro Max to iPhone 18 Pro Max?",
    answer:
      "Yes, if camera optics and battery stamina are your top priorities. The iPhone 18 Pro Max introduces a hardware variable aperture (f/1.4 to f/2.8), TSMC's 2nm A20 Pro architecture with 35% better efficiency, 3,000-nit outdoor brightness, and upgraded 25W MagSafe 2.0 fast wireless charging.",
  },
  {
    question: "What is the new Apple A20 Pro chip fabricated on?",
    answer:
      "The Apple A20 Pro processor is manufactured on TSMC's cutting-edge 2nm Gate-All-Around (GAA) semiconductor node, featuring next-generation nanosheet transistors that deliver up to 30% performance gains and 35% lower battery consumption.",
  },
];
