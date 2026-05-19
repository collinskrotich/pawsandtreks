"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-foreground text-background" data-testid="footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img src="/images/logo.png" alt="Paws & Treks" className="h-10 w-auto brightness-200" />
              <span className="font-serif text-lg font-bold">Paws & Treks</span>
            </div>
            <p className="text-background/60 text-sm leading-relaxed mb-6">
              Your gateway to Kenya&apos;s most incredible wildlife experiences. Expert-guided safaris since 2015.
            </p>
            <div className="flex gap-3">
              <a href="https://web.facebook.com/Pawsandtreks" className="w-9 h-9 bg-background/10 rounded-md flex items-center justify-center hover-elevate transition-colors" aria-label="Facebook" data-testid="link-social-facebook" target="_blank" rel="noopener noreferrer">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a href="https://www.instagram.com/pawsandtreks/" className="w-9 h-9 bg-background/10 rounded-md flex items-center justify-center hover-elevate transition-colors" aria-label="Instagram" data-testid="link-social-instagram" target="_blank" rel="noopener noreferrer">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </a>
              <a href="https://www.tiktok.com/@pawsandtreks" className="w-9 h-9 bg-background/10 rounded-md flex items-center justify-center hover-elevate transition-colors" aria-label="TikTok" data-testid="link-social-tiktok" target="_blank" rel="noopener noreferrer">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>
              </a>
              <a href="https://www.youtube.com/@pawsandtreksAfrica" className="w-9 h-9 bg-background/10 rounded-md flex items-center justify-center hover-elevate transition-colors" aria-label="YouTube" data-testid="link-social-youtube" target="_blank" rel="noopener noreferrer">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
            </div>
            <div className="mt-6 flex flex-col gap-2">
              <a href="https://whatsapp.com/channel/0029Vb8HVMJ2v1IomDoRAe0l" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-background/80 hover:text-background text-sm transition-colors border border-background/20 rounded-md px-3 py-1.5 hover:bg-background/5">
                <span className="font-medium">Join WhatsApp Community</span>
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
              </a>
              <a href="https://www.facebook.com/share/1E3X3tqTHW/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-background/80 hover:text-background text-sm transition-colors border border-background/20 rounded-md px-3 py-1.5 hover:bg-background/5">
                <span className="font-medium">Join Facebook Community</span>
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-serif font-bold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2.5">
              {[
                { label: "Home", href: "/" },
                { label: "Destinations", href: "/#destinations" },
                { label: "Packages", href: "/packages" },
                { label: "Gallery", href: "/gallery" },
                { label: "Blog", href: "/blog" },
                { label: "Contact", href: "/#contact" },
              ].map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-background/60 text-sm transition-colors" data-testid={`link-footer-${link.label.toLowerCase()}`}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-serif font-bold text-lg mb-4">Safari Packages</h4>
            <ul className="space-y-2.5">
              {[
                { label: "Best Safari Deals", href: "/packages#best-safari-deals" },
                { label: "Top Private Safaris", href: "/packages#top-private-safaris" },
                { label: "Exciting Adventures", href: "/packages#exciting-adventures" },
                { label: "Kenya Camping", href: "/packages#kenya-camping" },
              ].map((pkg) => (
                <li key={pkg.label}>
                  <Link href={pkg.href} className="text-background/60 text-sm transition-colors" data-testid={`link-footer-pkg-${pkg.label.toLowerCase().replace(/\s/g, "-")}`}>
                    {pkg.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-background/10 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white text-sm" data-testid="text-copyright">
            &copy; {new Date().getFullYear()} Paws and Treks Tours and Travel. All rights reserved.
          </p>
          <div className="flex gap-6 text-white text-sm">
            <Link href="/booking-terms" className="transition-colors hover:text-white/80" data-testid="link-booking-terms">Booking Terms</Link>
            <Link href="/travel-information" className="transition-colors hover:text-white/80" data-testid="link-travel-info">Travel Information</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
