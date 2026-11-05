"use client"

import { useEffect, useState } from "react"
import { useReducedMotion } from "@/hooks/use-reduced-motion"
import { cn } from "@/lib/utils"

const PILLARS = ["Weddings", "Corporate", "Nightlife", "Cruise"] as const

/** Cycles the pillar strip: a quiet heartbeat that keeps the hero alive. */
export function HeroPillars() {
  const reduced = useReducedMotion()
  const [active, setActive] = useState(0)

  useEffect(() => {
    if (reduced) return
    const id = setInterval(() => setActive((p) => (p + 1) % PILLARS.length), 2400)
    return () => clearInterval(id)
  }, [reduced])

  return (
    <span className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 font-mono text-[10px] uppercase tracking-[0.2em] md:text-[11px] md:tracking-[0.28em]">
      {PILLARS.map((pillar, i) => (
        <span key={pillar} className="flex items-center gap-x-2">
          {i > 0 ? <span aria-hidden className="text-ivory/30">·</span> : null}
          <span
            className={cn(
              "transition-colors duration-700",
              i === active
                ? "text-champagne [text-shadow:0_0_18px_rgba(231,201,139,0.45)]"
                : "text-ivory/50"
            )}
          >
            {pillar}
          </span>
        </span>
      ))}
    </span>
  )
}
