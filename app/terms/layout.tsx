import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions – Booking & Travel Policies",
  description:
    "Review the Paws & Treks terms and conditions covering booking policies, payment terms, cancellation rules, and traveller responsibilities for Kenya safari tours.",
  alternates: {
    canonical: "https://pawsandtreks.com/terms",
  },
  openGraph: {
    title: "Terms & Conditions – Paws & Treks",
    description:
      "Full terms and conditions for booking a safari with Paws & Treks.",
    url: "https://pawsandtreks.com/terms",
  },
};

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
