import type { Metadata, Viewport } from "next"
import { Analytics } from "@vercel/analytics/next"
import { fraunces, inter, jetbrainsMono } from "@/lib/fonts"
import { siteConfig } from "@/lib/site-config"
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
  icons: {
    icon: "/favicon.ico",
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
      <body className="bg-ink text-ivory antialiased font-body">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
