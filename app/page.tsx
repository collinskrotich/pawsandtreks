"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import Link from "next/link";
import {
  MapPin, Clock, Star, Shield, Heart, Phone, Mail,
  ChevronRight, Menu, X, Send, Compass, TreePine, Bird,
  Tent, Camera, Globe, ArrowRight, ChevronLeft,
  MessageCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import Footer from "@/components/Footer";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } }
};

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Safaris", href: "#safaris" },
  { label: "Destinations", href: "#destinations" },
  { label: "Packages", href: "/packages" },
  { label: "Gallery", href: "/gallery" },
  { label: "About", href: "#about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "#contact" },
];

const safariExperiences = [
  {
    title: "Masai Mara Big Five Safari",
    image: "/images/masai_mara.jpg",
    duration: "3 Days",
    price: "$850",
    description: "Witness the spectacular Great Migration and encounter Africa's Big Five in the world-famous Masai Mara."
  },
  {
    title: "Amboseli Elephant Safari",
    image: "/images/amboseli.jpg",
    duration: "2 Days",
    price: "$600",
    description: "Experience herds of elephants against the backdrop of Mount Kilimanjaro in stunning Amboseli."
  },
  {
    title: "Mount Kenya Trekking",
    image: "/images/mount_kenya.jpg",
    duration: "4 Days",
    price: "$1,200",
    description: "Conquer Africa's second-highest peak through diverse ecosystems and breathtaking alpine scenery."
  },
  {
    title: "Lake Nakuru Flamingo Tour",
    image: "/images/lake_nakuru.jpg",
    duration: "2 Days",
    price: "$500",
    description: "Marvel at millions of flamingos painting the lake pink, alongside rhinos and diverse birdlife."
  },
  {
    title: "Tsavo Wilderness Safari",
    image: "/images/tsavo.jpg",
    duration: "3 Days",
    price: "$750",
    description: "Explore Kenya's largest national park, home to the legendary red elephants and vast wilderness."
  },
  {
    title: "Nairobi National Park Tour",
    image: "/safari/safari-25.jpeg",
    duration: "1 Day",
    price: "$200",
    description: "Experience Kenya's wildlife close to the city with lions, giraffes, zebras, and rhinos in their natural habitat."
  },
];

const destinations = [
  { name: "Maasai Mara", image: "/images/wildebeast.jpg", tag: "Most Popular" },
  { name: "Amboseli", image: "/images/amboseli.jpg", tag: "Iconic Views" },
  { name: "Tsavo East & West", image: "/images/tsavo.jpg", tag: "Vast Wilderness" },
  { name: "Lake Nakuru", image: "/images/lake_nakuru.jpg", tag: "Birdwatching" },
  { name: "Samburu", image: "/safari/safari-26.jpeg", tag: "Unique Wildlife" },
  { name: "Nairobi National Park", image: "/safari/nairobi.jpeg", tag: "Day Trip" },
];

const whyUs = [
  { icon: Compass, title: "Expert Local Guides", desc: "Our guides are born and raised in Kenya with deep knowledge of wildlife and local culture." },
  { icon: Heart, title: "Tailor-Made Safaris", desc: "Every safari is customized to your preferences, ensuring a truly personal experience." },
  { icon: TreePine, title: "Eco Tourism", desc: "We practice responsible tourism that protects wildlife and supports local communities." },
  { icon: Tent, title: "Luxury & Budget Options", desc: "From luxury lodges to comfortable camps, we have options for every budget." },
  { icon: Shield, title: "24/7 Guest Support", desc: "Round-the-clock support throughout your safari for complete peace of mind." },
];

const packageCategories = [
  {
    name: "Best Safari Deals",
    tag: "Great Value",
    color: "primary",
    anchor: "#best-safari-deals",
    image: "/safari/mara.jpeg",
    highlights: ["3 & 4-day Masai Mara itineraries", "Big Five wildlife sightings", "Maasai village cultural visit", "Full board accommodation", "Airport transfers included", "Nairobi National Park day trip"],
  },
  {
    name: "Top Private Safaris",
    tag: "Exclusive",
    color: "jungle-green",
    anchor: "#top-private-safaris",
    image: "/safari/mara-5.jpeg",
    highlights: ["Private vehicle — just your group", "Flexible departure times", "Photographic & bird watching safaris", "Premium lodge stays", "Expert specialist guides"],
  },
  {
    name: "Exciting Adventures",
    tag: "Thrilling",
    color: "primary",
    anchor: "#exciting-adventures",
    image: "/images/gallery_balloon.jpg",
    highlights: ["Hot air balloon safari over the Mara", "Bush dinner under the stars", "10-day photographic expedition", "Birdwatching across Kenya", "Cultural encounters & historic sites"],
  },
  {
    name: "Kenya Camping",
    tag: "Nature Escapes",
    color: "jungle-green",
    anchor: "#kenya-camping",
    image: "/safari/jangwani-sagana-2.jpeg",
    highlights: ["Riverside & forest bush camps", "White-water rafting at Sagana", "Aberdares tea country cycling", "Maasai archery & village visits", "Bring your own food & drinks"],
  },
];

