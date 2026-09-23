import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Editorial Newsroom & Support | TheSmartMag",
  description: "Get in touch with TheSmartMag editorial newsroom, submit technical pitches, inquire about partnerships, or contact reader support.",
  alternates: {
    canonical: "https://thesmartmag.com/contact",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
