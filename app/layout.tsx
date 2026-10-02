import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Swan Ocean Stays | Luxury Vacation Rental Management",
  description: "Elevated vacation rental management in St. Augustine and Vilano Beach.",
  icons: {
    icon: "/Swan-logo.png",
    apple: "/Swan-logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Swan Ocean Stays",
    "image": "https://swanoceanstays.com/Swan-logo.png",
    "@id": "https://swanoceanstays.com",
    "url": "https://swanoceanstays.com",
    "telephone": "904-803-6535",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Vilano Beach",
      "addressRegion": "FL",
      "postalCode": "32084",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 29.9355,
      "longitude": -81.2984
    },
    "areaServed": [
      {
        "@type": "AdministrativeArea",
        "name": "Vilano Beach, FL"
      },
      {
        "@type": "AdministrativeArea",
        "name": "St. Augustine, FL"
      },
      {
        "@type": "AdministrativeArea",
        "name": "St. Augustine Beach, FL"
      },
      {
        "@type": "AdministrativeArea",
        "name": "Ponte Vedra Beach, FL"
      }
    ],
    "founder": {
      "@type": "Person",
      "name": "Nathan Edwards",
      "jobTitle": "Founder & Local Operator"
    },
    "description": "Boutique full-service vacation rental management and Airbnb co-hosting in Vilano Beach and St. Augustine, FL, offering a 17% fee structure with included routine maintenance.",
    "knowsAbout": [
      "Vacation Rental Management",
      "Airbnb Property Management",
      "Vilano Beach Short Term Rentals",
      "St. Augustine Property Management",
      "Direct Booking Management"
    ]
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
