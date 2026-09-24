import { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Shield, Lock, Eye, FileText, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy & Cookie Policy | TheSmartMag",
  description:
    "Official Privacy Policy, Google AdSense disclosures, cookie compliance, and data protection practices for TheSmartMag readers.",
  alternates: {
    canonical: "https://thesmartmag.com/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans">
      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full space-y-8">
        <header className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300">
            <Shield className="w-3.5 h-3.5" /> Legal &amp; Transparency
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white font-serif">
            Privacy Policy &amp; Cookie Compliance
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Effective Date: September 2026 • Published by TheSmartMag Editorial Network (thesmartmag.com)
          </p>
        </header>

        <div className="prose prose-slate dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed space-y-6">
          <p>
            At <strong>TheSmartMag</strong> (accessible from <Link href="https://thesmartmag.com" className="text-indigo-600 dark:text-indigo-400 underline">https://thesmartmag.com</Link>), one of our main priorities is the privacy of our visitors. This Privacy Policy document outlines the types of information that is collected and recorded by TheSmartMag and how we utilize and protect it.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            1. Consent
          </h2>
          <p>
            By using our website, you hereby consent to our Privacy Policy and agree to its terms. If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us at <a href="mailto:contact@thesmartmag.com" className="text-indigo-600 dark:text-indigo-400 underline">contact@thesmartmag.com</a>.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            2. Google AdSense &amp; Third-Party Advertising Disclosures
          </h2>
          <p>
            Google is a third-party vendor on our site. It uses cookies, known as DART cookies, to serve ads to our site visitors based upon their visit to <code>thesmartmag.com</code> and other sites on the internet.
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              Third-party vendors, including Google, use cookies to serve ads based on a user&apos;s prior visits to your website or other websites.
            </li>
            <li>
              Google&apos;s use of advertising cookies enables it and its partners to serve ads to your users based on their visit to your sites and/or other sites on the Internet.
            </li>
            <li>
              Users may opt out of personalized advertising by visiting{" "}
              <a
                href="https://www.google.com/settings/ads"
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 dark:text-indigo-400 underline font-semibold"
              >
                Google Ads Settings
              </a>. Alternatively, you can opt out of a third-party vendor&apos;s use of cookies for personalized advertising by visiting{" "}
              <a
                href="https://www.aboutads.info/choices/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 dark:text-indigo-400 underline font-semibold"
              >
                www.aboutads.info
              </a>.
            </li>
          </ul>

          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            3. Log Files &amp; Web Analytics
          </h2>
          <p>
            TheSmartMag follows a standard procedure of utilizing log files. These files log visitors when they visit websites. The information collected by log files includes internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable. The purpose of the information is for analyzing trends, administering the site, tracking users&apos; movement on the website, and gathering demographic information.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            4. Cookies and Web Beacons
          </h2>
          <p>
            Like any other website, TheSmartMag uses &quot;cookies&quot;. These cookies are used to store information including visitors&apos; preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users&apos; experience by customizing our web page content based on visitors&apos; browser type and/or other information.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            5. VIP Membership &amp; User Account Data
          </h2>
          <p>
            When registering for a VIP account, we collect your name, email address, and encrypted credential hashes to grant access to proprietary algorithmic models and research dossiers. We do not sell, rent, or lease customer lists to third parties. You may request account deletion or data export at any time by contacting our privacy compliance desk.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            6. Affiliate Relationships Disclosure
          </h2>
          <p>
            TheSmartMag maintains affiliate partnerships with select algorithmic trading tools, prop trading evaluation firms, hardware manufacturers, and travel booking engines (including Agoda, Booking.com, and Amazon Associates). When you click an affiliate link and make a purchase, we may receive a commission at no additional cost to you. All editorial reviews reflect our objective technical assessment.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            7. GDPR &amp; CCPA / CPRA Privacy Rights
          </h2>
          <p>
            Under GDPR and CCPA, users hold the right to request access, rectification, erasure, and restriction of processing of their personal data. If you make a request, we have one month to respond to you. Please contact our data protection officer at <a href="mailto:privacy@thesmartmag.com" className="text-indigo-600 dark:text-indigo-400 underline">privacy@thesmartmag.com</a>.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            8. Contact Us
          </h2>
          <p>
            If you have questions or suggestions about our Privacy Policy, do not hesitate to contact us:
          </p>
          <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs space-y-1">
            <p><strong>TheSmartMag Editorial &amp; Legal Desk</strong></p>
            <p>Website: <a href="https://thesmartmag.com" className="text-indigo-600 dark:text-indigo-400">https://thesmartmag.com</a></p>
            <p>Email: <a href="mailto:contact@thesmartmag.com" className="text-indigo-600 dark:text-indigo-400">contact@thesmartmag.com</a> / <a href="mailto:privacy@thesmartmag.com" className="text-indigo-600 dark:text-indigo-400">privacy@thesmartmag.com</a></p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
