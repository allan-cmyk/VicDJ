import type { Metadata, Viewport } from "next"
import { Analytics } from "@vercel/analytics/next"
import { fraunces, inter, jetbrainsMono } from "@/lib/fonts"
import { siteConfig } from "@/lib/site-config"
import { structuredData } from "@/lib/structured-data"
import { cn } from "@/lib/utils"
import "./globals.css"

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "Austin DJ",
    "Austin wedding DJ",
    "corporate DJ Austin",
    "DJ Trey",
    "AV Productionz",
    "nightlife DJ Austin",
    "yacht DJ Austin",
    "Premier Party Cruises",
  ],
  authors: [{ name: "AV Productionz" }],
  creator: "AV Productionz",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: ["/og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  themeColor: "#0a0a0b",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={cn(fraunces.variable, inter.variable, jetbrainsMono.variable)}>
      <head>
        {/* Reveal animations start hidden and need JavaScript to finish. */}
        <noscript>
          <style>{"[data-reveal],.mask-word span{opacity:1;transform:none}"}</style>
        </noscript>
      </head>
      <body className="bg-ink text-ivory antialiased font-body">
        {/* Static data from this repo only. "<" is escaped as the Next.js JSON-LD guide requires. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
          }}
        />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
