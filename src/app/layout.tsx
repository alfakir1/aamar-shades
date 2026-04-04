import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { StickyCTA } from "@/components/layout/StickyCTA";
import prisma from "@/lib/prisma";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  variable: "--font-cairo",
  display: "swap",
});

const SITE_URL = 'https://maalim-al-dhil.com';
const COMPANY_NAME = 'معالم الظل';
const BRAND_NAME = 'Maalim Aldhil';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${COMPANY_NAME} | ${BRAND_NAME}`,
    template: `%s | ${COMPANY_NAME}`,
  },
  description:
    'شركة معالم الظل تقدم مظلات السيارات، السواتر، الهناجر، البرجولات، الجلسات الخارجية، وساندوتش بانل في السعودية بجودة عالية.',
  keywords: [
    'معالم الظل',
    'مظلات سيارات',
    'سواتر حماية',
    'هناجر',
    'برجولات',
    'جلسات خارجية',
    'ساندوتش بانل',
    'كلادينج',
  ],
  alternates: {
    canonical: SITE_URL,
    languages: {
      ar: `${SITE_URL}/`,
      en: `${SITE_URL}/en`,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'ar_SA',
    siteName: COMPANY_NAME,
    description:
      'شركة معالم الظل تقدم مظلات السيارات، السواتر، الهناجر، البرجولات، الجلسات الخارجية، وساندوتش بانل في السعودية بجودة عالية.',
    url: SITE_URL,
    images: [
      {
        url: '/logo.png',
        alt: `${COMPANY_NAME} logo`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: COMPANY_NAME,
    description:
      'شركة معالم الظل تقدم مظلات السيارات، السواتر، الهناجر، البرجولات، الجلسات الخارجية، وساندوتش بانل في السعودية.',
    images: ['/logo.png'],
  },
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [settings, services] = await Promise.all([
    prisma.siteSettings.findFirst(),
    prisma.service.findMany({ orderBy: { displayOrder: 'asc' } }),
  ])

  const companyName = settings?.companyName || COMPANY_NAME
  const siteUrl = SITE_URL

  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        name: companyName,
        url: siteUrl,
        logo: `${siteUrl}/logo.png`,
        sameAs: [],
      },
      {
        '@type': 'LocalBusiness',
        name: companyName,
        image: `${siteUrl}/logo.png`,
        telephone: settings?.phone || '+966538314660',
        email: settings?.email || 'info@maalim-al-dhil.com',
        address: {
          '@type': 'PostalAddress',
          addressCountry: 'SA',
          streetAddress: settings?.address || 'الرياض، المملكة العربية السعودية',
        },
        url: siteUrl,
      },
      ...services.map((service) => ({
        '@type': 'Service',
        name: service.title,
        serviceType: service.title,
        description: service.shortDescription || service.description || '',
        provider: {
          '@type': 'Organization',
          name: companyName,
          url: siteUrl,
        },
        url: `${siteUrl}/services/${service.slug}`,
      })),
    ],
  }

  return (
    <html lang="ar" dir="rtl">
      <body className={`${cairo.variable} font-sans antialiased flex flex-col min-h-screen`}>
        <Navbar settings={settings} />
        <main className="flex-grow">{children}</main>
        <Footer settings={settings} services={services} />
        <StickyCTA settings={settings} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </body>
    </html>
  )
}
