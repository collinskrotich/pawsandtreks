import { NextResponse } from "next/server";
import { timingSafeEqual } from "crypto";

// ─── Bearer Token Auth ─────────────────────────────────────────────────────────

function unauthorized() {
  return new NextResponse("Unauthorized", {
    status: 401,
    headers: { "WWW-Authenticate": 'Bearer realm="Paws & Treks API"' },
  });
}

function verifyBearerToken(authHeader: string | null): boolean {
  if (!authHeader?.startsWith("Bearer ")) return false;

  const expectedToken = process.env.API_BEARER_TOKEN;
  if (!expectedToken) {
    // Token not configured — deny all access
    return false;
  }

  const suppliedToken = authHeader.slice(7);

  // Constant-time comparison to prevent timing attacks
  try {
    return timingSafeEqual(
      Buffer.from(suppliedToken),
      Buffer.from(expectedToken)
    );
  } catch {
    // Buffers of different lengths throw — token doesn't match
    return false;
  }
}

// ─── Types ────────────────────────────────────────────────────────────────────

interface DayItinerary {
  day: number | string;
  title: string;
  description: string;
}

interface SafariPackage {
  id: string;
  title: string;
  duration: string;
  days: number;
  image: string;
  tag: string;
  overview: string;
  itinerary: DayItinerary[];
  inclusions: string[];
  exclusions: string[];
  highlights: string[];
}

// ─── Package Data ──────────────────────────────────────────────────────────────

