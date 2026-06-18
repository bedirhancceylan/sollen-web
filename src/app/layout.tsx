import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import SmoothScrollProvider from "@/components/layout/SmoothScrollProvider";
import LocaleProvider from "@/components/layout/LocaleProvider";
import Navbar from "@/components/layout/Navbar";
import CookieConsent from "@/components/ui/CookieConsent";
import "./globals.css";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-roboto",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sollen — The operating system for corporate field safety",
  description:
    "Sollen unifies field teams, IoT sensors, emergency protocols, and compliance tracking into a single platform — built offline-first for operations where seconds matter.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${roboto.variable} antialiased`} suppressHydrationWarning>
        <LocaleProvider>
          <SmoothScrollProvider>
            <Navbar />
            {children}
          </SmoothScrollProvider>
          <CookieConsent />
        </LocaleProvider>
      </body>
    </html>
  );
}
