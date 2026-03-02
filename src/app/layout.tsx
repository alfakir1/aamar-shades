import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { StickyCTA } from "@/components/layout/StickyCTA";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  variable: "--font-cairo",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "عمار للمظلات | حلول التظليل الاحترافية",
    template: "%s | عمار للمظلات",
  },
  description: "خبراء في تصميم وتركيب المظلات والسواتر والهياكل الخارجية بأعلى معايير الجودة في المملكة العربية السعودية.",
  keywords: ["مظلات", "سواتر", "هناجر", "برجولات", "جلسات خارجية", "كلادينج"],
  openGraph: {
    type: "website",
    locale: "ar_SA",
    siteName: "عمار للمظلات",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`${cairo.variable} font-sans antialiased flex flex-col min-h-screen`}>
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
        <StickyCTA />
      </body>
    </html>
  );
}
