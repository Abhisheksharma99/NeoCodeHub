import type { Metadata } from "next";
import { Syne, Outfit } from "next/font/google";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: "NeoCodeHub - Transforming Ideas into Digital Reality",
  description:
    "Your Trusted Partner in Digital Development Elevating Businesses with Cutting-Edge Solutions",
  openGraph: {
    title: "NeoCodeHub - Transforming Ideas into Digital Reality",
    description:
      "Your Trusted Partner in Digital Development Elevating Businesses with Cutting-Edge Solutions",
    url: "https://tech-stack-info.vercel.app/",
    siteName: "NeoCodeHub",
    images: [
      {
        url: "https://tech-stack-info.vercel.app/",
        width: 1200,
        height: 630,
        alt: "NeoCodeHub - Digital Development Solutions",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NeoCodeHub - Transforming Ideas into Digital Reality",
    description:
      "Your Trusted Partner in Digital Development Elevating Businesses with Cutting-Edge Solutions",
    images: ["https://tech-stack-info.vercel.app/"],
  },
  keywords:
    "tech stack information, technology stack analysis, software development technologies, web development services, software engineering best practices, front-end development, back-end development, cloud computing solutions, database management systems, programming languages comparison, full-stack development, agile development methodologies, DevOps practices, microservices architecture, mobile app development, IT consulting services, digital transformation strategies, tech industry trends, startup technology solutions, enterprise software solutions",
  robots: "index, follow",
  authors: [
    { name: "NeoCodeHub", url: "https://tech-stack-info.vercel.app/" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
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
      </head>
      <body
        className={`${syne.variable} ${outfit.variable} font-body antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
