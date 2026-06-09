import type { Metadata } from "next";
import { Anton, Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const grotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: "RAP CYPHER · Chennai — The Underground Convenes",
  description:
    "RAP CYPHER Chennai — an open-mic cypher & live jam where the city's rappers, beatboxers and producers converge. Presented in association with Zinema Music. Registrations open. Date: yet to be announced.",
  keywords: [
    "rap cypher chennai",
    "rap event chennai",
    "zinema music",
    "hip hop chennai",
    "rapper registration",
    "cypher",
  ],
  openGraph: {
    title: "RAP CYPHER · Chennai",
    description:
      "The underground convenes. An open cypher & live jam for Chennai's rappers. Presented in association with Zinema Music.",
    type: "website",
    siteName: "RAP CYPHER · Chennai",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "RAP CYPHER · Chennai — presented by Zinema Music",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "RAP CYPHER · Chennai",
    description:
      "An open cypher & live jam for Chennai's rappers. Presented by Zinema Music.",
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${anton.variable} ${inter.variable} ${grotesk.variable}`}>
      <body className="grain">{children}</body>
    </html>
  );
}
