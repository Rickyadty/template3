import type { Metadata } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "STAY ROUTE — Luxury Hotel Discovery & Stays",
  description: "Find the perfect hotel in minutes, compare prices instantly, and book your stay with total confidence and transparent booking details.",
  keywords: ["luxury hotel", "hotel booking", "boutique retreat", "heritage stays", "Stay Route"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${jakarta.variable} scroll-smooth dark`}
    >
      <body className="bg-[#0a0a0c] text-[#f6f3ed] font-sans antialiased overflow-x-hidden selection:bg-[#f6f3ed] selection:text-[#0a0a0c]">
        {children}
      </body>
    </html>
  );
}
