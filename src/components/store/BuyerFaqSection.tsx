"use client";

import { useState } from "react";
import { HelpCircle, ChevronDown, ShieldCheck, Truck, RotateCcw, CreditCard, Award, MessageSquare } from "lucide-react";

export const BUYER_30_QUESTIONS = [
  // Section 1: Ordering & Payment (1-6)
  {
    category: "Ordering & Payments",
    q: "1. What payment methods are supported on TheSmartMag Store?",
    a: "We accept all major credit and debit cards (Visa, MasterCard, American Express, Discover), PayPal, Apple Pay, Google Pay, and localized bank transfers/UPI through 256-bit SSL encrypted PCI-DSS Level 1 compliant gateways.",
  },
  {
    category: "Ordering & Payments",
    q: "2. Is my payment and personal information safe?",
    a: "Yes. All transactions are end-to-end encrypted with AES-256 bit SSL protocols. We never store complete payment card credentials on our servers.",
  },
  {
    category: "Ordering & Payments",
    q: "3. What currency will I be charged in?",
    a: "Our smart currency detector automatically shows prices in USD ($) for international shoppers and INR (₹) for domestic visitors, with zero hidden conversion markup.",
  },
  {
    category: "Ordering & Payments",
    q: "4. Can I apply discount and promotional codes?",
    a: "Yes! Enter any verified discount code (such as launch code SMART30) in the promo box at checkout to get instant 30% savings off your order total.",
  },
  {
    category: "Ordering & Payments",
    q: "5. How do I know if my order was successfully placed?",
    a: "You immediately receive a confirmation email with your unique order ID, itemized receipt, and tracking link within 60 seconds of checkout completion.",
  },
  {
    category: "Ordering & Payments",
    q: "6. Can I cancel or modify my order after placing it?",
    a: "You can request order modifications or cancellations within 2 hours of placement before automated air freight dispatch by emailing our support desk.",
  },

  // Section 2: Shipping & Delivery (7-12)
  {
    category: "Shipping & Delivery",
    q: "7. Do you ship to the United States and internationally?",
    a: "Yes. We offer worldwide expedited shipping to over 150 countries, including the United States, Canada, the United Kingdom, Australia, India, and the European Union.",
  },
  {
    category: "Shipping & Delivery",
    q: "8. How long does delivery take?",
    a: "Domestic orders arrive within 2-4 business days. International express air freight takes 3-6 business days depending on customs clearance.",
  },
  {
    category: "Shipping & Delivery",
    q: "9. How much does shipping cost?",
    a: "Standard tracked express delivery is currently 100% FREE for all orders above $25 (or ₹499) as part of our seasonal store launch.",
  },
  {
    category: "Shipping & Delivery",
    q: "10. How do I track my shipment in real time?",
    a: "Every order is assigned a live FedEx, DHL Express, or USPS tracking code. You receive an automated SMS and email dispatch notification with a live tracking link.",
  },
  {
    category: "Shipping & Delivery",
    q: "11. Are customs duties and import taxes included?",
    a: "For US, UK, and EU shoppers, taxes and standard duties are prepaid at checkout (DDP) so there are no surprise fees on arrival.",
  },
  {
    category: "Shipping & Delivery",
    q: "12. What happens if my package is lost or delayed?",
    a: "All shipments carry 100% transit insurance. In the rare event of lost or damaged transit, we instantly issue a free express replacement or 100% full refund.",
  },

  // Section 3: Quality, Authenticity & Genuine Reviews (13-18)
  {
    category: "Authenticity & Trust",
    q: "13. Are all products authentic and original?",
    a: "Every unit is sourced directly from certified original equipment manufacturers (OEM) with CE, FCC, and RoHS certifications and tamper-proof security holograms.",
  },
  {
    category: "Authenticity & Trust",
    q: "14. How do you verify customer feedback without fake reviews?",
    a: "We strictly reject synthetic bot reviews. Customer reviews require verified order matching, and we actively link open discussion threads to our Reddit community (u/Indiantrader803) and YouTube teardowns for transparent critique.",
  },
  {
    category: "Authenticity & Trust",
    q: "15. What warranty is included with electronics and gadgets?",
    a: "All electronics come with an official 1-Year Full Replacement Manufacturer Warranty covering defects, battery retention, and hardware failures.",
  },
  {
    category: "Authenticity & Trust",
    q: "16. Are items tested before dispatch?",
    a: "Yes. Every batch undergoes a rigorous 5-stage QC inspection covering battery integrity, structural tolerance, signal latency, and firmware stability.",
  },
  {
    category: "Authenticity & Trust",
    q: "17. Can I request a tax invoice or business receipt?",
    a: "Yes. Downloadable GST/VAT compliant digital commercial invoices are generated automatically inside your order confirmation page.",
  },
  {
    category: "Authenticity & Trust",
    q: "18. Where are product teardowns and video tests available?",
    a: "We publish independent video reviews and unboxings directly across our YouTube partner channels and Reddit community threads so you can see real-world performance.",
  },

  // Section 4: Returns, Exchanges & Refunds (19-24)
  {
    category: "Returns & Refunds",
    q: "19. What is your return and refund policy?",
    a: "We offer a 30-Day Hassle-Free Money-Back Guarantee. If you are not completely satisfied with your purchase, return it within 30 days for a full refund.",
  },
  {
    category: "Returns & Refunds",
    q: "20. How do I initiate a return or exchange?",
    a: "Visit our Contact page or message support@thesmartmag.com with your order ID. Our team will issue a pre-paid return shipping label within 24 hours.",
  },
  {
    category: "Returns & Refunds",
    q: "21. How long does a refund take to reflect in my bank account?",
    a: "Once our intake warehouse inspects the returned unit, refunds are processed within 48 hours and typically credit back to your card within 3-5 business days.",
  },
  {
    category: "Returns & Refunds",
    q: "22. Are return shipping fees deducted from my refund?",
    a: "If the item is defective, damaged, or incorrect, return shipping is 100% free with a prepaid carrier shipping label.",
  },
  {
    category: "Returns & Refunds",
    q: "23. Can I exchange for a different color or model?",
    a: "Yes. Unopened items can be exchanged for any variant or alternative model with zero restocking penalties.",
  },
  {
    category: "Returns & Refunds",
    q: "24. What if an item arrives damaged or broken?",
    a: "Photograph the damage and contact us immediately. We will dispatch a brand-new replacement via express courier at zero extra charge.",
  },

  // Section 5: Tech Support, Accounts & VIP Subscriptions (25-30)
  {
    category: "Support & VIP Benefits",
    q: "25. Do I need an account to place an order?",
    a: "No. You can check out as a guest in under 60 seconds. However, creating a free account allows you to track orders and save shipping preferences.",
  },
  {
    category: "Support & VIP Benefits",
    q: "26. What benefits come with TheSmartMag VIP Membership?",
    a: "VIP subscribers enjoy exclusive 1-hour early access to algorithmic trading articles, priority customer support, additional 15% discount on all store hardware, and access to private Pine Script indicators.",
  },
  {
    category: "Support & VIP Benefits",
    q: "27. How do I get setup assistance or firmware updates?",
    a: "Each product includes an illustrated step-by-step digital manual, QR codes for firmware updates, and 24/7 technical chat support on TheSmartMag.",
  },
  {
    category: "Support & VIP Benefits",
    q: "28. Can I buy in bulk or wholesale for corporate gifts?",
    a: "Yes! For orders over 10 units, reach out via our contact page to receive customized corporate B2B volume pricing and customized packaging.",
  },
  {
    category: "Support & VIP Benefits",
    q: "29. How does TheSmartMag guarantee user privacy?",
    a: "We adhere strictly to GDPR, CCPA, and global privacy standards. We never sell customer contact lists, browsing history, or payment records to third parties.",
  },
  {
    category: "Support & VIP Benefits",
    q: "30. How can I reach customer support if I have a question?",
    a: "Our responsive help desk is available 24/7 via the on-site AI Assistant, email at support@thesmartmag.com, or through our verified social channels on Reddit and Twitter/X.",
  },
];

