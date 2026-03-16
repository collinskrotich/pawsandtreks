import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import {
  ChevronDown, ChevronUp, Clock, CheckCircle2, XCircle,
  MapPin, ArrowRight, Menu, X, CalendarDays, Users,
  Star, Binoculars, Tent, Phone, MessageCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const stagger = {
  visible: { transition: { staggerChildren: 0.12 } }
};

interface DayItinerary {
  day: number;
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

const packages: SafariPackage[] = [
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
          "Full day in the park in search of the Big Five. Experience the breathtaking plains teeming with wildebeest, zebras, lions, elephants and much more. Meals and overnight at the campsite. Optional visit to the Maasai Village in the afternoon to experience the local culture.",
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
          "Early breakfast, then proceed for a game drive to Lake Nakuru — world renowned for its masses of flamingoes, often referred to as the 'Pink Lake'. Spot small game including Water Buck, Impala, Rhino and Buffalo. After lunch depart to Nairobi arriving around 4–5 pm.",
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
    highlights: ["Masai Mara, Nakuru & Amboseli", "Big Five sighting", "Kilimanjaro backdrop in Amboseli", "Flamingos at Lake Nakuru", "Optional hot-air balloon"],
  },
];

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Safaris", href: "/#safaris" },
  { label: "Destinations", href: "/#destinations" },
  { label: "Packages", href: "/packages" },
  { label: "Gallery", href: "/#gallery" },
  { label: "About", href: "/#about" },
  { label: "Blog", href: "/#blog" },
  { label: "Contact", href: "/#contact" },
];

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/95 backdrop-blur-md border-b shadow-sm" : "bg-background/95 backdrop-blur-md border-b"
      }`}
      data-testid="navbar-packages"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 h-16 sm:h-20">
          <Link href="/" className="flex items-center gap-2 shrink-0" data-testid="link-logo-packages">
            <img src="/images/logo.png" alt="Paws & Treks" className="h-10 sm:h-12 w-auto" />
            <span className="hidden sm:block font-serif text-lg font-bold text-foreground">
              Paws & Treks
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={`px-3 py-2 text-sm font-medium rounded-md transition-colors hover-elevate text-foreground/70 ${
                  link.label === "Packages" ? "text-primary font-semibold" : ""
                }`}
                data-testid={`link-nav-pkg-${link.label.toLowerCase()}`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <Link href="/#contact">
              <Button size="sm" data-testid="button-book-now-packages">
                Book Now
              </Button>
            </Link>
            <button
              className="lg:hidden p-2 rounded-md text-foreground"
              onClick={() => setIsOpen(!isOpen)}
              aria-expanded={isOpen}
              aria-label="Toggle navigation menu"
              data-testid="button-mobile-menu-packages"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:hidden bg-background/98 backdrop-blur-md border-b"
        >
          <div className="px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="block px-4 py-3 text-sm font-medium text-foreground/80 rounded-md hover-elevate"
                onClick={() => setIsOpen(false)}
                data-testid={`link-mobile-pkg-${link.label.toLowerCase()}`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </nav>
  );
}

function PackageCard({ pkg, index }: { pkg: SafariPackage; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState<"itinerary" | "inclusions">("itinerary");

  return (
    <motion.div variants={fadeInUp} id={pkg.id}>
      <Card className="border-card-border overflow-visible" data-testid={`card-package-${pkg.id}`}>
        <div className="grid grid-cols-1 lg:grid-cols-5">
          {/* Image */}
          <div className="lg:col-span-2 relative">
            <div className="relative h-56 lg:h-full min-h-[280px] overflow-hidden rounded-t-lg lg:rounded-l-lg lg:rounded-tr-none">
              <img
                src={pkg.image}
                alt={pkg.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-black/10" />
              <div className="absolute top-4 left-4">
                <Badge data-testid={`badge-tag-${pkg.id}`}>{pkg.tag}</Badge>
              </div>
              <div className="absolute bottom-4 left-4 lg:hidden">
                <h2 className="font-serif text-xl font-bold text-white">{pkg.title}</h2>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-3 p-6 sm:p-8 flex flex-col gap-5">
            {/* Header */}
            <div>
              <h2 className="hidden lg:block font-serif text-2xl font-bold mb-2" data-testid={`text-package-title-${pkg.id}`}>
                {pkg.title}
              </h2>
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-3">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-primary" />
                  {pkg.duration}
                </span>
                <span className="flex items-center gap-1.5">
                  <CalendarDays className="w-4 h-4 text-primary" />
                  {pkg.days} Days
                </span>
                <span className="flex items-center gap-1.5">
                  <Binoculars className="w-4 h-4 text-primary" />
                  Game Drives Daily
                </span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{pkg.overview}</p>
            </div>

            {/* Highlights */}
            <div className="flex flex-wrap gap-2">
              {pkg.highlights.map((h, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1 bg-primary/10 text-primary text-xs font-medium px-2.5 py-1 rounded-md"
                  data-testid={`tag-highlight-${pkg.id}-${i}`}
                >
                  <Star className="w-3 h-3" />
                  {h}
                </span>
              ))}
            </div>

            {/* CTA row */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                className="flex items-center gap-2 text-sm font-semibold text-primary"
                onClick={() => setExpanded(!expanded)}
                data-testid={`button-expand-${pkg.id}`}
              >
                {expanded ? (
                  <>Hide Details <ChevronUp className="w-4 h-4" /></>
                ) : (
                  <>View Full Itinerary <ChevronDown className="w-4 h-4" /></>
                )}
              </button>
              <div className="ml-auto flex gap-2">
                <a href="https://wa.me/254769784190" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="sm" data-testid={`button-whatsapp-${pkg.id}`}>
                    <MessageCircle className="w-4 h-4 mr-1" /> WhatsApp
                  </Button>
                </a>
                <Link href="/#contact">
                  <Button size="sm" data-testid={`button-book-${pkg.id}`}>
                    Book This Safari <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Expanded Detail */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35 }}
              className="border-t border-card-border overflow-hidden"
            >
              <div className="p-6 sm:p-8">
                {/* Tabs */}
                <div className="flex gap-1 mb-6 bg-muted p-1 rounded-md w-fit">
                  <button
                    className={`px-4 py-1.5 rounded text-sm font-medium transition-colors ${
                      activeTab === "itinerary"
                        ? "bg-background text-foreground shadow-sm"
                        : "text-muted-foreground"
                    }`}
                    onClick={() => setActiveTab("itinerary")}
                    data-testid={`tab-itinerary-${pkg.id}`}
                  >
                    Day-by-Day Itinerary
                  </button>
                  <button
                    className={`px-4 py-1.5 rounded text-sm font-medium transition-colors ${
                      activeTab === "inclusions"
                        ? "bg-background text-foreground shadow-sm"
                        : "text-muted-foreground"
                    }`}
                    onClick={() => setActiveTab("inclusions")}
                    data-testid={`tab-inclusions-${pkg.id}`}
                  >
                    Inclusions & Exclusions
                  </button>
                </div>

                <AnimatePresence mode="wait">
                  {activeTab === "itinerary" && (
                    <motion.div
                      key="itinerary"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="relative">
                        {/* Vertical line */}
                        <div className="absolute left-5 top-0 bottom-0 w-px bg-border hidden sm:block" />

                        <div className="space-y-6">
                          {pkg.itinerary.map((day, i) => (
                            <div key={i} className="sm:pl-16 relative" data-testid={`day-${pkg.id}-${day.day}`}>
                              {/* Day bubble */}
                              <div className="hidden sm:flex absolute left-0 top-0 w-10 h-10 rounded-full bg-primary text-primary-foreground items-center justify-center text-sm font-bold shrink-0">
                                {day.day}
                              </div>
                              <div className="sm:hidden flex items-center gap-2 mb-2">
                                <div className="w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold shrink-0">
                                  {day.day}
                                </div>
                                <h4 className="font-serif font-bold text-base">{day.title}</h4>
                              </div>
                              <div className="hidden sm:block">
                                <h4 className="font-serif font-bold text-base mb-1">{day.title}</h4>
                              </div>
                              <p className="text-sm text-muted-foreground leading-relaxed mt-1">{day.description}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === "inclusions" && (
                    <motion.div
                      key="inclusions"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                        <div>
                          <h4 className="font-serif font-bold text-base mb-4 flex items-center gap-2 text-green-700 dark:text-green-400">
                            <CheckCircle2 className="w-5 h-5" />
                            What's Included
                          </h4>
                          <ul className="space-y-3">
                            {pkg.inclusions.map((item, i) => (
                              <li key={i} className="flex items-start gap-3 text-sm" data-testid={`inclusion-${pkg.id}-${i}`}>
                                <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-serif font-bold text-base mb-4 flex items-center gap-2 text-destructive">
                            <XCircle className="w-5 h-5" />
                            Not Included
                          </h4>
                          <ul className="space-y-3">
                            {pkg.exclusions.map((item, i) => (
                              <li key={i} className="flex items-start gap-3 text-sm" data-testid={`exclusion-${pkg.id}-${i}`}>
                                <XCircle className="w-4 h-4 text-destructive shrink-0 mt-0.5" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>

                          <div className="mt-8 p-4 bg-primary/5 rounded-md border border-primary/10">
                            <p className="text-sm font-semibold mb-2">Ready to book?</p>
                            <p className="text-xs text-muted-foreground mb-3">Contact us for pricing and availability.</p>
                            <div className="flex flex-col gap-2">
                              <a
                                href="tel:+254728719053"
                                className="flex items-center gap-2 text-xs text-primary font-medium"
                                data-testid={`link-phone-${pkg.id}`}
                              >
                                <Phone className="w-3.5 h-3.5" /> +254-728-719-053
                              </a>
                              <a
                                href="mailto:pawsandtreks@gmail.com"
                                className="flex items-center gap-2 text-xs text-primary font-medium"
                                data-testid={`link-email-${pkg.id}`}
                              >
                                <MapPin className="w-3.5 h-3.5" /> pawsandtreks@gmail.com
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </motion.div>
  );
}

export default function Packages() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Safari Packages - Paws & Treks";
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-20" data-testid="section-packages-hero">
        <div className="relative h-64 sm:h-80 overflow-hidden">
          <img
            src="/images/safari_vehicle.jpg"
            alt="Safari packages"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-amber-400 font-medium tracking-widest uppercase text-sm mb-3"
            >
              Choose Your Adventure
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4"
              data-testid="heading-packages-page"
            >
              Safari Packages
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-white/80 max-w-xl text-sm sm:text-base"
            >
              Carefully crafted itineraries for every type of traveler — from weekend getaways to epic multi-park adventures.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Quick filter badges */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" data-testid="section-filter">
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-sm font-medium text-muted-foreground">Quick jump:</span>
          {packages.map((pkg) => (
            <a
              key={pkg.id}
              href={`#${pkg.id}`}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-card border border-card-border rounded-md text-sm font-medium hover-elevate"
              data-testid={`link-jump-${pkg.id}`}
            >
              <Clock className="w-3.5 h-3.5 text-primary" />
              {pkg.days} Days
            </a>
          ))}
        </div>
      </section>

      {/* Packages List */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20" data-testid="section-packages-list">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="space-y-8"
        >
          {packages.map((pkg, i) => (
            <PackageCard key={pkg.id} pkg={pkg} index={i} />
          ))}
        </motion.div>
      </section>

      {/* Bottom CTA */}
      <section className="relative py-20" data-testid="section-packages-cta">
        <div className="absolute inset-0">
          <img
            src="/images/amboseli.jpg"
            alt="Plan your safari"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.h2 variants={fadeInUp} className="font-serif text-3xl sm:text-4xl font-bold text-white mb-4">
              Can't Find the Right Package?
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-white/80 mb-6">
              We create tailor-made safaris to fit your schedule, group size, and budget. Get in touch and we'll design your perfect safari.
            </motion.p>
            <motion.div variants={fadeInUp} className="flex flex-wrap justify-center gap-4">
              <Link href="/#contact">
                <Button size="lg" data-testid="button-cta-contact">
                  Get in Touch <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <a href="https://wa.me/254769784190" target="_blank" rel="noopener noreferrer">
                <Button size="lg" variant="outline" className="backdrop-blur-sm bg-white/10 text-white border-white/30" data-testid="button-cta-whatsapp">
                  <MessageCircle className="w-4 h-4 mr-2" /> Chat on WhatsApp
                </Button>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer strip */}
      <div className="bg-foreground text-background/60 text-center text-xs py-5" data-testid="footer-packages">
        <p>&copy; {new Date().getFullYear()} Paws and Treks Tours and Travel. All rights reserved.</p>
      </div>
    </div>
  );
}
