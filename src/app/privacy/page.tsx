import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Shield } from "lucide-react";

export default function PrivacyPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full space-y-8">
        <header className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300">
            <Shield className="w-3.5 h-3.5" /> Legal & Privacy
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
            Privacy Policy & Cookie Policy
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Last Updated: September 2025
          </p>
        </header>

        <div className="prose prose-slate dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed space-y-6">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            1. Information We Collect
          </h2>
          <p>
            When you visit AutoAI Chronicle, we may collect anonymous telemetry information such as browser type, operating system, referring URL, pages viewed, and anonymized IP addresses to ensure site reliability and measure reader engagement.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            2. Google AdSense & Third-Party Cookies
          </h2>
          <p>
            Third party vendors, including Google, use cookies to serve ads based on a user&apos;s prior visits to this website or other websites. Google&apos;s use of advertising cookies enables it and its partners to serve ads to users based on their visit to sites on the Internet. Users may opt out of personalized advertising by visiting Google Ads Settings.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            3. Newsletter & Email Data
          </h2>
          <p>
            If you choose to subscribe to our newsletter, we collect your email address exclusively for the purpose of delivering curated updates. We will never sell, rent, or distribute your email address to unauthorized third parties.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            4. Affiliate Links Disclosure
          </h2>
          <p>
            AutoAI Chronicle participates in affiliate marketing programs designed to provide a means for sites to earn advertising fees by advertising and linking to partner products.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            5. Contact Information
          </h2>
          <p>
            If you have questions regarding this Privacy Policy, please contact our support desk via our contact page.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
