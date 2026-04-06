import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "./_components/ThemeProvider";
import { GoogleAnalytics } from "./_components/GoogleAnalytics";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-syne",
  display: "swap",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://tech-stack-info.vercel.app"),
  title: "NeoCodeHub - Transforming Ideas into Digital Reality",
  description:
    "Your Trusted Partner in Digital Development. Elevating Businesses with Cutting-Edge Solutions in Web, Mobile, and AI Development.",
  openGraph: {
    title: "NeoCodeHub - Transforming Ideas into Digital Reality",
    description:
      "Your Trusted Partner in Digital Development. Elevating Businesses with Cutting-Edge Solutions in Web, Mobile, and AI Development.",
    url: "https://tech-stack-info.vercel.app/",
    siteName: "NeoCodeHub",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "NeoCodeHub - Digital Development Solutions",
      },
    ],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "NeoCodeHub - Transforming Ideas into Digital Reality",
    description:
      "Your Trusted Partner in Digital Development. Elevating Businesses with Cutting-Edge Solutions.",
    images: ["/og-image.png"],
  },
  keywords: [
    "web development",
    "mobile app development",
    "AI solutions",
    "software development",
    "digital transformation",
    "NeoCodeHub",
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  authors: [
    { name: "NeoCodeHub", url: "https://tech-stack-info.vercel.app/" },
  ],
  alternates: {
    canonical: "https://tech-stack-info.vercel.app/",
  },
};

// JSON-LD structured data
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "NeoCodeHub",
  url: "https://tech-stack-info.vercel.app",
  logo: "https://tech-stack-info.vercel.app/favicon-32x32.png",
  description:
    "Leading software and website development company transforming ideas into innovative digital solutions.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Faridabad",
    addressRegion: "Haryana",
    addressCountry: "IN",
  },
  contactPoint: {
    "@type": "ContactPoint",
    email: "sales@NeoCodeHub.com",
    contactType: "sales",
  },
  sameAs: [],
  foundingDate: "2020",
  services: [
    "Web Development",
    "Mobile App Development",
    "AI & Machine Learning",
    "Cloud Solutions",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="manifest" href="/site.webmanifest" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-body antialiased`}
      >
        <ThemeProvider>
          <a href="#main-content" className="skip-to-content">
            Skip to main content
          </a>
          {children}
        </ThemeProvider>
        <GoogleAnalytics />
      </body>
    </html>
  );
}
