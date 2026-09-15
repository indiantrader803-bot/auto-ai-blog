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
  manali: {
    slug: 'manali',
    name: 'Manali & Himachal Snow Valleys',
    country: 'India',
    region: 'Himachal Pradesh (Western Himalayas)',
    tagline: 'Snow-Capped Peaks, Solang Valley, Atal Tunnel, Pine Forests & River Rafting',
    heroImage: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=1200&auto=format&fit=crop&q=80',
    bestTimeToVisit: 'October to June (Snow in Dec–Feb, pleasant 15–25°C in March–June)',
    idealDays: '4 to 6 Days',
    avgBudgetPerPerson: '₹12,000 - ₹18,000 ($145 - $220)',
    currency: 'Indian Rupee (INR) / ₹',
    visaInfo: 'Domestic Travel: No visa required. (Postpaid SIM & ID proof recommended)',
    highlights: [
      'Solang Valley Paragliding & Skiing',
      'Atal Tunnel & Sissu Waterfall (Lahaul Valley)',
      'Rohtang Pass Snow Point (13,058 ft)',
      'Old Manali Wooden Cafes & Hadimba Temple',
      'Jogini Waterfalls Trek & Vashisht Hot Springs'
    ],
    topAttractions: [
      { title: 'Solang Valley Adventure & Paragliding Pass', description: 'Tandem paragliding, ropeway cable car, zorbing, and quad biking across Solang meadow.', rating: 4.9, badge: 'BESTSELLER', price: '₹1,450', query: 'Solang Valley Manali paragliding adventure' },
      { title: 'Atal Tunnel & Sissu Lahaul Valley Full-Day Excursion', description: 'Drive through world longest high-altitude highway tunnel into breathtaking Lahaul valley.', rating: 4.9, badge: 'MUST EXPERIENCE', price: '₹2,200', query: 'Atal Tunnel Sissu Manali day tour' },
      { title: 'Rohtang Pass Snow Point & Glacier Day Permit', description: 'Scenic drive to 13,058ft pass with snow sledging, yak rides, and panoramic Himalayan vistas.', rating: 4.8, badge: 'ICONIC', price: '₹2,800', query: 'Rohtang Pass Manali day tour' },
      { title: 'Beas River White Water Rafting & Zipline in Kullu', description: 'Grade 3+ river rafting over 14 km rapids in crystal cold glacial waters of Beas River.', rating: 4.9, badge: 'TOP ADVENTURE', price: '₹950', query: 'Kullu Manali river rafting booking' }
    ],
    budgetBreakdown: {
      flight: 5000,
      hotel: 9000,
      transfer: 3500,
      activities: 4500,
      food: 5500,
      esim: 300,
      insurance: 500,
      currencySymbol: '₹',
    },
    sampleItinerary: [
      { day: 1, title: 'Arrival in Manali, Old Manali Cafes & Hadimba Temple', activities: ['Arrival via Volvo AC coach or Kullu Bhuntar Airport (KUU)', 'Check into boutique cedarwood riverside resort in Old Manali', 'Walk through dense deodar forests to 500-year-old wooden Hadimba Devi Temple', 'Evening riverside cafe stroll tasting fresh mountain apple pie and herbal tea'], foodRecommendation: 'Himachali Siddu (Steamed wheat dumplings with walnut-poppy filling) & Trout Fish', bookingType: 'hotel', bookingCtaText: 'Book Manali Mountain Resort', bookingQuery: 'Manali boutique hotel resort' },
      { day: 2, title: 'Solang Valley Paragliding & Anjani Mahadev Waterfall', activities: ['Morning paragliding and ropeway gondola ride over Solang Valley', 'Trek to sacred Anjani Mahadev waterfall where natural ice lingam forms', 'Zorbing, ATV quad bike rides, and mountain photography'], foodRecommendation: 'Piping hot Maggi, Kadhi Chawal & Pahadi Chai at Solang viewpoint', bookingType: 'attraction', bookingCtaText: 'Book Solang Valley Adventure Pass', bookingQuery: 'Solang Valley tour' },
      { day: 3, title: 'Atal Tunnel, Sissu Waterfall & Lahaul Valley Expedition', activities: ['Drive through the marvel 9.02 km Atal Tunnel beneath Rohtang Pass', 'Arrive at dramatic cold-desert village of Sissu in Lahaul Valley', 'Hike to cascading Sissu Waterfall with snow mountain backdrops', 'Optional extension to Keylong or Rohtang Pass snow point'], foodRecommendation: 'Tibetan Thukpa, steamed butter Momos, and hot mutton broth', bookingType: 'transfer', bookingCtaText: 'Book Atal Tunnel Private Cab Transfer', bookingQuery: 'Atal Tunnel Sissu private cab' },
      { day: 4, title: 'Jogini Waterfalls Hike, Vashisht Hot Springs & Mall Road', activities: ['Scenic pine forest hike from Vashisht village to Jogini Waterfalls', 'Rejuvenating natural sulphur hot water bath at historic Vashisht Temple', 'Evening souvenir shopping on Mall Road for Kullu woolen shawls, pure honey & dried fruits'], foodRecommendation: 'Traditional Himachali Dham festive feast on brass thali', bookingType: 'attraction', bookingCtaText: 'Book Jogini Waterfall Guided Walk', bookingQuery: 'Jogini waterfall Manali tour' },
      { day: 5, title: 'Kasol, Manikaran Gurudwara Hot Springs & Departure', activities: ['Day excursion along Parvati Valley to mini-Israel village of Kasol', 'Visit sacred Manikaran Sahib Gurudwara and witness natural boiling springs', 'Return transfer to Chandigarh/Delhi Volvo bus stand or Bhuntar airport'], foodRecommendation: 'Fresh Israeli Shakshuka, falafel pita & Gurudwara Langar prasad', bookingType: 'transfer', bookingCtaText: 'Search Return Volvo & Cabs on GetTransfer', bookingQuery: 'Manali Delhi return transfer' }
    ]
  },
  goa: {
    slug: 'goa',
    name: 'Goa Coastal Paradise & Latin Heritage',
    country: 'India',
    region: 'Konkan Coast (Arabian Sea)',
    tagline: 'Golden Sand Beaches, Portuguese Latin Quarters, Seafood Shacks & Water Sports',
    heroImage: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=1200&auto=format&fit=crop&q=80',
    bestTimeToVisit: 'October to April (Sunny 28°C beach weather, vibrant shacks & water sports)',
    idealDays: '4 to 6 Days',
    avgBudgetPerPerson: '₹14,000 - ₹22,000 ($170 - $265)',
    currency: 'Indian Rupee (INR) / ₹',
    visaInfo: 'Domestic: No visa. International: 30-Day Tourist eVisa.',
    highlights: [
      'North Goa Vibrant Beaches (Baga, Anjuna, Morjim)',
      'South Goa Secluded Bays (Palolem, Agonda, Butterfly Beach)',
      'Fontainhas Colourful Portuguese Latin Quarter',
      'Aguada & Chapora Fort Sunset Vistas',
      'Dudhsagar Waterfalls & Spice Plantation Safari'
    ],
    topAttractions: [
      { title: 'Grand Island Scuba Diving & Dolphin Speedboat Safari', description: 'PADI certified beginner scuba dive, snorkeling, dolphin spotting, and BBQ lunch.', rating: 4.9, badge: 'TOP SELLER', price: '₹1,650', query: 'Goa scuba diving Grand Island tour' },
      { title: 'Dudhsagar 4-Tier Waterfall & Spice Plantation Jeep Safari', description: '4x4 jungle jeep safari through Bhagwan Mahavir sanctuary and spice farm feast.', rating: 4.8, badge: 'ADVENTURE', price: '₹1,950', query: 'Dudhsagar waterfall spice plantation Goa tour' },
      { title: 'Mandovi River Luxury Sunset Catamaran Cruise', description: '2-hour cruise past Panaji bridges with Goan folk dance, live DJ, and drinks.', rating: 4.8, badge: 'POPULAR', price: '₹650', query: 'Goa sunset river cruise Mandovi' },
      { title: 'North Goa 5-in-1 Water Sports Combo (Parasailing & Jet Ski)', description: 'Parasailing, jet ski, banana ride, bumper ride, and speed boat pass on Calangute beach.', rating: 4.9, badge: 'VALUE DEAL', price: '₹1,350', query: 'Goa water sports combo parasailing' }
    ],
    budgetBreakdown: {
      flight: 6500,
      hotel: 10000,
      transfer: 3000,
      activities: 4500,
      food: 6000,
      esim: 300,
      insurance: 400,
      currencySymbol: '₹',
    },
    sampleItinerary: [
      { day: 1, title: 'Arrival at Goa, North Goa Beach Check-in & Aguada Sunset', activities: ['Arrival at Dabolim (GOI) or Mopa (GOX) Airport with private pickup', 'Check into beachfront resort or private pool villa in Candolim / Anjuna', 'Explore 17th-century Portuguese Aguada Fort and lighthouse overlooking the sea', 'Sunset cocktails at Thalassa or Curlies beach shack with live acoustic beats'], foodRecommendation: 'Authentic Goan Fish Curry Thali with Kingfish & Butter Garlic Prawns', bookingType: 'transfer', bookingCtaText: 'Book Goa Airport Private Cab', bookingQuery: 'Goa airport taxi transfer' },
      { day: 2, title: 'Water Sports Rush & Latin Quarter Heritage Walk (Fontainhas)', activities: ['Morning parasailing and jet skiing at Calangute / Morjim beach', 'Drive to Panaji and wander through pastel yellow & blue Portuguese houses of Fontainhas', 'Visit Our Lady of the Immaculate Conception Church and vintage bakeries'], foodRecommendation: 'Fresh Goan Poi bread with Pork Vindaloo or Mushroom Xacuti and Bebinca cake', bookingType: 'attraction', bookingCtaText: 'Book Fontainhas Heritage Walking Tour', bookingQuery: 'Fontainhas Panaji walking tour' },
      { day: 3, title: 'Dudhsagar Waterfalls & Sahakari Spice Farm Safari', activities: ['Early morning 4x4 open jeep ride through dense jungle streams to majestic Dudhsagar Falls', 'Swim in the natural emerald pool beneath the railway viaduct', 'Guided tour of organic spice plantation with traditional banana-leaf buffet feast'], foodRecommendation: 'Organic Goan buffet with spiced chicken cafreal, local kokum juice & feni', bookingType: 'attraction', bookingCtaText: 'Book Dudhsagar Jeep Safari Pass', bookingQuery: 'Dudhsagar jeep safari tour' },
      { day: 4, title: 'South Goa Serenity: Palolem Beach & Cabo de Rama Cliff', activities: ['Scenic coastal drive south to crescent-shaped turquoise Palolem Beach', 'Kayak to Honeymoon and Butterfly Beach to spot wild dolphins', 'Clifftop sunset views from historic ruins of Cabo de Rama Fort'], foodRecommendation: 'Candlelight grilled Red Snapper with herbs on Palolem sand beach', bookingType: 'hotel', bookingCtaText: 'Book South Goa Luxury Beach Resort', bookingQuery: 'South Goa beach resort hotel' },
      { day: 5, title: 'Old Goa UNESCO Cathedrals, Flea Market & Departure', activities: ['Visit Basilica of Bom Jesus (relics of St. Francis Xavier) and Se Cathedral', 'Last-minute cashew nut and homemade Goan chocolate shopping before airport transfer'], foodRecommendation: 'Traditional Goan fish cutlets and sweet caramel custard', bookingType: 'flight', bookingCtaText: 'Compare Goa Return Flights on Aviasales', bookingQuery: 'Goa return flights' }
    ]
  },
  kerala: {
    slug: 'kerala',
    name: 'Kerala God\'s Own Country & Backwaters',
    country: 'India',
    region: 'South India (Malabar Coast & Western Ghats)',
    tagline: 'Emerald Tea Plantations, Private Houseboat Canals & Palm-Lined Cliffs',
    heroImage: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=1200&auto=format&fit=crop&q=80',
    bestTimeToVisit: 'September to March (Pleasant 22–30°C, lush waterfalls & tranquil backwaters)',
    idealDays: '5 to 7 Days',
    avgBudgetPerPerson: '₹18,000 - ₹28,000 ($220 - $340)',
    currency: 'Indian Rupee (INR) / ₹',
    visaInfo: 'Domestic: No visa. International: 30-Day Indian eVisa.',
    highlights: [
      'Alleppey (Alappuzha) Private Luxury Houseboat Cruise',
      'Munnar High-Altitude Tea Estates & Eravikulam National Park',
      'Fort Kochi Portuguese Heritage & Chinese Fishing Nets',
      'Varkala Cliff Sunset Beach & Ayurvedic Spa Retreats',
      'Thekkady Periyar Wildlife Sanctuary & Spice Trails'
    ],
    topAttractions: [
      { title: 'Alleppey Private Luxury Houseboat 1-Day & Overnight Cruise', description: 'Air-conditioned luxury Kettuvallam boat with private chef, sun deck, and village canals.', rating: 4.9, badge: 'ICONIC', price: '₹7,500', query: 'Alleppey houseboat private cruise booking' },
      { title: 'Munnar Tea Estate Jeep Safari & Kolukkumalai Sunrise', description: 'Off-road 4WD jeep ascent to world highest tea plantation at 7,130ft for cloud sunrise.', rating: 4.9, badge: 'MUST VISIT', price: '₹2,100', query: 'Munnar Kolukkumalai tea safari' },
      { title: 'Fort Kochi Kathakali & Kalaripayattu Martial Arts Show', description: 'Authentic 90-minute classical drama and ancient martial arts performance.', rating: 4.8, badge: 'CULTURAL GEM', price: '₹450', query: 'Fort Kochi Kathakali show ticket' },
      { title: 'Periyar Tiger Reserve Bamboo Rafting & Jungle Safari', description: 'Full-day hiking and bamboo rafting expedition in pristine wildlife sanctuary.', rating: 4.8, badge: 'NATURE', price: '₹2,600', query: 'Periyar wildlife jungle safari Thekkady' }
    ],
    budgetBreakdown: {
      flight: 8500,
      hotel: 13000,
      transfer: 4500,
      activities: 5000,
      food: 6500,
      esim: 300,
      insurance: 500,
      currencySymbol: '₹',
    },
    sampleItinerary: [
      { day: 1, title: 'Arrival in Kochi, Fort Kochi Walk & Kathakali Evening', activities: ['Arrival at Cochin International Airport (COK)', 'Stroll Portuguese alleys of Fort Kochi, St. Francis Church & Chinese fishing nets', 'Evening Kathakali classical dance and Kalaripayattu martial arts show'], foodRecommendation: 'Fresh Malabar Prawn Curry, Appam & Kerala Parotta with beef fry', bookingType: 'hotel', bookingCtaText: 'Book Fort Kochi Heritage Hotel', bookingQuery: 'Fort Kochi heritage hotel' },
      { day: 2, title: 'Scenic Mountain Drive to Munnar Tea Estates (1,600m)', activities: ['Scenic 3.5h mountain drive stopping at Cheeyappara and Valara waterfalls', 'Check into luxury tea valley resort surrounded by misty plantations', 'Visit Tata KDHP Tea Museum and factory with guided tea tasting'], foodRecommendation: 'Traditional Kerala Sadya on banana leaf with 20+ side curries and Payasam', bookingType: 'hotel', bookingCtaText: 'Book Munnar Tea Garden Resort', bookingQuery: 'Munnar resort hotel' },
      { day: 3, title: 'Eravikulam National Park (Nilgiri Tahr) & Echo Point', activities: ['Morning safari in Eravikulam National Park to spot endangered Nilgiri Tahr mountain goats', 'Visit Mattupetty Dam, Echo Point, and speed boating on Kundala Lake', 'Relaxing 60-min authentic Ayurvedic herbal body massage'], foodRecommendation: 'Kottayam Duck Roast and warm cardamom spiced tea', bookingType: 'attraction', bookingCtaText: 'Book Munnar Day Sightseeing Tour', bookingQuery: 'Munnar day tour' },
      { day: 4, title: 'Munnar to Alleppey: Board Private Luxury Houseboat', activities: ['Descend from the mountains to the tranquil backwaters of Alleppey', 'Board private wooden Kettuvallam houseboat equipped with AC bedroom and private chef', 'Glide through narrow village canals as village life unfolds along the banks'], foodRecommendation: 'Freshly caught Karimeen Pollichathu (Pearl spot fish in roasted spices) & Red Matta Rice', bookingType: 'attraction', bookingCtaText: 'Book Private Alleppey Houseboat', bookingQuery: 'Alleppey houseboat booking' },
      { day: 5, title: 'Sunrise Canoe Ride, Coir Village & Airport Departure', activities: ['Early sunrise wooden canoe ride through shallow canals where large boats cannot enter', 'Disembark houseboat at 10 AM and visit traditional coir manufacturing village', 'Private transfer back to Cochin Airport for departure'], foodRecommendation: 'Fluffy Appams with vegetable stew and fresh coconut water', bookingType: 'flight', bookingCtaText: 'Search Kochi Return Flights on Aviasales', bookingQuery: 'Kochi return flights' }
    ]
  },
  ladakh: {
    slug: 'ladakh',
    name: 'Ladakh High-Altitude Trans-Himalayan Odyssey',
    country: 'India',
    region: 'Ladakh (High Himalayas)',
    tagline: 'World Highest Motorable Passes, Pangong Tso Azure Lake & Nubra Desert Sand Dunes',
    heroImage: 'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?w=1200&auto=format&fit=crop&q=80',
    bestTimeToVisit: 'May to September (Roads open, clear skies, pleasant 15–22°C daytime)',
    idealDays: '6 to 8 Days',
    avgBudgetPerPerson: '₹25,000 - ₹38,000 ($300 - $460)',
    currency: 'Indian Rupee (INR) / ₹',
    visaInfo: 'Domestic: Inner Line Permit (ILP) required (available online in 24h).',
    highlights: [
      'Pangong Tso 134km High-Altitude Salt Lake',
      'Khardung La Pass (17,582 ft) World Highest Motorable Highway',
      'Nubra Valley Hunder Sand Dunes & Double-Humped Camels',
      'Thiksey & Diskit Ancient Buddhist Monasteries',
      'Magnetic Hill & Zanskar-Indus River Confluence'
    ],
    topAttractions: [
      { title: 'Pangong Tso & Chang La Pass 2-Day Expedition', description: 'Overnight in heated lakeshore geodesic domes beneath star-studded Milky Way skies.', rating: 4.9, badge: 'BUCKETLIST', price: '₹4,500', query: 'Pangong Tso Lake tour Ladakh' },
      { title: 'Khardung La Pass & Nubra Valley 4x4 Jeep Safari', description: 'Cross 17,582ft pass to ride double-humped Bactrian camels in Hunder white desert.', rating: 4.9, badge: 'MUST EXPERIENCE', price: '₹4,800', query: 'Nubra Valley Khardung La tour' },
      { title: 'Leh Monasteries & Magnetic Hill Day Excursion', description: 'Visit 12-story Thiksey Monastery, Shey Palace, Magnetic Hill, and Sangam confluence.', rating: 4.8, badge: 'CULTURAL', price: '₹2,200', query: 'Leh sightseeing monastery tour' },
      { title: 'Zanskar River White Water Rafting (Chilling to Sangam)', description: 'Grade 3+ rafting through dramatic high-altitude mountain gorges.', rating: 4.9, badge: 'ADVENTURE', price: '₹1,850', query: 'Zanskar river rafting Ladakh' }
    ],
    budgetBreakdown: {
      flight: 11000,
      hotel: 14000,
      transfer: 6500,
      activities: 5500,
      food: 6500,
      esim: 300,
      insurance: 600,
      currencySymbol: '₹',
    },
    sampleItinerary: [
      { day: 1, title: 'Arrival in Leh (3,500m) & Mandatory Acclimatization', activities: ['Arrival at Kushok Bakula Rimpochee Airport (IXL)', 'Mandatory 24h complete rest in hotel to adapt to thin oxygen', 'Gentle evening stroll in Leh Main Bazaar tasting hot Tibetan momos and butter tea'], foodRecommendation: 'Steamed Tibetan Tingmo with Vegetable Thukpa and Apricot juice', bookingType: 'hotel', bookingCtaText: 'Book Leh Heritage Hotel with Oxygen', bookingQuery: 'Leh hotel with oxygen backup' },
      { day: 2, title: 'Shanti Stupa Sunrise, Thiksey Monastery & Magnetic Hill', activities: ['Golden sunrise over Stok Kangri range from white-domed Shanti Stupa', 'Visit 12-story Thiksey Monastery (mini Potala Palace) for morning Buddhist chant', 'Witness gravity-defying Magnetic Hill and Zanskar-Indus river confluence (Sangam)'], foodRecommendation: 'Ladakhi Chhurpi cheese soup and fresh Skyu pasta stew', bookingType: 'attraction', bookingCtaText: 'Book Leh Valley Monasteries Tour', bookingQuery: 'Leh monastery day tour' },
      { day: 3, title: 'Cross Khardung La Pass (17,582 ft) into Nubra Valley', activities: ['Ascend world highest motorable pass at Khardung La for panoramic photo stop', 'Descend into lush Nubra Valley and visit 32m Golden Maitreya Buddha at Diskit', 'Ride rare double-humped Bactrian camels across Hunder white sand dunes at sunset'], foodRecommendation: 'Balti spiced roasted lamb and organic apricot pie', bookingType: 'attraction', bookingCtaText: 'Book Nubra Valley Jeep Safari', bookingQuery: 'Nubra valley camel safari' },
      { day: 4, title: 'Nubra Valley to Pangong Tso Lake via Shyok River', activities: ['Scenic rugged 4x4 drive navigating dramatic gorges along the turquoise Shyok River', 'Arrive at the magical 134 km Pangong Tso Lake shifting colors from cobalt to emerald', 'Check into heated geodesic domes on the lakeshore for world-class night astrophotography'], foodRecommendation: 'Hot garlic noodle soup and ginger lemon honey tea under the stars', bookingType: 'hotel', bookingCtaText: 'Book Pangong Lake Luxury Heated Camp', bookingQuery: 'Pangong lake luxury camp' },
      { day: 5, title: 'Pangong Sunrise, Cross Chang La Pass & Return to Leh', activities: ['Witness breathtaking golden dawn reflection over Pangong Tso mirror waters', 'Cross 17,585ft Chang La Pass with stop at ancient Hemis Monastery', 'Farewell souvenir shopping in Leh for GI-tagged Pashmina shawls and prayer wheels'], foodRecommendation: 'Traditional Ladakhi Mokthuk (dumplings in spiced soup)', bookingType: 'flight', bookingCtaText: 'Search Leh Return Flights on Aviasales', bookingQuery: 'Leh return flights' }
    ]
  },
  thailand: {
    slug: 'thailand',
    name: 'Thailand Tropical Paradise (Bangkok & Phuket)',
    country: 'Thailand',
    region: 'Southeast Asia',
    tagline: 'Golden Temples, Phi Phi Island Speedboats, Floating Markets & Street Food Capitals',
    heroImage: 'https://images.unsplash.com/photo-1528181304800-259b08848526?w=1200&auto=format&fit=crop&q=80',
    bestTimeToVisit: 'November to April (Dry season, warm sunshine 28–32°C, crystal turquoise waters)',
    idealDays: '5 to 7 Days',
    avgBudgetPerPerson: '₹35,000 - ₹55,000 ($420 - $660)',
    currency: 'Thai Baht (THB) / ฿',
    visaInfo: 'Visa-Free / Instant eVisa for Indian and global travelers.',
    highlights: [
      'Phuket Phi Phi Islands & Maya Bay Speedboat Tour',
      'Bangkok Grand Palace & Wat Arun Temple of Dawn',
      'Damnoen Saduak Floating Market & Maeklong Railway Train Market',
      'Phang Nga Bay James Bond Island Sea Kayaking',
      'Chao Phraya River Princess Luxury Dinner Cruise'
    ],
    topAttractions: [
      { title: 'Phi Phi Islands & Maya Bay Luxury Speedboat Tour', description: 'Visit Maya Bay (The Beach movie), Pileh Lagoon natural pool, Monkey Beach & snorkeling.', rating: 4.9, badge: 'BESTSELLER', price: '₹2,850', query: 'Phi Phi island Maya Bay speedboat tour Phuket' },
      { title: 'Chao Phraya Princess Luxury Dinner Cruise in Bangkok', description: '2-hour illuminated cruise past Wat Arun and Grand Palace with live saxophone & seafood buffet.', rating: 4.8, badge: 'ROMANTIC', price: '₹1,950', query: 'Chao Phraya Princess dinner cruise ticket' },
      { title: 'James Bond Island & Phang Nga Bay Sea Canoe Safari', description: 'Sea canoe through hidden sea caves, limestone karsts, and floating Muslim village.', rating: 4.9, badge: 'MUST VISIT', price: '₹2,600', query: 'James Bond island tour Phuket' },
      { title: 'Bangkok Grand Palace & Wat Phra Kaew Walking Tour', description: 'Skip-the-line guided exploration of sacred Emerald Buddha and royal court pavilions.', rating: 4.8, badge: 'CULTURAL', price: '₹1,450', query: 'Bangkok Grand Palace guided tour' }
    ],
    budgetBreakdown: {
      flight: 16000,
      hotel: 14000,
      transfer: 3500,
      activities: 7500,
      food: 8000,
      esim: 650,
      insurance: 1100,
      currencySymbol: '₹',
    },
    sampleItinerary: [
      { day: 1, title: 'Arrival in Bangkok, Hotel Check-in & Chao Phraya Dinner Cruise', activities: ['Arrival at Suvarnabhumi (BKK) or Don Mueang (DMK) Airport with private transfer', 'Check into riverfront boutique hotel', 'Evening luxury dinner cruise along Chao Phraya River with illuminated temple views'], foodRecommendation: 'Pad Thai Goong (Stir-fried rice noodles with king prawns) & Mango Sticky Rice', bookingType: 'transfer', bookingCtaText: 'Book Bangkok Airport VIP Transfer', bookingQuery: 'Bangkok BKK airport transfer' },
      { day: 2, title: 'Grand Palace, Wat Pho Reclining Buddha & Wat Arun', activities: ['Morning guided tour of ornate Grand Palace and Temple of the Emerald Buddha', 'Visit giant 46-meter gold-leaf Reclining Buddha at Wat Pho', 'Cross river by ferry to iconic ceramic porcelain spires of Wat Arun (Temple of Dawn)'], foodRecommendation: 'Tom Yum Goong (Hot and sour lemongrass prawn soup) & Green Papaya Salad (Som Tum)', bookingType: 'attraction', bookingCtaText: 'Book Bangkok Temples Guided Pass', bookingQuery: 'Bangkok temples guided tour' },
      { day: 3, title: 'Fly to Phuket, Patong Beach & Old Phuket Town', activities: ['Short 1h 15m domestic flight to Phuket (HKT)', 'Check into Andaman beachfront pool resort', 'Afternoon walk through colorful Sino-Portuguese heritage shophouses in Old Phuket Town', 'Sunset drinks at Promthep Cape viewpoint'], foodRecommendation: 'Massaman Curry with tender braised chicken and coconut milk', bookingType: 'hotel', bookingCtaText: 'Book Phuket Beachfront Resort', bookingQuery: 'Phuket beachfront resort' },
      { day: 4, title: 'Phi Phi Islands, Maya Bay & Pileh Lagoon Speedboat Tour', activities: ['Fast speedboat across turquoise Andaman Sea to iconic Maya Bay', 'Jump into emerald waters of Pileh Lagoon natural cliff pool for swimming', 'Snorkel with tropical coral fish and sea turtles at Bamboo Island'], foodRecommendation: 'Fresh whole grilled Andaman Snapper with Thai sweet chili dip', bookingType: 'attraction', bookingCtaText: 'Book Phi Phi Islands Speedboat Tour', bookingQuery: 'Phi Phi islands speedboat tour' },
      { day: 5, title: 'James Bond Island Sea Canoe, Thai Massage & Departure', activities: ['Sea canoe through limestone caves of Phang Nga Bay', 'Authentic 90-min traditional Thai herbal wellness massage', 'Departure transfer to Phuket airport for return flight'], foodRecommendation: 'Crispy Banana Pancakes with condensed milk and Thai Iced Milk Tea', bookingType: 'flight', bookingCtaText: 'Search Thailand Return Flights on Aviasales', bookingQuery: 'Thailand return flights' }
    ]
  },
  maldives: {
    slug: 'maldives',
    name: 'Maldives Overwater Luxury Archipelago',
    country: 'Maldives',
    region: 'Indian Ocean',
    tagline: 'Private Overwater Bungalows, Turquoise Atolls, Manta Ray Reefs & Seaplane Flights',
    heroImage: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=1200&auto=format&fit=crop&q=80',
    bestTimeToVisit: 'November to April (Warm 29°C tropical sunshine, calm crystal-clear seas)',
    idealDays: '4 to 6 Days',
    avgBudgetPerPerson: '₹75,000 - ₹1,40,000 ($900 - $1,700)',
    currency: 'Maldivian Rufiyaa (MVR) / USD ($)',
    visaInfo: 'Free 30-Day Visa on Arrival for all international tourists.',
    highlights: [
      'Private Overwater Pool Villa with direct ocean reef access',
      'Scenic Trans-Maldivian Seaplane Aerial Flight',
      'Snorkeling with wild Manta Rays, Whale Sharks & Sea Turtles',
      'Private Sandbank Sunset Picnic & Candlelight Beach Dinner',
      'Underwater Restaurant & Subwing Coral Diving'
    ],
    topAttractions: [
      { title: 'Maldives Manta Ray & Nurse Shark Snorkeling Safari', description: 'Guided boat cruise to swim safely with nurse sharks, eagle rays, and vibrant coral reefs.', rating: 4.9, badge: 'UNFORGETTABLE', price: '₹4,800', query: 'Maldives shark and ray snorkeling tour' },
      { title: 'Private Sandbank Romantic Picnic with Drone Photoshoot', description: 'Speedboat transfer to an isolated white sandbank in the middle of the turquoise ocean.', rating: 4.9, badge: 'HONEYMOON PICK', price: '₹6,500', query: 'Maldives sandbank private tour' },
      { title: 'Scenic Seaplane Aerial Island Flight Experience', description: 'Breathtaking bird-eye views of coral atolls, blue lagoons, and luxury resorts.', rating: 4.9, badge: 'ICONIC', price: '₹14,500', query: 'Maldives seaplane flight booking' },
      { title: 'Sunset Dolphin Cruise with Complimentary Sparkling Wine', description: 'Watch hundreds of playful spinner dolphins leaping against golden ocean sunset.', rating: 4.8, badge: 'POPULAR', price: '₹3,200', query: 'Maldives sunset dolphin cruise' }
    ],
    budgetBreakdown: {
      flight: 22000,
      hotel: 45000,
      transfer: 12000,
      activities: 14000,
      food: 18000,
      esim: 850,
      insurance: 1800,
      currencySymbol: '₹',
    },
    sampleItinerary: [
      { day: 1, title: 'Arrival at Male (MLE), Seaplane Ride & Overwater Villa Check-in', activities: ['Touchdown at Velana International Airport (Male)', 'Scenic seaplane or luxury speedboat transfer directly to your private island resort', 'Check into glass-floor overwater villa with direct ladder into coral lagoon'], foodRecommendation: 'Grilled Maldivian Yellowfin Tuna steak with fresh lime and coconut rice', bookingType: 'hotel', bookingCtaText: 'Book Maldives Overwater Luxury Resort', bookingQuery: 'Maldives overwater villa resort' },
      { day: 2, title: 'House Reef Snorkeling, Sea Turtles & Lagoon Kayaking', activities: ['Morning snorkeling right from your villa sundeck among butterflyfish and turtles', 'Transparent glass-bottom kayak paddle across calm turquoise lagoon', 'Sunset cocktails at poolside overwater bar'], foodRecommendation: 'Mas Huni (Smoked tuna mixed with freshly grated coconut, chili, and warm roshi flatbread)', bookingType: 'attraction', bookingCtaText: 'Book Reef Snorkeling Tour', bookingQuery: 'Maldives snorkeling pass' },
      { day: 3, title: 'Private Sandbank Escape & Manta Ray Snorkel Expedition', activities: ['Boat expedition to Baa Atoll UNESCO biosphere to swim alongside gentle Manta Rays', 'Private picnic on secluded white-sand sandbank surrounded by 360° turquoise waters', 'Evening Stargazing cinema night on the beach sand'], foodRecommendation: 'Fresh seafood barbecue with rock lobster and jumbo tiger prawns', bookingType: 'attraction', bookingCtaText: 'Book Sandbank & Manta Ray Tour', bookingQuery: 'Maldives sandbank tour' },
      { day: 4, title: 'Underwater Spa, Sunset Dolphin Cruise & Candlelight Dinner', activities: ['Rejuvenating couples massage at overwater glass-floor spa pavilion', 'Speedboat sunset cruise following pods of playful wild spinner dolphins', 'Private 5-course candlelight dinner right on the ocean shoreline with torchlights'], foodRecommendation: 'Fine dining 5-course gourmet ocean menu with champagne', bookingType: 'attraction', bookingCtaText: 'Book Sunset Dolphin Cruise', bookingQuery: 'Maldives dolphin cruise' },
      { day: 5, title: 'Last Ocean Dip, Souvenirs in Male & Return Flight', activities: ['Final sunrise swim in infinity ocean pool', 'Speedboat transfer back to Male for quick lacquer craft shopping before departure flight'], foodRecommendation: 'Tropical coconut water and Maldivian short eats (Hedhikaa pastries)', bookingType: 'flight', bookingCtaText: 'Search Return Flights on Aviasales', bookingQuery: 'Maldives return flights' }
    ]
  },
  japan: {
    slug: 'japan',
    name: 'Japan & Tokyo Golden Route',
    country: 'Japan',
    region: 'East Asia',
    tagline: 'Ancient Shrines, Bullet Trains, Neon Skylines & Mount Fuji',
    heroImage: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=1200&auto=format&fit=crop&q=80',
    bestTimeToVisit: 'March–May (Cherry Blossoms) & October–November (Autumn Foliage)',
    idealDays: '7 to 10 Days',
    avgBudgetPerPerson: '₹1,35,000 - ₹1,75,000 ($1,600 - $2,100)',
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
    avgBudgetPerPerson: '₹65,000 - ₹95,000 ($800 - $1,200)',
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
    avgBudgetPerPerson: '₹48,000 - ₹75,000 ($600 - $900)',
    currency: 'Indonesian Rupiah (IDR) / Rp',
    visaInfo: 'Visa on Arrival (VoA) / 30-Day e-VoA online ($35)',
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
    avgBudgetPerPerson: '₹1,90,000 - ₹2,60,000 ($2,300 - $3,200)',
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
    name: 'Kashmir - Heaven on Earth & Dal Lake',
    country: 'India',
    region: 'Himalayas',
    tagline: 'Floating Shikaras, Snow Valleys, Pine Forests & Alpine Glacial Lakes',
    heroImage: 'https://images.unsplash.com/photo-1598091383021-15ddea10925d?w=1200&auto=format&fit=crop&q=80',
    bestTimeToVisit: 'April to October (Lush meadows & lakes) or Dec–Feb (Snow skiing in Gulmarg)',
    idealDays: '5 to 7 Days',
    avgBudgetPerPerson: '₹22,000 - ₹35,000 ($265 - $420)',
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
      flight: 9500,
      hotel: 11000,
      transfer: 4500,
      activities: 4500,
      food: 5500,
      esim: 300,
      insurance: 500,
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

/**
 * Universal Dynamic AI Destination Synthesizer
 * Generates an accurate, rich DestinationGuide for ANY destination worldwide (e.g. Shimla, Kedarnath, Ooty, Darjeeling, Paris, Rome, Singapore, etc.)
 */
export function generateDynamicDestinationGuide(
  rawName: string,
  targetBudget?: number,
  durationDays: number = 5,
  travelers: number = 2,
  travelStyle: 'Budget' | 'Comfort' | 'Luxury' = 'Comfort'
): DestinationGuide {
  const cleanName = rawName
    .replace(/^(trip to|visit|holiday in|vacation in|guide for|budget for|for|in)\s+/i, '')
    .replace(/\s+(trip|holiday|vacation|tour|package|for couple|for solo|couple|solo)$/i, '')
    .trim();
  
  const titleName = cleanName.charAt(0).toUpperCase() + cleanName.slice(1);
  const slug = cleanName.toLowerCase().replace(/[^a-z0-9]+/g, '-');

  // Determine domestic vs international
  const domesticIndianKeywords = [
    'manali', 'shimla', 'goa', 'kerala', 'kashmir', 'ladakh', 'leh', 'rishikesh', 'haridwar',
    'kedarnath', 'badrinath', 'ooty', 'coorg', 'darjeeling', 'sikkim', 'gangtok', 'jaipur',
    'udaipur', 'jaisalmer', 'rajasthan', 'varanasi', 'amritsar', 'pondicherry', 'pondicherry',
    'meghalaya', 'shillong', 'hampi', 'mysore', 'munnar', 'wayanad', 'alleppey', 'andaman',
    'havelock', 'port blair', 'kasol', 'spiti', 'dharamshala', 'nainital', 'mussoorie',
    'chail', 'kullu', 'jodhpur', 'pushkar', 'agra', 'delhi', 'mumbai', 'kolkata', 'bangalore'
  ];

  const isDomestic = domesticIndianKeywords.some(k => slug.includes(k) || k.includes(slug));

  // Determine budget distribution
  const totalBudget = targetBudget && targetBudget > 10000
    ? targetBudget
    : isDomestic
      ? (travelStyle === 'Budget' ? 25000 : travelStyle === 'Luxury' ? 65000 : 40000)
      : (travelStyle === 'Budget' ? 70000 : travelStyle === 'Luxury' ? 220000 : 130000);

  // Per person allocations
  const perPaxBudget = totalBudget / Math.max(travelers, 1);
  const flightAlloc = Math.round(perPaxBudget * (isDomestic ? 0.22 : 0.32));
  const hotelAlloc = Math.round(perPaxBudget * (isDomestic ? 0.36 : 0.34));
  const transferAlloc = Math.round(perPaxBudget * 0.10);
  const activitiesAlloc = Math.round(perPaxBudget * 0.14);
  const foodAlloc = Math.round(perPaxBudget * 0.14);
  const esimAlloc = isDomestic ? 300 : 950;
  const insuranceAlloc = isDomestic ? 500 : 1800;

  return {
    slug,
    name: `${titleName} ${isDomestic ? 'Mountain & Cultural Discovery' : 'Scenic Gateway & City Highlights'}`,
    country: isDomestic ? 'India' : 'International Destination',
    region: isDomestic ? 'India' : 'Global',
    tagline: `Curated ${durationDays}-Day Verified Journey with Scenic Viewpoints, Local Delicacies & Top Passes`,
    heroImage: isDomestic
      ? 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200&auto=format&fit=crop&q=80'
      : 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200&auto=format&fit=crop&q=80',
    bestTimeToVisit: isDomestic ? 'September to May (Pleasant weather & clear mountain skies)' : 'All Year Round / Spring & Autumn',
    idealDays: `${durationDays} Days`,
    avgBudgetPerPerson: `₹${Math.round(perPaxBudget * 0.85).toLocaleString('en-IN')} - ₹${Math.round(perPaxBudget * 1.15).toLocaleString('en-IN')}`,
    currency: isDomestic ? 'Indian Rupee (INR) / ₹' : 'Local Currency / USD',
    visaInfo: isDomestic ? 'Domestic Travel: No visa required.' : 'e-Visa / Visa on Arrival available for most travelers.',
    highlights: [
      `${titleName} City Center & Historic Heritage Quarter`,
      `Scenic Day Tour & Panoramic Lookout Viewpoints`,
      `Local Artisanal Markets & Authentic Food Crawl`,
      `Skip-The-Line Experience & Nature Excursions`,
      `Sunset Photography & Evening Cultural Highlights`
    ],
    topAttractions: [
      {
        title: `${titleName} City Highlights & Sightseeing Pass`,
        description: `Explore top landmarks, heritage monuments, and photography spots in ${titleName}.`,
        rating: 4.9,
        badge: 'BESTSELLER',
        price: `₹${Math.round(activitiesAlloc * 0.4).toLocaleString('en-IN')}`,
        query: `${titleName} tour pass`
      },
      {
        title: `${titleName} Day Excursion & Nature Adventure`,
        description: `Guided day tour to scenic valleys, viewpoints, and signature regional attractions.`,
        rating: 4.8,
        badge: 'TOP RATED',
        price: `₹${Math.round(activitiesAlloc * 0.6).toLocaleString('en-IN')}`,
        query: `${titleName} day tour`
      }
    ],
    budgetBreakdown: {
      flight: flightAlloc,
      hotel: hotelAlloc,
      transfer: transferAlloc,
      activities: activitiesAlloc,
      food: foodAlloc,
      esim: esimAlloc,
      insurance: insuranceAlloc,
      currencySymbol: '₹',
    },
    sampleItinerary: [
      {
        day: 1,
        title: `Arrival in ${titleName}, Hotel Check-in & Orientation Walk`,
        activities: [
          `Arrival at nearest airport/station with private chauffeur pickup`,
          `Check into verified boutique ${travelStyle} stay`,
          `Evening orientation stroll around central promenade tasting regional street snacks`
        ],
        foodRecommendation: `Signature regional welcome dinner & artisanal tea/coffee`,
        bookingType: 'hotel',
        bookingCtaText: `Book ${titleName} Hotel`,
        bookingQuery: `${titleName} hotel booking`
      },
      {
        day: 2,
        title: `${titleName} Iconic Heritage & Cultural Highlights`,
        activities: [
          `Morning visit to historic landmarks and iconic architecture`,
          `Explore local markets for authentic handicrafts and spices`,
          `Sunset panoramic photography overlooking the city/valley`
        ],
        foodRecommendation: `Authentic regional thali or signature chef's special`,
        bookingType: 'attraction',
        bookingCtaText: `Book ${titleName} Sightseeing Pass`,
        bookingQuery: `${titleName} tour pass`
      },
      {
        day: 3,
        title: `Scenic Nature Excursion & Outdoor Adventure`,
        activities: [
          `Full-day scenic excursion to nearby valleys, viewpoints, or water bodies`,
          `Outdoor hiking, ropeway gondola, or boat cruise experience`,
          `Relaxing evening cafe unwind with mountain/ocean sunset`
        ],
        foodRecommendation: `Fresh farm-to-table lunch & regional desserts`,
        bookingType: 'attraction',
        bookingCtaText: `Book ${titleName} Nature Tour`,
        bookingQuery: `${titleName} excursion tour`
      },
      {
        day: 4,
        title: `Hidden Gems, Wellness & Local Gastronomy`,
        activities: [
          `Visit offbeat village trails, ancient shrines, or botanical gardens`,
          `Hands-on local food tasting walk or wellness massage`,
          `Starlit dinner with live cultural music`
        ],
        foodRecommendation: `Famous local bakery treats & hot regional beverages`,
        bookingType: 'attraction',
        bookingCtaText: `Book ${titleName} Experience`,
        bookingQuery: `${titleName} activity booking`
      },
      {
        day: 5,
        title: `Souvenir Shopping & Departure`,
        activities: [
          `Morning souvenir shopping for dry fruits, handloom & local specialities`,
          `Check-out and private transfer to airport/station for departure`
        ],
        foodRecommendation: `Farewell brunch with authentic local tea/coffee`,
        bookingType: 'flight',
        bookingCtaText: `Search Return Flights on Aviasales`,
        bookingQuery: `${titleName} return flights`
      }
    ]
  };
}

/**
 * Intelligent Destination Resolver:
 * Checks built-in catalog, adapts custom budget if provided, or dynamically synthesizes guide for ANY location!
 */
export function getDestinationBySlug(
  slugOrName: string,
  targetBudget?: number,
  durationDays: number = 5,
  travelers: number = 2,
  travelStyle: 'Budget' | 'Comfort' | 'Luxury' = 'Comfort'
): DestinationGuide {
  const clean = slugOrName.toLowerCase().trim();

  // 1. Direct match in curated dataset
  if (DESTINATIONS_DATA[clean]) {
    const base = DESTINATIONS_DATA[clean];
    if (targetBudget && targetBudget > 10000) {
      return adaptGuideBudget(base, targetBudget, durationDays, travelers);
    }
    return base;
  }

  // 2. Fuzzy substring match in curated dataset
  const found = Object.values(DESTINATIONS_DATA).find(
    (d) =>
      d.slug.includes(clean) ||
      clean.includes(d.slug) ||
      d.name.toLowerCase().includes(clean) ||
      clean.includes(d.name.toLowerCase())
  );

  if (found) {
    if (targetBudget && targetBudget > 10000) {
      return adaptGuideBudget(found, targetBudget, durationDays, travelers);
    }
    return found;
  }

  // 3. Dynamic AI Synthesis for ANY other destination in India or worldwide!
  return generateDynamicDestinationGuide(slugOrName, targetBudget, durationDays, travelers, travelStyle);
}

/**
 * Adjusts budget components proportionally when user specifies a custom budget
 */
function adaptGuideBudget(
  base: DestinationGuide,
  targetBudget: number,
  durationDays: number,
  travelers: number
): DestinationGuide {
  const perPax = targetBudget / Math.max(travelers, 1);
  const currentTotalPerPax =
    base.budgetBreakdown.flight +
    (base.budgetBreakdown.hotel / 2) +
    base.budgetBreakdown.transfer +
    base.budgetBreakdown.activities +
    base.budgetBreakdown.food +
    base.budgetBreakdown.esim +
    base.budgetBreakdown.insurance;

  const ratio = perPax / Math.max(currentTotalPerPax, 1);

  return {
    ...base,
    budgetBreakdown: {
      flight: Math.round(base.budgetBreakdown.flight * ratio),
      hotel: Math.round(base.budgetBreakdown.hotel * ratio),
      transfer: Math.round(base.budgetBreakdown.transfer * ratio),
      activities: Math.round(base.budgetBreakdown.activities * ratio),
      food: Math.round(base.budgetBreakdown.food * ratio),
      esim: base.budgetBreakdown.esim,
      insurance: base.budgetBreakdown.insurance,
      currencySymbol: base.budgetBreakdown.currencySymbol,
    }
  };
}

