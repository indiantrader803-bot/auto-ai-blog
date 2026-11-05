import { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: "TheSmartMag Store | Trending AI Tools, Tech & Premium Gear",
  description: "Explore the official TheSmartMag Store for trending tech, AI gadgets, developer gear, and smart lifestyle products.",
};

export default function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Microsoft Clarity Dedicated Tracker for Store (/store, /store/*) */}
      <Script
        id="microsoft-clarity-store"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `(function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "z6v8x4qtvl");`,
        }}
      />
      {children}
    </>
  );
}