const galleryImages = [
  { src: "/safari/mara-3.jpeg", alt: "Masai Mara wildlife safari" },
  { src: "/safari/safari-10.jpeg", alt: "Kenya safari adventure" },
  { src: "/safari/amboseli.jpeg", alt: "Amboseli elephants with Kilimanjaro" },
  { src: "/safari/nakuru.jpeg", alt: "Lake Nakuru flamingos" },
  { src: "/safari/safari-26.jpeg", alt: "Samburu wildlife reserve" },
  { src: "/safari/jangwani-sagana.jpeg", alt: "Jangwani Sagana river adventure" },
  { src: "/safari/aberdares.jpeg", alt: "Aberdares forest landscape" },
  { src: "/safari/mara-4.jpeg", alt: "Mara sunset safari drive" },
];

const testimonials = [
  {
    name: "Patrick Robinski",
    text: "I really enjoyed Masai Mara the culture and Amboseli, made new friends and will definitely visit again with family.",
    rating: 5,
    location: "United States"
  },
  {
    name: "Sandra Longman",
    text: "I loved the experience, the tour driver was very helpful guiding us through, great bird watching at Nakuru and Naivasha parks.",
    rating: 5,
    location: "United Kingdom"
  },
  {
    name: "Mikael",
    text: "One of the best travels I have made in Africa, I loved the scenery, animals, great migration and great five. Awesome company.",
    rating: 5,
    location: "Sweden"
  },
];

