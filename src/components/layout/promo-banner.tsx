"use client"

import Link from "next/link"
import { useSyncExternalStore } from "react"
import { ArrowRight } from "lucide-react"
import { siteConfig } from "@/lib/site-config"

const promo = siteConfig.promoBanner

/** Height of the strip in px. The header uses it to place the mobile menu below it. */
export const PROMO_BANNER_HEIGHT = 36

function isLive(now: number) {
  return promo.enabled && now <= new Date(promo.endsAfter).getTime()
}

const noopSubscribe = () => () => {}

/**
 * True while the offer strip should show. The static page renders it from the config flag;
 * in the browser it also checks the end date, so it disappears on its own after the offer ends.
 */
export function usePromoBannerVisible() {
  return useSyncExternalStore(
    noopSubscribe,
    () => isLive(Date.now()),
    () => promo.enabled
  )
}

export function PromoBanner() {
  return (
    <div
      role="region"
      aria-label="Current offer"
      className="relative z-[60] flex items-center justify-center bg-champagne text-ink"
      style={{ height: PROMO_BANNER_HEIGHT }}
    >
      <Link
        href={promo.cta.href}
        className="group flex w-full max-w-[1320px] items-center justify-center gap-3 px-4 font-mono text-[10px] uppercase tracking-[0.16em] sm:text-[11px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/60"
      >
        <span className="truncate">
          <span className="hidden md:inline">{promo.message}</span>
          <span className="md:hidden">{promo.shortMessage}</span>
        </span>
        <span aria-hidden className="hidden lg:inline text-ink/40">·</span>
        <span className="hidden lg:inline text-ink/70">{promo.note}</span>
        <span className="inline-flex shrink-0 items-center gap-1 font-semibold underline-offset-4 group-hover:underline">
          <span className="hidden sm:inline">{promo.cta.label}</span>
          <ArrowRight size={12} aria-hidden className="transition-transform motion-safe:group-hover:translate-x-0.5" />
        </span>
      </Link>
    </div>
  )
}
