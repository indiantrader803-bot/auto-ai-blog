import { Metadata } from "next";

export const metadata: Metadata = {
  title: "VIP Member Lounge & Exclusive Intelligence | TheSmartMag",
  description: "Exclusive quant models, institutional trading algorithms, unredacted AI research dossiers, and private partner discount vouchers for verified VIP members.",
  alternates: {
    canonical: "https://thesmartmag.com/vip",
  },
};

export default function VipLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
