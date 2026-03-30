"use client";
import { useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Menu, X, Globe, Thermometer, Backpack, Stethoscope, Zap,
  DollarSign, ShieldCheck, Phone, MessageCircle
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Footer from "@/components/Footer";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const stagger = {
  visible: { transition: { staggerChildren: 0.08 } }
};

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Destinations", href: "/#destinations" },
  { label: "Packages", href: "/packages" },
  { label: "Gallery", href: "/gallery" },
  { label: "Blog", href: "/blog" },
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
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 h-16 sm:h-20">
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <img src="/images/logo.png" alt="Paws & Treks" className="h-10 sm:h-12 w-auto" />
            <span className="hidden sm:block font-serif text-lg font-bold text-foreground">Paws & Treks</span>
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="px-3 py-2 text-sm font-medium rounded-md transition-colors hover-elevate text-foreground/70"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <Link href="/book">
              <Button size="sm">Book Now</Button>
            </Link>
            <button
              className="lg:hidden p-2 rounded-md text-foreground"
              onClick={() => setIsOpen(!isOpen)}
              aria-expanded={isOpen}
              aria-label="Toggle navigation menu"
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

interface Section {
  id: string;
  icon: React.ReactNode;
  title: string;
  content: React.ReactNode;
}

const travelInfoSections: Section[] = [
  {
    id: "visas",
    icon: <Globe className="w-5 h-5" />,
    title: "Visas",
    content: (
      <div className="space-y-3 text-sm text-muted-foreground">
        <p>
          All visitors to Kenya are required to have valid passports. Visas are also required for visitors who are not citizens of Commonwealth countries. Currently, visitors from Germany, Denmark, Norway, San Marino, Sweden, Ethiopia, Eritrea, Finland, Spain, Turkey, and Uruguay do not require visas.
        </p>
        <p>
          Since visa requirements may change, it is advisable to check the current requirements through airlines, tour operators, Kenya Tourist Offices, or Kenya Embassies/High Commissions before departure. Visas normally take up to six weeks to process and are valid for up to a three-month period.
        </p>
        <p>
          Those visitors with proper documents and return tickets may be issued visitor&apos;s passes free of charge on arrival at any Kenyan port of entry.
        </p>
      </div>
    ),
  },
  {
    id: "weather",
    icon: <Thermometer className="w-5 h-5" />,
    title: "Weather",
    content: (
      <div className="space-y-3 text-sm text-muted-foreground">
        <p>
          Kenya enjoys a tropical climate — hot and humid at the coast, temperate inland, and very dry in the north and northeast. Sunshine is plentiful year-round and summer clothes are worn throughout the year, though it can be cool at night and in the early morning.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
          {[
            { place: "Mombasa (coast)", temps: "22–30°C" },
            { place: "Nairobi", temps: "14–25°C" },
            { place: "Eldoret (highlands)", temps: "10–24°C" },
            { place: "Lodwar (north)", temps: "24–35°C" },
          ].map((row, i) => (
            <div key={i} className="flex items-center justify-between bg-muted rounded-md px-3 py-2">
              <span className="font-medium">{row.place}</span>
              <span className="text-primary font-semibold">{row.temps}</span>
            </div>
          ))}
        </div>
        <p>
          The long rains occur April–June, and short rains October–December. Rain typically falls in the afternoons and evenings. The Great Migration takes place between June and September.
        </p>
      </div>
    ),
  },
  {
    id: "baggage",
    icon: <Backpack className="w-5 h-5" />,
    title: "Baggage",
    content: (
      <div className="space-y-2 text-sm text-muted-foreground">
        <p>Baggage space on safari is restricted to one medium suitcase per person, plus hand luggage. Hotels will normally store excess baggage at no extra cost.</p>
        <ul className="space-y-1.5 mt-2">
          {[
            "Standard safaris: one medium suitcase plus hand baggage per person",
            "Air safaris: maximum 15 kg per person (may reduce to 10 kg on small aircraft)",
            "Private safaris with fewer than 7 passengers: no baggage restrictions",
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-2" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    ),
  },
  {
    id: "currency",
    icon: <DollarSign className="w-5 h-5" />,
    title: "Currency & Payments",
    content: (
      <div className="space-y-2 text-sm text-muted-foreground">
        <p>Hard currencies can be exchanged at banks, forex bureaus in Nairobi, and most large hotels. US Dollars and Sterling Pounds are most accepted. Banks are open Mon–Fri 9am–3pm and Saturdays 9–11am.</p>
        <p><strong className="text-foreground">Credit Cards:</strong> VISA, Mastercard, and American Express are widely accepted, though a percentage mark-up may apply.</p>
        <p><strong className="text-foreground">M-PESA:</strong> Mobile money payments are accepted by Paws & Treks for deposits and balances.</p>
      </div>
    ),
  },
  {
    id: "health",
    icon: <Stethoscope className="w-5 h-5" />,
    title: "Health",
    content: (
      <div className="space-y-2 text-sm text-muted-foreground">
        <p>Malaria is endemic to most parts of Kenya. Visitors should start taking anti-malarial tablets before departure and continue for the prescribed time after return. Use insect repellent after dusk and wear suitable cover-up clothing in the evenings.</p>
        <p><strong className="text-foreground">Flying Doctors Society:</strong> Membership is strongly recommended. In the event of accident or sickness on safari, the Society will fly patients by air ambulance to Nairobi for hospital admission.</p>
        <p><strong className="text-foreground">Drinking Water:</strong> Tap water should be considered unsafe. Hotels and lodges provide safe water in thermos flasks. Bottled mineral water is widely available.</p>
      </div>
    ),
  },
  {
    id: "security",
    icon: <ShieldCheck className="w-5 h-5" />,
    title: "Security",
    content: (
      <div className="space-y-2 text-sm text-muted-foreground">
        <p>Normal precautions as in any world destination apply. Do not leave cash and valuables in hotel rooms — use safe deposit boxes. Avoid carrying large sums of cash. In busy streets, keep a firm grip on bags and valuables.</p>
        <p>Walking alone at night in cities should be avoided. Reliable taxis are available at all principal hotels.</p>
        <p className="text-amber-700 dark:text-amber-400 font-medium">Photography is prohibited at airports, military installations, near government buildings, and of the President, soldiers, prisons, or prisoners. Always obtain permission before photographing local people.</p>
      </div>
    ),
  },
  {
    id: "practical-info",
    icon: <Zap className="w-5 h-5" />,
    title: "Practical Information",
    content: (
      <div className="space-y-4 text-sm text-muted-foreground">
        <div>
          <p className="font-semibold text-foreground mb-1">Voltage</p>
          <p>240 volts AC, 50 cycles. Three-pin square sockets. Most large hotels offer 110V shaving points.</p>
        </div>
        <div>
          <p className="font-semibold text-foreground mb-1">Tipping</p>
          <p>Although a service charge is included at hotels and lodges, it is customary to tip porters, waiters, taxi drivers, and safari driver/guides.</p>
        </div>
        <div>
          <p className="font-semibold text-foreground mb-1">Language</p>
          <p>Kiswahili is the national language; English is the official language. Most tribes also have their own language.</p>
        </div>
        <div>
          <p className="font-semibold text-foreground mb-1">Airports</p>
          <p>Kenya&apos;s main air entry points are Jomo Kenyatta International Airport, Nairobi (16 km from city centre) and Moi International Airport, Mombasa (12 km from town centre).</p>
        </div>
        <div>
          <p className="font-semibold text-foreground mb-1">Shopping Hours</p>
          <p>Major stores, offices, and museums open 8am–5pm in large towns. Rural shops and markets may be open at almost any hour. Popular souvenirs include wood and soapstone carvings, sisal baskets, beadwork, tribal regalia, textiles, and gemstone jewellery.</p>
        </div>
      </div>
    ),
  },
];

function SectionCard({ section }: { section: Section }) {
  return (
    <Card className="border-card-border p-6 sm:p-8" id={section.id}>
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-primary/10 rounded-md flex items-center justify-center text-primary shrink-0">
          {section.icon}
        </div>
        <h3 className="font-serif font-bold text-xl">{section.title}</h3>
      </div>
      <div className="pl-0 sm:pl-13">{section.content}</div>
    </Card>
  );
}

export default function TravelInformation() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Travel Information – Paws & Treks";
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="relative pt-20">
        <div className="relative h-52 sm:h-64 overflow-hidden">
          <img src="/images/safari_vehicle.jpg" alt="Travel information" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/55 to-black/30" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
            <motion.p
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
              className="text-amber-400 font-medium tracking-widest uppercase text-sm mb-3"
            >
              Prepare for Your Safari
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
              className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3"
            >
              Travel Information
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
              className="text-white/80 max-w-xl text-sm"
            >
              Essential tips and country-specific information to help you prepare for a smooth and enjoyable Kenya safari experience.
            </motion.p>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 space-y-16">
        <div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={stagger}
            className="space-y-4"
          >
            {travelInfoSections.map((section) => (
              <motion.div key={section.id} variants={fadeInUp}>
                <SectionCard section={section} />
              </motion.div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <Card className="border-card-border p-8 bg-primary/5 text-center">
            <h3 className="font-serif text-2xl font-bold mb-3">Still Have Questions?</h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Our team is happy to help you prepare for your Kenya safari. Get in touch anytime.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="tel:+254769784190">
                <Button variant="outline">
                  <Phone className="w-4 h-4 mr-2" /> +254-769-784-190
                </Button>
              </a>
              <a href="https://wa.me/254769784190" target="_blank" rel="noopener noreferrer">
                <Button>
                  <MessageCircle className="w-4 h-4 mr-2" /> WhatsApp Us
                </Button>
              </a>
            </div>
          </Card>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}
