import type { Metadata, Viewport } from "next";
import { Playfair_Display, Plus_Jakarta_Sans, Inter } from "next/font/google";
import Providers from "./providers";
import "@/index.css";
import {
  organizationSchema,
  localBusinessSchema,
  faqSchema,
} from "@/lib/seo-schema";

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://pawsandtreks.com"),
  title: {
    default: "Paws & Treks - Safari Tours in Kenya | Masai Mara, Amboseli & More",
    template: "%s | Paws & Treks",
  },
  description:
    "Expert-guided safari tours across Kenya's most iconic destinations. Experience the Big Five, Great Migration, and African wildlife with Paws & Treks. Luxury and budget-friendly packages available.",
  keywords: [
    "Kenya safari",
    "safari tours",
    "Masai Mara safari",
    "Amboseli safari",
    "Tsavo safari",
    "wildlife tours",
    "African safari",
    "Kenya tours",
    "safari packages",
    "luxury safari",
    "budget safari",
    "Kenya vacation",
    "safari adventure",
    "guided safari",
  ],
  authors: [{ name: "Paws & Treks" }],
  creator: "Paws & Treks",
  publisher: "Paws & Treks",
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  formatDetection: {
    email: true,
    telephone: true,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://pawsandtreks.com",
    siteName: "Paws & Treks",
    title: "Paws & Treks - Safari Tours in Kenya | Unforgettable African Adventures",
    description:
      "Discover Kenya's wild beauty with expert-guided safari tours. Experience Big Five wildlife, Great Migration, and pristine landscapes.",
    images: [
      {
        url: "/images/safari_hero.jpg",
        width: 1200,
        height: 630,
        alt: "Paws & Treks Safari Adventure",
        type: "image/jpeg",
      },
      {
        url: "/images/masai_mara.jpg",
        width: 1200,
        height: 630,
        alt: "Masai Mara Safari Experience",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@pawsandtreks",
    creator: "@pawsandtreks",
    title: "Paws & Treks - Safari Tours in Kenya",
    description:
      "Expert-guided safari tours across Kenya's most iconic destinations",
    images: ["/images/safari_hero.jpg"],
  },
  icons: {
    icon: "/images/logo.png",
    shortcut: "/images/logo.png",
    apple: "/images/logo.png",
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Paws & Treks",
  },
  applicationName: "Paws & Treks",
  alternates: {
    canonical: "https://pawsandtreks.com",
  },
};

export const viewport: Viewport = {
  themeColor: "#C7553B",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const schemaMarkups = [organizationSchema, localBusinessSchema, faqSchema];

  return (
    <html lang="en">
      <head>
        {/* Preconnect to external resources */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Structured Data - JSON-LD */}
        {schemaMarkups.map((schema, index) => (
          <script
            key={index}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
            suppressHydrationWarning
          />
        ))}
      </head>
      <body
        className={`${playfairDisplay.variable} ${plusJakartaSans.variable} ${inter.variable}`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
