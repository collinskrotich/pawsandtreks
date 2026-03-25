import type { Metadata } from "next";
import { Playfair_Display, Plus_Jakarta_Sans, Inter } from "next/font/google";
import Providers from "./providers";
import "@/index.css";

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
  title: "Paws & Treks - Wild Adventures. Unforgettable Safaris.",
  description:
    "Discover Kenya's wild beauty with Paws & Treks. Expert-guided safari tours across Masai Mara, Amboseli, Tsavo, and more. Book your unforgettable African safari adventure today.",
  keywords:
    "Kenya safari, African safari, Masai Mara, Amboseli, wildlife tours, Kenya tours, safari packages, African wildlife",
  openGraph: {
    title: "Paws & Treks - Wild Adventures. Unforgettable Safaris.",
    description:
      "Discover Kenya's wild beauty with Paws & Treks. Expert-guided safari tours across Masai Mara, Amboseli, Tsavo, and more.",
    type: "website",
    images: ["/images/safari_hero.jpg"],
  },
  twitter: {
    card: "summary_large_image",
  },
  icons: {
    icon: "/images/logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${playfairDisplay.variable} ${plusJakartaSans.variable} ${inter.variable}`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
