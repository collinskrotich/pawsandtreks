"use client";
import { useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Menu, X, FileText, CreditCard, ShieldCheck, Plane,
  Globe, DollarSign, AlertTriangle, Phone, MessageCircle
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

const bookingTermsSections: Section[] = [
  {
    id: "how-to-book",
    icon: <FileText className="w-5 h-5" />,
    title: "How to Book",
    content: (
      <p>
        If you would like to book our safaris listed on this website, simply fill our online form with the relevant
        safari book button with all information required and submit. We will respond to you promptly to give you a
        quotation and availability. After confirming with us, we will go ahead and secure you a reservation and send
        you a confirmed invoice as confirmation of services booked.
      </p>
    ),
  },
  {
    id: "reservations-payments",
    icon: <CreditCard className="w-5 h-5" />,
    title: "Reservations & Payments",
    content: (
      <ul className="space-y-2">
        {[
          "All prices quoted are in US Dollars.",
          "Payment is acceptable in any freely convertible currency at the prevailing rate at the time of exchange.",
          "We accept payment by bank transfers and M-PESA.",
          "A deposit of 25% is required at the time of booking.",
          "The balance should be cleared before commencement of the tour.",
          "If bookings are made 20 days or less before departure, the full amount must be paid.",
          "The company reserves the right to cancel any booking if the above terms are not met.",
        ].map((item, i) => (
          <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
            <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-2" />
            {item}
          </li>
        ))}
      </ul>
    ),
  },
  {
    id: "tour-prices",
    icon: <DollarSign className="w-5 h-5" />,
    title: "Tour Prices",
    content: (
      <ul className="space-y-2">
        {[
          "The price quoted is inclusive of transportation according to the itinerary.",
          "Full board meal plan on accommodation in lodges, half board on beach hotels, and bed and breakfast on city hotels.",
          "Tour prices do not include visa fees, local departure taxes, excess baggage charges, tipping, and items of a personal nature (drinks, laundry, telephone calls).",
          "Rates are subject to change depending on the prevailing tariffs.",
        ].map((item, i) => (
          <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
            <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-2" />
            {item}
          </li>
        ))}
      </ul>
    ),
  },
  {
    id: "cancellations",
    icon: <AlertTriangle className="w-5 h-5" />,
    title: "Cancellations",
    content: (
      <div className="space-y-3">
        <p className="text-sm text-muted-foreground">Cancellations must be received in writing. Refunds depend on the duration of notice given prior to the safari:</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { period: "40 – 60 days", refund: "Full refund less USD $40 administration fee", color: "bg-green-50 border-green-200 dark:bg-green-950/30 dark:border-green-800" },
            { period: "14 – 35 days", refund: "25% of the tour price retained", color: "bg-amber-50 border-amber-200 dark:bg-amber-950/30 dark:border-amber-800" },
            { period: "2 – 14 days", refund: "40% of the tour price retained", color: "bg-orange-50 border-orange-200 dark:bg-orange-950/30 dark:border-orange-800" },
            { period: "Under 2 days / No-show", refund: "No refund", color: "bg-red-50 border-red-200 dark:bg-red-950/30 dark:border-red-800" },
          ].map((row, i) => (
            <div key={i} className={`rounded-md border p-3 ${row.color}`}>
              <p className="font-semibold text-sm">{row.period}</p>
              <p className="text-sm text-muted-foreground">{row.refund}</p>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: "responsibility",
    icon: <ShieldCheck className="w-5 h-5" />,
    title: "Responsibility & Liability",
    content: (
      <div className="space-y-3 text-sm text-muted-foreground">
        <p>
          Travels carry a measure of risk. Bookings are accepted on the specific condition that Paws and Treks only acts as agent for clients in matters related to hotels, sightseeing, restaurants, and all transportation included in the tour. Paws and Treks purchases these services from suppliers and independent contractors without warranties or representations. Such services are therefore subject to their control.
        </p>
        <p>
          The right is reserved to substitute hotels of comparable status and make any change in the itinerary where deemed necessary or caused by adverse weather conditions, disruption to airline schedules, or any other valid reason.
        </p>
        <p>
          Paws and Treks and its agencies shall not be liable for any death, loss, delay, injury, accident, or damage arising from any cause, including terrorism, natural calamity, government action, or any act beyond our control.
        </p>
        <p>
          All baggage is carried at the passenger&apos;s own risk. Baggage insurance is highly recommended.
        </p>
        <p>
          Paws and Treks will not accept responsibility for additional expenses or losses due to changes in airline schedules or delays, or any factor caused by force majeure such as civil strife, war, or quarantine.
        </p>
      </div>
    ),
  },
  {
    id: "refunds-claims",
    icon: <FileText className="w-5 h-5" />,
    title: "Refunds & Claims",
    content: (
      <div className="space-y-3 text-sm text-muted-foreground">
        <p>Refunds are not made for any missed services, except for verifiable extenuating circumstances.</p>
        <p>
          For verifiable claims to be considered, they must be received in writing within 30 days of the termination of the program, accompanied by supporting documentation and/or a statement from the Operating Company. Any adjustment will be based on the actual price of the services involved, not on a per diem basis.
        </p>
        <p>Adjustments will not be made for unused sightseeing trips or meals.</p>
      </div>
    ),
  },
  {
    id: "passports-visas-terms",
    icon: <Globe className="w-5 h-5" />,
    title: "Passports & Visas",
    content: (
      <p className="text-sm text-muted-foreground">
        Valid passports are required for travel to all destinations in our brochure. Please check with your travel agent or Paws and Treks Tours for the latest visa requirements, as these can change. Tour alterations may be made where necessary, and an equitable amount will be refunded accordingly.
      </p>
    ),
  },
  {
    id: "air-transportation",
    icon: <Plane className="w-5 h-5" />,
    title: "Air Transportation",
    content: (
      <p className="text-sm text-muted-foreground">
        We shall arrange the best-priced airfares available in the class of travel desired by the passenger. Airlines operating within Kenya are subject to international air conventions limiting their liability, the terms of which are printed on the back of airline tickets.
      </p>
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

export default function BookingTerms() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Booking Terms – Paws & Treks";
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="relative pt-20">
        <div className="relative h-52 sm:h-64 overflow-hidden">
          <img src="/images/safari_vehicle.jpg" alt="Booking terms" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/55 to-black/30" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
            <motion.p
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
              className="text-amber-400 font-medium tracking-widest uppercase text-sm mb-3"
            >
              Important Information
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
              className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3"
            >
              Booking Terms
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
              className="text-white/80 max-w-xl text-sm"
            >
              Please read these terms carefully before making a booking with Paws & Treks.
            </motion.p>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 space-y-16">
        <div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="mb-8"
          >
            <motion.p variants={fadeInUp} className="text-muted-foreground">
              By confirming a reservation with Paws & Treks, you agree to the conditions below.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={stagger}
            className="space-y-4"
          >
            {bookingTermsSections.map((section) => (
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
              Our team is happy to clarify any aspect of the booking terms. Get in touch before you book.
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