const bestSafariDeals: SafariPackage[] = [
  {
    id: "masai-mara-3d",
    title: "3-Days Masai Mara Camping",
    duration: "3 Days / 2 Nights",
    days: 3,
    image: "/images/masai_mara.jpg",
    tag: "Best Seller",
    overview:
      "Discover the highlights of Masai Mara National Reserve on this affordable, group-joining safari adventure starting daily from Nairobi. Enjoy daily game drives across the vast African plains, home to the Big Five, wildebeest Migration, abundant wildlife and rich birdlife.",
    itinerary: [
      {
        day: 1,
        title: "Nairobi – Masai Mara",
        description:
          "Depart Nairobi in the morning for a journey south through the floor of the Great Rift Valley. Enjoy a stopover at the Rift Valley viewpoint for photographs. Lunch at Narok town. Arrive at the Mara in the late afternoon for an evening game drive. Dinner and overnight at the preferred campsite.",
      },
      {
        day: 2,
        title: "Masai Mara Full Day",
        description:
          "Full day in the park in search of the Big Five. Experience the breathtaking plains teeming with wildebeest, zebras, lions, elephants and much more. Meals and overnight at the campsite. Optional visit to the Maasai Village in the afternoon.",
      },
      {
        day: 3,
        title: "Masai Mara – Nairobi",
        description:
          "Early morning breakfast with optional Maasai village visit. Drive back to Nairobi via Narok town for lunch. Arrive in Nairobi around 3:30 pm.",
      },
    ],
    inclusions: [
      "Park entrance fees",
      "Drinking water",
      "Transport in private 4×4 Land Cruiser",
      "Accommodation in budget Lodge/tented camp",
      "Three meals a day (except first breakfast and last dinner)",
      "Services of a qualified driver guide",
    ],
    exclusions: ["Any other item not mentioned above"],
    highlights: ["Big Five sighting", "Great Migration", "Maasai Village visit", "Rift Valley viewpoint"],
  },
  {
    id: "mara-nakuru-4d",
    title: "4-Days Masai Mara / Lake Nakuru Camping Safari",
    duration: "4 Days / 3 Nights",
    days: 4,
    image: "/images/lake_nakuru.jpg",
    tag: "Popular",
    overview:
      "Discover the Masai Mara National Reserve and Lake Nakuru National Park on a 4-day budget safari featuring daily game drives, abundant wildlife, and the chance to witness the Big Five along with iconic sights as the Great Mara Migration. Explore Lake Nakuru's rich habitats — home to flamingos, endangered rhinos, Rothschild giraffes and diverse birdlife.",
    itinerary: [
      {
        day: 1,
        title: "Nairobi / Masai Mara",
        description:
          "8:00 AM depart from Nairobi to Maasai Mara Game Reserve with a stopover at the Great Rift Valley viewpoint. Arrive in Masai Mara late afternoon and proceed for a game drive. Dinner and overnight stay at the camp.",
      },
      {
        day: 2,
        title: "Masai Mara Full Day",
        description:
          "Early breakfast, full day exploring this unique park which really forms the northern part of the famous Serengeti National Park. Encounter the Big Five and the spectacular herds that roam the open savannah. Meals and overnight at camp.",
      },
      {
        day: 3,
        title: "Masai Mara / Lake Nakuru",
        description:
          "Early breakfast with optional Maasai village visit. Departure for Lake Nakuru with a game drive en route and picnic lunch. Arrive Nakuru early evening, dinner and overnight at a budget hotel.",
      },
      {
        day: 4,
        title: "Lake Nakuru / Nairobi",
        description:
          "Early breakfast, then proceed for a game drive to Lake Nakuru — world renowned for its masses of flamingoes, often referred to as the 'Pink Lake'. Spot Water Buck, Impala, Rhino and Buffalo. After lunch depart to Nairobi arriving around 4–5 pm.",
      },
    ],
    inclusions: [
      "Park entrance fees",
      "Drinking water",
      "Transport in private 4×4 Land Cruiser",
      "Accommodation in budget Lodge/tented camp",
      "Three meals a day (except first breakfast and last dinner)",
      "Services of a qualified driver guide",
    ],
    exclusions: ["Any other item not mentioned above"],
    highlights: ["Big Five sighting", "Flamingo viewing at Lake Nakuru", "Rhino & giraffe sighting", "Optional hot-air balloon safari"],
  },
  {
    id: "mara-nakuru-amboseli-5d",
    title: "5-Days Masai Mara / Nakuru / Amboseli Camping",
    duration: "5 Days / 4 Nights",
    days: 5,
    image: "/images/amboseli.jpg",
    tag: "Great Value",
    overview:
      "An exceptional 5-day journey through three of Kenya's most spectacular parks — Masai Mara, Lake Nakuru and Amboseli. This safari combines the best of Kenya's wildlife experiences: the Great Migration, flamingo-fringed lakes, and the iconic silhouette of elephants against Mount Kilimanjaro.",
    itinerary: [
      {
        day: 1,
        title: "Nairobi / Masai Mara",
        description:
          "Leave Nairobi and journey south along the Great Rift Valley. Lunch at Narok, arrive Mara in the afternoon for an evening game drive. Dinner and overnight at the campsite.",
      },
      {
        day: 2,
        title: "Masai Mara Full Day",
        description:
          "Full day spent game viewing across the rich, tree-studded grassland and rolling hills in search of the Big Five. All meals and overnight in the campsite.",
      },
      {
        day: 3,
        title: "Masai Mara Full Day",
        description:
          "Early morning leave the camp for a morning game drive until lunchtime, return to camp for lunch. Afternoon: optional nature walks or a visit to the Maasai village, return to campsite for dinner and overnight stay.",
      },
      {
        day: 4,
        title: "Masai Mara / Lake Nakuru",
        description:
          "Early morning breakfast with optional Maasai village visit. Check out and depart for Lake Nakuru with game drive en route and picnic lunch. Arrive in Nakuru early evening for dinner and overnight stay at a hotel.",
      },
      {
        day: 5,
        title: "Lake Nakuru / Nairobi",
        description:
          "After early morning breakfast, proceed for an extensive morning game drive in Lake Nakuru National Park known for its millions of flamingoes and other water birds. Leave Nakuru after lunch, back to Nairobi arriving in late afternoon.",
      },
    ],
    inclusions: [
      "Park entrance fees",
      "Drinking water",
      "Transport in private 4×4 Land Cruiser",
      "Accommodation in budget Lodge/tented camp",
      "Three meals a day (except first breakfast and last dinner)",
      "Services of a qualified driver guide",
    ],
    exclusions: ["Any other item not mentioned above"],
    highlights: ["Three national parks", "Big Five sighting", "Flamingos at Lake Nakuru", "Elephants with Kilimanjaro backdrop"],
  },
  {
    id: "mara-nakuru-amboseli-7d",
    title: "7-Days Masai Mara / Lake Nakuru / Amboseli Camping",
    duration: "7 Days / 6 Nights",
    days: 7,
    image: "/images/gallery_balloon.jpg",
    tag: "Epic Journey",
    overview:
      "Embark on an epic budget adventure through Kenya's top wildlife reserves, beginning with the stunning Great Rift Valley, continuing to the Masai Mara in search of the Big Five, and lastly, Amboseli National Park at the foot of Mount Kilimanjaro — offering breathtaking mountain views and sightings of large elephant herds.",
    itinerary: [
      {
        day: 1,
        title: "Nairobi / Masai Mara",
        description:
          "Leave Nairobi for Masai Mara Game Reserve. Picnic lunch en route. On arrival proceed for a game drive in search of the Big Five. Return to the campsite for dinner and overnight stay.",
      },
      {
        day: 2,
        title: "Masai Mara Game Drive",
        description:
          "A full day spent game viewing across the rich, tree-studded grassland and rolling hills. The famous Mara is renowned for its great herds of plain game and the Big Five. All meals and overnight stay in the campsite.",
      },
      {
        day: 3,
        title: "Masai Mara Full Day",
        description:
          "Continue exploring the Masai Mara with full-day game drives. Optional visit to the Maasai village to experience the local culture and traditions. Meals and overnight at the campsite.",
      },
      {
        day: 4,
        title: "Masai Mara / Lake Nakuru",
        description:
          "After an early game drive leave Masai Mara for Nakuru National Park. Picnic lunch en route through the scenic Rift Valley. Dinner and overnight at a hotel.",
      },
      {
        day: 5,
        title: "Nakuru / Amboseli",
        description:
          "After breakfast enjoy a morning game drive at Lake Nakuru. Have lunch in Nairobi and proceed to Amboseli National Park. Once in the park proceed for a short game drive. Dinner and overnight at the campsite.",
      },
      {
        day: 6,
        title: "Amboseli National Reserve",
        description:
          "Full day in Amboseli with stunning views of Mount Kilimanjaro and large herds of elephants. Optional tour to the Maasai village. Meals and night at the campsite.",
      },
      {
        day: 7,
        title: "Amboseli / Nairobi",
        description:
          "After breakfast leave campsite for the last game drive as you exit the park for Nairobi. Picnic lunch served en route. Arrive in Nairobi late afternoon with unforgettable memories.",
      },
    ],
    inclusions: [
      "Park entrance fees",
      "Drinking water",
      "Transport in private 4×4 Land Cruiser",
      "Accommodation in budget Lodge/tented camp",
      "Three meals a day (except first breakfast and last dinner)",
      "Services of a qualified driver guide",
    ],
    exclusions: ["Any other item not mentioned above"],
    highlights: ["Masai Mara, Nakuru & Amboseli", "Big Five sighting", "Kilimanjaro backdrop", "Flamingos at Lake Nakuru", "Optional hot-air balloon"],
  },
];

