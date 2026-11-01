/**
 * Awesome Ecommerce Dropshipping Skill & Agentic Market Intelligence
 * Embeds benchmarks and high-demand product rules from MentionNetwork/awesome-ecommerce-dropshipping
 */

export interface HighDemandCategoryRule {
  category: string;
  monthlyUSSearchVolume: number;
  topWinningProduct: string;
  recommendedSupplier: "CJ Dropshipping Global" | "AliExpress Pro Verified";
}

export const AWESOME_DROPSHIPPING_DEMAND_RULES: HighDemandCategoryRule[] = [
  {
    category: "Wearables",
    monthlyUSSearchVolume: 368000,
    topWinningProduct: "AI Audio Polarized Smart Glasses",
    recommendedSupplier: "CJ Dropshipping Global",
  },
  {
    category: "Wearables",
    monthlyUSSearchVolume: 201000,
    topWinningProduct: "Titanium Smart Health Ring (HRV, Sleep & Temperature)",
    recommendedSupplier: "CJ Dropshipping Global",
  },
  {
    category: "Smart Home",
    monthlyUSSearchVolume: 165000,
    topWinningProduct: "2K AI Pan & Tilt Wireless Smart Security Camera",
    recommendedSupplier: "AliExpress Pro Verified",
  },
  {
    category: "Travel Gear",
    monthlyUSSearchVolume: 246000,
    topWinningProduct: "Portable Power Station 600W (LiFePO4)",
    recommendedSupplier: "CJ Dropshipping Global",
  },
];
