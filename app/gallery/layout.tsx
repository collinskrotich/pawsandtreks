import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Safari Gallery – Photos from Kenya Wildlife Adventures",
  description:
    "View stunning photos from Paws & Treks safaris. Lions, elephants, giraffes, hot air balloons, and breathtaking Kenya landscapes captured by our guests.",
  alternates: {
    canonical: "https://pawsandtreks.com/gallery",
  },
  openGraph: {
    title: "Safari Gallery – Paws & Treks",
    description:
      "A visual journey through Kenya's most iconic wildlife destinations. Browse photos from our safari adventures.",
    url: "https://pawsandtreks.com/gallery",
    images: ["/images/gallery_leopard.jpg"],
  },
};

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
