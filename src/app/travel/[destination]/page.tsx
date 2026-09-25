import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import TravelNavbar from '@/components/travel/TravelNavbar';
import TravelFooter from '@/components/travel/TravelFooter';
import PersonalizedTripBasket from '@/components/travel/PersonalizedTripBasket';
import InteractiveTravelBookingBar from '@/components/travel/InteractiveTravelBookingBar';
import { DESTINATIONS_DATA, getDestinationBySlug } from '@/lib/travel/destinationsData';
import { MapPin, Calendar, DollarSign, ShieldCheck, Sparkles, CheckCircle2, Star, ExternalLink } from 'lucide-react';
import { getKlookUrl, getBookingHotelUrl } from '@/lib/affiliate/links';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ destination: string }>;
}): Promise<Metadata> {
  const { destination } = await params;
  const guide = getDestinationBySlug(destination);

  if (!guide) {
    return {
      title: 'Travel Destination Guide | TheSmartMag',
    };
  }

  return {
    title: `${guide.name}: Complete 2026 AI Travel Guide & Itinerary | TheSmartMag`,
    description: `Plan your dream ${guide.name} trip with AI: Verified day-by-day itineraries, flight comparison, best hotels, airport transfers, eSIM, and skip-the-line attraction passes.`,
    alternates: {
      canonical: `https://thesmartmag.com/travel/${guide.slug}`,
    },
    openGraph: {
      title: `${guide.name}: Complete 2026 AI Travel Guide & Itinerary`,
      description: `Plan your ${guide.name} vacation with verified AI trip baskets, budget calculators, and direct partner discounts.`,
      images: [
        {
          url: guide.heroImage,
          width: 1200,
          height: 630,
          alt: `${guide.name} travel destination`,
        },
      ],
    },
  };
}

export async function generateStaticParams() {
  return Object.keys(DESTINATIONS_DATA).map((slug) => ({
    destination: slug,
  }));
}

