import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
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
  { label: "Packages", href: "#packages" },
  { label: "Gallery", href: "#gallery" },
  { label: "About", href: "#about" },
  { label: "Blog", href: "#blog" },
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
];

const destinations = [
  { name: "Maasai Mara", image: "/images/masai_mara.jpg", tag: "Most Popular" },
  { name: "Amboseli", image: "/images/amboseli.jpg", tag: "Iconic Views" },
  { name: "Tsavo East & West", image: "/images/tsavo.jpg", tag: "Vast Wilderness" },
  { name: "Lake Nakuru", image: "/images/lake_nakuru.jpg", tag: "Birdwatching" },
  { name: "Samburu", image: "/images/samburu.jpg", tag: "Unique Wildlife" },
  { name: "Mount Kenya", image: "/images/mount_kenya.jpg", tag: "Adventure" },
];

const whyUs = [
  { icon: Compass, title: "Expert Local Guides", desc: "Our guides are born and raised in Kenya with deep knowledge of wildlife and local culture." },
  { icon: Heart, title: "Tailor-Made Safaris", desc: "Every safari is customized to your preferences, ensuring a truly personal experience." },
  { icon: TreePine, title: "Eco Tourism", desc: "We practice responsible tourism that protects wildlife and supports local communities." },
  { icon: Tent, title: "Luxury & Budget Options", desc: "From luxury lodges to comfortable camps, we have options for every budget." },
  { icon: Shield, title: "24/7 Guest Support", desc: "Round-the-clock support throughout your safari for complete peace of mind." },
];

const packages = [
  {
    name: "3-Day Maasai Mara Safari",
    price: "$850",
    popular: false,
    highlights: ["Game drives in Masai Mara", "Big Five wildlife sighting", "Maasai village visit", "Full board accommodation", "Airport transfers"]
  },
  {
    name: "5-Day Big Five Safari",
    price: "$1,800",
    popular: true,
    highlights: ["Masai Mara & Amboseli", "Big Five guaranteed", "Luxury lodge stays", "Sunset bush dinner", "Hot air balloon option", "Professional photography tips"]
  },
  {
    name: "7-Day Kenya Explorer",
    price: "$2,900",
    popular: false,
    highlights: ["5 National Parks", "Great Migration viewing", "Lake Nakuru flamingos", "Mount Kenya foothills", "Samburu special five", "Cultural experiences", "All meals included"]
  },
];

