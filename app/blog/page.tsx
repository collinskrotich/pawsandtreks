"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Menu, X, Clock, ArrowRight, CalendarDays, Tag, MessageCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } }
};

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string[];
  image: string;
  date: string;
  readTime: string;
  category: string;
  author: string;
}

const blogPosts: BlogPost[] = [
  {
    id: "best-time-masai-mara",
    title: "Best Time to Visit Maasai Mara",
    excerpt: "Plan your safari around the Great Migration and optimal weather windows for an unforgettable experience.",
    image: "/images/masai_mara.jpg",
    date: "February 15, 2026",
    readTime: "5 min read",
    category: "Travel Tips",
    author: "Paws & Treks Team",
    content: [
      "The Maasai Mara National Reserve is one of Africa's most celebrated wildlife destinations, and choosing the right time to visit can make the difference between a good safari and a truly extraordinary one.",
      "**The Great Migration (July – October)**",
      "The most dramatic time to visit is between July and October, when over 1.5 million wildebeest, zebras, and gazelles make their annual migration from Tanzania's Serengeti to the Maasai Mara. The famous river crossings — where herds plunge into the crocodile-infested Mara River — are among the most spectacular wildlife events on earth. This period brings peak crowds and higher prices, but the experience is simply unmissable.",
      "**Green Season (November – June)**",
      "The so-called 'shoulder' and 'green' seasons offer their own rewards. From November to June, the Mara transforms into a lush, verdant landscape. Wildlife is still abundant — the Big Five are resident year-round — and you'll enjoy far fewer tourists and significantly lower rates at lodges and camps. Birdlife is particularly spectacular during this period, with hundreds of migratory species arriving.",
      "**Weather Patterns**",
      "The Mara experiences two wet seasons: the long rains (April–June) and the short rains (November). The dry season (July–October) is warmest and driest. Even in the wet season, rain typically falls in short afternoon bursts and rarely disrupts a full day of game drives.",
      "**Our Recommendation**",
      "If witnessing the Great Migration is your dream, plan your trip between late July and September — ideally August — for the best chance of seeing a river crossing. If you prefer quieter parks, lower prices, and green landscapes, visit between January and March, when the land is lush and predator action is excellent as animals gather near water sources.",
      "Whatever time of year you choose, the Maasai Mara never disappoints. Contact our team at Paws & Treks to plan your perfect timing.",
    ],
  },
  {
    id: "what-to-pack-kenya-safari",
    title: "What to Pack for a Kenya Safari",
    excerpt: "Essential gear, clothing, and tips to ensure you're fully prepared for your African adventure.",
    image: "/images/safari_vehicle.jpg",
    date: "January 28, 2026",
    readTime: "6 min read",
    category: "Safari Guide",
    author: "Paws & Treks Team",
    content: [
      "Packing for a Kenya safari requires careful thought — you want to be prepared for dust, heat, early morning chills, and everything in between, while keeping your luggage light enough for light aircraft transfers and open game vehicles.",
      "**Clothing**",
      "Neutral colours are essential — khaki, beige, olive green, and tan. Avoid white (it shows dust) and bright colours (they can disturb wildlife and attract insects). Pack lightweight, long-sleeved shirts and trousers for sun and insect protection. A warm fleece or jacket is essential for early morning game drives when temperatures can drop significantly, especially in the Mara highlands.",
      "**Footwear**",
      "Comfortable, closed-toe walking shoes or lightweight boots are ideal. You won't be doing much walking in most reserves, but sturdy footwear protects against thorns, rocks, and insects during bush walks. Sandals are fine for the lodge.",
      "**Sun Protection**",
      "The equatorial sun is intense. Pack a high-SPF sunscreen, a wide-brimmed hat, and quality UV-blocking sunglasses. Apply sunscreen generously — especially on your arms and face when standing through the vehicle's open roof hatch.",
      "**Camera & Binoculars**",
      "A camera with a good telephoto lens (200mm minimum, 400mm+ ideal) will give you spectacular wildlife shots. Bring extra memory cards and a portable charger. A quality pair of binoculars (8×42 or 10×42) will transform your game drives — you'll spot animals your fellow travellers miss entirely.",
      "**Health & Medications**",
      "Consult your doctor about malaria prophylaxis well before travel. Pack insect repellent with DEET (30% or higher), antihistamines, rehydration sachets, and any prescription medications. Kenya has excellent medical facilities in Nairobi, but remote parks do not.",
      "**Documents & Money**",
      "Carry your passport, visa documentation, travel insurance certificate, and emergency contact numbers in a waterproof pouch. The Kenyan shilling is widely used, but USD is accepted at most lodges. Carry small denominations for tips.",
      "**What NOT to Pack**",
      "Leave camouflage clothing at home — it is illegal in Kenya. Avoid heavy luggage; many charter flights have strict weight limits of 15kg in soft bags only. Leave valuables at home or in the hotel safe.",
    ],
  },
  {
    id: "top-10-animals-kenya-safari",
    title: "Top 10 Animals to See on Safari in Kenya",
    excerpt: "From the Big Five to rare species, discover the incredible wildlife waiting for you in Kenya.",
    image: "/images/gallery_leopard.jpg",
    date: "January 10, 2026",
    readTime: "7 min read",
    category: "Wildlife",
    author: "Paws & Treks Team",
    content: [
      "Kenya's wildlife is extraordinarily diverse, with over 25,000 animal species roaming its national parks and reserves. Here are the top ten animals every safari traveler hopes to encounter.",
      "**1. Lion**",
      "The undisputed king of the savannah, Kenya's lions are most easily spotted in the Maasai Mara, where large prides are regularly sighted. Early morning and late afternoon are the best times, when lions are active and hunting.",
      "**2. Elephant**",
      "Amboseli National Park offers the world's finest elephant viewing, with vast herds silhouetted against Mount Kilimanjaro's snow-capped peak. The Maasai Mara and Tsavo also host impressive elephant populations.",
      "**3. Leopard**",
      "The most elusive of the Big Five, leopards are solitary and nocturnal. The Maasai Mara and Samburu offer excellent leopard sightings — look up into the fig and sausage trees where they rest with kills draped over branches.",
      "**4. Buffalo**",
      "Often underestimated, the Cape Buffalo is one of Africa's most dangerous animals. Large herds roam the Maasai Mara and Lake Nakuru, and old bulls ('dagga boys') are frequently encountered near water.",
      "**5. Rhinoceros**",
      "Kenya has both black and white rhinos. Lake Nakuru National Park is one of the best places in Africa to see both species. Ol Pejeta Conservancy is home to some of the world's last northern white rhinos.",
      "**6. Cheetah**",
      "The world's fastest land animal is a regular sight in the Maasai Mara's open plains. Cheetahs hunt by day, making them easier to see than leopards. The Mara's famous female cheetahs and their cubs are a photographer's dream.",
      "**7. Hippo**",
      "Hippos spend their days submerged in the Mara River, Lake Naivasha, and Lake Baringo. At dusk, they emerge to graze — a spectacular sight as these enormous animals lumber across the plains.",
      "**8. Flamingo**",
      "Lake Nakuru's alkaline waters host hundreds of thousands of lesser and greater flamingoes, turning the lake shore a vivid shade of pink. Lake Bogoria is another spectacular flamingo destination.",
      "**9. Giraffe**",
      "The stately reticulated giraffe of Samburu and the Maasai giraffe of the southern parks are iconic Kenya safari sights. The Giraffe Centre in Nairobi lets you feed Rothschild giraffes by hand.",
      "**10. Wildebeest**",
      "During the Great Migration (July–October), over 1.5 million wildebeest flood into the Maasai Mara from Tanzania's Serengeti — one of the greatest wildlife spectacles on earth. The Mara River crossings, where thousands of animals brave crocodiles, are among safari's most dramatic moments.",
    ],
  },
];

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Safaris", href: "/#safaris" },
  { label: "Destinations", href: "/#destinations" },
  { label: "Packages", href: "/packages" },
  { label: "Gallery", href: "/#gallery" },
  { label: "About", href: "/#about" },
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
      data-testid="navbar-blog"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 h-16 sm:h-20">
          <Link href="/" className="flex items-center gap-2 shrink-0" data-testid="link-logo-blog">
            <img src="/images/logo.png" alt="Paws & Treks" className="h-10 sm:h-12 w-auto" />
            <span className="hidden sm:block font-serif text-lg font-bold text-foreground">Paws & Treks</span>
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={`px-3 py-2 text-sm font-medium rounded-md transition-colors hover-elevate ${
                  link.label === "Blog" ? "text-primary font-semibold" : "text-foreground/70"
                }`}
                data-testid={`link-nav-blog-${link.label.toLowerCase()}`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <Link href="/#contact">
              <Button size="sm" data-testid="button-book-now-blog">Book Now</Button>
            </Link>
            <button
              className="lg:hidden p-2 rounded-md text-foreground"
              onClick={() => setIsOpen(!isOpen)}
              aria-expanded={isOpen}
              aria-label="Toggle navigation menu"
              data-testid="button-mobile-menu-blog"
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
                data-testid={`link-mobile-blog-${link.label.toLowerCase()}`}
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

function BlogPostCard({ post }: { post: BlogPost }) {
  const [expanded, setExpanded] = useState(false);

  const renderContent = (line: string, i: number) => {
    if (line.startsWith("**") && line.endsWith("**")) {
      return (
        <h4 key={i} className="font-serif font-bold text-base mt-6 mb-2">
          {line.replace(/\*\*/g, "")}
        </h4>
      );
    }
    return (
      <p key={i} className="text-sm text-muted-foreground leading-relaxed">
        {line}
      </p>
    );
  };

  return (
    <motion.div variants={fadeInUp} id={post.id}>
      <Card className="border-card-border overflow-visible" data-testid={`card-blog-${post.id}`}>
        <div className="grid grid-cols-1 lg:grid-cols-5">
          {/* Image */}
          <div className="lg:col-span-2">
            <div className="relative h-56 lg:h-full min-h-[260px] overflow-hidden rounded-t-lg lg:rounded-l-lg lg:rounded-tr-none">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <div className="absolute top-4 left-4">
                <Badge data-testid={`badge-category-${post.id}`}>{post.category}</Badge>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-3 p-6 sm:p-8 flex flex-col gap-4">
            <div>
              <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground mb-3">
                <span className="flex items-center gap-1.5">
                  <CalendarDays className="w-3.5 h-3.5" /> {post.date}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" /> {post.readTime}
                </span>
                <span className="flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5" /> {post.author}
                </span>
              </div>
              <h2 className="font-serif text-2xl font-bold mb-2" data-testid={`text-blog-title-${post.id}`}>
                {post.title}
              </h2>
              <p className="text-muted-foreground text-sm leading-relaxed">{post.excerpt}</p>
            </div>

            <button
              className="flex items-center gap-2 text-sm font-semibold text-primary w-fit"
              onClick={() => setExpanded(!expanded)}
              data-testid={`button-expand-blog-${post.id}`}
            >
              {expanded ? "Collapse Article ↑" : "Read Full Article →"}
            </button>
          </div>
        </div>

        {/* Expanded article body */}
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35 }}
            className="border-t border-card-border"
          >
            <div className="p-6 sm:p-8 max-w-3xl">
              <div className="space-y-4">
                {post.content.map((line, i) => renderContent(line, i))}
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-4 pt-6 border-t border-card-border">
                <p className="text-sm text-muted-foreground">
                  Ready to experience Kenya for yourself?
                </p>
                <Link href="/packages">
                  <Button size="sm" data-testid={`button-blog-packages-${post.id}`}>
                    View Packages <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </Button>
                </Link>
                <a href="https://wa.me/254769784190" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="sm" data-testid={`button-blog-whatsapp-${post.id}`}>
                    <MessageCircle className="w-3.5 h-3.5 mr-1" /> WhatsApp Us
                  </Button>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </Card>
    </motion.div>
  );
}

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Blog & Travel Guide – Paws & Treks";
  }, []);

  useEffect(() => {
    const loadPublishedBlogs = async () => {
      try {
        const res = await fetch("/api/blogs?published=true", { cache: "no-store" });
        if (!res.ok) {
          setPosts([]);
          return;
        }

        const data = await res.json();
        if (!Array.isArray(data)) {
          setPosts([]);
          return;
        }

        const mapped: BlogPost[] = data.map((row: {
          id: string;
          slug: string;
          title: string;
          excerpt: string;
          content: string[];
          cover_image_url: string | null;
          category: string;
          author: string;
          read_time: string | null;
          published_at: string | null;
          created_at: string;
        }) => {
          const publishedDate = row.published_at ?? row.created_at;
          return {
            id: row.slug || row.id,
            title: row.title,
            excerpt: row.excerpt,
            content: Array.isArray(row.content) ? row.content : [],
            image: row.cover_image_url || "/images/masai_mara.jpg",
            date: new Date(publishedDate).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            }),
            readTime: row.read_time || "5 min read",
            category: row.category,
            author: row.author || "Paws & Treks Team",
          };
        });

        setPosts(mapped);
      } catch {
        setPosts([]);
      }
    };

    loadPublishedBlogs();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-20" data-testid="section-blog-hero">
        <div className="relative h-64 sm:h-80 overflow-hidden">
          <img
            src="/images/gallery_giraffe.jpg"
            alt="Safari travel guide"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
            <motion.p
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
              className="text-amber-400 font-medium tracking-widest uppercase text-sm mb-3"
            >
              Expert Tips & Insights
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
              className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4"
              data-testid="heading-blog-page"
            >
              Blog & Travel Guide
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
              className="text-white/80 max-w-xl text-sm sm:text-base"
            >
              Expert advice, wildlife guides, and insider tips to help you plan the ultimate Kenya safari.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Articles */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20" data-testid="section-blog-articles">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="mb-10"
        >
          <motion.p variants={fadeInUp} className="text-primary font-medium tracking-widest uppercase text-sm mb-2">
            Our Articles
          </motion.p>
          <motion.h2 variants={fadeInUp} className="font-serif text-3xl sm:text-4xl font-bold mb-3">
            Safari Knowledge Hub
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-muted-foreground max-w-2xl">
            Everything you need to know before, during, and after your Kenya safari — written by our expert guides.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="space-y-8"
        >
          {posts.map((post) => (
            <BlogPostCard key={post.id} post={post} />
          ))}
        </motion.div>
      </section>

      {/* Bottom CTA */}
      <section className="relative py-20" data-testid="section-blog-cta">
        <div className="absolute inset-0">
          <img src="/images/masai_mara.jpg" alt="Start your safari" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.h2 variants={fadeInUp} className="font-serif text-3xl sm:text-4xl font-bold text-white mb-4">
              Ready to Start Your Safari?
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-white/80 mb-8">
              Browse our safari packages or get in touch with our team to start planning your Kenya adventure.
            </motion.p>
            <motion.div variants={fadeInUp} className="flex flex-wrap justify-center gap-4">
              <Link href="/packages">
                <Button size="lg" data-testid="button-blog-cta-packages">
                  View All Packages <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link href="/#contact">
                <Button size="lg" variant="outline" className="backdrop-blur-sm bg-white/10 text-white border-white/30" data-testid="button-blog-cta-contact">
                  Contact Us
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