const privateSafaris: SafariPackage[] = [
  {
    id: "private-mara-3d",
    title: "3-Days Masai Mara 4×4 Private Camping / Lodge Safari",
    duration: "3 Days / 2 Nights",
    days: 3,
    image: "/images/safari_vehicle.jpg",
    tag: "Private Safari",
    overview:
      "A fully private 3-day safari to Masai Mara National Reserve in a dedicated 4×4 Land Cruiser. Enjoy personalised game drives, the chance to see the Big Five, and the flexibility to customise your experience including optional cultural visits to the Maasai village.",
    itinerary: [
      {
        day: 1,
        title: "Nairobi – Masai Mara",
        description:
          "Depart from Nairobi in the morning for a journey south through the floor of the Great Rift Valley. Picnic lunch at Narok. Arrive at Masai Mara for late afternoon game viewing en route. Early evening game drive. Dinner and overnight at the Lodge/tented camp.",
      },
      {
        day: 2,
        title: "Masai Mara Full Day",
        description:
          "Full day in the park in search of the Big Five. Meals and overnight at budget Lodge/tented camp. Optional visit to the Maasai Village in the afternoon or continue with the game drive.",
      },
      {
        day: 3,
        title: "Masai Mara – Nairobi",
        description:
          "Early morning breakfast with optional Maasai village visit. Then check out and drive back to Nairobi via Narok town for lunch. Arrive in Nairobi in the evening.",
      },
    ],
    inclusions: [
      "Park entrance fees",
      "Drinking water",
      "Transport in private 4×4 Land Cruiser",
      "Accommodation in budget Lodge/tented camp",
      "Three meals a day (except first breakfast and last dinner)",
      "Services of a qualified driver guide",
    ],
    exclusions: ["Any other item not mentioned above"],
    highlights: ["Fully private vehicle", "Big Five sighting", "Flexible itinerary", "Maasai village option"],
  },
  {
    id: "private-nakuru-naivasha-mara-5d",
    title: "5-Days Nakuru / Naivasha / Masai Mara Private 4×4 Safari",
    duration: "5 Days / 4 Nights",
    days: 5,
    image: "/images/lake_nakuru.jpg",
    tag: "Luxury Private",
    overview:
      "Absolute luxury adventure to Kenya's best game reserve Masai Mara National Reserve, down the Great Rift Valley to Lake Nakuru National Park — home to the rare white rhino species and bird paradise with the famous flamingos. Move next to neighbouring Lake Naivasha for a boat ride, hippo viewing, and a visit to Hell's Gate National Park and Crescent Island.",
    itinerary: [
      {
        day: 1,
        title: "Nairobi / Lake Nakuru",
        description:
          "Depart from Nairobi for a drive into the Rift Valley and onto Lake Nakuru National Park, internationally famous as an animal sanctuary for both black and white Rhinos. Check in at Lake Nakuru Lodge for lunch. Evening game drive including a walk by the shores of the lake. Dinner and overnight stay at the Lodge.",
      },
      {
        day: 2,
        title: "Nakuru / Naivasha",
        description:
          "Leisurely breakfast at the lodge, further game drive in the park and depart late morning for Lake Naivasha. Check in at a lodge and lunch. Late afternoon, visit the Crescent Island for more wildlife and bird viewing. Dinner and overnight stay at the Lodge.",
      },
      {
        day: 3,
        title: "Naivasha / Masai Mara",
        description:
          "Early breakfast and drive to the Masai Mara. Arrive for lunch at the lodge. Enjoy an afternoon game drive tracking the Big Five. Dinner and overnight stay at the lodge.",
      },
      {
        day: 4,
        title: "Masai Mara Full Day",
        description:
          "Early morning breakfast, proceed for a full day game drive with picnic lunch in the bush. The Mara offers unparalleled game viewing with the Big Five and the great wildebeest herds. Dinner and overnight stay at the Lodge.",
      },
      {
        day: 5,
        title: "Masai Mara / Nairobi",
        description:
          "Early breakfast with optional Maasai village visit. Drive back to Nairobi via Narok town for lunch. Arrive in Nairobi in the late afternoon.",
      },
    ],
    inclusions: [
      "Transport on 4×4 Land Cruiser",
      "Full board accommodation whilst on safari",
      "All park entrance fees",
      "Service of an English-speaking professional driver/guide",
      "Bottled water whilst on safari",
      "Start and end in Nairobi",
      "Personalised service",
    ],
    exclusions: ["Any other item not mentioned above"],
    highlights: ["Lake Nakuru rhinos & flamingos", "Naivasha boat ride", "Hell's Gate & Crescent Island", "Masai Mara Big Five", "Full board accommodation"],
  },
  {
    id: "private-mara-nakuru-4d",
    title: "4-Days Masai Mara & Nakuru 4×4 Private Camping Safari",
    duration: "4 Days / 3 Nights",
    days: 4,
    image: "/images/samburu.jpg",
    tag: "Private Safari",
    overview:
      "Discover the Masai Mara National Reserve and Lake Nakuru on a fully private 4×4 Land Cruiser Camping Safari. See the park's stunning Great Migration, enjoy bird watching, and take an optional visit to the Maasai village or a balloon safari.",
    itinerary: [
      {
        day: 1,
        title: "Nairobi / Masai Mara",
        description:
          "Leave Nairobi at 8:00 am to Maasai Mara Game Reserve with a stopover at the Great Rift Valley viewpoint. Arrive Masai Mara late afternoon and proceed for a game drive, dinner and overnight at your lodge/camp.",
      },
      {
        day: 2,
        title: "Masai Mara Full Day",
        description:
          "After breakfast with picnic lunch, spend the full day exploring this unique park which really forms the northern part of the famous Serengeti National Park. Meals and overnight at your Lodge/camp.",
      },
      {
        day: 3,
        title: "Masai Mara / Lake Nakuru",
        description:
          "Early breakfast with optional Maasai village visit. Depart for Lake Nakuru with game drive en route and picnic lunch. Arrive in Nakuru early evening for dinner and overnight at your lodge/camp.",
      },
      {
        day: 4,
        title: "Lake Nakuru / Nairobi",
        description:
          "After breakfast proceed for a game drive to Lake Nakuru — world renowned for its masses of flamingoes and often referred to as the 'Pink Lake'. Spot Water Buck, Impala, Rhino and Buffalo in the gardens surrounding. After lunch depart to Nairobi arriving around 4–5 pm.",
      },
    ],
    inclusions: [
      "Park entrance fees",
      "Drinking water",
      "Transport in private 4×4 Land Cruiser",
      "Accommodation in budget Lodge/tented camp",
      "Three meals a day (except first breakfast and last dinner)",
      "Services of a qualified driver guide",
    ],
    exclusions: ["Any other item not mentioned above"],
    highlights: ["Fully private 4×4", "Great Migration viewing", "Bird watching", "Optional balloon safari", "Optional Maasai village"],
  },
  {
    id: "nairobi-np-1d",
    title: "Nairobi National Park – Day Trip",
    duration: "1 Day",
    days: 1,
    image: "/safari/nairobi.jpeg",
    tag: "Day Trip",
    overview:
      "Experience the unique thrill of a wildlife safari just minutes from Kenya's capital city. Nairobi National Park is the only national park in the world within a capital city, home to lions, leopards, rhinos, buffaloes, giraffes, zebras and over 400 bird species — all set against the dramatic Nairobi skyline.",
    itinerary: [
      {
        day: 1,
        title: "Nairobi National Park Game Drive",
        description:
          "Early morning pick-up from your Nairobi hotel or residence. Enter Nairobi National Park for a guided game drive through open grass plains, scattered acacia bush, and steep rocky valleys. Spot the Big Four (lion, leopard, buffalo, rhino), hippos at the hippo pools, and diverse birdlife. Enjoy a packed lunch or bush picnic. Afternoon game drive before exiting the park. Drop-off at your hotel by late afternoon.",
      },
    ],
    inclusions: [
      "Park entrance fees",
      "Transport in 4×4 Land Cruiser",
      "Services of a professional driver/guide",
      "Bottled drinking water",
      "Pick-up and drop-off from Nairobi hotel",
    ],
    exclusions: ["Lunch (can be arranged on request)", "Any other item not mentioned above"],
    highlights: ["Big Four sighting", "City skyline backdrop", "400+ bird species", "Hippo pools", "Close to Nairobi"],
  },
];

