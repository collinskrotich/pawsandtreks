import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Booking Terms – How to Book & Payment Policy",
  description:
    "Read the Paws & Treks booking terms, cancellation policy, deposit requirements, and payment methods for Kenya safari tours.",
  alternates: {
    canonical: "https://pawsandtreks.com/booking-terms",
  },
  openGraph: {
    title: "Booking Terms – Paws & Treks",
    description:
      "Our booking terms, payment schedule, and cancellation policy for Kenya safari tours.",
    url: "https://pawsandtreks.com/booking-terms",
  },
};

export default function BookingTermsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
