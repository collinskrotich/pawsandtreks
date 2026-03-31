import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Safari Packages – Kenya Safari Tours & Itineraries",
  description:
    "Browse safari packages from Paws & Treks. Masai Mara camping, private safaris, hot air balloon rides, and multi-day Kenya wildlife adventures. Request a quote today.",
  alternates: {
    canonical: "https://pawsandtreks.com/packages",
  },
  openGraph: {
    title: "Safari Packages – Paws & Treks",
    description:
      "Explore our curated Kenya safari packages. From budget camping to luxury private safaris across Masai Mara, Amboseli, and Tsavo.",
    url: "https://pawsandtreks.com/packages",
    images: ["/images/masai_mara.jpg"],
  },
};

export default function PackagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