const excitingAdventures: SafariPackage[] = [
  {
    id: "photographic-safari-10d",
    title: "Photographic Safari",
    duration: "10 Days / 9 Nights",
    days: 10,
    image: "/images/gallery_leopard.jpg",
    tag: "Photography",
    overview:
      "A dedicated 10-day photography safari through Kenya's finest wildlife reserves — Masai Mara, Lake Nakuru, and Samburu. Ideal for professional and amateur photographers alike, this tour gives you maximum time in each park with optimal lighting conditions at sunrise and golden hour.",
    itinerary: [
      {
        day: 1,
        title: "Nairobi / Masai Mara",
        description:
          "Depart Nairobi towards south along the floor of Rift Valley past Narok to reach Masai Mara by lunchtime. After photography, spend the afternoon at leisure. All meals and overnight at a lodge/hotel.",
      },
      {
        day: 2,
        title: "Masai Mara – Photography Day",
        description:
          "This day is dedicated to photography — sunrise game drives for the best golden light, midday sessions, and evening shoots. All meals and overnight at a lodge/campsite.",
      },
      {
        day: 3,
        title: "Masai Mara – Photography Day",
        description:
          "Spent the day taking photographs in the park — tracking the Big Five, capturing the wildebeest herds and dramatic big-sky landscapes. All meals and overnight at a lodge/campsite.",
      },
      {
        day: 4,
        title: "Masai Mara – Full Day Photography",
        description:
          "Full day photography session. Capture river crossings, predator action, and sweeping savannah vistas. All meals and overnight at a lodge/campsite.",
      },
      {
        day: 5,
        title: "Masai Mara / Lake Nakuru",
        description:
          "After breakfast leave Masai Mara for lunch at Lake Nakuru. The lake is known for its large variety of flamingoes and many tropical birds. Dinner and overnight at a lodge.",
      },
      {
        day: 6,
        title: "Lake Nakuru – Photography Day",
        description:
          "Spectacular photography in the park — flamingoes, rhinos, Rothschild giraffes and prolific birdlife await your lens. All meals and overnight at a lodge/campsite.",
      },
      {
        day: 7,
        title: "Lake Nakuru / Samburu",
        description:
          "Depart Lake Nakuru for Samburu National Reserve. Afternoon game drive and photographing the Samburu Special Five — Grevy's zebra, reticulated giraffe, Beisa oryx, Somali ostrich and gerenuk. Dinner and overnight at a Lodge/Campsite.",
      },
      {
        day: 8,
        title: "Samburu – Photography Day",
        description:
          "Get the best shots in Samburu — a remote wilderness with dramatic landscapes and unique northern Kenya wildlife. All meals and overnight at a lodge/campsite.",
      },
      {
        day: 9,
        title: "Samburu – Final Photography Day",
        description:
          "This is the final day to capture those shots you might have missed. Memorable meals and overnight at a lodge/campsite.",
      },
      {
        day: 10,
        title: "Samburu / Nairobi",
        description:
          "After breakfast depart for Nairobi for your next destination, taking home a treasure trove of wildlife photographs.",
      },
    ],
    inclusions: [
      "Park entrance fees",
      "Drinking water",
      "Transport in private 4×4 Land Cruiser",
      "Accommodation in budget Lodge/tented camp",
      "Three meals a day (except first breakfast and last dinner)",
      "Services of a qualified driver guide",
    ],
    exclusions: ["Any other item not mentioned above"],
    highlights: ["Masai Mara, Nakuru & Samburu", "Optimal photography lighting", "Big Five & Samburu Special Five", "Flamingoes & rare birds", "Sunrise game drives"],
  },
  {
    id: "balloon-safari",
    title: "Masai Mara Balloon Safari",
    duration: "1 Hour Flight",
    days: 1,
    image: "/images/gallery_balloon.jpg",
    tag: "Bucket List",
    overview:
      "No visit to the Maasai Mara can be complete without a trip in a hot-air balloon. Taking off in the beautiful early morning light, you drift above the browsing game and have tremendous opportunities for unusual photography. At the end of the flight, land on the plains where a champagne-style breakfast is served before driving back to your lodge or camp.",
    itinerary: [
      {
        day: "1 Hour",
        title: "The Fabulous Mara Balloon Safari",
        description:
          "Balloons lift off at sunrise when the plains are calm and wildlife is most active. The silent flight glides over the Maasai Mara, offering breathtaking views of the landscape and wildlife as the pilot adjusts altitude for close-up or elevated scenery. After landing, guests enjoy a full champagne breakfast followed by a game drive that may reveal the same animals seen from the air. Many travelers even spot four of the Big Five during the flight — an experience like no other on earth.",
      },
    ],
    inclusions: [
      "Park entrance fees",
      "Drinking water",
      "Transport in private 4×4 Land Cruiser",
    ],
    exclusions: ["Any other item not mentioned above"],
    highlights: ["Sunrise balloon flight", "Champagne breakfast on the plains", "Bird's-eye wildlife views", "Optional follow-up game drive", "Perfect for honeymooners"],
  },
  {
    id: "birdwatching-10d",
    title: "Bird Watching Safari – Customisable to Preference",
    duration: "10 Days / 9 Nights",
    days: 10,
    image: "/images/lake_nakuru.jpg",
    tag: "Birdwatching",
    overview:
      "A specialist bird watching safari through Kenya's most diverse avian habitats — Meru National Park, Samburu National Reserve, Lake Nakuru, Lake Baringo, and Lake Naivasha. Kenya is home to over 1,100 bird species, and this itinerary has been crafted to maximise sightings of the rarest and most spectacular. Fully customisable to your preferences.",
    itinerary: [
      {
        day: 1,
        title: "Nairobi / Meru National Park",
        description:
          "Depart Nairobi past the Central Highlands to Meru National Park. Afternoon bird watching in this beautiful and less-visited park. Dinner and overnight at a lodge or campsite.",
      },
      {
        day: 2,
        title: "Meru National Park – Bird Watching Day",
        description:
          "Spend the full day bird watching in Meru — home to over 400 species including the palm-nut vulture, African finfoot and many more. All meals and overnight at a lodge or campsite.",
      },
      {
        day: 3,
        title: "Meru / Samburu National Reserve",
        description:
          "Depart Meru National Park for Samburu arriving in time for lunch. Afternoon bird watching — look out for the Somali ostrich, Vulturine guineafowl and northern specials. Dinner and overnight at a lodge or campsite.",
      },
      {
        day: 4,
        title: "Samburu – Bird Watching Day",
        description:
          "Spend the day bird watching in Samburu. All meals and overnight at a lodge or campsite.",
      },
      {
        day: 5,
        title: "Samburu / Lake Nakuru",
        description:
          "Depart Samburu after breakfast for Lake Nakuru National Park. After lunch, spend the afternoon bird watching around the lake's shores, famous for its masses of flamingoes.",
      },
      {
        day: 6,
        title: "Lake Nakuru / Lake Baringo",
        description:
          "Early morning bird watching at Lake Nakuru before departing for Lake Baringo in the afternoon — one of Africa's finest birding sites with over 470 recorded species. Dinner and overnight at a lodge or campsite.",
      },
      {
        day: 7,
        title: "Lake Baringo – Bird Watching Day",
        description:
          "Spend the full day bird watching at Lake Baringo, including boat trips on the lake for waterbirds and raptors. All meals and overnight at a lodge or campsite.",
      },
      {
        day: 8,
        title: "Lake Baringo / Lake Naivasha",
        description:
          "After breakfast at Lake Baringo, depart for Lake Naivasha to arrive in time for lunch. Spend the afternoon bird watching in this stunning freshwater lake ringed by yellow fever trees. Dinner and overnight at a lodge or campsite.",
      },
      {
        day: 9,
        title: "Lake Naivasha – Bird Watching Day",
        description:
          "This day is dedicated to bird watching at Lake Naivasha — kingfishers, fish eagles, herons, African jacanas and hundreds more await. All meals and overnight at a lodge or campsite.",
      },
      {
        day: 10,
        title: "Lake Naivasha / Nairobi",
        description:
          "After breakfast, return to Nairobi with a lifetime of birding memories and a magnificent checklist.",
      },
    ],
    inclusions: [
      "Park entrance fees",
      "Drinking water",
      "Transport in private 4×4 Land Cruiser",
      "Accommodation in budget Lodge/tented camp",
      "Three meals a day (except first breakfast and last dinner)",
      "Services of a qualified driver guide",
    ],
    exclusions: ["Any other item not mentioned above"],
    highlights: ["1,100+ species in Kenya", "Meru, Samburu, Nakuru, Baringo & Naivasha", "Flamingoes at Lake Nakuru", "Boat trips at Lake Baringo", "Fully customisable route"],
  },
];

