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
  title: "RAP CIPHER · Chennai — The Underground Convenes",
  description:
    "RAP CIPHER Chennai — an open-mic cypher & live jam where the city's rappers, beatboxers and producers converge. Presented in association with Zinema Music. Registrations open. Date: yet to be announced.",
  keywords: [
    "rap cipher chennai",
    "rap event chennai",
    "zinema music",
    "hip hop chennai",
    "rapper registration",
    "cypher",
  ],
  openGraph: {
    title: "RAP CIPHER · Chennai",
    description:
      "The underground convenes. An open cypher & live jam for Chennai's rappers. Presented in association with Zinema Music.",
    type: "website",
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
