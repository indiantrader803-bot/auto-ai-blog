import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Trade Hub: Best Prop Trading Firms & 90% Profit Split Discounts | TheSmartMag",
  description:
    "Compare verified prop trading firms (FTMO, FTM, Blue Guardian, AquaFunded) with exclusive promo code SMARTMAG20, algorithmic TradingView Pine scripts, and trader profit payout calculators.",
  alternates: {
    canonical: "https://thesmartmag.com/trade",
  },
};

export default function TradeLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