export default async function DestinationPage({
  params,
}: {
  params: Promise<{ destination: string }>;
}) {
  const { destination } = await params;
  const guide = getDestinationBySlug(destination);

  if (!guide) {
    notFound();
  }

  const initialPlan = {
    destination: guide.name,
    origin: 'Kolkata / Delhi / Mumbai',
    days: 7,
    budget: guide.budgetBreakdown.flight * 2 + guide.budgetBreakdown.hotel * 4,
    travelers: 2,
    travelStyle: 'Comfort' as const,
    guide,
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-sky-500 selection:text-white flex flex-col justify-between">
      {/* 🌐 JSON-LD Schema for Google TouristDestination Indexing */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "TouristDestination",
            name: guide.name,
            description: guide.tagline,
            url: `https://travel.thesmartmag.com/${guide.slug}`,
            image: guide.heroImage,
            containedInPlace: {
              "@type": "Country",
              name: guide.country,
            },
            touristType: ["Adventure", "Luxury", "Budget", "Family"],
            includesAttraction: guide.topAttractions.map((att) => ({
              "@type": "TouristAttraction",
              name: att.title,
              description: att.description,
            })),
          }),
        }}
      />

      <TravelNavbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12 flex-1 w-full">
        {/* ?? Destination Hero Header */}
        <div className="relative rounded-3xl overflow-hidden border border-slate-800 shadow-2xl min-h-[380px] flex items-end p-6 sm:p-10">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${guide.heroImage})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent" />

          <div className="relative z-10 space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/20 border border-sky-500/40 text-sky-400 text-xs font-black uppercase tracking-wider backdrop-blur-md">
              <MapPin className="w-3.5 h-3.5" />
              {guide.country} • {guide.region}
            </div>

            <h1 className="text-3xl sm:text-5xl font-black font-serif text-white tracking-tight">
              {guide.name}
            </h1>
            <p className="text-sm sm:text-base text-slate-200">
              {guide.tagline}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3 text-xs">
              <span className="px-3 py-1.5 rounded-xl bg-slate-900/80 border border-slate-700/80 backdrop-blur-md">
                📅 <strong>Best Time:</strong> {guide.bestTimeToVisit}
              </span>
              <span className="px-3 py-1.5 rounded-xl bg-slate-900/80 border border-slate-700/80 backdrop-blur-md">
                ⏱️ <strong>Ideal Duration:</strong> {guide.idealDays}
              </span>
              <span className="px-3 py-1.5 rounded-xl bg-slate-900/80 border border-slate-700/80 backdrop-blur-md">
                🛂 <strong>Visa:</strong> {guide.visaInfo}
              </span>
            </div>
          </div>
        </div>

        {/* ?? 1. Pre-generated AI Personalized Trip Basket */}
        <section>
          <PersonalizedTripBasket plan={initialPlan} />
        </section>

        {/* ??? 2. Top Curated Attraction Passes on Klook */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-black uppercase tracking-wider text-sky-400">
                Skip-The-Line Experience Passes
              </span>
              <h3 className="text-xl sm:text-2xl font-black font-serif text-white">
                Top Rated Activities in {guide.name}
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {guide.topAttractions.map((att, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col justify-between hover:border-sky-500/50 transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-sky-500/10 text-sky-400">
                      {att.badge}
                    </span>
                    <div className="flex items-center gap-1 text-amber-400 text-xs font-bold">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <span>{att.rating}</span>
                    </div>
                  </div>
                  <h4 className="text-sm font-black text-white group-hover:text-sky-300 transition line-clamp-2">
                    {att.title}
                  </h4>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                    {att.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between">
                  <span className="text-xs font-black text-emerald-400 font-mono">
                    From {att.price}
                  </span>
                  <a
                    href={getKlookUrl(att.query)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-lg bg-sky-500 hover:bg-sky-400 text-white text-xs font-bold transition flex items-center gap-1"
                  >
                    <span>Book Pass</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 🗺️ 3. Curated Day-by-Day Itinerary */}
        {guide.sampleItinerary && guide.sampleItinerary.length > 0 && (
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-black uppercase tracking-wider text-sky-400">
                  Recommended Travel Schedule
                </span>
                <h3 className="text-xl sm:text-2xl font-black font-serif text-white">
                  {guide.idealDays} Day-by-Day Itinerary in {guide.name}
                </h3>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {guide.sampleItinerary.map((dayPlan) => (
                <div
                  key={dayPlan.day}
                  className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3 hover:border-sky-500/40 transition-all shadow-md flex flex-col justify-between"
                >
                  <div className="space-y-2.5">
                    <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-sky-500/10 text-sky-400 text-[11px] font-black uppercase">
                      <span>Day {dayPlan.day}</span>
                    </div>
                    <h4 className="text-base font-bold text-white leading-snug">
                      {dayPlan.title}
                    </h4>
                    <ul className="space-y-1.5 text-xs text-slate-300">
                      {dayPlan.activities.map((act, aIdx) => (
                        <li key={aIdx} className="flex items-start gap-2">
                          <span className="text-sky-400 mt-0.5">•</span>
                          <span>{act}</span>
                        </li>
                      ))}
                    </ul>
                    {dayPlan.foodRecommendation && (
                      <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80 text-[11px] text-amber-300">
                        <strong>🍽️ Must Eat:</strong> {dayPlan.foodRecommendation}
                      </div>
                    )}
                  </div>

                  <div className="pt-3 border-t border-slate-800/80">
                    <a
                      href={getKlookUrl(dayPlan.bookingQuery || guide.name)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2 px-3 rounded-xl bg-sky-500/15 hover:bg-sky-500 text-sky-300 hover:text-white border border-sky-500/30 text-xs font-bold transition-all flex items-center justify-center gap-1.5"
                    >
                      <span>{dayPlan.bookingCtaText || "Explore Passes"}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 🤝 Transparent Affiliate Disclosure (Editorial Trust Standard) */}
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-xs text-slate-400 leading-relaxed my-6 max-w-4xl mx-auto flex items-start gap-3">
          <span className="p-1 rounded-lg bg-sky-500/10 text-sky-400 font-bold shrink-0 text-sm">ℹ️</span>
          <div>
            <span className="font-bold text-slate-200">Just so you know: </span>
            Some links on this itinerary are verified affiliate partner links. If you book passes, flights, or hotels, we may receive a small commission at zero additional cost to you. It helps keep our autonomous trip planning algorithms free for all travelers.
          </div>
        </div>

        {/* 🛡️ 4. Verified Booking Guarantees & Trust Badges */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-5 rounded-2xl bg-slate-900/60 border border-slate-800 text-center">
          <div className="space-y-1 p-3">
            <ShieldCheck className="w-6 h-6 text-emerald-400 mx-auto" />
            <h5 className="text-xs font-bold text-white">256-Bit SSL Encrypted</h5>
            <p className="text-[11px] text-slate-400">Direct booking with verified global operators</p>
          </div>
          <div className="space-y-1 p-3">
            <CheckCircle2 className="w-6 h-6 text-sky-400 mx-auto" />
            <h5 className="text-xs font-bold text-white">Instant Voucher Delivery</h5>
            <p className="text-[11px] text-slate-400">Receive QR passes directly on your smartphone</p>
          </div>
          <div className="space-y-1 p-3">
            <Sparkles className="w-6 h-6 text-amber-400 mx-auto" />
            <h5 className="text-xs font-bold text-white">Lowest Direct Rates</h5>
            <p className="text-[11px] text-slate-400">Zero middleman markups or surprise checkout fees</p>
          </div>
        </section>

        {/* 🎁 5. Free 30-Day Travel Planning Kit Lead Capture */}
        <section className="p-6 sm:p-10 rounded-3xl bg-gradient-to-r from-sky-600 via-indigo-600 to-purple-700 text-white shadow-xl text-center space-y-4">
          <span className="px-3 py-1 rounded-full bg-white/20 text-white text-[10px] font-black uppercase tracking-widest backdrop-blur-md inline-flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" /> Free Vacation Kit
          </span>
          <h3 className="text-2xl sm:text-3xl font-black font-serif tracking-tight">
            Planning a trip to {guide.name}?
          </h3>
          <p className="text-xs sm:text-sm text-sky-100 max-w-xl mx-auto">
            Get our complete {guide.name} offline packing list, emergency contacts, local currency conversion table, and hidden gem maps.
          </p>
          <form action="/api/subscribe" method="POST" className="flex flex-col sm:flex-row items-center justify-center gap-2.5 max-w-md mx-auto pt-1">
            <input
              type="email"
              name="email"
              required
              placeholder="Enter your email address..."
              className="w-full px-4 py-3 rounded-xl bg-white text-slate-900 text-xs font-medium focus:outline-none"
            />
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs uppercase tracking-wider transition-all shrink-0 cursor-pointer"
            >
              Get Free Kit →
            </button>
          </form>
        </section>

        {/* 🔍 6. Interactive Multi-Product Booking Console */}
        <section>
          <InteractiveTravelBookingBar
            title={`Search Custom Flights, Hotels & Passes for ${guide.name}`}
          />
        </section>
      </main>

      <TravelFooter />
    </div>
  );
}
