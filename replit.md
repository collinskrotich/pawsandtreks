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

## Architecture
- `client/src/pages/home.tsx` - Main landing page with all sections (Hero, Safaris, Destinations, Packages, Gallery, Testimonials, Blog, CTA, Contact, Footer)
- `client/src/pages/packages.tsx` - Dedicated packages page with 4 categories: Best Safari Deals, Top Private Safaris, Exciting Adventures, Kenya Camping
- `client/src/pages/blog.tsx` - Dedicated blog page with 3 expandable articles
- `client/src/pages/terms.tsx` - Booking Terms & Travel Information page (payments, cancellations, visas, weather, health, security, etc.)
- `client/src/App.tsx` - Router setup
- `server/routes.ts` - API routes (POST/GET /api/inquiries)
- `server/storage.ts` - In-memory storage for contact inquiries
- `shared/schema.ts` - Data models (users, inquiries) with Zod validation

## Brand Identity
- **Name**: Paws & Treks
- **Tagline**: "Wild Adventures. Unforgettable Safaris."
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
