# Paws & Treks - Kenya Safari Website

## Overview
A modern, premium website for "Paws & Treks", a Kenya-based tours and safari company. The design features an African safari aesthetic with a luxurious, adventure-focused feel.

## Tech Stack
- **Frontend**: React + TypeScript + Vite
- **Backend**: Express.js (Node.js)
- **Styling**: Tailwind CSS + shadcn/ui components
- **Animations**: Framer Motion
- **Routing**: wouter
- **State/Data**: TanStack React Query
- **Forms**: react-hook-form + zod validation
io

## Architecture
- `client/src/pages/home.tsx` - Main landing page: Hero, Safaris, Destinations, Packages (4 categories), Gallery, Testimonials, Blog, CTA, Contact, Footer
- `client/src/pages/packages.tsx` - Full packages page with 4 category sections and star bullet-list highlights
- `client/src/pages/book.tsx` - Booking / "Request a Quote" page at /book (name, email, phone, safari select, dates, adults/children counter, message)
- `client/src/pages/gallery.tsx` - Gallery page at /gallery with category tabs (Masai Mara, Amboseli, Tsavo, etc.) and lightbox
- `client/src/pages/blog.tsx` - Blog page with 3 expandable articles
- `client/src/pages/terms.tsx` - Booking Terms & Travel Information page
- `client/src/App.tsx` - Router: /, /packages, /blog, /terms, /book, /gallery
- `server/routes.ts` - API routes: POST/GET /api/inquiries, POST/GET /api/bookings
- `server/storage.ts` - In-memory storage for inquiries and bookings
- `shared/schema.ts` - Data models (users, inquiries, bookings) with Zod validation

## Design Tokens
- Primary: amber/orange hsl(28 85% 45%)
- Jungle Green: hsl(145 52% 28%) — accent color for "Request a Quote" badges, camping category labels, WhatsApp card
- Fonts: Playfair Display (serif headings), Plus Jakarta Sans (body)

## Contact Details
- Phone/WhatsApp: +254-769-784-190
- Email: pawsandtreks@gmail.com, richtabi7777@gmail.com

## Brand Identity
- **Name**: Paws & Treks
- **Tagline**: "Unforgettable Safaris."
- **Theme**: Safari green, sunset orange/amber, sand beige, charcoal
- **Fonts**: Playfair Display (headings), Plus Jakarta Sans (body)

## Key Features
- Full-width cinematic hero with parallax-style design
- Featured safari experiences with pricing cards
- Interactive destinations grid
- Safari packages with pricing tiers
- Photo gallery with hover effects
- Testimonial slider with real reviews
- Blog/travel guide section
- Contact form with inquiry submission to backend
- Sticky navigation with scroll-aware styling
- Fully responsive design
- SEO optimized with meta tags

## Images
All safari stock images stored in `client/public/images/`:
- safari_hero.jpg, masai_mara.jpg, amboseli.jpg, mount_kenya.jpg
- lake_nakuru.jpg, tsavo.jpg, samburu.jpg, safari_vehicle.jpg
- gallery_leopard.jpg, gallery_giraffe.jpg, gallery_zebras.jpg
- gallery_rhino.jpg, gallery_balloon.jpg, gallery_lodge.jpg
- logo.png (company logo)

## Running
- `npm run dev` starts both Express backend and Vite frontend on port 5000