const kenyaCamping: SafariPackage[] = [
  {
    id: "gatamaiyu-bush-camp",
    title: "The All Natural Gatamaiyu Bush Camp",
    duration: "1–2 Days",
    days: 1,
    image: "/images/mount_kenya.jpg",
    tag: "Nature Escape",
    overview:
      "Nature lovers meet raw experience. For nature lovers, this is the closest you could be. Camp in the heart of Gatamaiyu forest, explore the falls, discover your own nature trail, enjoy bird photography, and experience the unforgettable thrill of true bush camping.",
    itinerary: [
      {
        day: 1,
        title: "Nairobi / Gatamaiyu Bush Camp",
        description:
          "Leave Nairobi and arrive in the afternoon for nature walks, fishing, and photography. Dinner and tent self-set up for the night stay in the camp. Experience evening bonfires under the stars in this pristine forest setting.",
      },
      {
        day: "Camp Experience",
        title: "The Camping Experience",
        description:
          "Experience the unforgettable camping in Gatamaiyu forest — the falls, beautiful nature walks, the chance to discover your own nature trail, treks, and lots of photography. Return to Nairobi at your preferred time.",
      },
    ],
    inclusions: [
      "Private transport to and from",
      "Camping ground with optional tents",
      "Evening bonfires",
      "Services of a qualified guide",
    ],
    exclusions: ["Bring your own food and drinks", "Any other item not mentioned above"],
    highlights: ["Gatamaiyu forest", "Nature walks & waterfalls", "Fishing", "Photography", "Self-set bonfire camping"],
  },
  {
    id: "ole-tepesi-lodge",
    title: "The Stone House Ole-Tepesi Lodge and Camp",
    duration: "1–2 Days",
    days: 2,
    image: "/images/samburu.jpg",
    tag: "Hidden Gem",
    overview:
      "Explore the hidden gem in Ol-Tepesi, Kajiado County — a stunning retreat through the scenic and peaceful landscapes of the southern Rift Valley. Ideal for a short break from the city, with activities from hiking and archery to Maasai community visits and wildlife viewing.",
    itinerary: [
      {
        day: 1,
        title: "Nairobi / Ole-Tepesi",
        description:
          "Travel from Nairobi through the scenic and peaceful landscapes of the southern part of the Rift Valley to the Stone House. Arrive for a splendid evening stay at the cottages or set up your own tent. Dinner served and overnight stay.",
      },
      {
        day: 2,
        title: "Activities & Return",
        description:
          "Pick activities to engage with — hiking and trekking, archery, swimming, evening bonfires, board games, Maasai community visits, and wildlife and bird viewing. Trip back to Nairobi with an option of a second overnight stay at the camp.",
      },
    ],
    inclusions: [
      "Private transport to and from",
      "Camping ground with optional tents",
      "Evening bonfires",
      "Services of a qualified guide",
    ],
    exclusions: ["Bring your own food and drinks", "Any other item not mentioned above"],
    highlights: ["Southern Rift Valley scenery", "Hiking & trekking", "Archery & swimming", "Maasai community visits", "Evening bonfires", "Wildlife & bird viewing"],
  },
  {
    id: "aberdares-tented-camp",
    title: "The Aberdares Tented Bush Camp",
    duration: "2 Days / 1 Night",
    days: 2,
    image: "/images/mount_kenya.jpg",
    tag: "Highland Camp",
    overview:
      "Camp at the foothills of the great Aberdares — a highland escape offering a rich blend of activities from tea factory visits and fly fishing to cycling tours and boat rides, all set within one of Kenya's most spectacular mountain ranges.",
    itinerary: [
      {
        day: 1,
        title: "Nairobi / Aberdares",
        description:
          "Travel from Nairobi to the Aberdares. Arrive in the evening for dinner and tent or lodge set-up for the night stay. Settle into the tranquil highland atmosphere with bonfires and fresh mountain air.",
      },
      {
        day: 2,
        title: "Aberdares Activities & Return",
        description:
          "Choose from a full menu of activities: tea factory visits, boat riding, fly fishing, cycling tours, hiking tours, photography, and sightseeing. Optional second-night camping available. Travel back to Nairobi.",
      },
    ],
    inclusions: [
      "Meals and drinks at the Camp",
      "Private transport to and from",
      "Accommodation in the tented camp/Lodge",
      "Evening bonfires",
      "Services of a qualified guide",
    ],
    exclusions: ["Any other item not mentioned above"],
    highlights: ["Aberdares foothills", "Tea factory visits", "Fly fishing & boat riding", "Cycling & hiking tours", "Photography & sightseeing"],
  },
  {
    id: "jangwani-sagana-camp",
    title: "Jangwani Sagana Lodge and Tented Camp",
    duration: "2 Days / 1 Night",
    days: 2,
    image: "/images/amboseli.jpg",
    tag: "River Adventure",
    overview:
      "Head to Sagana in Nyeri County for a riverside adventure combining white-water rafting, photography, sightseeing, and a cosy overnight camp stay with music and storytelling around the bonfire.",
    itinerary: [
      {
        day: 1,
        title: "Nairobi / Sagana",
        description:
          "Head to Sagana in Nyeri County. Arrive in the late afternoon for meals and drinks. Set up tents for the overnight camp stay, with music and storytelling by the fire as the Sagana River rushes nearby.",
      },
      {
        day: 2,
        title: "Sagana / Nairobi",
        description:
          "Breakfast followed by white-water rafting sessions on the Sagana River, photography, and sightseeing along the river banks. Lunch at the camp before travelling back to Nairobi.",
      },
    ],
    inclusions: [
      "Meals and drinks at the Camp (or self-catered meals/drinks)",
      "Private transport to and from",
      "Accommodation in the tented camp/Lodge",
      "Evening bonfires",
      "Services of a qualified guide",
    ],
    exclusions: ["Any other item not mentioned above"],
    highlights: ["Sagana River white-water rafting", "Tented river-side camp", "Music & storytelling", "Photography & sightseeing", "Nyeri County scenery"],
  },
];

