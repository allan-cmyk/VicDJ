import { Fraunces, Inter, JetBrains_Mono } from "next/font/google"

/**
 * Fraunces is a variable font; for variable fonts `next/font` requires omitting
 * explicit numeric weights (or setting `weight: "variable"`). We keep both
 * italic + normal styles so editorial italics render correctly.
 */
export const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
  style: ["normal", "italic"],
})

export const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
})

export const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
})