const blogPosts = [
  {
    title: "Best Time to Visit Maasai Mara",
    excerpt: "Plan your safari around the Great Migration and optimal weather windows for an unforgettable experience.",
    image: "/images/amboseli.jpg",
    date: "Feb 15, 2026"
  },
  {
    title: "What to Pack for a Kenya Safari",
    excerpt: "Essential gear, clothing, and tips to ensure you're fully prepared for your African adventure.",
    image: "/images/safari_vehicle.jpg",
    date: "Jan 28, 2026"
  },
  {
    title: "Top 10 Animals to See on Safari",
    excerpt: "From the Big Five to rare species, discover the incredible wildlife waiting for you in Kenya.",
    image: "/images/gallery_leopard.jpg",
    date: "Jan 10, 2026"
  },
];

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().optional(),
  safari: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

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
        scrolled ? "bg-background/95 backdrop-blur-md border-b shadow-sm" : "bg-transparent"
      }`}
      data-testid="navbar"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 h-16 sm:h-20">
          <a href="#home" className="flex items-center gap-2 shrink-0" data-testid="link-home-logo">
            <img src="/images/logo.png" alt="Paws & Treks" className="h-[52px] sm:h-12 md:h-15 lg:h-12 w-auto" />
            <div className="hidden sm:block">
              <span className={`font-serif text-lg font-bold ${scrolled ? "text-foreground" : "text-white"}`}>
                Paws & Treks
              </span>
            </div>
          </a>

          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const isInternal = link.href.startsWith("/");
              const className = `px-3 py-2 text-sm font-medium rounded-md transition-colors hover-elevate ${
                scrolled ? "text-foreground/70" : "text-white/80"
              }`;
              return isInternal ? (
                <Link key={link.label} href={link.href} className={className} data-testid={`link-nav-${link.label.toLowerCase()}`}>
                  {link.label}
                </Link>
              ) : (
                <a key={link.label} href={link.href} className={className} data-testid={`link-nav-${link.label.toLowerCase()}`}>
                  {link.label}
                </a>
              );
            })}
          </div>

          <div className="flex items-center gap-3">
            <Link href="/book">
              <Button size="sm" data-testid="button-book-now-nav">
                Request a Quote
              </Button>
            </Link>
            <button
              className={`lg:hidden p-2 rounded-md ${scrolled ? "text-foreground" : "text-white"}`}
              onClick={() => setIsOpen(!isOpen)}
              aria-expanded={isOpen}
              aria-label="Toggle navigation menu"
              data-testid="button-mobile-menu"
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
            {navLinks.map((link) => {
              const isInternal = link.href.startsWith("/");
              const className = "block px-4 py-3 text-sm font-medium text-foreground/80 rounded-md hover-elevate";
              return isInternal ? (
                <Link key={link.label} href={link.href} className={className} onClick={() => setIsOpen(false)} data-testid={`link-mobile-${link.label.toLowerCase()}`}>
                  {link.label}
                </Link>
              ) : (
                <a key={link.label} href={link.href} className={className} onClick={() => setIsOpen(false)} data-testid={`link-mobile-${link.label.toLowerCase()}`}>
                  {link.label}
                </a>
              );
            })}
          </div>
        </motion.div>
      )}
    </nav>
  );
}

function HeroSection() {
  return (
    <section id="home" className="relative min-h-screen flex items-center" data-testid="section-hero">
      <div className="absolute inset-0">
        <img
          src="/lions-hero.jpg"
          alt="African savannah at sunset with lions and wildlife - Paws and Treks safari experience"
          className="w-full h-full object-cover"
          loading="eager"
          decoding="sync"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-20 sm:py-24 md:py-28 lg:py-32">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="max-w-2xl"
        >
          <motion.p
            variants={fadeInUp}
            className="text-amber-400 font-medium tracking-widest uppercase text-xs sm:text-sm mb-3 sm:mb-4"
          >
            Unforgettable Safaris.
          </motion.p>
          <motion.h1
            variants={fadeInUp}
            className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight mb-4 sm:mb-6"
          >
            Discover Kenya&apos;s Wild Beauty
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            className="text-base sm:text-lg md:text-xl text-white/80 mb-6 sm:mb-8 leading-relaxed"
          >
            Embark on unforgettable safari adventures through Kenya&apos;s most stunning landscapes. From the Great Migration to the Big Five, experience Africa like never before.
          </motion.p>
          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
            <Link href="/packages">
              <Button size="lg" data-testid="button-explore-safaris" className="w-full sm:w-auto">
                Explore Safaris
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link href="/book">
              <Button size="lg" variant="outline" className="w-full sm:w-auto backdrop-blur-sm bg-white/10 text-white border-white/30" data-testid="button-plan-adventure">
                Plan Your Adventure
              </Button>
            </Link>
          </motion.div>

          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row flex-wrap gap-6 sm:gap-8 mt-10 sm:mt-12 pt-6 sm:pt-8 border-t border-white/20">
            <div>
              <p className="text-2xl sm:text-3xl font-bold text-white">500+</p>
              <p className="text-white/60 text-xs sm:text-sm">Happy Travelers</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-bold text-white">15+</p>
              <p className="text-white/60 text-xs sm:text-sm">Safari Routes</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-bold text-white">10+</p>
              <p className="text-white/60 text-xs sm:text-sm">Years Experience</p>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center"
        >
          <div className="w-1.5 h-3 bg-white/60 rounded-full mt-2" />
        </motion.div>
      </div>
    </section>
  );
}

function SafarisSection() {
  return (
    <section id="safaris" className="py-12 sm:py-16 md:py-20 lg:py-28 bg-background" data-testid="section-safaris">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
          className="text-center mb-12 sm:mb-16"
        >
          <motion.p variants={fadeInUp} className="text-primary font-medium tracking-widest uppercase text-xs sm:text-sm mb-2 sm:mb-3">
            Our Experiences
          </motion.p>
          <motion.h2 variants={fadeInUp} className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">
            Featured Safari Experiences
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base md:text-lg">
            Choose from our carefully curated safari experiences, each designed to showcase Kenya&apos;s most breathtaking wildlife and landscapes.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={stagger}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6"
        >
          {safariExperiences.map((safari, i) => (
            <motion.div key={i} variants={fadeInUp}>
              <Card className="group cursor-pointer border-card-border overflow-hidden flex flex-col h-full" data-testid={`card-safari-${i}`}>
                <div className="relative overflow-hidden h-48 sm:h-56">
                  <img
                    src={safari.image}
                    alt={`${safari.title} - ${safari.duration} in Kenya`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-jungle-green text-jungle-green-foreground text-xs font-bold px-2.5 py-1 rounded-md">
                    Request Quote
                  </div>
                </div>
                <div className="p-4 sm:p-5 flex flex-col flex-grow">
                  <h3 className="font-serif text-lg sm:text-xl font-bold mb-2">{safari.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4 leading-relaxed flex-grow">{safari.description}</p>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
                    <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" /> {safari.duration}
                    </span>
                    <div className="flex items-center gap-2 w-full sm:w-auto">
                      <Link href="/packages" className="flex-1 sm:flex-none">
                        <Button variant="outline" size="sm" className="w-full sm:w-auto" data-testid={`button-learn-more-${i}`}>
                          Learn More <ChevronRight className="w-3 h-3 ml-1" />
                        </Button>
                      </Link>
                      <Link href="/book" className="flex-1 sm:flex-none">
                        <Button size="sm" className="w-full sm:w-auto" data-testid={`button-book-safari-${i}`}>
                          Book
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function DestinationsSection() {
  return (
    <section id="destinations" className="py-12 sm:py-16 md:py-20 lg:py-28 bg-card" data-testid="section-destinations">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
          className="text-center mb-12 sm:mb-16"
        >
          <motion.p variants={fadeInUp} className="text-primary font-medium tracking-widest uppercase text-xs sm:text-sm mb-2 sm:mb-3">
            Where to Go
          </motion.p>
          <motion.h2 variants={fadeInUp} className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">
            Top Destinations
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base md:text-lg">
            Explore Kenya&apos;s most iconic wildlife destinations, each offering unique encounters and spectacular landscapes.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={stagger}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5"
        >
          {destinations.map((dest, i) => (
            <motion.div key={i} variants={fadeInUp}>
              <Link href="/book" className="block group" data-testid={`card-destination-${i}`}>
                <div className="relative overflow-hidden rounded-md aspect-[4/3]">
                  <img
                    src={dest.image}
                    alt={`${dest.name} - ${dest.tag} in Kenya`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 md:p-5">
                    <span className="inline-block text-amber-400 text-xs font-semibold tracking-wider uppercase mb-1">
                      {dest.tag}
                    </span>
                    <h3 className="font-serif text-lg sm:text-xl font-bold text-white">{dest.name}</h3>
                  </div>
                  <div className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-white/20 backdrop-blur-sm text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function WhyUsSection() {
  return (
    <section id="about" className="py-12 sm:py-16 md:py-20 lg:py-28 bg-background" data-testid="section-about">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
          className="text-center mb-12 sm:mb-16"
        >
          <motion.p variants={fadeInUp} className="text-primary font-medium tracking-widest uppercase text-xs sm:text-sm mb-2 sm:mb-3">
            Why Choose Us
          </motion.p>
          <motion.h2 variants={fadeInUp} className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">
            Why Travel With Paws & Treks
          </motion.h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={stagger}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6"
        >
          {whyUs.map((item, i) => (
            <motion.div key={i} variants={fadeInUp}>
              <Card className="p-5 sm:p-6 text-center border-card-border h-full flex flex-col" data-testid={`card-why-${i}`}>
                <div className="w-12 sm:w-14 h-12 sm:h-14 bg-primary/10 rounded-md flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-6 sm:w-7 h-6 sm:h-7 text-primary" />
                </div>
                <h3 className="font-serif text-lg font-bold mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed flex-grow">{item.desc}</p>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function NairobiFeaturedSection() {
  const images = [
    { src: "/safari/nairobi-national.webp", alt: "Nairobi National Park – wildlife with city skyline" },
    { src: "/safari/nairobi.jpeg", alt: "Nairobi National Park – open savannah game drive" },
    { src: "/safari/nairobi-2.jpeg", alt: "Nairobi National Park – wildlife with city skyline" },
    { src: "/safari/nairobi-3.jpeg", alt: "Nairobi National Park – scenic landscape" },
  ];

  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setCurrent(p => (p + 1) % images.length), 4000);
    return () => clearInterval(t);
  }, [paused, images.length]);

  const prev = () => setCurrent(p => (p - 1 + images.length) % images.length);
  const next = () => setCurrent(p => (p + 1) % images.length);

  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-28 bg-card overflow-hidden" data-testid="section-nairobi-featured">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
          className="text-center mb-10 sm:mb-14"
        >
          <motion.p variants={fadeInUp} className="text-primary font-medium tracking-widest uppercase text-xs sm:text-sm mb-2 sm:mb-3">
            Featured Destination
          </motion.p>
          <motion.h2 variants={fadeInUp} className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">
            Nairobi National Park
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base md:text-lg">
            The only national park in the world inside a capital city — just 7 km from Nairobi&apos;s CBD.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center">
          {/* ── Image slider ── */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div
              className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/3] cursor-grab active:cursor-grabbing"
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
              data-testid="nairobi-slider"
            >
              {/* Slide track */}
              <div
                className="flex h-full transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${current * 100}%)` }}
              >
                {images.map((img, i) => (
                  <div key={i} className="w-full h-full shrink-0">
                    <img
                      src={img.src}
                      alt={img.alt}
                      className="w-full h-full object-cover"
                      loading={i === 0 ? "eager" : "lazy"}
                    />
                  </div>
                ))}
              </div>

              {/* Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

              {/* Location badge */}
              <div className="absolute bottom-5 left-5">
                <span className="inline-flex items-center gap-1.5 bg-amber-500 text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wide shadow-lg">
                  <MapPin className="w-3 h-3" /> Nairobi, Kenya
                </span>
              </div>

              {/* Counter */}
              <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-sm text-white text-xs font-medium px-2.5 py-1 rounded-full">
                {current + 1} / {images.length}
              </div>

              {/* Prev / Next */}
              <button
                onClick={prev}
                aria-label="Previous image"
                className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-sm text-white flex items-center justify-center transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={next}
                aria-label="Next image"
                className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-sm text-white flex items-center justify-center transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Dot indicators */}
            <div className="flex items-center justify-center gap-2.5 mt-4">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  aria-label={`Go to image ${i + 1}`}
                  className={`transition-all duration-300 rounded-full ${
                    i === current
                      ? "w-6 h-2.5 bg-primary"
                      : "w-2.5 h-2.5 bg-muted-foreground/30 hover:bg-muted-foreground/60"
                  }`}
                />
              ))}
            </div>
          </motion.div>

          {/* ── Content ── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="flex flex-col gap-6"
          >
            <div>
              <p className="text-primary font-semibold tracking-widest uppercase text-xs mb-3">
                Day Trip from Nairobi
              </p>
              <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold leading-tight mb-4">
                Safari Minutes from<br />
                <span className="text-primary">the City Centre</span>
              </h3>
              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                Watch lions and rhinos roam open savannah with the Nairobi skyline as your backdrop. 
                No long drives — this incredible park is right on the city&apos;s doorstep. Perfect for a full-day adventure.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 py-5 border-y border-border">
              <div className="text-center">
                <p className="font-serif text-2xl font-bold text-primary">117</p>
                <p className="text-xs text-muted-foreground mt-0.5">km² wilderness</p>
              </div>
              <div className="text-center border-x border-border">
                <p className="font-serif text-2xl font-bold text-primary">400+</p>
                <p className="text-xs text-muted-foreground mt-0.5">bird species</p>
              </div>
              <div className="text-center">
                <p className="font-serif text-2xl font-bold text-primary">Big 4</p>
                <p className="text-xs text-muted-foreground mt-0.5">lion · leopard · rhino · buffalo</p>
              </div>
            </div>

            {/* Highlights */}
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {[
                "Home to endangered black rhino",
                "Over 400 recorded bird species",
                "City skyline safari photography",
                "7 km from Nairobi city centre",
                "Hippo pools & scenic viewpoints",
                "Available as a full-day trip",
              ].map((text, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground" data-testid={`nairobi-highlight-${i}`}>
                  <Star className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                  {text}
                </li>
              ))}
            </ul>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 pt-1">
              <Link href="/packages#nairobi-np-1d">
                <Button size="lg" data-testid="button-nairobi-day-trip">
                  View Day Trip Package <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <a href="https://wa.me/254769784190" target="_blank" rel="noopener noreferrer">
                <Button size="lg" variant="outline" data-testid="button-nairobi-whatsapp">
                  <MessageCircle className="w-4 h-4 mr-2" /> Enquire on WhatsApp
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function PackagesSection() {
  return (
    <section id="packages" className="py-12 sm:py-16 md:py-20 lg:py-28 bg-background" data-testid="section-packages">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
          className="text-center mb-10 sm:mb-14"
        >
          <motion.p variants={fadeInUp} className="text-primary font-medium tracking-widest uppercase text-xs sm:text-sm mb-2 sm:mb-3">
            Our Packages
          </motion.p>
          <motion.h2 variants={fadeInUp} className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">
            Safari Packages
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base md:text-lg">
            Choose from four distinct safari collections — each tailored to a different style of adventure. All packages include expert guides and personalised service.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={stagger}
          className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6"
        >
          {packageCategories.map((cat, i) => (
            <motion.div key={i} variants={fadeInUp}>
              <Card className="overflow-hidden border-card-border group" data-testid={`card-package-cat-${i}`}>
                <div className="relative h-48 sm:h-56 overflow-hidden">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className={`text-xs font-bold px-3 py-1.5 rounded-full shadow ${
                      cat.color === "jungle-green"
                        ? "bg-jungle-green text-white"
                        : "bg-amber-500 text-white"
                    }`}>
                      {cat.tag}
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <h3 className="font-serif text-xl font-bold text-white drop-shadow-lg">{cat.name}</h3>
                  </div>
                </div>

                <div className="p-5">
                  <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2.5">
                    What&apos;s included
                  </p>
                  <ul className="space-y-1.5 mb-5">
                    {cat.highlights.map((h, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm">
                        <Star className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${
                          cat.color === "jungle-green" ? "text-jungle-green" : "text-amber-500"
                        }`} />
                        <span className="text-muted-foreground leading-snug">{h}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex gap-2 border-t border-border pt-4">
                    <Link href={`/packages${cat.anchor}`} className="flex-1" data-testid={`button-view-cat-${i}`}>
                      <Button variant="outline" size="sm" className="w-full">
                        View Packages <ChevronRight className="w-3 h-3 ml-1" />
                      </Button>
                    </Link>
                    <Link href="/book" className="flex-1" data-testid={`button-book-cat-${i}`}>
                      <Button size="sm" className="w-full">
                        Request a Quote
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="text-center mt-10"
        >
          <Link href="/packages">
            <Button variant="outline" size="lg" data-testid="button-view-all-packages">
              View All Packages & Full Itineraries
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

function GallerySection() {
  return (
    <section id="gallery" className="py-12 sm:py-16 md:py-20 lg:py-28 bg-background" data-testid="section-gallery">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
          className="text-center mb-12 sm:mb-16"
        >
          <motion.p variants={fadeInUp} className="text-primary font-medium tracking-widest uppercase text-xs sm:text-sm mb-2 sm:mb-3">
            Safari Moments
          </motion.p>
          <motion.h2 variants={fadeInUp} className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">
            Gallery
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base md:text-lg">
            A glimpse into the extraordinary moments our travelers have captured on their safari adventures.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={stagger}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3"
        >
          {galleryImages.map((img, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              className={`group relative overflow-hidden rounded-md cursor-pointer ${
                i === 0 || i === 5 ? "md:col-span-2 md:row-span-2" : ""
              }`}
              data-testid={`gallery-image-${i}`}
            >
              <img
                src={img.src}
                alt={img.alt}
                className={`w-full object-cover transition-transform duration-700 group-hover:scale-110 ${
                  i === 0 || i === 5 ? "h-full min-h-[200px] sm:min-h-[300px]" : "h-32 sm:h-40 md:h-48 lg:h-56"
                }`}
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                <Camera className="w-6 sm:w-8 h-6 sm:h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="text-center mt-10"
        >
          <Link href="/gallery">
            <Button variant="outline" size="lg" data-testid="button-view-full-gallery">
              View Full Gallery
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  const [current, setCurrent] = useState(0);

  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-28 bg-card" data-testid="section-testimonials">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
          className="text-center mb-12 sm:mb-16"
        >
          <motion.p variants={fadeInUp} className="text-primary font-medium tracking-widest uppercase text-xs sm:text-sm mb-2 sm:mb-3">
            Traveler Stories
          </motion.p>
          <motion.h2 variants={fadeInUp} className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">
            What Our Guests Say
          </motion.h2>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="text-center"
          >
            <div className="flex justify-center gap-1 mb-6">
              {[...Array(testimonials[current].rating)].map((_, i) => (
                <Star key={i} className="w-4 sm:w-5 h-4 sm:h-5 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <p className="font-serif text-lg sm:text-xl md:text-2xl italic mb-6 sm:mb-8 leading-relaxed px-3 sm:px-0" data-testid={`text-testimonial-${current}`}>
              &ldquo;{testimonials[current].text}&rdquo;
            </p>
            <p className="font-bold text-base sm:text-lg" data-testid={`text-testimonial-name-${current}`}>
              {testimonials[current].name}
            </p>
            <p className="text-muted-foreground text-xs sm:text-sm flex items-center justify-center gap-1">
              <MapPin className="w-3 h-3" /> {testimonials[current].location}
            </p>
          </motion.div>

          <div className="flex items-center justify-center gap-3 sm:gap-4 mt-8 sm:mt-10">
            <Button
              size="icon"
              variant="outline"
              onClick={() => setCurrent((c) => (c === 0 ? testimonials.length - 1 : c - 1))}
              aria-label="Previous testimonial"
              data-testid="button-testimonial-prev"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  className={`w-2.5 h-2.5 rounded-full transition-colors ${
                    i === current ? "bg-primary" : "bg-muted-foreground/30"
                  }`}
                  onClick={() => setCurrent(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                  data-testid={`button-testimonial-dot-${i}`}
                />
              ))}
            </div>
            <Button
              size="icon"
              variant="outline"
              onClick={() => setCurrent((c) => (c === testimonials.length - 1 ? 0 : c + 1))}
              aria-label="Next testimonial"
              data-testid="button-testimonial-next"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

function BlogSection() {
  return (
    <section id="blog" className="py-12 sm:py-16 md:py-20 lg:py-28 bg-background" data-testid="section-blog">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
          className="text-center mb-12 sm:mb-16"
        >
          <motion.p variants={fadeInUp} className="text-primary font-medium tracking-widest uppercase text-xs sm:text-sm mb-2 sm:mb-3">
            Travel Insights
          </motion.p>
          <motion.h2 variants={fadeInUp} className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">
            Blog & Travel Guide
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base md:text-lg">
            Expert tips, guides, and stories to help you plan the perfect safari.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={stagger}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 md:gap-6"
        >
          {blogPosts.map((post, i) => (
            <motion.div key={i} variants={fadeInUp}>
              <Link href="/blog" className="block" data-testid={`link-blog-${i}`}>
                <Card className="group cursor-pointer border-card-border h-full" data-testid={`card-blog-${i}`}>
                  <div className="relative overflow-hidden rounded-t-md">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-5">
                    <p className="text-primary text-xs font-medium mb-2">{post.date}</p>
                    <h3 className="font-serif text-lg font-bold mb-2 group-hover:text-primary transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{post.excerpt}</p>
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="relative py-16 sm:py-24 md:py-32" data-testid="section-cta">
      <div className="absolute inset-0">
        <img
          src="/images/gallery_balloon.jpg"
          alt="Hot air balloon safari adventure over Kenya landscape - Paws and Treks"
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>
      <div className="relative z-10 max-w-4xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
        >
          <motion.h2
            variants={fadeInUp}
            className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6"
          >
            Ready for the Adventure of a Lifetime?
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-white/80 text-sm sm:text-base md:text-lg mb-6 sm:mb-8 max-w-2xl mx-auto">
            Let us craft the perfect safari experience for you. Contact our team today and start planning your dream African adventure.
          </motion.p>
          <motion.div variants={fadeInUp}>
            <Link href="/book">
              <Button size="lg" data-testid="button-cta-book">
                Request a Quote
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function ContactSection() {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof contactSchema>>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      safari: "",
      message: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: z.infer<typeof contactSchema>) => {
      await apiRequest("POST", "/api/inquiries", data);
    },
    onSuccess: () => {
      toast({
        title: "Inquiry Sent!",
        description: "Thank you for your interest. We'll get back to you within 24 hours.",
      });
      form.reset();
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: z.infer<typeof contactSchema>) => {
    mutation.mutate(data);
  };

  return (
    <section id="contact" className="py-12 sm:py-16 md:py-20 lg:py-28 bg-card" data-testid="section-contact">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
          className="text-center mb-12 sm:mb-16"
        >
          <motion.p variants={fadeInUp} className="text-primary font-medium tracking-widest uppercase text-xs sm:text-sm mb-2 sm:mb-3">
            Get In Touch
          </motion.p>
          <motion.h2 variants={fadeInUp} className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">
            Contact Us
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base md:text-lg">
            Have questions or ready to book? Reach out to our friendly team.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <Card className="p-5 sm:p-6 md:p-8 border-card-border">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm">Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Your name" {...field} data-testid="input-name" className="text-sm" />
                          </FormControl>
                          <FormMessage className="text-xs" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm">Email</FormLabel>
                          <FormControl>
                            <Input placeholder="your@email.com" {...field} data-testid="input-email" className="text-sm" />
                          </FormControl>
                          <FormMessage className="text-xs" />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm">Phone (Optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="+254-769-784-190" {...field} data-testid="input-phone" className="text-sm" />
                          </FormControl>
                          <FormMessage className="text-xs" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="safari"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm">Interested Safari</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger data-testid="select-safari" className="text-sm">
                                <SelectValue placeholder="Select a safari" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="masai-mara">Masai Mara Safari</SelectItem>
                              <SelectItem value="amboseli">Amboseli Safari</SelectItem>
                              <SelectItem value="mount-kenya">Mount Kenya Trek</SelectItem>
                              <SelectItem value="lake-nakuru">Lake Nakuru Tour</SelectItem>
                              <SelectItem value="tsavo">Tsavo Wilderness</SelectItem>
                              <SelectItem value="custom">Custom Safari</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage className="text-xs" />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm">Message</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Tell us about your dream safari..."
                            className="min-h-[100px] sm:min-h-[120px] resize-none text-sm"
                            {...field}
                            data-testid="input-message"
                          />
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="submit"
                    className="w-full text-sm"
                    disabled={mutation.isPending}
                    data-testid="button-send-inquiry"
                  >
                    {mutation.isPending ? "Sending..." : "Send Inquiry"}
                    <Send className="w-4 h-4 ml-2" />
                  </Button>
                </form>
              </Form>
            </Card>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="space-y-4 sm:space-y-6"
          >
            <div className="space-y-4 sm:space-y-6">
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="w-10 sm:w-12 h-10 sm:h-12 bg-primary/10 rounded-md flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-bold text-sm sm:text-base mb-1">Visit Our Office</h4>
                  <p className="text-muted-foreground text-xs sm:text-sm">Westlands, Nairobi, Kenya</p>
                </div>
              </div>

              <div className="flex items-start gap-3 sm:gap-4">
                <div className="w-10 sm:w-12 h-10 sm:h-12 bg-primary/10 rounded-md flex items-center justify-center shrink-0 mt-0.5">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-bold text-sm sm:text-base mb-1">Call Us</h4>
                  <a href="tel:+254769784190" className="block text-xs sm:text-sm text-primary font-medium" data-testid="link-phone">+254-769-784-190</a>
                  <p className="text-muted-foreground text-xs sm:text-sm">Mon-Sat: 8am - 6pm EAT</p>
                </div>
              </div>

              <div className="flex items-start gap-3 sm:gap-4">
                <div className="w-10 sm:w-12 h-10 sm:h-12 bg-primary/10 rounded-md flex items-center justify-center shrink-0 mt-0.5">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-bold text-sm sm:text-base mb-1">Email Us</h4>
                  <a href="mailto:bookings@pawsandtreks.com" className="block text-xs sm:text-sm text-primary font-medium" data-testid="link-email-primary">bookings@pawsandtreks.com</a>
                  <a href="mailto:info@pawsandtreks.com" className="block text-xs sm:text-sm text-muted-foreground" data-testid="link-email-secondary">info@pawsandtreks.com</a>
                </div>
              </div>

              <div className="flex items-start gap-3 sm:gap-4">
                <div className="w-10 sm:w-12 h-10 sm:h-12 bg-primary/10 rounded-md flex items-center justify-center shrink-0 mt-0.5">
                  <MessageCircle className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-bold text-sm sm:text-base mb-1">WhatsApp</h4>
                  <a href="https://wa.me/254769784190" target="_blank" rel="noopener noreferrer" className="text-primary text-xs sm:text-sm font-medium" data-testid="link-whatsapp">+254-769-784-190</a>
                  <p className="text-muted-foreground text-xs sm:text-sm">Quick responses, 24/7</p>
                </div>
              </div>
            </div>

            <div className="rounded-md overflow-hidden mt-6 h-[200px] sm:h-[250px] bg-muted">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.8170944459847!2d36.81217771475401!3d-1.2694139990617982!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f10d22f835805%3A0x4b28e0f1de4d40!2sWestlands%2C%20Nairobi!5e0!3m2!1sen!2ske!4v1709900000000!5m2!1sen!2ske"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Paws & Treks Office Location - Westlands, Nairobi"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <NairobiFeaturedSection />
      <PackagesSection />
      <DestinationsSection />
      <WhyUsSection />
      <TestimonialsSection />
      <GallerySection />
      <BlogSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
