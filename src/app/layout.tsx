import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://syntax.dev"),
  title: {
    default: "Syntax — Software Solutions for Europe & Australia",
    template: "%s | Syntax",
  },
  description: "Professional web and mobile development services for businesses in Italy, Spain, Austria, and Australia. Custom software solutions tailored to your needs.",
  keywords: [
    "web development",
    "mobile apps",
    "software solutions",
    "Italy",
    "Spain",
    "Austria",
    "Australia",
    "custom software",
    "web design",
  ],
  authors: [{ name: "Syntax" }],
  creator: "Syntax",
  publisher: "Syntax",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: ["it_IT", "es_ES", "de_DE"],
    siteName: "Syntax",
    title: "Syntax — Software Solutions for Europe & Australia",
    description: "Professional web and mobile development services for businesses in Italy, Spain, Austria, and Australia.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Syntax — Software Solutions",
    description: "Professional web and mobile development services.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