// ─── Route Handler ─────────────────────────────────────────────────────────────

export async function GET(request: Request) {
  if (!verifyBearerToken(request.headers.get("authorization"))) {
    return unauthorized();
  }

  const response = {
    meta: {
      title: "Paws & Treks – Safari Packages",
      description:
        "Complete catalogue of safari packages offered by Paws & Treks, a Kenya-based tour operator.",
      contact: {
        phone: "+254-769-784-190",
        whatsapp: "https://wa.me/254769784190",
        email: "pawsandtreks@gmail.com",
      },
      totalPackages:
        bestSafariDeals.length +
        privateSafaris.length +
        excitingAdventures.length +
        kenyaCamping.length,
      generatedAt: new Date().toISOString(),
    },
    categories: [
      {
        id: "best-safari-deals",
        label: "Best Safari Deals",
        description:
          "Affordable group safari adventures starting daily from Nairobi — perfect for first-time visitors and budget-conscious travelers.",
        packageCount: bestSafariDeals.length,
        packages: bestSafariDeals,
      },
      {
        id: "top-private-safaris",
        label: "Top Private Safaris",
        description:
          "Fully private 4×4 Land Cruiser safaris tailored entirely to your group — your vehicle, your pace, your experience.",
        packageCount: privateSafaris.length,
        packages: privateSafaris,
      },
      {
        id: "exciting-adventures",
        label: "Exciting Adventures",
        description:
          "Beyond the classic game drive — specialist safari experiences for photography enthusiasts, balloon seekers, and dedicated bird watchers.",
        packageCount: excitingAdventures.length,
        packages: excitingAdventures,
      },
      {
        id: "kenya-camping",
        label: "Kenya Camping",
        description:
          "Escape the city and reconnect with nature — forest camps, riverside retreats, and highland hideaways within easy reach of Nairobi.",
        packageCount: kenyaCamping.length,
        packages: kenyaCamping,
      },
    ],
  };

  return NextResponse.json(response, {
    status: 200,
    headers: {
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
