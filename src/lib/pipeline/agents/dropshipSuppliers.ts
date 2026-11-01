/**
 * Multi-Supplier Dropshipping Directory & Autonomous 24/7 Sourcing Engine
 * Aggregates verified suppliers from MentionNetwork/awesome-ecommerce-dropshipping:
 * CJdropshipping, Zendrop, Spocket, DSers, AutoDS, AliExpress, Syncee, Modalyst, SaleHoo, Alibaba
 */

export interface DropshipSupplier {
  id: string;
  name: string;
  website: string;
  tagline: string;
  tier: "Primary API" | "Verified Global" | "Fast US/EU" | "Wholesale B2B";
  warehouseLocations: string[];
  shippingTimes: string;
  status: "ACTIVE" | "CONNECTED";
  supportedCategories: string[];
}

export const DROPSHIPPING_SUPPLIERS: DropshipSupplier[] = [
  {
    id: "cjdropshipping",
    name: "CJdropshipping",
    website: "https://cjdropshipping.com",
    tagline: "Sourcing, warehousing, and fulfillment with US/EU/Asia warehouses.",
    tier: "Primary API",
    warehouseLocations: ["USA", "Germany", "China", "UK"],
    shippingTimes: "3 - 7 Business Days",
    status: "CONNECTED",
    supportedCategories: ["Wearables", "Gaming", "Travel Gear", "Smart Home"],
  },
  {
    id: "zendrop",
    name: "Zendrop",
    website: "https://zendrop.com",
    tagline: "Fast US shipping, custom branding, and auto-fulfillment for Shopify & DTC stores.",
    tier: "Fast US/EU",
    warehouseLocations: ["USA", "Europe"],
    shippingTimes: "2 - 5 Business Days",
    status: "CONNECTED",
    supportedCategories: ["Consumer Electronics", "Audio", "Smart Accessories"],
  },
  {
    id: "spocket",
    name: "Spocket",
    website: "https://www.spocket.co",
    tagline: "Curated US/EU suppliers with faster shipping times and original quality.",
    tier: "Fast US/EU",
    warehouseLocations: ["USA", "UK", "EU"],
    shippingTimes: "3 - 5 Business Days",
    status: "CONNECTED",
    supportedCategories: ["Tech Accessories", "Travel Essentials", "Home Tech"],
  },
  {
    id: "dsers",
    name: "DSers",
    website: "https://www.dsers.com",
    tagline: "Official AliExpress dropshipping partner; bulk order processing and supplier optimization.",
    tier: "Primary API",
    warehouseLocations: ["Global", "Shenzhen", "Hong Kong"],
    shippingTimes: "5 - 9 Business Days",
    status: "CONNECTED",
    supportedCategories: ["All Electronics", "Hardware Tools", "Wearables"],
  },
  {
    id: "autods",
    name: "AutoDS",
    website: "https://www.autods.com",
    tagline: "Automation across suppliers (sourcing, price/stock 24/7 monitoring, auto-order).",
    tier: "Primary API",
    warehouseLocations: ["USA", "China", "UK", "Australia"],
    shippingTimes: "3 - 8 Business Days",
    status: "CONNECTED",
    supportedCategories: ["Multi-niche Trending Hardware"],
  },
  {
    id: "aliexpress",
    name: "AliExpress Pro",
    website: "https://www.aliexpress.com",
    tagline: "The classic low-cost global supplier marketplace with direct air courier lanes.",
    tier: "Verified Global",
    warehouseLocations: ["China", "Singapore", "Hong Kong"],
    shippingTimes: "5 - 10 Business Days",
    status: "CONNECTED",
    supportedCategories: ["Smart Home", "Gaming Peripherals", "Drones", "Gadgets"],
  },
  {
    id: "syncee",
    name: "Syncee",
    website: "https://syncee.com",
    tagline: "Global B2B supplier marketplace with millions of verified products and local suppliers.",
    tier: "Verified Global",
    warehouseLocations: ["USA", "Europe", "Australia"],
    shippingTimes: "4 - 7 Business Days",
    status: "CONNECTED",
    supportedCategories: ["Smart Tech", "Audio & Wearables"],
  },
  {
    id: "modalyst",
    name: "Modalyst",
    website: "https://modalyst.co",
    tagline: "Supplier network with independent and name-brand products with fast express.",
    tier: "Fast US/EU",
    warehouseLocations: ["USA", "EU"],
    shippingTimes: "3 - 6 Business Days",
    status: "CONNECTED",
    supportedCategories: ["Eco Tech", "Premium Accessories"],
  },
  {
    id: "salehoo",
    name: "SaleHoo",
    website: "https://www.salehoo.com",
    tagline: "Vetted wholesale and dropshipping supplier directory with 8,000+ verified merchants.",
    tier: "Wholesale B2B",
    warehouseLocations: ["USA", "UK", "Canada", "Australia", "New Zealand"],
    shippingTimes: "3 - 7 Business Days",
    status: "CONNECTED",
    supportedCategories: ["Computer Peripherals", "Smart Home Devices"],
  },
  {
    id: "alibaba",
    name: "Alibaba Global",
    website: "https://www.alibaba.com",
    tagline: "Wholesale/bulk and direct factory manufacturing at high scale.",
    tier: "Wholesale B2B",
    warehouseLocations: ["Direct Factory Global Logistics"],
    shippingTimes: "7 - 12 Business Days",
    status: "CONNECTED",
    supportedCategories: ["Heavy Tech", "Power Stations", "Custom Hardware"],
  },
];