const galleryImages = [
  { src: "/images/masai_mara.jpg", alt: "Lions in Masai Mara" },
  { src: "/images/gallery_leopard.jpg", alt: "Leopard in the wild" },
  { src: "/images/gallery_giraffe.jpg", alt: "Giraffe at sunset" },
  { src: "/images/gallery_zebras.jpg", alt: "Zebra herd" },
  { src: "/images/gallery_rhino.jpg", alt: "Rhinoceros" },
  { src: "/images/gallery_balloon.jpg", alt: "Hot air balloon safari" },
  { src: "/images/safari_vehicle.jpg", alt: "Safari vehicle" },
  { src: "/images/gallery_lodge.jpg", alt: "Safari lodge" },
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
    image: "/images/masai_mara.jpg",
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
            <img src="/images/logo.png" alt="Paws & Treks" className="h-10 sm:h-12 w-auto" />
            <div className="hidden sm:block">
              <span className={`font-serif text-lg font-bold ${scrolled ? "text-foreground" : "text-white"}`}>
                Paws & Treks
              </span>
            </div>
          </a>

          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`px-3 py-2 text-sm font-medium rounded-md transition-colors hover-elevate ${
                  scrolled
                    ? "text-foreground/70"
                    : "text-white/80"
                }`}
                data-testid={`link-nav-${link.label.toLowerCase()}`}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <a href="#contact">
              <Button size="sm" data-testid="button-book-now-nav">
                Book Now
              </Button>
            </a>
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
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="block px-4 py-3 text-sm font-medium text-foreground/80 rounded-md hover-elevate"
                onClick={() => setIsOpen(false)}
                data-testid={`link-mobile-${link.label.toLowerCase()}`}
              >
                {link.label}
              </a>
            ))}
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
          src="/images/safari_hero.jpg"
          alt="African savannah at sunset"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="max-w-2xl"
        >
          <motion.p
            variants={fadeInUp}
            className="text-amber-400 font-medium tracking-widest uppercase text-sm mb-4"
          >
            Wild Adventures. Unforgettable Safaris.
          </motion.p>
          <motion.h1
            variants={fadeInUp}
            className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6"
          >
            Discover Kenya's
            <span className="block text-amber-400">Wild Beauty</span>
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            className="text-lg sm:text-xl text-white/80 mb-8 leading-relaxed max-w-lg"
          >
            Embark on unforgettable safari adventures through Kenya's most stunning
            landscapes. From the Great Migration to the Big Five, experience Africa
            like never before.
          </motion.p>
          <motion.div variants={fadeInUp} className="flex flex-wrap gap-4">
            <a href="#safaris">
              <Button size="lg" data-testid="button-explore-safaris">
                Explore Safaris
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </a>
            <a href="#contact">
              <Button size="lg" variant="outline" className="backdrop-blur-sm bg-white/10 text-white border-white/30" data-testid="button-plan-adventure">
                Plan Your Adventure
              </Button>
            </a>
          </motion.div>

          <motion.div variants={fadeInUp} className="flex flex-wrap gap-8 mt-12 pt-8 border-t border-white/20">
            <div>
              <p className="text-3xl font-bold text-white">500+</p>
              <p className="text-white/60 text-sm">Happy Travelers</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-white">15+</p>
              <p className="text-white/60 text-sm">Safari Routes</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-white">10+</p>
              <p className="text-white/60 text-sm">Years Experience</p>
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
    <section id="safaris" className="py-20 sm:py-28 bg-background" data-testid="section-safaris">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
          className="text-center mb-16"
        >
          <motion.p variants={fadeInUp} className="text-primary font-medium tracking-widest uppercase text-sm mb-3">
            Our Experiences
          </motion.p>
          <motion.h2 variants={fadeInUp} className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Featured Safari Experiences
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Choose from our carefully curated safari experiences, each designed to showcase Kenya's most breathtaking wildlife and landscapes.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={stagger}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {safariExperiences.map((safari, i) => (
            <motion.div key={i} variants={fadeInUp}>
              <Card className="group cursor-pointer border-card-border" data-testid={`card-safari-${i}`}>
                <div className="relative overflow-hidden rounded-t-md">
                  <img
                    src={safari.image}
                    alt={safari.title}
                    className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-4 right-4 bg-primary text-primary-foreground text-xs font-bold px-3 py-1.5 rounded-md">
                    From {safari.price}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-serif text-xl font-bold mb-2">{safari.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{safari.description}</p>
                  <div className="flex items-center justify-between gap-4">
                    <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" /> {safari.duration}
                    </span>
                    <a href="#contact">
                      <Button variant="outline" size="sm" data-testid={`button-learn-more-${i}`}>
                        Learn More <ChevronRight className="w-3 h-3 ml-1" />
                      </Button>
                    </a>
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
    <section id="destinations" className="py-20 sm:py-28 bg-card" data-testid="section-destinations">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
          className="text-center mb-16"
        >
          <motion.p variants={fadeInUp} className="text-primary font-medium tracking-widest uppercase text-sm mb-3">
            Where to Go
          </motion.p>
          <motion.h2 variants={fadeInUp} className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Top Destinations
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Explore Kenya's most iconic wildlife destinations, each offering unique encounters and spectacular landscapes.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={stagger}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {destinations.map((dest, i) => (
            <motion.div key={i} variants={fadeInUp}>
              <a href="#contact" className="block group" data-testid={`card-destination-${i}`}>
                <div className="relative overflow-hidden rounded-md aspect-[4/3]">
                  <img
                    src={dest.image}
                    alt={dest.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <span className="inline-block text-amber-400 text-xs font-semibold tracking-wider uppercase mb-1">
                      {dest.tag}
                    </span>
                    <h3 className="font-serif text-xl font-bold text-white">{dest.name}</h3>
                  </div>
                  <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </a>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function WhyUsSection() {
  return (
    <section id="about" className="py-20 sm:py-28 bg-background" data-testid="section-about">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
          className="text-center mb-16"
        >
          <motion.p variants={fadeInUp} className="text-primary font-medium tracking-widest uppercase text-sm mb-3">
            Why Choose Us
          </motion.p>
          <motion.h2 variants={fadeInUp} className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Why Travel With Paws & Treks
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-muted-foreground max-w-2xl mx-auto text-lg">
            We go above and beyond to create safari experiences that are safe, sustainable, and truly unforgettable.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={stagger}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {whyUs.map((item, i) => (
            <motion.div key={i} variants={fadeInUp}>
              <Card className="p-6 text-center border-card-border h-full" data-testid={`card-why-${i}`}>
                <div className="w-14 h-14 bg-primary/10 rounded-md flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-serif text-lg font-bold mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function PackagesSection() {
  return (
    <section id="packages" className="py-20 sm:py-28 bg-card" data-testid="section-packages">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
          className="text-center mb-16"
        >
          <motion.p variants={fadeInUp} className="text-primary font-medium tracking-widest uppercase text-sm mb-3">
            Our Packages
          </motion.p>
          <motion.h2 variants={fadeInUp} className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Safari Packages
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Choose the perfect safari package for your adventure. All packages include expert guides and comfortable accommodations.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={stagger}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto"
        >
          {packages.map((pkg, i) => (
            <motion.div key={i} variants={fadeInUp}>
              <Card
                className={`relative p-6 border-card-border h-full flex flex-col ${
                  pkg.popular ? "ring-2 ring-primary" : ""
                }`}
                data-testid={`card-package-${i}`}
              >
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-bold px-4 py-1 rounded-md">
                    Most Popular
                  </div>
                )}
                <div className="text-center mb-6">
                  <h3 className="font-serif text-xl font-bold mb-2">{pkg.name}</h3>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-3xl font-bold text-primary">{pkg.price}</span>
                    <span className="text-muted-foreground text-sm">/person</span>
                  </div>
                </div>
                <ul className="space-y-3 mb-8 flex-1">
                  {pkg.highlights.map((h, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm">
                      <Star className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
                <a href="#contact">
                  <Button
                    className="w-full"
                    variant={pkg.popular ? "default" : "outline"}
                    data-testid={`button-book-package-${i}`}
                  >
                    Book Safari
                  </Button>
                </a>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function GallerySection() {
  return (
    <section id="gallery" className="py-20 sm:py-28 bg-background" data-testid="section-gallery">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
          className="text-center mb-16"
        >
          <motion.p variants={fadeInUp} className="text-primary font-medium tracking-widest uppercase text-sm mb-3">
            Safari Moments
          </motion.p>
          <motion.h2 variants={fadeInUp} className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Gallery
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-muted-foreground max-w-2xl mx-auto text-lg">
            A glimpse into the extraordinary moments our travelers have captured on their safari adventures.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={stagger}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3"
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
                  i === 0 || i === 5 ? "h-full min-h-[300px]" : "h-48 md:h-56"
                }`}
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                <Camera className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  const [current, setCurrent] = useState(0);

  return (
    <section className="py-20 sm:py-28 bg-card" data-testid="section-testimonials">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
          className="text-center mb-16"
        >
          <motion.p variants={fadeInUp} className="text-primary font-medium tracking-widest uppercase text-sm mb-3">
            Traveler Stories
          </motion.p>
          <motion.h2 variants={fadeInUp} className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
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
                <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <p className="font-serif text-xl sm:text-2xl italic mb-8 leading-relaxed" data-testid={`text-testimonial-${current}`}>
              "{testimonials[current].text}"
            </p>
            <p className="font-bold text-lg" data-testid={`text-testimonial-name-${current}`}>
              {testimonials[current].name}
            </p>
            <p className="text-muted-foreground text-sm flex items-center justify-center gap-1">
              <MapPin className="w-3 h-3" /> {testimonials[current].location}
            </p>
          </motion.div>

          <div className="flex items-center justify-center gap-4 mt-10">
            <Button
              size="icon"
              variant="outline"
              onClick={() => setCurrent((c) => (c === 0 ? testimonials.length - 1 : c - 1))}
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
    <section id="blog" className="py-20 sm:py-28 bg-background" data-testid="section-blog">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
          className="text-center mb-16"
        >
          <motion.p variants={fadeInUp} className="text-primary font-medium tracking-widest uppercase text-sm mb-3">
            Travel Insights
          </motion.p>
          <motion.h2 variants={fadeInUp} className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Blog & Travel Guide
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Expert tips, guides, and stories to help you plan the perfect safari.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={stagger}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {blogPosts.map((post, i) => (
            <motion.div key={i} variants={fadeInUp}>
              <Card className="group cursor-pointer border-card-border" data-testid={`card-blog-${i}`}>
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
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="relative py-24 sm:py-32" data-testid="section-cta">
      <div className="absolute inset-0">
        <img
          src="/images/gallery_balloon.jpg"
          alt="Safari adventure"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
        >
          <motion.h2
            variants={fadeInUp}
            className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6"
          >
            Ready for the Adventure of a Lifetime?
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
            Let us craft the perfect safari experience for you. Contact our team today and start planning your dream African adventure.
          </motion.p>
          <motion.div variants={fadeInUp}>
            <a href="#contact">
              <Button size="lg" data-testid="button-cta-book">
                Book Your Safari
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </a>
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
    <section id="contact" className="py-20 sm:py-28 bg-card" data-testid="section-contact">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
          className="text-center mb-16"
        >
          <motion.p variants={fadeInUp} className="text-primary font-medium tracking-widest uppercase text-sm mb-3">
            Get In Touch
          </motion.p>
          <motion.h2 variants={fadeInUp} className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Contact Us
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Have questions or ready to book? Reach out to our friendly team.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <Card className="p-6 sm:p-8 border-card-border">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Your name" {...field} data-testid="input-name" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="your@email.com" {...field} data-testid="input-email" />
                          </FormControl>
                          <FormMessage />
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
                          <FormLabel>Phone (Optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="+254 700 000 000" {...field} data-testid="input-phone" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="safari"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Interested Safari</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger data-testid="select-safari">
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
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Tell us about your dream safari..."
                            className="min-h-[120px] resize-none"
                            {...field}
                            data-testid="input-message"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="submit"
                    className="w-full"
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
            className="space-y-6"
          >
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-md flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-bold mb-1">Visit Our Office</h4>
                  <p className="text-muted-foreground text-sm">Westlands, Nairobi, Kenya</p>
                  <p className="text-muted-foreground text-sm">P.O. Box 12345-00100</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-md flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-bold mb-1">Call Us</h4>
                  <p className="text-muted-foreground text-sm">+254 700 000 000</p>
                  <p className="text-muted-foreground text-sm">Mon-Sat: 8am - 6pm EAT</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-md flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-bold mb-1">Email Us</h4>
                  <p className="text-muted-foreground text-sm">info@pawsandtreks.com</p>
                  <p className="text-muted-foreground text-sm">bookings@pawsandtreks.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-md flex items-center justify-center shrink-0">
                  <MessageCircle className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-bold mb-1">WhatsApp</h4>
                  <p className="text-muted-foreground text-sm">+254 700 000 000</p>
                  <p className="text-muted-foreground text-sm">Quick responses, 24/7</p>
                </div>
              </div>
            </div>

            <div className="rounded-md overflow-hidden mt-6 h-[200px] bg-muted">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.8170944459847!2d36.81217771475401!3d-1.2694139990617982!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f10d22f835805%3A0x4b28e0f1de4d40!2sWestlands%2C%20Nairobi!5e0!3m2!1sen!2ske!4v1709900000000!5m2!1sen!2ske"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Paws & Treks Office Location"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const [email, setEmail] = useState("");

  return (
    <footer className="bg-foreground text-background" data-testid="footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img src="/images/logo.png" alt="Paws & Treks" className="h-10 w-auto brightness-200" />
              <span className="font-serif text-lg font-bold">Paws & Treks</span>
            </div>
            <p className="text-background/60 text-sm leading-relaxed mb-6">
              Your gateway to Kenya's most incredible wildlife experiences. Expert-guided safaris since 2015.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-9 h-9 bg-background/10 rounded-md flex items-center justify-center hover-elevate transition-colors" aria-label="Facebook" data-testid="link-social-facebook">
                <Globe className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 bg-background/10 rounded-md flex items-center justify-center hover-elevate transition-colors" aria-label="Twitter" data-testid="link-social-twitter">
                <Bird className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 bg-background/10 rounded-md flex items-center justify-center hover-elevate transition-colors" aria-label="Instagram" data-testid="link-social-instagram">
                <Camera className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-serif font-bold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2.5">
              {["Home", "Safaris", "Destinations", "Packages", "Gallery", "Blog", "Contact"].map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase()}`}
                    className="text-background/60 text-sm hover:text-background transition-colors"
                    data-testid={`link-footer-${link.toLowerCase()}`}
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-serif font-bold text-lg mb-4">Safari Destinations</h4>
            <ul className="space-y-2.5">
              {["Maasai Mara", "Amboseli", "Tsavo", "Lake Nakuru", "Samburu", "Mount Kenya"].map((dest) => (
                <li key={dest}>
                  <a href="#destinations" className="text-background/60 text-sm transition-colors" data-testid={`link-footer-dest-${dest.toLowerCase().replace(/\s/g, "-")}`}>
                    {dest}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-serif font-bold text-lg mb-4">Newsletter</h4>
            <p className="text-background/60 text-sm mb-4">
              Get safari tips, travel guides, and exclusive offers delivered to your inbox.
            </p>
            <div className="flex gap-2">
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                className="bg-background/10 border-background/20 text-background placeholder:text-background/40"
                data-testid="input-newsletter-email"
              />
              <Button size="default" data-testid="button-newsletter-subscribe">
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t border-background/10 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-background/40 text-sm" data-testid="text-copyright">
            &copy; {new Date().getFullYear()} Paws & Treks. All rights reserved.
          </p>
          <div className="flex gap-6 text-background/40 text-sm">
            <a href="#" className="transition-colors" data-testid="link-privacy-policy">Privacy Policy</a>
            <a href="#" className="transition-colors" data-testid="link-terms-of-service">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <SafarisSection />
      <DestinationsSection />
      <WhyUsSection />
      <PackagesSection />
      <GallerySection />
      <TestimonialsSection />
      <BlogSection />
      <CTASection />
      <ContactSection />
      <Footer />
    </div>
  );
}
