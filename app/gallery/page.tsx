"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Menu, X, ArrowRight, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};
const stagger = { visible: { transition: { staggerChildren: 0.07 } } };

interface GalleryImage {
  src: string;
  alt: string;
  location: string;
}

const allImages: GalleryImage[] = [
  // Masai Mara
  { src: "/images/gallery_leopard.jpg", alt: "Leopard resting on a tree", location: "Masai Mara" },
  { src: "/images/gallery_giraffe.jpg", alt: "Giraffe at sunset", location: "Masai Mara" },
  { src: "/images/gallery_zebras.jpg", alt: "Zebra herd on the plains", location: "Masai Mara" },
  { src: "/images/gallery_balloon.jpg", alt: "Hot air balloon safari over the Mara", location: "Masai Mara" },
  { src: "/images/masai_mara.jpg", alt: "Masai Mara savannah", location: "Masai Mara" },
  { src: "/safari/mara.jpeg", alt: "Mara wildlife safari", location: "Masai Mara" },
  { src: "/safari/mara-2.jpeg", alt: "Mara wildlife safari", location: "Masai Mara" },
  { src: "/safari/mara-3.jpeg", alt: "Mara wildlife safari", location: "Masai Mara" },
  { src: "/safari/mara-4.jpeg", alt: "Mara wildlife safari", location: "Masai Mara" },
  { src: "/safari/mara-5.jpeg", alt: "Mara wildlife safari", location: "Masai Mara" },
  { src: "/safari/mara-6.jpeg", alt: "Mara wildlife safari", location: "Masai Mara" },
  { src: "/safari/mara-7.jpeg", alt: "Mara wildlife safari", location: "Masai Mara" },
  { src: "/safari/mara-8.jpeg", alt: "Mara wildlife safari", location: "Masai Mara" },
  { src: "/safari/mara-9.jpeg", alt: "Mara wildlife safari", location: "Masai Mara" },
  { src: "/safari/mara-10.jpeg", alt: "Mara wildlife safari", location: "Masai Mara" },
  { src: "/safari/mara-11.jpeg", alt: "Mara wildlife safari", location: "Masai Mara" },
  { src: "/safari/mara-12.jpeg", alt: "Mara wildlife safari", location: "Masai Mara" },
  // Lake Nakuru
  { src: "/images/gallery_rhino.jpg", alt: "White rhinoceros grazing", location: "Lake Nakuru" },
  { src: "/images/lake_nakuru.jpg", alt: "Lake Nakuru with flamingoes", location: "Lake Nakuru" },
  { src: "/safari/nakuru.jpeg", alt: "Lake Nakuru area", location: "Lake Nakuru" },
  { src: "/safari/nakuru-2.jpeg", alt: "Lake Nakuru area", location: "Lake Nakuru" },
  { src: "/safari/nakuru-3.jpeg", alt: "Lake Nakuru area", location: "Lake Nakuru" },
  { src: "/safari/bird-watching.jpg", alt: "Bird watching at Lake Nakuru", location: "Lake Nakuru" },
  // Amboseli
  { src: "/images/safari_vehicle.jpg", alt: "4x4 safari vehicle on a game drive", location: "Amboseli" },
  { src: "/images/amboseli.jpg", alt: "Amboseli National Park with Kilimanjaro", location: "Amboseli" },
  { src: "/safari/amboseli.jpeg", alt: "Amboseli national park", location: "Amboseli" },
  { src: "/safari/amboseli-2.jpeg", alt: "Amboseli national park", location: "Amboseli" },
  // Aberdares
  { src: "/safari/aberdares.jpeg", alt: "Aberdares forest area", location: "Aberdares" },
  { src: "/safari/aberdares-2.jpeg", alt: "Aberdares forest area", location: "Aberdares" },
  { src: "/safari/aberdares-3.jpeg", alt: "Aberdares forest area", location: "Aberdares" },
  { src: "/safari/aberdares-4.jpeg", alt: "Aberdares forest area", location: "Aberdares" },
  { src: "/safari/aberdares-5.jpeg", alt: "Aberdares forest area", location: "Aberdares" },
  { src: "/safari/aberdares-6.jpeg", alt: "Aberdares forest area", location: "Aberdares" },
  { src: "/safari/aberdares-7.jpeg", alt: "Aberdares forest area", location: "Aberdares" },
  { src: "/safari/aberdares-8.jpeg", alt: "Aberdares forest area", location: "Aberdares" },
  { src: "/safari/aberdares-9.jpeg", alt: "Aberdares forest area", location: "Aberdares" },
  { src: "/safari/aberdares-10.jpeg", alt: "Aberdares forest area", location: "Aberdares" },
  { src: "/safari/aberdares-11.jpeg", alt: "Aberdares forest area", location: "Aberdares" },
  { src: "/safari/aberdares-12.jpeg", alt: "Aberdares forest area", location: "Aberdares" },
  { src: "/safari/aberdares-13.jpeg", alt: "Aberdares forest area", location: "Aberdares" },
  { src: "/safari/aberdares-14.jpeg", alt: "Aberdares forest area", location: "Aberdares" },
  // Gatamaiyu
  { src: "/safari/gatamaiyu.jpeg", alt: "Gatamaiyu bush camp safari", location: "Gatamaiyu" },
  { src: "/safari/gatamaiyu-2.jpeg", alt: "Gatamaiyu bush camp safari", location: "Gatamaiyu" },
  { src: "/safari/gatamaiyu-3.jpeg", alt: "Gatamaiyu bush camp safari", location: "Gatamaiyu" },
  { src: "/safari/gatamaiyu-4.jpeg", alt: "Gatamaiyu bush camp safari", location: "Gatamaiyu" },
  // Nairobi
  { src: "/safari/nairobi.jpeg", alt: "Nairobi national park", location: "Nairobi" },
  { src: "/safari/nairobi-2.jpeg", alt: "Nairobi national park", location: "Nairobi" },
  { src: "/safari/nairobi-3.jpeg", alt: "Nairobi national park", location: "Nairobi" },
  { src: "/safari/nairobi-4.jpeg", alt: "Nairobi national park", location: "Nairobi" },
  { src: "/safari/nairobi-5.jpeg", alt: "Nairobi national park", location: "Nairobi" },
  { src: "/safari/nairobi-6.jpeg", alt: "Nairobi national park", location: "Nairobi" },
  // Naivasha
  { src: "/safari/naivasha.jpeg", alt: "Lake Naivasha scenery", location: "Naivasha" },
  { src: "/safari/hippo-family-water.jpg", alt: "Hippo family at Lake Naivasha", location: "Naivasha" },
  // Jangwani-Sagana
  { src: "/safari/jangwani-sagana.jpeg", alt: "Jangwani Sagana scenic area", location: "Jangwani-Sagana" },
  { src: "/safari/jangwani-sagana-2.jpeg", alt: "Jangwani Sagana scenic area", location: "Jangwani-Sagana" },
  { src: "/testimonials/jangwa.jpeg", alt: "Jangwani Sagana river adventure", location: "Jangwani-Sagana" },
  { src: "/testimonials/jangwa-1.jpeg", alt: "Jangwani Sagana rafting experience", location: "Jangwani-Sagana" },
  { src: "/testimonials/jangwa-2.jpeg", alt: "Jangwani Sagana outdoor activities", location: "Jangwani-Sagana" },
  { src: "/testimonials/jangwa-3.jpeg", alt: "Jangwani Sagana nature scenery", location: "Jangwani-Sagana" },
  { src: "/testimonials/jangwa-4.jpeg", alt: "Jangwani Sagana wildlife area", location: "Jangwani-Sagana" },
  // The Stone House
  { src: "/safari/the-stone-house.jpeg", alt: "The Stone House accommodation", location: "The Stone House" },
  { src: "/safari/the-stone-house-2.jpeg", alt: "The Stone House accommodation", location: "The Stone House" },
  { src: "/safari/the-stone-house-3.jpeg", alt: "The Stone House accommodation", location: "The Stone House" },
  // Tsavo
  { src: "/images/tsavo.jpg", alt: "Tsavo wilderness landscape", location: "Tsavo" },
  // Samburu
  { src: "/images/samburu.jpg", alt: "Samburu National Reserve", location: "Samburu" },
];