export default function BuyerFaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = [
    "All",
    "Ordering & Payments",
    "Shipping & Delivery",
    "Authenticity & Trust",
    "Returns & Refunds",
    "Support & VIP Benefits",
  ];

  const filteredQuestions =
    selectedCategory === "All"
      ? BUYER_30_QUESTIONS
      : BUYER_30_QUESTIONS.filter((item) => item.category === selectedCategory);

  return (
    <section id="faq" className="my-16 p-6 sm:p-10 rounded-3xl bg-white dark:bg-[#0c1017] border border-slate-200 dark:border-slate-800 shadow-xl">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5" /> Buyer Transparency &amp; Help Desk
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-serif tracking-tight">
            Frequently Asked Buyer Questions (FAQ)
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
            Everything you need to know about secure checkout, express air freight, genuine product testing, warranties, and our 30-day money-back guarantee.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                selectedCategory === cat
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20"
                  : "bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3 pt-4">
          {filteredQuestions.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="rounded-2xl border border-slate-200 dark:border-slate-800/80 bg-slate-50 dark:bg-slate-900/60 overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-100/60 dark:hover:bg-slate-800/40 transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white leading-snug">
                    {item.q}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? "transform rotate-180 text-indigo-600 dark:text-indigo-400" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 sm:px-5 sm:pb-5 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-200/60 dark:border-slate-800/60 pt-3 bg-white dark:bg-slate-950/40">
                    <p>{item.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Trust Badges Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-slate-200 dark:border-slate-800/80 text-center">
          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/50">
            <ShieldCheck className="w-5 h-5 text-emerald-500 mx-auto mb-1" />
            <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200 block">30-Day Guarantee</span>
            <span className="text-[10px] text-slate-400">100% Risk Free</span>
          </div>
          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/50">
            <Truck className="w-5 h-5 text-sky-500 mx-auto mb-1" />
            <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200 block">Tracked Express</span>
            <span className="text-[10px] text-slate-400">US &amp; Global Shipping</span>
          </div>
          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/50">
            <Award className="w-5 h-5 text-amber-500 mx-auto mb-1" />
            <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200 block">1-Year Warranty</span>
            <span className="text-[10px] text-slate-400">Direct Replacement</span>
          </div>
          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/50">
            <CreditCard className="w-5 h-5 text-indigo-500 mx-auto mb-1" />
            <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200 block">Encrypted Checkout</span>
            <span className="text-[10px] text-slate-400">256-Bit SSL Safe</span>
          </div>
        </div>
      </div>
    </section>
  );
}
