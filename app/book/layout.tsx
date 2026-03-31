import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Request a Quote – Book Your Kenya Safari",
  description:
    "Request a personalised safari quote from Paws & Treks. Tell us your preferred dates, destinations, and budget — we'll craft the perfect Kenya safari for you.",
  alternates: {
    canonical: "https://pawsandtreks.com/book",
  },
  openGraph: {
    title: "Book Your Safari – Paws & Treks",
    description:
      "Plan your dream Kenya safari. Fill in our quick form and receive a tailored quote within 24 hours.",
    url: "https://pawsandtreks.com/book",
    images: ["/images/safari_hero.jpg"],
  },
};

export default function BookLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
