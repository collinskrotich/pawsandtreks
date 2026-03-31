/**
 * SEO Schema Markup Generation
 * Generates structured data for search engines and social platforms
 */

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Paws & Treks",
  description: "Expert-guided safari tours across Kenya's most iconic wildlife destinations",
  url: "https://pawsandtreks.com",
  logo: "https://pawsandtreks.com/images/logo.png",
  image: "https://pawsandtreks.com/images/safari_hero.jpg",
  sameAs: [
    "https://www.facebook.com/pawsandtreks",
    "https://www.instagram.com/pawsandtreks",
    "https://twitter.com/pawsandtreks",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "Customer Service",
    telephone: "+254-769-784-190",
    email: "bookings@pawsandtreks.com",
    areaServed: "KE",
    availableLanguage: ["en", "sw"],
  },
};

export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Paws & Treks",
  description: "Luxury and budget safari tours in Kenya",
  image: "https://pawsandtreks.com/images/safari_hero.jpg",
  url: "https://pawsandtreks.com",
  telephone: "+254-769-784-190",
  email: "bookings@pawsandtreks.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Westlands",
    addressLocality: "Nairobi",
    addressCountry: "KE",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: -1.2694,
    longitude: 36.8121,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "08:00",
      closes: "18:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Sunday",
      opens: "10:00",
      closes: "16:00",
    },
  ],
  priceRange: "$200 - $1,200",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5",
    reviewCount: "3",
    bestRating: "5",
    worstRating: "1",
  },
  review: [
    {
      "@type": "Review",
      author: { "@type": "Person", name: "Patrick Robinski" },
      reviewRating: { "@type": "Rating", ratingValue: "5" },
      reviewBody:
        "I really enjoyed Masai Mara the culture and Amboseli, made new friends and will definitely visit again with family.",
    },
    {
      "@type": "Review",
      author: { "@type": "Person", name: "Sandra Longman" },
      reviewRating: { "@type": "Rating", ratingValue: "5" },
      reviewBody:
        "I loved the experience, the tour driver was very helpful guiding us through, great bird watching at Nakuru and Naivasha parks.",
    },
  ],
};

export const generatTourServiceSchema = (title: string, description: string, duration: string, price: string) => ({
  "@context": "https://schema.org",
  "@type": "Product",
  name: title,
  description: description,
  brand: {
    "@type": "Organization",
    name: "Paws & Treks",
  },
  image: "https://pawsandtreks.com/images/safari_hero.jpg",
  duration: duration,
  offers: {
    "@type": "Offer",
    price: price.replace("$", ""),
    priceCurrency: "USD",
    availability: "https://schema.org/InStock",
    seller: {
      "@type": "Organization",
      name: "Paws & Treks",
    },
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5",
    reviewCount: "500",
  },
});

export const breadcrumbSchema = (items: Array<{ name: string; url: string }>) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: item.name,
    item: item.url,
  })),
});

export const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is the best time to visit Maasai Mara?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The best time to visit Maasai Mara is during the dry seasons: June-October (best for Great Migration) and January-February. However, each season offers unique wildlife viewing opportunities.",
      },
    },
    {
      "@type": "Question",
      name: "Are your safaris suitable for families with children?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes! We offer tailor-made safaris suitable for families with children. Our guides are experienced with families and we can arrange family-friendly accommodations and activities.",
      },
    },
    {
      "@type": "Question",
      name: "What is included in the safari packages?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Our packages typically include accommodation, expert guide services, meals, airport transfers, and park entry fees. Specific inclusions vary by package.",
      },
    },
    {
      "@type": "Question",
      name: "Do you offer private safaris?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes! We offer exclusive private safaris tailored specifically to your preferences, interests, and budget. Contact us to customize your experience.",
      },
    },
    {
      "@type": "Question",
      name: "What should I pack for a Kenya safari?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Essential items include neutral-colored clothing, sturdy walking shoes, sun protection (hat, sunscreen), binoculars, camera gear, and travel documents. Check our detailed packing guide on our blog.",
      },
    },
  ],
};

export const generateDestinationSchema = (
  name: string,
  description: string,
  latitude: string,
  longitude: string
) => ({
  "@context": "https://schema.org",
  "@type": "TouristAttraction",
  name: name,
  description: description,
  image: "https://pawsandtreks.com/images/safari_hero.jpg",
  geo: {
    "@type": "GeoCoordinates",
    latitude: latitude,
    longitude: longitude,
  },
  touristType: "Scenic Area",
  offers: {
    "@type": "Offer",
    availability: "https://schema.org/InStock",
    seller: {
      "@type": "Organization",
      name: "Paws & Treks",
    },
  },
});

export const eventSchema = {
  "@context": "https://schema.org",
  "@type": "Event",
  name: "Kenya Safari Tour",
  description: "Discover Kenya's wild beauty with Paws & Treks",
  url: "https://pawsandtreks.com",
  eventStatus: "EventScheduled",
  eventAttendanceMode: "OfflineEventAttendanceMode",
  location: {
    "@type": "Place",
    name: "Kenya",
    address: {
      "@type": "PostalAddress",
      addressCountry: "KE",
    },
  },
  organizer: {
    "@type": "Organization",
    name: "Paws & Treks",
    url: "https://pawsandtreks.com",
  },
  offers: {
    "@type": "Offer",
    url: "https://pawsandtreks.com/book",
    price: "200-1200",
    priceCurrency: "USD",
    availability: "https://schema.org/InStock",
    validFrom: "2024-01-01T00:00:00Z",
  },
};