const categories = ["All", "Masai Mara", "Lake Nakuru", "Amboseli", "Aberdares", "Gatamaiyu", "Nairobi", "Naivasha", "Jangwani-Sagana", "The Stone House", "Tsavo", "Samburu"];

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Safaris", href: "/#safaris" },
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
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-background/95 backdrop-blur-md border-b shadow-sm" : "bg-background/95 backdrop-blur-md border-b"}`} data-testid="navbar-gallery">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 h-16 sm:h-20">
          <Link href="/" className="flex items-center gap-2 shrink-0" data-testid="link-logo-gallery">
            <img src="/images/logo.png" alt="Paws & Treks" className="h-10 sm:h-12 w-auto" />
            <span className="hidden sm:block font-serif text-lg font-bold text-foreground">Paws & Treks</span>
          </Link>
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link key={link.label} href={link.href} className={`px-3 py-2 text-sm font-medium rounded-md transition-colors hover-elevate ${link.label === "Gallery" ? "text-primary font-semibold" : "text-foreground/70"}`} data-testid={`link-nav-gallery-${link.label.toLowerCase()}`}>
                {link.label}
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <Link href="/book"><Button size="sm" data-testid="button-book-now-gallery">Request a Quote</Button></Link>
            <button className="lg:hidden p-2 rounded-md text-foreground" onClick={() => setIsOpen(!isOpen)} data-testid="button-mobile-menu-gallery">
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="lg:hidden bg-background/98 backdrop-blur-md border-b">
          <div className="px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <Link key={link.label} href={link.href} className="block px-4 py-3 text-sm font-medium text-foreground/80 rounded-md hover-elevate" onClick={() => setIsOpen(false)} data-testid={`link-mobile-gallery-${link.label.toLowerCase()}`}>
                {link.label}
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </nav>
  );
}

