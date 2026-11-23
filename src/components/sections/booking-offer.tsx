"use client"

import { siteConfig } from "@/lib/site-config"
import { usePromoBannerVisible } from "@/components/layout/promo-banner"

/** Repeats the current offer from the top banner above the booking form, until the offer ends. */
export function BookingOffer() {
  const show = usePromoBannerVisible()
  if (!show) return null
  return (
    <p className="mt-6 max-w-md rounded-sm border border-dashed border-champagne/45 px-4 py-3 text-sm leading-relaxed text-champagne">
      {siteConfig.promoBanner.message}
    </p>
  )
}
