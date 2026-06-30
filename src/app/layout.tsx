import type { Metadata } from "next";
import { Fredoka, Nunito, Anton, Inter } from "next/font/google";
import "../styles/globals.css";
import SmoothScrollProvider from "@/components/ui/SmoothScrollProvider";
import CustomCursor from "@/components/ui/CustomCursor";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { CartProvider } from "@/context/CartContext";

const fredoka = Fredoka({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-display",
  display: "swap",
});

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Austropical | Australia's Brighter Snack Choice",
  description: "Premium tropical superfood ice cream and acai bowls. 100% vegan, gluten-free, organic, and crafted under the Australian sun.",
  keywords: ["superfood ice cream", "vegan ice cream", "acai bowls australia", "healthy snacks", "organic dairy free dessert"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fredoka.variable} ${nunito.variable} ${anton.variable} ${inter.variable} scroll-smooth`}>
      <body className="antialiased">
        <CartProvider>
          <SmoothScrollProvider>
            <CustomCursor />
            <Navbar />
            <main className="min-h-screen overflow-visible">
              {children}
            </main>
            <Footer />
          </SmoothScrollProvider>
        </CartProvider>
      </body>
    </html>
  );
}

