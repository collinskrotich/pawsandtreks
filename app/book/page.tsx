"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import {
  Menu, X, CalendarDays, Users, MessageCircle, Phone, Mail,
  CheckCircle2, ArrowRight, Minus, Plus
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
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55 } }
};
const stagger = { visible: { transition: { staggerChildren: 0.09 } } };

const bookingSchema = z.object({
  name: z.string().min(2, "Please enter your full name"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().optional(),
  safari: z.string().min(1, "Please select a safari"),
  departureDate: z.string().min(1, "Please select a departure date"),
  returnDate: z.string().optional(),
  adults: z.number().min(1, "At least 1 adult required").max(30),
  children: z.number().min(0).max(20),
  message: z.string().optional(),
});

type BookingForm = z.infer<typeof bookingSchema>;

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
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-background/95 backdrop-blur-md border-b shadow-sm" : "bg-background/95 backdrop-blur-md border-b"}`} data-testid="navbar-book">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 h-16 sm:h-20">
          <Link href="/" className="flex items-center gap-2 shrink-0" data-testid="link-logo-book">
            <img src="/images/logo.png" alt="Paws & Treks" className="h-10 sm:h-12 w-auto" />
            <span className="hidden sm:block font-serif text-lg font-bold text-foreground">Paws & Treks</span>
          </Link>
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link key={link.label} href={link.href} className="px-3 py-2 text-sm font-medium rounded-md transition-colors hover-elevate text-foreground/70" data-testid={`link-nav-book-${link.label.toLowerCase()}`}>
                {link.label}
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <button className="lg:hidden p-2 rounded-md text-foreground" onClick={() => setIsOpen(!isOpen)} data-testid="button-mobile-menu-book">
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="lg:hidden bg-background/98 backdrop-blur-md border-b">
          <div className="px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <Link key={link.label} href={link.href} className="block px-4 py-3 text-sm font-medium text-foreground/80 rounded-md hover-elevate" onClick={() => setIsOpen(false)} data-testid={`link-mobile-book-${link.label.toLowerCase()}`}>
                {link.label}
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </nav>
  );
}

