import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "NeoCodeHub - Transforming Ideas into Digital Reality",
  description: "Your Trusted Partner in Digital Development Elevating Businesses with Cutting-Edge Solutions",

  // Open Graph metadata
  openGraph: {
    title: "NeoCodeHub - Transforming Ideas into Digital Reality",
    description: "Your Trusted Partner in Digital Development Elevating Businesses with Cutting-Edge Solutions",
    url: "https://tech-stack-info.vercel.app/", // Replace with your website URL
    siteName: "NeoCodeHub",
    images: [
      {
        url: "https://tech-stack-info.vercel.app/", // URL to an image for previews
        width: 1200,
        height: 630,
        alt: "A description of the image for better context",
      },
    ],
    type: "website",
  },

  // Twitter Card metadata
  twitter: {
    card: "summary_large_image",
    title: "NeoCodeHub - Transforming Ideas into Digital Reality",
    description: "Your Trusted Partner in Digital Development Elevating Businesses with Cutting-Edge Solutions",
    images: ["https://tech-stack-info.vercel.app/"], // URL to an image for Twitter previews
  },

  // Other important meta tags
  keywords: "tech stack information, technology stack analysis, software development technologies, web development services, software engineering best practices, front-end development, back-end development, cloud computing solutions, database management systems, programming languages comparison, full-stack development, agile development methodologies, DevOps practices, microservices architecture, mobile app development, IT consulting services, digital transformation strategies, tech industry trends, startup technology solutions, enterprise software solutions, best tech stacks for startups, how to choose the right technology stack, advantages of using modern technology stacks, trends in web development technologies 2024, effective software development methodologies", // Add relevant keywords for your site
  robots: "index, follow", // Ensure search engines index and follow links
  authors: [{ name: 'NeoCodeHub', url: 'https://tech-stack-info.vercel.app/' }] // Author of the website
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
            <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
            <link rel="icon" href="/favicon.ico" type="image/x-icon"></link>
              <link rel="manifest" href="/site.webmanifest" />
              </head>
              <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
              >
                {children}
              </body>
            </html>
            );
}
