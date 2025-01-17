import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/react"
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Movie Index",
  description: "Your gateway to endless entertainment",
  icons: "/favicon.ico",
  twitter: {
    card: "summary",
  },
  openGraph: {
    type: "website",
    title: "Movie Index",
    siteName: "Movie Index",
    description: "Movie Index, Your gateway to endless entertainment.",
    images: "/images/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.className}>
      <head>
        {process.env.NODE_ENV === "development" && <script src="https://unpkg.com/react-scan/dist/auto.global.js" async />}
      </head>
      <body
        className="antialiased flex flex-col min-h-screen"
      >
        <NuqsAdapter>{children}</NuqsAdapter>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