export default function Gallery() {
  const [activeTab, setActiveTab] = useState("All");
  const [lightbox, setLightbox] = useState<GalleryImage | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Gallery – Paws & Treks";
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === "Escape") setLightbox(null); };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  const filtered = activeTab === "All" ? allImages : allImages.filter((img) => img.location === activeTab);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="relative pt-20" data-testid="section-gallery-hero">
        <div className="relative h-60 sm:h-72 overflow-hidden">
          <img src="/safari/mara.jpeg" alt="Safari gallery" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/50 to-black/25" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-amber-400 font-medium tracking-widest uppercase text-sm mb-3">
              Safari Moments
            </motion.p>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3" data-testid="heading-gallery-page">
              Photo Gallery
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="text-white/80 max-w-xl text-sm sm:text-base">
              Breathtaking wildlife, landscapes, and safari moments captured across Kenya's finest parks and reserves.
            </motion.p>
          </div>
        </div>
      </section>

      <div className="bg-card border-b sticky top-16 sm:top-20 z-40" data-testid="section-gallery-tabs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-1 overflow-x-auto py-3 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`shrink-0 px-4 py-2 rounded-md text-sm font-medium transition-colors hover-elevate ${activeTab === cat ? "bg-primary text-primary-foreground" : "text-foreground/70"}`}
                data-testid={`tab-gallery-${cat.toLowerCase().replace(/\s/g, "-")}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16" data-testid="section-gallery-grid">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3"
          >
            {filtered.map((img, i) => (
              <motion.div
                key={img.src + i}
                variants={fadeInUp}
                className={`group relative overflow-hidden rounded-md cursor-pointer ${i === 0 ? "sm:col-span-2 sm:row-span-2" : ""}`}
                onClick={() => setLightbox(img)}
                data-testid={`gallery-img-${i}`}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className={`w-full object-cover transition-transform duration-700 group-hover:scale-110 ${i === 0 ? "h-full min-h-[300px]" : "h-48 sm:h-56"}`}
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex flex-col items-center justify-center">
                  <span className="text-white text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity px-3 py-1.5 bg-black/50 rounded-md">
                    {img.location}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-muted-foreground">No images found for this location.</div>
        )}
      </div>

      {lightbox && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
          data-testid="lightbox-overlay"
        >
          <button className="absolute top-4 right-4 text-white/70 p-2" onClick={() => setLightbox(null)} data-testid="button-lightbox-close">
            <X className="w-8 h-8" />
          </button>
          <div className="max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
            <img src={lightbox.src} alt={lightbox.alt} className="w-full max-h-[80vh] object-contain rounded-md" />
            <p className="text-white/70 text-sm text-center mt-3">{lightbox.alt} — {lightbox.location}</p>
          </div>
        </motion.div>
      )}

      <section className="relative py-16" data-testid="section-gallery-cta">
        <div className="absolute inset-0">
          <img src="/images/masai_mara.jpg" alt="Start your safari" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/65" />
        </div>
        <div className="relative z-10 max-w-2xl mx-auto px-4 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.h2 variants={fadeInUp} className="font-serif text-2xl sm:text-3xl font-bold text-white mb-3">Create Your Own Memories</motion.h2>
            <motion.p variants={fadeInUp} className="text-white/80 text-sm mb-6">Every photo in this gallery started with a booking. Start planning your Kenya safari today.</motion.p>
            <motion.div variants={fadeInUp} className="flex flex-wrap justify-center gap-3">
              <Link href="/book"><Button size="lg" data-testid="button-gallery-cta-book">Request a Quote <ArrowRight className="w-4 h-4 ml-2" /></Button></Link>
              <a href="https://wa.me/254769784190" target="_blank" rel="noopener noreferrer">
                <Button size="lg" variant="outline" className="bg-white/10 text-white border-white/30" data-testid="button-gallery-cta-whatsapp">
                  <MessageCircle className="w-4 h-4 mr-2" /> WhatsApp Us
                </Button>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
