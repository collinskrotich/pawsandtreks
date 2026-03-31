import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog & Travel Guide – Kenya Safari Tips & Insights",
  description:
    "Read expert travel guides, safari tips, and wildlife stories from Paws & Treks. Learn the best time to visit Masai Mara, what to pack, and top animals to see.",
  alternates: {
    canonical: "https://pawsandtreks.com/blog",
  },
  openGraph: {
    title: "Blog & Travel Guide – Paws & Treks",
    description:
      "Expert tips, guides, and stories to help you plan the perfect Kenya safari adventure.",
    url: "https://pawsandtreks.com/blog",
    images: ["/images/masai_mara.jpg"],
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
