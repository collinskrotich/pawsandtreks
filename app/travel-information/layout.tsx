import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Travel Information – Kenya Safari Travel Guide",
  description:
    "Essential travel information for your Kenya safari: visa requirements, vaccinations, currency, climate, packing tips, and safety advice from Paws & Treks.",
  alternates: {
    canonical: "https://pawsandtreks.com/travel-information",
  },
  openGraph: {
    title: "Travel Information – Paws & Treks",
    description:
      "Everything you need to know before travelling to Kenya for a safari: visas, health, currency, and more.",
    url: "https://pawsandtreks.com/travel-information",
  },
};

export default function TravelInformationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
