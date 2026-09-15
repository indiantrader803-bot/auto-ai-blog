export interface DestinationGuide {
  slug: string;
  name: string;
  country: string;
  region: string;
  tagline: string;
  heroImage: string;
  bestTimeToVisit: string;
  idealDays: string;
  avgBudgetPerPerson: string;
  currency: string;
  visaInfo: string;
  highlights: string[];
  topAttractions: Array<{
    title: string;
    description: string;
    rating: number;
    badge: string;
    price: string;
    query: string;
  }>;
  budgetBreakdown: {
    flight: number;
    hotel: number;
    transfer: number;
    activities: number;
    food: number;
    esim: number;
    insurance: number;
    currencySymbol: string;
  };
  sampleItinerary: Array<{
    day: number;
    title: string;
    activities: string[];
    foodRecommendation: string;
    bookingType: 'flight' | 'hotel' | 'transfer' | 'attraction' | 'esim';
    bookingCtaText: string;
    bookingQuery: string;
  }>;
}

export const DESTINATIONS_DATA: Record<string, DestinationGuide> = {
  japan: {
    slug: 'japan',
    name: 'Japan & Tokyo Golden Route',
    country: 'Japan',
    region: 'East Asia',
    tagline: 'Ancient Shrines, Bullet Trains, Neon Skylines & Mount Fuji',
    heroImage: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=1200&auto=format&fit=crop&q=80',
    bestTimeToVisit: 'March–May (Cherry Blossoms) & October–November (Autumn Foliage)',
    idealDays: '7 to 10 Days',
    avgBudgetPerPerson: '₹1,35,000 - ₹1,75,000 (,600 - ,100)',
    currency: 'Japanese Yen (JPY) / ¥',
    visaInfo: 'eVisa available for Indian & Global passport holders (3–5 working days)',
    highlights: ['teamLab Planets Digital Art', 'Tokyo Shibuya Sky & Shinjuku', 'Mt. Fuji & Lake Kawaguchiko', 'Kyoto Fushimi Inari & Arashiyama Bamboo Grove', 'Shinkansen Bullet Train'],
    topAttractions: [
      { title: 'teamLab Planets TOKYO Digital Art Pass', description: 'Immersive body-interactive sensory water and light museum.', rating: 4.9, badge: 'BESTSELLER', price: '₹2,650', query: 'teamLab Planets Tokyo ticket' },
      { title: 'Shibuya Sky 360° Observation Deck', description: 'Open-air rooftop views of Shibuya crossing and Mt. Fuji.', rating: 4.9, badge: 'FAST TRACK', price: '₹1,850', query: 'Shibuya Sky Tokyo ticket' },
      { title: 'Mt. Fuji & Hakone 1-Day Sightseeing Tour', description: '5th Station, Lake Ashi cruise, and Komagatake ropeway.', rating: 4.8, badge: 'POPULAR', price: '₹6,400', query: 'Mount Fuji Hakone day tour Klook' },
      { title: 'Tokyo Disneyland & DisneySea 1-Day Pass', description: 'World-famous Disney parks with instant QR gate entry.', rating: 4.9, badge: 'INSTANT VOUCHER', price: '₹5,800', query: 'Tokyo Disneyland DisneySea pass' },
    ],
    budgetBreakdown: {
      flight: 38000,
      hotel: 42000,
      transfer: 6500,
      activities: 18000,
      food: 22000,
      esim: 1200,
      insurance: 2800,
      currencySymbol: '₹',
    },
    sampleItinerary: [
      { day: 1, title: 'Arrival in Tokyo & Shinjuku Neon Night Walk', activities: ['Arrival at Narita/Haneda Airport', 'Private Chauffeur Transfer to Ginza/Shinjuku Hotel', 'Evening Omoide Yokocho Ramen & Kabukicho exploration'], foodRecommendation: 'Ichiran Tonkotsu Ramen & Yakitori skewers', bookingType: 'transfer', bookingCtaText: 'Book Narita Airport Transfer', bookingQuery: 'Narita Airport Tokyo transfer' },
      { day: 2, title: 'Futuristic Tokyo & Shibuya Sky Panoramic Sunset', activities: ['Morning Asakusa Senso-ji Temple & Nakamise shopping street', 'Afternoon teamLab Planets interactive museum', 'Sunset at Shibuya Sky 360° Deck and Shibuya Crossing'], foodRecommendation: 'Tsukiji Outer Market Fresh Sashimi & Wagyu Beef Skewers', bookingType: 'attraction', bookingCtaText: 'Book Shibuya Sky & teamLab Pass', bookingQuery: 'Shibuya Sky teamLab Planets Tokyo' },
      { day: 3, title: 'Mount Fuji, Lake Kawaguchiko & Chureito Pagoda', activities: ['Scenic day tour to Mt. Fuji 5th Station', 'Oshino Hakkai crystal volcanic springs', 'Panoramic photography at Chureito Pagoda overlooking Mt. Fuji'], foodRecommendation: 'Houtou Fudo flat noodle hot-pot with mountain vegetables', bookingType: 'attraction', bookingCtaText: 'Book Mt Fuji 1-Day Guided Tour', bookingQuery: 'Mt Fuji day tour from Tokyo' },
      { day: 4, title: 'Bullet Train (Shinkansen) to Kyoto & Gion Heritage', activities: ['Board Nozomi Shinkansen to Kyoto Station (2h 15m)', 'Check into traditional Machiya Ryokan or Boutique Hotel', 'Evening lantern-lit Gion geisha district walk and Pontocho Alley'], foodRecommendation: 'Kyoto Kaiseki Multi-Course Traditional Dinner', bookingType: 'attraction', bookingCtaText: 'Book JR Rail Pass / Shinkansen', bookingQuery: 'Japan Rail Pass Klook' },
      { day: 5, title: 'Kyoto 10,000 Torii Gates & Arashiyama Bamboo Grove', activities: ['Early sunrise hike at Fushimi Inari Shrine', 'Kinkaku-ji Golden Pavilion', 'Arashiyama Bamboo Forest & Sagano Romantic Train'], foodRecommendation: 'Yudofu (Boiled Tofu) & Kyoto Matcha Parfait', bookingType: 'attraction', bookingCtaText: 'Book Kyoto Guided Day Tour', bookingQuery: 'Kyoto Fushimi Inari Arashiyama tour' },
      { day: 6, title: 'Osaka Castle & Dotonbori Street Food Extravaganza', activities: ['Short 30-min express train to Osaka', 'Historic Osaka Castle and park gardens', 'Evening neon lights & giant Glico sign along Dotonbori Canal'], foodRecommendation: 'Takoyaki (Octopus balls) & Okonomiyaki savory pancakes', bookingType: 'attraction', bookingCtaText: 'Book Osaka Amazing Pass', bookingQuery: 'Osaka Amazing Pass Klook' },
      { day: 7, title: 'Tokyo Souvenir Shopping & Departure', activities: ['Akihabara tech district & Ginza luxury department stores', 'Airport limousine transfer to Haneda/Narita', 'Departure with tax-free shopping'], foodRecommendation: 'Matcha KitKat & Royce Chocolate souvenir boxes', bookingType: 'flight', bookingCtaText: 'Compare Return Flights on Aviasales', bookingQuery: 'Tokyo return flights' }
    ]
  },
  dubai: {
    slug: 'dubai',
    name: 'Dubai & Arabian Luxury Desert',
    country: 'United Arab Emirates',
    region: 'Middle East',
    tagline: 'Futuristic Skyscrapers, Golden Sand Dunes & Ultra-Luxury Living',
    heroImage: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200&auto=format&fit=crop&q=80',
    bestTimeToVisit: 'November to March (Cool, pleasant 24°C winter sunshine)',
    idealDays: '4 to 6 Days',
    avgBudgetPerPerson: '₹65,000 - ₹95,000 ( - ,200)',
    currency: 'UAE Dirham (AED) / د.إ',
    visaInfo: 'Instant 30-Day Tourist eVisa (Processed in 24–48 hours)',
    highlights: ['Burj Khalifa 124th & 125th Floor', 'Red Dunes Desert Safari & BBQ Dinner', 'Dubai Marina Luxury Yacht Cruise', 'Museum of the Future', 'Atlantis Aquaventure Waterpark'],
    topAttractions: [
      { title: 'Burj Khalifa At The Top (124th & 125th Level)', description: 'World tallest building observation deck with skip-the-line elevator.', rating: 4.9, badge: 'MUST VISIT', price: '₹3,850', query: 'Burj Khalifa ticket Dubai' },
      { title: 'Premium Red Dunes Desert Safari with Quad Biking & BBQ', description: 'Dune bashing, camel ride, Tanoura dance, fire show, and 5-star buffet.', rating: 4.9, badge: 'TOP SELLER', price: '₹2,950', query: 'Dubai red dunes desert safari BBQ' },
      { title: 'Dubai Marina Luxury Sunset Yacht Cruise with Buffet', description: '2-hour cruise past Burj Al Arab and Ain Dubai with live BBQ.', rating: 4.8, badge: 'ROMANTIC PICK', price: '₹3,400', query: 'Dubai Marina yacht cruise buffet' },
      { title: 'Museum of the Future Priority Entry Ticket', description: 'Architectural wonder exploring humanity’s future in 2071.', rating: 4.9, badge: 'FAST SELLING', price: '₹3,750', query: 'Museum of the Future Dubai pass' }
    ],
    budgetBreakdown: {
      flight: 22000,
      hotel: 28000,
      transfer: 4500,
      activities: 14000,
      food: 15000,
      esim: 850,
      insurance: 1500,
      currencySymbol: '₹',
    },
    sampleItinerary: [
      { day: 1, title: 'Arrival, Private Chauffeur & Dubai Marina Dinner Cruise', activities: ['Touchdown at DXB Airport with VIP Meet & Greet', 'Check-in to Downtown or Marina luxury hotel', 'Evening 2-hour Marina Yacht Cruise under illuminated skyscrapers'], foodRecommendation: 'Mediterranean grilled sea-bass & Arabic mezze platter', bookingType: 'transfer', bookingCtaText: 'Book DXB Airport VIP Transfer', bookingQuery: 'Dubai DXB airport transfer' },
      { day: 2, title: 'Burj Khalifa, Dubai Mall & Dubai Fountain Show', activities: ['Morning Dubai Mall & Aquarium underwater zoo', 'Ascend Burj Khalifa 124th/125th Floor observation deck', 'Evening choreographed Dubai Fountain light and water spectacle'], foodRecommendation: 'Authentic Emirati Mandi with tender spiced lamb', bookingType: 'attraction', bookingCtaText: 'Book Burj Khalifa Fast Track Ticket', bookingQuery: 'Burj Khalifa ticket Dubai' },
      { day: 3, title: 'Museum of the Future & Old Dubai Gold Souk Abra Ride', activities: ['Tour the iconic Museum of the Future', 'Take a traditional 1-Dirham wooden Abra boat across Dubai Creek', 'Explore the Gold & Spice Souks in Deira'], foodRecommendation: 'Al Ustad Special Kebab (Famous Persian yogurt skewers)', bookingType: 'attraction', bookingCtaText: 'Book Museum of the Future Ticket', bookingQuery: 'Museum of the Future Dubai' },
      { day: 4, title: 'Red Dunes 4x4 Desert Safari & Starlit Bedouin Camp', activities: ['Thrilling 4x4 dune bashing in Lahbab desert', 'Sandboarding, camel rides, and optional ATV quad biking', 'Lavish BBQ buffet dinner with Tanoura dance & fire show under the stars'], foodRecommendation: 'Charcoal grilled kebabs, hummus, and freshly baked Arabic bread', bookingType: 'attraction', bookingCtaText: 'Book Premium Desert Safari with BBQ', bookingQuery: 'Dubai red dunes desert safari' },
      { day: 5, title: 'Palm Jumeirah, Atlantis Aquaventure & Departure', activities: ['Monorail ride along Palm Jumeirah trunk to Atlantis The Palm', 'Splash at Aquaventure Waterpark or relax at luxury beach club', 'Transfer to DXB Airport for evening return flight'], foodRecommendation: 'Gourmet burgers & artisanal Turkish ice cream', bookingType: 'flight', bookingCtaText: 'Search Return Flights on Aviasales', bookingQuery: 'Dubai return flights' }
    ]
  },
  bali: {
    slug: 'bali',
    name: 'Bali Tropical Paradise & Nusa Penida',
    country: 'Indonesia',
    region: 'Southeast Asia',
    tagline: 'Emerald Rice Terraces, Secret Waterfalls, Sacred Temples & Surf Beaches',
    heroImage: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1200&auto=format&fit=crop&q=80',
    bestTimeToVisit: 'April to October (Dry season with sunny skies & gentle ocean breeze)',
    idealDays: '5 to 7 Days',
    avgBudgetPerPerson: '₹48,000 - ₹75,000 ( - )',
    currency: 'Indonesian Rupiah (IDR) / Rp',
    visaInfo: 'Visa on Arrival (VoA) / 30-Day e-VoA online ()',
    highlights: ['Ubud Tegalalang Rice Terraces & Jungle Swing', 'Nusa Penida Kelingking T-Rex Beach & Angel Billabong', 'Mount Batur Sunrise Jeep Trek', 'Uluwatu Sunset Cliff Temple & Kecak Fire Dance', 'Seminyak & Canggu Beach Clubs'],
    topAttractions: [
      { title: 'Nusa Penida Island Speedboat Day Tour with Snorkeling', description: 'Visit Kelingking T-Rex cliff, Broken Beach, and snorkel with Manta Rays.', rating: 4.9, badge: 'MUST EXPERIENCE', price: '₹3,200', query: 'Nusa Penida tour Bali Klook' },
      { title: 'Mount Batur 4WD Sunrise Jeep Tour & Hot Springs', description: 'Watch sunrise over active volcano caldera followed by natural volcanic hot springs.', rating: 4.9, badge: 'ADVENTURE PICK', price: '₹2,800', query: 'Mount Batur sunrise jeep tour' },
      { title: 'Ubud Jungle Swing & Tegalalang Rice Terrace Pass', description: 'Famous Instagram jungle swing overlooking lush rice terraces and waterfall.', rating: 4.8, badge: 'TRENDING', price: '₹1,450', query: 'Ubud jungle swing rice terrace Bali' },
      { title: 'Uluwatu Temple Sunset & Kecak Fire Dance Ticket', description: 'Clifftop ocean amphitheater with traditional hypnotic Kecak fire performance.', rating: 4.9, badge: 'CULTURAL GEM', price: '₹1,200', query: 'Uluwatu Kecak fire dance ticket' }
    ],
    budgetBreakdown: {
      flight: 26000,
      hotel: 18000,
      transfer: 3500,
      activities: 11000,
      food: 12000,
      esim: 750,
      insurance: 1400,
      currencySymbol: '₹',
    },
    sampleItinerary: [
      { day: 1, title: 'Arrival at Denpasar, Private Transfer & Seminyak Sunset', activities: ['Arrival at Ngurah Rai Airport (DPS) with instant e-Sim connection', 'Private driver transfer to Seminyak or Canggu private pool villa', 'Sunset drinks at Potato Head Beach Club with ocean views'], foodRecommendation: 'Nasi Goreng Special & Grilled Jimbaran Seafood', bookingType: 'transfer', bookingCtaText: 'Book Bali Airport Private Driver', bookingQuery: 'Bali airport transfer private driver' },
      { day: 2, title: 'Nusa Penida Island Ocean Adventure & T-Rex Cliff', activities: ['Fast boat from Sanur to Nusa Penida island', 'Marvel at iconic Kelingking Beach T-Rex cliff and Angel’s Billabong', 'Snorkeling at Crystal Bay with Manta Rays'], foodRecommendation: 'Fresh whole coconut & Balinese Chicken Betutu', bookingType: 'attraction', bookingCtaText: 'Book Nusa Penida Island Speedboat Tour', bookingQuery: 'Nusa Penida day tour' },
      { day: 3, title: 'Ubud Cultural Heart, Monkey Forest & Jungle Swing', activities: ['Sacred Monkey Forest Sanctuary in Ubud', 'Fly over emerald palm ravines on Ubud Jungle Swing', 'Stroll Tegalalang Rice Terraces and Saraswati Water Palace'], foodRecommendation: 'Babi Guling (Spiced Roast Pork) or Vegan Organic Bowl', bookingType: 'attraction', bookingCtaText: 'Book Ubud Swing & Waterfall Tour', bookingQuery: 'Ubud tour Bali jungle swing' },
      { day: 4, title: 'Mount Batur Sunrise 4WD Jeep & Natural Hot Springs', activities: ['Early morning 4WD jeep drive to Mount Batur black lava fields', 'Witness golden volcanic sunrise over Mount Abang', 'Rejuvenating mineral soak at Toya Devasya Hot Springs'], foodRecommendation: 'Volcanic steam-cooked eggs and banana pancakes', bookingType: 'attraction', bookingCtaText: 'Book Mount Batur Sunrise Jeep Tour', bookingQuery: 'Mount Batur jeep sunrise tour' },
      { day: 5, title: 'Uluwatu Clifftop Temple, Kecak Fire Dance & Departure', activities: ['Relax at Padang Padang surf beach', 'Visit Uluwatu Clifftop Temple perched 70m above Indian Ocean', 'Hypnotic Kecak Fire Dance at sunset, followed by airport transfer'], foodRecommendation: 'Candlelight seafood BBQ on Jimbaran beach sand', bookingType: 'flight', bookingCtaText: 'Search Cheap Flights on Aviasales', bookingQuery: 'Bali return flights' }
    ]
  },
  switzerland: {
    slug: 'switzerland',
    name: 'Switzerland & The Swiss Alps',
    country: 'Switzerland',
    region: 'Western Europe',
    tagline: 'Snow-Capped Alpine Giants, Glacial Lakes, Luxury Trains & Scenic Chalets',
    heroImage: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?w=1200&auto=format&fit=crop&q=80',
    bestTimeToVisit: 'June–September (Alpine hiking & wildflowers) & December–March (Skiing)',
    idealDays: '7 to 10 Days',
    avgBudgetPerPerson: '₹1,90,000 - ₹2,60,000 (,300 - ,200)',
    currency: 'Swiss Franc (CHF) / CHF',
    visaInfo: 'Schengen Visa required (Apply 1–2 months in advance)',
    highlights: ['Jungfraujoch - Top of Europe', 'Matterhorn & Zermatt Glacier Paradise', 'Swiss Travel Pass (Unlimited Trains, Boats & Buses)', 'Lake Lucerne & Mount Titlis Rotair Cable Car', 'Interlaken Adventure Capital'],
    topAttractions: [
      { title: 'Jungfraujoch Top of Europe Train Ticket & Pass', description: 'Ascend 3,454m to Europe’s highest railway station with Sphinx observatory.', rating: 4.9, badge: 'ICONIC BUCKETLIST', price: '₹16,500', query: 'Jungfraujoch Top of Europe ticket Klook' },
      { title: 'Swiss Travel Pass (Consecutive 3, 4, 6 or 8 Days)', description: 'Unlimited rides on world-class Swiss trains, panoramic buses, and lake steamers.', rating: 4.9, badge: 'UNBEATABLE VALUE', price: '₹24,800', query: 'Swiss Travel Pass Klook' },
      { title: 'Mount Titlis Cable Car & Cliff Walk Suspension Bridge', description: 'World first revolving Rotair cable car, glacier cave, and 10,000ft suspension bridge.', rating: 4.8, badge: 'SNOW PARADISE', price: '₹8,900', query: 'Mount Titlis cable car ticket' },
      { title: 'Matterhorn Glacier Paradise Zermatt Cable Car Pass', description: 'Highest 360° mountain view platform in the Alps facing iconic Toblerone peak.', rating: 4.9, badge: 'ALPINE GEM', price: '₹11,200', query: 'Matterhorn Glacier Paradise pass' }
    ],
    budgetBreakdown: {
      flight: 52000,
      hotel: 68000,
      transfer: 12000,
      activities: 38000,
      food: 35000,
      esim: 1500,
      insurance: 3500,
      currencySymbol: '₹',
    },
    sampleItinerary: [
      { day: 1, title: 'Arrival Zurich, Scenic Lake Train & Lucerne Old Town', activities: ['Arrival at Zurich Airport (ZRH) & activate Swiss Travel Pass', 'Scenic 45-min train to fairytale town of Lucerne', 'Walk historic Chapel Bridge (Kapellbrücke) and Lion Monument'], foodRecommendation: 'Traditional Swiss Cheese Fondue & Crusty Baguette', bookingType: 'transfer', bookingCtaText: 'Book Swiss Travel Pass Rail Ticket', bookingQuery: 'Swiss Travel Pass' },
      { day: 2, title: 'Mount Titlis Rotair Revolving Gondola & Glacier Walk', activities: ['Ascend Mount Titlis on world first revolving cable car', 'Cross the thrilling Titlis Cliff Walk suspension bridge', 'Evening steamboat cruise across Lake Lucerne'], foodRecommendation: 'Swiss Rösti with smoked bratwurst and melted raclette', bookingType: 'attraction', bookingCtaText: 'Book Mount Titlis Cable Car Pass', bookingQuery: 'Mount Titlis ticket' },
      { day: 3, title: 'Interlaken & Fairytale Valley of 72 Waterfalls (Lauterbrunnen)', activities: ['Panoramic train from Lucerne to Interlaken Ost', 'Take valley train into Lauterbrunnen beneath Staubbach Falls', 'Cable car to car-free cliff village of Mürren'], foodRecommendation: 'Alplermagronen (Alpine Macaroni with potatoes and cheese)', bookingType: 'hotel', bookingCtaText: 'Book Interlaken Alpine Chalet Hotel', bookingQuery: 'Interlaken Switzerland hotel booking' },
      { day: 4, title: 'Jungfraujoch - Top of Europe Glacial Wonder', activities: ['Board the modern Eiger Express tricable gondola from Grindelwald', 'Ascend through mountain tunnels to 3,454m Jungfraujoch station', 'Step onto Aletsch Glacier (Europe’s longest ice river) and Ice Palace'], foodRecommendation: 'Lindt Swiss Chocolate tasting & Hot Swiss Cocoa', bookingType: 'attraction', bookingCtaText: 'Book Jungfraujoch Top of Europe Pass', bookingQuery: 'Jungfraujoch ticket' },
      { day: 5, title: 'Zermatt & Legendary Matterhorn Pyramid', activities: ['Scenic train through Valais valley to car-free Zermatt', 'Gornegrat cogwheel railway with mirror lake reflection of Matterhorn', 'Explore historic alpine chalets and watch sunset turn Matterhorn gold'], foodRecommendation: 'Valais Raclette cheese scraped over baby new potatoes', bookingType: 'attraction', bookingCtaText: 'Book Matterhorn Glacier Paradise Pass', bookingQuery: 'Matterhorn Zermatt cable car pass' },
      { day: 6, title: 'Geneva / Zurich Luxury Shopping & Departure', activities: ['Scenic train return to Zurich / Geneva', 'Stroll luxury Bahnhofstrasse watchmakers and Lake Geneva fountain', 'Departure flight with Swiss chocolate gift boxes'], foodRecommendation: 'Zürcher Geschnetzeltes (Veal in creamy white wine mushroom sauce)', bookingType: 'flight', bookingCtaText: 'Search Swiss Flights on Aviasales', bookingQuery: 'Switzerland return flights' }
    ]
  },
  kashmir: {
    slug: 'kashmir',
    name: 'Kashmir - Heaven on Earth & Ladakh',
    country: 'India',
    region: 'Himalayas',
    tagline: 'Floating Shikaras, Snow Valleys, Pine Forests & Alpine Glacial Lakes',
    heroImage: 'https://images.unsplash.com/photo-1598091383021-15ddea10925d?w=1200&auto=format&fit=crop&q=80',
    bestTimeToVisit: 'April to October (Lush meadows & lakes) or Dec–Feb (Snow skiing in Gulmarg)',
    idealDays: '5 to 7 Days',
    avgBudgetPerPerson: '₹28,000 - ₹45,000 ( - )',
    currency: 'Indian Rupee (INR) / ₹',
    visaInfo: 'Domestic Travel: No visa required. (Postpaid SIM card recommended in J&K)',
    highlights: ['Dal Lake Luxury Houseboat & Shikara Ride', 'Gulmarg World 2nd Highest Gondola Cable Car', 'Pahalgam Betaab Valley & Aru Valley', 'Sonamarg Gateway to Ladakh & Thajiwas Glacier', 'Mughal Gardens of Srinagar'],
    topAttractions: [
      { title: 'Gulmarg Gondola Phase 1 & Phase 2 Cable Car Pass', description: 'Ascend to 13,780ft Apharwat Peak with panoramic snow views and skiing slopes.', rating: 4.9, badge: 'HIGH DEMAND', price: '₹1,850', query: 'Gulmarg Gondola cable car booking' },
      { title: 'Dal Lake Private Shikara Sunset Ride & Floating Market', description: 'Glide across mirror lotus waters past char chinar and floating flower markets.', rating: 4.9, badge: 'ROMANTIC ICON', price: '₹850', query: 'Dal Lake Shikara ride Srinagar' },
      { title: 'Pahalgam Betaab & Baisaran Mini Switzerland Valley Tour', description: 'Pony trek through dense deodar pine forests to rolling alpine pastures.', rating: 4.8, badge: 'NATURE PICK', price: '₹1,950', query: 'Pahalgam Baisaran valley day tour' },
      { title: 'Sonamarg Thajiwas Glacier Pony & Snow Sledge Tour', description: 'Explore snow bridges and glacial waterfalls at the golden meadow of Sonamarg.', rating: 4.8, badge: 'ADVENTURE', price: '₹2,200', query: 'Sonamarg Thajiwas glacier tour' }
    ],
    budgetBreakdown: {
      flight: 12000,
      hotel: 14000,
      transfer: 6000,
      activities: 6500,
      food: 7500,
      esim: 400,
      insurance: 600,
      currencySymbol: '₹',
    },
    sampleItinerary: [
      { day: 1, title: 'Arrival Srinagar, Luxury Houseboat Check-in & Shikara Sunset', activities: ['Arrival at Srinagar Airport (SXR) with private pickup', 'Check into handcrafted cedarwood luxury houseboat on Nigeen / Dal Lake', 'Romantic 2-hour Shikara ride during sunset amidst floating gardens'], foodRecommendation: 'Kashmiri Kahwa tea with saffron & crushed almonds, Rogan Josh', bookingType: 'hotel', bookingCtaText: 'Book Dal Lake Luxury Houseboat', bookingQuery: 'Dal Lake Srinagar houseboat booking' },
      { day: 2, title: 'Gulmarg Meadow of Flowers & Phase 2 Apharwat Snow Peak', activities: ['Scenic 2-hour drive through apple orchards to Gulmarg (8,825ft)', 'Board Gulmarg Gondola Phase 1 (Kongdoori) & Phase 2 (Apharwat Peak 13,780ft)', 'Snow activities, skiing, and panoramic views of Nanga Parbat peak'], foodRecommendation: 'Gushtaba (Velvety minced mutton meatballs in rich yogurt gravy)', bookingType: 'attraction', bookingCtaText: 'Book Gulmarg Gondola Tour Pass', bookingQuery: 'Gulmarg gondola day tour' },
      { day: 3, title: 'Pahalgam Valley of Shepherds & Betaab Valley', activities: ['Drive along Lidder River valley past saffron fields of Pampore', 'Visit Betaab Valley (named after Bollywood classic) and Chandanwari', 'Evening riverside campfire stroll along crystal trout streams'], foodRecommendation: 'Dum Aloo Kashmiri with hot Kashmiri Naan', bookingType: 'hotel', bookingCtaText: 'Book Pahalgam Riverside Resort', bookingQuery: 'Pahalgam resort hotel booking' },
      { day: 4, title: 'Baisaran Valley (Mini Switzerland) Pony Trek', activities: ['Horseback ride through misty pine forest to Baisaran meadow', 'Zorbing, ziplining, and picnic beside mountain streams', 'Visit Aru Valley wildlife sanctuary and scenic shepherd huts'], foodRecommendation: 'Yakhni Lamb curry with aromatic basmati rice', bookingType: 'attraction', bookingCtaText: 'Book Pahalgam Guided Day Excursion', bookingQuery: 'Pahalgam day tour Kashmir' },
      { day: 5, title: 'Srinagar Mughal Gardens, Saffron Shopping & Departure', activities: ['Stroll Nishat Bagh (Garden of Bliss) and Shalimar Bagh', 'Visit Shankaracharya Temple hilltop overlooking Srinagar valley', 'Shop authentic Pashmina shawls, walnut wood crafts & saffron before airport transfer'], foodRecommendation: 'Kashmiri Wazwan multi-course feast (Rista, Tabak Maaz)', bookingType: 'flight', bookingCtaText: 'Search Srinagar Flights on Aviasales', bookingQuery: 'Srinagar flights' }
    ]
  }
};

export function getDestinationBySlug(slug: string): DestinationGuide | null {
  const clean = slug.toLowerCase().trim();
  if (DESTINATIONS_DATA[clean]) return DESTINATIONS_DATA[clean];
  const found = Object.values(DESTINATIONS_DATA).find(
    (d) => d.slug.includes(clean) || clean.includes(d.slug) || d.name.toLowerCase().includes(clean)
  );
  return found || DESTINATIONS_DATA['japan'];
}