export default function Book() {
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<BookingForm>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      safari: "",
      departureDate: "",
      returnDate: "",
      adults: 2,
      children: 0,
      message: "",
    },
  });

  const adults = form.watch("adults");
  const children = form.watch("children");

  const mutation = useMutation({
    mutationFn: async (data: BookingForm) => {
      await apiRequest("POST", "/api/bookings", data);
    },
    onSuccess: () => {
      toast({
        title: "Booking Request Sent!",
        description: "Thank you! Our team will contact you within 24 hours with pricing and availability.",
      });
      form.reset({ name: "", email: "", phone: "", safari: "", departureDate: "", returnDate: "", adults: 2, children: 0, message: "" });
      setTimeout(() => router.push("/"), 1500);
    },
    onError: () => {
      toast({ title: "Error", description: "Something went wrong. Please try again or WhatsApp us directly.", variant: "destructive" });
    },
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Request a Quote – Paws & Treks";
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="relative pt-20" data-testid="section-book-hero">
        <div className="relative h-60 sm:h-72 overflow-hidden">
          <img src="/images/safari_hero.jpg" alt="Book your safari" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/55 to-black/30" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-amber-400 font-medium tracking-widest uppercase text-sm mb-3">
              No Commitment — We Come to You
            </motion.p>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3" data-testid="heading-book-page">
              Request a Quote
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="text-white/80 max-w-xl text-sm sm:text-base">
              Tell us about your dream safari — dates, group size, and interests — and we'll craft a personalised quote just for you.
            </motion.p>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          <div className="lg:col-span-2">
            <motion.div initial="hidden" animate="visible" variants={stagger}>
              <motion.h2 variants={fadeInUp} className="font-serif text-2xl font-bold mb-2">Your Safari Details</motion.h2>
              <motion.p variants={fadeInUp} className="text-muted-foreground mb-8">Fill in your preferences and we'll get back to you within 24 hours with a personalised quote.</motion.p>

              <Card className="border-card-border p-6 sm:p-8" data-testid="card-booking-form">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit((data) => mutation.mutate(data))} className="space-y-6">

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <FormField control={form.control} name="name" render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name *</FormLabel>
                          <FormControl><Input placeholder="Your full name" {...field} data-testid="input-book-name" /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                      <FormField control={form.control} name="email" render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address *</FormLabel>
                          <FormControl><Input placeholder="your@email.com" type="email" {...field} data-testid="input-book-email" /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <FormField control={form.control} name="phone" render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone / WhatsApp</FormLabel>
                          <FormControl><Input placeholder="+254-769-784-190" {...field} data-testid="input-book-phone" /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                      <FormField control={form.control} name="safari" render={({ field }) => (
                        <FormItem>
                          <FormLabel>Safari Interest *</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger data-testid="select-book-safari">
                                <SelectValue placeholder="Which safari?" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="masai-mara-3d">3-Days Masai Mara</SelectItem>
                              <SelectItem value="mara-nakuru-4d">4-Days Mara & Nakuru</SelectItem>
                              <SelectItem value="mara-nakuru-amboseli-5d">5-Days Mara / Nakuru / Amboseli</SelectItem>
                              <SelectItem value="mara-nakuru-amboseli-7d">7-Days Grand Safari</SelectItem>
                              <SelectItem value="private-mara-3d">3-Days Private Mara</SelectItem>
                              <SelectItem value="private-nakuru-naivasha-mara-5d">5-Days Private Nakuru / Naivasha / Mara</SelectItem>
                              <SelectItem value="private-mara-nakuru-4d">4-Days Private Mara & Nakuru</SelectItem>
                              <SelectItem value="photographic-safari-10d">Photographic Safari (10 Days)</SelectItem>
                              <SelectItem value="balloon-safari">Balloon Safari</SelectItem>
                              <SelectItem value="birdwatching-10d">Bird Watching Safari (10 Days)</SelectItem>
                              <SelectItem value="gatamaiyu-bush-camp">Gatamaiyu Bush Camp</SelectItem>
                              <SelectItem value="ole-tepesi-lodge">Ole-Tepesi Lodge & Camp</SelectItem>
                              <SelectItem value="aberdares-tented-camp">Aberdares Tented Camp</SelectItem>
                              <SelectItem value="jangwani-sagana-camp">Jangwani Sagana Camp</SelectItem>
                              <SelectItem value="nairobi-np-1d">Nairobi National Park Day Trip</SelectItem>
                              <SelectItem value="custom">Custom / Tailor-Made Safari</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )} />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <FormField control={form.control} name="departureDate" render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-1.5"><CalendarDays className="w-3.5 h-3.5" /> Departure Date *</FormLabel>
                          <FormControl><Input type="date" min={new Date().toISOString().split("T")[0]} {...field} data-testid="input-book-departure" /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                      <FormField control={form.control} name="returnDate" render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-1.5"><CalendarDays className="w-3.5 h-3.5" /> Return Date</FormLabel>
                          <FormControl><Input type="date" min={form.watch("departureDate") || new Date().toISOString().split("T")[0]} {...field} data-testid="input-book-return" /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                    </div>

                    <div>
                      <FormLabel className="flex items-center gap-1.5 mb-3"><Users className="w-3.5 h-3.5" /> Group Size</FormLabel>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center gap-3">
                          <span className="text-sm text-muted-foreground w-16">Adults</span>
                          <div className="flex items-center border rounded-md">
                            <button type="button" className="p-2 hover-elevate" onClick={() => form.setValue("adults", Math.max(1, adults - 1))} data-testid="button-adults-minus"><Minus className="w-3.5 h-3.5" /></button>
                            <span className="px-4 py-1.5 text-sm font-semibold min-w-[2.5rem] text-center" data-testid="text-adults-count">{adults}</span>
                            <button type="button" className="p-2 hover-elevate" onClick={() => form.setValue("adults", Math.min(30, adults + 1))} data-testid="button-adults-plus"><Plus className="w-3.5 h-3.5" /></button>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-sm text-muted-foreground w-16">Children</span>
                          <div className="flex items-center border rounded-md">
                            <button type="button" className="p-2 hover-elevate" onClick={() => form.setValue("children", Math.max(0, children - 1))} data-testid="button-children-minus"><Minus className="w-3.5 h-3.5" /></button>
                            <span className="px-4 py-1.5 text-sm font-semibold min-w-[2.5rem] text-center" data-testid="text-children-count">{children}</span>
                            <button type="button" className="p-2 hover-elevate" onClick={() => form.setValue("children", Math.min(20, children + 1))} data-testid="button-children-plus"><Plus className="w-3.5 h-3.5" /></button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <FormField control={form.control} name="message" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Special Requests or Questions</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Any dietary requirements, accessibility needs, special occasions, or questions for our team..." className="min-h-[100px] resize-none" {...field} data-testid="textarea-book-message" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />

                    <Button type="submit" size="lg" className="w-full" disabled={mutation.isPending} data-testid="button-submit-booking">
                      {mutation.isPending ? "Sending Request..." : <>Send Booking Request <ArrowRight className="w-4 h-4 ml-2" /></>}
                    </Button>
                  </form>
                </Form>
              </Card>
            </motion.div>
          </div>

          <div className="space-y-5">
            <motion.div initial="hidden" animate="visible" variants={stagger}>
              <motion.div variants={fadeInUp}>
                <Card className="border-card-border p-6 bg-jungle-green text-jungle-green-foreground" data-testid="card-booking-whatsapp">
                  <h3 className="font-serif font-bold text-lg mb-2">Prefer to Chat?</h3>
                  <p className="text-jungle-green-foreground/80 text-sm mb-4">WhatsApp our team directly for the fastest response.</p>
                  <a href="https://wa.me/254769784190" target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" className="w-full bg-white/10 text-white border-white/30 hover-elevate" data-testid="button-book-whatsapp">
                      <MessageCircle className="w-4 h-4 mr-2" /> +254-769-784-190
                    </Button>
                  </a>
                </Card>
              </motion.div>

              <motion.div variants={fadeInUp}>
                <Card className="border-card-border p-6" data-testid="card-booking-call">
                  <h3 className="font-serif font-bold text-base mb-2">Call Us</h3>
                  <p className="text-muted-foreground text-sm mb-3">Our team is available 7 days a week.</p>
                  <a href="tel:+254769784190" className="flex items-center gap-2 text-primary font-semibold text-sm" data-testid="link-book-phone">
                    <Phone className="w-4 h-4" /> +254-769-784-190
                  </a>
                </Card>
              </motion.div>

              <motion.div variants={fadeInUp}>
                <Card className="border-card-border p-6" data-testid="card-booking-email">
                  <h3 className="font-serif font-bold text-base mb-2">Email Us</h3>
                  <p className="text-muted-foreground text-sm mb-3">Send us your inquiry directly.</p>
                  <a href="mailto:bookings@pawsandtreks.com" className="flex items-center gap-2 text-primary font-semibold text-sm" data-testid="link-book-email-bookings">
                    <Mail className="w-4 h-4" /> bookings@pawsandtreks.com
                  </a>
                  <a href="mailto:info@pawsandtreks.com" className="flex items-center gap-2 text-muted-foreground text-sm mt-1" data-testid="link-book-email-info">
                    <Mail className="w-4 h-4" /> info@pawsandtreks.com
                  </a>
                </Card>
              </motion.div>

              <motion.div variants={fadeInUp}>
                <Card className="border-card-border p-6" data-testid="card-booking-includes">
                  <h3 className="font-serif font-bold text-base mb-4">What Happens Next?</h3>
                  <ol className="space-y-3">
                    {[
                      "We receive your request and review your preferences",
                      "Our team prepares a personalised quote within 24 hours",
                      "We confirm availability and secure your reservation",
                      "25% deposit to confirm — balance before safari starts",
                    ].map((step, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm">
                        <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold shrink-0">{i + 1}</span>
                        <span className="text-muted-foreground">{step}</span>
                      </li>
                    ))}
                  </ol>
                </Card>
              </motion.div>

              <motion.div variants={fadeInUp}>
                <Card className="border-card-border p-6 bg-jungle-green/8" data-testid="card-booking-trust">
                  <h3 className="font-serif font-bold text-base mb-3">Why Book With Us?</h3>
                  <ul className="space-y-2">
                    {[
                      "No booking fees — 100% free quotes",
                      "Expert local guides, born in Kenya",
                      "Flexible itineraries — your pace, your style",
                      "24/7 in-country support throughout your safari",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="w-4 h-4 text-jungle-green shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </Card>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
